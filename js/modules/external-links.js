// =======================
// External Links Handler Module
// =======================

export function initExternalLinks() {
  // Get all links in the post content
  const postContent = document.querySelector('.post-content');
  if (!postContent) {
    return;
  }

  // Get i18n translation from data attribute
  const searchContainer = document.querySelector('.search-container');
  const externalLinkLabel =
    searchContainer?.dataset.i18nExternalLinkLabel || '(opens in a new tab)';

  const links = postContent.querySelectorAll('a[href]');

  links.forEach((link) => {
    const href = link.getAttribute('href');

    // Check if link is external (starts with http:// or https://)
    // and doesn't link to the current domain
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      const currentDomain = window.location.hostname;
      const linkDomain = new URL(href).hostname;

      if (linkDomain !== currentDomain) {
        // Add target="_blank" and security attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        // Add external link icon if not already present
        if (!link.querySelector('.external-link-icon')) {
          const icon = document.createElement('span');
          icon.className = 'external-link-icon';
          icon.setAttribute('aria-label', externalLinkLabel);
          icon.innerHTML = '↗';
          link.appendChild(icon);
        }
      }
    }
  });
}
