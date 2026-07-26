class CustomServiceCard extends HTMLElement {
  connectedCallback() {
    const icon = this.getAttribute('icon') || 'activity';
    const title = this.getAttribute('title') || 'Service';
    const description = this.getAttribute('description') || 'Service description';

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
      <style>
        :host {
          --primary: #1B4DFF;
          --primary-light: #2563EB;
          --accent: #39C6F4;
        }

        .service-card {
          background-color: #fff;
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          height: 100%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 100px; /* vertical gap */
        }

        .service-card:last-child {
          margin-bottom: 0;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .icon-container {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background-color: var(--accent, #e0f7f5);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .icon-container {
          transform: scale(1.1);
          background-color: var(--primary-light);
        }

        .icon {
          font-size: 1.5rem;
          color: var(--primary);
          transition: color 0.3s ease;
        }

        .service-card:hover .icon {
          color: white;
        }

        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--primary);
        }

        p {
          flex-grow: 1;
          color: #4b5563;
          margin-bottom: 1rem;
        }

        a.learn-more {
          color: var(--primary-light);
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        a.learn-more:hover {
          color: var(--accent);
        }

        a.learn-more i {
          margin-left: 0.5rem;
          font-size: 1rem;
        }
      </style>

      <div class="service-card">
        <div class="icon-container">
          <i class="bi bi-${icon} icon"></i>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="#appointment" class="learn-more">
          Learn more <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    `;
  }
}

customElements.define('custom-service-card', CustomServiceCard);
