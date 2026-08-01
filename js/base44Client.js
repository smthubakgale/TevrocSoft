const { createClient } = window.Tevroc;
const appParams = window.appParams;

console.log(createClient , appParams);

const tokenStorageKey = 'tevroc_access_token';
const appScopedHeaders = appParams.appId ? { 'X-App-Id': appParams.appId } : {};
const authStorageKeys = ['tevroc_access_token', 'token', 'base44_access_token', 'user', 'idToken'];

console.log("Initializing base44 client with params:", appParams);

const client = createClient({
  baseUrl: appParams.apiBaseUrl,
  serviceUrl: appParams.serviceUrl,
  appId: appParams.appId,
  appName: appParams.appName,
  token: appParams.token,
  headers: appScopedHeaders,
});

const unwrapData = (result) => result?.data ?? result;
const unwrapList = (result) => (Array.isArray(result) ? result : result?.data ?? []);

function buildRealtimeRoomName(value, appId = '') {
  if (!value) return '';

  const appKey = String(appId || appParams.appId || 'tevrocdev');
  const text = String(value);
  let encoded = '';

  for (let index = 0; index < text.length; index += 1) {
    const charCode = text.charCodeAt(index);
    const keyCode = appKey.charCodeAt(index % appKey.length);
    encoded += (charCode ^ (keyCode + index + 1)).toString(16).padStart(2, '0');
  }

  return `chat:${encoded}`;
}

function rememberToken(token) {
  if (!token || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(tokenStorageKey, token);
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('base44_access_token', token);
    if (typeof client.setToken === 'function') client.setToken(token);
  } catch (err) {
    /* ignore storage errors */
  }
}

window.clearStoredAuth = () => {
  if (typeof window === 'undefined') return;

  authStorageKeys.forEach((key) => window.localStorage.removeItem(key));
  window.sessionStorage.removeItem('gAccessToken');

  if (typeof client.clearToken === 'function') {
    client.clearToken();
  }
}

function setStoredToken(token){
  rememberToken(token);
}

// expose helpers for other scripts (contact.html expects these)
window.getStoredToken = getStoredToken;
window.setStoredToken = setStoredToken;
window.clearToken = () => {
  try {
    window.localStorage.removeItem(tokenStorageKey);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('base44_access_token');
    if (typeof client.clearToken === 'function') client.clearToken();
  } catch (err) { /* ignore */ }
};

