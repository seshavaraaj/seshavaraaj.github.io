# Animation System

This portfolio uses a comprehensive animation system to create smooth, engaging user interactions.

## Features

### 1. **Entry Animations**
- Page load animations with staggered delays
- Sections fade in from bottom to top
- Header slides down smoothly
- Navigation items animate in sequence

### 2. **Hover Effects**
- **Project Cards**: Lift and scale effect with enhanced shadows and brightness
- **Buttons**: Ripple effect with scale transformation
- **Navigation Links**: Circular ripple effect on hover
- **Tab Buttons**: Scale and underline animation

### 3. **Scroll Animations**
- Automatic reveal animations as elements enter viewport
- Uses IntersectionObserver for performance
- Staggered animations for child elements
- Smooth transitions with easing functions

### 4. **Modal Animations**
- Fade and scale entrance
- Backdrop blur effect
- Smooth button hover states with glow effects
- Scale feedback on button clicks

### 5. **Interactive Elements**
- Tab switching with fade effects
- Project detail overlay with scale animation
- Smooth scrollbar with hover states
- Shimmer loading effects

## Animation Classes

### Utility Classes

```css
/* Fade Animations */
.animate-fade-in          /* Simple fade in */
.animate-fade-in-up       /* Fade in from bottom */
.animate-fade-in-down     /* Fade in from top */
.animate-fade-in-left     /* Fade in from left */
.animate-fade-in-right    /* Fade in from right */

/* Scale Animations */
.animate-scale-in         /* Scale from small to normal */
.animate-pulse            /* Continuous pulse effect */

/* Movement Animations */
.animate-bounce           /* Bounce effect */
.animate-float            /* Floating effect */
.animate-glow             /* Glowing effect */

/* Hover Effects */
.hover-lift               /* Lift on hover */
.hover-grow               /* Grow on hover */
.hover-glow               /* Glow on hover */

/* Delays */
.delay-100 to .delay-800  /* Animation delays in 100ms increments */

/* Durations */
.duration-fast            /* 0.3s duration */
.duration-normal          /* 0.6s duration */
.duration-slow            /* 1s duration */

/* Scroll Animations */
.scroll-reveal            /* Element reveals on scroll */
.stagger-children         /* Children animate in sequence */
```

## JavaScript API

### ScrollAnimations Module

```javascript
// Initialize with custom options
const scrollAnimations = new ScrollAnimations({
    threshold: 0.15,           // Percentage of element visible to trigger
    rootMargin: '0px 0px -50px 0px'  // Margin around viewport
});

// Methods
scrollAnimations.triggerAnimation(element, 'fadeInUp');  // Manually trigger
scrollAnimations.reset();                                 // Reset all animations
scrollAnimations.destroy();                               // Clean up
```

### HTML Usage

```html
<!-- Scroll-triggered animation -->
<div class="scroll-reveal">Content</div>

<!-- Custom animation via data attribute -->
<div data-animation="fadeInLeft">Content</div>

<!-- Staggered children -->
<div class="stagger-parent">
    <div>Child 1</div>
    <div>Child 2</div>
    <div>Child 3</div>
</div>
```

## Performance

### Optimizations
- Uses `will-change` property for GPU acceleration
- IntersectionObserver prevents unnecessary calculations
- CSS transforms instead of position changes
- Reduced motion support for accessibility

### Accessibility
Respects user's motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
    /* Disables or simplifies animations */
}
```

## Customization

### Timing Functions
- `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth ease-in-out
- `ease` - Standard easing
- `linear` - Constant speed

### Duration Standards
- Quick feedback: 0.2-0.3s
- Standard transitions: 0.3-0.6s
- Entrance animations: 0.6-1s
- Background animations: 2-15s

## Browser Support
- Modern browsers: Full support
- Legacy browsers: Graceful degradation
- Uses feature detection for IntersectionObserver
- Fallback for browsers without CSS animation support

## Examples

### Project Card Hover
```css
.project:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    filter: brightness(1.05);
}
```

### Button Ripple Effect
```css
.btn::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: width 0.6s, height 0.6s;
}
.btn:hover::before {
    width: 300px;
    height: 300px;
}
```

### Modal Entrance
```css
.modal.show .modal-content {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Testing

Test animations on:
- Different screen sizes
- Various scroll speeds
- Touch devices
- Keyboard navigation
- Reduced motion settings

## Future Enhancements
- Parallax scrolling effects
- Page transition animations
- Gesture-based animations
- Interactive cursor effects
- Loading skeleton animations
