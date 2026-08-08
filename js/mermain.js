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

  document.querySelectorAll('.mermaid[data-src]').forEach(async (container) => {
    const src = container.dataset.src;
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const text = await response.text();
      container.textContent = text;
      mermaid.init(undefined, container);
    } catch (error) {
      container.textContent = `Mermaid diagram failed to load: ${error.message}`;
      container.style.color = '#dc2626';
      container.style.fontSize = '0.95rem';
      container.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
    }
  });
});