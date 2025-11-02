# Testing Quick Reference

## Quick Start

```bash
# Install all dependencies
bundle install
npm install

# Run all tests
npm test                 # JavaScript tests
bundle exec rspec        # Ruby tests

# Run linters
npm run lint             # JavaScript + CSS linting
bundle exec rubocop      # Ruby linting

# Format code
npm run format           # Format all files

# Full validation
npm run validate         # Run all checks
```

## Test Coverage

### JavaScript (Jest)

- **Framework**: Jest with JSDOM
- **Coverage**: 70% minimum (branches, functions, lines, statements)
- **Files**: `tests/**/*.test.js`
- **Run**: `npm test` or `npm run test:coverage`

### Ruby (RSpec)

- **Framework**: RSpec
- **Files**: `spec/**/*_spec.rb`
- **Run**: `bundle exec rspec`

## Linting

### JavaScript (ESLint)

- **Config**: `.eslintrc.json`
- **Run**: `npm run lint:js`
- **Fix**: `npm run lint:js -- --fix`

### Ruby (RuboCop)

- **Config**: `.rubocop.yml`
- **Run**: `bundle exec rubocop`
- **Fix**: `bundle exec rubocop -a`

### CSS (StyleLint)

- **Config**: `.stylelintrc.json`
- **Run**: `npm run lint:css`
- **Fix**: `npm run lint:css -- --fix`

## Formatting

### Prettier

- **Config**: `.prettierrc.json`
- **Run**: `npm run format`
- **Check**: `npm run format:check`

## CI/CD

### GitHub Actions

- **Config**: `.github/workflows/ci.yml`
- **Triggers**: Push and PR to main/develop
- **Jobs**: Lint → Test → Build

## File Structure

```
sexyjekyll-theme/
├── tests/                    # JavaScript tests
│   ├── setup.js
│   ├── utils.test.js
│   ├── dark-mode.test.js
│   └── ...
├── spec/                     # Ruby tests
│   ├── spec_helper.rb
│   └── plugins/
│       ├── localized_date_spec.rb
│       └── category_generator_spec.rb
├── .eslintrc.json           # ESLint config
├── .rubocop.yml             # RuboCop config
├── .stylelintrc.json        # StyleLint config
├── .prettierrc.json         # Prettier config
├── package.json             # npm scripts
└── .github/
    └── workflows/
        └── ci.yml           # CI configuration
```

## npm Scripts

```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "lint": "npm run lint:js && npm run lint:css",
  "lint:js": "eslint 'js/**/*.js'",
  "lint:css": "stylelint 'css/**/*.css'",
  "lint:fix": "npm run lint:js -- --fix && npm run lint:css -- --fix",
  "format": "prettier --write 'js/**/*.js' 'css/**/*.css' '*.md' 'docs/**/*.md'",
  "format:check": "prettier --check 'js/**/*.js' 'css/**/*.css' '*.md' 'docs/**/*.md'",
  "validate": "npm run lint && npm run test && npm run format:check"
}
```

## Pre-commit Checklist

Before committing:

- [ ] Run tests: `npm test && bundle exec rspec`
- [ ] Run linters: `npm run lint && bundle exec rubocop`
- [ ] Format code: `npm run format`
- [ ] Build succeeds: `bundle exec jekyll build`

Or simply run:

```bash
npm run validate && bundle exec rubocop && bundle exec rspec
```

## Common Issues

### Jest tests fail with module errors

**Solution**: Ensure `package.json` has `"type": "module"`

### RuboCop reports style violations

**Solution**: Run `bundle exec rubocop -a` to auto-fix

### ESLint errors in node_modules

**Solution**: Already excluded in `.eslintrc.json`

### Coverage below threshold

**Solution**: Add more tests or adjust thresholds in `package.json`

## Resources

- [Full Testing Guide](docs/TESTING.md)
- [JavaScript Architecture](docs/JAVASCRIPT_ARCHITECTURE.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

For detailed documentation, see [docs/TESTING.md](docs/TESTING.md).
