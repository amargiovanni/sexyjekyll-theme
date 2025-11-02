# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [SexyJekyll Theme]

## [1.3.0] - 2025-11-02

### Added

- **Comprehensive Testing Infrastructure**: Complete test suite for JavaScript and Ruby
  - Jest testing framework for JavaScript with ES6 module support
  - 4 test suites with 38 passing tests
  - Code coverage tracking with 70% minimum threshold (branches, functions, lines, statements)
  - RSpec testing framework for Ruby/Jekyll plugins
  - Test files: `utils.test.js`, `dark-mode.test.js`, `smooth-scroll.test.js`, `external-links.test.js`
  - Test setup with DOM API mocks (IntersectionObserver, matchMedia, scrollTo, requestAnimationFrame)
  - Coverage reports with HTML output (`coverage/lcov-report/index.html`)
- **Code Quality Tools**: Complete linting and formatting infrastructure
  - ESLint configuration for JavaScript with strict quality rules
  - StyleLint configuration for CSS with alphabetical property ordering
  - RuboCop configuration for Ruby code quality
  - Prettier code formatter for consistent code style
  - Pre-configured npm scripts: `npm run validate`, `npm run lint`, `npm run format`
- **CI/CD Pipeline**: GitHub Actions workflow for automated testing
  - Automated linting on every push and pull request
  - JavaScript and Ruby test execution
  - Jekyll build verification
  - Multi-job pipeline: Lint → Test → Build
  - Configuration file: `.github/workflows/ci.yml`
- **Testing Documentation**: Comprehensive testing guides
  - Full testing guide in `docs/TESTING.md` (600+ lines)
  - Quick reference guide in `TESTING_README.md`
  - Coverage reports and troubleshooting information
  - Best practices for writing tests

### Changed

- **JavaScript Architecture**: Refactored monolithic code into ES6 modules
  - Split 731-line `main.js` into 11 focused modules
  - New modular structure in `js/modules/` directory
  - Modules: `utils.js`, `dark-mode.js`, `smooth-scroll.js`, `navigation.js`, `animated-background.js`, `search.js`, `reading-progress.js`, `table-of-contents.js`, `external-links.js`, `animations.js`, `performance.js`
  - Main.js reduced to 36 lines (import orchestration only)
  - ES6 module loading with `type="module"` in script tags
  - Automatic tree-shaking for unused code elimination
  - Better code organization and maintainability
- **Content Security Policy**: Removed all inline event handlers
  - No inline JavaScript in HTML templates
  - Full CSP compliance for enhanced security
  - Event handlers moved to dedicated modules
- **Documentation Structure**: Updated all README files
  - Added JavaScript architecture feature to all 5 language READMEs
  - Added CSP compliance feature documentation
  - Added links to `JAVASCRIPT_ARCHITECTURE.md` and `TESTING.md`
  - Updated feature lists with testing and quality assurance

### Fixed

- **ESLint Issues**: Resolved linting errors across JavaScript codebase
  - Removed unused variables in `animated-background.js`
  - Fixed unnecessary escape characters in regex patterns
  - Added ignore patterns for minified vendor files
  - All JavaScript files now pass ESLint validation
- **StyleLint Configuration**: Relaxed overly strict CSS rules
  - Allowed intentional `!important` declarations for specificity
  - Allowed vendor prefix duplicate properties
  - Removed pattern restrictions on keyframe and selector names
  - All CSS files now pass StyleLint validation
- **Code Formatting**: Applied consistent formatting across entire codebase
  - Prettier formatting applied to all JavaScript, CSS, and Markdown files
  - Print width: 100 characters, 2-space indentation
  - Single quotes, ES5 trailing commas, LF line endings

### Performance

- **Module Loading**: Optimized JavaScript loading strategy
  - Native ES6 module support (no bundler required)
  - Automatic code splitting per module
  - Browser-native module caching
  - Reduced initial payload with on-demand loading

### Developer Experience

