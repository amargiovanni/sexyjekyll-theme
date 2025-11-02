# Testing and Quality Assurance

## Overview

SexyJekyll implements a comprehensive testing and quality assurance strategy
covering:

- **JavaScript Testing** with Jest
- **Ruby Testing** with RSpec
- **Linting** with ESLint, RuboCop, and StyleLint
- **Code Formatting** with Prettier
- **Continuous Integration** with GitHub Actions

## Table of Contents

- [Quick Start](#quick-start)
- [JavaScript Testing](#javascript-testing)
- [Ruby Testing](#ruby-testing)
- [Linting](#linting)
- [Code Formatting](#code-formatting)
- [Continuous Integration](#continuous-integration)
- [Writing Tests](#writing-tests)
- [Code Coverage](#code-coverage)
- [Pre-commit Hooks](#pre-commit-hooks)

## Quick Start

### Installation

```bash
# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install
```

### Run All Tests

```bash
# JavaScript tests
npm test

# Ruby tests
bundle exec rspec

# All linters
npm run lint
bundle exec rubocop

# Format code
npm run format
```

### Run Everything

```bash
# Validate entire codebase
npm run validate
```

## JavaScript Testing

### Framework: Jest

Jest is used for testing all JavaScript modules with the following features:

- ES6 module support
- JSDOM environment for DOM testing
- Code coverage reporting
- Watch mode for development
- Snapshot testing support

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── setup.js              # Test environment configuration
├── utils.test.js         # Utility functions tests
├── dark-mode.test.js     # Dark mode module tests
├── smooth-scroll.test.js # Smooth scroll tests
└── external-links.test.js # External links tests
```

### Example Test

```javascript
// tests/utils.test.js
import { slugify } from '../js/modules/utils.js';

describe('slugify', () => {
  test('converts text to URL-friendly slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('removes special characters', () => {
    expect(slugify('Hello @#$ World!')).toBe('hello-world');
  });
});
```

### Mocking DOM APIs

The test setup provides mocks for browser APIs:

- `IntersectionObserver`
- `window.matchMedia`
- `window.scrollTo`
- `requestAnimationFrame`
- `cancelAnimationFrame`

### Coverage Requirements

Minimum coverage thresholds:

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

View coverage report:

```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Ruby Testing

### Framework: RSpec

RSpec is used for testing Jekyll plugins and Ruby code.

### Running Tests

```bash
# Run all Ruby tests
bundle exec rspec

# Run specific test file
bundle exec rspec spec/plugins/localized_date_spec.rb

# Run with documentation format
bundle exec rspec --format documentation
```

### Test Structure

```
spec/
├── spec_helper.rb                    # RSpec configuration
└── plugins/
    ├── localized_date_spec.rb        # Date localization tests
    ├── category_generator_spec.rb    # Category generator tests
    └── auto_related_posts_spec.rb    # Related posts tests
```

### Example Test

```ruby
# spec/plugins/localized_date_spec.rb
require 'spec_helper'
require_relative '../../_plugins/localized_date'

RSpec.describe Jekyll::LocalizedDate do
  describe '#localized_date' do
    let(:date) { Time.new(2025, 1, 15) }

    it 'formats date in English' do
      expect(filter.localized_date(date)).to eq('15 January 2025')
    end
  end
end
```

### Testing Plugins

When testing Jekyll plugins:

1. Create a mock `Jekyll::Site` instance
2. Configure necessary site settings
3. Test plugin functionality in isolation
4. Verify expected output

## Linting

### ESLint (JavaScript)

Ensures JavaScript code quality and consistency.

**Configuration**: `.eslintrc.json`

```bash
# Lint JavaScript files
npm run lint:js

# Auto-fix issues
npm run lint:js -- --fix
```

**Rules Enforced**:

- No console.log (warnings allowed for error/warn/debug)
- Prefer const over let
- No var declarations
- Use strict equality (===)
- Prefer arrow functions
- Use template literals

### RuboCop (Ruby)

Ruby static code analyzer and formatter.

**Configuration**: `.rubocop.yml`

```bash
# Lint Ruby files
bundle exec rubocop

# Auto-fix issues
bundle exec rubocop -a

# Lint specific file
bundle exec rubocop _plugins/localized_date.rb
```

**Style Guide**: Follows [Ruby Style Guide](https://rubystyle.guide/)

### StyleLint (CSS)

CSS linter for style sheets.

**Configuration**: `.stylelintrc.json`

```bash
# Lint CSS files
npm run lint:css

# Auto-fix issues
npm run lint:css -- --fix
```

**Rules Enforced**:

- Alphabetical property order
- No redundant longhand properties
- No !important declarations
- Lowercase color keywords
- Maximum nesting depth: 3

## Code Formatting

### Prettier

Opinionated code formatter for JavaScript, CSS, and Markdown.

**Configuration**: `.prettierrc.json`

```bash
# Format all files
npm run format

# Check formatting (CI)
npm run format:check
```

**Formatting Rules**:

- Print width: 100 characters
- Tab width: 2 spaces
- Single quotes
- Trailing commas (ES5)
- LF line endings

**Auto-format on Save**:

**VS Code** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Continuous Integration

### GitHub Actions

Automated testing and validation on every push and pull request.

**Configuration**: `.github/workflows/ci.yml`

### CI Pipeline

```
┌─────────────┐
│   Lint      │
│  ESLint     │
│  RuboCop    │
│  StyleLint  │
│  Prettier   │
└──────┬──────┘
       │
       ├─────────────┐
       │             │
┌──────▼──────┐ ┌───▼──────────┐
│ Test JS     │ │  Test Ruby   │
│  Jest       │ │  RSpec       │
└──────┬──────┘ └───┬──────────┘
       │            │
       └─────┬──────┘
             │
      ┌──────▼──────┐
      │   Build     │
      │   Jekyll    │
      └─────────────┘
```

### CI Jobs

1. **Lint**: Run all linters
2. **Test JavaScript**: Run Jest with coverage
3. **Test Ruby**: Run RSpec
4. **Build**: Build Jekyll site

### Status Badges

Add to README.md:

```markdown
![CI](https://github.com/amargiovanni/sexyjekyll-theme/workflows/CI/badge.svg)
![Coverage](https://codecov.io/gh/amargiovanni/sexyjekyll-theme/branch/main/graph/badge.svg)
```

## Writing Tests

### JavaScript Test Guidelines

1. **Test File Naming**: Use `.test.js` suffix
2. **Group Related Tests**: Use `describe` blocks
3. **Clear Test Names**: Describe what is being tested
4. **Arrange-Act-Assert**: Structure tests clearly
5. **Mock External Dependencies**: Use Jest mocks
6. **Test Edge Cases**: Include error conditions

**Example**:

```javascript
describe('MyModule', () => {
  describe('myFunction', () => {
    test('should handle valid input', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = myFunction(input);

      // Assert
      expect(result).toBe('expected');
    });

    test('should handle empty input', () => {
      expect(myFunction('')).toBe('');
    });

    test('should handle null input', () => {
      expect(myFunction(null)).toBe(null);
    });
  });
});
```

### Ruby Test Guidelines

1. **Test File Naming**: Use `_spec.rb` suffix
2. **Use `let` for Setup**: Define test data cleanly
3. **One Assertion Per Test**: Keep tests focused
4. **Use RSpec Matchers**: Leverage built-in matchers
5. **Test Both Success and Failure**: Cover all paths

**Example**:

```ruby
RSpec.describe MyPlugin do
  let(:site) { build_site }
  let(:plugin) { described_class.new }

  describe '#generate' do
    context 'with valid input' do
      it 'generates expected output' do
        result = plugin.generate(site)
        expect(result).to eq(expected_output)
      end
    end

    context 'with empty input' do
      it 'returns empty array' do
        expect(plugin.generate(nil)).to eq([])
      end
    end
  end
end
```

## Code Coverage

### JavaScript Coverage

Generated by Jest:

```bash
npm run test:coverage
```

**Reports**:

- Terminal summary
- HTML report: `coverage/lcov-report/index.html`
- LCOV file: `coverage/lcov.info`

### Ruby Coverage

Add SimpleCov to Gemfile:

```ruby
gem 'simplecov', require: false, group: :test
```

Enable in `spec/spec_helper.rb`:

```ruby
require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/spec/'
  add_filter '/vendor/'
end
```

### Coverage Reports

Upload to Codecov via GitHub Actions:

```yaml
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Pre-commit Hooks

### Using Husky (Optional)

Install:

```bash
npm install --save-dev husky lint-staged
npx husky install
```

**package.json**:

```json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix", "prettier --write"],
    "*.{md,json}": ["prettier --write"],
    "*.rb": ["rubocop -a"]
  }
}
```

Add hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### Manual Pre-commit Check

Run before committing:

```bash
npm run validate
bundle exec rubocop
bundle exec rspec
```

## Troubleshooting

### Jest Tests Failing

**Issue**: ES6 module import errors

**Solution**: Ensure `package.json` has `"type": "module"`

**Issue**: DOM not available

**Solution**: Check Jest config uses `jsdom` environment

### RSpec Tests Failing

**Issue**: Plugin not loading

**Solution**: Verify `require_relative` path is correct

**Issue**: Jekyll not configured

**Solution**: Ensure `spec_helper.rb` initializes Jekyll

### Linter Errors

**Issue**: ESLint reports module not found

**Solution**: Run `npm install` to install dependencies

**Issue**: RuboCop reports syntax errors

**Solution**: Check Ruby version compatibility (3.0+)

## Best Practices

### Testing

1. Write tests first (TDD)
2. Keep tests simple and focused
3. Test behavior, not implementation
4. Use descriptive test names
5. Maintain high coverage (>80%)
6. Run tests before committing

### Linting

1. Fix linting errors before committing
2. Don't disable rules without reason
3. Use auto-fix when possible
4. Configure editor for real-time feedback
5. Keep configuration consistent

### Code Quality

1. Follow style guides
2. Write self-documenting code
3. Add comments for complex logic
4. Keep functions small and focused
5. Avoid code duplication
6. Refactor regularly

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [RSpec Documentation](https://rspec.info/documentation/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [RuboCop Documentation](https://docs.rubocop.org/)
- [StyleLint Rules](https://stylelint.io/user-guide/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## Contributing

When contributing to this project:

1. Ensure all tests pass
2. Add tests for new features
3. Follow linting rules
4. Format code with Prettier
5. Update documentation
6. Run full validation before submitting PR

```bash
# Pre-submission checklist
npm run validate
bundle exec rubocop
bundle exec rspec
bundle exec jekyll build
```

---

For more information about the codebase structure, see
[JAVASCRIPT_ARCHITECTURE.md](JAVASCRIPT_ARCHITECTURE.md).
