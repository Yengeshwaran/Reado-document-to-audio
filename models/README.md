# ONNX Models Directory

This directory is organized for local ONNX models to enable advanced AI features in Reado.

## Current Status

Reado v3.0 uses **rule-based and extractive algorithms** that don't require ONNX models:
- ✅ Extractive summarization (word frequency + sentence scoring)
- ✅ Rule-based Q&A assistant (pattern matching)
- ✅ Key notes extraction (TF-IDF style)
- ✅ Document understanding (statistical analysis)

This ensures:
- Zero external dependencies
- Instant functionality
- Complete privacy (no model downloads)
- Works offline immediately

## Directory Structure

```
models/
├── README.md (this file)
├── summarizer-model/     (Future: DistilBART or T5-small for summarization)
├── qna-model/            (Future: DistilBERT-QA for question answering)
└── minilm-model/         (Future: MiniLM for embeddings/similarity)
```

## Future Enhancement: ONNX Integration

### Summarization Model (Optional)
To add AI-powered summarization:
1. Download DistilBART-ONNX or T5-small-ONNX model
2. Create `models/summarizer-model/` directory
3. Place model files: `model.onnx`, `tokenizer.json`
4. Update `modules/summarizer.js` to load ONNX model
5. System will auto-detect and use ONNX, fallback to extractive if unavailable

**Recommended Model:** DistilBART-ONNX (~300MB)
**Source:** Hugging Face Model Hub

### Q&A Model (Optional)
To add AI-powered question answering:
1. Download DistilBERT-QA ONNX model
2. Create `models/qna-model/` directory
3. Place model files in directory
4. Update `modules/assistant.js` to load ONNX model
5. System will use ONNX for better answers

**Recommended Model:** DistilBERT-QA-ONNX (~250MB)
**Source:** Hugging Face Model Hub

### Embedding Model (Optional)
For semantic search and similarity:
1. Download MiniLM ONNX model
2. Create `models/minilm-model/` directory
3. Integrate with search/similarity features

**Recommended Model:** all-MiniLM-L6-v2 (~90MB)

## Benefits of Current Approach

✅ **Zero Setup:** Works immediately without downloads  
✅ **Privacy First:** No external model dependencies  
✅ **Offline Ready:** Fully functional without internet  
✅ **Fast Loading:** No large model files to load  
✅ **Extensible:** Easy to add ONNX models later  

## Model Integration Guide

When adding ONNX models:
1. Keep models in separate subdirectories
2. Include model source and license info
3. Implement graceful fallback if model fails
4. Test memory usage (models can be large)
5. Consider lazy loading (load only when needed)

## Notes

- All ONNX models are optional enhancements
- Current algorithms provide good baseline functionality
- ONNX integration can be added incrementally
- Always maintain fallback to rule-based/extractive methods
