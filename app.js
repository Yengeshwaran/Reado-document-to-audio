// App Controller
import { DocumentParser } from './modules/documentParser.js';
import { Summarizer } from './modules/summarizer.js';
import { KeyNotesGenerator } from './modules/keynotes.js';
import { TTSEngine } from './modules/tts.js';
import { UnderstandingEngine } from './modules/understand.js';
import { AssistantEngine } from './modules/assistant.js';

// Application state
const appState = {
    currentFile: null,
    extractedText: '',
    summary: '',
    keyNotes: [],
    isProcessing: false,
    isSpeaking: false,
    error: null
};

// Module instances
let documentParser;
let summarizer;
let keyNotesGenerator;
let ttsEngine;
let understandingEngine;
let assistantEngine;

// DOM elements
let elements = {};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎧 Reado app initializing...');
    
    try {
        // Initialize modules
        documentParser = new DocumentParser();
        summarizer = new Summarizer();
        keyNotesGenerator = new KeyNotesGenerator();
        ttsEngine = new TTSEngine();
        understandingEngine = new UnderstandingEngine();
        assistantEngine = new AssistantEngine();
        
        // Initialize async modules
        await summarizer.initialize();
        await understandingEngine.initialize();
        await assistantEngine.initialize();
        
        // Get DOM element references
        initializeDOMElements();
        
        // Set up event listeners
        setupEventListeners();
        
        // Check TTS availability
        checkTTSAvailability();
        
        console.log('✅ Reado app initialized successfully');
    } catch (error) {
        console.error('Failed to initialize app:', error);
        displayError('Failed to initialize application. Please refresh the page.');
    }
});

function initializeDOMElements() {
    elements = {
        fileInput: document.getElementById('fileInput'),
        fileInfo: document.getElementById('fileInfo'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        errorContainer: document.getElementById('errorContainer'),
        errorMessage: document.getElementById('errorMessage'),
        dismissError: document.getElementById('dismissError'),
        fullTextPanel: document.getElementById('fullTextPanel'),
        summaryPanel: document.getElementById('summaryPanel'),
        keyNotesPanel: document.getElementById('keyNotesPanel'),
        playFullBtn: document.getElementById('playFullBtn'),
        playSummaryBtn: document.getElementById('playSummaryBtn'),
        summarizeBtn: document.getElementById('summarizeBtn'),
        generateNotesBtn: document.getElementById('generateNotesBtn'),
        explainBtn: document.getElementById('explainBtn'),
        understandingPanel: document.getElementById('understandingPanel'),
        readingProgress: document.getElementById('readingProgress'),
        miniPlayer: document.getElementById('miniPlayer'),
        miniPlayerTime: document.getElementById('miniPlayerTime'),
        miniPlayerTitle: document.getElementById('miniPlayerTitle'),
        miniPlayPauseBtn: document.getElementById('miniPlayPauseBtn'),
        miniStopBtn: document.getElementById('miniStopBtn'),
        assistantBtn: document.getElementById('assistantBtn'),
        assistantPanel: document.getElementById('assistantPanel'),
        closeAssistantBtn: document.getElementById('closeAssistantBtn'),
        chatHistory: document.getElementById('chatHistory'),
        assistantInput: document.getElementById('assistantInput'),
        sendQuestionBtn: document.getElementById('sendQuestionBtn'),
        textInput: document.getElementById('textInput'),
        charCount: document.getElementById('charCount'),
        processTextBtn: document.getElementById('processTextBtn'),
        clearTextBtn: document.getElementById('clearTextBtn')
    };
}

function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.toggle('hidden');
            }
        });
        
        // Close menu when clicking overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuOverlay.classList.add('hidden');
            });
        }
        
        // Close menu when clicking a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('hidden');
                }
            });
        });
    }
    
    // File upload
    elements.fileInput.addEventListener('change', handleFileUpload);
    
    // Error dismiss
    elements.dismissError.addEventListener('click', clearError);
    
    // Main buttons
    elements.summarizeBtn.addEventListener('click', handleSummarize);
    elements.generateNotesBtn.addEventListener('click', handleGenerateKeyNotes);
    elements.explainBtn.addEventListener('click', handleExplainContent);
    elements.playFullBtn.addEventListener('click', handlePlayFull);
    elements.playSummaryBtn.addEventListener('click', handlePlaySummary);
    
    // Mini-player controls
    elements.miniPlayPauseBtn.addEventListener('click', handleMiniPlayPause);
    elements.miniStopBtn.addEventListener('click', handleMiniStop);
    
    // Assistant controls
    elements.assistantBtn.addEventListener('click', toggleAssistant);
    elements.closeAssistantBtn.addEventListener('click', closeAssistant);
    elements.sendQuestionBtn.addEventListener('click', handleSendQuestion);
    elements.assistantInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendQuestion();
        }
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        // Load saved theme
        loadTheme();
    }
    
    // Text input controls
    elements.textInput.addEventListener('input', handleTextInputChange);
    elements.processTextBtn.addEventListener('click', handleProcessText);
    elements.clearTextBtn.addEventListener('click', handleClearText);
}

