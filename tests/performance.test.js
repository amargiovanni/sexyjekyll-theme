import { initPerformanceMonitoring, initErrorHandling } from '../js/modules/performance.js';

describe('initPerformanceMonitoring', () => {
  let addEventListenerCalls;
  let loadHandler;

  beforeEach(() => {
    delete window.location;
    window.location = { hostname: 'localhost' };
    console.debug = () => {};
    window.performance = {
      timing: {
        navigationStart: 1000,
        requestStart: 1100,
        responseEnd: 1200,
        domLoading: 1300,
        domComplete: 1500,
        loadEventEnd: 2000,
      },
    };
    addEventListenerCalls = [];
    window.addEventListener = (event, handler) => {
      addEventListenerCalls.push({ event, handler });
      if (event === 'load') loadHandler = handler;
    };
  });

  test('should add load event listener on localhost', () => {
    window.location.hostname = 'localhost';
    initPerformanceMonitoring();
    const loadEvents = addEventListenerCalls.filter((call) => call.event === 'load');
    expect(loadEvents.length).toBe(1);
  });

  test('should add load event listener on 127.0.0.1', () => {
    window.location.hostname = '127.0.0.1';
    addEventListenerCalls = [];
    initPerformanceMonitoring();
    const loadEvents = addEventListenerCalls.filter((call) => call.event === 'load');
    expect(loadEvents.length).toBe(1);
  });

  test('should not add load event listener in production', () => {
    window.location.hostname = 'example.com';
    addEventListenerCalls = [];
    initPerformanceMonitoring();
    const loadEvents = addEventListenerCalls.filter((call) => call.event === 'load');
    expect(loadEvents.length).toBe(0);
  });

  test('should not add listener if window.performance is not available', () => {
    delete window.performance;
    addEventListenerCalls = [];
    initPerformanceMonitoring();
    expect(addEventListenerCalls.length).toBe(0);
  });

  test('should not add listener if console.debug is not available', () => {
    delete console.debug;
    addEventListenerCalls = [];
    initPerformanceMonitoring();
    expect(addEventListenerCalls.length).toBe(0);
  });

  test('should log performance metrics on load event', () => {
    const debugLogs = [];
    console.debug = (...args) => debugLogs.push(args);

    initPerformanceMonitoring();

    // Trigger load event
    if (loadHandler) {
      loadHandler();
    }

    expect(debugLogs.length).toBe(3);
    expect(debugLogs.some((log) => log[0].includes('Page Load Time'))).toBe(true);
    expect(debugLogs.some((log) => log[0].includes('Connect Time'))).toBe(true);
    expect(debugLogs.some((log) => log[0].includes('Render Time'))).toBe(true);
  });

  test('should calculate correct page load time', () => {
    const debugLogs = [];
    console.debug = (...args) => debugLogs.push(args);

    initPerformanceMonitoring();

    if (loadHandler) {
      loadHandler();
    }

    const pageLoadLog = debugLogs.find((log) => log[0].includes('Page Load Time'));
    expect(pageLoadLog[1]).toBe('1000ms'); // 2000 - 1000
  });

  test('should calculate correct connect time', () => {
    const debugLogs = [];
    console.debug = (...args) => debugLogs.push(args);

    initPerformanceMonitoring();

    if (loadHandler) {
      loadHandler();
    }

    const connectLog = debugLogs.find((log) => log[0].includes('Connect Time'));
    expect(connectLog[1]).toBe('100ms'); // 1200 - 1100
  });

  test('should calculate correct render time', () => {
    const debugLogs = [];
    console.debug = (...args) => debugLogs.push(args);

    initPerformanceMonitoring();

    if (loadHandler) {
      loadHandler();
    }

    const renderLog = debugLogs.find((log) => log[0].includes('Render Time'));
    expect(renderLog[1]).toBe('200ms'); // 1500 - 1300
  });
});

describe('initErrorHandling', () => {
  let errorHandler;
  let rejectionHandler;
  let consoleErrorSpy;
  let addEventListenerCalls;

  beforeEach(() => {
    delete window.location;
    window.location = { hostname: 'localhost' };
    consoleErrorSpy = [];
    console.error = (...args) => {
      consoleErrorSpy.push(args);
    };
    addEventListenerCalls = [];
    window.addEventListener = (event, handler) => {
      addEventListenerCalls.push({ event, handler });
      if (event === 'error') errorHandler = handler;
      if (event === 'unhandledrejection') rejectionHandler = handler;
    };
  });

  test('should add error event listener', () => {
    initErrorHandling();
    const errorEvents = addEventListenerCalls.filter((call) => call.event === 'error');
    expect(errorEvents.length).toBe(1);
  });

  test('should add unhandledrejection event listener', () => {
    initErrorHandling();
    const rejectionEvents = addEventListenerCalls.filter(
      (call) => call.event === 'unhandledrejection'
    );
    expect(rejectionEvents.length).toBe(1);
  });

  test('should log errors on localhost', () => {
    initErrorHandling();
    const mockError = new Error('Test error');
    errorHandler({ error: mockError });
    expect(consoleErrorSpy.length).toBe(1);
    expect(consoleErrorSpy[0][0]).toBe('Global error:');
    expect(consoleErrorSpy[0][1]).toBe(mockError);
  });

  test('should log errors on 127.0.0.1', () => {
    window.location.hostname = '127.0.0.1';
    initErrorHandling();
    const mockError = new Error('Test error');
    errorHandler({ error: mockError });
    expect(consoleErrorSpy.length).toBe(1);
  });

  test('should not log errors in production', () => {
    window.location.hostname = 'example.com';
    initErrorHandling();
    const mockError = new Error('Test error');
    errorHandler({ error: mockError });
    expect(consoleErrorSpy.length).toBe(0);
  });

  test('should log promise rejections on localhost', () => {
    initErrorHandling();
    const mockReason = 'Promise rejection reason';
    rejectionHandler({ reason: mockReason });
    expect(consoleErrorSpy.length).toBe(1);
    expect(consoleErrorSpy[0][0]).toBe('Unhandled promise rejection:');
    expect(consoleErrorSpy[0][1]).toBe(mockReason);
  });

  test('should log promise rejections on 127.0.0.1', () => {
    window.location.hostname = '127.0.0.1';
    initErrorHandling();
    const mockReason = 'Promise rejection reason';
    rejectionHandler({ reason: mockReason });
    expect(consoleErrorSpy.length).toBe(1);
  });

  test('should not log promise rejections in production', () => {
    window.location.hostname = 'example.com';
    initErrorHandling();
    const mockReason = 'Promise rejection reason';
    rejectionHandler({ reason: mockReason });
    expect(consoleErrorSpy.length).toBe(0);
  });
});
