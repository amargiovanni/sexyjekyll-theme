import { initSearch } from '../js/modules/search.js';

describe('initSearch', () => {
  let mockSearchInput,
    mockSearchClear,
    mockSearchResults,
    mockSearchResultsCount,
    mockRegularPosts,
    mockPagination,
    mockSearchContainer;
  let inputHandler, clearHandler, keydownHandler;
  let createdScript;
  let originalAppendChild;

  beforeEach(() => {
    // Create mock elements
    mockSearchInput = {
      value: '',
      addEventListener: function (event, handler) {
        if (event === 'input') inputHandler = handler;
        if (event === 'keydown') keydownHandler = handler;
      },
      focus: function () {},
    };

    mockSearchClear = {
      style: { display: 'none' },
      addEventListener: function (event, handler) {
        if (event === 'click') clearHandler = handler;
      },
    };

    mockSearchResults = {
      style: { display: 'none' },
      children: [],
      querySelector: function () {
        return null;
      },
    };

    mockSearchResultsCount = {
      style: { display: 'none' },
      innerHTML: '',
    };

    mockRegularPosts = {
      style: { display: 'grid' },
    };

    mockPagination = {
      style: { display: 'flex' },
    };

    mockSearchContainer = {
      dataset: {
        i18nReadMore: 'Read More',
        i18nNoResults: 'No results',
        i18nNoResultsHelp: 'Try again',
        i18nSearchResultsSingular: 'Found {count} result for "{query}"',
        i18nSearchResultsPlural: 'Found {count} results for "{query}"',
        i18nExternalLinkLabel: '(opens in new tab)',
      },
    };

    // Mock document methods
    document.getElementById = (id) => {
      if (id === 'search-input') return mockSearchInput;
      if (id === 'search-clear') return mockSearchClear;
      if (id === 'search-results') return mockSearchResults;
      if (id === 'search-results-count') return mockSearchResultsCount;
      if (id === 'regular-posts') return mockRegularPosts;
      if (id === 'pagination') return mockPagination;
      return null;
    };

    document.querySelector = (selector) => {
      if (selector === '.search-container') return mockSearchContainer;
      return null;
    };

    document.createElement = (tag) => {
      if (tag === 'script') {
        createdScript = {
          src: '',
          onload: null,
        };
        return createdScript;
      }
      return {};
    };

    // Mock document.head.appendChild instead of replacing document.head
    originalAppendChild = document.head.appendChild;
    document.head.appendChild = function () {};

    // Mock window.SimpleJekyllSearch
    global.SimpleJekyllSearch = function (options) {
      return options;
    };
  });

  afterEach(() => {
    // Restore document.head.appendChild if it was mocked
    if (originalAppendChild) {
      document.head.appendChild = originalAppendChild;
    }
  });

  test('should return early if search input not found', () => {
    document.getElementById = () => null;

    const headAppendSpy = [];
    document.head.appendChild = (script) => headAppendSpy.push(script);

    initSearch();

    expect(headAppendSpy.length).toBe(0);
  });

  test('should load Simple Jekyll Search script', () => {
    const appendedScripts = [];
    document.head.appendChild = (script) => appendedScripts.push(script);

    initSearch();

    expect(appendedScripts.length).toBe(1);
    expect(createdScript.src).toBe('/js/simple-jekyll-search.min.js');
  });

  test('should initialize Simple Jekyll Search on script load', () => {
    const simpleJekyllSearchCalls = [];
    global.SimpleJekyllSearch = (options) => {
      simpleJekyllSearchCalls.push(options);
      return options;
    };

    initSearch();

    // Trigger script onload
    if (createdScript && createdScript.onload) {
      createdScript.onload();
    }

    expect(simpleJekyllSearchCalls.length).toBe(1);
    expect(simpleJekyllSearchCalls[0].json).toBe('/search.json');
  });

  test('should add input event listener to search input', () => {
    initSearch();

    expect(inputHandler).toBeDefined();
  });

  test('should add click event listener to clear button', () => {
    initSearch();

    expect(clearHandler).toBeDefined();
  });

  test('should add keydown event listener to search input', () => {
    initSearch();

    expect(keydownHandler).toBeDefined();
  });

  test('should show clear button on search input', () => {
    initSearch();

    const mockEvent = { target: { value: 'test query' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    // Debounce delay
    setTimeout(() => {
      expect(mockSearchClear.style.display).toBe('flex');
    }, 350);
  });

  test('should show search results and hide regular posts on search', () => {
    initSearch();

    const mockEvent = { target: { value: 'test' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    setTimeout(() => {
      expect(mockSearchResults.style.display).toBe('grid');
      expect(mockRegularPosts.style.display).toBe('none');
      expect(mockPagination.style.display).toBe('none');
    }, 350);
  });

  test('should display result count with singular template', (done) => {
    mockSearchResults.children = [{}]; // 1 result

    initSearch();

    const mockEvent = { target: { value: 'test' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    setTimeout(() => {
      expect(mockSearchResultsCount.style.display).toBe('block');
      expect(mockSearchResultsCount.innerHTML).toContain('Found 1 result');
      expect(mockSearchResultsCount.innerHTML).toContain('test');
      done();
    }, 450);
  });

  test('should display result count with plural template', (done) => {
    mockSearchResults.children = [{}, {}, {}]; // 3 results

    initSearch();

    const mockEvent = { target: { value: 'test' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    setTimeout(() => {
      expect(mockSearchResultsCount.style.display).toBe('block');
      expect(mockSearchResultsCount.innerHTML).toContain('Found 3 results');
      done();
    }, 450);
  });

  test('should hide result count when no results', (done) => {
    mockSearchResults.children = [];
    mockSearchResults.querySelector = () => ({ classList: { contains: () => true } });

    initSearch();

    const mockEvent = { target: { value: 'test' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    setTimeout(() => {
      expect(mockSearchResultsCount.style.display).toBe('none');
      done();
    }, 450);
  });

  test('should clear search on empty input', (done) => {
    initSearch();

    const mockEvent = { target: { value: '' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    // Wait for debounce (300ms) + a bit more
    setTimeout(() => {
      expect(mockSearchClear.style.display).toBe('none');
      expect(mockSearchResults.style.display).toBe('none');
      expect(mockRegularPosts.style.display).toBe('grid');
      done();
    }, 350);
  });

  test('should clear search on clear button click', () => {
    mockSearchInput.value = 'test';

    initSearch();

    if (clearHandler) {
      clearHandler();
    }

    expect(mockSearchInput.value).toBe('');
    expect(mockSearchClear.style.display).toBe('none');
    expect(mockSearchResults.style.display).toBe('none');
  });

  test('should focus input on clear button click', () => {
    const focusCalls = [];
    mockSearchInput.focus = () => focusCalls.push(true);

    initSearch();

    if (clearHandler) {
      clearHandler();
    }

    expect(focusCalls.length).toBe(1);
  });

  test('should clear search on Escape key', () => {
    mockSearchInput.value = 'test';

    initSearch();

    const mockEvent = { key: 'Escape' };
    if (keydownHandler) {
      keydownHandler(mockEvent);
    }

    expect(mockSearchInput.value).toBe('');
    expect(mockSearchClear.style.display).toBe('none');
  });

  test('should not clear search on other keys', () => {
    mockSearchInput.value = 'test';
    mockSearchClear.style.display = 'flex';

    initSearch();

    const mockEvent = { key: 'Enter' };
    if (keydownHandler) {
      keydownHandler(mockEvent);
    }

    expect(mockSearchInput.value).toBe('test');
  });

  test('should handle search input without regular posts element', () => {
    document.getElementById = (id) => {
      if (id === 'search-input') return mockSearchInput;
      if (id === 'search-clear') return mockSearchClear;
      if (id === 'search-results') return mockSearchResults;
      if (id === 'search-results-count') return mockSearchResultsCount;
      if (id === 'regular-posts') return null;
      if (id === 'pagination') return null;
      return null;
    };

    initSearch();

    const mockEvent = { target: { value: 'test' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    // Should not throw error
    expect(inputHandler).toBeDefined();
  });

  test('should use default i18n values if data attributes missing', () => {
    document.querySelector = () => null;

    const simpleJekyllSearchCalls = [];
    global.SimpleJekyllSearch = (options) => {
      simpleJekyllSearchCalls.push(options);
      return options;
    };

    initSearch();

    if (createdScript && createdScript.onload) {
      createdScript.onload();
    }

    expect(simpleJekyllSearchCalls[0].searchResultTemplate).toContain('Read →');
    expect(simpleJekyllSearchCalls[0].noResultsText).toContain('No results found');
  });

  test('should escape HTML in search query display', (done) => {
    mockSearchResults.children = [{}];

    initSearch();

    const mockEvent = { target: { value: '<script>alert("xss")</script>' } };
    if (inputHandler) {
      inputHandler(mockEvent);
    }

    setTimeout(() => {
      expect(mockSearchResultsCount.innerHTML).not.toContain('<script>');
      expect(mockSearchResultsCount.innerHTML).toContain('&lt;script&gt;');
      done();
    }, 450);
  });

  test('should configure Simple Jekyll Search with correct options', () => {
    const simpleJekyllSearchCalls = [];
    global.SimpleJekyllSearch = (options) => {
      simpleJekyllSearchCalls.push(options);
      return options;
    };

    initSearch();

    if (createdScript && createdScript.onload) {
      createdScript.onload();
    }

    const options = simpleJekyllSearchCalls[0];
    expect(options.searchInput).toBe(mockSearchInput);
    expect(options.resultsContainer).toBe(mockSearchResults);
    expect(options.limit).toBe(20);
    expect(options.fuzzy).toBe(false);
  });
});
