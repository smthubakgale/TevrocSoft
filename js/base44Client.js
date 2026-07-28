(function () {
  const tokenStorageKey = 'tevroc_access_token';
  const authStorageKeys = ['tevroc_access_token', 'token', 'base44_access_token', 'user', 'idToken'];

  const base44Client = {
    client: null,
    config: null,

    init(config = {}) {
      this.config = {
        appId: config.appId || 'tevrocsoft',
        appName: config.appName || 'Tevroc',
        baseUrl: config.baseUrl || '',
        serviceUrl: config.serviceUrl || config.baseUrl || '',
      };

      if (!window.Tevroc || typeof window.Tevroc.createClient !== 'function') {
        console.warn('Tevroc SDK is not loaded.');
        return null;
      }

      this.client = window.Tevroc.createClient({
        baseUrl: this.config.baseUrl,
        serviceUrl: this.config.serviceUrl,
        appId: this.config.appId,
        appName: this.config.appName,
        token: this.getStoredToken(),
      });

      if (this.getStoredToken()) {
        this.syncAuthToken();
      }

      return this.client;
    },

    getStoredToken() {
      return localStorage.getItem(tokenStorageKey)
        || localStorage.getItem('token')
        || localStorage.getItem('base44_access_token')
        || null;
    },

    setToken(token) {
      if (!token) return null;
      localStorage.setItem(tokenStorageKey, token);
      localStorage.setItem('token', token);
      localStorage.setItem('base44_access_token', token);
      if (this.client?.setToken) {
        this.client.setToken(token);
      }
      return token;
    },

    syncAuthToken() {
      const token = this.getStoredToken();
      if (!token || !this.client?.setToken) return null;
      this.client.setToken(token);
      return token;
    },

    restoreTokenFromUrl() {
      if (typeof window === 'undefined' || !window.location?.search) return null;
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (!token) return null;

      this.setToken(token);
      if (this.client) {
        this.syncAuthToken();
      }

      params.delete('token');
      const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}${window.location.hash || ''}`;
      window.history.replaceState({}, document.title, cleanUrl);

      return token;
    },

    clearStoredAuth() {
      authStorageKeys.forEach((key) => localStorage.removeItem(key));
      if (this.client?.clearToken) {
        this.client.clearToken();
      }
      this.client = null;
    },

    getStoredUser() {
      try {
        const value = localStorage.getItem('user');
        return value ? JSON.parse(value) : null;
      } catch (err) {
        this.clearStoredAuth();
        return null;
      }
    },

    async loadCurrentUser() {
      const token = this.getStoredToken();
      if (!token || !this.client) return null;
      this.syncAuthToken();
      try {
        const profile = await this.client.auth.me();
        if (profile?.email) {
          localStorage.setItem('user', JSON.stringify(profile));
          return profile;
        }
      } catch (err) {
        console.warn('Unable to restore user session', err);
        this.clearStoredAuth();
        localStorage.removeItem('user');
      }
      return null;
    },

    loginWithProvider(provider, redirectTo, callback) {
      if (!this.client?.auth?.loginWithProvider) {
        throw new Error('Auth provider login is unavailable');
      }
      return this.client.auth.loginWithProvider(provider, redirectTo, async (token, profile) => {
        if (token) {
          this.setToken(token);
        }
        if (typeof callback === 'function') {
          await callback(token, profile);
        }
      });
    },

    async createChatSession(sessionPayload) {
      if (!this.client?.entities?.ChatSession?.create) {
        throw new Error('ChatSession entity API unavailable');
      }
      return await this.client.entities.ChatSession.create(sessionPayload);
    },

    async persistChatMessage(messagePayload) {
      if (!this.client?.entities?.ChatMessage?.create) {
        throw new Error('ChatMessage entity API unavailable');
      }
      return await this.client.entities.ChatMessage.create(messagePayload);
    },

    async loadChatHistory(sessionId, filter = {}) {
      if (!this.client?.entities?.ChatMessage?.query) {
        return [];
      }
      const queryFilter = { appId: this.config.appId, sessionId, ...filter };
      const records = await this.client.entities.ChatMessage.query({ filter: queryFilter });
      if (Array.isArray(records)) return records;
      if (records && Array.isArray(records.data)) return records.data;
      return [];
    },
  };

  window.base44Client = base44Client;
})();
