class CustomDoctorCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'Project';
    const specialty = this.getAttribute('specialty') || 'Specialty';
    const detail = this.getAttribute('detail') || 'Focused delivery';
    const image = this.getAttribute('image') || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80';
    const link = this.getAttribute('link') || '';

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary: #1B4DFF;
          --primary-light: #2563EB;
          --accent: #39C6F4;
        }

        .doctor-card {
          background-color: #fff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .doctor-image {
          width: 100%;
          height: 16rem;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .doctor-card:hover .doctor-image {
          transform: scale(1.05);
        }

        .social-icons {
          opacity: 0;
          transition: all 0.3s ease;
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .doctor-card:hover .social-icons {
          opacity: 1;
        }

        .social-icons a {
          background-color: #fff;
          padding: 0.5rem;
          border-radius: 50%;
          color: var(--primary-light);
          transition: all 0.25s ease;
        }

        .social-icons a:hover {
          background-color: var(--primary-light);
          color: #fff;
        }

        .doctor-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        .specialty {
          color: var(--primary-light);
          margin-bottom: 0.75rem;
        }

        .experience {
          color: #4b5563;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.95rem;
        }

        .book-btn {
          margin-top: 1rem;
          background-color: var(--primary-light);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-align: center;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .book-btn:hover {
          background-color: var(--accent);
        }
      </style>

      <div class="doctor-card">
        <div class="relative">
          <img src="${image}" alt="${name}" class="doctor-image">
          <div class="social-icons">
            <a href="#"><i data-feather="facebook"></i></a>
            <a href="#"><i data-feather="twitter"></i></a>
            <a href="#"><i data-feather="linkedin"></i></a>
          </div>
        </div>
        <div class="doctor-info">
          <h3>${name}</h3>
          <p class="specialty">${specialty}</p>
          <p class="experience"><i data-feather="award"></i>${detail}</p>
          ${link ? `<a href="${link}" class="book-btn" target="_blank" rel="noopener noreferrer">View Project</a>` : `<a href="contact.html" class="book-btn">View Project</a>`}
        </div>
      </div>
    `;

    // Initialize feather icons safely
    if (window.feather) {
      window.feather.replace({ width: 16, height: 16 });
    }
  }
}

customElements.define('custom-doctor-card', CustomDoctorCard);
