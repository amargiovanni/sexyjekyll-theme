# Accessibility Features

This theme is built with accessibility in mind, following WCAG 2.1 Level AA guidelines to ensure the site is usable by everyone, including people with disabilities who use assistive technologies.

## Implemented Features

### 1. Skip to Main Content Link

**Location**: [_includes/nav.html](_includes/nav.html#L1)

A "Skip to main content" link is the first interactive element on every page, allowing keyboard and screen reader users to bypass navigation and jump directly to the main content.

**How it works:**
- Hidden visually but accessible to screen readers and keyboard users
- Becomes visible when focused (Tab key)
- Links to `#main-content` anchor on each page
- Styled with high contrast for visibility

**CSS Styling**: [css/style.css](css/style.css)

### 2. Semantic HTML5 Structure

All layouts use proper HTML5 semantic elements:

**Main Content Areas:**
- Homepage: [_layouts/home.html](_layouts/home.html)
- Blog listing: [_layouts/blog.html](_layouts/blog.html)
- Blog posts: [_layouts/post.html](_layouts/post.html#L35) - `<main id="main-content">`
- Contact page: [_layouts/contact.html](_layouts/contact.html)
- Category pages: [_layouts/category.html](_layouts/category.html)

**Semantic Elements Used:**
- `<main>` - Main content area with `id="main-content"`
- `<nav>` - Navigation with proper ARIA labels
- `<article>` - Blog posts and post cards
- `<aside>` - Related posts section
- `<header>` - Post headers
- `<footer>` - Post footers and page footer
- `<time>` - Dates with `datetime` attributes

### 3. ARIA Labels and Attributes

**Navigation** ([_includes/nav.html](_includes/nav.html#L3)):
```html
<nav class="nav" role="navigation" aria-label="Main navigation">
```

**Logo Link** ([_includes/nav.html](_includes/nav.html#L5)):
```html
<a href="/" class="nav-logo" aria-label="{{ site.author.name }} - Home">
```

**Current Page Indicator** ([_includes/nav.html](_includes/nav.html#L15-L17)):
Navigation links include `aria-current="page"` when active:
```html
{% if page.url == '/' %}aria-current="page"{% endif %}
```

**External Links** ([js/main.js](js/main.js#L548-L580)):
External links automatically get:
- `target="_blank"`
- `rel="noopener noreferrer"`
- Visual indicator (↗)
- `aria-label` for screen readers

### 4. Reduced Motion Support

**CSS**: [css/style.css](css/style.css)

The theme respects the `prefers-reduced-motion` user preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

All animations and transitions are disabled for users who prefer reduced motion.

### 5. Keyboard Navigation

**Focus Management:**
- All interactive elements are keyboard accessible
- Clear focus indicators on all links and buttons
- Tab order follows logical content flow
- Skip link appears first in tab order

**Smooth Scrolling** ([js/main.js](js/main.js#L41-L65)):
- Smooth scroll for anchor links
- Respects `prefers-reduced-motion`
- Accounts for fixed header offset

### 6. Color Contrast

The theme uses high contrast colors that meet WCAG AA standards:
- Text on backgrounds: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1 contrast ratio
- Focus indicators: clearly visible
- Links: distinguishable from regular text

### 7. Responsive Images

Images use:
- Proper `alt` attributes
- Lazy loading with `loading="lazy"`
- Responsive sizes with `srcset`
- WebP format with fallbacks

### 8. Form Accessibility

Contact forms (when implemented) follow best practices:
- Proper `<label>` associations
- Required field indicators
- Error messages linked to inputs
- Clear focus states

## Testing Accessibility

### Keyboard Navigation Test

1. Open the site in a browser
2. Press **Tab** to start keyboard navigation
3. First Tab should show "Skip to main content"
4. Press **Enter** on skip link to jump to content
5. Continue tabbing through all interactive elements
6. Verify all elements are reachable and visible when focused

### Screen Reader Testing

**macOS (VoiceOver):**
```bash
# Enable VoiceOver
Cmd + F5

# Navigate
VO + Right Arrow - Next item
VO + Left Arrow - Previous item
VO + Space - Activate element
```

**Windows (NVDA - Free):**
1. Download from https://www.nvaccess.org/
2. Navigate with Arrow keys and Tab
3. Verify proper announcements of:
   - Page landmarks (navigation, main, etc.)
   - Headings hierarchy
   - Link text and destinations
   - Image alt text

**Chrome (ChromeVox Extension):**
1. Install ChromeVox extension
2. Test on the site
3. Verify proper navigation and announcements

### Automated Testing

**Browser DevTools:**

**Lighthouse (Chrome):**
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Accessibility"
4. Click "Generate report"
5. Review accessibility score and issues

**Online Tools:**
- [WAVE Web Accessibility Tool](https://wave.webaim.org/)
- [aXe DevTools](https://www.deque.com/axe/devtools/)
- [Accessibility Insights](https://accessibilityinsights.io/)

**Command Line:**
```bash
# Install pa11y
npm install -g pa11y

# Test a page
pa11y http://localhost:4000

# Test multiple pages
pa11y-ci --config .pa11yci.json
```

## Accessibility Checklist

### ✅ Currently Implemented

- [x] Skip to main content link
- [x] Semantic HTML5 structure
- [x] ARIA labels and landmarks
- [x] `aria-current` for active navigation
- [x] Reduced motion support
- [x] Keyboard navigation support
- [x] High contrast focus indicators
- [x] External link indicators
- [x] Proper heading hierarchy
- [x] Time elements with datetime attributes
- [x] Meaningful link text
- [x] Responsive images with alt text
- [x] Color contrast compliance

### 🔄 Recommendations for Content Authors

When adding content, ensure:

1. **Images**: Always include descriptive `alt` text
   ```markdown
   ![Descriptive alt text](image.jpg)
   ```

2. **Headings**: Use proper hierarchy (H1 → H2 → H3)
   - Only one H1 per page (post title)
   - Don't skip heading levels

3. **Links**: Use descriptive link text
   ```markdown
   <!-- Good -->
   Read the [accessibility guidelines](link)

   <!-- Avoid -->
   Click [here](link) for guidelines
   ```

4. **Tables**: Include headers
   ```markdown
   | Header 1 | Header 2 |
   |----------|----------|
   | Data 1   | Data 2   |
   ```

5. **Code Blocks**: Specify language for syntax highlighting
   ````markdown
   ```javascript
   const example = "code";
   ```
   ````

## WCAG 2.1 Level AA Compliance

This theme aims to meet WCAG 2.1 Level AA standards across four principles:

### 1. Perceivable
- Information presented in ways users can perceive
- Text alternatives for non-text content
- Content presented in different ways
- Sufficient color contrast

### 2. Operable
- All functionality available from keyboard
- Enough time to read and use content
- No content causing seizures
- Navigation assistance available

### 3. Understandable
- Readable and understandable text
- Predictable web page behavior
- Help users avoid and correct mistakes

### 4. Robust
- Compatible with current and future assistive technologies
- Valid, semantic HTML
- Proper ARIA usage

## Resources

### Guidelines & Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools
- [WAVE](https://wave.webaim.org/)
- [aXe DevTools](https://www.deque.com/axe/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [pa11y](https://pa11y.org/)

### Color Contrast
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Learning Resources
- [WebAIM Articles](https://webaim.org/articles/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11ycasts (YouTube)](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

## Reporting Accessibility Issues

If you encounter accessibility barriers:

1. **Open an Issue**: [GitHub Issues](https://github.com/amargiovanni/sexyjekyll-theme/issues)
2. **Include Details**:
   - What barrier did you encounter?
   - Which assistive technology were you using?
   - Which page/URL?
   - Expected vs actual behavior

Your feedback helps make this theme more accessible for everyone!
