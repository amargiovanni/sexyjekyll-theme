# JavaScript Architecture

## Overview

SexyJekyll uses a modern, modular JavaScript architecture based on ES6 modules.
The codebase has been refactored from a monolithic structure into separate,
focused modules that follow the Single Responsibility Principle.

## Architecture Diagram

```
js/
├── main.js                    # Application entry point (36 lines)
└── modules/
    ├── animations.js          # Page and scroll animations
    ├── animated-background.js # Background effects
    ├── dark-mode.js          # Theme management
    ├── external-links.js     # External link handler
    ├── navigation.js         # Active navigation highlighting
    ├── performance.js        # Performance monitoring
    ├── reading-progress.js   # Reading progress bar
    ├── search.js             # Search functionality
    ├── smooth-scroll.js      # Smooth scrolling
    ├── table-of-contents.js  # TOC generation
    └── utils.js              # Shared utilities
```

## Why ES6 Modules?

### Benefits

1. **Better Maintainability**
   - Each module has a single, well-defined purpose
   - Easier to understand and modify individual features
   - Clear dependencies between modules

2. **Improved Performance**
   - Automatic tree-shaking removes unused code
   - Parallel loading of modules
   - Better browser caching granularity
   - Easier code splitting

3. **Enhanced Security**
   - No inline event handlers (CSP compliant)
   - Isolated scope prevents global namespace pollution
   - Explicit imports/exports make data flow clear

4. **Developer Experience**
   - Modern JavaScript features (async/await, arrow functions, etc.)
   - Better IDE support with intellisense
   - Easier unit testing
   - Clearer code organization

## Module Descriptions

### main.js

**Purpose**: Application entry point and initialization orchestrator

**Responsibilities**:

- Import all feature modules
- Initialize error handling first
- Coordinate module initialization on DOMContentLoaded
- Maintain initialization order

**Key Code**:

```javascript
import { initDarkMode } from './modules/dark-mode.js';
import { initSearch } from './modules/search.js';
// ... other imports

initErrorHandling();

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initSearch();
  // ... other initializations
});
```

### animations.js

**Purpose**: Handle all page load and scroll animations

**Features**:

- Hero section animations
- Post hero animations with staggered timing
- Blog card animations with delays
- Footer fade-in on scroll
- Content element animations using Intersection Observer

**Performance Optimizations**:

- Uses Intersection Observer API for efficient scroll detection
- Applies animations only when elements enter viewport
- Unobserves elements after animation to free resources
- Staggered delays for smooth visual flow

**Example**:

```javascript
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
  }
);
```

### animated-background.js

**Purpose**: Create interactive background effects

**Features**:

- Mouse parallax effect on gradient blobs
- Random color shifting over time
- Smooth transitions between colors

**Performance Considerations**:

- Uses CSS transforms for better performance
- Throttles color changes to every 10 seconds
- Probabilistic color changes (70% chance) to avoid jarring updates

### dark-mode.js

**Purpose**: Manage dark theme application

**Features**:

- Sets dark mode permanently
- Switches syntax highlighting stylesheets
- Manages media queries for stylesheets

**Note**: Currently enforces dark mode. Can be extended to support theme
switching.

### external-links.js

**Purpose**: Enhance external links with security and UX features

**Features**:

- Automatically detects external links
- Adds `target="_blank"` for external sites
- Adds `rel="noopener noreferrer"` for security
- Appends visual indicator (↗) to external links
- Supports i18n for accessibility labels

**Security**:

- `noopener`: Prevents the new page from accessing `window.opener`
- `noreferrer`: Prevents referrer information leakage

### navigation.js

**Purpose**: Highlight active navigation links based on scroll position

**Features**:

- Uses Intersection Observer for efficient scroll detection
- Automatically updates active state as user scrolls
- Configurable thresholds and root margins

**Configuration**:

```javascript
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-80px 0px -70% 0px',
};
```

### performance.js

**Purpose**: Monitor performance and handle errors

**Features**:

- **Performance Monitoring** (dev only):
  - Page load time
  - Connection time
  - Render time
- **Error Handling**:
  - Global error handler
  - Unhandled promise rejection handler
  - Development vs production mode

**Usage**:

