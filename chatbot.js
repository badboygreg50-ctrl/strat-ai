// Strat AI Chatbot Logic - Enhanced with Random Responses
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

    getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Greeting responses
        if (this.matchesKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            const greetings = [
                "Hey there! What can I help you with? 👋",
                "Hello! I'm Strat AI, your assistant. What's on your mind?",
                "Hi! Great to see you. How can I assist today?",
                "Welcome! I'm here to help. What do you need?",
                "Hello! Ask me anything and I'll do my best to help! 😊",
                "Hey! Strat AI at your service. What can I do for you?"
            ];
            return this.getRandomResponse(greetings);
        }

        // How are you
        if (this.matchesKeywords(lowerMessage, ['how are you', "how's it going", 'how are things'])) {
            const responses = [
                "I'm doing great! Thanks for asking. I'm here to help with learning, problem-solving, and creative ideas. What can I assist you with?",
                "Fantastic! I'm always ready to help. What brings you here today?",
                "Doing well! Ready to tackle any questions you have. 😊",
                "I'm in great spirits! What can I help you with?",
                "Pretty good! Looking forward to assisting you. What do you need?"
            ];
            return this.getRandomResponse(responses);
        }

        // Name
        if (this.matchesKeywords(lowerMessage, ['who are you', 'what is your name', "what's your name"])) {
            const responses = [
                "I'm Strat AI, your smart assistant designed to help you learn, create, solve problems, and get answers quickly. How can I assist?",
                "Call me Strat AI! I'm here to help with learning, problem-solving, brainstorming, and much more.",
                "I'm Strat AI - your friendly AI companion ready to help with anything you throw at me!",
                "My name is Strat AI. I'm a smart assistant built to help you with learning, creating, and problem-solving."
            ];
            return this.getRandomResponse(responses);
        }

        // Goodbye
        if (this.matchesKeywords(lowerMessage, ['bye', 'goodbye', 'farewell', 'see you'])) {
            const responses = [
                "Goodbye! Thanks for chatting. Have a great day! 👋",
                "See you later! Take care! 😊",
                "Bye! Come back anytime you need help!",
                "Farewell! Thanks for the conversation. Have a wonderful day!",
                "Take care! Looking forward to chatting with you again soon! 🚀"
            ];
            return this.getRandomResponse(responses);
        }

        // Help/capabilities
        if (this.matchesKeywords(lowerMessage, ['help', 'what can you do', 'capabilities'])) {
            const responses = [
                "I can help you with:\n• Answering questions\n• Learning new concepts\n• Problem-solving\n• Creative brainstorming\n• General assistance\n\nJust ask me anything!",
                "Here's what I'm great at:\n✓ Educational support\n✓ Brainstorming ideas\n✓ Answering questions\n✓ Problem-solving\n✓ General knowledge\n\nWhat would you like help with?",
                "I'm ready to assist with:\n• Learning topics\n• Creative thinking\n• Solving problems\n• Answering questions\n• And much more!\n\nWhat's your question?"
            ];
            return this.getRandomResponse(responses);
        }

        // Feeling/mood questions
        if (this.matchesKeywords(lowerMessage, ['thanks', 'thank you', 'appreciate'])) {
            const responses = [
                "You're welcome! Happy to help. What else can I do for you?",
                "My pleasure! Anything else you need?",
                "You got it! Glad I could help. What's next?",
                "Happy to assist! Let me know if you need anything else! 😊"
            ];
            return this.getRandomResponse(responses);
        }

        // Joke request
        if (this.matchesKeywords(lowerMessage, ['joke', 'make me laugh', 'tell me something funny'])) {
            const jokes = [
                "Why did the AI go to school? To improve its learning model! 😄",
                "What do you call an AI that tells jokes? A pun-ction! 🤖",
                "Why do programmers prefer dark mode? Because light attracts bugs! 💡",
                "How many programmers does it take to change a lightbulb? None, that's a hardware problem! 🔧",
                "Why did the developer go broke? Because he used up all his cache! 💸",
                "What's a programmer's favorite hangout place? Foo Bar! 🍺"
            ];
            return this.getRandomResponse(jokes);
        }

        // Math help - EXPANDED!
        if (lowerMessage.includes('math') || lowerMessage.includes('calculate') || lowerMessage.includes('equation') || lowerMessage.includes('algebra') || lowerMessage.includes('geometry')) {
            const mathResponses = [
                "I'd be happy to help with math! Feel free to ask me any math questions, and I'll do my best to help you understand. 📐",
                "Math is my thing! What math problem can I help you solve? Whether it's algebra, geometry, or calculus - bring it on! 🧮",
                "Got a math question? I'm here to break it down for you step by step! What do you need? 📊",
                "Math help coming right up! What do you need assistance with? Numbers, equations, or something else? 🔢",
                "Love a good math challenge! I'm ready to help you tackle it. What's the problem? 💡",
                "Let's solve some math together! Tell me what you're working on and I'll help explain it. 🎯"
            ];
            return this.getRandomResponse(mathResponses);
        }

        // Science questions
        if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry')) {
            const responses = [
                "Science is fascinating! Ask me any science questions and I'll explain concepts clearly and help you learn.",
                "Love science questions! What would you like to explore? 🔬",
                "Science is amazing! What science topic interests you?",
                "I'm ready to dive into science with you! What's your question?"
            ];
            return this.getRandomResponse(responses);
        }

        // Time/date questions
        if (this.matchesKeywords(lowerMessage, ['what time', 'what is the time', 'current time'])) {
            const now = new Date();
            const timeResponses = [
                `The current time is ${now.toLocaleTimeString()}`,
                `Right now it's ${now.toLocaleTimeString()}`,
                `It's currently ${now.toLocaleTimeString()}`
            ];
            return this.getRandomResponse(timeResponses);
        }

        // Date questions
        if (this.matchesKeywords(lowerMessage, ['what is the date', 'what date', 'today'])) {
            const now = new Date();
            const dateResponses = [
                `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
                `The date today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
                `It's ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} today`
            ];
            return this.getRandomResponse(dateResponses);
        }

        // Default response - encourage conversation
        const defaultResponses = [
            "That's interesting! Tell me more about that, and I'll do my best to help or discuss it further with you.",
            "I like where this is going! Can you elaborate a bit more?",
            "That sounds cool! I'd love to know more. What else can you tell me?",
            "Hmm, intriguing! Help me understand better - what do you mean by that?",
            "I'm curious! Tell me more and I'll see how I can help. 🤔"
        ];
        return this.getRandomResponse(defaultResponses);
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
