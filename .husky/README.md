# Git Hooks

This directory contains Git hooks managed by Husky to ensure code quality before
commits and pushes.

## Pre-commit Hook

Runs automatically before every commit:

1. **lint-staged**: Automatically fixes and formats staged files
   - JavaScript files: ESLint + Prettier
   - CSS files: StyleLint + Prettier
   - Markdown files: Prettier
   - Ruby files: RuboCop auto-correct

2. **Jest tests**: Runs all JavaScript tests

3. **RSpec tests**: Runs Ruby tests (only if Ruby files were modified)

## Pre-push Hook

Runs automatically before every push:

1. **npm run validate**: Full validation suite
   - ESLint (JavaScript linting)
   - StyleLint (CSS linting)
   - Jest tests with coverage
   - Prettier format check

2. **RuboCop**: Ruby code quality check

3. **RSpec**: Ruby plugin tests

4. **Jekyll build**: Verifies the site builds successfully

## Bypassing Hooks

If you need to bypass hooks (not recommended):

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

## Troubleshooting

If hooks fail to run:

```bash
# Reinstall hooks
npm run prepare

# Or manually
npx husky install
```

## Configuration

- Hook scripts: `.husky/pre-commit`, `.husky/pre-push`
- lint-staged config: `package.json` → `lint-staged` section
- Test configuration: `package.json` → `jest` section
