# AGENTS.md - Beets Web UI Development Guide

This document provides essential information for AI agents working on the beets-web-ui repository.

## Project Overview

beets-web-ui is a web interface for the beets music library manager, built with Backbone.js, Marionette, jQuery, and Bootstrap. It uses Vite as the build tool and follows a classic MVC architecture with event-driven communication via Backbone.Radio.

## Build & Development Commands

### Package Scripts (from `package.json`)
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm test         # Placeholder - no tests configured
```

### Environment Setup
1. Copy `.env.example` to `.env.local` and configure:
   - `VITE_API_URL` - Beets server API endpoint (default: `http://127.0.0.1:8337`)
   - `VITE_USER_NAME` - Default user display name

2. Install dependencies: `npm install`

### Build Configuration
- **Build Tool**: Vite (see `vite.config.js`)
- **No TypeScript**: Plain JavaScript with ES6 modules
- **No ESLint/Prettier**: No linting or formatting configuration
- **No Testing Framework**: Tests not currently configured

## Code Style Guidelines

### File Structure
```
js/
├── models/           # Backbone Models
├── collections/      # Backbone Collections  
├── views/           # Marionette Views
├── routers/         # Backbone Routers
├── templates/       # Underscore templates (if any)
└── index.js         # Application entry point
```

### File Naming
- **kebab-case** for multi-word filenames: `search-results-view.js`, `currently-playing-view.js`
- **lowercase** for single words: `item.js`, `profile.js`
- Always include `.js` extension

### Import Patterns
```javascript
// ES6 imports with .js extension
import { View } from "backbone.marionette";
import { template } from "underscore";
import Item from "../models/item.js";
import PlayIcon from "../../icons/play.svg"; // SVGs as URLs

// Third-party packages
import "bootstrap/dist/css/bootstrap.css";
import "../css/app.css";
```

### Export Patterns
```javascript
// Default exports for Backbone classes
export default Item;

// Named exports for constants and instances
export const config = { apiUrl: API_URL };
export { items };

// Mixed exports (router example)
export { router, BeetsRouter };
```

### Variable Naming
- **camelCase** for variables/functions: `app`, `indexView`, `doPlay`
- **PascalCase** for constructors: `Item`, `BaseView`, `ItemsCollection`
- **UPPER_CASE** for constants: `API_URL`, `ENTER_KEY`
- Use `that` to capture `this` in callbacks

### Function Style
```javascript
// Methods within .extend() objects
const ItemView = View.extend({
  doPlay: function() {
    // Traditional function expression
  },
  
  onRender: function() {
    // Marionette lifecycle method
  }
});

// No arrow functions used
// No ES6 class syntax - use Backbone's .extend()
```

### Comments
- Minimal commenting throughout
- Use JSDoc-style for important base classes:
```javascript
/**
 * Base view that automatically sets up the Radio channel for beets events.
 * Views that extend BaseView can define a `beetsEvents` object to automatically
 * bind events from the "beets" channel.
 */
```
- Single-line comments for explanations: `// active is true if this item is playing.`

### Error Handling
- No explicit `try/catch` blocks
- No `console.error` or `console.warn` usage
- Errors are handled by Backbone's built-in mechanisms
- Network errors managed by Backbone.sync

## Framework Conventions

### Backbone Models
```javascript
const Item = Model.extend({
  defaults: {
    title: "N/A",
    album: "N/A",
    artist: "N/A",
    year: null,
    duration: 0
  }
});
```

### Backbone Collections
```javascript
const ItemsCollection = Collection.extend({
  model: Item,
  baseUrl: null,
  parse: function(data) {
    return data.items || data.results;
  },
  setQuery: function(query = "") {
    this.url = `${this.baseUrl}/item/query/${query}`;
    this.trigger("items:setQuery");
    return this;
  }
});
```

### Marionette Views
```javascript
const BaseView = View.extend({
  // Radio channel for beets events
  initialize: function() {
    this.beetsChannel = Radio.channel("beets");
    if (this.beetsEvents) {
      this.bindEvents(this.beetsChannel, this.beetsEvents);
    }
  }
});

const ItemView = BaseView.extend({
  // Template using Underscore's template() with backticks
  template: template(`
    <div class="item">
      <h3><%= title %></h3>
      <p><%= artist %> - <%= album %></p>
      <button class="play-btn">${PlayIcon} Play</button>
    </div>
  `),
  
  // UI hash for cached jQuery selectors
  ui: {
    playButton: ".play-btn"
  },
  
  // Triggers hash for DOM-to-view events
  triggers: {
    "click @ui.playButton": "play:item"
  },
  
  // beetsEvents for Radio channel events
  beetsEvents: {
    "player:stateChanged": "onPlayerStateChanged"
  },
  
  // Event handlers
  onPlayItem: function() {
    this.beetsChannel.trigger("player:play", this.model);
  },
  
  onPlayerStateChanged: function(state) {
    // Update view based on player state
  }
});
```

### Backbone Router
```javascript
const BeetsRouter = Router.extend({
  routes: {
    "item/query/:query": "itemQuery"
  },
  itemQuery: function(query) {
    const queryURL = query.split(/\s+/).map(encodeURIComponent).join('/');
    items.setQuery(queryURL).fetch();
  }
});
```

### Event Communication
- Use `Radio.channel("beets")` for cross-component communication
- Views define `beetsEvents` to automatically bind channel events
- Trigger events: `this.beetsChannel.trigger("player:play", model)`
- Listen to events via `beetsEvents` hash or manual binding

## Styling
- Bootstrap 5 for CSS framework
- Custom styles in `css/app.css`
- Use Bootstrap utility classes in templates
- SVG icons imported as URLs and injected into templates

## Development Workflow

1. **Starting Development**: `npm run dev`
2. **Code Changes**: Edit files in `js/` directory
3. **Browser Testing**: App runs at `http://localhost:5173`
4. **Production Build**: `npm run build` outputs to `dist/`
5. **No Tests**: No test framework configured (placeholder `npm test`)

## Key Architectural Patterns

1. **MVC with Marionette**: Application -> Regions -> Views -> Models
2. **Event-Driven**: Backbone.Radio for loose coupling between components
3. **Template-Driven**: Underscore templates with inline SVG icons
4. **URL Routing**: Backbone Router for query-based navigation
5. **Collection Management**: Custom collection methods for API interaction

## Notes for AI Agents

- **No TypeScript**: Don't add .ts files or type annotations
- **Consistent Patterns**: Follow existing Backbone/Marionette patterns
- **File Organization**: Keep related files in appropriate subdirectories
- **Event Communication**: Prefer Radio channels over direct method calls
- **Template Style**: Use backticks for multi-line templates within `template()`
- **Import Paths**: Always include `.js` extension in relative imports
- **Export Style**: Use default exports for classes, named for instances/constants
- **Error Handling**: Rely on Backbone's error mechanisms rather than custom try/catch

## Missing Tooling (Potential Improvements)

- No ESLint configuration
- No Prettier formatting
- No testing framework
- No TypeScript support
- No CI/CD pipeline
- No Cursor rules (`.cursor/rules/`, `.cursorrules`)
- No Copilot instructions (`.github/copilot-instructions.md`)

Agents should maintain the existing simple toolchain unless explicitly asked to add modern tooling.

---

*Last updated: March 30, 2026*  
*Based on analysis of beets-web-ui repository*