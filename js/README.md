# JavaScript Architecture

## Overview
The JavaScript code is organized using ES6 modules with a clear separation of concerns. Each module handles a specific feature and communicates through events and dependency injection.

## Structure

### Core Files
- **main.js**: Application entry point and initialization
- **config.js**: Centralized configuration

### Modules

| Module | Purpose | Exports |
|--------|---------|---------|
| typewriter.js | Animated text typing | TypewriterEffect class |
| projectCard.js | Project card component | ProjectCard class |
| projectsManager.js | Coordinates projects | ProjectsManager class |
| tabs.js | Tab navigation | TabManager class |

## Module Details

### TypewriterEffect
Handles the animated typing effect in the header.

**Constructor Parameters:**
- `elementId`: ID of the element to animate
- `titles`: Array of strings to cycle through
- `typingSpeed`: Speed of typing (ms)
- `deletingSpeed`: Speed of deleting (ms)

**Methods:**
- `start()`: Begin the animation
- `type()`: Internal typing logic

<!-- ImageViewer removed -->

### ProjectCard
Individual project card with lazy loading and interactions.

**Constructor Parameters:**
- `projectElement`: DOM element for the card

**Methods:**
- `setupBackgroundImage()`: Load card background
- `setupPreloading()`: Preload images on hover
- `setupClickHandler()`: Handle click events
-- Opens external link directly

<!-- ProjectModal removed -->

### ProjectsManager
Coordinates all project-related functionality.

**Constructor Parameters:**
<!-- none -->

**Methods:**
- `initialize()`: Set up all project cards
- `getProjects()`: Return array of project cards

### TabManager
Handles tab switching for different project categories.

**Methods:**
- `openTab(evt, tabName)`: Switch to specified tab

## Communication Patterns

<!-- Custom event flow removed -->

### Dependency Injection
Dependencies are passed through constructors:

<!-- Modal-related DI removed -->

## Configuration

All configuration is centralized in `config.js`:

```javascript
export const config = {
    typewriter: { /* ... */ },
    animations: { /* ... */ }
};
```

## Initialization Flow

1. DOM loads
2. Portfolio class instantiates
3. Modules initialized in order:
    - TypewriterEffect
    - ProjectsManager
    - TabManager
4. Event listeners attached
5. Application ready

## Adding New Modules

1. Create file in `js/modules/`
2. Export class or functions
3. Import in `main.js`
4. Initialize in Portfolio class
5. Add configuration to `config.js` if needed

## Best Practices

- One module per file
- Single responsibility principle
- Use ES6 class syntax
- Document complex logic
- Use meaningful variable names
- Handle errors gracefully
- Clean up event listeners when needed
