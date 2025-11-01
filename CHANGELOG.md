# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [SexyJekyll Theme]

## [1.0.1] - 2025-11-01

### Changed
- **Internationalization System**: Complete i18n system for all UI elements, labels, and text strings
  - Created centralized translation system in `_data/i18n.yml`
  - Support for 5 languages: English, Italian, German, French, Spanish
  - All templates updated to use translation keys (nav, footer, blog, post, categories, home, related posts, SEO, llms.txt)
  - 52 translated strings across 9 logical sections
  - Comprehensive documentation in `docs/I18N.md`
- **Date Localization**: Enhanced date formatting plugin
  - Renamed `italian_date` plugin to `localized_date`
  - Plugin file renamed from `italian_date.rb` to `localized_date.rb`
  - Added automatic date localization based on site language setting
  - Month names now display in the selected language for all 5 supported languages
  - Backward compatibility maintained with deprecated `italian_date` filter
  - All templates updated to use `localized_date` filter
- **Documentation Organization**: Moved technical documentation to `docs/` folder
  - Moved ACCESSIBILITY.md, SEARCH.md, READING_PROGRESS.md, STRUCTURED_DATA.md, COMMENTS.md to docs/
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
- Related posts system based on categories, tags, and content similarity (TF-IDF algorithm)
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
- Multi-language date formatting filter (English, Italian, German, French, Spanish)

### Features
- **Layouts**: default, home, blog, post, about, contact, category, llms, 404
- **Standard Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-paginate, jekyll-sitemap, liquid_reading_time, jekyll_picture_tag
- **Custom Plugins**: llms_txt_generator, auto_related_posts, category_generator, localized_date (multi-language date formatting)
- **Accessibility**: Skip to content link, semantic HTML, ARIA labels, reduced motion support
- **Performance**: Lazy loading images, optimized CSS/JS, WebP image format
- **SEO**: Meta tags, Open Graph, Twitter Cards, structured data, canonical URLs
- **AI-Friendly**: llms.txt generation for posts and site, clean semantic markup for AI crawlers

[1.0.1]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.0.1
[1.0.0]: https://github.com/amargiovanni/sexyjekyll-theme/releases/tag/v1.0.0
