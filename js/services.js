// Services Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to service cards
    const serviceCards = document.querySelectorAll('custom-service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    // Add click handlers for service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('title');
            console.log(`Service selected: ${service}`);
        });
    });
});