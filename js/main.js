// =======================
// Main Application Entry Point
// =======================

// Import all modules
import { initDarkMode } from './modules/dark-mode.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initNavigation } from './modules/navigation.js';
import { initAnimatedBackground } from './modules/animated-background.js';
import { initSearch } from './modules/search.js';
import { initReadingProgress } from './modules/reading-progress.js';
import { initTableOfContents } from './modules/table-of-contents.js';
import { initExternalLinks } from './modules/external-links.js';
import { initPageAnimations } from './modules/animations.js';
import { initPerformanceMonitoring, initErrorHandling } from './modules/performance.js';

// Initialize error handling first
initErrorHandling();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initDarkMode();
  initSmoothScroll();
  initNavigation();
  initAnimatedBackground();
  initSearch();
  initReadingProgress();
  initTableOfContents();
  initExternalLinks();
  initPageAnimations();
  initPerformanceMonitoring();
});
