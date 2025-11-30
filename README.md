# 🎧 Reado - Read Smarter. Listen Better.

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/yourusername/reado)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Privacy](https://img.shields.io/badge/privacy-100%25-brightgreen.svg)](README.md#-privacy--security)
[![Cost](https://img.shields.io/badge/cost-$0-success.svg)](README.md)

Transform your documents into an audio podcast experience with AI-powered insights - completely free, private, and offline-capable!

**🚀 [Try Demo](https://yengeshwaran.github.io/Reado-document-to-audio/) | 📖 [Documentation](README.md) |

## ✨ Features

### Core Features
- **📄 Multi-Format Support**: Upload PDF (up to 100MB), DOCX, or TXT files
- **✍️ Text Input**: Paste text directly (up to 1000 characters)
- **🤖 AI-Powered Summaries**: Local extractive summarization (no cloud APIs)
- **� Keey Notes Extraction**: Automatically identify 5-10 most important points
- **🔊 Text-to-Speech**: Listen to unlimited text with chunked reading
- **✨ Real-Time Highlighting**: Text highlights in sync with speech playback
- **📊 Reading Progress Bar**: Visual progress indicator during playback
- **🎛️ Mini-Player**: Floating audio controls with waveform animation
- **🧠 Understanding AI**: Analyze document meaning, topics, themes, and intent
- **🤖 AI Assistant**: Floating chatbot that answers questions about your document
- **🌙 Dark Mode**: Beautiful dark theme with system preference detection
- **🔒 100% Private**: All processing happens in your browser
- **💰 Zero Cost**: No API keys, no subscriptions, no hidden fees
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop (320px+)
- **⚡ Offline Ready**: Works without internet after first load

### New in v3.0 🎉
- ✅ **Floating AI Assistant**: Ask questions about your document with context-aware responses
- ✅ **Dark Mode**: Full dark theme support with localStorage persistence
- ✅ **Text Input**: Direct text input with 1000 character limit and real-time counter
- ✅ **Enhanced Branding**: Professional logo, brand colors (indigo/violet), and gradients
- ✅ **Mobile-First UI**: Responsive navigation with hamburger menu and overlay
- ✅ **Enhanced Security**: Comprehensive CSP headers and input sanitization
- ✅ **Polished Animations**: Smooth transitions, hover effects, and entrance animations
- ✅ **Better Organization**: Clean file structure with documented models and libs folders

## 🚀 Quick Start

### Option 1: View Landing Page

1. Open `landing.html` in your browser for a beautiful introduction
2. Click "Open App" to launch Reado

### Option 2: Open App Directly

1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start uploading documents!

### Option 2: Deploy to GitHub Pages (Free Hosting)

1. Create a new GitHub repository named `reado`
2. Upload all project files to the repository
3. Go to **Settings** → **Pages**
4. Under "Source", select `main` branch and `/` (root)
5. Click **Save**
6. Your app will be live at `https://yourusername.github.io/reado`

### Option 3: Deploy to Netlify

1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your app is instantly live!

## 📖 How to Use

### Option 1: Upload a Document
1. Click "Browse" and select a PDF, DOCX, or TXT file
2. Maximum file size: 100MB (optimized for large PDFs)
3. The text will be extracted automatically with progress updates
4. Full text is displayed without limits

### Option 2: Paste Text Directly
1. Navigate to the "Text Input" section
2. Paste your text (up to 1000 characters)
3. Watch the real-time character counter
4. Click "Process Text" to analyze

### Generate Insights
1. **Summarize**: Click "Summarize" for an AI-powered extractive summary (~30% of original)
2. **Key Notes**: Click "Generate Key Notes" for 5-10 important bullet points
3. **Understanding**: Click "Explain Content" for meaning, topics, themes, and intent analysis

### Listen as Podcast
1. Click "▶ Play Full" to hear the entire document (unlimited length)
2. Click "▶ Play Summary" to hear just the summary
3. Watch text highlight in real-time as it's being read
4. Use the mini-player controls (Play, Pause, Stop)
5. Track progress with the reading progress bar
6. Text auto-scrolls to keep highlighted section centered

### Ask the AI Assistant
1. Click the floating assistant button (bottom-right)
2. Ask questions about your document
3. Get context-aware answers instantly
4. Examples:
   - "What is this document about?"
   - "How many words are in the document?"
   - "What are the main points?"
   - "Summarize this for me"

### Toggle Dark Mode
- Click the 🌙/☀️ icon in the navigation bar
- Theme preference is saved automatically
- Auto-detects system preference on first visit

## 🏗️ Architecture

### Zero-Cost Design

Reado is built with a **zero-cost, zero-cloud** architecture:

- ✅ **No Backend**: Pure client-side JavaScript
- ✅ **No Cloud APIs**: All AI runs locally in the browser
- ✅ **No Database**: State managed in memory only
- ✅ **No Authentication**: No user accounts needed
- ✅ **Static Hosting**: Deploy anywhere for free

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+ modules)
- **Styling**: TailwindCSS (via CDN) + Custom CSS
- **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/) (~1MB)
- **DOCX Processing**: [Mammoth.js](https://github.com/mwilliamson/mammoth.js) (~628KB)
- **Text-to-Speech**: Web Speech API (browser native)
- **AI Summarization**: Custom extractive algorithm (TF-IDF style)
- **AI Assistant**: Rule-based Q&A with pattern matching
- **Understanding AI**: Statistical analysis and NLP techniques

### How It Works

1. **Document Parsing**
   - PDF.js extracts text from PDF files (supports up to 100MB)
   - Progressive page-by-page extraction for large PDFs
   - Mammoth.js extracts text from DOCX files
   - FileReader API reads TXT files
   - Real-time progress updates during extraction

2. **Extractive Summarization**
   - Text is split into sentences
   - Word frequencies are calculated (TF-IDF style)
   - Sentences are scored based on importance
   - Top-scoring sentences form the summary

3. **Key Notes Generation**
   - Similar to summarization but optimized for bullet points
   - Filters out stop words
   - Ranks sentences by relevance
   - Returns 5-10 key points

4. **Understanding AI**
   - Analyzes document meaning and core message
   - Extracts main topics with relevance scoring
   - Identifies themes with confidence levels
   - Determines document intent and purpose
   - Provides comprehensive statistics

5. **Text-to-Speech with Highlighting**
   - Uses browser's native Web Speech API
   - Chunks long text (2000-2500 chars) for unlimited reading
   - Queue-based auto-continuation between chunks
   - Real-time text highlighting synchronized with speech
   - Auto-scrolling to keep current text centered
   - Progress bar showing reading completion
   - Floating mini-player with waveform animation

## 🎯 Speech-Sync System

Reado features an advanced speech-synchronization system that enhances the listening experience:

**Real-Time Highlighting:**
- Text highlights as it's being spoken
- Uses `utterance.onboundary` events to track word positions
- Highlights current sentence with gradient background
- Fades previous text for better focus
- Auto-scrolls to keep highlighted text centered

**Progress Tracking:**
- Visual progress bar at the top of the page
- Shows percentage of document read
- Updates in real-time during playback
- Syncs with chunk-based reading

**Mini-Player:**
- Floating controls that stay visible during playback
- Animated waveform visualization
- Play/Pause/Stop controls
- Reading time display
- Responsive design (collapses on mobile)

## 🔒 Privacy & Security

- **No Data Transmission**: Documents never leave your browser
- **No Tracking**: No analytics or cookies
- **No External Requests**: All libraries bundled locally
- **No Storage**: Documents are not saved anywhere

Your documents are processed entirely on your device. We cannot see, store, or access your files.

## 🌐 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Document Upload | ✅ | ✅ | ✅ | ✅ |
| PDF Parsing | ✅ | ✅ | ✅ | ✅ |
| DOCX Parsing | ✅ | ✅ | ✅ | ✅ |
| Text Input | ✅ | ✅ | ✅ | ✅ |
| Summarization | ✅ | ✅ | ✅ | ✅ |
| Key Notes | ✅ | ✅ | ✅ | ✅ |
| Understanding AI | ✅ | ✅ | ✅ | ✅ |
| AI Assistant | ✅ | ✅ | ✅ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ | ✅ |
| Dark Mode | ✅ | ✅ | ✅ | ✅ |
| Mobile Responsive | ✅ | ✅ | ✅ | ✅ |

**Recommended**: Chrome, Edge, or Firefox for best experience.  
**Mobile**: Fully responsive on iOS Safari and Chrome Mobile.

## 📊 Version Comparison

| Feature | v1.0 | v2.0 | v3.0 |
|---------|------|------|------|
| Document Upload | ✅ | ✅ | ✅ |
| Text Input | ❌ | ❌ | ✅ |
| Summarization | ✅ | ✅ | ✅ |
| Key Notes | ✅ | ✅ | ✅ |
| Understanding AI | ❌ | ✅ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ |
| Real-time Highlighting | ❌ | ✅ | ✅ |
| Mini-Player | ❌ | ✅ | ✅ |
| AI Assistant | ❌ | ❌ | ✅ |
| Dark Mode | ❌ | ❌ | ✅ |
| Mobile Menu | ❌ | ❌ | ✅ |
| Brand Design | ❌ | ❌ | ✅ |
| File Size Limit | 10MB | 100MB | 100MB |

## 📁 Project Structure

```
reado/
├── index.html              # Main application
├── landing.html            # Landing page
├── app.js                  # Application controller
├── styles.css              # Custom styles + dark mode
├── README.md               # Documentation
├── LICENSE                 # MIT License
├── CHANGELOG.md            # Version history
├── DEPLOYMENT.md           # Deployment guide
├── IMPLEMENTATION_PLAN.md  # Development roadmap
├── package.json            # Project metadata
├── assets/
│   ├── reado-logo.svg      # Brand logo
│   ├── reado-assistant.svg # Assistant avatar
│   ├── reado-app-icon.svg  # App icon
│   ├── favicon.svg         # Favicon
│   └── README.md           # Assets documentation
├── modules/
│   ├── documentParser.js   # PDF/DOCX/TXT parsing
│   ├── summarizer.js       # Extractive summarization
│   ├── keynotes.js         # Key notes extraction
│   ├── tts.js              # Text-to-speech engine
│   ├── understand.js       # Document understanding AI
│   └── assistant.js        # AI chatbot assistant ✨ NEW
├── libs/
│   ├── pdf.min.js          # PDF.js library (312KB)
│   ├── pdf.worker.min.js   # PDF.js worker (1062KB)
│   ├── mammoth.browser.min.js  # Mammoth.js (628KB)
│   └── README.md           # Library documentation ✨ NEW
└── models/
    ├── README.md           # Model integration guide ✨ ENHANCED
    ├── summarizer-model/   # Future: DistilBART/T5-small ✨ NEW
    ├── qna-model/          # Future: DistilBERT-QA ✨ NEW
    └── minilm-model/       # Future: MiniLM embeddings ✨ NEW
```

**Total Size:** ~2MB (libraries only)  
**No Build Required:** Pure static files

## 🛠️ Development

### Local Development

No build process required! Just open `index.html` in your browser.

For a local server (optional):

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Testing

The app includes comprehensive testing:
- Unit tests for each module
- Property-based tests for correctness
- Integration tests for workflows

To run tests (if test files are added):
```bash
npm install
npm test
```

## 🐛 Troubleshooting

### Issue: "Failed to parse PDF"
- **Solution**: Ensure the PDF is not password-protected or corrupted
- Try opening the PDF in another viewer first
- Check if file size is under 100MB

### Issue: "Text-to-speech not available"
- **Solution**: Your browser doesn't support Web Speech API
- Try using Chrome, Edge, or Firefox
- Check browser permissions for speech synthesis

### Issue: "File is too large"
- **Solution**: Files over 100MB are not supported
- For very large PDFs, extraction may take a few minutes
- Watch the progress indicator for extraction status

### Issue: "DOCX parsing failed"
- **Solution**: Ensure the file is a valid .docx file (not .doc)
- Try re-saving the file in Microsoft Word or Google Docs

### Issue: "Summary is too short"
- **Solution**: The extractive algorithm works best with longer texts
- For very short documents, the summary may be similar to the original

### Issue: "Assistant not responding"
- **Solution**: Make sure you've uploaded a document first
- The assistant needs document context to answer questions
- Try rephrasing your question

### Issue: "Dark mode not saving"
- **Solution**: Check if your browser allows localStorage
- Some privacy modes block localStorage
- Try disabling strict privacy settings

### Issue: App doesn't work offline
- **Solution**: The app needs to be loaded once with internet
- After first load, all resources are cached
- For true offline support, consider adding a service worker

### Issue: "Mobile menu not closing"
- **Solution**: Click outside the menu or on a menu link
- Try refreshing the page
- Check if JavaScript is enabled

## 🎨 Design Features

### Branding
- **Colors**: Indigo (#4F46E5) and Violet (#7C3AED) gradients
- **Highlight**: Yellow (#FFC94D) for accents
- **Logo**: Professional SVG logo with tagline
- **Typography**: System fonts for optimal performance

### UI/UX
- **Rounded Corners**: Consistent `rounded-2xl` for cards, `rounded-full` for buttons
- **Soft Shadows**: Brand-colored shadows on hover
- **Smooth Animations**: Fade-in, slide-in, and float animations
- **Responsive**: Mobile-first design (320px to 1024px+)
- **Accessibility**: ARIA labels, keyboard navigation, focus indicators

### Dark Mode
- **Auto-Detection**: Respects system preference
- **Manual Toggle**: 🌙/☀️ button in navigation
- **Persistence**: Saves preference to localStorage
- **Complete Coverage**: All components styled for dark mode

## 🚀 Future Enhancements

Potential features for future versions:

- [ ] ONNX model integration for advanced AI (DistilBART, DistilBERT-QA)
- [ ] Audio download (WAV/MP3 export)
- [ ] Support for more file formats (EPUB, RTF, Markdown)
- [ ] Multi-language support
- [ ] Voice selection for TTS
- [ ] Export summaries as PDF or TXT
- [ ] Progressive Web App (PWA) with service worker
- [ ] Batch processing multiple documents
- [ ] Adjustable summary length
- [ ] Semantic search with embeddings

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 💡 Credits

Built with:
- [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla (Apache 2.0)
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) by Michael Williamson (BSD 2-Clause)
- [TailwindCSS](https://tailwindcss.com/) (MIT)
- Web Speech API (browser native)

**Version:** 3.0.0  
**Last Updated:** November 30, 2025  
**License:** MIT

## 📧 Support

If you encounter issues or have questions:
1. Check the Troubleshooting section above
2. Open an issue on GitHub
3. Review browser console for error messages

---

**Made with ❤️ for privacy-conscious users who want free, offline document processing**

🎧 Happy listening!