function checkTTSAvailability() {
    if (!ttsEngine.isAvailable()) {
        console.warn('Web Speech API not available');
        elements.playFullBtn.disabled = true;
        elements.playSummaryBtn.disabled = true;
        elements.playFullBtn.title = 'Text-to-speech not available in this browser';
        elements.playSummaryBtn.title = 'Text-to-speech not available in this browser';
    }
}

// File upload handler
async function handleFileUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    // Clear previous error
    clearError();
    
    // Validate file size (100MB limit for large PDFs)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
        displayError('File is too large. Please upload a file smaller than 100MB.');
        event.target.value = ''; // Clear input
        return;
    }
    
    // Update file info
    elements.fileInfo.textContent = `Selected: ${file.name} (${formatFileSize(file.size)})`;
    elements.fileInfo.classList.remove('hidden');
    
    // Show loading
    showLoading();
    
    // Reset state
    appState.currentFile = file;
    appState.extractedText = '';
    appState.summary = '';
    appState.keyNotes = [];
    
    // Reset UI
    elements.summaryPanel.innerHTML = '<p class="text-gray-400 italic">Click "Summarize" to generate a summary...</p>';
    elements.keyNotesPanel.innerHTML = '<p class="text-gray-400 italic">Click "Generate Key Notes" to extract key points...</p>';
    elements.summarizeBtn.disabled = true;
    elements.generateNotesBtn.disabled = true;
    elements.playFullBtn.disabled = true;
    elements.playSummaryBtn.disabled = true;
    
    try {
        // Parse the file with progress callback
        const result = await documentParser.parseFile(file, (progress) => {
            // Update loading message with progress
            const spinner = document.getElementById('loadingSpinner');
            if (spinner) {
                const progressText = spinner.querySelector('span');
                if (progressText) {
                    progressText.textContent = progress.message || 'Processing...';
                }
            }
        });
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        // Store extracted text
        appState.extractedText = result.text;
        
        // Display extracted text
        displayExtractedText(result.text);
        
        // Enable buttons
        elements.summarizeBtn.disabled = false;
        elements.generateNotesBtn.disabled = false;
        elements.explainBtn.disabled = false;
        if (ttsEngine.isAvailable()) {
            elements.playFullBtn.disabled = false;
        }
        
        console.log(`✅ Successfully extracted ${result.text.length} characters from ${file.name}`);
    } catch (error) {
        console.error('File processing error:', error);
        displayError(error.message || 'Failed to process file');
        event.target.value = ''; // Clear input
    } finally {
        hideLoading();
    }
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function displayExtractedText(text) {
    // Display full text without limits (supports unlimited length)
    elements.fullTextPanel.textContent = text;
    
    // Add character count info
    const infoText = document.createElement('p');
    infoText.className = 'text-gray-500 italic mt-2 text-sm';
    infoText.textContent = `📄 ${text.length.toLocaleString()} characters extracted`;
    elements.fullTextPanel.appendChild(infoText);
}

