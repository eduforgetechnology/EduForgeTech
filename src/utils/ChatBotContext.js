/**
 * ChatBot context processor for EduForge website
 * Provides natural language understanding and contextual responses
 */

// Check if the conversation has a certain context
export const detectConversationContext = (history) => {
  if (history.length < 2) return 'new_conversation';
  
  const last3Messages = history.slice(-3);
  
  // Check for course inquiry context
  if (last3Messages.some(msg => 
    /course|class|learn|study|curriculum|program/.test(msg.toLowerCase())
  )) {
    return 'course_inquiry';
  }
  
  // Check for pricing context
  if (last3Messages.some(msg => 
    /price|cost|fee|expensive|cheap|discount|payment/.test(msg.toLowerCase())
  )) {
    return 'pricing_inquiry';
  }
  
  // Check for registration context
  if (last3Messages.some(msg => 
    /register|sign up|join|enroll|apply|admission/.test(msg.toLowerCase())
  )) {
    return 'registration_process';
  }
  
  // Check for competition context
  if (last3Messages.some(msg => 
    /competition|contest|challenge|hackathon|tournament|event/.test(msg.toLowerCase())
  )) {
    return 'competition_inquiry';
  }
  
  // Default context
  return 'general_inquiry';
};

// Generate contextual follow-up questions based on conversation
export const generateFollowUpQuestion = (context, lastUserMessage) => {
  switch (context) {
    case 'course_inquiry':
      if (lastUserMessage.toLowerCase().includes('python')) {
        return 'Would you like to know about the prerequisites for our Python course or the curriculum details?';
      } else if (lastUserMessage.toLowerCase().includes('ai') || lastUserMessage.toLowerCase().includes('artificial intelligence')) {
        return 'Are you interested in the beginner AI course or our advanced machine learning specialization?';
      } else {
        return 'Is there a specific course topic you\'re interested in? We offer programming, robotics, AI, and electronics courses.';
      }
    
    case 'pricing_inquiry':
      return 'We have various pricing options and payment plans available. Would you like to know about scholarships or our installment payment options?';
    
    case 'registration_process':
      return 'Registration is quick and easy. Would you like me to guide you through the process or explain the requirements?';
    
    case 'competition_inquiry':
      return 'We host several competitions throughout the year. Are you interested in our upcoming events or past competition results?';
    
    case 'general_inquiry':
    default:
      return null; // No follow-up needed
  }
};

// Process user sentiment
export const analyzeSentiment = (message) => {
  const positiveWords = ['great', 'awesome', 'excellent', 'good', 'love', 'like', 'helpful', 'thanks', 'thank', 'appreciate'];
  const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'hate', 'dislike', 'difficult', 'confusing', 'expensive', 'complicated'];
  
  const lowerMessage = message.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerMessage.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerMessage.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

// Handle responses based on sentiment
export const getSentimentResponse = (sentiment) => {
  switch (sentiment) {
    case 'positive':
      return 'I\'m glad to hear that! ';
    case 'negative':
      return 'I\'m sorry to hear that. Let me try to help resolve your concerns. ';
    default:
      return '';
  }
};