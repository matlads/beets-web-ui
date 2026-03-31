# Contributing to Beets Web UI

Thank you for your interest in contributing to Beets Web UI! This document provides guidelines for contributing to the project.

## Development Environment Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Initial Setup
1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```
4. Edit `.env.local` with your beets server URL and user name

### Running the Application
- Development server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Code Quality Standards

### Linting and Formatting
- ESLint and Prettier are configured
- Run `npm run lint` to check for issues
- Run `npm run lint:fix` to automatically fix fixable issues
- Run `npm run format` to format code with Prettier
- Run `npm run format:check` to verify formatting

### Testing
- Write tests for new functionality in `js/__tests__/`
- Run tests: `npm test`
- Watch mode: `npm run test:watch`
- UI mode: `npm run test:ui`

### Commit Guidelines
- Use descriptive commit messages
- Keep commits focused on a single change
- Reference issue numbers when applicable

## Architectural Patterns

### Backbone/Marionette Conventions
- Use `.extend()` for class definitions (not ES6 classes)
- Views should extend `BaseView` for automatic Radio channel setup
- Define `beetsEvents` hash for Radio event binding
- Use `options` for dependency injection (not singleton imports)

### File Organization
- **Models**: `js/models/` - Backbone model definitions
- **Collections**: `js/collections/` - Backbone collection definitions
- **Views**: `js/views/` - Marionette view components
- **Routers**: `js/routers/` - Backbone router definitions
- **Tests**: `js/__tests__/` - Test files

### Naming Conventions
- **Files**: kebab-case for multi-word names (e.g., `search-view.js`)
- **Variables**: camelCase
- **Constructors**: PascalCase
- **Constants**: UPPER_CASE

### Event Communication
- Use `Radio.channel("beets")` for cross-component communication
- Define events in `beetsEvents` hash for automatic binding
- Trigger events: `this.beetsChannel.trigger("event:name", data)`
- Document new events in `ARCHITECTURE.md`

## Adding New Features

### 1. Plan Your Feature
- Consider if it needs a new model/collection
- Determine which views will be affected
- Plan event communication if needed
- Update documentation

### 2. Implement Changes
- Create new files in appropriate directories
- Follow existing patterns and conventions
- Add tests for new functionality
- Update configuration if needed

### 3. Update Documentation
- Update `ARCHITECTURE.md` if architecture changes
- Add comments for complex logic
- Update this guide if workflows change

### 4. Test Thoroughly
- Run existing tests: `npm test`
- Test manually in development environment
- Verify production build: `npm run build`

## Bug Reports

### Before Submitting
1. Check existing issues to avoid duplicates
2. Test with latest version from `main` branch
3. Ensure issue is reproducible

### Bug Report Template
```
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node.js version: [e.g., 18.17.0]
- Beets server version: [if applicable]

**Additional Context**
Screenshots, logs, or other relevant information
```

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the guidelines above
3. **Add or update tests** as needed
4. **Update documentation** including `ARCHITECTURE.md` if needed
5. **Ensure code quality** passes linting and formatting checks
6. **Submit pull request** with clear description of changes

### PR Review Checklist
- [ ] Code follows project conventions
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Build succeeds

## Getting Help
- Check existing documentation (`ARCHITECTURE.md`, `AGENTS.md`)
- Search existing issues
- For urgent issues, contact maintainers

## License
By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

*Last updated: March 30, 2026*
