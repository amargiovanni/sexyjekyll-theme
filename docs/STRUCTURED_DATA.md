# Structured Data (JSON-LD) Implementation

## Overview

This site now includes Schema.org structured data in JSON-LD format to improve
SEO and help search engines better understand your content.

## Implemented Schemas

### 1. Person Schema (Homepage & Profile Pages)

**File**: `_includes/structured-data-person.html`

Describes you as a person with:

- Name, job title, employer
- Profile image
- Contact information
- Social media profiles (LinkedIn, Bluesky)
- Areas of expertise (knowsAbout)

### 2. WebSite Schema (All Pages)

**File**: `_includes/structured-data-person.html`

Describes the website itself:

- Site name and URL
- Description
- Publisher information
- Search action capability
- Language (it-IT)

### 3. ProfilePage Schema (Homepage Only)

**File**: `_includes/structured-data-person.html`

Marks the homepage as a profile page for better personal branding.

### 4. BlogPosting Schema (Blog Posts)

**File**: `_includes/structured-data-article.html`

For each blog post, includes:

- Headline and alternative headline (subtitle)
- Description/excerpt
- Featured image
- Publication and modification dates
- Author information with social profiles
- Publisher information
- Article section (category)
- Keywords
- Language
- Part of blog structure

## How It Works

The structured data is automatically included in every page via
`_includes/head.html`:

```html
<!-- Structured Data (JSON-LD) -->
{% include structured-data-person.html %} {% include
structured-data-article.html %}
```

- `structured-data-person.html` renders on non-post pages
- `structured-data-article.html` renders only on blog posts
- Both use conditional logic to avoid duplication

## Testing Your Structured Data

### Google Rich Results Test

1. Visit: https://search.google.com/test/rich-results
2. Enter your page URL
3. Check for validation errors

### Schema Markup Validator

1. Visit: https://validator.schema.org/
2. Paste your page URL
3. Review the structured data graph

### Google Search Console

Monitor how Google processes your structured data:

1. Go to Search Console > Enhancements
2. Check for any issues or warnings

## Customization

### Update Personal Information

Edit values in `_config.yml`:

```yaml
author:
  name: Your Name
  email: your@email.com
  linkedin: https://linkedin.com/in/yourprofile
  bluesky: https://bsky.app/profile/yourprofile
```

### Update Organization

In `structured-data-person.html`, modify:

```json
"worksFor": {
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yourcompany.com"
}
```

### Update Knowledge Areas

In `structured-data-person.html`, edit the `knowsAbout` array:

```json
"knowsAbout": [
  "Your Skill 1",
  "Your Skill 2",
  ...
]
```

### Add Education

Uncomment and update the `alumniOf` field in `structured-data-person.html`:

```json
"alumniOf": {
  "@type": "Organization",
  "name": "Your University"
}
```

## SEO Benefits

1. **Rich Snippets**: Your content may appear with enhanced information in
   search results
2. **Knowledge Graph**: Better chance of appearing in Google's Knowledge Graph
3. **Social Sharing**: Improved appearance when shared on social platforms
4. **Voice Search**: Better optimization for voice assistants
5. **Search Intent**: Helps search engines understand your content's context

## Best Practices

1. **Keep Data Accurate**: Ensure structured data matches visible page content
2. **Update Images**: Make sure referenced images exist (profile.jpg, logo.png,
   default-post.jpg)
3. **Validate Regularly**: Check structured data when making content changes
4. **Monitor Performance**: Use Search Console to track rich results impressions
5. **Add Missing Images**: Create the referenced logo and default post image if
   they don't exist

## TODO

- [ ] Add actual profile.jpg image (400x400px)
- [ ] Add logo.png (600x600px) for publisher
- [ ] Add default-post.jpg (1200x630px) for posts without featured images
- [ ] Consider adding BreadcrumbList schema for navigation
- [ ] Consider adding FAQPage schema if you add an FAQ section
- [ ] Add actual university name if you want to include education

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Playground](https://json-ld.org/playground/)
