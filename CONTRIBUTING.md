# Contributing to SexyJekyll Theme

First off, thank you for considering contributing to SexyJekyll Theme! It's
people like you that make this theme better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
  - [Git Commit Messages](#git-commit-messages)
  - [CSS Style Guide](#css-style-guide)
  - [JavaScript Style Guide](#javascript-style-guide)
- [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by our Code of
Conduct. By participating, you are expected to uphold this code. Please report
unacceptable behavior to hello@margiovanni.it.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find
out that you don't need to create one. When you are creating a bug report,
please include as many details as possible:

- **Use a clear and descriptive title** for the issue
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what behavior you expected to see
- **Include screenshots or animated GIFs** if possible
- **Include your environment details**: OS, browser, Jekyll version, etc.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an
enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **Include mockups or examples** if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes using a descriptive commit message
6. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
7. Open a Pull Request

#### Pull Request Guidelines

- Follow the existing code style
- Update documentation if needed
- Add or update tests if applicable
- Ensure all tests pass
- Keep PRs focused on a single feature or fix
- Reference any related issues in your PR description

## Development Setup

### Prerequisites

- Ruby 2.7.0 or higher
- Bundler
- Git

### Setup Steps

1. Clone your fork:

   ```bash
   git clone https://github.com/YOUR-USERNAME/sexyjekyll-theme.git
   cd sexyjekyll-theme
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Run Jekyll locally:

   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

### Testing

Before submitting a pull request:

1. Test the theme with different content
2. Check responsiveness on various screen sizes
3. Test dark mode functionality
4. Verify accessibility features
5. Test on multiple browsers if possible

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` - Improving structure/format of the code
  - ⚡️ `:zap:` - Improving performance
  - 🐛 `:bug:` - Fixing a bug
  - ✨ `:sparkles:` - Introducing new features
  - 📝 `:memo:` - Writing docs
  - 🎨 `:lipstick:` - Updating UI and style files
  - ♿️ `:wheelchair:` - Improving accessibility
  - 🔧 `:wrench:` - Changing configuration files

### CSS Style Guide

- Use meaningful class names
- Follow BEM naming convention where appropriate
- Keep selectors as simple as possible
- Group related properties together
- Use CSS custom properties (variables) for theme values
- Add comments for complex or non-obvious styles
- Maintain mobile-first approach

Example:

```css
/* Good */
.post-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Avoid */
.ph {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
```

### JavaScript Style Guide

- Use modern ES6+ syntax
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Handle errors gracefully
- Avoid global variables

Example:

```javascript
// Good
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  return isDark;
}

// Avoid
function tdm() {
  var d = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', d);
}
```

### Markdown Style Guide

- Use ATX-style headers (`#`)
- Add blank lines around headers
- Use fenced code blocks with language specification
- Keep line length reasonable (80-100 characters when possible)
- Use reference-style links for repeated URLs

## Additional Notes

### Documentation

- Update README.md if you change functionality
- Update relevant documentation files (ACCESSIBILITY.md, SEARCH.md, etc.)
- Add inline code comments for complex logic
- Keep documentation clear and concise

### Accessibility

When contributing, please ensure:

- Maintain WCAG 2.1 Level AA compliance
- Test with keyboard navigation
- Verify screen reader compatibility
- Ensure sufficient color contrast
- Respect reduced motion preferences

### Browser Compatibility

Test your changes on:

- Latest Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Ensure graceful degradation for older browsers

## Questions?

Feel free to open an issue with your question or reach out to
hello@margiovanni.it

Thank you for contributing to Margio Theme!
