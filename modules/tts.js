// TTS Engine Module
export class TTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.isPaused = false;
        this.textQueue = [];
        this.onEndCallback = null;
        this.onProgressCallback = null;
        this.currentChunkIndex = 0;
        this.totalChunks = 0;
        this.fullText = '';
        this.currentCharIndex = 0;
        
        // Optimized chunk size for long-form reading (2000-2500 chars)
        this.maxChunkSize = 2200;
    }

    isAvailable() {
        return 'speechSynthesis' in window;
    }

    speak(text, onEnd = null, onProgress = null) {
        if (!this.isAvailable()) {
            console.error('Web Speech API not available');
            return;
        }

        // Stop any current speech
        this.stop();

        // Store callbacks
        this.onEndCallback = onEnd;
        this.onProgressCallback = onProgress;
        this.fullText = text;
        this.currentCharIndex = 0;

        // Split long text into optimized chunks for unlimited reading
        const chunks = this.splitTextIntoChunks(text);
        this.textQueue = [...chunks]; // Clone array
        this.totalChunks = chunks.length;
        this.currentChunkIndex = 0;
        
        console.log(`🎧 Starting TTS with ${this.totalChunks} chunks (${text.length} characters)`);
        
        // Start speaking the first chunk
        this.speakNextChunk();
    }

    splitTextIntoChunks(text) {
        // Split by sentences first
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        const chunks = [];
        let currentChunk = '';

        sentences.forEach(sentence => {
            if ((currentChunk + sentence).length > this.maxChunkSize) {
                if (currentChunk) {
                    chunks.push(currentChunk.trim());
                }
                currentChunk = sentence;
            } else {
                currentChunk += sentence;
            }
        });

        if (currentChunk) {
            chunks.push(currentChunk.trim());
        }

        return chunks;
    }

    speakNextChunk() {
        if (this.textQueue.length === 0) {
            // All chunks spoken
            console.log('✅ TTS completed all chunks');
            this.currentChunkIndex = 0;
            this.totalChunks = 0;
            if (this.onEndCallback) {
                this.onEndCallback();
            }
            return;
        }

        const chunk = this.textQueue.shift();
        this.currentChunkIndex++;
        this.currentUtterance = new SpeechSynthesisUtterance(chunk);
        
        // Configure utterance
        this.currentUtterance.rate = 1.0;
        this.currentUtterance.pitch = 1.0;
        this.currentUtterance.volume = 1.0;

        // Track progress with boundary events for highlighting
        this.currentUtterance.onboundary = (event) => {
            if (event.name === 'word') {
                this.currentCharIndex += event.charIndex;
                
                // Report progress for highlighting
                if (this.onProgressCallback) {
                    this.onProgressCallback({
                        charIndex: this.currentCharIndex,
                        chunkIndex: this.currentChunkIndex,
                        totalChunks: this.totalChunks,
                        text: chunk,
                        wordIndex: event.charIndex
                    });
                }
            }
        };

        // Handle end of current chunk - auto-continue to next
        this.currentUtterance.onend = () => {
            console.log(`✅ Chunk ${this.currentChunkIndex}/${this.totalChunks} complete`);
            // Auto-continue to next chunk
            this.speakNextChunk();
        };

        // Handle errors
        this.currentUtterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.textQueue = []; // Clear queue on error
            if (this.onEndCallback) {
                this.onEndCallback();
            }
        };

        // Speak the chunk
        this.synth.speak(this.currentUtterance);
        
        console.log(`🔊 Speaking chunk ${this.currentChunkIndex}/${this.totalChunks}`);
    }

    pause() {
        if (this.isAvailable() && this.synth.speaking) {
            this.synth.pause();
            this.isPaused = true;
        }
    }

    resume() {
        if (this.isAvailable() && this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
        }
    }

    stop() {
        if (this.isAvailable()) {
            this.synth.cancel();
            this.textQueue = [];
            this.currentUtterance = null;
            this.isPaused = false;
            this.currentChunkIndex = 0;
            this.totalChunks = 0;
            this.currentCharIndex = 0;
            console.log('⏹ TTS stopped');
        }
    }

    isSpeaking() {
        return this.isAvailable() && (this.synth.speaking || this.synth.pending);
    }
    
    getProgress() {
        if (this.totalChunks === 0) return 0;
        return (this.currentChunkIndex / this.totalChunks) * 100;
    }
}
