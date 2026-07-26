// About Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on scroll
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stats-section div div');
                counters.forEach(counter => {
                    const target = +counter.textContent.replace('+', '');
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                            setTimeout(updateCounter, 10);
                        } else {
                            counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                        }
                    };
                    
                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }
});