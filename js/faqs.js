// FAQs Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Auto-expand first FAQ item
    const firstFaq = document.querySelector('.faq-toggle');
    if (firstFaq) {
        firstFaq.click();
    }

    // Search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search FAQs...';
    searchInput.className = 'w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg mb-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mx-auto block';
    
    const faqSection = document.querySelector('section.max-w-3xl');
    if (faqSection) {
        faqSection.parentNode.insertBefore(searchInput, faqSection);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.faq-toggle').forEach(button => {
                const question = button.querySelector('h3').textContent.toLowerCase();
                const answer = button.nextElementSibling.textContent.toLowerCase();
                const faqItem = button.parentNode;
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    faqItem.style.display = 'block';
                } else {
                    faqItem.style.display = 'none';
                }
            });
        });
    }
});