# Quick Start Guide

Get started with your modularized portfolio in minutes!

## 🚀 Getting Started

### 1. Open the Project
Simply open `index.html` in a modern web browser:
- Double-click `index.html`, or
- Right-click → Open with → Your browser, or
- Use a local server (recommended for development)

### 2. Using a Local Server (Recommended)

ES6 modules work best with a local server. Choose one:

**Option A: VS Code Live Server**
```
1. Install "Live Server" extension in VS Code
2. Right-click index.html
3. Select "Open with Live Server"
```

**Option B: Python**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Option C: Node.js**
```bash
npx http-server

# Then open: http://localhost:8080
```

## 📝 Customization

### Change Colors/Theme
Edit `css/variables.css`:
```css
:root {
    --header-color: #FFFFFF;        /* Header text */
    --content-color: #EAE0D9;       /* Body text */
    --button-text-color: #FFFFFF;   /* Button text */
    /* ... more variables */
}
```

### Change Typewriter Text
Edit `js/config.js`:
```javascript
export const config = {
    typewriter: {
        elementId: 'dynamic-title',
        titles: ["Unity Developer", "Game Programmer"], // ← Edit here
        typingSpeed: 150,
        deletingSpeed: 75
    },
    // ...
};
```

### Add New Projects
Edit the HTML in `index.html` or create a data loader for `data/projects.json` (future enhancement).

### Modify Styles
Find the component you want to style in `css/components/` and edit it:
- Button styles → `button.css`
- Project cards → `projects.css`
- Header → `header.css`
- etc.

### Add New Features
1. Create module in `js/modules/myFeature.js`
2. Create styles in `css/components/my-feature.css`
3. Import in `js/main.js` and `css/main.css`
4. Initialize in Portfolio class

## 🗂️ Project Structure

```
Portfolio/
├── index.html           ← Main HTML file
├── css/
│   ├── main.css        ← CSS entry (imports all)
│   ├── variables.css   ← Edit colors/theme here
│   └── components/     ← Individual component styles
├── js/
│   ├── main.js         ← JS entry (imports all)
│   ├── config.js       ← Edit settings here
│   └── modules/        ← Feature modules
└── data/
    └── projects.json   ← Project data (optional)
```

## 🔍 Common Tasks

### Task: Change Background Gradient
**File:** `css/variables.css`
```css
:root {
    --bg-gradient-1: #d8c4b8;  /* Top right gradient */
    --bg-gradient-2: #7b4c48;  /* Bottom left gradient */
}
```

### Task: Adjust Animation Speed
**File:** `js/config.js`
```javascript
typewriter: {
    typingSpeed: 150,    // Lower = faster typing
    deletingSpeed: 75    // Lower = faster deleting
}
```

### Task: Change Tab Labels
**File:** `index.html` (lines ~38-42)
```html
<button class="tab-btn active" onclick="openTab(event, 'Games')">Games</button>
<button class="tab-btn" onclick="openTab(event, 'Systems')">Systems</button>
<button class="tab-btn" onclick="openTab(event, 'Mechanics')">Mechanics</button>
```

### Task: Add Your Email
**File:** `index.html` (Contact section)
```html
<p>Email: your-email@example.com</p>
<a href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@example.com">
```

### Task: Disable a Feature
**Example: Disable typewriter**
1. Comment out in `js/main.js`:
```javascript
// this.modules.typewriter = new TypewriterEffect(...);
// this.modules.typewriter.start();
```

## 🐛 Troubleshooting

### Nothing Shows Up
- ✅ Check browser console (F12) for errors
- ✅ Make sure you're using a local server (not file://)
- ✅ Verify all CSS and JS files are in correct folders

### Styles Look Wrong
- ✅ Check that `css/main.css` is loading
- ✅ Verify all @import statements in `main.css`
- ✅ Clear browser cache (Ctrl+Shift+R)

### JavaScript Not Working
- ✅ Ensure script tag has `type="module"`
- ✅ Check browser console for errors
- ✅ Verify all imports have correct file paths
- ✅ Use modern browser (Chrome, Firefox, Edge, Safari)

### Images Not Loading
- ✅ Check image URLs in project data attributes
- ✅ Verify images are accessible
- ✅ Check browser network tab (F12)

## 📚 Documentation Files

- `README.md` → Project overview & structure
- `ARCHITECTURE.md` → Complete architecture guide
- `SYSTEM-DIAGRAM.md` → Visual diagrams
- `MIGRATION-GUIDE.md` → How code was transformed
- `css/README.md` → CSS documentation
- `js/README.md` → JavaScript documentation

## 🎯 Next Steps

1. **Customize** → Make it yours with your colors, text, and projects
2. **Extend** → Add new features using the modular structure
3. **Learn** → Study the code to understand the patterns
4. **Share** → Deploy to GitHub Pages, Netlify, or Vercel

## 💡 Tips

- **Keep it modular**: When adding features, create new modules
- **Use variables**: Define repeated values in `variables.css`
- **Test often**: Check your changes in the browser frequently
- **Read docs**: Check the README files in each folder
- **Stay organized**: Follow the existing folder structure

## 🆘 Need Help?

Check these resources:
- Read `ARCHITECTURE.md` for detailed explanations
- Check `MIGRATION-GUIDE.md` for code examples
- Look at existing modules for patterns
- Review documentation in each folder

## ✅ Quick Checklist

Before deploying:
- [ ] Updated personal information
- [ ] Changed colors to match your brand
- [ ] Added your projects
- [ ] Updated contact information
- [ ] Tested on mobile devices
- [ ] Checked all links work
- [ ] Verified images load
- [ ] Tested in different browsers

## 🚢 Deployment

### GitHub Pages
```bash
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Click Save
```

### Netlify
```bash
1. Drag project folder to netlify.com/drop
2. Done!
```

### Vercel
```bash
npx vercel
# Follow prompts
```

---

**Enjoy your modular portfolio! 🎉**
