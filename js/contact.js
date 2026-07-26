// Contact Page Specific JavaScript
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
                alert('Please fill in all required fields');
                return;
            }
            
            // Show success message
            alert('Thank you for your message. We will get back to you shortly.');
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
});