import { initAnimatedBackground } from '../js/modules/animated-background.js';

describe('initAnimatedBackground', () => {
  let mockBlobs;

  beforeEach(() => {
    // Create mock gradient blob elements
    mockBlobs = [
      { style: { transform: '', background: '' } },
      { style: { transform: '', background: '' } },
      { style: { transform: '', background: '' } },
    ];

    document.querySelectorAll = (selector) => {
      if (selector === '.gradient-blob') {
        return mockBlobs;
      }
      return [];
    };

    // Mock Math.random for predictable testing
    let callCount = 0;
    global.Math.random = () => {
      callCount++;
      // Return values > 0.7 to trigger color changes
      return callCount % 2 === 0 ? 0.8 : 0.5;
    };
  });

  afterEach(() => {
    // Restore Math.random
    global.Math.random = Math.random;
  });

  test('should add mousemove event listener', () => {
    const addEventListenerSpy = [];
    document.addEventListener = (event, handler) => {
      addEventListenerSpy.push({ event, handler });
    };

    initAnimatedBackground();

    expect(addEventListenerSpy.some((spy) => spy.event === 'mousemove')).toBe(true);
  });

  test('should transform blobs on mouse move', () => {
    let mouseMoveHandler;
    document.addEventListener = (event, handler) => {
      if (event === 'mousemove') {
        mouseMoveHandler = handler;
      }
    };

    initAnimatedBackground();

    // Simulate mouse move event
    const mockEvent = {
      clientX: 500,
      clientY: 300,
    };

    window.innerWidth = 1000;
    window.innerHeight = 600;

    mouseMoveHandler(mockEvent);

    // Check that transforms were applied
    expect(mockBlobs[0].style.transform).toBeTruthy();
    expect(mockBlobs[1].style.transform).toBeTruthy();
    expect(mockBlobs[2].style.transform).toBeTruthy();
  });

  test('should calculate correct parallax offset', () => {
    let mouseMoveHandler;
    document.addEventListener = (event, handler) => {
      if (event === 'mousemove') {
        mouseMoveHandler = handler;
      }
    };

    initAnimatedBackground();

    // Mouse at center should result in minimal offset
    const centerEvent = {
      clientX: 500,
      clientY: 300,
    };

    window.innerWidth = 1000;
    window.innerHeight = 600;

    mouseMoveHandler(centerEvent);

    // At center (0.5, 0.5), offset should be 0
    expect(mockBlobs[0].style.transform).toBe('translate(0px, 0px)');
  });

  test('should apply different speeds to different blobs', () => {
    let mouseMoveHandler;
    document.addEventListener = (event, handler) => {
      if (event === 'mousemove') {
        mouseMoveHandler = handler;
      }
    };

    initAnimatedBackground();

    // Mouse at edge
    const edgeEvent = {
      clientX: 1000,
      clientY: 600,
    };

    window.innerWidth = 1000;
    window.innerHeight = 600;

    mouseMoveHandler(edgeEvent);

    // Different blobs should have different transforms due to different speeds
    const transform1 = mockBlobs[0].style.transform;
    const transform2 = mockBlobs[1].style.transform;
    const transform3 = mockBlobs[2].style.transform;

    expect(transform1).not.toBe(transform2);
    expect(transform2).not.toBe(transform3);
  });

  test('should set up interval for color shifting', () => {
    const setIntervalSpy = [];
    global.setInterval = (fn, delay) => {
      setIntervalSpy.push({ fn, delay });
      return 123; // mock timer ID
    };

    initAnimatedBackground();

    expect(setIntervalSpy.length).toBe(1);
    expect(setIntervalSpy[0].delay).toBe(10000);
  });

  test('should change blob colors when interval fires', () => {
    let intervalCallback;
    global.setInterval = (fn, delay) => {
      intervalCallback = fn;
      return 123;
    };

    initAnimatedBackground();

    // Fire the interval callback
    intervalCallback();

    // Check that some blobs had their background changed
    const hasBackgroundSet = mockBlobs.some((blob) => blob.style.background !== '');
    expect(hasBackgroundSet).toBe(true);
  });

  test('should apply random colors from predefined palette', () => {
    let intervalCallback;
    global.setInterval = (fn, delay) => {
      intervalCallback = fn;
      return 123;
    };

    const colors = ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4', '#f97316', '#facc15'];

    initAnimatedBackground();
    intervalCallback();

    // Check that backgrounds use colors from the palette
    const backgrounds = mockBlobs.map((blob) => blob.style.background).filter((bg) => bg !== '');

    backgrounds.forEach((background) => {
      const hasValidColor = colors.some((color) => background.includes(color));
      expect(hasValidColor).toBe(true);
    });
  });
});
