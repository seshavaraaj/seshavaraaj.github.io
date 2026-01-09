# Testing Mobile Project Details

## Quick Test Guide

### 1. Testing Desktop Modal (Default)
1. Open http://localhost:8000 in a desktop browser
2. Click any project card
3. **Expected**: Modal overlay appears with project details
4. **Expected**: Can close with X, ESC, or clicking outside

### 2. Testing Mobile Page
#### Option A: Using Browser DevTools
1. Open http://localhost:8000
2. Open DevTools (F12)
3. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
4. Select a mobile device (e.g., iPhone 12)
5. Click any project card
6. **Expected**: Navigates to `project-details.html`
7. **Expected**: Shows full-page project details
8. **Expected**: Can swipe images left/right (simulate touch in DevTools)
9. **Expected**: Back button returns to main page

#### Option B: Using Real Mobile Device
1. Find your computer's local IP (e.g., 192.168.1.100)
2. Open http://YOUR-IP:8000 on mobile browser
3. Click any project card
4. **Expected**: Full mobile-optimized page
5. **Expected**: Swipe gestures work for image navigation
6. **Expected**: Back button returns to portfolio

### 3. Testing Gallery Features
- Multiple images: Click "A Cube" project (has 7 images)
- No images: Click "Fuse Gambit" project (no images array)
- Single thumbnail: Projects with only thumbnail

### 4. Testing Edge Cases
1. Navigate directly to http://localhost:8000/project-details.html
   - **Expected**: Shows "Project Not Found"
2. Refresh on project details page
   - **Expected**: Project details remain (from localStorage)
3. Clear localStorage and refresh
   - **Expected**: Shows "Project Not Found"

## Verification Checklist

### Desktop Experience
- [ ] Projects load correctly on main page
- [ ] Clicking project opens modal
- [ ] Modal shows title, description, images
- [ ] Can navigate images with thumbnails
- [ ] Visit button opens project link
- [ ] Can close modal (X, ESC, click outside)
- [ ] Body scroll is prevented when modal open

### Mobile Experience
- [ ] Projects load correctly on main page
- [ ] Clicking project navigates to new page
- [ ] Page shows project title in header
- [ ] Back button works
- [ ] Main image displays correctly
- [ ] Thumbnails grid appears (if multiple images)
- [ ] Can switch images by tapping thumbnails
- [ ] Swipe left/right changes images
- [ ] Visit button opens project link
- [ ] No images: Gallery section hidden
- [ ] Responsive layout on different screen sizes

### Performance
- [ ] Page loads quickly
- [ ] Images load without blocking
- [ ] Smooth animations and transitions
- [ ] No console errors
- [ ] LocalStorage saves/loads correctly

## Common Issues & Solutions

### Issue: Modal opens on mobile instead of redirecting
**Solution**: Ensure window width is ≤768px and touch events are enabled

### Issue: "Project Not Found" on details page
**Solution**: Check localStorage has 'currentProject' or URL has ?id=project-id

### Issue: Swipe doesn't work
**Solution**: Ensure touch simulation is enabled in DevTools or using real touch device

### Issue: Images not loading
**Solution**: Check network tab for 404s, verify image URLs in projects.json

### Issue: Styles not applying
**Solution**: Clear cache, check CSS file loaded correctly (DevTools Network tab)

## Browser Console Tests

### Check if mobile detection works:
```javascript
const isMobileWidth = window.innerWidth <= 768;
const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
console.log('Mobile:', isMobileWidth && hasTouchScreen);
```

### Check localStorage:
```javascript
console.log(localStorage.getItem('currentProject'));
```

### Manually set project data:
```javascript
localStorage.setItem('currentProject', JSON.stringify({
    title: "Test Project",
    description: "Test description",
    link: "https://example.com",
    images: ["https://via.placeholder.com/800x450"]
}));
```

Then navigate to project-details.html to see it load.
