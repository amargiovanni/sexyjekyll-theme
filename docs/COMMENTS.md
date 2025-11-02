# Comments System

## Status: Not Currently Implemented

This theme does not include a built-in comments system. However, there are
several excellent options you can integrate.

## Why Not Included?

- **Flexibility**: Different users prefer different comment systems
- **Privacy**: Some solutions require third-party services
- **Simplicity**: Keeps the theme lightweight and unopinionated

## Recommended Solutions

### 1. Utterances (Recommended)

**GitHub-based comments - Free & Open Source**

**Pros**:

- No ads, no tracking
- GitHub authentication
- Markdown support
- Comments stored as GitHub Issues
- Privacy-friendly

**Setup**:

1. Install the [Utterances GitHub App](https://github.com/apps/utterances)

2. Create `_includes/comments.html`:

```html
<div class="comments-section">
  <h2>Comments</h2>
  <script
    src="https://utteranc.es/client.js"
    repo="YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"
    issue-term="pathname"
    theme="preferred-color-scheme"
    crossorigin="anonymous"
    async
  ></script>
</div>
```

3. Include in `_layouts/post.html`:

```liquid
{% raw %}{% include comments.html %}{% endraw %}
```

**More info**: https://utteranc.es/

### 2. Giscus

**GitHub Discussions-based - Free & Open Source**

Similar to Utterances but uses GitHub Discussions instead of Issues.

**Pros**:

- Reactions (👍, ❤️, etc.)
- Reply threading
- More features than Utterances
- Privacy-friendly

**Setup**: https://giscus.app/

### 3. Disqus

**Full-featured comment platform - Free (with ads) or Paid**

**Pros**:

- Easy setup
- Spam protection
- Moderation tools
- Social login

**Cons**:

- Includes tracking
- Shows ads (free tier)
- Privacy concerns

**Setup**: https://disqus.com/

### 4. Commento

**Privacy-focused - Self-hosted or Paid**

**Pros**:

- No tracking
- No ads
- Lightweight
- Privacy-friendly

**Cons**:

- Requires self-hosting or paid plan

**Setup**: https://commento.io/

### 5. Staticman

**Static comments in your repository - Free & Open Source**

**Pros**:

- Comments stored as files in your repo
- No external dependencies
- Full control

**Cons**:

- Requires server or GitHub Actions
- More complex setup

**Setup**: https://staticman.net/

## Quick Comparison

| Solution   | Cost      | Privacy    | Ease   | Markdown |
| ---------- | --------- | ---------- | ------ | -------- |
| Utterances | Free      | ⭐⭐⭐⭐⭐ | Easy   | ✅       |
| Giscus     | Free      | ⭐⭐⭐⭐⭐ | Easy   | ✅       |
| Disqus     | Free/Paid | ⭐⭐       | Easy   | ❌       |
| Commento   | Paid/Self | ⭐⭐⭐⭐⭐ | Medium | ✅       |
| Staticman  | Free      | ⭐⭐⭐⭐⭐ | Hard   | ✅       |

## Our Recommendation

For most users, we recommend **Utterances** or **Giscus**:

- Free and open source
- No tracking or ads
- Privacy-friendly
- Easy to set up
- Markdown support
- GitHub authentication (your audience likely has GitHub)

## Disabling Comments on Specific Posts

If you implement a comment system, you can disable it per-post:

1. Modify `_layouts/post.html`:

```liquid
{% raw %}{% unless page.comments == false %}
  {% include comments.html %}
{% endunless %}{% endraw %}
```

2. In post front matter:

```yaml
---
title: My Post
comments: false
---
```

## Resources

- [Utterances](https://utteranc.es/)
- [Giscus](https://giscus.app/)
- [Staticman](https://staticman.net/)
- [Comment System Comparison](https://css-tricks.com/comparing-methods-for-adding-comments-to-a-static-site/)

## Support

Choose the comment system that best fits your needs and audience. All options
listed here work well with Jekyll static sites.