- **npm Scripts**: Comprehensive development workflow
  - `npm test`: Run Jest tests
  - `npm run test:watch`: Watch mode for development
  - `npm run test:coverage`: Generate coverage reports
  - `npm run lint`: Run all linters (JS + CSS)
  - `npm run lint:fix`: Auto-fix linting issues
  - `npm run format`: Format all files with Prettier
  - `npm run validate`: Run all quality checks (lint + test + format check)
- **Documentation**: Enhanced developer documentation
  - JavaScript architecture guide in `docs/JAVASCRIPT_ARCHITECTURE.md` (600+ lines)
  - Module descriptions, benefits, loading strategies
  - Development guidelines and best practices
  - Testing examples and troubleshooting

## [1.2.0] - 2025-11-02

### Fixed

- **Critical i18n Bug**: Fixed hardcoded language attribute in HTML
  - Changed `<html lang="it">` to dynamic
    `<html lang="{{ site.lang | default: 'en' }}">` in `_layouts/default.html`
  - Site now correctly reflects configured language in HTML metadata
  - Improves SEO and accessibility for multi-language sites
- **JavaScript Internationalization**: Removed hardcoded Italian text from
  JavaScript
  - Search results messages now use i18n system via data attributes
  - "Read more" links now localized in search results
  - "No results" messages properly translated
  - External link labels now respect site language
  - Added translations for all 5 supported languages (EN, IT, DE, FR, ES)
- **Console Logging in Production**: Removed debug output from production builds
  - Performance monitoring now only logs on localhost/127.0.0.1
  - Error logging restricted to development environment
  - Cleaner console output for end users
  - Production-ready error handling infrastructure in place
- **HTML Attribute Escaping**: Fixed data attribute escaping issue
  - Changed from double quotes to single quotes for attributes containing HTML
  - Prevents rendering of attribute content as visible text
  - Resolves markup validation issues

### Security

- **HTTP Security Headers**: Added comprehensive security headers in `_headers`
  file
  - `Content-Security-Policy`: Protection against XSS attacks
  - `Strict-Transport-Security`: HTTPS enforcement with preload directive
  - `Permissions-Policy`: Restricts browser features (geolocation, camera,
    microphone, etc.)
  - Enhanced existing headers (X-Content-Type-Options, X-Frame-Options,
    Referrer-Policy)
  - Compliant with OWASP security best practices

### Changed

- **Inline Event Handlers Removed**: Replaced with CSS hover states
  - Removed `onmouseover`/`onmouseout` inline handlers from footer Jekyll logo
  - Added `.footer-jekyll-link` and `.footer-jekyll-logo` CSS classes
  - Now compatible with strict Content Security Policy
  - Better separation of concerns (HTML/CSS)

### Performance

- **HTTP Caching Headers**: Optimized cache strategy
  - CSS/JS/Assets: 1 year cache with `immutable` directive
  - HTML: No-cache with `must-revalidate` for fresh content
  - Reduces bandwidth usage and improves load times
  - Better CDN compatibility

### Added

- **Search i18n Translations**: Extended translation system for search
  functionality
  - `blog.no_results`: "No results found" message
  - `blog.no_results_help`: Helper text when no results
  - `blog.search_results_singular`: Template for single result
  - `blog.search_results_plural`: Template for multiple results
  - `blog.external_link_label`: ARIA label for external links
  - All translations available in EN, IT, DE, FR, ES

## [1.1.0] - 2025-11-02

### Changed

- **Demo Content**: Replaced personal information with generic placeholder data
  - Site title and author changed to "John Doe"
  - Email addresses changed to `hello@example.com`
  - Social media links updated to generic placeholder URLs
  - Navigation logo switched from image to text initials (JD)
  - Hero section content replaced with neutral demo text
  - All configuration ready for theme distribution