```javascript
export function initPerformanceMonitoring() {
  if (isDevelopment()) {
    // Log performance metrics
  }
}

export function initErrorHandling() {
  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleRejection);
}
```

### reading-progress.js

**Purpose**: Display reading progress bar for blog posts

**Features**:

- Calculates scroll percentage through post content
- Smooth progress bar updates
- Shows/hides based on scroll position
- Accounts for viewport height
- Uses requestAnimationFrame for smooth updates

**Performance**:

```javascript
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
```

### search.js

**Purpose**: Implement client-side search functionality

**Features**:

- Integration with Simple Jekyll Search
- Real-time search results
- Debounced input handling (300ms)
- XSS prevention with HTML escaping
- i18n support for all UI text
- Clear button and keyboard shortcuts (Escape)

**Dependencies**:

- Imports `debounce` and `escapeHtml` from utils.js
- Dynamically loads Simple Jekyll Search library
- Reads i18n data from HTML data attributes

### smooth-scroll.js

**Purpose**: Enable smooth scrolling for anchor links

**Features**:

- Handles all anchor links (`href^="#"`)
- Accounts for fixed header offset (80px)
- Prevents default only for valid targets
- Uses native `scrollTo` with `behavior: 'smooth'`

### table-of-contents.js

**Purpose**: Generate and manage table of contents for blog posts

**Features**:

- Automatic TOC generation from H2 and H3 headings
- Generates IDs for headings without them
- Active heading highlighting on scroll
- Smooth scroll to heading on click
- Collapsible TOC with toggle button
- Auto-scrolls TOC to keep active item visible

**Dependencies**:

- Imports `slugify` from utils.js for ID generation

### utils.js

**Purpose**: Provide shared utility functions

**Functions**:

1. **debounce(func, wait)**
   - Rate-limits function calls
   - Perfect for search input, window resize
   - Returns new function that delays execution

2. **throttle(func, limit)**
   - Ensures function runs at most once per time period
   - Good for scroll events
   - Uses timeout flag

3. **slugify(text)**
   - Converts text to URL-friendly slugs
   - Removes special characters
   - Replaces spaces with hyphens
   - Used for heading IDs

4. **escapeHtml(text)**
   - Prevents XSS attacks
   - Escapes: `&`, `<`, `>`, `"`, `'`
   - Essential for user-generated content

## Loading Strategy

### Module Loading

```html
<script
  type="module"
  src="{{ '/js/main.js' | relative_url }}?v={{ site.time | date: '%s' }}"
></script>
```

**Key Points**:

- `type="module"` enables ES6 module support
- No `defer` needed (modules defer automatically)
- Cache busting with `?v={{ site.time }}`
- Modules are loaded in parallel
- Execution waits for DOMContentLoaded

### Browser Support

ES6 modules are natively supported in:

- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

For older browsers, consider:

- Using a bundler (Webpack, Rollup, Vite)
- Adding Babel for transpilation
- Providing a fallback script

## Development Guidelines

### Adding a New Module

1. **Create the module file**:

   ```bash
   touch js/modules/my-feature.js
   ```

2. **Write the module**:

   ```javascript
   // js/modules/my-feature.js

   /**
    * Initialize my feature
    * Description of what this feature does
    */
   export function initMyFeature() {
     // Implementation
   }

   // Private helper functions
   function helperFunction() {
     // Only accessible within this module
   }
   ```

3. **Import in main.js**:

   ```javascript
   import { initMyFeature } from './modules/my-feature.js';

   document.addEventListener('DOMContentLoaded', () => {
     // ... other initializations
     initMyFeature();
   });
   ```

4. **Update documentation**:
   - Add module description to this file
   - Update README.md if it's a user-facing feature

### Module Best Practices

1. **Single Responsibility**
   - Each module should do one thing well
   - If a module grows too large, split it

2. **Explicit Dependencies**
   - Import only what you need
   - Use named imports for clarity
   - List dependencies at the top

3. **Error Handling**
   - Fail gracefully if elements don't exist
   - Check for browser API support
   - Log errors in development mode only

4. **Performance**
   - Use Intersection Observer over scroll events
   - Debounce/throttle frequent events
   - Use requestAnimationFrame for animations
   - Clean up observers when done

5. **Documentation**
   - Add JSDoc comments for public functions
   - Explain non-obvious logic
   - Document configuration options

