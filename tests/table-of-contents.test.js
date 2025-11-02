import { initTableOfContents } from '../js/modules/table-of-contents.js';

describe('initTableOfContents', () => {
  let mockTocContainer, mockTocList, mockTocEmpty, mockTocToggle, mockTocNav, mockContent;
  let mockHeadings;
  let observerCallback;

  beforeEach(() => {
    // Create mock elements
    mockTocContainer = {
      classList: {
        toggle: function () {},
        contains: function () {
          return false;
        },
      },
    };

    mockTocList = {
      appendChild: function () {},
      querySelector: function () {
        return null;
      },
      querySelectorAll: function () {
        return [];
      },
    };

    mockTocEmpty = { style: { display: 'none' } };
    mockTocToggle = {
      addEventListener: function () {},
      setAttribute: function () {},
    };
    mockTocNav = {
      style: { display: 'block' },
      getBoundingClientRect: () => ({ top: 0, bottom: 500 }),
    };

    // Create mock headings
    mockHeadings = [
      {
        id: '',
        tagName: 'H2',
        textContent: 'First Heading',
        getBoundingClientRect: () => ({ top: 100 }),
      },
      {
        id: 'existing-id',
        tagName: 'H3',
        textContent: 'Second Heading',
        getBoundingClientRect: () => ({ top: 200 }),
      },
      {
        id: '',
        tagName: 'H2',
        textContent: 'Third Heading',
        getBoundingClientRect: () => ({ top: 300 }),
      },
    ];

    mockContent = {
      querySelectorAll: (selector) => {
        if (selector === 'h2, h3') {
          return mockHeadings;
        }
        return [];
      },
    };

    // Mock document methods
    document.getElementById = (id) => {
      if (id === 'toc-container') return mockTocContainer;
      if (id === 'toc-list') return mockTocList;
      if (id === 'toc-empty') return mockTocEmpty;
      if (id === 'toc-toggle') return mockTocToggle;
      if (id === 'toc-nav') return mockTocNav;
      if (id.startsWith('heading-')) return mockHeadings[0];
      if (id === 'existing-id') return mockHeadings[1];
      return null;
    };

    document.querySelector = (selector) => {
      if (selector === '.post-content') return mockContent;
      return null;
    };

    document.createElement = (tag) => {
      if (tag === 'li') {
        return {
          className: '',
          appendChild: function () {},
        };
      }
      if (tag === 'a') {
        return {
          className: '',
          href: '',
          textContent: '',
          setAttribute: function () {},
          addEventListener: function () {},
          classList: {
            add: function () {},
            remove: function () {},
          },
          getBoundingClientRect: () => ({ top: 50, bottom: 100 }),
          scrollIntoView: function () {},
        };
      }
      return {};
    };

    // Mock IntersectionObserver
    global.IntersectionObserver = function (callback, options) {
      observerCallback = callback;
      return {
        observe: function () {},
        disconnect: function () {},
      };
    };

    // Mock window methods
    window.scrollTo = function () {};
    window.pageYOffset = 0;
    history.pushState = function () {};
  });

  test('should return early if TOC container not found', () => {
    document.getElementById = () => null;
    const appendSpy = [];
    mockTocList.appendChild = (item) => appendSpy.push(item);

    initTableOfContents();

    expect(appendSpy.length).toBe(0);
  });

  test('should return early if post content not found', () => {
    document.querySelector = () => null;
    const appendSpy = [];
    mockTocList.appendChild = (item) => appendSpy.push(item);

    initTableOfContents();

    expect(appendSpy.length).toBe(0);
  });

  test('should show empty message when no headings found', () => {
    mockContent.querySelectorAll = () => [];

    initTableOfContents();

    expect(mockTocEmpty.style.display).toBe('block');
    expect(mockTocNav.style.display).toBe('none');
  });

  test('should generate TOC items for all headings', () => {
    const appendedItems = [];
    mockTocList.appendChild = (item) => appendedItems.push(item);

    initTableOfContents();

    expect(appendedItems.length).toBe(3);
  });

  test('should create unique IDs for headings without IDs', () => {
    initTableOfContents();

    // First and third headings should get IDs
    expect(mockHeadings[0].id).toBeTruthy();
    expect(mockHeadings[0].id).toContain('heading-');
    expect(mockHeadings[2].id).toBeTruthy();

    // Second heading already has ID
    expect(mockHeadings[1].id).toBe('existing-id');
  });

  test('should set correct CSS classes for TOC items', () => {
    const createdElements = [];
    document.createElement = (tag) => {
      const element = {
        className: '',
        tagName: tag.toUpperCase(),
        appendChild: function () {},
        setAttribute: function () {},
        addEventListener: function () {},
        classList: { add: function () {}, remove: function () {} },
        getBoundingClientRect: () => ({ top: 50, bottom: 100 }),
        scrollIntoView: function () {},
      };
      createdElements.push(element);
      return element;
    };

    initTableOfContents();

    const listItems = createdElements.filter((el) => el.tagName === 'LI');
    expect(listItems[0].className).toContain('toc-h2');
    expect(listItems[1].className).toContain('toc-h3');
  });

  test('should add click event listener to TOC links', () => {
    const eventListeners = [];
    document.createElement = (tag) => {
      if (tag === 'a') {
        return {
          className: '',
          href: '',
          textContent: '',
          setAttribute: function () {},
          addEventListener: function (event, handler) {
            eventListeners.push({ event, handler });
          },
          classList: { add: function () {}, remove: function () {} },
          getBoundingClientRect: () => ({ top: 50, bottom: 100 }),
          scrollIntoView: function () {},
        };
      }
      return {
        className: '',
        appendChild: function () {},
      };
    };

    initTableOfContents();

    const clickListeners = eventListeners.filter((el) => el.event === 'click');
    expect(clickListeners.length).toBe(3);
  });

  test('should scroll to heading on TOC link click', () => {
    let clickHandler;
    document.createElement = (tag) => {
      if (tag === 'a') {
        return {
          className: '',
          href: '',
          textContent: '',
          setAttribute: function () {},
          addEventListener: function (event, handler) {
            if (event === 'click') clickHandler = handler;
          },
          classList: { add: function () {}, remove: function () {} },
          getBoundingClientRect: () => ({ top: 50, bottom: 100 }),
          scrollIntoView: function () {},
        };
      }
      return {
        className: '',
        appendChild: function () {},
      };
    };

    const scrollCalls = [];
    window.scrollTo = (options) => scrollCalls.push(options);

    initTableOfContents();

    // Simulate click
    const mockEvent = { preventDefault: () => {} };
    if (clickHandler) {
      clickHandler(mockEvent);
    }

    expect(scrollCalls.length).toBe(1);
    expect(scrollCalls[0].behavior).toBe('smooth');
  });

  test('should update URL hash on TOC link click', () => {
    let clickHandler;
    document.createElement = (tag) => {
      if (tag === 'a') {
        return {
          className: '',
          href: '',
          textContent: '',
          setAttribute: function () {},
          addEventListener: function (event, handler) {
            if (event === 'click') clickHandler = handler;
          },
          classList: { add: function () {}, remove: function () {} },
          getBoundingClientRect: () => ({ top: 50, bottom: 100 }),
          scrollIntoView: function () {},
        };
      }
      return {
        className: '',
        appendChild: function () {},
      };
    };

    const pushStateCalls = [];
    history.pushState = (...args) => pushStateCalls.push(args);

    initTableOfContents();

    const mockEvent = { preventDefault: () => {} };
    if (clickHandler) {
      clickHandler(mockEvent);
    }

    expect(pushStateCalls.length).toBe(1);
  });

  test('should add toggle event listener to toggle button', () => {
    const eventListeners = [];
    mockTocToggle.addEventListener = (event, handler) => {
      eventListeners.push({ event, handler });
    };

    initTableOfContents();

    const clickListeners = eventListeners.filter((el) => el.event === 'click');
    expect(clickListeners.length).toBe(1);
  });

  test('should toggle collapsed class on toggle button click', () => {
    let toggleHandler;
    mockTocToggle.addEventListener = (event, handler) => {
      if (event === 'click') toggleHandler = handler;
    };

    const toggleCalls = [];
    mockTocContainer.classList.toggle = (className) => {
      toggleCalls.push(className);
    };

    initTableOfContents();

    if (toggleHandler) {
      toggleHandler();
    }

    expect(toggleCalls).toContain('collapsed');
  });

  test('should create IntersectionObserver for headings', () => {
    let observerCreated = false;
    global.IntersectionObserver = function (callback, options) {
      observerCreated = true;
      observerCallback = callback;
      return {
        observe: function () {},
        disconnect: function () {},
      };
    };

    initTableOfContents();

    expect(observerCreated).toBe(true);
  });

  test('should observe all headings', () => {
    const observedElements = [];
    global.IntersectionObserver = function (callback, options) {
      return {
        observe: function (element) {
          observedElements.push(element);
        },
        disconnect: function () {},
      };
    };

    initTableOfContents();

    expect(observedElements.length).toBe(3);
  });

  test('should add active class to TOC link when heading is intersecting', () => {
    const tocLinks = [];
    mockTocList.querySelector = (selector) => {
      const link = {
        classList: {
          add: function (className) {
            link.activeClass = className;
          },
          remove: function () {},
        },
        getBoundingClientRect: () => ({ top: 100, bottom: 150 }),
        scrollIntoView: function () {},
      };
      tocLinks.push(link);
      return link;
    };

    mockTocList.querySelectorAll = () => tocLinks;

    initTableOfContents();

    // Simulate intersection
    const entries = [
      {
        isIntersecting: true,
        target: { getAttribute: () => 'existing-id' },
      },
    ];

    if (observerCallback) {
      observerCallback(entries);
    }

    expect(tocLinks[0].activeClass).toBe('active');
  });

  test('should remove active class from all links before adding to current', () => {
    const removeCalls = [];
    const tocLinks = [
      { classList: { remove: (c) => removeCalls.push(c) } },
      { classList: { remove: (c) => removeCalls.push(c) } },
    ];

    mockTocList.querySelector = () => ({
      classList: { add: function () {}, remove: function () {} },
      getBoundingClientRect: () => ({ top: 100, bottom: 150 }),
      scrollIntoView: function () {},
    });
    mockTocList.querySelectorAll = () => tocLinks;

    initTableOfContents();

    const entries = [
      {
        isIntersecting: true,
        target: { getAttribute: () => 'existing-id' },
      },
    ];

    if (observerCallback) {
      observerCallback(entries);
    }

    expect(removeCalls.length).toBe(2);
    expect(removeCalls).toContain('active');
  });

  test('should scroll TOC to show active item if needed', () => {
    const scrollCalls = [];
    const mockLink = {
      classList: { add: function () {}, remove: function () {} },
      getBoundingClientRect: () => ({ top: -50, bottom: 50 }),
      scrollIntoView: (options) => scrollCalls.push(options),
    };

    mockTocList.querySelector = () => mockLink;
    mockTocList.querySelectorAll = () => [];

    initTableOfContents();

    const entries = [
      {
        isIntersecting: true,
        target: { getAttribute: () => 'existing-id' },
      },
    ];

    if (observerCallback) {
      observerCallback(entries);
    }

    expect(scrollCalls.length).toBe(1);
    expect(scrollCalls[0].block).toBe('nearest');
  });
});