async function handleSummarize() {
    if (!appState.extractedText) {
        displayError('No text available to summarize. Please upload a document first.');
        return;
    }
    
    // Clear previous error
    clearError();
    
    // Show loading
    showLoading();
    
    try {
        // Generate summary
        const result = await summarizer.summarize(appState.extractedText);
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        // Store summary
        appState.summary = result.summary;
        
        // Display summary
        elements.summaryPanel.textContent = result.summary;
        
        // Enable play summary button
        if (ttsEngine.isAvailable()) {
            elements.playSummaryBtn.disabled = false;
        }
        
        console.log('✅ Summary generated successfully');
    } catch (error) {
        console.error('Summarization error:', error);
        displayError(error.message || 'Failed to generate summary');
    } finally {
        hideLoading();
    }
}

function handleGenerateKeyNotes() {
    if (!appState.extractedText) {
        displayError('No text available for key notes. Please upload a document first.');
        return;
    }
    
    // Clear previous error
    clearError();
    
    // Show loading
    showLoading();
    
    try {
        // Generate key notes
        const result = keyNotesGenerator.generateKeyNotes(appState.extractedText, 7);
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        // Store key notes
        appState.keyNotes = result.notes;
        
        // Display key notes
        displayKeyNotes(result.notes);
        
        console.log(`✅ Generated ${result.notes.length} key notes`);
    } catch (error) {
        console.error('Key notes generation error:', error);
        displayError(error.message || 'Failed to generate key notes');
    } finally {
        hideLoading();
    }
}

function displayKeyNotes(notes) {
    if (notes.length === 0) {
        elements.keyNotesPanel.innerHTML = '<p class="text-gray-400 italic">No key notes generated</p>';
        return;
    }
    
    // Create bullet list
    const ul = document.createElement('ul');
    ul.className = 'space-y-2';
    
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        ul.appendChild(li);
    });
    
    elements.keyNotesPanel.innerHTML = '';
    elements.keyNotesPanel.appendChild(ul);
}

async function handleExplainContent() {
    if (!appState.extractedText) {
        displayError('No text available to analyze. Please upload a document first.');
        return;
    }
    
    // Clear previous error
    clearError();
    
    // Show loading
    showLoading();
    
    try {
        // Analyze document
        const result = await understandingEngine.explainDocument(appState.extractedText);
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        // Display understanding
        displayUnderstanding(result.explanation);
        
        console.log('✅ Document understanding generated successfully');
    } catch (error) {
        console.error('Understanding error:', error);
        displayError(error.message || 'Failed to analyze document');
    } finally {
        hideLoading();
    }
}

