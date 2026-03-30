# Beets Web UI - Architecture Guide

## Overview
Beets Web UI is a single-page web interface for the [beets](https://beets.io/) music library manager. It provides a three-panel layout for browsing, searching, and playing music from a beets server.

## Technology Stack
- **Frontend Framework**: Backbone.js with Marionette.js (MV* architecture)
- **UI Library**: Bootstrap 5 for CSS components
- **Build Tool**: Vite (ES modules, hot reload, production bundling)
- **Event System**: Backbone.Radio for loose coupling between components
- **Templating**: Underscore.js templates with inline SVG icons
- **Testing**: Vitest for unit testing

## Project Structure
```
beets-web-ui/
├── js/                     # Application source code
│   ├── collections/        # Backbone collections (data layer)
│   ├── models/            # Backbone models (data structures)
│   ├── views/             # Marionette views (UI components)
│   │   ├── base-view.js   # Base view with Radio channel setup
│   │   └── ...            # Individual view modules
│   ├── routers/           # Backbone router (URL routing)
│   ├── __tests__/         # Unit tests
│   ├── config.js          # Configuration module
│   ├── icons.js           # Centralized SVG icon exports
│   ├── App.js             # Application entry point
│   └── index.js           # Bootstrap script
├── css/                   # Stylesheets
│   └── app.css           # Global CSS (Bootstrap + custom)
├── index.html            # Main HTML file
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── .env.local            # Environment variables (gitignored)
└── .env.example          # Example environment configuration
```

## Key Components

### Application Lifecycle
1. `index.js` loads configuration and starts the `App`
2. `App.js` initializes dependencies (items collection, router) and starts the Marionette application
3. `IndexView` renders the three main regions: header, main, footer
4. `MainView` creates the three-column layout with search, local files, search results, and queue

### Data Layer
- **ItemsCollection**: Manages music items from the beets API with query support
- **Item Model**: Represents a single music track with metadata (title, artist, album, etc.)
- **Profile Model**: User profile information

### View Hierarchy
- **BaseView**: All views extend this; provides automatic Radio channel binding
- **HeaderView**: Contains branding and user profile
- **MainView**: Three-column layout container
- **FooterView**: Contains the audio player
- **LocalFilesView**: Shows local music files (left column)
- **SearchView**: Search input with query routing
- **SearchResultsView**: Displays search results (center column)
- **QueueView**: Shows recently played tracks (right column)
- **PlayerView**: Audio element with play/pause controls
- **ProfileView**: User profile display

### Event System (Backbone.Radio)
- Channel: `beets`
- Events:
  - `item:play`: Triggered when a track should play
  - `item:pause`: Triggered when a track should pause
  - `play:ended`: Triggered when playback ends
  - `item:search`: Triggered when search is requested
  - `route:player`, `route:queue`, `route:profile`: Navigation events from router

### Routing
- `/item/query/:query`: Search for items (triggers API request)
- `/player`: Navigation to player section (triggers `route:player` event)
- `/queue`: Navigation to queue section (triggers `route:queue` event)
- `/profile`: Navigation to profile section (triggers `route:profile` event)

## Configuration
Environment variables (via `.env.local`):
- `VITE_API_URL`: Beets server API endpoint (default: `http://127.0.0.1:8337`)
- `VITE_USER_NAME`: Default user display name

Configuration is loaded via `js/config.js` and passed to the application.

## Dependency Injection
The application uses dependency injection rather than singletons:
- `ItemsCollection` instance created in `App.js` and passed via options
- `BeetsRouter` instance created with items dependency
- Views receive dependencies via `options` (e.g., `this.options.items`, `this.options.router`)

## Build System
- **Development**: `npm run dev` starts Vite dev server with hot reload
- **Production**: `npm run build` creates optimized bundles in `dist/`
- **Preview**: `npm run preview` serves production build locally

## Testing
- **Framework**: Vitest
- **Location**: `js/__tests__/`
- **Run tests**: `npm test` or `npm run test:watch`
- Current tests cover `ItemsCollection` functionality

## Development Workflow

### Code Style
- ESLint + Prettier configured (run `npm run lint` and `npm run format`)
- ES6 modules with `.js` extensions
- CamelCase variables, PascalCase constructors
- Backbone/Marionette patterns (`.extend()` not ES6 classes)

### Adding New Features
1. Create model/collection in appropriate directory
2. Create view extending `BaseView` with `beetsEvents` if needed
3. Add route in `beets-router.js` if navigation required
4. Update documentation

### Event Communication
Prefer Radio events over direct method calls for cross-component communication. Define events in `beetsEvents` hash for automatic binding.

## Known Limitations & Future Improvements
1. **Type Safety**: Currently plain JavaScript; TypeScript migration would improve maintainability
2. **CSS Organization**: Global CSS; consider CSS modules or CSS-in-JS
3. **Test Coverage**: Limited to collections; expand to views and integration
4. **Error Handling**: Basic network error events; could add user-facing error messages
5. **Responsive Design**: Bootstrap provides basic responsiveness but could be enhanced

---

*Last updated: March 30, 2026*  
*Based on beets-web-ui version 1.0.0*