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

    const chatAssistantBtn = document.getElementById('chatAssistantBtn');
    const chatSignOutBtn = document.getElementById('chatSignOutBtn');
    const chatAgentBtn = document.getElementById('chatAgentBtn');
    const chatStatus = document.getElementById('chatStatus');
    const chatInput = document.getElementById('chatInput');
    const chatSubmitBtn = document.getElementById('chatSubmitBtn');
    const chatForm = document.getElementById('chatForm');
    const chatBox = document.getElementById('chatBox');
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

    const isMobile = () => window.innerWidth < 1024;

    const appendMessage = (text, role = 'bot') => {
        const wrapper = document.createElement('div');
        wrapper.className = role === 'user' ? 'flex justify-end' : 'flex justify-start';
        wrapper.innerHTML = `<div class="max-w-[88%] ${role === 'user' ? 'rounded-3xl bg-blue-600 text-white' : 'rounded-3xl bg-slate-100 text-slate-900'} p-4 text-sm leading-6 shadow-sm">${text}</div>`;
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

    const updateChatState = (user) => {
        currentUser = user;

        //alert(user);

        if (user) {
            chatStatus.textContent = `Signed in as ${user.firstName || user.email}`;
            chatAssistantBtn.textContent = 'Open AI chat';
            chatSignOutBtn.textContent = 'Sign out';
            chatSignOutBtn.classList.remove('hidden');
            chatInput.disabled = false;
            chatSubmitBtn.disabled = false;
            if (!chatBox.hasChildNodes()) {
                appendMessage('Welcome to TevrocSoft AI assistant. Ask me about our services, apps, pricing or support.', 'bot');
            }
        } else {
            chatStatus.textContent = 'AI assistant ready.';
            chatAssistantBtn.textContent = 'Open AI chat';
            chatSignOutBtn.classList.add('hidden');
            chatInput.disabled = false;
            chatSubmitBtn.disabled = false;
            if (!chatBox.hasChildNodes()) {
                appendMessage('Welcome to TevrocSoft AI assistant. Ask me about our services, apps, pricing or support.', 'bot');
            }
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

                        const { messagePayload, incomingSessionId, incomingSessionIdLower, incomingRoom, incomingRoomLower, content, role, messageId } = normalized;
                        const expectedRawRoom = roomKey;
                        const expectedEncryptedRoom = encryptedRoomKey;
                        const roomMatches = incomingRoom && [expectedRawRoom, expectedEncryptedRoom].some((room) => room && incomingRoomLower === room.toLowerCase());
                        const sessionMatches = incomingSessionId && liveChatSessionId && (incomingSessionId === liveChatSessionId || incomingSessionIdLower === String(liveChatSessionId).toLowerCase());
                        if (!sessionMatches && !roomMatches) {
                            console.warn('[contact] realtime payload skipped - no session/room match', { incomingSessionId, incomingSessionIdLower, liveChatSessionId, incomingRoom, messageId });
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
                        }

                        chatStatus.textContent = 'Live chat connected';
                        appendMessage(content, role);
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

    const persistIncomingChatMessage = async (incoming) => {
    if (!incoming || !incoming.id || receivedMessageIds.has(incoming.id)) return;

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
        const response = await base44.entities.ChatMessage.query({ filter: { appId: window.appParams.appId, sessionId } });
        const messages = normalizeRecords(response);
        messages.sort((a, b) => timestampOf(a.createdAt) - timestampOf(b.createdAt));
        messages.forEach((message) => {
        appendMessage(message.content || '', message.role === 'agent' || message.role === 'bot' ? 'bot' : 'user');
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
    const { appId, userId } = getAppContext();
    const payload = {
        appId,
        userId,
        ...message,
        sessionId: message.sessionId || message.session_id || liveChatSessionId,
        session_id: message.session_id || message.sessionId || liveChatSessionId,
        room: message.room || (liveChatSessionId ? base44.realtime.encryptRoomName(liveChatSessionId) : ''),
    };
    try {
        await base44.entities.ChatMessage.create(payload); 
    } catch (err) {
        console.warn('Unable to persist chat message', err);
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

    if (!base44?.integrations?.Core?.InvokeLLM) {
        chatStatus.textContent = 'Chat integration unavailable.';
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
    const shouldHandoff = ['agent', 'support', 'human', 'live agent', 'talk to someone', 'speak to someone', 'contact support', 'help me please']
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

    if (!supportAgent?.createConversation || !supportAgent?.addMessage) {
        console.warn('Support agent API is unavailable');
        return false;
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
        return false;
    } catch (err) {
        console.warn('Agent handoff failed', err);
        return false;
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

    const requestChatAgent = async () => {
    const requestText = 'Please connect me with a human support agent.';
    openChatDialog();
    const sessionKey = await createChatSession();
    liveChatSessionId = sessionKey;
    connectLiveAgentRoom();
    console.log('[contact] requestChatAgent session ready', { sessionKey });
    const requestMsg = {
        id: `msg_${Date.now()}`,
        sessionId: liveChatSessionId,
        session_id: liveChatSessionId,
        role: 'visitor',
        content: requestText,
        createdAt: Date.now(),
    };

    appendMessage(requestText, 'user');
    await publishLiveMessage(requestMsg);
    chatStatus.textContent = 'Requesting a human agent...';

    const handoffSuccess = await handleAgentHandoff(requestText);
    if (handoffSuccess) {
        appendMessage('I have requested a human agent. Someone will join shortly.', 'bot');
        chatStatus.textContent = 'Human agent requested.';
        currentSessionStatus = 'escalated';
        if (chatModeLabel) chatModeLabel.textContent = 'Agent Mode';
    } else {
        appendMessage('Sorry, I could not request an agent right now. Please try again later.', 'bot');
        chatStatus.textContent = 'Agent request failed.';
        if (chatModeLabel) chatModeLabel.textContent = 'AI Assistant';
    }
    };

    chatAssistantBtn.addEventListener('click', handleAssistantClick);
    chatSignOutBtn.addEventListener('click', signOut);
    chatAgentBtn.addEventListener('click', requestChatAgent);
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
    document.addEventListener('click', (event) => {
    const target = event.target;
    if (!isMobile() && !chatPanel.classList.contains('hidden') && !chatPanel.contains(target) && !chatAssistantBtn.contains(target)) {
        closeChatDialog();
    }
    });

    chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    await createChatSession();

    const visitorMsg = {
        id: `msg_${Date.now()}`,
        session_id: liveChatSessionId,
        sessionId: liveChatSessionId,
        role: 'visitor',
        content: message,
        createdAt: Date.now(),
    };

    appendMessage(message, 'user');
    await publishLiveMessage(visitorMsg);
    await persistChatMessage(visitorMsg);

    chatInput.value = '';
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
        id: `msg_${Date.now()}`,
        session_id: liveChatSessionId,
        sessionId: liveChatSessionId,
        role: 'bot',
        content: responseText,
        rawResponse: reply?.raw ?? null,
        createdAt: Date.now(),
        };
        appendMessage(botMessage.content, 'bot');
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
