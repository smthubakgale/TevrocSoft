// Contact Page Specific JavaScript
function pageToast(message, type = 'info') {
    if (window.showToast) {
        window.showToast(message, type);
    } else {
        console.warn(message);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (!name || !email || !message) {
                pageToast('Please fill in all required fields', 'error');
                return;
            }

            // Show success message
            pageToast('Thank you for your message. We will get back to you shortly.', 'success');
            this.reset();
        });
    }

    // Add animation to contact cards
    const contactCards = document.querySelectorAll('.contact-info-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    console.log('Contact page script loaded');

    const chatAssistantBtn = document.getElementById('chatAssistantBtn') || document.querySelector('[data-chat-open]');
    const chatSignOutBtn = document.getElementById('chatSignOutBtn');
    const chatAgentBtn = document.getElementById('chatAgentBtn') || document.querySelector('[data-agent-open]');
    const chatStatus = document.getElementById('chatStatus');
    const chatInput = document.getElementById('chatInput');
    const chatSubmitBtn = document.getElementById('chatSubmitBtn');
    const chatForm = document.getElementById('chatForm');
    const chatBox = document.getElementById('chatBox');
    const chatAttachBtn = document.getElementById('chatAttachBtn');
    const chatFileInput = document.getElementById('chatFileInput');
    const chatAttachmentPreview = document.getElementById('chatAttachmentPreview');
    const chatPanel = document.getElementById('chatPanel');
    const chatOverlay = document.getElementById('chatOverlay');
    const chatBackBtn = document.getElementById('chatBackBtn');
    const chatModeLabel = document.getElementById('chatModeLabel');

    let currentUser = null;
    let googleSubscription = null;
    let liveChatRooms = [];
    let liveChatSessionId = null;
    let liveRoomConnected = false;
    let currentSessionStatus = null;
    let pendingAttachments = [];

    const isMobile = () => window.innerWidth < 1024;

    const escapeHtml = (value = '') => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const inferAttachmentType = (file) => {
        if (file?.type?.startsWith('image/')) return 'image';
        if (file?.type?.startsWith('video/')) return 'video';
        return 'document';
    };

    const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Unable to read selected file'));
        reader.readAsDataURL(file);
    });

    const openFullscreenMedia = (src, type) => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/90 p-4';
        overlay.addEventListener('click', () => overlay.remove());

        const panel = document.createElement('div');
        panel.className = 'relative w-full max-w-4xl rounded-3xl bg-white p-3 shadow-2xl';
        panel.addEventListener('click', (event) => event.stopPropagation());

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'absolute right-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-sm text-white';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', () => overlay.remove());
        panel.appendChild(closeBtn);

        if (type === 'image') {
            const image = document.createElement('img');
            image.src = src;
            image.alt = 'Attachment preview';
            image.className = 'max-h-[80vh] w-full rounded-2xl object-contain';
            panel.appendChild(image);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.className = 'max-h-[80vh] w-full rounded-2xl bg-slate-950';
            panel.appendChild(video);
        }

        overlay.appendChild(panel);
        document.body.appendChild(overlay);
    };

    const updateAttachmentPreview = () => {
        if (!chatAttachmentPreview) return;
        if (!pendingAttachments.length) {
            chatAttachmentPreview.innerHTML = '';
            chatAttachmentPreview.classList.add('hidden');
            return;
        }

        chatAttachmentPreview.innerHTML = '';
        pendingAttachments.forEach((attachment, index) => {
            const chip = document.createElement('div');
            chip.className = 'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700';
            chip.innerHTML = `<span>${escapeHtml(attachment.name || `Attachment ${index + 1}`)}</span>`;
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'text-slate-500 hover:text-slate-800';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => {
                pendingAttachments.splice(index, 1);
                updateAttachmentPreview();
            });
            chip.appendChild(removeBtn);
            chatAttachmentPreview.appendChild(chip);
        });
        chatAttachmentPreview.classList.remove('hidden');
    };

    const clearPendingAttachments = () => {
        pendingAttachments = [];
        updateAttachmentPreview();
    };

    const renderedMessageKeys = new Set();

    const appendMessage = (text, role = 'bot', options = {}) => {
        const messageText = String(text ?? '');
        const attachments = Array.isArray(options.attachments) ? options.attachments : [];
        const messageKey = options.id
            ? `id:${options.id}`
            : `text:${role}:${messageText}:${attachments.length}:${JSON.stringify(attachments.map((attachment) => attachment.name || attachment.type || 'attachment'))}`;

        if (renderedMessageKeys.has(messageKey)) {
            return;
        }
        renderedMessageKeys.add(messageKey);

        const wrapper = document.createElement('div');
        wrapper.className = role === 'user' ? 'flex justify-end' : 'flex justify-start';
        const bubble = document.createElement('div');
        bubble.className = `max-w-[88%] ${role === 'user' ? 'rounded-3xl bg-blue-600 text-white' : 'rounded-3xl bg-slate-100 text-slate-900'} p-4 text-sm leading-6 shadow-sm`;

        if (messageText) {
            const content = document.createElement('div');
            content.className = 'whitespace-pre-wrap break-words';
            content.textContent = messageText;
            bubble.appendChild(content);
        }

        if (attachments.length) {
            const attachmentWrap = document.createElement('div');
            attachmentWrap.className = 'mt-3 space-y-2';
            attachments.forEach((attachment) => {
                const item = document.createElement('div');
                item.className = 'rounded-2xl border border-slate-300/70 bg-white/80 p-2';
                if (attachment.type === 'image' && attachment.dataUrl) {
                    const img = document.createElement('img');
                    img.src = attachment.dataUrl;
                    img.alt = attachment.name || 'Attachment';
                    img.className = 'max-h-72 max-w-full cursor-zoom-in rounded-xl object-contain';
                    img.addEventListener('click', () => openFullscreenMedia(attachment.dataUrl, 'image'));
                    item.appendChild(img);
                } else if (attachment.type === 'video' && attachment.dataUrl) {
                    const video = document.createElement('video');
                    video.src = attachment.dataUrl;
                    video.controls = true;
                    video.preload = 'metadata';
                    video.className = 'max-h-72 w-full rounded-xl bg-slate-950';
                    video.addEventListener('click', () => openFullscreenMedia(attachment.dataUrl, 'video'));
                    item.appendChild(video);
                } else {
                    const link = document.createElement('a');
                    link.href = attachment.dataUrl || '#';
                    link.download = attachment.name || 'document';
                    link.className = 'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white';
                    link.textContent = `Download ${attachment.name || 'document'}`;
                    item.appendChild(link);
                }
                attachmentWrap.appendChild(item);
            });
            bubble.appendChild(attachmentWrap);
        }

        wrapper.appendChild(bubble);
        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const syncAuthToken = () => {
        const token = window.getStoredToken();
        if (!token || !base44?.setToken) return null;
        base44.setToken(token);
        return token;
    };

    const restoreTokenFromUrl = () => {
        if (typeof window === 'undefined' || !window.location?.search) return null;
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (!token) return null;

        base44.setToken(token);
        if (typeof syncAuthToken === 'function') {
            syncAuthToken();
        }

        params.delete('token');
        const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}${window.location.hash || ''}`;
        window.history.replaceState({}, document.title, cleanUrl);

        return token;
    };

    const clearToken = () => {
        window.base44.clearToken();
    };

    const getStoredUser = () => {
        try {
            const value = localStorage.getItem('user');
            return value ? JSON.parse(value) : null;
        } catch (err) {
            base44.clearToken();
            return null;
        }
    };


    const loadCurrentUser = async () => {
        const token = window.getStoredToken();
        if (!token || !base44) return null;
        syncAuthToken();
        try {
            const profile = await base44.auth.me();
            if (profile?.email) {
                localStorage.setItem('user', JSON.stringify(profile));
                return profile;
            }
        } catch (err) {
            console.warn('Unable to restore user session', err);
            base44.clearToken();
            localStorage.removeItem('user');
        }
        return null;
    };

    const openChatDialog = () => {
        chatPanel.classList.remove('hidden');
        if (isMobile()) {
            chatPanel.classList.add('top-4', 'bottom-4');
            chatOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            chatOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    };

    const closeChatDialog = () => {
        chatPanel.classList.add('hidden');
        chatOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    window.addEventListener('resize', () => {
        if (!isMobile()) {
            chatOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });

    if (chatAttachBtn && chatFileInput) {
        chatAttachBtn.addEventListener('click', () => chatFileInput.click());
        chatFileInput.addEventListener('change', async (event) => {
            const files = Array.from(event.target.files || []);
            if (!files.length) return;
            const prepared = await Promise.all(files.map(async (file) => ({
                name: file.name,
                type: inferAttachmentType(file),
                mimeType: file.type || 'application/octet-stream',
                size: file.size,
                dataUrl: await readFileAsDataUrl(file),
            })));
            pendingAttachments = [...pendingAttachments, ...prepared];
            updateAttachmentPreview();
            event.target.value = '';
        });
    }

    const syncAgentButtonVisibility = () => {
        const isAgentMode = currentSessionStatus === 'agent_active' || currentSessionStatus === 'escalated';
        if (chatAgentBtn) {
            chatAgentBtn.classList.toggle('hidden', isAgentMode);
        }
        if (menuRequestAgent) {
            menuRequestAgent.classList.toggle('hidden', isAgentMode);
        }
    };

    const updateChatState = (user) => {
        currentUser = user;

        if (chatStatus) {
            if (user) {
                chatStatus.textContent = `Signed in as ${user.firstName || user.email}`;
            } else {
                chatStatus.textContent = 'AI assistant ready.';
            }
        }

        if (chatAssistantBtn) {
            chatAssistantBtn.textContent = 'Open AI chat';
        }

        if (chatSignOutBtn) {
            if (user) {
                chatSignOutBtn.textContent = 'Sign out';
                chatSignOutBtn.classList.remove('hidden');
            } else {
                chatSignOutBtn.classList.add('hidden');
            }
        }

        if (chatInput) chatInput.disabled = false;
        if (chatSubmitBtn) chatSubmitBtn.disabled = false;
        if (chatBox && !chatBox.hasChildNodes()) {
            appendMessage('Welcome to TevrocSoft AI assistant. Ask me about our services, apps, pricing or support.', 'bot');
        }
    };

    const loadUser = async () => {
        restoreTokenFromUrl();
        syncAuthToken();

        const stored = getStoredUser();
        if (stored) {
            chatStatus.textContent = 'Restoring your chat session...';
        }

        const current = await loadCurrentUser();
        if (current) {
            updateChatState(current);
        } else if (stored) {
            updateChatState(stored);
        } else {
            updateChatState(null);
        }

        await restoreChatSession();
        openChatIfPending();

        if (!liveChatSessionId) {
            try {
                // ensure a session exists and realtime room is connected even without an agent
                await createChatSession();
                connectLiveAgentRoom();
            } catch (err) {
                console.warn('Unable to create/connect live chat on load', err);
            }
        }
    };

    const getRealtimeRoomKey = (sessionKey) => {
        if (!sessionKey || !base44?.realtime) return '';
        return sessionKey;
    };

    const normalizeIncomingPayload = (payload) => {
        let parsed = payload;
        if (typeof parsed === 'string') {
            try {
                parsed = JSON.parse(parsed);
            } catch {
                parsed = null;
            }
        }

        const messagePayload = parsed?.type === 'chat_message'
            ? (parsed.message || parsed.payload)
            : parsed?.message || parsed?.payload || parsed;

        if (!messagePayload) return null;

        const rawRoom = parsed?.room || messagePayload?.room || parsed?.payload?.room;
        const incomingSessionId = parsed?.sessionId
            || parsed?.session_id
            || messagePayload?.sessionId
            || messagePayload?.session_id
            || parsed?.payload?.sessionId
            || parsed?.payload?.session_id;
        const incomingRoom = rawRoom || parsed?.room || messagePayload?.room || parsed?.payload?.room || messagePayload?.payload?.room;
        const incomingSessionIdLower = parsed?.sessionIdLower || parsed?.session_idLower || parsed?.sessionId?.toLowerCase?.() || parsed?.session_id?.toLowerCase?.() || messagePayload?.sessionId?.toLowerCase?.() || messagePayload?.session_id?.toLowerCase?.();
        const incomingRoomLower = incomingRoom?.toLowerCase?.();
        const content = typeof messagePayload === 'string'
            ? messagePayload
            : (messagePayload?.content || messagePayload?.message || '');
        const role = messagePayload?.role === 'agent' || messagePayload?.role === 'bot' ? 'bot' : 'user';
        const messageId = messagePayload?.id || messagePayload?._id || `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`;

        return {
            parsed,
            messagePayload,
            incomingSessionId,
            incomingSessionIdLower,
            incomingRoom,
            incomingRoomLower,
            content,
            role,
            messageId,
        };
    };

    const showChatNotification = async ({ title, body, sessionId, kind = 'agent_message' }) => {
        if (!document.hidden || !base44?.chatNotifications || !sessionId) return;
        try {
            if (kind === 'agent_status') {
                await base44.chatNotifications.showStatus({ sessionId, title, body });
            } else {
                await base44.chatNotifications.showMessage({ sessionId, title, body });
            }
        } catch (error) {
            console.info('[contact] native chat notification unavailable', error);
        }
    };

    const connectLiveAgentRoom = () => {
        const sessionKey = liveChatSessionId || getStoredSessionId();
        if (liveRoomConnected && sessionKey) {
            console.info('[contact] live room already connected, skipping');
            return;
        }

        console.info('[contact] connecting live agent room', { sessionId: sessionKey });
        const realtimeFactory = base44?.realtime?.room || base44?.realtime?.connect;
        if (!realtimeFactory || !sessionKey) {
            console.log('[contact] skipped live room connection', { hasRealtimeFactory: !!realtimeFactory, sessionId: sessionKey });
            return;
        }

        liveChatRooms.forEach((room) => room?.close?.());
        liveChatRooms = [];
        liveChatSessionId = sessionKey;

        const roomKey = getRealtimeRoomKey(sessionKey);
        const encryptedRoomKey = base44?.realtime?.encryptRoomName?.(sessionKey) || '';
        console.info('[contact] connecting live room', { sessionId: sessionKey, roomKey, encryptedRoomKey });
        chatStatus.textContent = 'Connecting live chat...';

        const connectTo = (roomName) => {
            try {
                const roomConnection = realtimeFactory(roomName, {
                    open: (meta) => {
                        console.info('[contact] realtime room open', { sessionId: liveChatSessionId, roomName, roomKey, encryptedRoomKey, meta });
                        chatStatus.textContent = 'Live chat connected';
                        liveRoomConnected = true;
                    },
                    message: async (payload) => {
                        console.info('[contact] received realtime payload', { payload });
                        const normalized = normalizeIncomingPayload(payload);
                        if (!normalized) {
                            console.warn('[contact] skipped realtime payload because normalization returned null');
                            return;
                        }

                        const { parsed, messagePayload, incomingSessionId, incomingSessionIdLower, incomingRoom, incomingRoomLower, content, role, messageId } = normalized;
                        const expectedRawRoom = roomKey;
                        const expectedEncryptedRoom = encryptedRoomKey;
                        const roomMatches = incomingRoom && [expectedRawRoom, expectedEncryptedRoom].some((room) => room && incomingRoomLower === room.toLowerCase());
                        const sessionMatches = incomingSessionId && liveChatSessionId && (incomingSessionId === liveChatSessionId || incomingSessionIdLower === String(liveChatSessionId).toLowerCase());
                        if (!sessionMatches && !roomMatches) {
                            console.warn('[contact] realtime payload skipped - no session/room match', { incomingSessionId, incomingSessionIdLower, liveChatSessionId, incomingRoom, messageId });
                            return;
                        }

                        if (parsed?.type === 'chat_status') {
                            currentSessionStatus = parsed.status || currentSessionStatus;
                            const isAgentMode = currentSessionStatus === 'agent_active' || currentSessionStatus === 'escalated';
                            if (chatModeLabel) chatModeLabel.textContent = isAgentMode ? 'Agent Mode' : 'AI Assistant';
                            syncAgentButtonVisibility();
                            const statusText = currentSessionStatus === 'agent_active'
                                ? 'A support agent accepted your request.'
                                : currentSessionStatus === 'agent_rejected'
                                    ? 'No support agent is available right now.'
                                    : '';
                            if (statusText) {
                                appendMessage(statusText, 'bot');
                                chatStatus.textContent = statusText;
                                await showChatNotification({ title: 'TevrocSoft support', body: statusText, sessionId: liveChatSessionId, kind: 'agent_status' });
                            }
                            return;
                        }

                        if (receivedMessageIds.has(messageId)) {
                            console.warn('[contact] realtime payload skipped - duplicate', { messageId });
                            return;
                        }

                        const incomingMessage = {
                            ...messagePayload,
                            id: messageId,
                            sessionId: incomingSessionId || liveChatSessionId,
                            session_id: incomingSessionId || liveChatSessionId,
                            role: messagePayload.role || (role === 'bot' ? 'agent' : 'visitor'),
                            content,
                            createdAt: messagePayload.createdAt || Date.now(),
                        };

                        if (incomingSessionId) {
                            liveChatSessionId = incomingSessionId;
                            setStoredSessionId(incomingSessionId);
                        }

                        // update local session status if present on payload
                        if (messagePayload && messagePayload.status) {
                            currentSessionStatus = messagePayload.status;
                            if (chatModeLabel) {
                                chatModeLabel.textContent = (currentSessionStatus === 'agent_active' || currentSessionStatus === 'escalated') ? 'Agent Mode' : 'AI Assistant';
                            }
                            syncAgentButtonVisibility();
                        }

                        chatStatus.textContent = 'Live chat connected';
                        appendMessage(content, role);
                        if (role === 'bot' || messagePayload.role === 'agent') {
                            await showChatNotification({ title: 'New support message', body: content || 'Your support agent sent an attachment.', sessionId: liveChatSessionId });
                        }
                        await persistIncomingChatMessage(incomingMessage);
                    },
                    close: (event) => {
                        chatStatus.textContent = 'Live chat disconnected';
                        console.info('[contact] realtime room closed', { sessionId: liveChatSessionId, roomName, roomKey, encryptedRoomKey, code: event?.code, reason: event?.reason });
                    },
                    error: (event) => {
                        chatStatus.textContent = 'Live chat error';
                        console.error('[contact] realtime room error', { sessionId: liveChatSessionId, roomName, roomKey, encryptedRoomKey, event });
                    },
                }, {}, { reconnectMs: 3000, maxReconnects: 8 });
                liveChatRooms.push(roomConnection);
            } catch (err) {
                console.warn('[contact] failed to connect to realtime room', roomName, err);
            }
        };

        // Base44 realtime.room() already encrypts the provided room key internally.
        // Passing an already-encrypted room name will produce a double-encrypted path,
        // so only connect with the plain session key here.
        if (roomKey) connectTo(roomKey);
    };

    const getStoredSessionId = () => localStorage.getItem('tevroc_live_chat_session');
    const setStoredSessionId = (sessionId) => {
    localStorage.setItem('tevroc_live_chat_session', sessionId);
    };

    const getAppContext = () => {
    const user = currentUser || getStoredUser() || {};
    return {
        appId: window.appParams.appId,
        userId: user.email || user.id || 'default',
    };
    };

    const receivedMessageIds = new Set();
    const sentMessageIds = new Set();

    const persistIncomingChatMessage = async (incoming) => {
    if (!incoming || !incoming.id) return;
    if (sentMessageIds.has(incoming.id) || receivedMessageIds.has(incoming.id)) return;

    const sessionId = incoming.sessionId || incoming.session_id || liveChatSessionId;
    if (!sessionId) return;

    const { appId, userId } = getAppContext();
    const payload = {
        appId,
        userId: incoming.role === 'agent' ? 'agent' : userId,
        ...incoming,
        sessionId,
        session_id: sessionId,
        room: incoming.room || base44.realtime.encryptRoomName(sessionId),
    };

    try {
        await persistChatMessage(payload);
        receivedMessageIds.add(incoming.id);
    } catch (err) {
        console.warn('Unable to persist incoming chat message', err);
    }
    };

    const normalizeRecords = (records) => {
    if (Array.isArray(records)) return records;
    if (records && Array.isArray(records.data)) return records.data;
    return [];
    };

    const findChatSessionRecord = async (sessionId) => {
    if (!sessionId) return null;
    try {
        const resp = await base44.entities.ChatSession.query({
        filter: { appId: window.appParams.appId, sessionId },
        limit: 1,
        });
        const record = normalizeRecords(resp)[0];
        if (record) return record;

        const altResp = await base44.entities.ChatSession.query({
        filter: { appId: window.appParams.appId, session_id: sessionId },
        limit: 1,
        });
        return normalizeRecords(altResp)[0] || null;
    } catch (err) {
        console.warn('Unable to query chat session', err);
        return null;
    }
    };

    const updateChatSessionStatus = async (sessionId, patch) => {
    if (!sessionId) return;
    try {
        const record = await findChatSessionRecord(sessionId);
        if (!record?.id) return;
        await base44.entities.ChatSession.update(record.id, { ...record, ...patch });
    } catch (err) {
        console.warn('Unable to update chat session status', err);
    }
    };

    const timestampOf = (v) => {
    if (v == null) return 0;
    if (typeof v === 'number') return v;
    const asNumber = Number(v);
    if (!Number.isNaN(asNumber)) return asNumber;
    const parsed = Date.parse(String(v));
    return Number.isNaN(parsed) ? 0 : parsed;
    };

    const loadChatHistory = async (sessionId) => {
        console.info('[contact] loading chat history for session', sessionId);
    if (!sessionId) return;
    connectLiveAgentRoom();
    chatBox.innerHTML = '';
    try {
        const [bySessionId, bySessionIdAlt] = await Promise.all([
            base44.entities.ChatMessage.query({ filter: { appId: window.appParams.appId, sessionId } }),
            base44.entities.ChatMessage.query({ filter: { appId: window.appParams.appId, session_id: sessionId } }),
        ]);
        const messages = normalizeRecords(bySessionId)
            .concat(normalizeRecords(bySessionIdAlt))
            .filter((message, index, array) => array.findIndex((candidate) => (candidate?.id || candidate?.entityId) === (message?.id || message?.entityId)) === index);
        messages.sort((a, b) => timestampOf(a.createdAt) - timestampOf(b.createdAt));
        messages.filter(m => !(m.content == '' && (!m.attachments || m.attachments.length === 0))).forEach((message) => {
            console.log(message); 
            appendMessage(message.content || '', message.role === 'agent' || message.role === 'bot' ? 'bot' : 'user', {
                attachments: Array.isArray(message.attachments) ? message.attachments : [],
            });
        });
        try {
        const sessionRecord = await findChatSessionRecord(sessionId);
        const status = sessionRecord?.status || '';
        currentSessionStatus = status || currentSessionStatus;
        if (chatModeLabel) {
            if (status === 'escalated' || status === 'agent_active') {
            chatModeLabel.textContent = 'Agent Mode';
            } else {
            chatModeLabel.textContent = 'AI Assistant';
            }
        }
        syncAgentButtonVisibility();
        } catch (err) {
        /* ignore */
        }
    } catch (err) {
        console.warn('Unable to load chat history', err);
    }
    };

    const restoreChatSession = async () => {
    const storedSessionId = getStoredSessionId();
    if (!storedSessionId) return;
    liveChatSessionId = storedSessionId;
    await loadChatHistory(storedSessionId);
    };

    const createChatSession = async () => {
    if (liveChatSessionId) {
        return liveChatSessionId;
    }

    const user = currentUser || getStoredUser() || {};
    const sessionId = user.email
        ? `web_${user.email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`
        : `web_${Date.now()}`;

    liveChatSessionId = sessionId;
    setStoredSessionId(sessionId);
    currentSessionStatus = 'ai_active';

    const payload = {
        appId: window.appParams.appId,
        userId: user.email || 'default',
        sessionId,
        visitor_name: user.firstName || user.name || user.email || 'Visitor',
        visitor_email: user.email || '',
        status: 'ai_active',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastMessageAt: Date.now(),
    };

    try {
        await base44.entities.ChatSession.create(payload); 
    } catch (err) {
        console.warn('Unable to create chat session', err);
    }

    return sessionId;
    };

    const persistChatMessage = async (message) => {
    if (!message || !message.id) return null;
    if (receivedMessageIds.has(message.id) || sentMessageIds.has(message.id)) {
        return { ...message, persisted: true };
    }

    const { appId, userId } = getAppContext();
    const sessionId = message.sessionId || message.session_id || liveChatSessionId;
    const payload = {
        appId,
        userId,
        ...message,
        id: message.id,
        sessionId,
        session_id: message.session_id || message.sessionId || sessionId,
        room: message.room || (sessionId ? (base44?.realtime?.encryptRoomName?.(sessionId) || sessionId) : ''),
        createdAt: message.createdAt || Date.now(),
        content: message.content ?? '',
        attachments: Array.isArray(message.attachments) ? message.attachments : [],
    };
    try {
        sentMessageIds.add(message.id);
        await base44.entities.ChatMessage.create(payload);
        return payload;
    } catch (err) {
        console.warn('Unable to persist chat message', err);
        return null;
    }
    };

    const publishLiveMessage = async (message) => {
    if (!liveChatSessionId) return;
    const publishRoom = message.room || (base44?.realtime?.encryptRoomName?.(liveChatSessionId) || getRealtimeRoomKey(liveChatSessionId));
    console.log('[contact] publishing live message', { sessionId: liveChatSessionId, publishRoom, message });
    await Promise.all(liveChatRooms.map((roomConnection) => {
        try {
        return roomConnection?.publish?.({ type: 'chat_message', room: publishRoom, sessionId: liveChatSessionId, session_id: liveChatSessionId, message, payload: message });
        } catch (err) {
        console.warn('[contact] realtime publish failed', err);
        return null;
        }
    }));
    };

    // Handle actions from Android/desktop notifications while this chat is open.
    base44?.chatNotifications?.onEvent?.(({ action, sessionId, reply }) => {
        if (!sessionId || sessionId !== liveChatSessionId) return;
        if (action === 'open') {
            openChatDialog();
            return;
        }
        if (action === 'reply' && reply?.trim()) {
            const visitorMsg = {
                id: `msg_${Date.now()}`,
                sessionId: liveChatSessionId,
                session_id: liveChatSessionId,
                role: 'visitor',
                content: reply.trim(),
                createdAt: Date.now(),
            };
            appendMessage(visitorMsg.content, 'user');
            publishLiveMessage(visitorMsg).catch((error) => console.warn('[contact] notification reply failed', error));
            persistChatMessage(visitorMsg).catch((error) => console.warn('[contact] notification reply persistence failed', error));
        }
    });

    const clearChat = async () => {
    try {
        // Close realtime rooms
        liveChatRooms.forEach((roomConnection) => {
        try { roomConnection?.close?.(); } catch (e) { /* ignore */ }
        });
        liveChatRooms = [];
        liveRoomConnected = false;

        // Clear UI and local session
        chatBox.innerHTML = '';
        localStorage.removeItem('tevroc_live_chat_session');
        liveChatSessionId = null;

        // Create a fresh session and send welcome message
        const sessionKey = await createChatSession();
        const welcome = 'Welcome to TevrocSoft AI assistant. Ask me about our services, apps, pricing or support.';
        const botMessage = {
        id: `msg_${Date.now()}`,
        session_id: sessionKey,
        sessionId: sessionKey,
        role: 'bot',
        content: welcome,
        createdAt: Date.now(),
        };

        appendMessage(botMessage.content, 'bot');
        await publishLiveMessage(botMessage);
        await persistChatMessage(botMessage);
        if (chatModeLabel) chatModeLabel.textContent = 'AI Assistant';
        currentSessionStatus = 'ai_active';
        syncAgentButtonVisibility();
        updateChatState(currentUser);
    } catch (err) {
        console.warn('Unable to clear chat', err);
    }
    };

    const setPendingChatOpen = (value) => {
    if (value) {
        localStorage.setItem('pendingChatOpen', '1');
    } else {
        localStorage.removeItem('pendingChatOpen');
    }
    };

    const openChatIfPending = () => {
    if (localStorage.getItem('pendingChatOpen') === '1') {
        setPendingChatOpen(false);
        openChatDialog();
    }
    };

    const signOut = () => {
    clearToken();
    localStorage.removeItem('user');
    localStorage.removeItem('idToken');
    localStorage.removeItem('tevroc_live_chat_session');
    liveChatSessionId = null;
    if (googleSubscription) {
        googleSubscription();
        googleSubscription = null;
    }
    liveChatRooms.forEach((roomConnection) => {
        try { roomConnection?.close?.(); } catch (e) { /* ignore */ }
    });
    liveChatRooms = [];
    liveRoomConnected = false;
    updateChatState(null);
    };

    const handleAssistantClick = async () => {
    if (!chatPanel.classList.contains('hidden')) {
        closeChatDialog();
        return;
    }

    if (chatStatus) {
        chatStatus.textContent = 'Checking chat availability...';
    }

    if (!base44?.integrations?.Core?.InvokeLLM) {
        if (chatStatus) chatStatus.textContent = 'Chat integration unavailable.';
        appendMessage('The assistant is unavailable right now. Please try again shortly.', 'bot');
        openChatDialog();
        return;
    }

    const user = currentUser || await loadCurrentUser();
    if (!user) {
        setPendingChatOpen(true);
        chatStatus.textContent = 'Signing in with Google...';
        await base44.auth.loginWithProvider('google', window.location.href, async (token, profile) => {
        if (token) {
            base44.setToken(token);
            base44.setToken(token);
            await loadCurrentUser();
            setPendingChatOpen(false);
            openChatDialog();
        }
        if (profile) {
            updateChatState(profile);
        }
        });
        return;
    }

    updateChatState(user);
    // ensure a chat session exists and realtime room is connected before opening
    try {
        await createChatSession();
        await loadChatHistory(liveChatSessionId);
        if (currentSessionStatus === 'agent_active' || currentSessionStatus === 'escalated') {
            if (chatModeLabel) chatModeLabel.textContent = 'Agent Mode';
        }
    } catch (err) {
        console.warn('Error preparing chat session', err);
    }
    openChatDialog();
    };

    const getChatbotContext = async () => {
    try {
        const baseUrl = window.appParams?.apiBaseUrl || window.appParams?.appBaseUrl || window.location.origin;
        const serviceUrl = window.appParams?.serviceUrl || window.appParams?.appBaseUrl || baseUrl;
        const client = window.Tevroc?.createClient?.({
        baseUrl,
        serviceUrl,
        appId: 'tevrocdev',
        appName: 'TevrocDev',
        userId: 'default',
        });
        if (!client?.entities?.ChatbotContent) return '';
        const records = await client.entities.ChatbotContent.query({
        filter: { appId: 'tevrocdev', userId: 'default' },
        limit: 1,
        });
        const item = Array.isArray(records?.data) ? records.data[0] : Array.isArray(records) ? records[0] : null;
        return item?.content || '';
    } catch (err) {
        console.warn('Could not load chatbot context', err);
        return '';
    }
    };

    const handleAgentHandoff = async (message) => {
    if (!message || typeof message !== 'string') return false;

    const supportAgent = base44?.agents?.Support;
    const directPersonRequest = /connect me with.*(thubakgale|mabalane|samuel)|request (thubakgale|mabalane|samuel)|talk to (thubakgale|mabalane|samuel)|talk to .*person/i.test(message);
    const shouldHandoff = directPersonRequest || ['agent', 'support', 'human', 'live agent', 'talk to someone', 'speak to someone', 'contact support', 'help me please']
        .some((keyword) => message.toLowerCase().includes(keyword));

    if (!shouldHandoff) return false;

    const sessionKey = liveChatSessionId || await createChatSession();
    if (!sessionKey) return false;
    liveChatSessionId = sessionKey;
    connectLiveAgentRoom();
    await updateChatSessionStatus(sessionKey, {
        status: 'escalated',
        updatedAt: Date.now(),
        lastMessageAt: Date.now(),
    });

    // ChatSession is the source of truth for the agent app. The legacy Support
    // conversation is useful context when available, but must not prevent the
    // mobile agent notification from being sent.
    if (!supportAgent?.createConversation || !supportAgent?.addMessage) {
        console.warn('Support agent conversation API is unavailable; using live chat session handoff.');
        return true;
    }

    try {
        const conversation = await supportAgent.createConversation({
        title: 'Support handoff from website chatbot',
        metadata: { appId: window.appParams.appId, userId: getAppContext().userId, sessionId: sessionKey },
        });
        const conversationId = conversation?.data?.id || conversation?.id;
        if (conversationId) {
        await supportAgent.addMessage(conversationId, {
            role: 'user',
            content: message,
            metadata: { appId: window.appParams.appId, userId: getAppContext().userId || 'default', sessionId: sessionKey },
        });
        return true;
        }
        return true;
    } catch (err) {
        console.warn('Agent handoff failed', err);
        return true;
    }
    };

    const askChatbot = async (message) => {
    if (await handleAgentHandoff(message)) {
        return {
        text: 'I can connect you with an agent. I will hand this over so a support person can assist you directly.',
        raw: null,
        };
    }

    if (!base44?.integrations?.Core?.InvokeLLM) {
        throw new Error('Chatbot service unavailable.');
    }

    const ownerContent = await getChatbotContext();
    const prompt = `You are TevrocSoft's chatbot assistant. Answer questions only about TevrocSoft services, apps, pricing, or support. Keep responses concise, friendly, and professional.${ownerContent ? `\n\nOWNER PROVIDED CHATBOT CONTENT:\n${ownerContent}` : ''}\n\nUser: ${message}`;
    const result = await base44.integrations.Core.InvokeLLM({
        appId: window.appParams.appId,
        userId: 'default',
        prompt,
    });
    console.log('Chatbot response payload:', result);
    const responseText = result?.text || result?.data?.text || result?.response || '';
    if (responseText) {
        return { text: responseText, raw: result };
    }
    return {
        text: 'I can help with TevrocSoft services, apps, pricing and support. Ask me anything about our team or products.',
        raw: result,
    };
    };

    let agentRequestPending = false;

    const requestChatAgent = async () => {
    if (agentRequestPending) return;
    agentRequestPending = true;

    const displayName = window.chatDisplayName || 'TevrocSoft support';
    const user = currentUser || await loadCurrentUser();
    if (!user) {
        setPendingChatOpen(true);
        if (chatStatus) chatStatus.textContent = 'Signing in with Google...';
        try {
            await base44.auth.loginWithProvider('google', window.location.href, async (token, profile) => {
                if (token) {
                    base44.setToken(token);
                    await loadCurrentUser();
                    setPendingChatOpen(false);
                    openChatDialog();
                }
                if (profile) {
                    updateChatState(profile);
                }
            });
        } finally {
            agentRequestPending = false;
        }
        return;
    }

    const requestText = `Please connect me with ${displayName}.`;
    openChatDialog();
    const sessionKey = await createChatSession();
    liveChatSessionId = sessionKey;
    connectLiveAgentRoom();
    console.log('[contact] requestChatAgent session ready', { sessionKey, displayName });
    const requestMsg = {
        id: `req_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        sessionId: liveChatSessionId,
        session_id: liveChatSessionId,
        role: 'visitor',
        content: requestText,
        createdAt: Date.now(),
    };

    sentMessageIds.add(requestMsg.id);
    appendMessage(requestText, 'user', { id: requestMsg.id });
    await publishLiveMessage(requestMsg);
    await persistChatMessage(requestMsg);
    chatStatus.textContent = `Requesting ${displayName}...`;

    try {
        const handoffSuccess = await handleAgentHandoff(requestText);
        if (handoffSuccess) {
            const responseId = `bot_${Date.now()}_${Math.random().toString(36).slice(2)}`;
            appendMessage(`I have requested ${displayName}. They will join shortly.`, 'bot', { id: responseId });
            chatStatus.textContent = `${displayName} requested.`;
            currentSessionStatus = 'escalated';
            if (chatModeLabel) chatModeLabel.textContent = displayName;
            syncAgentButtonVisibility();
        } else {
            const responseId = `bot_${Date.now()}_${Math.random().toString(36).slice(2)}`;
            appendMessage(`Sorry, I could not request ${displayName} right now. Please try again later.`, 'bot', { id: responseId });
            chatStatus.textContent = 'Agent request failed.';
            if (chatModeLabel) chatModeLabel.textContent = 'AI Assistant';
            syncAgentButtonVisibility();
        }
    } finally {
        agentRequestPending = false;
    }
    };

    const registeredAgentTriggers = new WeakSet();
    const registerAgentTrigger = (button) => {
        if (!button || registeredAgentTriggers.has(button)) return;
        registeredAgentTriggers.add(button);
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openChatDialog();
            requestChatAgent();
        });
    };

    if (chatAssistantBtn) {
        chatAssistantBtn.addEventListener('click', handleAssistantClick);
    }
    if (chatSignOutBtn) {
        chatSignOutBtn.addEventListener('click', signOut);
    }
    registerAgentTrigger(chatAgentBtn);
    registerAgentTrigger(document.getElementById('chatAgentBtnTop'));
    document.querySelectorAll('[data-agent-open]').forEach(registerAgentTrigger);
    // Menu toggles and handlers
    const chatMenuBtn = document.getElementById('chatMenuBtn');
    const chatMenu = document.getElementById('chatMenu');
    const menuRequestAgent = document.getElementById('menuRequestAgent');
    const menuClearChat = document.getElementById('menuClearChat');

    if (chatMenuBtn && chatMenu) {
    chatMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = chatMenu.classList.contains('hidden');
        if (isHidden) chatMenu.classList.remove('hidden'); else chatMenu.classList.add('hidden');
    });
    // close menu on outside click
    document.addEventListener('click', () => chatMenu.classList.add('hidden'));
    }

    if (menuRequestAgent) {
    menuRequestAgent.addEventListener('click', async (e) => {
        e.stopPropagation();
        chatMenu.classList.add('hidden');
        await requestChatAgent();
    });
    }

    if (menuClearChat) {
    menuClearChat.addEventListener('click', async (e) => {
        e.stopPropagation();
        chatMenu.classList.add('hidden');
        await clearChat();
    });
    }
    chatOverlay.addEventListener('click', closeChatDialog);
    chatBackBtn.addEventListener('click', closeChatDialog);
    const openChatTriggerSelectors = ['#chatAssistantBtn', '#chatAgentBtn', '#chatAgentBtnTop', '[data-chat-open]', '[data-agent-open]'];
    document.addEventListener('click', (event) => {
    const target = event.target;
    const isChatTrigger = target && openChatTriggerSelectors.some((selector) => target.closest?.(selector));
    if (!isMobile() && !chatPanel.classList.contains('hidden') && !chatPanel.contains(target) && !isChatTrigger) {
        closeChatDialog();
    }
    });

    chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message && !pendingAttachments.length) return;

    await createChatSession();

    const attachments = pendingAttachments.length ? await Promise.all(pendingAttachments.map(async (attachment) => ({
        ...attachment,
        dataUrl: attachment.dataUrl || await readFileAsDataUrl(new File([attachment.dataUrl || ''], attachment.name || 'attachment', { type: attachment.mimeType || 'application/octet-stream' }))
    }))) : [];

    const visitorMsg = {
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        session_id: liveChatSessionId,
        sessionId: liveChatSessionId,
        role: 'visitor',
        content: message,
        attachments,
        createdAt: Date.now(),
    };

    sentMessageIds.add(visitorMsg.id);
    appendMessage(message || 'Attachment sent', 'user', { id: visitorMsg.id, attachments });
    await publishLiveMessage(visitorMsg);
    await persistChatMessage(visitorMsg);

    chatInput.value = '';
    clearPendingAttachments();
    // If session is in agent mode, do not call the AI LLM — message should go to agent
    if (currentSessionStatus === 'agent_active' || currentSessionStatus === 'escalated') {
        chatStatus.textContent = 'Message sent to agent';
        return;
    }

    chatStatus.textContent = 'Thinking...';
    try {
        const reply = await askChatbot(message);
        const responseText = reply?.text || 'Sorry, I could not answer that right now.';
        const botMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        session_id: liveChatSessionId,
        sessionId: liveChatSessionId,
        role: 'bot',
        content: responseText,
        rawResponse: reply?.raw ?? null,
        createdAt: Date.now(),
        };
        sentMessageIds.add(botMessage.id);
        appendMessage(botMessage.content, 'bot', { id: botMessage.id });
        await publishLiveMessage(botMessage);
        await persistChatMessage(botMessage);
        updateChatState(currentUser);
    } catch (err) {
        console.error(err);
        appendMessage('The assistant is unavailable. Please try again later.', 'bot');
        chatStatus.textContent = 'Chatbot unavailable.';
    }
    });

    loadUser().then(() => {
        console.info('[contact] chat session initialized', { sessionId: liveChatSessionId, user: currentUser });
        // Ensure we have a session and connect to the live room once (non-blocking)
        createChatSession().then(() => {
            console.log('Session created or restored. Session ID: ' + liveChatSessionId);
            if (!liveRoomConnected) connectLiveAgentRoom();
        }).catch((err) => console.warn('Unable to ensure live room on load', err));    
    })

});
