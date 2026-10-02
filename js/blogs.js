// Blogs Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.blog-category');
    const articles = document.querySelectorAll('.blog-article');
    const filterStatus = document.querySelector('#blog-filter-status');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            let visibleCount = 0;

            categoryButtons.forEach(categoryButton => {
                const isSelected = categoryButton === button;
                categoryButton.classList.toggle('is-active', isSelected);
                categoryButton.setAttribute('aria-pressed', String(isSelected));
            });

            articles.forEach(article => {
                const categories = article.dataset.category.split(/\s+/);
                const isVisible = category === 'all' || categories.includes(category);
                article.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            if (filterStatus) {
                const categoryName = button.querySelector('h3').textContent.trim();
                filterStatus.textContent = category === 'all'
                    ? `Showing all ${visibleCount} articles`
                    : `Showing ${visibleCount} ${categoryName.toLowerCase()} articles`;
            }
        });
    });

    articles.forEach(article => {
        const shareBtn = document.createElement('button');
        shareBtn.type = 'button';
        shareBtn.setAttribute('aria-label', 'Share article');
        shareBtn.title = 'Share article';
        shareBtn.className = 'absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100';
        shareBtn.innerHTML = '<i data-feather="share-2" class="w-4 h-4"></i>';
        article.querySelector('.p-6').appendChild(shareBtn);

        shareBtn.addEventListener('click', () => {
            const title = article.querySelector('h3').textContent;
            const articleLink = article.querySelector('a[href^="blogs/"]');
            const url = articleLink ? new URL(articleLink.href, window.location.href).href : window.location.href;
            const shareData = { title, url };

            if (navigator.share) {
                navigator.share(shareData).catch(error => {
                    if (error.name !== 'AbortError') copyArticleLink(url, shareBtn);
                });
            } else {
                copyArticleLink(url, shareBtn);
            }
        });
    });

    feather.replace();
});

function copyArticleLink(url, button) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            button.title = 'Article link copied';
            button.setAttribute('aria-label', 'Article link copied');
        }).catch(() => window.prompt('Copy this article link', url));
        return;
    }

    window.prompt('Copy this article link', url);
}