### Testing Modules

**Unit Testing**:

```javascript
// test/utils.test.js
import { debounce, slugify } from '../js/modules/utils.js';

describe('Utils', () => {
  test('slugify converts text to URL-friendly format', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('debounce delays execution', (done) => {
    let count = 0;
    const fn = debounce(() => count++, 100);

    fn();
    fn();
    fn();

    setTimeout(() => {
      expect(count).toBe(1);
      done();
    }, 150);
  });
});
```

**Integration Testing**:

```javascript
// test/search.test.js
import { initSearch } from '../js/modules/search.js';

describe('Search', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="search-input" />
      <div id="search-results"></div>
    `;
  });

  test('initializes search input', () => {
    initSearch();
    const input = document.getElementById('search-input');
    expect(input).toHaveAttribute('type', 'text');
  });
});
```

## Performance Optimization

### Tree Shaking

ES6 modules enable automatic tree-shaking:

- Only imported functions are included in final bundle
- Unused code is eliminated
- Smaller bundle size

### Code Splitting

Future enhancement: Split by route

```javascript
// Lazy load TOC only on post pages
if (document.querySelector('.post-content')) {
  import('./modules/table-of-contents.js').then((module) =>
    module.initTableOfContents()
  );
}
```

### Caching Strategy

- Modules cache separately
- Updating one module doesn't invalidate others
- Use cache busting for deployment

## Security Considerations

### Content Security Policy (CSP)

The modular architecture supports strict CSP:

```http
Content-Security-Policy: script-src 'self'; object-src 'none';
```

**Features**:

- No inline scripts
- No inline event handlers
- All events registered programmatically
- External scripts from trusted sources only

### XSS Prevention

```javascript
// Always escape user input
import { escapeHtml } from './modules/utils.js';

searchResultsCount.innerHTML = template
  .replace('{count}', resultCount)
  .replace('{query}', escapeHtml(query)); // ✅ Safe
```

### Dependency Security

- Use npm audit for dependency scanning
- Keep Simple Jekyll Search updated
- Review third-party scripts

## Migration from Monolithic Structure

The original `main.js` was 731 lines. Benefits of modularization:

| Metric          | Before    | After      |
| --------------- | --------- | ---------- |
| Main file size  | 731 lines | 36 lines   |
| Number of files | 1         | 12         |
| Largest module  | 731 lines | ~130 lines |
| Test coverage   | Difficult | Easy       |
| CSP compliance  | No        | Yes        |
| Maintainability | Low       | High       |

**Backup**: Original file saved as `main.js.bak`

## Troubleshooting

### Module Not Loading

**Symptom**: Feature doesn't work, no errors in console

**Solutions**:

1. Check browser console for CORS errors
2. Verify file paths in imports
3. Ensure `type="module"` in script tag
4. Check browser supports ES6 modules

### CSP Violations

**Symptom**: "Refused to execute inline script"

**Solutions**:

1. Check for inline event handlers (`onclick`, etc.)
2. Move all event handlers to modules
3. Use `addEventListener` instead of inline handlers

### Performance Issues

**Symptom**: Janky animations, slow scrolling

**Solutions**:

1. Use Intersection Observer instead of scroll events
2. Throttle/debounce frequent events
3. Use `requestAnimationFrame` for animations
4. Minimize DOM queries (cache selectors)

## Future Enhancements

1. **Build Pipeline**
   - Add Vite or Webpack for bundling
   - Minify modules for production
   - Generate source maps

2. **TypeScript**
   - Add type definitions
   - Enable type checking
   - Improve IDE support

3. **Testing**
   - Add unit tests for all modules
   - Set up integration tests
   - Add E2E tests with Playwright

4. **Advanced Features**
   - Service Worker for offline support
   - Module preloading hints
   - Dynamic imports for code splitting

## Resources

- [ES6 Modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript Module Pattern](https://www.patterns.dev/posts/module-pattern/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Contributing

When contributing to the JavaScript codebase:

1. Follow the existing module structure
2. Add JSDoc comments
3. Include tests for new features
4. Update this documentation
5. Ensure CSP compliance
6. Test in supported browsers

---

For implementation details of specific modules, see the inline comments in each
module file.
