import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { generateContentBasedResponse, analyzeUserQuery } from '../utils/WebsiteDataExtractor';
import useWebsiteContent from '../utils/useWebsiteContent';
import { 
  detectConversationContext, 
  generateFollowUpQuestion,
  analyzeSentiment,
  getSentimentResponse
} from '../utils/ChatBotContext';

/**
 * ChatBot component that provides user assistance by accessing website information
 * Features collapsible UI, chat history, and intelligent responses
 * @returns {JSX.Element} Floating chatbot interface
 */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi there! 👋 I\'m your EduForge assistant. How can I help you with our courses, competitions, or any other questions?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);  // For context-aware responses
  const websiteContent = useWebsiteContent(); // Get dynamic website content

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Knowledge base for the chatbot
  const knowledgeBase = {
    courses: {
      keywords: ['course', 'courses', 'class', 'classes', 'learn', 'learning', 'study', 'curriculum'],
      response: 'We offer a variety of technology courses including Programming, Robotics, AI, and Electronics. Our most popular courses are "Introduction to Python", "Advanced Robotics Framework", and "AI for Beginners". Would you like more information about a specific course?'
    },
    competitions: {
      keywords: ['competition', 'competitions', 'contest', 'challenges', 'hackathon', 'tournament'],
      response: 'EduForge hosts several competitions throughout the year including coding challenges, robotics tournaments, and innovation hackathons. Our next competition is scheduled for November 15th, 2025. Would you like to register or learn more?'
    },
    registration: {
      keywords: ['register', 'registration', 'sign up', 'join', 'enroll', 'apply', 'admission'],
      response: 'You can register for our courses or competitions by clicking the "Join Us" button at the top of the page. The process takes less than 5 minutes, and you\'ll receive a confirmation email with next steps. Need help with registration?'
    },
    pricing: {
      keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'tuition', 'payment', 'discount', 'scholarship'],
      response: 'Our course pricing ranges from free introductory courses to $999 for advanced specializations. We also offer scholarships and payment plans. For detailed pricing on a specific course, please visit the Courses section or ask me about a particular course.'
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'support', 'help', 'service'],
      response: 'You can reach our support team at contact@eduforge.co or call us at +1-555-123-4567. Our office hours are Monday to Friday, 9 AM to 5 PM EST. How else can I assist you?'
    },
    instructors: {
      keywords: ['instructor', 'instructors', 'teacher', 'teachers', 'professor', 'faculty', 'expert', 'mentor'],
      response: 'All EduForge courses are taught by industry experts with at least 5+ years of experience. Our instructors come from leading tech companies and academic institutions. Would you like to know about a specific instructor?'
    },
    certificate: {
      keywords: ['certificate', 'certification', 'degree', 'diploma', 'credential', 'accreditation'],
      response: 'Yes, we provide certificates upon successful completion of our courses. Our certificates are recognized by over 200 industry partners and can help boost your resume. Some advanced courses also offer professional certifications.'
    },
    schedule: {
      keywords: ['schedule', 'timetable', 'calendar', 'dates', 'timing', 'hours', 'duration', 'flexible'],
      response: 'Most of our courses are self-paced, allowing you to learn on your own schedule. Live sessions are typically held in the evenings (7-9 PM EST) and weekends. A typical course takes 4-8 weeks to complete, with 5-10 hours of commitment per week.'
    }
  };

  // Handle form submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Save messages to local storage for persistence
    const updatedMessages = [...messages, userMessage];
    localStorage.setItem('eduforge_chat_messages', JSON.stringify(updatedMessages.slice(-20))); // Keep last 20 messages

    // Check for quick commands
    if (inputText.toLowerCase() === 'clear') {
      // Clear chat history
      setTimeout(() => {
        setMessages([{
          id: 1,
          type: 'bot',
          text: 'Chat history cleared. How else can I help you today?',
          timestamp: new Date()
        }]);
        setIsTyping(false);
        localStorage.removeItem('eduforge_chat_messages');
      }, 500);
      return;
    }

    // Process the user's message and generate a response
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      const newBotMessage = {
        id: updatedMessages.length + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      
      // Update localStorage with the bot response too
      localStorage.setItem('eduforge_chat_messages', 
        JSON.stringify([...updatedMessages, newBotMessage].slice(-20))
      );
      
    }, Math.floor(Math.random() * 800) + 800); // Random response time between 800ms-1600ms for natural feel
  };
  
  // Load saved messages from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem('eduforge_chat_messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string dates back to Date objects
        const processedMessages = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(processedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Generate a response based on user input
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Add to chat history for context awareness
    const updatedHistory = [...chatHistory, input];
    setChatHistory(updatedHistory);
    
    // Detect sentiment in user message
    const sentiment = analyzeSentiment(input);
    const sentimentPrefix = getSentimentResponse(sentiment);
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings)/.test(input)) {
      return 'Hello! How can I help you today with EduForge? Need information about our courses, competitions, or something else?';
    }
    
    // Check for thanks
    if (/thank(s| you)/.test(input)) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    // Check for goodbye
    if (/^(bye|goodbye|see you|farewell)/.test(input)) {
      return 'Thank you for chatting with EduForge assistant! Feel free to return if you have more questions. Have a great day!';
    }

    // Try to generate a content-based response using website data
    const contentResponse = generateContentBasedResponse(input);
    if (contentResponse) {
      // Detect conversation context
      const context = detectConversationContext(updatedHistory);
      
      // Generate a follow-up question based on context
      const followUpQuestion = generateFollowUpQuestion(context, input);
      
      // Combine content response with sentiment and follow-up
      return sentimentPrefix + contentResponse + (followUpQuestion ? ` ${followUpQuestion}` : '');
    }

    // Analyze the user query for better context understanding
    const analysis = analyzeUserQuery(input);
    
    // If specific categories were detected, provide targeted responses
    if (analysis.matchedCategories.length > 0) {
      if (analysis.matchedCategories.includes('registration')) {
        return sentimentPrefix + 'You can register for our courses or competitions by clicking the "Join Us" button at the top of the page. Registration takes less than 5 minutes. Would you like me to help you with a specific course registration?';
      }
      
      if (analysis.matchedCategories.includes('pricing') && analysis.matchedCategories.includes('courses')) {
        return sentimentPrefix + 'Our course prices range from free introductory courses to $999 for specialized advanced courses. Most popular courses are between $299-$499. We also offer payment plans and scholarships for eligible students. Which specific course pricing are you interested in?';
      }
    }

    // Check against knowledge base
    for (const [topic, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        // Get conversation context and potential follow-up question
        const context = detectConversationContext(updatedHistory);
        const followUpQuestion = generateFollowUpQuestion(context, input);
        
        return sentimentPrefix + data.response + (followUpQuestion ? ` ${followUpQuestion}` : '');
      }
    }

    // Check for website content mentions
    if (websiteContent.headings.length > 0) {
      // Find any headings that might be relevant to the query
      const relevantHeading = websiteContent.headings.find(heading => 
        input.includes(heading.text.toLowerCase())
      );
      
      if (relevantHeading && relevantHeading.id && websiteContent.sections[relevantHeading.id]) {
        return sentimentPrefix + `I found some information about "${relevantHeading.text}" on our website. Let me provide you with details about it. Is there something specific about this you'd like to know?`;
      }
    }

    // Default response if no matches
    return 'I\'m not sure I understand. Could you rephrase your question? You can ask about our courses, competitions, pricing, registration, or contact information.';
  };

  // If it's the user's first visit, show a welcome notification after a delay
  useEffect(() => {
    const hasSeenChat = localStorage.getItem('eduforge_chatbot_seen');
    
    if (!hasSeenChat && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('eduforge_chatbot_seen', 'true');
      }, 5000); // Show chatbot after 5 seconds for first-time visitors
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Button with notification dot for first-time users */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-4 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} relative`}
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>

      {/* Chat Window */}
      <div 
        className={`bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 overflow-hidden ${
          isOpen 
            ? 'opacity-100 scale-100 w-80 sm:w-96 h-96' 
            : 'opacity-0 scale-90 w-0 h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle size={20} className="mr-2" />
            <h3 className="font-medium">EduForge Assistant</h3>
          </div>
          <div className="flex">
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 hover:bg-blue-700 rounded-full transition-colors"
              aria-label="Minimize chat"
            >
              <ChevronDown size={20} />
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 hover:bg-blue-700 rounded-full transition-colors ml-1"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
          {messages.length === 1 && messages[0].type === 'bot' && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 text-center mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['What courses do you offer?', 'How much do courses cost?', 'When is the next competition?', 'How do I register?'].map((question, index) => (
                  <button
                    key={index}
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-3 py-1 text-xs transition-colors"
                    onClick={() => {
                      setInputText(question);
                      // Auto-submit after a short delay
                      setTimeout(() => {
                        handleSendMessage({ preventDefault: () => {} });
                      }, 300);
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="flex items-center mb-1">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mr-1">
                      <MessageCircle size={10} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-blue-600">EduForge Assistant</span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing indicator with improved animation */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <MessageCircle size={12} className="text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="bg-blue-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="bg-blue-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="bg-blue-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Auto scroll reference */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSendMessage} className="border-t p-2 flex">
          <input
            type="text"
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors"
            aria-label="Send message"
            disabled={!inputText.trim()}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;