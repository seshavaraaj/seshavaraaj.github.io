# CSS Architecture

## Overview
The CSS is organized using a modular, component-based architecture. This makes the styles maintainable, scalable, and easy to understand.

## Structure

### Core Files
- **main.css**: Entry point that imports all other CSS files
- **variables.css**: CSS custom properties for theming
- **base.css**: Base styles, resets, and global animations

### Components
Each component is a self-contained CSS file that styles a specific UI element:

| File | Purpose |
|------|---------|
| scrollbar.css | Custom scrollbar styling |
| glass-panel.css | Glass morphism effect |
| button.css | Button styles |
| header.css | Header and navigation |
| sections.css | Section layouts |
| footer.css | Footer styles |
| typewriter.css | Typewriter animation |
| tabs.css | Tab navigation |
| projects.css | Project card grid |
| modal.css | Base modal styles |
| project-modal.css | Project detail modal |
| gallery.css | Steam-style gallery |

## CSS Custom Properties

All theme values are defined in `variables.css`:

```css
:root {
    --header-color: #FFFFFF;
    --content-color: #EAE0D9;
    --button-text-color: #FFFFFF;
    --section-header-color: #F0EBE3;
    /* ... more variables */
}
```

## Usage

### Importing
All components are imported in `main.css`:
```css
@import './variables.css';
@import './base.css';
@import './components/header.css';
/* ... */
```

### Customization
To change the theme:
1. Edit `variables.css` for global changes
2. Edit specific component files for targeted changes

### Adding New Components
1. Create new file in `css/components/`
2. Add import to `main.css`
3. Use existing variables when possible

## Best Practices
- Use CSS custom properties for repeated values
- Keep component styles isolated
- Use consistent naming conventions
- Document complex selectors
- Mobile-first responsive design
