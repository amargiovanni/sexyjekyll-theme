# SexyJekyll Theme

<a href="https://jekyll-themes.com/amargiovanni/sexyjekyll-theme">
  <img
    src="https://img.shields.io/badge/featured%20on-JT-red.svg"
    height="20"
    alt="Jekyll Themes Shield"
  />
</a>

A modern, feature-rich Jekyll theme designed for professional blogs and personal
websites. Built with accessibility, performance, and user experience in mind.

![SexyJekyll Theme](assets/screens/1.png)

<div align="center">
  <table>
    <tr>
      <td width="33%"><img src="assets/screens/2.png" alt="Feature 2"/></td>
      <td width="33%"><img src="assets/screens/3.png" alt="Feature 3"/></td>
      <td width="33%"><img src="assets/screens/4.png" alt="Feature 4"/></td>
    </tr>
    <tr>
      <td width="33%"><img src="assets/screens/5.png" alt="Feature 5"/></td>
      <td width="33%"><img src="assets/screens/6.png" alt="Feature 6"/></td>
      <td width="33%"><img src="assets/screens/7.png" alt="Feature 7"/></td>
    </tr>
  </table>
</div>

## Features

### Design & User Experience

- **Modern Design**: Clean, minimalist aesthetic
- **Fully Responsive**: Mobile-first design that works on all devices
- **Reading Progress**: Visual indicator showing article reading progress
- **Print Styles**: Optimized layouts for printing

### Content & Navigation

- **Advanced Search**: Instant client-side search with keyword highlighting
- **Table of Contents**: Automatic TOC generation for blog posts with smooth
  scrolling
- **Related Posts**: Smart post recommendations based on categories and tags
- **Categories**: Category-based filtering and organization
- **Pagination**: Customizable post pagination

### SEO & Social

- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schema for better search engine understanding
- **RSS Feed**: Automatic feed generation
- **Sitemap**: Auto-generated sitemap for search engines

### Accessibility

- **WCAG 2.1 Level AA**: Comprehensive accessibility support
- **Skip to Content**: Keyboard navigation helpers
- **Semantic HTML**: Proper HTML5 landmarks and structure
- **ARIA Labels**: Screen reader friendly
- **Reduced Motion**: Respects user motion preferences
- **High Contrast**: Excellent color contrast ratios

### Performance

- **Responsive Images**: WebP format with multiple sizes
- **Lazy Loading**: Images load as needed
- **Optimized CSS/JS**: Minified and efficient code
- **Modular JavaScript**: ES6 modules for better maintainability and
  tree-shaking
- **Fast Load Times**: Optimized for performance

### Developer Features

- **Syntax Highlighting**: Code blocks with line numbers (Rouge)
- **Reading Time**: Automatic reading time estimation
- **Multi-language**: Full i18n system supporting English, Italian, German,
  French, and Spanish
- **Modular Architecture**: Clean separation of concerns with ES6 modules
- **CSP Compliant**: No inline event handlers for enhanced security
- **Customizable**: Easy configuration via `_config.yml`
- **Well Documented**: Comprehensive documentation included

### AI & LLM Features

- **llms.txt Support**: Automatic generation of AI-friendly content summaries
- **Per-Post llms.txt**: Each blog post generates its own dedicated llms.txt
  file at `/blog/YYYY/MM/DD/post-slug/llms.txt`
- **Site-level llms.txt**: Main llms.txt file at root with site overview and
  content structure
- **Structured Content**: Clean, semantic HTML5 markup optimized for AI crawlers
- **JSON-LD Schema**: Rich structured data for better content understanding
- **AI Crawler Friendly**: Welcoming approach to AI indexing with clear
  instructions

## Installation

### As a Ruby Gem (Recommended)

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "sexyjekyll-theme"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: sexyjekyll-theme
```

Then execute:

```bash
bundle install
```

### Remote Theme (GitHub Pages)

If you're using GitHub Pages, add this to your `_config.yml`:

```yaml
remote_theme: amargiovanni/sexyjekyll-theme
```

### Manual Installation

1. Download or clone this repository
2. Copy the files to your Jekyll site
3. Update your `_config.yml` with the theme settings

## Quick Start

1. **Install the theme** using one of the methods above

2. **Configure** your `_config.yml`:

```yaml
# Site settings
title: Your Name
email: your.email@example.com
description: Your site description
baseurl: ''
url: 'https://yoursite.com'
lang: en # Options: en, it, de, fr, es

# Author information
author:
  name: Your Name
  email: your.email@example.com
  linkedin: https://www.linkedin.com/in/yourprofile/
  bluesky: https://bsky.app/profile/yourhandle

