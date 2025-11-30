# 🚀 Deployment Guide for Reado v3.0

This guide provides step-by-step instructions for deploying Reado v3.0 to various platforms.

**Version:** 3.0.0  
**Last Updated:** November 30, 2025

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All files are present in the project directory
- [ ] Libraries are downloaded in the `libs/` folder (PDF.js, Mammoth.js)
- [ ] Assets are in the `assets/` folder (logo, favicon, icons)
- [ ] `index.html` and `landing.html` open correctly in a local browser
- [ ] No console errors when testing locally
- [ ] Dark mode toggle works
- [ ] AI Assistant opens and responds
- [ ] Mobile menu functions properly

## 📦 What Gets Deployed

Your deployment should include all files from the project:

```
reado/
├── index.html              # Main application
├── landing.html            # Landing page
├── app.js                  # Application controller
├── styles.css              # Styles + dark mode
├── README.md               # Documentation
├── LICENSE                 # MIT License
├── sample.txt              # Sample file (optional)
├── assets/
│   ├── reado-logo.svg      # Brand logo
│   ├── reado-assistant.svg # Assistant avatar
│   ├── reado-app-icon.svg  # App icon
│   ├── favicon.svg         # Favicon
│   └── README.md           # Asset docs
├── modules/
│   ├── documentParser.js   # PDF/DOCX/TXT parsing
│   ├── summarizer.js       # Summarization
│   ├── keynotes.js         # Key notes
│   ├── tts.js              # Text-to-speech
│   ├── understand.js       # Understanding AI
│   └── assistant.js        # AI Assistant ✨ NEW
├── libs/
│   ├── pdf.min.js          # PDF.js library
│   ├── pdf.worker.min.js   # PDF.js worker
│   ├── mammoth.browser.min.js  # Mammoth.js
│   └── README.md           # Library docs ✨ NEW
└── models/
    ├── README.md           # Model integration guide
    ├── summarizer-model/   # Future ONNX models
    ├── qna-model/          # Future Q&A models
    └── minilm-model/       # Future embeddings
```

**Total Size:** ~2MB (libraries only)  
**No Build Required:** Pure static files

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended)

**Pros**: Free, easy, automatic HTTPS, custom domain support
**Cons**: Public repository required (or GitHub Pro for private)

**Steps**:

1. **Create GitHub Repository**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Reado app"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR-USERNAME/reado.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select `main` branch
   - Select `/` (root) folder
   - Click **Save**
   - Wait 1-2 minutes for deployment

4. **Access Your App**
   - Your app will be live at: `https://YOUR-USERNAME.github.io/reado/`
   - GitHub will show the URL in the Pages settings

