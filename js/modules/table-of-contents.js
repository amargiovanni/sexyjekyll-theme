// =======================
// Table of Contents Module
// =======================

import { slugify } from './utils.js';

export function initTableOfContents() {
  const tocContainer = document.getElementById('toc-container');
  const tocList = document.getElementById('toc-list');
  const tocEmpty = document.getElementById('toc-empty');
  const tocToggle = document.getElementById('toc-toggle');

  // Only initialize if TOC container exists
  if (!tocContainer || !tocList) {
    return;
  }

  // Get all H2 and H3 headings from post content
  const content = document.querySelector('.post-content');
  if (!content) {
    return;
  }

  const headings = content.querySelectorAll('h2, h3');

  // If no headings found, show empty message
  if (headings.length === 0) {
    tocEmpty.style.display = 'block';
    document.getElementById('toc-nav').style.display = 'none';
    return;
  }

  // Generate TOC items
  headings.forEach((heading, index) => {
    // Create unique ID if heading doesn't have one
    if (!heading.id) {
      heading.id = `heading-${index}-${slugify(heading.textContent)}`;
    }

    // Create TOC item
    const tocItem = document.createElement('li');
    tocItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

    const tocLink = document.createElement('a');
    tocLink.className = 'toc-link';
    tocLink.href = `#${heading.id}`;
    tocLink.textContent = heading.textContent;
    tocLink.setAttribute('data-heading-id', heading.id);

    // Smooth scroll on click
    tocLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(heading.id);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Update URL hash without jumping
        history.pushState(null, null, `#${heading.id}`);
      }
    });

    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  });

  // Handle toggle button
  if (tocToggle) {
    tocToggle.addEventListener('click', () => {
      tocContainer.classList.toggle('collapsed');
      const isCollapsed = tocContainer.classList.contains('collapsed');
      tocToggle.setAttribute('aria-expanded', !isCollapsed);
    });
  }

  // Highlight active section on scroll
  const observerOptions = {
    rootMargin: '-100px 0px -66%',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const tocLink = tocList.querySelector(`[data-heading-id="${id}"]`);

      if (entry.isIntersecting) {
        // Remove active from all links
        tocList.querySelectorAll('.toc-link').forEach((link) => {
          link.classList.remove('active');
        });

        // Add active to current link
        if (tocLink) {
          tocLink.classList.add('active');

          // Scroll TOC to show active item
          const tocNav = document.getElementById('toc-nav');
          if (tocNav) {
            const linkRect = tocLink.getBoundingClientRect();
            const navRect = tocNav.getBoundingClientRect();

            if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
              tocLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        }
      }
    });
  }, observerOptions);

  // Observe all headings
  headings.forEach((heading) => {
    observer.observe(heading);
  });
}
