# Testing Checklist for GitHub Pages

<!-- Modal/Image Viewer related issues removed after feature deprecation -->

## 🧪 Test These Features

### Header
- [ ] Typewriter animation works (text cycles between "Unity Developer" and "Game Programmer")
- [ ] Navigation links scroll to correct sections
- [ ] Glass panel effect visible

### Projects Section
- [ ] Tab buttons work (Games, Systems, Mechanics)
- [ ] Project cards show background images
- [ ] Hover on cards shows description overlay
- [ ] Click on card opens external project link (new tab)

<!-- Project Detail Modal removed -->

<!-- Image Viewer Modal removed -->

### Contact Section
- [ ] Email visible
- [ ] Gmail button works (opens compose window)
- [ ] Gmail icon visible

### Footer
- [ ] Copyright text visible
- [ ] Glass panel effect applied

### Responsive Design
- [ ] Works on desktop
- [ ] Works on tablet
- [ ] Works on mobile
- [ ] Navigation collapses properly on small screens

## 🐛 Common Issues to Check

1. **Images not loading** - Check browser console for CORS errors or 404s
2. **Buttons not working** - Check browser console for JavaScript errors
3. **Styles not applied** - Verify CSS files are loading (check Network tab)

## 🌐 Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

## 📱 Mobile Testing

- [ ] Touch interactions work
- [ ] Pinch to zoom disabled where appropriate
- [ ] Buttons are large enough to tap
- [ ] Text is readable