function displayUnderstanding(explanation) {
    if (!explanation) {
        elements.understandingPanel.innerHTML = '<p class="text-gray-400 italic">No analysis available</p>';
        return;
    }
    
    // Create structured display
    const container = document.createElement('div');
    container.className = 'space-y-4';
    
    // Meaning section
    const meaningSection = document.createElement('div');
    meaningSection.innerHTML = `
        <h3 class="font-semibold text-lg text-indigo-700 mb-2">📖 Meaning</h3>
        <p class="text-gray-700 mb-2">${explanation.meaning.summary}</p>
        <p class="text-sm text-gray-600 italic">"${explanation.meaning.keyMessage}"</p>
        <p class="text-xs text-gray-500 mt-1">Scope: ${explanation.meaning.scope}</p>
    `;
    container.appendChild(meaningSection);
    
    // Topics section
    if (explanation.topics && explanation.topics.length > 0) {
        const topicsSection = document.createElement('div');
        topicsSection.innerHTML = '<h3 class="font-semibold text-lg text-indigo-700 mb-2">🏷️ Topics</h3>';
        const topicsList = document.createElement('div');
        topicsList.className = 'flex flex-wrap gap-2';
        explanation.topics.forEach(({ topic, relevance }) => {
            const badge = document.createElement('span');
            badge.className = `px-3 py-1 rounded-full text-sm ${
                relevance === 'high' ? 'bg-indigo-100 text-indigo-800' :
                relevance === 'medium' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
            }`;
            badge.textContent = topic;
            topicsList.appendChild(badge);
        });
        topicsSection.appendChild(topicsList);
        container.appendChild(topicsSection);
    }
    
    // Themes section
    if (explanation.themes && explanation.themes.length > 0) {
        const themesSection = document.createElement('div');
        themesSection.innerHTML = '<h3 class="font-semibold text-lg text-indigo-700 mb-2">🎨 Themes</h3>';
        const themesList = document.createElement('div');
        themesList.className = 'space-y-1';
        explanation.themes.forEach(({ theme, confidence }) => {
            const themeItem = document.createElement('p');
            themeItem.className = 'text-gray-700';
            themeItem.innerHTML = `<span class="font-medium">${theme}</span> <span class="text-xs text-gray-500">(${confidence} confidence)</span>`;
            themesList.appendChild(themeItem);
        });
        themesSection.appendChild(themesList);
        container.appendChild(themesSection);
    }
    
    // Intent section
    if (explanation.intent) {
        const intentSection = document.createElement('div');
        intentSection.innerHTML = `
            <h3 class="font-semibold text-lg text-indigo-700 mb-2">🎯 Intent</h3>
            <p class="text-gray-700"><span class="font-medium">Primary:</span> ${explanation.intent.primary}</p>
            <p class="text-gray-700"><span class="font-medium">Secondary:</span> ${explanation.intent.secondary}</p>
            <p class="text-sm text-gray-600 mt-1">${explanation.intent.purpose}</p>
        `;
        container.appendChild(intentSection);
    }
    
    // Statistics
    if (explanation.statistics) {
        const statsSection = document.createElement('div');
        statsSection.innerHTML = `
            <h3 class="font-semibold text-lg text-indigo-700 mb-2">📊 Statistics</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p class="text-2xl font-bold text-indigo-600">${explanation.statistics.wordCount.toLocaleString()}</p>
                    <p class="text-xs text-gray-600">Words</p>
                </div>
                <div>
                    <p class="text-2xl font-bold text-indigo-600">${explanation.statistics.sentenceCount}</p>
                    <p class="text-xs text-gray-600">Sentences</p>
                </div>
                <div>
                    <p class="text-2xl font-bold text-indigo-600">${explanation.statistics.avgWordsPerSentence}</p>
                    <p class="text-xs text-gray-600">Avg Words/Sentence</p>
                </div>
            </div>
        `;
        container.appendChild(statsSection);
    }
    
    elements.understandingPanel.innerHTML = '';
    elements.understandingPanel.appendChild(container);
}

function handlePlayFull() {
    if (!appState.extractedText) {
        displayError('No text available to play. Please upload a document first.');
        return;
    }
    
    if (!ttsEngine.isAvailable()) {
        displayError('Text-to-speech is not available in your browser.');
        return;
    }
    
    // Clear previous error
    clearError();
    
    // If already speaking, stop
    if (ttsEngine.isSpeaking()) {
        ttsEngine.stop();
        updatePlayButtonState(elements.playFullBtn, false);
        hideMiniPlayer();
        updateProgressBar(0);
        return;
    }
    
    // Update button state
    updatePlayButtonState(elements.playFullBtn, true);
    showMiniPlayer('Full Document');
    
    // Speak the full text with progress tracking
    ttsEngine.speak(
        appState.extractedText,
        () => {
            // On end callback
            updatePlayButtonState(elements.playFullBtn, false);
            hideMiniPlayer();
            updateProgressBar(0);
        },
        (progress) => {
            // On progress callback for progress bar
            updateProgressBar(ttsEngine.getProgress());
        }
    );
}

function handlePlaySummary() {
    if (!appState.summary) {
        displayError('No summary available to play. Please generate a summary first.');
        return;
    }
    
    if (!ttsEngine.isAvailable()) {
        displayError('Text-to-speech is not available in your browser.');
        return;
    }
    
    // Clear previous error
    clearError();
    
    // If already speaking, stop
    if (ttsEngine.isSpeaking()) {
        ttsEngine.stop();
        updatePlayButtonState(elements.playSummaryBtn, false);
        hideMiniPlayer();
        updateProgressBar(0);
        return;
    }
    
    // Update button state
    updatePlayButtonState(elements.playSummaryBtn, true);
    showMiniPlayer('Summary');
    
    // Speak the summary with progress tracking
    ttsEngine.speak(
        appState.summary,
        () => {
            // On end callback
            updatePlayButtonState(elements.playSummaryBtn, false);
            hideMiniPlayer();
            updateProgressBar(0);
        },
        (progress) => {
            // On progress callback for progress bar
            updateProgressBar(ttsEngine.getProgress());
        }
    );
}

