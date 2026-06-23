// Strat AI Chatbot Logic
class StratAI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.conversationHistory = [];
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Display user message
        this.displayMessage(message, 'user');
        this.userInput.value = '';

        // Get bot response
        const response = this.generateResponse(message);
        
        // Simulate typing delay
        setTimeout(() => {
            this.displayMessage(response, 'bot');
        }, 500);
    }

    displayMessage(message, sender) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}-message`;
        messageEl.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        
        this.chatMessages.appendChild(messageEl);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        this.conversationHistory.push({
            role: sender,
            content: message,
            timestamp: new Date()
        });
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Greeting responses
        if (this.matchesKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            return "Hello! I'm Strat AI. How can I help you today?";
        }

        // How are you
        if (this.matchesKeywords(lowerMessage, ['how are you', "how's it going", 'how are things'])) {
            return "I'm doing great! Thanks for asking. I'm here to help with learning, problem-solving, and creative ideas. What can I assist you with?";
        }

        // Name
        if (this.matchesKeywords(lowerMessage, ['who are you', 'what is your name', "what's your name"])) {
            return "I'm Strat AI, your smart assistant designed to help you learn, create, solve problems, and get answers quickly. How can I assist?";
        }

        // Goodbye
        if (this.matchesKeywords(lowerMessage, ['bye', 'goodbye', 'farewell', 'see you'])) {
            return "Goodbye! Thanks for chatting. Have a great day! 👋";
        }

        // Help/capabilities
        if (this.matchesKeywords(lowerMessage, ['help', 'what can you do', 'capabilities'])) {
            return "I can help you with:\n• Answering questions\n• Learning new concepts\n• Problem-solving\n• Creative brainstorming\n• General assistance\n\nJust ask me anything!";
        }

        // Feeling/mood questions
        if (this.matchesKeywords(lowerMessage, ['thanks', 'thank you', 'appreciate'])) {
            return "You're welcome! Happy to help. What else can I do for you?";
        }

        // Joke request
        if (this.matchesKeywords(lowerMessage, ['joke', 'make me laugh', 'tell me something funny'])) {
            const jokes = [
                "Why did the AI go to school? To improve its learning model! 😄",
                "What do you call an AI that tells jokes? A pun-ction! 🤖",
                "Why do programmers prefer dark mode? Because light attracts bugs! 💡"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        // Math help
        if (lowerMessage.includes('math') || lowerMessage.includes('calculate')) {
            return "I'd be happy to help with math! Feel free to ask me any math questions, and I'll do my best to help you understand.";
        }

        // Science questions
        if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry')) {
            return "Science is fascinating! Ask me any science questions and I'll explain concepts clearly and help you learn.";
        }

        // Time/date questions
        if (this.matchesKeywords(lowerMessage, ['what time', 'what is the time', 'current time'])) {
            const now = new Date();
            return `The current time is ${now.toLocaleTimeString()}`;
        }

        // Date questions
        if (this.matchesKeywords(lowerMessage, ['what is the date', 'what date', 'today'])) {
            const now = new Date();
            return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
        }

        // Default response - encourage conversation
        return "That's interesting! Tell me more about that, and I'll do my best to help or discuss it further with you.";
    }

    matchesKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
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
