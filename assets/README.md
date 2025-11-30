# 🎨 Reado Branding Assets

This folder contains all official branding assets for the Reado project.

## 📁 Files

### Logo Files

#### `reado-logo.svg` (1024x1024)
- **Purpose**: Main application logo
- **Usage**: Marketing materials, social media, documentation
- **Features**: 
  - Gradient background (Indigo to Purple)
  - Document with headphones illustration
  - Audio waveform visualization
  - Professional shadow effects
- **Format**: SVG (scalable vector)

#### `reado-app-icon.svg` (1024x1024)
- **Purpose**: App icon for various platforms
- **Usage**: PWA icon, desktop shortcuts, app stores
- **Features**:
  - Simplified version of main logo
  - Optimized for small sizes
  - Clear at all resolutions
- **Format**: SVG (scalable vector)

#### `reado-assistant.svg` (512x512)
- **Purpose**: Assistant/helper icon
- **Usage**: Tutorial screens, help sections, chatbot avatar
- **Features**:
  - Friendly face design
  - Gradient background
  - Antenna for AI/tech theme
- **Format**: SVG (scalable vector)

#### `favicon.svg` (64x64)
- **Purpose**: Browser favicon
- **Usage**: Browser tabs, bookmarks
- **Features**:
  - Minimal waveform design
  - Gradient background
  - Optimized for 16x16 to 64x64 display
- **Format**: SVG (scalable vector)
- **Linked in**: `index.html`, `landing.html`

## 🎨 Brand Colors

### Primary Gradient
- **Start**: `#4F46E5` (Indigo-600)
- **End**: `#7C3AED` (Purple-600)

### Accent Colors
- **Waveform**: `#FFB020` / `#FFC94D` (Amber/Gold)
- **White**: `#FFFFFF` (Pure white for contrast)
- **Shadow**: `#000000` with opacity (Subtle shadows)

## 📐 Design Guidelines

### Logo Usage

**DO:**
- ✅ Use on white or light backgrounds
- ✅ Maintain aspect ratio when scaling
- ✅ Ensure minimum size of 32x32 pixels
- ✅ Use SVG format for web
- ✅ Export to PNG for print (300 DPI)

**DON'T:**
- ❌ Distort or stretch the logo
- ❌ Change the gradient colors
- ❌ Add effects or filters
- ❌ Use on busy backgrounds
- ❌ Rotate or flip the logo

### Clear Space
Maintain clear space around the logo equal to 10% of the logo width on all sides.

### Minimum Sizes
- **Web**: 32x32 pixels
- **Print**: 0.5 inches (1.27 cm)
- **Favicon**: 16x16 pixels (auto-scaled from 64x64)

## 🖼️ Export Formats

### For Web
- **Primary**: SVG (included)
- **Fallback**: PNG at 2x resolution

### For Print
- **Format**: PDF or high-res PNG
- **Resolution**: 300 DPI minimum
- **Color Space**: CMYK for print, RGB for digital

### For Social Media
- **Twitter**: 400x400 PNG
- **Facebook**: 1200x1200 PNG
- **LinkedIn**: 300x300 PNG
- **GitHub**: 512x512 PNG

## 🔧 Technical Details

### SVG Specifications
- **Namespace**: `http://www.w3.org/2000/svg`
- **Version**: 1.1
- **Encoding**: UTF-8
- **Optimization**: Hand-optimized for minimal file size

### Gradient IDs
- `g1` - Main gradient (Indigo to Purple)
- `g` - Simple gradient (used in smaller icons)

### Filters
- `f1` - Gaussian blur for shadow effects

### Clip Paths
- `docClip` - Document shape clipping

## 📱 Platform-Specific Icons

### PWA Manifest Icons
Generate from `reado-app-icon.svg`:
- 192x192 PNG
- 512x512 PNG
- 1024x1024 PNG

### iOS Icons
Generate from `reado-app-icon.svg`:
- 180x180 PNG (iPhone)
- 167x167 PNG (iPad)
- 152x152 PNG (iPad)
- 120x120 PNG (iPhone)

### Android Icons
Generate from `reado-app-icon.svg`:
- 192x192 PNG (xxxhdpi)
- 144x144 PNG (xxhdpi)
- 96x96 PNG (xhdpi)
- 72x72 PNG (hdpi)
- 48x48 PNG (mdpi)

## 🎯 Usage Examples

### HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">

<!-- Logo in header -->
<img src="assets/reado-logo.svg" alt="Reado Logo" width="200">

<!-- App icon -->
<img src="assets/reado-app-icon.svg" alt="Reado" width="64">
```

### CSS
```css
.logo {
  background-image: url('../assets/reado-logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

### Markdown
```markdown
![Reado Logo](assets/reado-logo.svg)
```

## 📄 License

All branding assets are part of the Reado project and are licensed under the MIT License.

**Copyright © 2025 Reado**

You are free to:
- Use the assets in projects using Reado
- Modify for personal use
- Include in documentation and tutorials

You must:
- Maintain attribution to Reado
- Not claim the assets as your own
- Not use for competing products

## 🔄 Version History

### v1.0.0 (2025-11-30)
- Initial branding assets created
- Main logo with document and headphones
- App icon for various platforms
- Assistant icon for help features
- Favicon for browser tabs

## 📞 Contact

For branding questions or custom asset requests:
- Open an issue on GitHub
- Check the main README.md
- Review the STRUCTURE.md documentation

---

**Made with ❤️ for the Reado project**
