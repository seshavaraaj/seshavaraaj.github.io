# Portfolio Project

A modern, modular portfolio website built with vanilla JavaScript and CSS, featuring a clean architecture with separation of concerns.

## 📁 Project Structure

```
Portfolio/
├── index.html                 # Main HTML file
├── css/                       # Stylesheets
│   ├── main.css              # Main CSS file (imports all modules)
│   ├── variables.css         # CSS variables and theme configuration
│   ├── base.css              # Base styles
│   └── components/           # Component-specific styles
│       ├── animations.css    # Animation library
│       ├── scrollbar.css     # Custom scrollbar styling
│       ├── glass-panel.css   # Glass morphism effect
│       ├── button.css        # Button component
│       ├── header.css        # Header component
│       ├── sections.css      # Section layouts
│       ├── footer.css        # Footer component
│       ├── typewriter.css    # Typewriter effect styling
│       ├── tabs.css          # Tab navigation
│       ├── projects.css      # Project card styling
│       └── responsive.css    # Responsive design
├── js/                        # JavaScript modules
│   ├── main.js               # Application entry point
│   ├── config.js             # Configuration settings
│   └── modules/              # Feature modules
│       ├── typewriter.js     # Typewriter effect
│       ├── projectCard.js    # Project card component
│       ├── projectsManager.js # Projects coordinator
│       ├── scrollAnimations.js # Scroll-triggered animations
│       └── tabs.js           # Tab navigation
├── data/                      # Data files
│   └── projects.json         # Project data
└── assets/                    # Static assets
```

## 🎯 Key Features

### Modular Architecture
- **Component-based CSS**: Each UI element has its own stylesheet
- **ES6 Modules**: Modern JavaScript with import/export
- **Centralized Configuration**: Theme and settings in dedicated files
- **Responsive Design**: Mobile-first approach with proper breakpoints

### Built-in Features
- **Typewriter Effect**: Animated text in header
- **Tab Navigation**: Organize projects by category
- **Scroll Animations**: Elements fade in on scroll
- **Dynamic Project Loading**: Projects loaded from JSON data
- **Glass Morphism**: Modern glassmorphic UI elements
- **Mobile-Friendly Project Details**: Separate page for project details on mobile devices
  - Desktop: Opens projects in modal overlay
  - Mobile: Navigates to dedicated details page with swipe gestures

### Benefits
1. **Maintainability**: Easy to find and update code
2. **Scalability**: Add features without breaking existing ones
3. **Reusability**: Components can be reused in other projects
4. **Performance**: Optimized animations and efficient DOM queries
5. **Clean Code**: DRY principles and single responsibility

## 🚀 How to Use

### Running the Project
Use a local server (ES6 modules require HTTP protocol):

```bash
# Python
python -m http.server 8000

# Node.js
px http-server
```

Then open `http://localhost:8000` in your browser.

### Adding New Projects
Edit `data/projects.json`:

```json
{
  "projects": {
    "games": [
      {
        "id": "my-project",
        "title": "My Project",
        "description": "Project description",
        "link": "https://example.com",
        "images": ["image-url-1.jpg", "image-url-2.jpg"]
      }
    ]
  }
}
```

Projects are automatically rendered when the page loads.

### Customizing Styles
1. Edit `css/variables.css` for theme-wide changes
2. Edit specific component files for targeted changes

### Adding New Features
1. Create a new module in `js/modules/`
2. Import it in `js/main.js`
3. Initialize it in the Portfolio class

### Example: Adding a New Component

**CSS:**
```css
/* css/components/my-component.css */
.my-component {
    /* styles here */
}
```

Add to `css/main.css`:
```css
@import './components/my-component.css';
```

**JavaScript:**
```javascript
// js/modules/myComponent.js
export class MyComponent {
    constructor() {
        // initialization
    }
}
```

Import in `js/main.js`:
```javascript
import { MyComponent } from './modules/myComponent.js';
```

## 🔧 Technical Details

### Module Communication
- **Events**: Custom events for cross-module communication
- **Dependency Injection**: Pass dependencies through constructors
- **Config**: Centralized configuration in `config.js`

### CSS Architecture
- **CSS Custom Properties**: For theming and dynamic values
- **BEM-like naming**: Consistent class naming conventions
- **Mobile-first**: Responsive design with media queries

### Browser Support
- Modern browsers (ES6 modules required)
- For older browsers, consider using a bundler like Webpack or Rollup

## 📝 Notes

- All JavaScript uses ES6 module syntax (`type="module"`)
- CSS uses `@import` for modular stylesheet loading
- Projects are dynamically loaded from `data/projects.json`
- Animations respect `prefers-reduced-motion` for accessibility
- The structure follows separation of concerns principle

## 📚 Documentation

- **README.md** (this file) - Project overview and structure
- **QUICKSTART.md** - Getting started guide with examples
- **css/README.md** - CSS documentation and guidelines
- **js/README.md** - JavaScript module documentation
- **data/README.md** - Data structure documentation
