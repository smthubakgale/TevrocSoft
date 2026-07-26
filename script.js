// Main script file for functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth page transitions
    document.querySelectorAll('a').forEach(anchor => {
        if (anchor.href && !anchor.href.startsWith('mailto:') && !anchor.href.startsWith('tel:')) {
            anchor.addEventListener('click', function(e) {
                if (this.href === window.location.href) {
                    e.preventDefault();
                    return;
                }
                
                // Add loading indicator
                const loading = document.createElement('div');
                loading.className = 'fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50';
                loading.innerHTML = '<div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>';
                document.body.appendChild(loading);
                
                // Remove loading after page loads
                window.addEventListener('load', () => {
                    loading.remove();
                });
            });
        }
    });
// Form submission handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you shortly.');
            this.reset();
        });
    }
    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader" class="animate-spin w-4 h-4 mr-2"></i> Sending...';
            feather.replace();
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message. We will get back to you shortly.');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    });
});