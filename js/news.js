// News Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // News category filter
    const filterButtons = document.querySelectorAll('[data-filter]');
    const newsItems = document.querySelectorAll('.news-item');
    const pressItems = document.querySelectorAll('.press-release');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = button.dataset.filter;
            
            // Highlight active filter
            filterButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            button.classList.add('bg-blue-600', 'text-white');
            
            // Filter news items
            if (filter === 'all') {
                newsItems.forEach(item => item.style.display = 'block');
                pressItems.forEach(item => item.style.display = 'flex');
            } else if (filter === 'news') {
                newsItems.forEach(item => item.style.display = 'block');
                pressItems.forEach(item => item.style.display = 'none');
            } else if (filter === 'press') {
                newsItems.forEach(item => item.style.display = 'none');
                pressItems.forEach(item => item.style.display = 'flex');
            }
        });
    });

    // Subscribe form validation
    const subscribeForm = document.querySelector('form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            if (!email.includes('@')) {
                window.showToast('Please enter a valid email address', 'error');
                return;
            }
            
            window.showToast('Thank you for subscribing to our newsletter!', 'success');
            e.target.reset();
        });
    }
});