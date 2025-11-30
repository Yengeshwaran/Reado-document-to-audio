// Summarizer Module
export class Summarizer {
    constructor() {
        this.initialized = false;
        this.useONNX = false; // Flag for ONNX model availability
    }

    async initialize() {
        // For MVP, we use extractive summarization (no ONNX needed)
        // This can be enhanced later with ONNX models
        this.initialized = true;
        console.log('Summarizer initialized with extractive algorithm');
    }

    async summarize(text) {
        try {
            if (!this.initialized) {
                await this.initialize();
            }

            // Validate input
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
                return {
                    success: false,
                    summary: null,
                    error: 'No text provided for summarization'
                };
            }

            // Use extractive summarization
            const summary = this.extractiveSummarize(text);
            
            return {
                success: true,
                summary: summary,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                summary: null,
                error: `Summarization failed: ${error.message}`
            };
        }
    }

    extractiveSummarize(text) {
        // Split into sentences
        const sentences = this.splitIntoSentences(text);
        
        if (sentences.length === 0) {
            return text;
        }

        // For very short texts, return as is
        if (sentences.length <= 3) {
            return text;
        }

        // Calculate target summary length (approximately 30% of original)
        const targetSentenceCount = Math.max(3, Math.ceil(sentences.length * 0.3));
        
        // Calculate word frequencies
        const wordFrequencies = this.calculateWordFrequencies(text);
        
        // Score sentences
        const scoredSentences = sentences.map((sentence, index) => ({
            sentence: sentence,
            score: this.scoreSentence(sentence, wordFrequencies, index, sentences.length),
            originalIndex: index
        }));

        // Sort by score and take top sentences
        scoredSentences.sort((a, b) => b.score - a.score);
        const topSentences = scoredSentences.slice(0, targetSentenceCount);
        
        // Sort back to original order
        topSentences.sort((a, b) => a.originalIndex - b.originalIndex);
        
        // Join sentences
        const summary = topSentences.map(item => item.sentence).join('. ') + '.';
        
        return summary;
    }

    splitIntoSentences(text) {
        // Split on sentence boundaries
        const sentences = text
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 10); // Filter very short fragments
        
        return sentences;
    }

    calculateWordFrequencies(text) {
        // Common stop words
        const stopWords = new Set([
            'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
            'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
            'to', 'was', 'will', 'with', 'this', 'but', 'they', 'have',
            'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how'
        ]);

        const words = text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3 && !stopWords.has(word));
        
        const frequencies = {};
        words.forEach(word => {
            frequencies[word] = (frequencies[word] || 0) + 1;
        });
        
        // Normalize frequencies
        const maxFreq = Math.max(...Object.values(frequencies));
        Object.keys(frequencies).forEach(word => {
            frequencies[word] = frequencies[word] / maxFreq;
        });
        
        return frequencies;
    }

    scoreSentence(sentence, wordFrequencies, position, totalSentences) {
        // Tokenize sentence
        const words = sentence
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3);
        
        if (words.length === 0) {
            return 0;
        }

        // Calculate average word frequency score
        let score = 0;
        words.forEach(word => {
            score += wordFrequencies[word] || 0;
        });
        score = score / words.length;
        
        // Position-based boosting
        // First sentences often contain important info
        if (position < totalSentences * 0.15) {
            score *= 1.5;
        }
        
        // Last sentences often contain conclusions
        if (position > totalSentences * 0.85) {
            score *= 1.3;
        }
        
        // Sentence length factor (prefer medium-length sentences)
        if (words.length >= 8 && words.length <= 25) {
            score *= 1.2;
        }
        
        return score;
    }
}
