// Doctors Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to doctor cards
    const doctorCards = document.querySelectorAll('custom-doctor-card');
    
    doctorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    // Add click handlers for doctor cards
    doctorCards.forEach(card => {
        card.addEventListener('click', function() {
            const doctor = this.getAttribute('name');
            console.log(`Doctor selected: ${doctor}`);
        });
    });
});