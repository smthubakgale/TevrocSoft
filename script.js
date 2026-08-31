// Main script file for functionality
function getToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showToast(message, type = 'info', duration = 4500) {
    const container = getToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button type="button" class="toast-close" aria-label="Dismiss toast">×</button>
    `;

    const closeButton = toast.querySelector('.toast-close');
    const removeToast = () => toast.remove();
    closeButton.addEventListener('click', removeToast);

    container.appendChild(toast);
    const timeoutId = setTimeout(() => {
        toast.classList.add('toast-hide');
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(removeToast, 250);
    }, duration);

    toast.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    toast.addEventListener('mouseleave', () => setTimeout(removeToast, duration));
}

window.showToast = showToast;

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
            showToast('Thank you for your message. We will get back to you shortly.', 'success');
            this.reset();
        });
    }
    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        if (form.id === 'chatForm' || form.closest('#chatPanel')) {
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader" class="animate-spin w-4 h-4 mr-2"></i> Sending...';
            feather.replace();
            
            // Simulate API call
            setTimeout(() => {
                showToast('Thank you for your message. We will get back to you shortly.', 'success');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    });
});