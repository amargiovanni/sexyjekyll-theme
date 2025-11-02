# Table of Contents (TOC)

The SexyJekyll theme includes an automatic Table of Contents feature for blog
posts, making it easy for readers to navigate long articles.

## Overview

The TOC is automatically generated from headings (H2, H3, and H4) in your blog
posts. It includes:

- **Automatic generation**: No manual configuration needed
- **Smooth scrolling**: Clicking a TOC link smoothly scrolls to the section
- **Active section highlighting**: Current section is highlighted as you scroll
- **Collapsible**: Toggle button to show/hide the TOC
- **Responsive**: Adapts to mobile and desktop screens
- **Multilingual**: Translated titles in 5 languages (EN, IT, DE, FR, ES)
- **Accessible**: Full ARIA labels and keyboard navigation support

## How It Works

The TOC:

1. Scans your post content for H2, H3, and H4 headings
2. Automatically generates unique IDs for headings (if they don't have them)
3. Creates a hierarchical list of links
4. Updates the active link as you scroll through the post
5. Hides itself if no headings are found

## Configuration

### Global Configuration

Control the TOC globally in `_config.yml`:

```yaml
# Table of Contents
table_of_contents:
  enabled: true # Set to false to disable TOC for all posts
```

**Default**: `true` (TOC is enabled by default)

### Per-Post Configuration

Disable the TOC for a specific post by adding `toc: false` to the post's front
matter:

```markdown
---
layout: post
title: 'My Post Without TOC'
date: 2025-11-01
toc: false # Disable TOC for this post only
---

Your content here...
```

**Default**: TOC is shown unless explicitly disabled

### Configuration Logic

The TOC is displayed when:

- `site.table_of_contents.enabled != false` (global setting)
- AND `page.toc != false` (post setting)

This means:

- If global setting is `false`, TOC is disabled for all posts
- If global setting is `true` (or not set), you can disable it per-post with
  `toc: false`

## Usage Examples

### Example 1: Enable TOC Globally (Default)

```yaml
# _config.yml
table_of_contents:
  enabled: true
```

All posts will have TOC unless you add `toc: false` to specific posts.

### Example 2: Disable TOC Globally

```yaml
# _config.yml
table_of_contents:
  enabled: false
```

No posts will have TOC (even if they have `toc: true` in front matter).

### Example 3: Selective TOC

```yaml
# _config.yml
table_of_contents:
  enabled: true # Enable by default
```

Then in specific posts:

```markdown
---
layout: post
title: 'Short Post'
toc: false # No TOC for this short post
---
```

```markdown
---
layout: post
title: 'Long Tutorial'
# toc: true is implicit - TOC will be shown
---

## Introduction

## Getting Started

## Advanced Topics
```

## Heading Structure

The TOC recognizes three levels of headings:

- **H2** (`##`): Main sections
- **H3** (`###`): Subsections
- **H4** (`####`): Sub-subsections

**Note**: H1 is reserved for the post title and is not included in the TOC.

### Example Heading Structure

```markdown
---
layout: post
title: 'Complete Guide'
---

## Getting Started

Introduction to the topic...

### Prerequisites

What you need before starting...

### Installation

How to install...

#### macOS

Steps for macOS...

#### Windows

Steps for Windows...

## Advanced Usage

More complex topics...

### Configuration

How to configure...

### Troubleshooting

Common issues...
```

This will generate a TOC like:

```
Table of Contents
├── Getting Started
│   ├── Prerequisites
│   └── Installation
│       ├── macOS
│       └── Windows
├── Advanced Usage
    ├── Configuration
    └── Troubleshooting
```

## Features

### 1. Automatic ID Generation

Headings without IDs automatically get them:

```markdown
## My Section Title
```

Becomes:

```html
<h2 id="my-section-title">My Section Title</h2>
```

### 2. Smooth Scrolling

Clicking a TOC link smoothly scrolls to the section with a small offset to
account for the header.

### 3. Active Section Highlighting

As you scroll through the post, the current section is highlighted in the TOC
with:

- Different color (pink accent)
- Bold font weight
- Colored left border

### 4. Toggle Functionality

Click the arrow button in the TOC header to collapse/expand the list.

### 5. Responsive Design

- **Desktop**: Full TOC with all features
- **Mobile**: Compact design with smaller fonts and spacing

## Styling

The TOC uses the theme's color scheme:

- **Background**: Glassmorphism effect with blur
- **Border**: Accent purple color
- **Links**: Secondary text color
- **Active link**: Primary text with pink accent
- **Hover**: Purple accent with transform effect

### CSS Classes

Main classes used:

- `.table-of-contents`: Main container
- `.toc-header`: Header with title and toggle
- `.toc-title`: "Table of Contents" title
- `.toc-toggle`: Toggle button
- `.toc-list`: Navigation list
- `.toc-items`: UL list of links
- `.toc-item`: Individual list item
- `.toc-link`: Heading link
- `.toc-level-2`, `.toc-level-3`, `.toc-level-4`: Heading level classes

## Customization

### Custom Styling

Override the default styles in your custom CSS:

```css
/* Change TOC background */
.table-of-contents {
  background: rgba(0, 0, 0, 0.1);
}

/* Change active link color */
.toc-link.active {
  color: #your-color;
  border-left-color: #your-color;
}

/* Change heading level colors */
.toc-item.toc-level-3 .toc-link.active {
  border-left-color: #your-color;
}
```

### Custom Translations

Edit translations in `_data/i18n.yml`:

```yaml
en:
  toc:
    title: 'Table of Contents'
    label: 'Table of Contents'
    toggle: 'Toggle table of contents'

it:
  toc:
    title: 'Indice dei Contenuti'
    label: 'Indice dei Contenuti'
    toggle: 'Mostra/nascondi indice dei contenuti'
```

## Accessibility

The TOC is fully accessible:

- **ARIA labels**: All interactive elements have proper labels
- **Semantic HTML**: Uses `<nav>` and proper heading hierarchy
- **Keyboard navigation**: Full keyboard support
- **Screen readers**: Announces TOC and current section
- **Focus indicators**: Visible focus states for keyboard users

### ARIA Attributes

- `aria-label`: Describes the TOC region
- `aria-expanded`: Indicates toggle state
- `aria-controls`: Links toggle to the list
- `role="navigation"`: Semantic navigation role

## Performance

The TOC is optimized for performance:

- **Lazy initialization**: Only runs after DOM is loaded
- **Throttled scroll**: Uses `requestAnimationFrame` for smooth updates
- **Efficient selectors**: Caches DOM queries
- **Conditional rendering**: Only renders if headings exist

## Browser Support

The TOC works in all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### TOC is Empty

**Cause**: No H2, H3, or H4 headings in your post.

**Solution**: Add section headings to your content.

### TOC Not Showing

**Possible causes**:

1. TOC is disabled in `_config.yml`
2. Post has `toc: false` in front matter
3. No headings in the post

**Solution**: Check configuration and add headings.

### Links Not Working

**Cause**: JavaScript not loaded or errors.

**Solution**: Check browser console for errors.

### Active Section Not Highlighting

**Cause**: Scroll listener not working.

**Solution**: Ensure JavaScript is enabled and post content has class
`.post-content`.

## Best Practices

### 1. Use Semantic Headings

Use headings in order (don't skip levels):

✅ **Good**:

```markdown
## Section 1

### Subsection 1.1

### Subsection 1.2

## Section 2
```

❌ **Bad**:

```markdown
## Section 1

#### Subsection (skipped H3)
```

### 2. Keep Headings Concise

Short, descriptive headings work best in the TOC:

✅ **Good**: `## Installation`

❌ **Too long**: `## How to Install This Amazing Tool on Your Computer`

### 3. Use Meaningful Titles

Make headings descriptive:

✅ **Good**: `## Configuration Options`

❌ **Vague**: `## Settings`

### 4. Consider Post Length

- **Short posts** (< 500 words): Consider disabling TOC with `toc: false`
- **Medium posts** (500-1500 words): TOC is helpful
- **Long posts** (> 1500 words): TOC is highly recommended

### 5. Test on Mobile

Always check how your TOC looks on mobile devices.

## Examples

### Minimal Post with TOC

```markdown
---
layout: post
title: 'Quick Guide'
---

## Introduction

Brief intro...

## Main Content

The main part...

## Conclusion

Final thoughts...
```

### Complex Post with TOC

```markdown
---
layout: post
title: 'Complete Tutorial'
toc: true # Explicit enable (optional)
---

## Getting Started

Introduction to the topic.

### What You'll Learn

- Point 1
- Point 2

### Prerequisites

What you need.

## Installation

### macOS

Steps for macOS.

### Linux

Steps for Linux.

### Windows

Steps for Windows.

## Configuration

### Basic Setup

Basic configuration.

### Advanced Options

Advanced settings.

## Troubleshooting

### Common Issues

Known problems.

### Solutions

How to fix them.

## Conclusion

Summary and next steps.
```

### Post Without TOC

```markdown
---
layout: post
title: 'Short Announcement'
toc: false
---

Quick update about something...
```

## Migration Guide

If you're upgrading from a version without TOC:

1. **No action required**: TOC works automatically
2. **To disable globally**: Add config to `_config.yml`
3. **To disable for specific posts**: Add `toc: false` to front matter

## FAQ

**Q: Can I use H1 headings in the TOC?** A: No, H1 is reserved for the post
title.

**Q: Can I customize the heading levels?** A: Yes, edit
`_includes/table-of-contents.html` to change `h2, h3, h4` selector.

**Q: Does TOC work with custom layouts?** A: Yes, as long as the layout includes
`table-of-contents.html` and content has class `.post-content`.

**Q: Can I style the TOC differently?** A: Yes, override CSS classes in your
custom stylesheet.

**Q: Is the TOC SEO-friendly?** A: Yes, it uses semantic HTML and doesn't affect
SEO.

## Technical Details

### Files Involved

- `_includes/table-of-contents.html`: Main TOC template and JavaScript
- `css/style.css`: TOC styling (lines ~2067-2260)
- `_data/i18n.yml`: Translations
- `_config.yml`: Global configuration

### JavaScript API

The TOC JavaScript creates:

- Heading IDs (if missing)
- Hierarchical link structure
- Scroll event listener (throttled)
- Click event handlers
- Toggle functionality

### Generated HTML Structure

```html
<aside class="table-of-contents" id="toc-container">
  <div class="toc-header">
    <h2 class="toc-title">Table of Contents</h2>
    <button class="toc-toggle">...</button>
  </div>
  <nav class="toc-list">
    <ul class="toc-items">
      <li class="toc-item toc-level-2">
        <a href="#section-1" class="toc-link">Section 1</a>
        <ul class="toc-items">
          <li class="toc-item toc-level-3">
            <a href="#subsection" class="toc-link">Subsection</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</aside>
```

## Support

For issues or questions about the TOC feature:

1. Check this documentation
2. Review the [main README](../README.md)
3. Open an issue on
   [GitHub](https://github.com/amargiovanni/sexyjekyll-theme/issues)

## Credits

The TOC feature is part of the SexyJekyll theme by
[Andrea Margiovanni](https://margiovanni.it).
