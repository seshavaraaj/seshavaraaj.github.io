# Quick Start Guide

Get your portfolio running in minutes!

## 🚀 Getting Started

### 1. Run a Local Server

ES6 modules require a local server. Choose one:

**Option A: VS Code Live Server**
```
1. Install "Live Server" extension in VS Code
2. Right-click index.html
3. Select "Open with Live Server"
```

**Option B: Python**
```bash
python -m http.server 8000
# Then open: http://localhost:8000
```

**Option C: Node.js**
```bash
px http-server
# Then open: http://localhost:8080
```

### 2. Open in Browser
Navigate to `http://localhost:8000` (or the appropriate port) in a modern browser.

## 📝 Customization

### Change Colors/Theme
Edit `css/variables.css`:
```css
:root {
    --header-color: #FFFFFF;        /* Header text */
    --content-color: #EAE0D9;       /* Body text */
    --bg-primary: #6a8a8b;          /* Primary background */
    --bg-gradient-1: #d8c4b8;       /* Gradient color 1 */
    --bg-gradient-2: #7b4c48;       /* Gradient color 2 */
}
```

### Change Typewriter Text
Edit `js/config.js`:
```javascript
export const config = {
    typewriter: {
        titles: ["Unity Developer", "Game Programmer"], // ← Edit here
        typingSpeed: 150,
        deletingSpeed: 75
    }
};
```

### Add New Projects
Edit `data/projects.json`:
```json
{
  "projects": {
    "games": [
      {
        "id": "my-game",
        "title": "My Game Title",
        "description": "Game description here...",
        "link": "https://your-game-link.com",
        "images": [
          "https://image-url-1.jpg",
          "https://image-url-2.jpg"
        ]
      }
    ],
    "systems": [],
    "mechanics": []
  }
}
```

### Modify Component Styles
Find the component in `css/components/` and edit:
- Button styles → `button.css`
- Project cards → `projects.css`
- Header → `header.css`
- Animations → `animations.css`
- Responsive → `responsive.css`

### Add New Features
1. Create module file: `js/modules/myFeature.js`
2. Create stylesheet: `css/components/my-feature.css`
3. Import in `js/main.js` and add to `css/main.css`
4. Initialize in Portfolio class

## 🗂️ Project Structure

```
Portfolio/
├── index.html           # Main HTML
├── css/
│   ├── main.css        # CSS entry point
│   ├── variables.css   # Theme variables
│   ├── base.css        # Base styles
│   └── components/     # Component styles
├── js/
│   ├── main.js         # JS entry point
│   ├── config.js       # Configuration
│   └── modules/        # Feature modules
└── data/
    └── projects.json   # Project data
```

## 🔍 Common Tasks

### Change Background Gradient
**File:** `css/variables.css`
```css
:root {
    --bg-gradient-1: #d8c4b8;  /* Top right */
    --bg-gradient-2: #7b4c48;  /* Bottom left */
}
```

### Adjust Animation Timing
**File:** `css/components/animations.css`
```css
.animate-on-scroll {
    transition: opacity 0.8s ease, transform 0.8s ease;
}
```

### Change Contact Email
**File:** `index.html` (Contact section)
```html
<p>Email: your-email@example.com</p>
<a href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@example.com">
```

## 🐛 Troubleshooting

### Page Doesn't Load
- Use a local server (not `file://` protocol)
- Check browser console (F12) for errors
- Verify all files are in correct locations

### Styles Look Wrong
- Check that `css/main.css` is loading
- Verify all `@import` statements in `main.css`
- Clear browser cache (Ctrl+Shift+R)

### JavaScript Errors
- Ensure script tag has `type="module"`
- Verify all import paths are correct
- Use a modern browser with ES6 module support

### Projects Not Showing
- Check `data/projects.json` format
- Verify JSON is valid (use a JSON validator)
- Check browser console for fetch errors

## 🎯 Quick Checklist

Before deploying:
- [ ] Update personal information in HTML
- [ ] Change theme colors in `variables.css`
- [ ] Add your projects to `projects.json`
- [ ] Update contact email
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Test in different browsers

## 🚢 Deployment

### GitHub Pages
```bash
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Save and wait for deployment
```

### Netlify
```bash
1. Drag project folder to netlify.com/drop
2. Done!
```

### Vercel
```bash
npx vercel
```

---

**Happy coding! 🎉**
