/**
 * Tests for smooth scroll module
 */

import { initSmoothScroll } from '../js/modules/smooth-scroll.js';

describe('Smooth Scroll Module', () => {
  beforeEach(() => {
    // Setup DOM with anchor links
    document.body.innerHTML = `
      <nav>
        <a href="#section1" class="anchor-link">Section 1</a>
        <a href="#section2" class="anchor-link">Section 2</a>
        <a href="#" class="empty-anchor">Empty</a>
        <a href="https://example.com" class="external-link">External</a>
      </nav>
      <div id="section1">Section 1 Content</div>
      <div id="section2">Section 2 Content</div>
    `;

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });

    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0,
    });
  });

  test('should add click handlers to anchor links', () => {
    let scrollToCalled = false;
    window.scrollTo = () => { scrollToCalled = true; };

    initSmoothScroll();

    const anchorLink = document.querySelector('.anchor-link');
    expect(anchorLink).toBeTruthy();

    // Verify event listener is attached (indirectly by triggering it)
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    anchorLink.dispatchEvent(event);

    // Should have called scrollTo
    expect(scrollToCalled).toBe(true);
  });

  test('should prevent default for valid anchor links', () => {
    initSmoothScroll();

    const anchorLink = document.querySelector('.anchor-link');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    let preventDefaultCalled = false;
    event.preventDefault = () => { preventDefaultCalled = true; };

    anchorLink.dispatchEvent(event);

    expect(preventDefaultCalled).toBe(true);
  });

  test('should not prevent default for empty hash', () => {
    initSmoothScroll();

    const emptyAnchor = document.querySelector('.empty-anchor');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    let preventDefaultCalled = false;
    event.preventDefault = () => { preventDefaultCalled = true; };

    emptyAnchor.dispatchEvent(event);

    expect(preventDefaultCalled).toBe(false);
  });

  test('should calculate correct scroll position with header offset', () => {
    let scrollToArgs = null;
    window.scrollTo = (args) => { scrollToArgs = args; };

    initSmoothScroll();

    const anchorLink = document.querySelector('.anchor-link');
    anchorLink.click();

    expect(scrollToArgs).toEqual({
      top: 20, // 100 (element top) + 0 (pageYOffset) - 80 (headerOffset)
      behavior: 'smooth',
    });
  });

  test('should handle missing target element gracefully', () => {
    document.body.innerHTML = `
      <a href="#nonexistent">Broken Link</a>
    `;

    initSmoothScroll();

    const brokenLink = document.querySelector('a');
    expect(() => brokenLink.click()).not.toThrow();
  });
});
