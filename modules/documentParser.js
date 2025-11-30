// Document Parser Module
export class DocumentParser {
    constructor() {
        // Configure PDF.js worker
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = '../libs/pdf.worker.min.js';
        }
    }

    async parseFile(file, progressCallback = null) {
        try {
            // Detect file type from extension
            const fileType = this.detectFileType(file.name);
            
            // Validate file type
            if (!this.isValidFileType(fileType)) {
                return {
                    success: false,
                    text: null,
                    error: `Unsupported file format: ${fileType}. Please upload PDF, DOCX, or TXT files.`,
                    fileType: fileType
                };
            }

            // Route to appropriate parser
            let text = null;
            switch (fileType) {
                case 'pdf':
                    text = await this.parsePDF(file, progressCallback);
                    break;
                case 'docx':
                    text = await this.parseDOCX(file);
                    break;
                case 'txt':
                    text = await this.parseTXT(file);
                    break;
                default:
                    throw new Error(`Unsupported file type: ${fileType}`);
            }

            return {
                success: true,
                text: text,
                error: null,
                fileType: fileType
            };
        } catch (error) {
            return {
                success: false,
                text: null,
                error: `Failed to parse file: ${error.message}`,
                fileType: this.detectFileType(file.name)
            };
        }
    }

    detectFileType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
    }

    isValidFileType(fileType) {
        const validTypes = ['pdf', 'docx', 'txt'];
        return validTypes.includes(fileType);
    }

    async parseTXT(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const text = event.target.result;
                    if (!text || text.trim().length === 0) {
                        reject(new Error('File is empty or contains no readable text'));
                    } else {
                        resolve(text);
                    }
                } catch (error) {
                    reject(new Error(`Failed to read TXT file: ${error.message}`));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file. Please check file permissions.'));
            };
            
            // Read file as text with UTF-8 encoding
            reader.readAsText(file, 'UTF-8');
        });
    }

    async parsePDF(file, progressCallback = null) {
        try {
            // Check if PDF.js is available
            if (typeof pdfjsLib === 'undefined') {
                throw new Error('PDF.js library not loaded');
            }

            // Read file as ArrayBuffer
            const arrayBuffer = await this.readFileAsArrayBuffer(file);
            
            // Load PDF document
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            
            // Extract text from all pages progressively (supports up to 100MB)
            let fullText = '';
            const totalPages = pdf.numPages;
            
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                // Report progress
                if (progressCallback) {
                    progressCallback({
                        current: pageNum,
                        total: totalPages,
                        message: `Extracting page ${pageNum} of ${totalPages}...`
                    });
                }
                
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                
                // Append incrementally to avoid memory issues
                fullText += pageText + '\n\n';
                
                // Allow UI to breathe every 10 pages
                if (pageNum % 10 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }
            
            if (!fullText || fullText.trim().length === 0) {
                throw new Error('PDF contains no readable text');
            }
            
            return fullText;
        } catch (error) {
            throw new Error(`PDF parsing failed: ${error.message}`);
        }
    }

    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    }

    async parseDOCX(file) {
        try {
            // Check if mammoth is available
            if (typeof mammoth === 'undefined') {
                throw new Error('Mammoth.js library not loaded');
            }

            // Read file as ArrayBuffer
            const arrayBuffer = await this.readFileAsArrayBuffer(file);
            
            // Extract text using mammoth
            const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
            const text = result.value;
            
            if (!text || text.trim().length === 0) {
                throw new Error('DOCX contains no readable text');
            }
            
            // Check for any messages/warnings from mammoth
            if (result.messages && result.messages.length > 0) {
                console.warn('DOCX parsing warnings:', result.messages);
            }
            
            return text;
        } catch (error) {
            throw new Error(`DOCX parsing failed: ${error.message}`);
        }
    }
}
