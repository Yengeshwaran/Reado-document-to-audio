// Understanding AI Module - Local ONNX-based document analysis
export class UnderstandingEngine {
    constructor() {
        this.initialized = false;
        this.useONNX = false; // Will be true when ONNX model is loaded
    }

    async initialize() {
        // For MVP, use rule-based understanding (no ONNX needed)
        // Future: Load MiniLM-L6-v2 ONNX model for semantic analysis
        this.initialized = true;
        console.log('Understanding Engine initialized (rule-based mode)');
    }

    async explainDocument(text) {
        try {
            if (!this.initialized) {
                await this.initialize();
            }

            // Validate input
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
                return {
                    success: false,
                    explanation: null,
                    error: 'No text provided for analysis'
                };
            }

            // Analyze document using rule-based approach
            const analysis = this.analyzeDocument(text);
            
            return {
                success: true,
                explanation: analysis,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                explanation: null,
                error: `Understanding analysis failed: ${error.message}`
            };
        }
    }

    analyzeDocument(text) {
        // Extract meaning, topics, themes, and intent
        const sentences = this.splitIntoSentences(text);
        const words = this.extractWords(text);
        
        // Analyze meaning
        const meaning = this.extractMeaning(text, sentences);
        
        // Extract topics
        const topics = this.extractTopics(words);
        
        // Identify themes
        const themes = this.identifyThemes(text, sentences);
        
        // Determine intent
        const intent = this.determineIntent(text, sentences);
        
        return {
            meaning,
            topics,
            themes,
            intent,
            statistics: {
                wordCount: words.length,
                sentenceCount: sentences.length,
                avgWordsPerSentence: Math.round(words.length / sentences.length)
            }
        };
    }

    extractMeaning(text, sentences) {
        // Extract core meaning from first and last sentences
        const opening = sentences.slice(0, 2).join(' ');
        const closing = sentences.slice(-2).join(' ');
        
        return {
            summary: `This document discusses ${this.identifyMainSubject(text)}. ${opening}`,
            keyMessage: closing || opening,
            scope: sentences.length > 10 ? 'comprehensive' : 'concise'
        };
    }

    identifyMainSubject(text) {
        // Simple subject identification based on frequent nouns
        const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
        const frequency = {};
        
        words.forEach(word => {
            if (!this.isStopWord(word)) {
                frequency[word] = (frequency[word] || 0) + 1;
            }
        });
        
        const sorted = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
        
        return sorted.map(([word]) => word).join(', ') || 'various topics';
    }

    extractTopics(words) {
        // Extract main topics based on word frequency
        const frequency = {};
        
        words.forEach(word => {
            const lower = word.toLowerCase();
            if (lower.length > 4 && !this.isStopWord(lower)) {
                frequency[lower] = (frequency[lower] || 0) + 1;
            }
        });
        
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([word, count]) => ({
                topic: word,
                relevance: count > 5 ? 'high' : count > 2 ? 'medium' : 'low'
            }));
    }

    identifyThemes(text, sentences) {
        // Identify themes based on patterns
        const themes = [];
        const lowerText = text.toLowerCase();
        
        // Check for common themes
        const themePatterns = {
            'Technology': ['technology', 'software', 'digital', 'computer', 'system', 'data'],
            'Business': ['business', 'company', 'market', 'customer', 'revenue', 'strategy'],
            'Education': ['education', 'learning', 'student', 'teach', 'knowledge', 'skill'],
            'Science': ['research', 'study', 'experiment', 'theory', 'scientific', 'analysis'],
            'Health': ['health', 'medical', 'patient', 'treatment', 'disease', 'care'],
            'Environment': ['environment', 'climate', 'nature', 'sustainability', 'energy'],
            'Social': ['social', 'community', 'people', 'society', 'culture', 'human']
        };
        
        Object.entries(themePatterns).forEach(([theme, keywords]) => {
            const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
            if (matches >= 2) {
                themes.push({
                    theme,
                    confidence: matches >= 4 ? 'high' : 'medium'
                });
            }
        });
        
        return themes.length > 0 ? themes : [{ theme: 'General', confidence: 'medium' }];
    }

    determineIntent(text, sentences) {
        // Determine document intent
        const lowerText = text.toLowerCase();
        
        // Check for intent patterns
        if (lowerText.includes('how to') || lowerText.includes('guide') || lowerText.includes('tutorial')) {
            return {
                primary: 'Instructional',
                secondary: 'Educational',
                purpose: 'To teach or guide the reader through a process'
            };
        }
        
        if (lowerText.includes('research') || lowerText.includes('study') || lowerText.includes('findings')) {
            return {
                primary: 'Informative',
                secondary: 'Research-based',
                purpose: 'To present research findings or analysis'
            };
        }
        
        if (lowerText.includes('should') || lowerText.includes('must') || lowerText.includes('recommend')) {
            return {
                primary: 'Persuasive',
                secondary: 'Advisory',
                purpose: 'To convince or recommend a course of action'
            };
        }
        
        if (sentences.length > 20) {
            return {
                primary: 'Informative',
                secondary: 'Comprehensive',
                purpose: 'To provide detailed information on a topic'
            };
        }
        
        return {
            primary: 'Informative',
            secondary: 'General',
            purpose: 'To convey information to the reader'
        };
    }

    splitIntoSentences(text) {
        return text
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 10);
    }

    extractWords(text) {
        return text
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0);
    }

    isStopWord(word) {
        const stopWords = new Set([
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
            'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
            'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
            'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their'
        ]);
        return stopWords.has(word.toLowerCase());
    }
}