- **Date Formatting**: Enhanced English date format
  - English dates now use "Month Day, Year" format (e.g., "October 31, 2025")
  - Other languages continue to use "Day Month Year" format (e.g., "31 ottobre
    2025")
  - Updated `localized_date` plugin with language-specific formatting logic

### Fixed

- Date format consistency across different localizations
- Language setting now properly reflects English as default

## [1.0.1] - 2025-11-01

### Changed

- **Internationalization System**: Complete i18n system for all UI elements,
  labels, and text strings
  - Created centralized translation system in `_data/i18n.yml`
  - Support for 5 languages: English, Italian, German, French, Spanish
  - All templates updated to use translation keys (nav, footer, blog, post,
    categories, home, related posts, SEO, llms.txt)
  - 52 translated strings across 9 logical sections
  - Comprehensive documentation in `docs/I18N.md`
- **Date Localization**: Enhanced date formatting plugin
  - Renamed `italian_date` plugin to `localized_date`
  - Plugin file renamed from `italian_date.rb` to `localized_date.rb`
  - Added automatic date localization based on site language setting
  - Month names now display in the selected language for all 5 supported
    languages
  - Backward compatibility maintained with deprecated `italian_date` filter
  - All templates updated to use `localized_date` filter
- **Documentation Organization**: Moved technical documentation to `docs/`
  folder
  - Moved ACCESSIBILITY.md, SEARCH.md, READING_PROGRESS.md, STRUCTURED_DATA.md,
    COMMENTS.md to docs/
  - Created `docs/README.md` as documentation index
  - Updated all 5 README files with correct documentation links
  - Better organization for maintainability and discoverability
- **Dynamic Configuration**: Made robots.txt dynamic
  - Converted to Liquid template with dynamic `{{ site.url }}` variables
  - Sitemap URLs now automatically reflect site configuration

### Added

- Multi-language README files (English, Italian, German, French, Spanish)
- Complete i18n support for llms.txt files (all metadata labels localized)
- `.gitignore` file with comprehensive exclusion rules for Jekyll projects
- Multi-language documentation system

### Fixed

- Hardcoded Italian text in UI elements now properly localized
- Hardcoded URLs in robots.txt now dynamic
- Date formatting now respects site language setting
- All UI elements now use centralized translation system

## [1.0.0] - 2025-11-01

### Added

- Initial release of SexyJekyll Theme
- Modern, responsive design with clean minimalist aesthetic
- Advanced search functionality with instant results
- Reading progress indicator for blog posts
- Related posts system based on categories, tags, and content similarity (TF-IDF
  algorithm)
- Comprehensive accessibility features (WCAG 2.1 Level AA)
- SEO optimization with structured data (JSON-LD)
- AI-friendly llms.txt generation for each blog post
- Site-level llms.txt with content overview
- Multi-language support (Italian and English)
- Contact page with social media links
- Category-based post filtering with auto-generated category pages
- Responsive navigation with mobile support
- Code syntax highlighting with line numbers
- RSS feed support
- Sitemap generation
- Reading time estimation
- Responsive images with WebP support
- Custom 404 page
- Print-friendly styles
- Multi-language date formatting filter (English, Italian, German, French,
  Spanish)

### Features

- **Layouts**: default, home, blog, post, about, contact, category, llms, 404
- **Standard Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-paginate,
  jekyll-sitemap, liquid_reading_time, jekyll_picture_tag
- **Custom Plugins**: llms_txt_generator, auto_related_posts,
  category_generator, localized_date (multi-language date formatting)
- **Accessibility**: Skip to content link, semantic HTML, ARIA labels, reduced
  motion support
- **Performance**: Lazy loading images, optimized CSS/JS, WebP image format
- **SEO**: Meta tags, Open Graph, Twitter Cards, structured data, canonical URLs
- **AI-Friendly**: llms.txt generation for posts and site, clean semantic markup
  for AI crawlers

[1.3.0]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.3.0
[1.2.0]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.2.0
[1.1.0]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.1.0
[1.0.1]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.0.1
[1.0.0]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.0.0
