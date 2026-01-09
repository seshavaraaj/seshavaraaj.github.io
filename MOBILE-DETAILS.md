# Mobile Project Details Page

## Overview
This implementation creates a mobile-friendly, separate page experience for viewing project details instead of using a modal popup.

## How It Works

### Desktop Experience
- Clicking a project card opens a modal overlay
- Modal displays project details with Steam-style gallery
- User remains on the same page

### Mobile Experience (≤768px width with touch)
- Clicking a project card navigates to `project-details.html`
- Full-page view optimized for mobile interaction
- Swipe gestures to navigate through project images
- Back button returns to main portfolio page

## Files Created

### 1. `project-details.html`
- Standalone HTML page for project details
- Mobile-first responsive layout
- Includes gallery, description, and action buttons

### 2. `js/project-details.js`
- Loads project data from localStorage or URL parameters
- Renders project information dynamically
- Implements swipe gestures for image navigation
- Handles missing projects gracefully

### 3. `css/components/project-details-page.css`
- Mobile-first CSS with responsive breakpoints
- Touch-friendly buttons and interactive elements
- Smooth transitions and animations
- Optimized for different screen sizes

## Modified Files

### `js/modules/projectCard.js`
- Added `isMobileDevice()` method to detect mobile
- Added `openProject()` method to route based on device type
- Stores project data in localStorage before navigation
- Maintains backward compatibility with desktop modal

## Features

### Mobile Optimizations
- **Full-screen layout**: Better use of mobile screen space
- **Swipe gestures**: Natural navigation for mobile users
- **Touch-friendly buttons**: Larger, easier to tap
- **Back navigation**: Standard mobile navigation pattern
- **Lazy loading**: Images load as needed
- **Responsive grid**: Thumbnail gallery adapts to screen size

### Desktop Compatibility
- Desktop users still get the modal experience
- No changes to existing desktop functionality
- Progressive enhancement approach

## Technical Details

### Device Detection
```javascript
isMobileDevice() {
    const isMobileWidth = window.innerWidth <= 768;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isMobileWidth && hasTouchScreen;
}
```

### Data Transfer
- Primary: localStorage (reliable for mobile)
- Fallback: URL parameters with project ID
- Can load from `projects.json` if ID is provided

### Swipe Gestures
- Threshold: 50px minimum swipe distance
- Left swipe: Next image
- Right swipe: Previous image
- Passive event listeners for performance

## Usage

### Testing on Desktop
To test mobile view on desktop:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device or set width ≤768px
4. Ensure touch simulation is enabled

### Adding New Projects
No changes needed! The system automatically works with projects in `data/projects.json`:
```json
{
  "id": "project-id",
  "title": "Project Name",
  "description": "Project description...",
  "link": "https://project-url.com",
  "thumbnail": "thumbnail-url.jpg",
  "images": ["image1.jpg", "image2.jpg"]
}
```

## Browser Support
- Modern mobile browsers (iOS Safari, Chrome, Firefox)
- Requires ES6 module support
- Touch events API
- LocalStorage API

## Future Enhancements
- Add pinch-to-zoom for images
- Image download capability
- Share functionality
- Project navigation (previous/next project)
- Deep linking support
- Animation polish for page transitions
