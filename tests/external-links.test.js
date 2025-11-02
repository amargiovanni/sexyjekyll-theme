/**
 * Tests for external links module
 */

import { initExternalLinks } from '../js/modules/external-links.js';

describe('External Links Module', () => {
  beforeEach(() => {
    // Setup DOM with various link types
    document.body.innerHTML = `
      <div class="post-content">
        <a href="https://example.com" id="external">External Link</a>
        <a href="http://example.com" id="external-http">External HTTP Link</a>
        <a href="/internal" id="internal">Internal Link</a>
        <a href="#anchor" id="anchor">Anchor Link</a>
        <a href="https://${window.location.hostname}/page" id="same-domain">Same Domain</a>
      </div>
      <div class="search-container"
           data-i18n-external-link-label="(opens in a new tab)">
      </div>
    `;
  });

  test('should add target="_blank" to external links', () => {
    initExternalLinks();

    const externalLink = document.getElementById('external');
    expect(externalLink.getAttribute('target')).toBe('_blank');
  });

  test('should add rel="noopener noreferrer" to external links', () => {
    initExternalLinks();

    const externalLink = document.getElementById('external');
    expect(externalLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  test('should add external link icon', () => {
    initExternalLinks();

    const externalLink = document.getElementById('external');
    const icon = externalLink.querySelector('.external-link-icon');

    expect(icon).toBeTruthy();
    expect(icon.innerHTML).toBe('↗');
    expect(icon.getAttribute('aria-label')).toBe('(opens in a new tab)');
  });

  test('should handle HTTP links', () => {
    initExternalLinks();

    const httpLink = document.getElementById('external-http');
    expect(httpLink.getAttribute('target')).toBe('_blank');
    expect(httpLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  test('should not modify internal links', () => {
    initExternalLinks();

    const internalLink = document.getElementById('internal');
    expect(internalLink.getAttribute('target')).toBeNull();
    expect(internalLink.getAttribute('rel')).toBeNull();
    expect(internalLink.querySelector('.external-link-icon')).toBeNull();
  });

  test('should not modify anchor links', () => {
    initExternalLinks();

    const anchorLink = document.getElementById('anchor');
    expect(anchorLink.getAttribute('target')).toBeNull();
    expect(anchorLink.getAttribute('rel')).toBeNull();
  });

  test('should not modify same-domain links', () => {
    initExternalLinks();

    const sameDomainLink = document.getElementById('same-domain');
    expect(sameDomainLink.getAttribute('target')).toBeNull();
    expect(sameDomainLink.querySelector('.external-link-icon')).toBeNull();
  });

  test('should handle missing post-content gracefully', () => {
    document.body.innerHTML = '<div>No post content</div>';

    expect(() => initExternalLinks()).not.toThrow();
  });

  test('should not add icon twice', () => {
    initExternalLinks();
    initExternalLinks(); // Call twice

    const externalLink = document.getElementById('external');
    const icons = externalLink.querySelectorAll('.external-link-icon');

    expect(icons.length).toBe(1);
  });

  test('should use default label when i18n data is missing', () => {
    document.querySelector('.search-container').removeAttribute('data-i18n-external-link-label');

    initExternalLinks();

    const externalLink = document.getElementById('external');
    const icon = externalLink.querySelector('.external-link-icon');

    expect(icon.getAttribute('aria-label')).toBe('(opens in a new tab)');
  });
});
