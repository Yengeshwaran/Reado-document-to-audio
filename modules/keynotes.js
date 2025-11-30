// Key Notes Generator Module
export class KeyNotesGenerator {
    constructor() {
        // Common stop words to filter out
        this.stopWords = new Set([
            'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
            'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
            'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
            'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how',
            'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
            'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
            'than', 'too', 'very', 'can', 'just', 'should', 'now'
        ]);
    }

    generateKeyNotes(text, count = 7) {
        try {
            // Validate input
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
                return {
                    success: false,
                    notes: [],
                    error: 'No text provided for key notes generation'
                };
            }

            // Split text into sentences
            const sentences = this.splitIntoSentences(text);
            
            if (sentences.length === 0) {
                return {
                    success: false,
                    notes: [],
                    error: 'No sentences found in text'
                };
            }

            // If text is very short, return all sentences
            if (sentences.length <= 5) {
                return {
                    success: true,
                    notes: sentences,
                    error: null
                };
            }

            // Calculate word frequencies
            const wordFrequencies = this.calculateWordFrequencies(text);
            
            // Score each sentence
            const scoredSentences = sentences.map((sentence, index) => ({
                sentence: sentence,
                score: this.scoreSentence(sentence, wordFrequencies, index, sentences.length),
                originalIndex: index
            }));

            // Sort by score (descending) and take top N
            scoredSentences.sort((a, b) => b.score - a.score);
            const topSentences = scoredSentences.slice(0, Math.min(count, 10));
            
            // Sort back to original order
            topSentences.sort((a, b) => a.originalIndex - b.originalIndex);
            
            // Extract just the sentences
            const keyNotes = topSentences.map(item => item.sentence);
            
            // Ensure we have between 5 and 10 notes
            const finalCount = Math.max(5, Math.min(keyNotes.length, 10));
            
            return {
                success: true,
                notes: keyNotes.slice(0, finalCount),
                error: null
            };
        } catch (error) {
            return {
                success: false,
                notes: [],
                error: `Key notes generation failed: ${error.message}`
            };
        }
    }

    splitIntoSentences(text) {
        // Split on sentence boundaries (., !, ?)
        const sentences = text
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 20); // Filter out very short fragments
        
        return sentences;
    }

    calculateWordFrequencies(text) {
        const words = text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ') // Remove punctuation
            .split(/\s+/)
            .filter(word => word.length > 3 && !this.stopWords.has(word));
        
        const frequencies = {};
        words.forEach(word => {
            frequencies[word] = (frequencies[word] || 0) + 1;
        });
        
        return frequencies;
    }

    scoreSentence(sentence, wordFrequencies, position, totalSentences) {
        // Tokenize sentence
        const words = sentence
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3 && !this.stopWords.has(word));
        
        // Calculate base score from word frequencies
        let score = 0;
        words.forEach(word => {
            score += wordFrequencies[word] || 0;
        });
        
        // Normalize by sentence length
        if (words.length > 0) {
            score = score / words.length;
        }
        
        // Boost score for sentences at the beginning (often contain key info)
        if (position < totalSentences * 0.2) {
            score *= 1.3;
        }
        
        // Boost score for sentences at the end (often contain conclusions)
        if (position > totalSentences * 0.8) {
            score *= 1.2;
        }
        
        // Boost score for longer sentences (more content)
        if (words.length > 10) {
            score *= 1.1;
        }
        
        return score;
    }
}
