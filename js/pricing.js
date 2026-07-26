// Pricing Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Highlight popular plan on page load
    const popularPlan = document.querySelector('.popular-plan');
    if (popularPlan) {
        popularPlan.classList.add('animate-pulse');
        setTimeout(() => {
            popularPlan.classList.remove('animate-pulse');
        }, 2000);
    }

    // Tooltips for insurance logos
    document.querySelectorAll('.insurance-logos').forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap';
            tooltip.textContent = this.alt;
            this.parentNode.appendChild(tooltip);
            
            this.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
});