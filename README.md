# Beets Web UI

A web interface for the [beets](https://github.com/beetbox/beets) music library manager, built with Backbone.js, Marionette, jQuery, and Bootstrap.

[![Test](https://github.com/matlads/beets-web-ui/actions/workflows/test.yml/badge.svg)](https://github.com/matlads/beets-web-ui/actions/workflows/test.yml)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/matlads/beets-web-ui/actions)

## Features

- Search and browse your beets music library
- Playback queue with 5-item limit
- Real-time player controls
- Lyrics display
- Local files support
- Responsive Bootstrap 5 interface

## Quick Start

### Prerequisites

- Node.js 20.x or later
- A running beets server (default: `http://127.0.0.1:8337`)

### Installation

```bash
# Clone the repository
git clone https://github.com/matlads/beets-web-ui.git
cd beets-web-ui

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your beets server URL
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# The built files will be in the `dist/` directory
```

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run Vitest tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint linting
- `npm run format:check` - Check Prettier formatting
- `npm run format` - Format code with Prettier

### Testing

The project includes comprehensive tests using Vitest with jsdom environment:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Watch mode
npm run test:watch
```

### Code Quality

- **ESLint**: Configured with recommended rules and Prettier integration
- **Prettier**: Code formatting with consistent style
- **Type Checking**: No TypeScript - plain JavaScript with ES6 modules

## Architecture

Built with classic MVC architecture using:

- **Backbone.js** - Models, Collections, Router
- **Marionette** - Views and application structure
- **Backbone.Radio** - Event-driven communication between components
- **jQuery** - DOM manipulation
- **Bootstrap 5** - UI components and styling
- **Vite** - Build tool and development server

### Key Patterns

- **Event-Driven Communication**: Components communicate via Backbone.Radio channels
- **Template-Driven Views**: Underscore templates with inline SVG icons
- **MVC with Marionette**: Application → Regions → Views → Models
- **Collection Management**: Custom collection methods for API interaction

## CI/CD

Automated testing via GitHub Actions:

- Runs on every push to `main` and pull requests
- Includes linting, formatting checks, and test coverage
- Coverage reports uploaded as artifacts
- Production build verification

## Deployment

The built `dist/` directory contains static files that can be deployed to any web server:

- GitHub Pages
- Netlify
- Vercel
- Traditional web server (Apache, nginx)

## Contributing

See [AGENTS.md](AGENTS.md) for detailed development guidelines and code style.

## License

MIT © Martin Atukunda