function updatePlayButtonState(button, isPlaying) {
    if (isPlaying) {
        button.innerHTML = '<span>⏸</span> Pause';
        button.classList.add('bg-red-600', 'hover:bg-red-700');
        button.classList.remove('btn-reado-primary');
    } else {
        button.innerHTML = '<span>▶</span> ' + (button.id === 'playFullBtn' ? 'Play Full' : 'Play Summary');
        button.classList.remove('bg-red-600', 'hover:bg-red-700');
        button.classList.add('btn-reado-primary');
    }
}

function displayError(message) {
    appState.error = message;
    elements.errorMessage.textContent = message;
    elements.errorContainer.classList.remove('hidden');
}

function clearError() {
    appState.error = null;
    elements.errorContainer.classList.add('hidden');
    elements.errorMessage.textContent = '';
}

function showLoading() {
    appState.isProcessing = true;
    elements.loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    appState.isProcessing = false;
    elements.loadingSpinner.classList.add('hidden');
}


// Mini-player functions
function showMiniPlayer(title) {
    elements.miniPlayer.classList.remove('hidden');
    elements.miniPlayerTitle.textContent = `Playing: ${title}`;
    appState.isSpeaking = true;
}

function hideMiniPlayer() {
    elements.miniPlayer.classList.add('hidden');
    appState.isSpeaking = false;
}

function handleMiniPlayPause() {
    if (ttsEngine.isPaused) {
        ttsEngine.resume();
        elements.miniPlayPauseBtn.innerHTML = '⏸ Pause';
    } else {
        ttsEngine.pause();
        elements.miniPlayPauseBtn.innerHTML = '▶ Resume';
    }
}

function handleMiniStop() {
    ttsEngine.stop();
    updatePlayButtonState(elements.playFullBtn, false);
    updatePlayButtonState(elements.playSummaryBtn, false);
    hideMiniPlayer();
    updateProgressBar(0);
}

// Progress bar function
function updateProgressBar(percentage) {
    if (elements.readingProgress) {
        elements.readingProgress.style.width = `${percentage}%`;
    }
}

