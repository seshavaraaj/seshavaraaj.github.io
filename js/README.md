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
| imageViewer.js | Full-screen image viewer | ImageViewer class |
| projectCard.js | Project card component | ProjectCard class |
| projectModal.js | Project detail modal | ProjectModal class |
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

### ImageViewer
Full-screen modal for viewing images with keyboard navigation.

**Constructor Parameters:**
- `modalId`: ID of the modal element

**Methods:**
- `open(images, index)`: Open viewer with image array
- `close()`: Close the viewer
- `showNext()`: Show next image
- `showPrevious()`: Show previous image

### ProjectCard
Individual project card with lazy loading and interactions.

**Constructor Parameters:**
- `projectElement`: DOM element for the card
- `imageViewer`: ImageViewer instance

**Methods:**
- `setupBackgroundImage()`: Load card background
- `setupPreloading()`: Preload images on hover
- `setupClickHandler()`: Handle click events
- `openDetails()`: Emit event to open details

### ProjectModal
Detailed project view with Steam-style gallery.

**Constructor Parameters:**
- `modalId`: ID of the modal element
- `imageViewer`: ImageViewer instance

**Methods:**
- `open(projectData)`: Open modal with project data
- `close()`: Close the modal
- `buildSteamGallery(images)`: Create gallery UI
- `createFeaturedImage(src)`: Create featured image element
- `createThumbnails(images, ...)`: Create thumbnail strip

### ProjectsManager
Coordinates all project-related functionality.

**Constructor Parameters:**
- `imageViewer`: ImageViewer instance

**Methods:**
- `initialize()`: Set up all project cards
- `getProjects()`: Return array of project cards

### TabManager
Handles tab switching for different project categories.

**Methods:**
- `openTab(evt, tabName)`: Switch to specified tab

## Communication Patterns

### Custom Events
Modules communicate using custom DOM events:

```javascript
// Dispatch event
const event = new CustomEvent('openProjectDetails', {
    detail: { title, description, link, images }
});
document.dispatchEvent(event);

// Listen for event
document.addEventListener('openProjectDetails', (e) => {
    // Handle event
});
```

### Dependency Injection
Dependencies are passed through constructors:

```javascript
const imageViewer = new ImageViewer('modal-id');
const projectModal = new ProjectModal('modal-id', imageViewer);
```

## Configuration

All configuration is centralized in `config.js`:

```javascript
export const config = {
    typewriter: { /* ... */ },
    modals: { /* ... */ },
    animations: { /* ... */ },
    gallery: { /* ... */ }
};
```

## Initialization Flow

1. DOM loads
2. Portfolio class instantiates
3. Modules initialized in order:
   - TypewriterEffect
   - ImageViewer
   - ProjectModal
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
