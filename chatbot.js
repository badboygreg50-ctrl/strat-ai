// Advanced Strat AI - Smart Chatbot with OpenAI Integration
class StratAI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.conversationHistory = [];
        
        // OpenAI Configuration
        this.apiKey = 'sk-...sZkA'; // Your API key
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-3.5-turbo';
        
        this.setupEventListeners();
        this.displayWelcomeMessage();
    }

    setupEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    displayWelcomeMessage() {
        const welcomeMessages = [
            "Hey! I'm Strat AI - your smart assistant. Ask me anything! 🚀",
            "Welcome! I can help with questions, problems, learning, and more. What's on your mind?",
            "Hi there! I'm ready to answer any question you have. Go ahead! 💡",
            "Hello! Whether it's math, science, coding, writing, or anything else - I'm here to help! 😊"
        ];
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        this.displayMessage(randomWelcome, 'bot');
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Display user message
        this.displayMessage(message, 'user');
        this.userInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();

        // Get AI response
        try {
            const response = await this.getAIResponse(message);
            this.removeTypingIndicator();
            this.displayMessage(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator();
            this.displayMessage(
                "Sorry, I encountered an error. Please check your API key or try again later. 😔",
                'bot'
            );
            console.error('Error:', error);
        }
    }

    async getAIResponse(userMessage) {
        // Build conversation history for context
        const messages = this.conversationHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
        }));

        // Add current message
        messages.push({
            role: 'user',
            content: userMessage
        });

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Store in history
            this.conversationHistory.push({
                role: 'user',
                content: userMessage,
                timestamp: new Date()
            });
            this.conversationHistory.push({
                role: 'bot',
                content: aiResponse,
                timestamp: new Date()
            });

            return aiResponse;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.id = 'typing-indicator';
        typingEl.className = 'message bot-message typing';
        typingEl.innerHTML = '<p>Strat AI is thinking<span class="dots"><span>.</span><span>.</span><span>.</span></span></p>';
        this.chatMessages.appendChild(typingEl);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    displayMessage(message, sender) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}-message`;
        messageEl.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        
        this.chatMessages.appendChild(messageEl);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        if (sender === 'user') {
            this.conversationHistory.push({
                role: 'user',
                content: message,
                timestamp: new Date()
            });
        } else if (sender === 'bot' && !message.includes('thinking')) {
            this.conversationHistory.push({
                role: 'bot',
                content: message,
                timestamp: new Date()
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new StratAI();
});