// Text highlighting functions
function highlightCurrentText(container, charIndex) {
    if (!container || charIndex === undefined) return;
    
    const text = container.textContent;
    if (!text) return;
    
    // Find sentence boundaries around current position
    const sentenceStart = text.lastIndexOf('.', charIndex) + 1;
    const sentenceEnd = text.indexOf('.', charIndex);
    
    if (sentenceStart === -1 || sentenceEnd === -1) return;
    
    // Clear previous highlighting
    clearHighlighting(container);
    
    // Split text into parts
    const before = text.substring(0, sentenceStart);
    const current = text.substring(sentenceStart, sentenceEnd + 1);
    const after = text.substring(sentenceEnd + 1);
    
    // Rebuild with highlighting
    container.innerHTML = '';
    
    if (before) {
        const beforeSpan = document.createElement('span');
        beforeSpan.className = 'faded';
        beforeSpan.textContent = before;
        container.appendChild(beforeSpan);
    }
    
    if (current) {
        const currentSpan = document.createElement('span');
        currentSpan.className = 'current-highlight';
        currentSpan.textContent = current;
        container.appendChild(currentSpan);
        
        // Auto-scroll to keep highlighted text centered
        currentSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    if (after) {
        const afterSpan = document.createElement('span');
        afterSpan.textContent = after;
        container.appendChild(afterSpan);
    }
}

function clearHighlighting(container) {
    if (!container) return;
    
    // Remove all highlighting classes
    const text = container.textContent;
    container.innerHTML = '';
    container.textContent = text;
}

// Assistant functions
function toggleAssistant() {
    elements.assistantPanel.classList.toggle('hidden');
    
    // Set context if we have extracted text
    if (appState.extractedText && assistantEngine) {
        assistantEngine.setContext(appState.extractedText);
    }
}

function closeAssistant() {
    elements.assistantPanel.classList.add('hidden');
}

async function handleSendQuestion() {
    const rawQuestion = elements.assistantInput.value.trim();
    
    if (!rawQuestion) {
        return;
    }
    
    // Sanitize input
    const question = sanitizeInput(rawQuestion);
    
    if (!question) {
        return;
    }
    
    // Clear input
    elements.assistantInput.value = '';
    
    // Add user message to chat
    addMessageToChat(question, 'user');
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    try {
        // Get answer from assistant
        const result = await assistantEngine.answerQuestion(question);
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        if (result.success) {
            // Add assistant response to chat
            addMessageToChat(result.answer, 'assistant');
        } else {
            addMessageToChat('Sorry, I encountered an error. Please try again.', 'assistant');
        }
    } catch (error) {
        console.error('Assistant error:', error);
        removeTypingIndicator(typingId);
        addMessageToChat('Sorry, something went wrong. Please try again.', 'assistant');
    }
}

function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `assistant-message ${sender === 'user' ? 'user-message' : ''}`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="user-avatar-small">👤</div>
            <div class="message-bubble user-bubble">${escapeHtml(message)}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="assistant-avatar-small">
                <img src="assets/reado-assistant.svg" alt="Assistant">
            </div>
            <div class="message-bubble assistant-bubble">${escapeHtml(message)}</div>
        `;
    }
    
    elements.chatHistory.appendChild(messageDiv);
    
    // Scroll to bottom
    elements.chatHistory.scrollTop = elements.chatHistory.scrollHeight;
}

function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'assistant-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="assistant-avatar-small">
            <img src="assets/reado-assistant.svg" alt="Assistant">
        </div>
        <div class="message-bubble assistant-bubble">
            <span class="typing-dots">●●●</span>
        </div>
    `;
    
    elements.chatHistory.appendChild(typingDiv);
    elements.chatHistory.scrollTop = elements.chatHistory.scrollHeight;
    
    return 'typing-indicator';
}

function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML
        .replace(/\n/g, '<br>')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function sanitizeInput(input) {
    // Remove any HTML tags and trim
    return input.replace(/<[^>]*>/g, '').trim();
}

// Text input functions
function handleTextInputChange() {
    const text = elements.textInput.value;
    const charCount = text.length;
    
    // Update character count
    elements.charCount.textContent = charCount;
    
    // Enable/disable process button
    elements.processTextBtn.disabled = charCount === 0;
}

function handleProcessText() {
    const text = elements.textInput.value.trim();
    
    if (!text) {
        displayError('Please enter some text to process.');
        return;
    }
    
    // Clear previous error
    clearError();
    
    // Store as extracted text
    appState.extractedText = text;
    appState.currentFile = null; // Clear file reference
    
    // Display in full text panel
    displayExtractedText(text);
    
    // Enable buttons
    elements.summarizeBtn.disabled = false;
    elements.generateNotesBtn.disabled = false;
    elements.explainBtn.disabled = false;
    if (ttsEngine.isAvailable()) {
        elements.playFullBtn.disabled = false;
    }
    
    // Reset other panels
    elements.summaryPanel.innerHTML = '<p class="text-gray-400 italic">Click "Summarize" to generate a summary...</p>';
    elements.keyNotesPanel.innerHTML = '<p class="text-gray-400 italic">Click "Generate Key Notes" to extract key points...</p>';
    
    console.log(`✅ Processed ${text.length} characters from text input`);
}

function handleClearText() {
    elements.textInput.value = '';
    elements.charCount.textContent = '0';
    elements.processTextBtn.disabled = true;
}

// Update extracted text to set assistant context
const originalDisplayExtractedText = displayExtractedText;
displayExtractedText = function(text) {
    originalDisplayExtractedText(text);
    
    // Set context for assistant
    if (assistantEngine) {
        assistantEngine.setContext(text);
    }
};

// Theme functions
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = '🌙';
    }
}
