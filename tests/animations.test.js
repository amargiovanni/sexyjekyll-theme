import { initPageAnimations } from '../js/modules/animations.js';

describe('initPageAnimations', () => {
  let mockElements;
  let observerCallbacks;

  beforeEach(() => {
    mockElements = {
      hero: {
        classList: { add: function () {} },
        querySelectorAll: () => [
          { classList: { add: function () {} } },
          { classList: { add: function () {} } },
        ],
      },
      postHero: {
        classList: { add: function () {} },
        querySelectorAll: () => [{ classList: { add: function () {} } }],
      },
      postHeader: {
        classList: { add: function () {} },
        querySelectorAll: () => [{ classList: { add: function () {} } }],
      },
      nav: { classList: { add: function () {} } },
      mainContent: { classList: { add: function () {} } },
      footer: { classList: { add: function () {} } },
      postContent: {
        querySelectorAll: () => [
          { classList: { add: function () {} }, style: {} },
          { classList: { add: function () {} }, style: {} },
        ],
      },
    };

    observerCallbacks = {};

    document.querySelector = (selector) => {
      if (selector === '.hero') return mockElements.hero;
      if (selector === '.post-hero') return mockElements.postHero;
      if (selector === '.post-header') return mockElements.postHeader;
      if (selector === '.nav') return mockElements.nav;
      if (selector === '#main-content, main') return mockElements.mainContent;
      if (selector === '.footer') return mockElements.footer;
      if (selector === '.post-content') return mockElements.postContent;
      return null;
    };

    document.querySelectorAll = (selector) => {
      if (selector.includes('.blog-post-card')) return [{ classList: { add: function () {} } }];
      if (selector.includes('.blog-section')) return [{ classList: { add: function () {}, contains: () => false }, querySelector: () => null }];
      if (selector.includes('h2, h3, p')) {
        return mockElements.postContent.querySelectorAll();
      }
      return [];
    };

    global.IntersectionObserver = function (callback, options) {
      observerCallbacks[callback.toString()] = { callback, options };
      return {
        observe: function () {},
        unobserve: function () {},
        disconnect: function () {},
      };
    };
  });

  test('should animate hero section if present', () => {
    const addCalls = [];
    mockElements.hero.classList.add = (className) => addCalls.push(className);

    initPageAnimations();

    expect(addCalls).toContain('hero-animate');
  });

  test('should animate hero children', () => {
    const childAddCalls = [];
    const mockChildren = [
      { classList: { add: (c) => childAddCalls.push(c) } },
      { classList: { add: (c) => childAddCalls.push(c) } },
    ];
    mockElements.hero.querySelectorAll = () => mockChildren;

    initPageAnimations();

    expect(childAddCalls.filter((c) => c === 'animate-on-load').length).toBe(2);
  });

  test('should animate post hero section if present', () => {
    const addCalls = [];
    mockElements.postHero.classList.add = (className) => addCalls.push(className);

    initPageAnimations();

    expect(addCalls).toContain('post-hero-animate');
  });

  test('should animate post hero children', () => {
    const childAddCalls = [];
    const mockChildren = [{ classList: { add: (c) => childAddCalls.push(c) } }];
    mockElements.postHero.querySelectorAll = () => mockChildren;

    initPageAnimations();

    expect(childAddCalls).toContain('animate-on-load');
  });

  test('should animate post header if present', () => {
    const addCalls = [];
    mockElements.postHeader.classList.add = (className) => addCalls.push(className);

    initPageAnimations();

    expect(addCalls).toContain('post-header-animate');
  });

  test('should animate post header children', () => {
    const childAddCalls = [];
    const mockChildren = [{ classList: { add: (c) => childAddCalls.push(c) } }];
    mockElements.postHeader.querySelectorAll = () => mockChildren;

    initPageAnimations();

    expect(childAddCalls).toContain('animate-on-load');
  });

  test('should animate navigation', () => {
    const addCalls = [];
    mockElements.nav.classList.add = (...classNames) => {
      classNames.forEach((c) => addCalls.push(c));
    };

    initPageAnimations();

    expect(addCalls).toContain('nav-animate');
    expect(addCalls).toContain('animate-on-load');
  });

  test('should animate main content', () => {
    const addCalls = [];
    mockElements.mainContent.classList.add = (...classNames) => {
      classNames.forEach((c) => addCalls.push(c));
    };

    initPageAnimations();

    expect(addCalls).toContain('content-animate');
    expect(addCalls).toContain('animate-on-load');
  });

  test('should animate blog post cards with stagger effect', () => {
    const mockCards = Array.from({ length: 10 }, () => ({
      classList: { add: function () {} },
    }));

    const addCallsPerCard = mockCards.map(() => []);
    mockCards.forEach((card, index) => {
      card.classList.add = (...classNames) => {
        classNames.forEach((c) => addCallsPerCard[index].push(c));
      };
    });

    document.querySelectorAll = (selector) => {
      if (selector.includes('.blog-post-card')) return mockCards;
      if (selector.includes('.blog-section')) return [];
      return [];
    };

    initPageAnimations();

    // Check first 8 cards have delay classes
    for (let i = 0; i < 8; i++) {
      expect(addCallsPerCard[i]).toContain(`delay-${i + 1}`);
    }

    // Cards 9 and 10 should not have delay classes
    expect(addCallsPerCard[8]).not.toContain('delay-9');
    expect(addCallsPerCard[9]).not.toContain('delay-10');
  });

  test('should create IntersectionObserver for footer', () => {
    let observerCreated = false;
    global.IntersectionObserver = function (callback, options) {
      observerCreated = true;
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    expect(observerCreated).toBe(true);
  });

  test('should observe footer with correct options', () => {
    let capturedOptions;
    global.IntersectionObserver = function (callback, options) {
      capturedOptions = options;
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    expect(capturedOptions.threshold).toBe(0.1);
    expect(capturedOptions.rootMargin).toBe('0px 0px -50px 0px');
  });

  test('should animate footer when intersecting', () => {
    let observerCallback;
    const addCalls = [];
    mockElements.footer.classList.add = (...classNames) => {
      classNames.forEach((c) => addCalls.push(c));
    };

    global.IntersectionObserver = function (callback, options) {
      observerCallback = callback;
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    // Simulate intersection
    const entries = [
      {
        isIntersecting: true,
        target: mockElements.footer,
      },
    ];

    if (observerCallback) {
      observerCallback(entries);
    }

    expect(addCalls).toContain('fade-in-up');
    expect(addCalls).toContain('animate-on-load');
  });

  test('should create IntersectionObserver for sections', () => {
    const mockSections = [
      { classList: { add: function () {}, contains: () => false }, querySelector: () => null },
    ];

    document.querySelectorAll = (selector) => {
      if (selector.includes('.blog-section')) return mockSections;
      return [];
    };

    let observerCreated = false;
    global.IntersectionObserver = function (callback, options) {
      if (options.threshold === 0.15) {
        observerCreated = true;
      }
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    expect(observerCreated).toBe(true);
  });

  test('should animate sections when intersecting', () => {
    const addCalls = [];
    const mockSection = {
      classList: {
        add: (className) => addCalls.push(className),
        contains: () => false,
      },
      querySelector: () => null,
    };

    document.querySelectorAll = (selector) => {
      if (selector.includes('.blog-section')) return [mockSection];
      return [];
    };

    let sectionObserverCallback;
    global.IntersectionObserver = function (callback, options) {
      if (options.threshold === 0.15) {
        sectionObserverCallback = callback;
      }
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    // Simulate intersection
    const entries = [
      {
        isIntersecting: true,
        target: mockSection,
      },
    ];

    if (sectionObserverCallback) {
      sectionObserverCallback(entries);
    }

    expect(addCalls).toContain('fade-in-up');
  });

  test('should skip sections that already have hero class', () => {
    const observeCalls = [];
    const mockSections = [
      { classList: { add: function () {}, contains: () => true }, querySelector: () => null },
      { classList: { add: function () {}, contains: () => false }, querySelector: () => null },
    ];

    document.querySelectorAll = (selector) => {
      if (selector.includes('.blog-section')) return mockSections;
      return [];
    };

    global.IntersectionObserver = function (callback, options) {
      if (options.threshold === 0.15) {
        return {
          observe: function (target) {
            observeCalls.push(target);
          },
          unobserve: function () {},
        };
      }
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    // Should only observe the second section (not the one with hero class)
    expect(observeCalls.length).toBe(1);
    expect(observeCalls[0]).toBe(mockSections[1]);
  });

  test('should create IntersectionObserver for post content elements', () => {
    let observerCreated = false;
    global.IntersectionObserver = function (callback, options) {
      if (options.rootMargin === '0px 0px -50px 0px' && options.threshold === 0.1) {
        observerCreated = true;
      }
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    expect(observerCreated).toBe(true);
  });

  test('should set opacity and animation delay for post content elements', () => {
    const mockElements = [
      { classList: { add: function () {} }, style: {} },
      { classList: { add: function () {} }, style: {} },
      { classList: { add: function () {} }, style: {} },
    ];

    mockElements.postContent.querySelectorAll = () => mockElements;

    initPageAnimations();

    mockElements.forEach((element, index) => {
      expect(element.style.opacity).toBe('0');
      expect(element.style.animationDelay).toBeDefined();
    });
  });

  test('should cap animation delay at 0.3s', () => {
    const mockElements = Array.from({ length: 10 }, () => ({
      classList: { add: function () {} },
      style: {},
    }));

    mockElements.postContent.querySelectorAll = () => mockElements;

    initPageAnimations();

    // Last element should have max delay of 0.3s
    const lastDelay = parseFloat(mockElements[9].style.animationDelay);
    expect(lastDelay).toBeLessThanOrEqual(0.3);
  });

  test('should not animate post content if IntersectionObserver not supported', () => {
    delete global.IntersectionObserver;

    const observeCalls = [];
    const mockElements = [{ classList: { add: function () {} }, style: {} }];
    mockElements.postContent.querySelectorAll = () => mockElements;

    initPageAnimations();

    // Should not set style properties
    expect(mockElements[0].style.opacity).toBeUndefined();
  });

  test('should animate post content elements when intersecting', () => {
    const addCalls = [];
    const mockElement = {
      classList: { add: (className) => addCalls.push(className) },
      style: {},
    };

    mockElements.postContent.querySelectorAll = () => [mockElement];

    let contentObserverCallback;
    global.IntersectionObserver = function (callback, options) {
      if (options.rootMargin === '0px 0px -50px 0px') {
        contentObserverCallback = callback;
      }
      return {
        observe: function () {},
        unobserve: function () {},
      };
    };

    initPageAnimations();

    // Simulate intersection
    const entries = [
      {
        isIntersecting: true,
        target: mockElement,
      },
    ];

    if (contentObserverCallback) {
      contentObserverCallback(entries);
    }

    expect(addCalls).toContain('fade-in-up');
  });
});
