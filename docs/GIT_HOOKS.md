# Git Hooks Guide

This project uses [Husky](https://typicode.github.io/husky/) to automatically
run quality checks before commits and pushes, ensuring that only high-quality,
tested code makes it to the repository.

## Overview

The pre-commit and pre-push hooks prevent broken code from being committed or
pushed by automatically running:

- **Linting** (ESLint, StyleLint, RuboCop)
- **Testing** (Jest, RSpec)
- **Formatting** (Prettier)
- **Building** (Jekyll)

## Pre-commit Hook

Runs **before every commit**. This is fast and focused on the files you're
actually committing.

### What it does:

1. **lint-staged**: Automatically fixes and formats only staged files
   - `*.js` → ESLint + Prettier
   - `*.css` → StyleLint + Prettier
   - `*.md` → Prettier
   - `*.rb` → RuboCop auto-correct

2. **Jest tests**: Runs all JavaScript unit tests (typically completes in ~3
   seconds)

3. **RSpec tests**: Runs Ruby plugin tests (only if you modified `.rb` files)

### Example:

```bash
git add js/modules/dark-mode.js
git commit -m "Fix dark mode toggle"

# Husky will run:
# ✓ ESLint --fix on dark-mode.js
# ✓ Prettier --write on dark-mode.js
# ✓ npm test (all Jest tests)
# ✓ Commit succeeds if all checks pass
```

If any check fails, the commit is aborted and you'll see the error output.

## Pre-push Hook

Runs **before every push**. This is comprehensive and ensures nothing broken
reaches the remote repository.

### What it does:

1. **npm run validate**: Full validation suite
   - ESLint on all JavaScript files
   - StyleLint on all CSS files
   - Jest with coverage (must meet 70% thresholds)
   - Prettier format check

2. **RuboCop**: Ruby code quality check on all Ruby files

3. **RSpec**: All Ruby plugin tests

4. **Jekyll build**: Verifies the entire site builds successfully

### Example:

```bash
git push origin main

# Husky will run:
# ✓ npm run validate
# ✓ bundle exec rubocop
# ✓ bundle exec rspec
# ✓ bundle exec jekyll build
# ✓ Push succeeds if all checks pass
```

This typically takes 30-60 seconds but ensures you never push broken code.

## Benefits

### Automatic Code Quality

- **No manual linting**: Code is automatically fixed on commit
- **No manual formatting**: Prettier runs automatically
- **No broken tests**: Tests must pass before commit/push
- **No build failures**: Jekyll build verified before push

### Team Consistency

- Everyone commits properly formatted, linted code
- No "fix linting" commits cluttering history
- CI/CD pipeline rarely fails (already validated locally)

### Time Savings

- Catch errors before CI/CD runs (faster feedback)
- No waiting for GitHub Actions to fail
- No fix-commit-push-wait cycles

## Configuration Files

### Hook Scripts

- `.husky/pre-commit` - Pre-commit hook script
- `.husky/pre-push` - Pre-push hook script
- `.husky/README.md` - Quick reference

### lint-staged Configuration

In `package.json`:

```json
"lint-staged": {
  "*.js": ["eslint --fix", "prettier --write"],
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"],
  "*.rb": ["bundle exec rubocop -A"]
}
```

### Test Configuration

In `package.json`:

```json
"jest": {
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  }
}
```

## Bypassing Hooks (Not Recommended)

In rare cases where you need to bypass hooks (e.g., work-in-progress commit):

### Skip pre-commit:

```bash
git commit --no-verify -m "WIP: incomplete feature"
```

### Skip pre-push:

```bash
git push --no-verify
```

⚠️ **Warning**: Bypassing hooks means you might push broken code. Use sparingly
and fix issues before the next push.

## Troubleshooting

### Hooks not running

If hooks don't run automatically:

```bash
# Reinstall hooks
npm run prepare

# Or manually
npx husky install
```

### Hooks fail on every commit

If hooks consistently fail:

1. **Run validation manually**:

   ```bash
   npm run validate
   bundle exec rubocop
   bundle exec rspec
   bundle exec jekyll build
   ```

2. **Check specific failures**:

   ```bash
   # JavaScript linting
   npm run lint:js

   # CSS linting
   npm run lint:css

   # JavaScript tests
   npm test

   # Ruby linting
   bundle exec rubocop

   # Ruby tests
   bundle exec rspec
   ```

3. **Fix issues** before committing

### Hooks too slow

If pre-commit hook is too slow:

- **Jest tests** should complete in ~3 seconds
- **RSpec tests** only run if you changed `.rb` files
- Consider using `git commit --no-verify` for WIP commits, then run full
  validation before pushing

### Hook permissions

If you get permission errors:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

## CI/CD Integration

The hooks complement (not replace) GitHub Actions CI/CD:

### Local Hooks

- Fast feedback (seconds)
- Run before commit/push
- Prevent most errors

### GitHub Actions

- Complete validation on Linux environment
- Run on all PRs and pushes
- Test different environments
- Deploy builds

Both layers ensure maximum code quality.

## Development Workflow

### Recommended workflow:

1. **Make changes** to code files

2. **Run tests during development**:

   ```bash
   npm run test:watch  # JavaScript
   bundle exec rspec   # Ruby
   ```

3. **Stage your changes**:

   ```bash
   git add .
   ```

4. **Commit** (hooks run automatically):

   ```bash
   git commit -m "Add feature X"
   # Hooks run: lint-staged, Jest, RSpec
   ```

5. **Push** (hooks run automatically):
   ```bash
   git push
   # Hooks run: full validation, RuboCop, RSpec, Jekyll build
   ```

### If hooks fail:

```bash
# See what failed
# Fix the issues
# Re-commit
git add .
git commit -m "Fix issues from hooks"
```

## Disabling Hooks Permanently (Not Recommended)

To completely disable hooks:

```bash
# Remove husky
npm uninstall husky

# Remove git hooks
rm -rf .husky
```

⚠️ **Not recommended**: Hooks protect code quality. Only disable if absolutely
necessary.

## Additional Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Project Testing Guide](./TESTING.md)
- [JavaScript Architecture Guide](./JAVASCRIPT_ARCHITECTURE.md)
