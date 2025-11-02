// =======================
// Dark Mode Module
// =======================

export function initDarkMode() {
  // Set dark mode permanently
  document.documentElement.setAttribute('data-theme', 'dark');

  // Force dark syntax highlighting
  const darkLink = document.querySelector('link[href*="syntax-dark"]');
  const lightLink = document.querySelector('link[href*="syntax-light"]');

  if (darkLink && lightLink) {
    darkLink.removeAttribute('disabled');
    darkLink.media = 'all';
    lightLink.setAttribute('disabled', 'disabled');
    lightLink.media = 'not all';
  }
}