**Custom Domain** (Optional):
- Add a `CNAME` file with your domain
- Configure DNS settings with your domain provider
- See [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

### Option 2: Netlify

**Pros**: Free, drag-and-drop, automatic HTTPS, custom domain, continuous deployment
**Cons**: None for this use case

**Method A: Drag and Drop**

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag your project folder onto the page
3. Wait for upload and deployment
4. Your app is live! Netlify provides a random URL
5. (Optional) Change the site name in Site Settings

**Method B: Git Integration**

1. Push your code to GitHub (see Option 1, steps 1-2)
2. Go to [Netlify](https://app.netlify.com/)
3. Click **Add new site** → **Import an existing project**
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/` or `.`
6. Click **Deploy site**
7. Netlify will auto-deploy on every git push

**Custom Domain**:
- Go to Site Settings → Domain Management
- Click **Add custom domain**
- Follow DNS configuration instructions

---

### Option 3: Vercel

**Pros**: Free, fast, automatic HTTPS, custom domain, excellent performance
**Cons**: Requires account

**Steps**:

1. Push your code to GitHub (see Option 1, steps 1-2)
2. Go to [Vercel](https://vercel.com/)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click **Deploy**
7. Your app is live!

**Custom Domain**:
- Go to Project Settings → Domains
- Add your custom domain
- Configure DNS as instructed

---

### Option 4: Local File System

**Pros**: No internet required, instant, completely private
**Cons**: Not accessible to others, no URL

**Steps**:

1. Simply open `index.html` in your browser
2. That's it! The app works locally

**Note**: Some browsers may restrict certain features when using `file://` protocol. For best results, use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

---

### Option 5: Cloudflare Pages

**Pros**: Free, fast CDN, automatic HTTPS, unlimited bandwidth
**Cons**: Requires Cloudflare account

**Steps**:

1. Push your code to GitHub (see Option 1, steps 1-2)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click **Create a project**
4. Connect to GitHub and select your repository
5. Configure:
   - Build command: (leave empty)
   - Build output directory: `/`
6. Click **Save and Deploy**
7. Your app is live on Cloudflare's global CDN

---

### Option 6: Firebase Hosting

**Pros**: Free tier, Google infrastructure, custom domain
**Cons**: Requires Firebase CLI setup

**Steps**:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create new
   - Set public directory to `.` (current directory)
   - Configure as single-page app: No
   - Don't overwrite index.html

4. Deploy:
   ```bash
   firebase deploy
   ```

5. Your app is live at the provided Firebase URL

---

## 🔧 Post-Deployment Testing

After deployment, test these v3.0 features:

### Core Features
1. **Landing Page Test**
   - Visit `landing.html`
   - Verify logo displays
   - Click "Open App" button
   - Verify navigation to main app

2. **Upload Test**
   - Upload the included `sample.txt` file
   - Verify text extraction works
   - Check character count display

3. **Text Input Test** ✨ NEW
   - Navigate to "Text Input" section
   - Paste text (up to 1000 characters)
   - Verify character counter updates
   - Click "Process Text"
   - Verify text is processed

4. **Summarization Test**
   - Click "Summarize" button
   - Verify summary is generated
   - Check loading spinner appears

5. **Key Notes Test**
   - Click "Generate Key Notes"
   - Verify 5-10 bullet points appear

6. **Understanding AI Test**
   - Click "Explain Content"
   - Verify analysis displays (meaning, topics, themes, intent)

7. **TTS Test**
   - Click "Play Full" or "Play Summary"
   - Verify audio plays (if browser supports it)
   - Check mini-player appears
   - Verify progress bar updates
   - Test pause/stop controls

### v3.0 New Features
8. **AI Assistant Test** ✨ NEW
   - Click floating assistant button (bottom-right)
   - Verify chat panel opens
   - Ask a question (e.g., "What is this about?")
   - Verify assistant responds
   - Check typing indicator appears
   - Test on mobile (should be responsive)

9. **Dark Mode Test** ✨ NEW
   - Click 🌙 icon in navigation
   - Verify theme switches to dark
   - Check all components are styled
   - Refresh page - verify theme persists
   - Click ☀️ icon to switch back

10. **Mobile Navigation Test** ✨ NEW
    - Open on mobile device or resize browser
    - Click hamburger menu (☰)
    - Verify menu slides in
    - Check overlay backdrop appears
    - Click a link - verify menu closes
    - Click outside menu - verify it closes

11. **Branding Test** ✨ NEW
    - Verify logo appears in navigation
    - Check tagline: "Read Smarter. Listen Better."
    - Verify brand colors (indigo/violet gradients)
    - Check all buttons have gradient styling
    - Verify favicon appears in browser tab

### Responsive Design
12. **Mobile Test**
    - Test on various screen sizes:
      - iPhone SE (375px)
      - iPhone 12 Pro (390px)
      - iPad (768px)
      - Desktop (1024px+)
    - Verify buttons stack vertically on mobile
    - Check text containers are readable
    - Verify mini-player adapts to mobile

### Error Handling
13. **Error Handling Test**
    - Try uploading an unsupported file type
    - Verify error message displays
    - Check error can be dismissed
    - Verify error clears on new operation

## 🐛 Common Deployment Issues

### Issue: "404 Not Found" on GitHub Pages
**Solution**: 
- Ensure you selected the correct branch and folder
- Wait 2-3 minutes for deployment to complete
- Check that `index.html` is in the root directory
- Verify all folders (assets, modules, libs) are included

### Issue: Libraries not loading
**Solution**:
- Verify `libs/` folder is included in deployment
- Check browser console for 404 errors
- Ensure file paths are relative (not absolute)
- Verify PDF.js worker file is present

### Issue: Assets not displaying (logo, icons)
**Solution**:
- Verify `assets/` folder is included in deployment
- Check that SVG files are present
- Verify paths in HTML are correct: `assets/reado-logo.svg`
- Check browser console for 404 errors

### Issue: Dark mode not persisting
**Solution**:
- Verify localStorage is enabled in browser
- Check browser privacy settings
- Some browsers block localStorage in private/incognito mode
- Test in normal browsing mode

### Issue: AI Assistant not responding
**Solution**:
- Verify `modules/assistant.js` is deployed
- Check browser console for JavaScript errors
- Ensure document is uploaded/processed first
- Try refreshing the page

### Issue: Mobile menu not working
**Solution**:
- Verify JavaScript is enabled
- Check that `app.js` is loaded correctly
- Test in different browsers
- Clear browser cache and reload

### Issue: CORS errors
**Solution**:
- This shouldn't happen with static hosting
- If it does, ensure you're using a proper web server (not file://)
- GitHub Pages, Netlify, Vercel all handle CORS correctly

### Issue: TTS not working
**Solution**:
- This is browser-dependent, not deployment-dependent
- Test in Chrome, Edge, or Firefox
- HTTPS is required for some browsers (GitHub Pages provides this)
- Check browser permissions for speech synthesis

### Issue: Styles not applying
**Solution**:
- Verify `styles.css` is deployed
- Check TailwindCSS CDN is loading
- Clear browser cache
- Check browser console for CSS errors

## 📊 Monitoring Your Deployment

### GitHub Pages
- Check deployment status in Actions tab
- View traffic in Insights → Traffic

### Netlify
- View deployment logs in Deploys tab
- Check analytics in Analytics tab (if enabled)

### Vercel
- View deployment logs in Deployments tab
- Check analytics in Analytics tab

## 🔄 Updating Your Deployment

### GitHub Pages
```bash
git add .
git commit -m "Update description"
git push
# GitHub Pages auto-deploys
```

### Netlify (Git Integration)
```bash
git add .
git commit -m "Update description"
git push
# Netlify auto-deploys
```

### Vercel
```bash
git add .
git commit -m "Update description"
git push
# Vercel auto-deploys
```

## � Performaonce Optimization

### Recommended Settings

**GitHub Pages:**
- Enable HTTPS (automatic)
- Use custom domain for better branding
- Enable GitHub Actions for auto-deployment

**Netlify:**
- Enable asset optimization
- Configure custom headers for caching
- Use Netlify Analytics (optional)

**Vercel:**
- Enable Edge Network (automatic)
- Configure custom headers
- Use Vercel Analytics (optional)

### Caching Headers (Optional)

For better performance, configure these headers:

```
# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/libs/*
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML for 1 hour
/*.html
  Cache-Control: public, max-age=3600

# Cache CSS/JS for 1 day
/*.css
  Cache-Control: public, max-age=86400

/*.js
  Cache-Control: public, max-age=86400
```

## 📊 Analytics (Optional)

### Privacy-Friendly Analytics

Since Reado is privacy-focused, consider these privacy-friendly analytics:

1. **Plausible Analytics** - Privacy-focused, GDPR compliant
2. **Fathom Analytics** - Simple, privacy-focused
3. **Cloudflare Web Analytics** - Free, privacy-focused

**Note:** Avoid Google Analytics to maintain privacy promise.

## 🔒 Security Headers (Optional)

For enhanced security, add these headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Note:** CSP headers are already in the HTML files.

## 🌍 CDN Optimization

All major platforms provide CDN automatically:
- ✅ GitHub Pages - Fastly CDN
- ✅ Netlify - Global CDN
- ✅ Vercel - Edge Network
- ✅ Cloudflare Pages - Cloudflare CDN

No additional configuration needed!

## 📱 Progressive Web App (Future)

To make Reado installable as a PWA:

1. Add `manifest.json`:
```json
{
  "name": "Reado",
  "short_name": "Reado",
  "description": "Read Smarter. Listen Better.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#4F46E5",
  "theme_color": "#4F46E5",
  "icons": [
    {
      "src": "assets/reado-app-icon.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}
```

2. Add service worker for offline support
3. Link manifest in HTML

## 🎉 You're Done!

Your Reado v3.0 app is now live and accessible to anyone with the URL. Share it with friends, colleagues, or the world!

### What You've Deployed:
- ✅ Full document processing (PDF, DOCX, TXT)
- ✅ Text input (1000 characters)
- ✅ AI-powered summarization
- ✅ Key notes extraction
- ✅ Understanding AI
- ✅ Text-to-speech with highlighting
- ✅ AI Assistant chatbot
- ✅ Dark mode
- ✅ Mobile-responsive design
- ✅ 100% private processing

Remember: Since Reado processes everything client-side, your hosting costs will always be **$0** regardless of how many people use it. 🎊

## 📚 Additional Resources

- **README.md** - Complete user documentation
- **V3.0_RELEASE_NOTES.md** - What's new in v3.0
- **IMPLEMENTATION_PLAN.md** - Development roadmap
- **models/README.md** - ONNX model integration guide
- **libs/README.md** - Library documentation
- **assets/README.md** - Branding guidelines

---

**Need help?** Check the main README.md or open an issue on GitHub.

**Version:** 3.0.0 | **Last Updated:** November 30, 2025
