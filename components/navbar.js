class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.ensureHeadMeta();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
      <style>
        :host {
          --nav-bg: rgba(255, 255, 255, 0.8);
          --primary: #0f172a;
          --primary-light: #2563eb;
          --accent: #38bdf8;
          --accent-strong: #1d4ed8;
          --border: rgba(15, 23, 42, 0.08);
        }

        .nav-shell {
          position: sticky;
          top: 0;
          z-index: 1030;
          width: 100%;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1.25rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.75));
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          transition: all 0.25s ease;
        }

        .topbar.scrolled {
          box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
        }

        .brand img {
          height: 36px;
          width: auto;
        }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: 0.2rem;
          margin-left: auto;
        }

        .nav-link,
        .dropdown-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 0;
          background: transparent;
          color: var(--primary);
          font-weight: 600;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav-link .lucide,
        .dropdown-trigger .lucide {
          width: 1rem;
          height: 1rem;
          min-width: 1rem;
        }

        .nav-link:hover,
        .dropdown-trigger:hover,
        .dropdown-trigger.active {
          background: rgba(37, 99, 235, 0.08);
          color: var(--accent-strong);
        }

        .dropdown-shell {
          position: relative;
        }

        .dropdown-panel {
          position: absolute;
          top: calc(100% + 0.55rem);
          left: 0;
          min-width: 14rem;
          background: white;
          border: 1px solid var(--border);
          border-radius: 0.9rem;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.12);
          padding: 0.6rem;
          display: none;
          z-index: 10;
        }

        .dropdown-panel.open {
          display: block;
        }

        .dropdown-panel a {
          display: block;
          padding: 0.65rem 0.8rem;
          border-radius: 0.7rem;
          color: var(--primary);
          text-decoration: none;
          font-size: 0.95rem;
        }

        .dropdown-panel a:hover {
          background: rgba(37, 99, 235, 0.08);
          color: var(--accent-strong);
        }

        .dropdown-section {
          padding: 0.25rem 0;
        }

        .dropdown-section + .dropdown-section {
          margin-top: 0.45rem;
          padding-top: 0.55rem;
          border-top: 1px solid var(--border);
        }

        .submenu-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: 0;
          background: transparent;
          color: var(--primary);
          font-weight: 600;
          padding: 0.55rem 0.8rem;
          border-radius: 0.7rem;
          text-align: left;
          cursor: pointer;
        }

        .submenu-toggle:hover,
        .submenu-toggle.open {
          background: rgba(37, 99, 235, 0.08);
          color: var(--accent-strong);
        }

        .submenu-toggle .chevron {
          transition: transform 0.2s ease;
          font-size: 0.95rem;
        }

        .submenu-toggle.open .chevron {
          transform: rotate(180deg);
        }

        .submenu-links {
          display: none;
          padding: 0.2rem 0 0.1rem 0.35rem;
        }

        .submenu-links.open {
          display: block;
        }

        .submenu-links a {
          padding: 0.55rem 0.8rem;
          margin-left: 0.2rem;
          font-size: 0.92rem;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1rem;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--primary-light), var(--accent));
          color: white;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
        }

        .menu-toggle {
          border: 0;
          background: rgba(37, 99, 235, 0.08);
          color: var(--primary);
          border-radius: 999px;
          width: 2.6rem;
          height: 2.6rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .menu-toggle .lucide {
          width: 1.1rem;
          height: 1.1rem;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.36);
          backdrop-filter: blur(2px);
          display: none;
          z-index: 1020;
        }

        .overlay.show {
          display: block;
        }

        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(92vw, 360px);
          height: 100vh;
          background: white;
          box-shadow: -12px 0 32px rgba(15, 23, 42, 0.18);
          transform: translateX(102%);
          transition: transform 0.25s ease;
          z-index: 1035;
          display: flex;
          flex-direction: column;
        }

        .drawer.open {
          transform: translateX(0);
        }

        .drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.1rem;
          border-bottom: 1px solid var(--border);
        }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.1rem 5rem;
        }

        .drawer-group {
          margin-bottom: 1rem;
        }

        .drawer-group-title {
          margin-bottom: 0.5rem;
          font-size: 0.77rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
        }

        .drawer-link {
          display: flex;
          align-items: center;
          gap:10px;
          width: 100%;
          padding: 0.75rem 0.85rem;
          border-radius: 0.75rem;
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .drawer-link:hover {
          background: rgba(37, 99, 235, 0.08);
          color: var(--accent-strong);
        }

        .drawer-submenu {
          margin-bottom: 0.35rem;
        }

        .drawer-submenu-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.75rem 0.85rem;
          border-radius: 0.75rem;
          color: var(--primary);
          background: transparent;
          border: 0;
          font-weight: 600;
          text-align: left;
        }

        .drawer-submenu-toggle:hover,
        .drawer-submenu-toggle.open {
          background: rgba(37, 99, 235, 0.08);
          color: var(--accent-strong);
        }

        .drawer-submenu-links {
          display: none;
          padding: 0.2rem 0 0.25rem 0.35rem;
        }

        .drawer-submenu-links.open {
          display: block;
        }

        .drawer-submenu-links .drawer-link {
          padding: 0.6rem 0.8rem;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 0.2rem;
        }

        .drawer-footer {
          position: sticky;
          bottom: 0;
          padding: 0.9rem 1.1rem 1rem;
          border-top: 1px solid var(--border);
          background: white;
          display: grid;
          gap: 0.65rem;
        }

        .drawer-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0.7rem 1rem;
          text-decoration: none;
          font-weight: 600;
          color: var(--primary);
          background: rgba(15, 23, 42, 0.04);
        }

        .drawer-action.primary {
          background: linear-gradient(135deg, var(--primary-light), var(--accent));
          color: white;
        }

        .bottom-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1025;
          display: flex;
          justify-content: space-around;
          padding: 0.7rem 0.8rem calc(0.7rem + env(safe-area-inset-bottom));
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--border);
          box-shadow: 0 -10px 30px rgba(15, 23, 42, 0.08);
        }

        .bottom-nav a {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--primary);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          gap: 0.15rem;
        }

        .bottom-nav a .lucide {
          width: 1rem;
          height: 1rem;
        }

        .bottom-nav a span {
          font-size: 0.74rem;
        }

        @media (min-width: 992px) {
          .desktop-nav {
            display: flex;
          }

          .menu-toggle {
            display: none;
          }

          .bottom-nav {
            display: none;
          }
        }
      </style>

      <div class="nav-shell">
        <header class="topbar">
          <a class="brand" href="index.html">
            <img src="img/logo.svg" alt="TevrocSoft logo" />
            <span>TevrocSoft</span>
          </a>

          <nav class="desktop-nav" aria-label="Primary navigation">
            <a class="nav-link" href="index.html"><i data-lucide="home"></i>Home</a>
            <a class="nav-link" href="services.html"><i data-lucide="server"></i>Services</a>
            <a class="nav-link" href="pricing.html"><i data-lucide="badge-dollar-sign"></i>Pricing</a>
            <a class="nav-link" href="portfolios.html"><i data-lucide="smartphone"></i>Apps</a>
            <a class="nav-link" href="about.html"><i data-lucide="info"></i>About</a>
            <a class="nav-link" href="blogs.html"><i data-lucide="book-open"></i>Blogs</a>
            <a class="nav-link" href="contact.html"><i data-lucide="mail"></i>Contact</a>
            <div class="dropdown-shell">
              <button class="dropdown-trigger" type="button"><i data-lucide="archive"></i>Resources</button>
              <div class="dropdown-panel">
                <div class="dropdown-section">
                  <button class="submenu-toggle" type="button" data-target="policies-submenu">
                    <span>Policies</span>
                    <span class="chevron">▾</span>
                  </button>
                  <div class="submenu-links" id="policies-submenu">
                    <a href="privacy.html">Privacy Policy</a>
                    <a href="refund.html">Refund Policy</a>
                    <a href="terms.html">Terms & Conditions</a>
                    <a href="cookies.html">Cookie Policy</a>
                  </div>
                </div>
                <div class="dropdown-section">
                  <button class="submenu-toggle" type="button" data-target="blogs-submenu">
                    <span>Blogs</span>
                    <span class="chevron">▾</span>
                  </button>
                  <div class="submenu-links" id="blogs-submenu">
                    <a href="blogs.html">Insights Hub</a> 
                    <a href="./blogs/tevrocsdk.html">Tevroc SDK</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div class="nav-actions">
            <a class="btn-primary" href="contact.html">Get Started</a>
            <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu">
              <i data-lucide="menu"></i>
            </button>
          </div>
        </header>
      </div>

      <div class="overlay" id="navOverlay"></div>
      <aside class="drawer" id="navDrawer" aria-label="Mobile navigation">
        <div class="drawer-top">
          <a class="brand" href="index.html">
            <img src="img/logo.svg" alt="TevrocSoft logo" />
            <span>TevrocSoft</span>
          </a>
          <button class="menu-toggle" id="drawerClose" type="button" aria-label="Close menu">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div class="drawer-body">
          <div class="drawer-group">
            <div class="drawer-group-title">Main</div>
            <a class="drawer-link" href="index.html"><i data-lucide="home"></i>Home</a>
            <a class="drawer-link" href="services.html"><i data-lucide="server"></i>Services</a>
            <a class="drawer-link" href="pricing.html"><i data-lucide="badge-dollar-sign"></i>Pricing</a>
            <a class="drawer-link" href="portfolios.html"><i data-lucide="smartphone"></i>Apps</a>
            <a class="drawer-link" href="about.html"><i data-lucide="info"></i>About</a>
            <a class="drawer-link" href="blogs.html"><i data-lucide="book-open"></i>Blogs</a>
            <a class="drawer-link" href="contact.html"><i data-lucide="mail"></i>Contact</a>
          </div>

          <div class="drawer-group">
            <div class="drawer-group-title">Resources</div>
            <a class="drawer-link" href="news.html">News & Updates</a>
            <a class="drawer-link" href="faqs.html">FAQs</a>

            <div class="drawer-submenu">
              <button class="drawer-submenu-toggle" type="button" data-target="drawer-policies">
                <span>Policies</span>
                <span class="chevron">▾</span>
              </button>
              <div class="drawer-submenu-links" id="drawer-policies">
                <a class="drawer-link" href="privacy.html">Privacy Policy</a>
                <a class="drawer-link" href="refund.html">Refund Policy</a>
                <a class="drawer-link" href="terms.html">Terms & Conditions</a>
                <a class="drawer-link" href="cookies.html">Cookie Policy</a>
              </div>
            </div>

            <div class="drawer-submenu">
              <button class="drawer-submenu-toggle" type="button" data-target="drawer-blogs">
                <span>Blogs</span>
                <span class="chevron">▾</span>
              </button>
              <div class="drawer-submenu-links" id="drawer-blogs">
                <a class="drawer-link" href="blogs.html">Blogs</a>
              </div>
            </div>
          </div>
        </div>

        <div class="drawer-footer">
          <a class="drawer-action primary" href="contact.html">Book a Discovery Call</a>
          <a class="drawer-action" href="pricing.html#quote-generator">Launch Quotation Generator</a>
        </div>
      </aside>

      <nav class="bottom-nav" aria-label="Bottom navigation">
        <a href="index.html"><i data-lucide="house"></i><span>Home</span></a>
        <a href="portfolios.html"><i data-lucide="smartphone"></i><span>Apps</span></a>
        <a href="blogs.html"><i data-lucide="book-open"></i><span>Blogs</span></a> 
      </nav>
    `;

    this.loadGoogleAnalytics(); 
    this.loadLucide();
    this.setupInteractions();
  }

  loadGoogleAnalytics(measurementId = "G-JVTS4SVGNY") {
      // Prevent loading more than once
      if (window.gtag) return;

      window.dataLayer = window.dataLayer || [];

      window.gtag = function () {
          window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;

      script.onload = () => {
          window.gtag('config', measurementId);
          console.log("Google Analytics initialized");
      };

      script.onerror = () => {
          console.warn("Failed to load Google Analytics.");
      };

      document.head.appendChild(script);
  }

  loadLucide() {
    const renderIcons = () => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ root: this.shadowRoot });
      }
    };

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      renderIcons();
      return;
    }

    if (document.querySelector('script[data-lucide-loader]')) {
      const interval = window.setInterval(() => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.clearInterval(interval);
          renderIcons();
        }
      }, 50);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.async = true;
    script.setAttribute('data-lucide-loader', 'true');
    script.onload = renderIcons;
    script.onerror = () => {
      console.warn('Lucide icons could not be loaded.');
    };

    document.head.appendChild(script);
  }

  ensureHeadMeta() {
    if (!document.head) return;

    let title = document.head.querySelector('title');
    if (!title) {
      title = document.createElement('title');
      title.textContent = 'TevrocSoft | Custom Software, Web and App Development';
      document.head.appendChild(title);
    }

    const addLink = (rel, href, type) => {
      if (!document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (type) link.type = type;
        document.head.appendChild(link);
      }
    };

    addLink('icon', 'img/favicon.png', 'image/x-icon');
    addLink('shortcut icon', 'img/favicon.png', 'image/x-icon');
  }

  setupInteractions() {
    const topbar = this.shadowRoot.querySelector('.topbar');
    const toggle = this.shadowRoot.getElementById('menuToggle');
    const closeBtn = this.shadowRoot.getElementById('drawerClose');
    const overlay = this.shadowRoot.getElementById('navOverlay');
    const drawer = this.shadowRoot.getElementById('navDrawer');

    const openDrawer = () => {
      overlay.classList.add('show');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      overlay.classList.remove('show');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    this.shadowRoot.querySelectorAll('.dropdown-shell').forEach((shell) => {
      const trigger = shell.querySelector('.dropdown-trigger');
      const panel = shell.querySelector('.dropdown-panel');

      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = panel.classList.contains('open');

        this.shadowRoot.querySelectorAll('.dropdown-panel').forEach((item) => item.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.dropdown-trigger').forEach((item) => item.classList.remove('active'));

        if (!isOpen) {
          panel.classList.add('open');
          trigger.classList.add('active');
        }
      });
    });

    this.shadowRoot.querySelectorAll('.submenu-toggle').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const targetId = button.getAttribute('data-target');
        const target = this.shadowRoot.getElementById(targetId);
        const isOpen = button.classList.contains('open');

        this.shadowRoot.querySelectorAll('.submenu-toggle').forEach((item) => item.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.submenu-links').forEach((item) => item.classList.remove('open'));

        if (!isOpen) {
          button.classList.add('open');
          target?.classList.add('open');
        }
      });
    });

    this.shadowRoot.querySelectorAll('.drawer-submenu-toggle').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const targetId = button.getAttribute('data-target');
        const target = this.shadowRoot.getElementById(targetId);
        const isOpen = button.classList.contains('open');

        this.shadowRoot.querySelectorAll('.drawer-submenu-toggle').forEach((item) => item.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.drawer-submenu-links').forEach((item) => item.classList.remove('open'));

        if (!isOpen) {
          button.classList.add('open');
          target?.classList.add('open');
        }
      });
    });

    window.addEventListener('click', (event) => {
      if (!this.shadowRoot.host.contains(event.target)) {
        this.shadowRoot.querySelectorAll('.dropdown-panel').forEach((panel) => panel.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.dropdown-trigger').forEach((trigger) => trigger.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.submenu-toggle').forEach((button) => button.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.submenu-links').forEach((menu) => menu.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.drawer-submenu-toggle').forEach((button) => button.classList.remove('open'));
        this.shadowRoot.querySelectorAll('.drawer-submenu-links').forEach((menu) => menu.classList.remove('open'));
      }
    });

    window.addEventListener('scroll', () => {
      topbar.classList.toggle('scrolled', window.scrollY > 24);
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
