# External Libraries Directory

This directory contains third-party JavaScript libraries used by Reado.

## Current Libraries

### PDF.js (Mozilla)
- **Files:** `pdf.min.js`, `pdf.worker.min.js`
- **Version:** Latest stable
- **Purpose:** Extract text from PDF documents
- **License:** Apache 2.0
- **Source:** https://mozilla.github.io/pdf.js/
- **Size:** ~500KB (combined)

**Usage:**
```javascript
pdfjsLib.getDocument(pdfData).promise.then(pdf => {
  // Extract text from PDF pages
});
```

### Mammoth.js
- **File:** `mammoth.browser.min.js`
- **Version:** Latest stable
- **Purpose:** Extract text from DOCX documents
- **License:** BSD 2-Clause
- **Source:** https://github.com/mwilliamson/mammoth.js
- **Size:** ~150KB

**Usage:**
```javascript
mammoth.extractRawText({ arrayBuffer: docxData })
  .then(result => {
    // Use extracted text
  });
```

## Library Verification

All libraries are:
- ✅ Minified for production
- ✅ Loaded locally (no CDN dependencies)
- ✅ Open source with permissive licenses
- ✅ Well-maintained and stable
- ✅ Browser-compatible (no Node.js dependencies)

## File Sizes

| Library | Size | Purpose |
|---------|------|---------|
| pdf.min.js | ~450KB | PDF parsing |
| pdf.worker.min.js | ~50KB | PDF worker thread |
| mammoth.browser.min.js | ~150KB | DOCX parsing |
| **Total** | **~650KB** | All libraries |

## Future Libraries (Optional)

### ONNXRuntime-Web
- **Purpose:** Run ONNX models in browser
- **Size:** ~2MB
- **Status:** Not included (optional enhancement)
- **Note:** Only needed if adding ONNX model support

### FFmpeg.js (Optional)
- **Purpose:** Audio format conversion (WAV to MP3)
- **Size:** ~20MB
- **Status:** Not included (complex, large)
- **Note:** Only needed for audio download feature

## Updating Libraries

To update a library:
1. Download latest minified version from official source
2. Replace existing file in this directory
3. Test all functionality that uses the library
4. Update version info in this README
5. Check for breaking changes in changelog

## License Compliance

All libraries used are:
- Open source
- Commercially usable
- No attribution required in UI (but credited here)
- Compatible with MIT license

## Notes

- Libraries are loaded via `<script>` tags in `index.html`
- No build process required
- All libraries work offline
- No external CDN dependencies (privacy-first)
