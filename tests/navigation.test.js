import { initNavigation } from '../js/modules/navigation.js';

describe('initNavigation', () => {
  let mockSections;
  let mockNavLinks;
  let mockObserver;
  let observerCallback;

  beforeEach(() => {
    // Create mock sections
    mockSections = [
      { getAttribute: () => 'section1' },
      { getAttribute: () => 'section2' },
      { getAttribute: () => 'section3' },
    ];

    // Create mock nav links
    mockNavLinks = [
      {
        getAttribute: (attr) => (attr === 'href' ? '#section1' : null),
        classList: {
          remove: function () {},
          add: function () {},
        },
      },
      {
        getAttribute: (attr) => (attr === 'href' ? '#section2' : null),
        classList: {
          remove: function () {},
          add: function () {},
        },
      },
      {
        getAttribute: (attr) => (attr === 'href' ? '#section3' : null),
        classList: {
          remove: function () {},
          add: function () {},
        },
      },
    ];

    // Mock IntersectionObserver
    mockObserver = {
      observe: function () {},
      disconnect: function () {},
    };

    global.IntersectionObserver = function (callback, options) {
      observerCallback = callback;
      return mockObserver;
    };

    // Mock querySelectorAll
    document.querySelectorAll = (selector) => {
      if (selector === 'section[id]') {
        return mockSections;
      }
      if (selector === '.nav-link') {
        return mockNavLinks;
      }
      return [];
    };
  });

  test('should call highlightActiveSection on init', () => {
    const observeSpy = [];
    mockObserver.observe = (target) => {
      observeSpy.push(target);
    };

    initNavigation();

    // Should observe all sections
    expect(observeSpy.length).toBe(3);
  });

  test('should create IntersectionObserver with correct options', () => {
    let capturedOptions;
    global.IntersectionObserver = function (callback, options) {
      capturedOptions = options;
      observerCallback = callback;
      return mockObserver;
    };

    initNavigation();

    expect(capturedOptions.threshold).toBe(0.3);
    expect(capturedOptions.rootMargin).toBe('-80px 0px -70% 0px');
  });

  test('should observe all sections', () => {
    const observeSpy = [];
    mockObserver.observe = (target) => {
      observeSpy.push(target);
    };

    initNavigation();

    expect(observeSpy).toEqual(mockSections);
  });

  test('should add active class to corresponding nav link when section is visible', () => {
    const classActions = [];

    mockNavLinks.forEach((link) => {
      link.classList.remove = function (className) {
        classActions.push({ action: 'remove', link, className });
      };
      link.classList.add = function (className) {
        classActions.push({ action: 'add', link, className });
      };
    });

    initNavigation();

    // Simulate section2 becoming visible
    const entries = [
      {
        isIntersecting: true,
        target: mockSections[1],
      },
    ];

    observerCallback(entries);

    // Should remove 'active' from all links
    const removeActions = classActions.filter((a) => a.action === 'remove');
    expect(removeActions.length).toBe(3);

    // Should add 'active' to link for section2
    const addActions = classActions.filter((a) => a.action === 'add');
    expect(addActions.length).toBe(1);
    expect(addActions[0].link).toBe(mockNavLinks[1]);
  });

  test('should not add active class when section is not intersecting', () => {
    const classActions = [];

    mockNavLinks.forEach((link) => {
      link.classList.remove = function (className) {
        classActions.push({ action: 'remove', link, className });
      };
      link.classList.add = function (className) {
        classActions.push({ action: 'add', link, className });
      };
    });

    initNavigation();

    // Simulate section not intersecting
    const entries = [
      {
        isIntersecting: false,
        target: mockSections[0],
      },
    ];

    observerCallback(entries);

    // Should not add any 'active' classes
    const addActions = classActions.filter((a) => a.action === 'add');
    expect(addActions.length).toBe(0);
  });

  test('should handle multiple intersecting sections', () => {
    const classActions = [];

    mockNavLinks.forEach((link) => {
      link.classList.remove = function (className) {
        classActions.push({ action: 'remove', link, className });
      };
      link.classList.add = function (className) {
        classActions.push({ action: 'add', link, className });
      };
    });

    initNavigation();

    // Simulate multiple sections visible
    const entries = [
      {
        isIntersecting: true,
        target: mockSections[0],
      },
      {
        isIntersecting: true,
        target: mockSections[1],
      },
    ];

    observerCallback(entries);

    // Should add 'active' to both corresponding links
    const addActions = classActions.filter((a) => a.action === 'add');
    expect(addActions.length).toBe(2);
  });

  test('should do nothing if IntersectionObserver is not supported', () => {
    // Remove IntersectionObserver support
    const originalIO = global.IntersectionObserver;
    delete global.IntersectionObserver;

    const observeSpy = [];
    mockObserver.observe = (target) => {
      observeSpy.push(target);
    };

    initNavigation();

    // Should not observe anything
    expect(observeSpy.length).toBe(0);

    // Restore
    global.IntersectionObserver = originalIO;
  });
});