# Navigation logo
nav_logo:
  type: text # 'text' or 'image'
  text: YN # Your initials or text
  # image: /assets/img/logo.png  # Or path to logo image
  # alt: Your Logo

# Hero section
hero:
  name: Your Name
  role: Your Role
  subtitle: Your Company or Tagline
  tagline: Your personal tagline
  description: A brief description about you

# Blog section
blog:
  title: Blog
  description: Your blog description

# Table of Contents
table_of_contents:
  enabled: true # Set to false to disable TOC globally

# Contact section
contact:
  title: Get In Touch
  description: Contact page description
  links:
    - name: Email
      url: mailto:your.email@example.com
      type: email
    - name: LinkedIn
      url: https://www.linkedin.com/in/yourprofile/
      type: linkedin
```

3. **Create your first post** in `_posts/`:

```markdown
---
layout: post
title: 'Your First Post'
subtitle: 'Optional subtitle'
date: 2025-11-01
categories: blog tech
toc: true # Optional: set to false to disable TOC for this post
---

Your post content here...
```

**Note:** The Table of Contents (TOC) is automatically generated from H2, H3,
and H4 headings in your posts. You can:

- Disable TOC globally by setting `table_of_contents.enabled: false` in
  `_config.yml`
- Disable TOC for a specific post by adding `toc: false` to the post's front
  matter

4. **Run Jekyll**:

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site!

## Configuration

### Available Layouts

- `default` - Base layout for all pages
- `home` - Homepage with hero section
- `blog` - Blog listing page
- `post` - Individual blog post
- `about` - About page
- `contact` - Contact page with social links
- `category` - Category-specific post listing
- `404` - Custom 404 error page

### Plugins

The theme uses these Jekyll plugins:

**Standard Plugins:**

- `jekyll-feed` - RSS feed generation
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-paginate` - Post pagination
- `jekyll-sitemap` - Sitemap generation
- `liquid_reading_time` - Reading time estimation
- `jekyll_picture_tag` - Responsive images

**Custom Plugins:**

- `llms_txt_generator` - Automatically generates llms.txt files for each blog
  post and creates AI-friendly content summaries
- `auto_related_posts` - Intelligent post recommendation system based on
  categories, tags, and content similarity using TF-IDF-like algorithm
- `category_generator` - Automatically creates dedicated pages for each category
  with filtered post listings
- `localized_date` - Liquid filter for formatting dates according to the
  selected language (e.g., "15 January 2025" in English, "15 gennaio 2025" in
  Italian)

### Customization

#### Colors and Styles

Edit `css/style.css` to customize colors, fonts, and styles.

#### Social Links

Configure social links in `_config.yml` under `contact.links`. Supported types:

- email, linkedin, bluesky, twitter, github, instagram, facebook
- youtube, mastodon, telegram, whatsapp, medium, reddit
- discord, tiktok, twitch, slack

## Documentation

Detailed documentation is available in the following files:

- [TABLE_OF_CONTENTS.md](docs/TABLE_OF_CONTENTS.md) - Table of Contents
  configuration and customization
- [I18N.md](docs/I18N.md) - Internationalization system and language support
- [ACCESSIBILITY.md](docs/ACCESSIBILITY.md) - Accessibility features and testing
- [SEARCH.md](docs/SEARCH.md) - Search functionality
- [READING_PROGRESS.md](docs/READING_PROGRESS.md) - Reading progress indicator
- [STRUCTURED_DATA.md](docs/STRUCTURED_DATA.md) - SEO structured data
- [SOCIAL_SHARE.md](SOCIAL_SHARE.md) - How to add social sharing (optional)
- [TESTING.md](docs/TESTING.md) - Testing and quality assurance guide
- [COMMENTS.md](docs/COMMENTS.md) - How to add comments (optional)
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [PUBLISHING.md](PUBLISHING.md) - Guide to publish your theme

### Available in Multiple Languages

- 🇬🇧 [README.md](README.md) - English
- 🇮🇹 [README.it.md](README.it.md) - Italian
- 🇩🇪 [README.de.md](README.de.md) - German
- 🇫🇷 [README.fr.md](README.fr.md) - French
- 🇪🇸 [README.es.md](README.es.md) - Spanish

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major
changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:

- Open an issue on
  [GitHub](https://github.com/amargiovanni/sexyjekyll-theme/issues)
- Check the
  [documentation](https://github.com/amargiovanni/sexyjekyll-theme#readme)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Credits

Created by [Andrea Margiovanni](https://margiovanni.it)

## Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Syntax highlighting by [Rouge](https://github.com/rouge-ruby/rouge)
- Icons and design inspiration from modern web design trends

---

If you find this theme useful, please consider giving it a star on GitHub!
