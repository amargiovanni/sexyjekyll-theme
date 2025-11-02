/**
 * Tests for utility functions
 */

import { debounce, throttle, slugify, escapeHtml } from '../js/modules/utils.js';

describe('Utils Module', () => {
  describe('debounce', () => {
    test('should delay function execution', (done) => {
      let callCount = 0;
      const fn = () => callCount++;
      const debouncedFn = debounce(fn, 50);

      debouncedFn();
      expect(callCount).toBe(0);

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 60);
    });

    test('should only call function once for multiple rapid calls', (done) => {
      let callCount = 0;
      const fn = () => callCount++;
      const debouncedFn = debounce(fn, 50);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 60);
    });

    test('should pass arguments to the debounced function', (done) => {
      let receivedArgs = [];
      const fn = (...args) => { receivedArgs = args; };
      const debouncedFn = debounce(fn, 50);

      debouncedFn('arg1', 'arg2');

      setTimeout(() => {
        expect(receivedArgs).toEqual(['arg1', 'arg2']);
        done();
      }, 60);
    });
  });

  describe('throttle', () => {
    test('should limit function execution rate', (done) => {
      let callCount = 0;
      const fn = () => callCount++;
      const throttledFn = throttle(fn, 50);

      throttledFn();
      expect(callCount).toBe(1);

      throttledFn();
      expect(callCount).toBe(1);

      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 60);
    });

    test('should pass arguments to the throttled function', () => {
      let receivedArgs = [];
      const fn = (...args) => { receivedArgs = args; };
      const throttledFn = throttle(fn, 100);

      throttledFn('arg1', 'arg2');
      expect(receivedArgs).toEqual(['arg1', 'arg2']);
    });
  });

  describe('slugify', () => {
    test('should convert text to URL-friendly slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    test('should remove special characters', () => {
      expect(slugify('Hello @#$ World!')).toBe('hello-world');
    });

    test('should handle multiple spaces', () => {
      expect(slugify('Hello    World')).toBe('hello-world');
    });

    test('should remove leading and trailing hyphens', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world');
    });

    test('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    test('should handle unicode characters', () => {
      expect(slugify('Café')).toBe('caf');
    });

    test('should replace multiple consecutive hyphens with single hyphen', () => {
      expect(slugify('Hello---World')).toBe('hello-world');
    });
  });

  describe('escapeHtml', () => {
    test('should escape ampersand', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    test('should escape less than', () => {
      expect(escapeHtml('5 < 10')).toBe('5 &lt; 10');
    });

    test('should escape greater than', () => {
      expect(escapeHtml('10 > 5')).toBe('10 &gt; 5');
    });

    test('should escape double quotes', () => {
      expect(escapeHtml('Say "Hello"')).toBe('Say &quot;Hello&quot;');
    });

    test('should escape single quotes', () => {
      expect(escapeHtml("It's nice")).toBe('It&#039;s nice');
    });

    test('should escape multiple characters', () => {
      expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
        '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
      );
    });

    test('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    test('should not modify safe strings', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });
  });
});
