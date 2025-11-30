// Reado Assistant - Q&A Chatbot Module
export class AssistantEngine {
    constructor() {
        this.model = null;
        this.context = '';
        this.chatHistory = [];
        this.isInitialized = false;
    }

    async initialize() {
        console.log('🤖 Initializing Reado Assistant...');
        
        // For now, we'll use a simple rule-based system
        // ONNX Q&A model integration can be added later
        this.isInitialized = true;
        
        console.log('✅ Reado Assistant initialized (rule-based mode)');
        return { success: true };
    }

    setContext(text) {
        this.context = text;
        console.log(`📄 Context set: ${text.length} characters`);
    }

    async answerQuestion(question) {
        if (!this.isInitialized) {
            return {
                success: false,
                answer: null,
                error: 'Assistant not initialized'
            };
        }

        if (!this.context) {
            return {
                success: true,
                answer: "I don't have any document context yet. Please upload a document first, and I'll be able to answer questions about it!",
                confidence: 1.0
            };
        }

        try {
            // Simple rule-based Q&A for now
            const answer = this.generateAnswer(question, this.context);
            
            // Add to chat history
            this.chatHistory.push({
                question,
                answer,
                timestamp: new Date()
            });

            return {
                success: true,
                answer,
                confidence: 0.8
            };
        } catch (error) {
            console.error('Assistant error:', error);
            return {
                success: false,
                answer: null,
                error: error.message
            };
        }
    }

    generateAnswer(question, context) {
        const lowerQuestion = question.toLowerCase();
        
        // Handle common question patterns
        if (lowerQuestion.includes('what') && lowerQuestion.includes('about')) {
            return this.extractTopicSummary(context);
        }
        
        if (lowerQuestion.includes('how many')) {
            return this.extractCounts(context, lowerQuestion);
        }
        
        if (lowerQuestion.includes('who') || lowerQuestion.includes('when') || lowerQuestion.includes('where')) {
            return this.extractSpecificInfo(context, lowerQuestion);
        }
        
        if (lowerQuestion.includes('summary') || lowerQuestion.includes('summarize')) {
            return this.extractSummary(context);
        }
        
        if (lowerQuestion.includes('main point') || lowerQuestion.includes('key point')) {
            return this.extractKeyPoints(context);
        }
        
        // Default: try to find relevant sentences
        return this.findRelevantSentences(question, context);
    }

    extractTopicSummary(context) {
        const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
        if (sentences.length === 0) return "I couldn't find enough information in the document.";
        
        // Return first few sentences as a basic summary
        return sentences.slice(0, 3).join('. ').trim() + '.';
    }

    extractCounts(context, question) {
        const words = context.split(/\s+/).length;
        const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = context.split(/\n\n+/).filter(p => p.trim().length > 0).length;
        
        if (question.includes('word')) {
            return `The document contains approximately ${words.toLocaleString()} words.`;
        }
        if (question.includes('sentence')) {
            return `The document contains approximately ${sentences} sentences.`;
        }
        if (question.includes('paragraph')) {
            return `The document contains approximately ${paragraphs} paragraphs.`;
        }
        
        return `The document contains approximately ${words.toLocaleString()} words, ${sentences} sentences, and ${paragraphs} paragraphs.`;
    }

    extractSpecificInfo(context, question) {
        // Try to find sentences that might answer who/when/where questions
        const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const keywords = question.split(/\s+/).filter(w => w.length > 3);
        
        // Find sentences containing question keywords
        const relevantSentences = sentences.filter(sentence => {
            const lowerSentence = sentence.toLowerCase();
            return keywords.some(keyword => lowerSentence.includes(keyword.toLowerCase()));
        });
        
        if (relevantSentences.length > 0) {
            return relevantSentences.slice(0, 2).join('. ').trim() + '.';
        }
        
        return "I couldn't find specific information about that in the document. Try rephrasing your question or asking about the main topics.";
    }

    extractSummary(context) {
        const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
        if (sentences.length === 0) return "The document appears to be empty or too short to summarize.";
        
        // Return first 5 sentences as summary
        const summaryLength = Math.min(5, sentences.length);
        return sentences.slice(0, summaryLength).join('. ').trim() + '.';
    }

    extractKeyPoints(context) {
        const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
        if (sentences.length === 0) return "I couldn't extract key points from the document.";
        
        // Simple heuristic: longer sentences often contain more information
        const sortedSentences = sentences
            .map(s => ({ text: s.trim(), length: s.trim().split(/\s+/).length }))
            .sort((a, b) => b.length - a.length)
            .slice(0, 3)
            .map(s => s.text);
        
        return "Here are the main points:\n\n" + sortedSentences.map((s, i) => `${i + 1}. ${s}`).join('\n\n');
    }

    findRelevantSentences(question, context) {
        const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const questionWords = question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        
        // Score sentences based on keyword matches
        const scoredSentences = sentences.map(sentence => {
            const lowerSentence = sentence.toLowerCase();
            const score = questionWords.reduce((acc, word) => {
                return acc + (lowerSentence.includes(word) ? 1 : 0);
            }, 0);
            return { text: sentence.trim(), score };
        });
        
        // Get top 2 sentences
        const topSentences = scoredSentences
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map(s => s.text);
        
        if (topSentences.length > 0) {
            return topSentences.join('. ') + '.';
        }
        
        return "I couldn't find information directly related to your question in the document. Try asking about the main topics, summary, or key points.";
    }

    getChatHistory() {
        return this.chatHistory;
    }

    clearHistory() {
        this.chatHistory = [];
    }
}
