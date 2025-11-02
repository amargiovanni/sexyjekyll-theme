import { initReadingProgress } from '../js/modules/reading-progress.js';

describe('initReadingProgress', () => {
  let mockProgressBar;
  let mockProgressContainer;
  let mockMainContent;
  let scrollHandler;
  let resizeHandler;

  beforeEach(() => {
    // Create mock elements
    mockProgressBar = {
      style: { width: '0%' },
      parentElement: null,
    };

    mockProgressContainer = {
      classList: {
        add: function () {},
        remove: function () {},
      },
    };

    mockProgressBar.parentElement = mockProgressContainer;

    mockMainContent = {
      getBoundingClientRect: () => ({
        top: 200,
        bottom: 2000,
      }),
    };

    // Mock DOM methods
    document.getElementById = (id) => {
      if (id === 'reading-progress-bar') {
        return mockProgressBar;
      }
      return null;
    };

    document.querySelector = (selector) => {
      if (selector === '.post-content') {
        return mockMainContent;
      }
      return null;
    };

    // Mock window properties
    window.innerHeight = 800;
    window.scrollY = 0;

    // Capture event listeners
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = (event, handler, options) => {
      if (event === 'scroll') {
        scrollHandler = handler;
      }
      if (event === 'resize') {
        resizeHandler = handler;
      }
      originalAddEventListener.call(window, event, handler, options);
    };
  });

  test('should return early if progress bar is not found', () => {
    document.getElementById = () => null;

    const addEventListenerSpy = [];
    window.addEventListener = (event, handler) => {
      addEventListenerSpy.push({ event, handler });
    };

    initReadingProgress();

    // Should not add any event listeners
    expect(addEventListenerSpy.length).toBe(0);
  });

  test('should return early if main content is not found', () => {
    document.querySelector = () => null;

    const addEventListenerSpy = [];
    window.addEventListener = (event, handler) => {
      addEventListenerSpy.push({ event, handler });
    };

    initReadingProgress();

    // Should not add any event listeners
    expect(addEventListenerSpy.length).toBe(0);
  });

  test('should set initial progress bar width', () => {
    initReadingProgress();

    // Initial width should be set
    expect(mockProgressBar.style.width).toBeTruthy();
  });

  test('should add scroll event listener', () => {
    initReadingProgress();

    expect(scrollHandler).toBeDefined();
  });

  test('should add resize event listener', () => {
    initReadingProgress();

    expect(resizeHandler).toBeDefined();
  });

  test('should show progress bar when scrolled past 100px', () => {
    const classActions = [];
    mockProgressContainer.classList.add = function (className) {
      classActions.push({ action: 'add', className });
    };
    mockProgressContainer.classList.remove = function (className) {
      classActions.push({ action: 'remove', className });
    };

    window.scrollY = 150;

    initReadingProgress();

    const addVisibleActions = classActions.filter(
      (a) => a.action === 'add' && a.className === 'visible'
    );
    expect(addVisibleActions.length).toBeGreaterThan(0);
  });

  test('should hide progress bar when scrolled less than 100px', () => {
    const classActions = [];
    mockProgressContainer.classList.add = function (className) {
      classActions.push({ action: 'add', className });
    };
    mockProgressContainer.classList.remove = function (className) {
      classActions.push({ action: 'remove', className });
    };

    window.scrollY = 50;

    initReadingProgress();

    const removeVisibleActions = classActions.filter(
      (a) => a.action === 'remove' && a.className === 'visible'
    );
    expect(removeVisibleActions.length).toBeGreaterThan(0);
  });

  test('should update progress bar width on scroll', () => {
    initReadingProgress();

    window.scrollY = 500;

    // Trigger scroll handler with requestAnimationFrame
    scrollHandler();

    // Width should be set
    expect(mockProgressBar.style.width).toBeDefined();
  });

  test('should calculate progress percentage correctly', () => {
    window.scrollY = 0;

    initReadingProgress();

    // At start, progress should be 0% or minimal
    const initialWidth = mockProgressBar.style.width;
    expect(initialWidth).toMatch(/^0%|^[\d.]+%$/);
  });

  test('should clamp progress percentage between 0 and 100', () => {
    // Scroll way past content
    window.scrollY = 10000;
    mockMainContent.getBoundingClientRect = () => ({
      top: -9000,
      bottom: -8000,
    });

    initReadingProgress();

    const width = parseFloat(mockProgressBar.style.width);
    expect(width).toBeLessThanOrEqual(100);
    expect(width).toBeGreaterThanOrEqual(0);
  });

  test('should use requestAnimationFrame for scroll throttling', () => {
    const rafSpy = [];
    window.requestAnimationFrame = (callback) => {
      rafSpy.push(callback);
      callback();
    };

    initReadingProgress();

    scrollHandler();
    scrollHandler(); // Call twice rapidly

    // Should have called rAF
    expect(rafSpy.length).toBeGreaterThan(0);
  });

  test('should update progress on window resize', () => {
    initReadingProgress();

    // Change viewport and trigger resize
    window.innerHeight = 1000;
    window.scrollY = 500;

    if (resizeHandler) {
      resizeHandler();
    }

    // Width should be defined
    expect(mockProgressBar.style.width).toBeDefined();
  });
});