function getStoredToken() {
  try {
    const candidates = [tokenStorageKey, 'token', 'base44_access_token', 'idToken', 'gAccessToken'];
    for (let i = 0; i < candidates.length; i += 1) {
      const key = candidates[i];
      const value = window.localStorage.getItem(key);
      if (!value) continue;
      const trimmed = String(value).trim();
      // skip JSON blobs (likely 'user' or other stored objects)
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) continue;
      return trimmed;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function normalizeListArgs(sortOrOptions, limit) {
  if (sortOrOptions && typeof sortOrOptions === 'object') return sortOrOptions;
  const options = {};
  if (sortOrOptions) options.sort = sortOrOptions;
  if (limit) options.limit = limit;
  return options;
}


function normalizeFilterBody(filters, sortOrOptions, limit) {
  const options = normalizeListArgs(sortOrOptions, limit);
  return {
    ...options,
    filters,
    filter: filters,
    where: filters,
  };
}

function createEntityApi(entityApi) {
  return {
    list: async (sortOrOptions, limit) => unwrapList(await entityApi.list(normalizeListArgs(sortOrOptions, limit))),
    get: async (id) => unwrapData(await entityApi.get(id)),
    create: async (record) => unwrapData(await entityApi.create(record)),
    update: async (id, patch) => unwrapData(await entityApi.update(id, patch)),
    delete: (id) => entityApi.delete(id),
    query: async (input) => unwrapList(await entityApi.query(input)),
    filter: async (filters = {}, sortOrOptions, limit) => unwrapList(await entityApi.query(normalizeFilterBody(filters, sortOrOptions, limit))),
    bulkCreate: (records) => entityApi.bulkCreate(records),
    bulkUpdate: (records) => entityApi.bulkUpdate(records),
    bulkDelete: (ids) => entityApi.bulkDelete(ids),
    import: (records) => entityApi.import(records),
  };
}

function createUserEntityApi() {
  return {
    list: async (sortOrOptions, limit) => unwrapList(await client.request('/users', { query: normalizeListArgs(sortOrOptions, limit) })),
    get: async (id) => unwrapData(await client.request(`/users/${encodeURIComponent(id)}`)),
    create: async (record) => unwrapData(await client.request('/users/invite', { method: 'POST', body: record })),
    update: async (id, patch) => unwrapData(await client.request(`/users/${encodeURIComponent(id)}`, { method: 'PATCH', body: patch })),
    delete: (id) => client.request(`/users/${encodeURIComponent(id)}`, { method: 'DELETE' }),
    query: async (input) => unwrapList(await client.request('/users/query', { method: 'POST', body: input })),
    filter: async (filters = {}, sortOrOptions, limit) => unwrapList(await client.request('/users/query', { method: 'POST', body: normalizeFilterBody(filters, sortOrOptions, limit) })),
  };
}

const entityRegistry = new Proxy({}, {
  get(_target, entity) {
    if (typeof entity !== 'string') return undefined;
    if (entity === 'User') return createUserEntityApi();
    return createEntityApi(client.entities[entity]);
  },
});

window.base44 = {
  ...client,
  realtime: {
    ...client.realtime,
    encryptRoomName: (value) => {
      if (typeof client.realtime?.encryptRoomName === 'function') {
        return client.realtime.encryptRoomName(value);
      }
      return buildRealtimeRoomName(value, client.appId || appParams.appId);
    },
    roomName: (value) => {
      if (typeof client.realtime?.roomName === 'function') {
        return client.realtime.roomName(value);
      }
      return buildRealtimeRoomName(value, client.appId || appParams.appId);
    },
  },
  request: client.request.bind(client),
  setToken: client.setToken.bind(client),
  clearToken: client.clearToken.bind(client),
  entities: entityRegistry,
  integrations: {
    ...client.integrations,
    Core: {
      ...client.integrations.Core,
      InvokeLLM: async (payload) => {
        const result = await client.integrations.Core.InvokeLLM(payload);
        if (result && typeof result === 'object' && 'data' in result) {
          const data = result.data;
          const wrapped = {
            _llmText: result.text,
            _llmRaw: result.raw,
            _llmMessage: result.message,
          };
          if (typeof data === 'object' && data !== null) {
            const text = data.text ?? data.response ?? result.text ?? result.message ?? '';
            return { ...data, response: data.response ?? text, text, ...wrapped };
          }
          return { data, ...wrapped };
        }
        return result;
      },
      UploadFile: async (input) => {
        const file = input?.file ?? input;
        const result = await client.integrations.Core.UploadFile(file, {
          filename: file?.name,
          contentType: file?.type,
        });
        const url = result.url ? `${client.baseUrl}${result.url}` : null;
        return { ...result, file_url: url };
      },
    },
  },
  auth: {
    ...client.auth,
    me: async () => {
      const result = await client.auth.me();
      return result?.user ?? unwrapData(result);
    },
    register: async (input) => {
      const result = await client.auth.register(input);
      rememberToken(result.token);
      return { ...result, access_token: result.token };
    },
    login: async (input) => {
      const result = await client.auth.login(input);
      rememberToken(result.token);
      return { ...result, access_token: result.token };
    },
    loginViaEmailPassword: async (email, password) => base44.auth.login({ email, password }),
    logout: async (redirectTo) => {
      await client.auth.logout().catch(() => undefined);
      clearStoredAuth();
      if (typeof window !== 'undefined' && typeof redirectTo === 'string') {
        window.location.href = redirectTo;
      }
    },
    updateMe: async (patch) => unwrapData(await client.request('/auth/me', { method: 'PATCH', body: patch })),
    verifyOtp: async (input) => {
      const result = await client.auth.verifyOtp(input);
      rememberToken(result.token ?? result.access_token);
      return { ...result, access_token: result.access_token ?? result.token };
    },
    resetPassword: (input) => client.auth.resetPassword(input),
    resetPasswordRequest: (email) => client.request('/auth/reset-password-request', { method: 'POST', body: { email }, auth: false }),
    resendOtp: (email) => client.request('/auth/resend-otp', { method: 'POST', body: { email }, auth: false }),
    setToken: rememberToken,
    redirectToLogin: (redirectTo = '/') => {
      if (typeof window !== 'undefined') {
        window.location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`;
      }
    },
    loginWithProvider: async (provider, redirectTo) => {
      if (typeof client.auth.loginWithProvider === 'function') {
        return client.auth.loginWithProvider(provider, redirectTo, rememberToken);
      }
      const { url } = await client.auth.loginUrl(redirectTo ?? (typeof window !== 'undefined' ? window.location.href : '/'));
      if (typeof window !== 'undefined') window.location.href = url;
      return { url };
    },
  },
  users: {
    inviteUser: (email, role) => client.request('/users/invite', { method: 'POST', body: { email, role } }),
  },
};

