// =======================
// Reading Progress Module
// =======================

import { debounce } from './utils.js';

export function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress-bar');
  const progressContainer = progressBar?.parentElement;

  // Only initialize on blog post pages
  if (!progressBar || !progressContainer) {
    return;
  }

  // Get the main content element
  const mainContent = document.querySelector('.post-content');
  if (!mainContent) {
    return;
  }

  // Function to calculate and update progress
  function updateProgress() {
    // Get the bounding rectangles
    const contentRect = mainContent.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate the start and end points for reading
    // Start when content top reaches viewport top
    const startPoint = contentRect.top + window.scrollY - windowHeight * 0.2;
    // End when content bottom reaches viewport bottom
    const endPoint = contentRect.bottom + window.scrollY - windowHeight * 0.8;

    // Calculate total scrollable distance
    const totalDistance = endPoint - startPoint;

    // Current scroll position relative to start
    const currentScroll = window.scrollY - startPoint;

    // Calculate percentage (0-100)
    let percentage = (currentScroll / totalDistance) * 100;

    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    // Update the progress bar width
    progressBar.style.width = `${percentage}%`;

    // Show progress bar when user starts scrolling
    if (window.scrollY > 100) {
      progressContainer.classList.add('visible');
    } else {
      progressContainer.classList.remove('visible');
    }
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initial calculation
  updateProgress();

  // Update on scroll with throttling
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Update on resize (in case content reflows)
  window.addEventListener(
    'resize',
    debounce(() => {
      updateProgress();
    }, 250)
  );
}
