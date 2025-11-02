/**
 * Tests for dark mode module
 */

import { initDarkMode } from '../js/modules/dark-mode.js';

describe('Dark Mode Module', () => {
  beforeEach(() => {
    // Setup DOM
    document.documentElement.removeAttribute('data-theme');

    // Create mock stylesheets
    const darkLink = document.createElement('link');
    darkLink.rel = 'stylesheet';
    darkLink.href = '/css/syntax-dark.css';
    darkLink.setAttribute('disabled', 'disabled');
    darkLink.media = 'not all';

    const lightLink = document.createElement('link');
    lightLink.rel = 'stylesheet';
    lightLink.href = '/css/syntax-light.css';
    lightLink.media = 'all';

    document.head.appendChild(darkLink);
    document.head.appendChild(lightLink);
  });

  test('should set dark theme attribute', () => {
    initDarkMode();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('should enable dark syntax highlighting', () => {
    initDarkMode();

    const darkLink = document.querySelector('link[href*="syntax-dark"]');
    const lightLink = document.querySelector('link[href*="syntax-light"]');

    expect(darkLink.hasAttribute('disabled')).toBe(false);
    expect(darkLink.media).toBe('all');
    expect(lightLink.getAttribute('disabled')).toBe('disabled');
    expect(lightLink.media).toBe('not all');
  });

  test('should handle missing stylesheet links gracefully', () => {
    document.head.innerHTML = '';

    expect(() => initDarkMode()).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
