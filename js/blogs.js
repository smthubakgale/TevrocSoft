// Blogs Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Category filter
    const categoryButtons = document.querySelectorAll('.blog-category');
    const articles = document.querySelectorAll('.blog-article');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.querySelector('h3').textContent.toLowerCase();
            
            // Highlight selected category
            categoryButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            button.classList.add('bg-blue-600', 'text-white');
            
            // Filter articles
            articles.forEach(article => {
                if (category === 'all' || article.dataset.category.includes(category)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // Article share buttons
    document.querySelectorAll('.blog-article').forEach(article => {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100';
        shareBtn.innerHTML = '<i data-feather="share-2" class="w-4 h-4"></i>';
        article.querySelector('.p-6').appendChild(shareBtn);
        
        shareBtn.addEventListener('click', () => {
            const title = article.querySelector('h3').textContent;
            const url = window.location.href;
            navigator.share({
                title: title,
                url: url
            }).catch(() => {
                alert('Web Share API not supported in your browser');
            });
        });
    });
    
    feather.replace();
});