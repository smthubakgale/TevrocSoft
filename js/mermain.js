document.addEventListener('DOMContentLoaded', () => {
  if (!window.mermaid) {
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    flowchart: { curve: 'basis' },
    fontFamily: 'Inter, sans-serif',
  });

  const mermaidContainers = Array.from(document.querySelectorAll('.mermaid[data-src]'));

  async function renderMermaid(container) {
    if (container.dataset.rendered === 'true') {
      return;
    }

    const src = container.dataset.src;
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const text = await response.text();
      container.textContent = text;
      mermaid.init(undefined, container);
      container.dataset.rendered = 'true';
    } catch (error) {
      container.textContent = `Mermaid diagram failed to load: ${error.message}`;
      container.style.color = '#dc2626';
      container.style.fontSize = '0.95rem';
      container.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderMermaid(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    mermaidContainers.forEach((container) => observer.observe(container));
  } else {
    mermaidContainers.forEach((container) => renderMermaid(container));
  }
});