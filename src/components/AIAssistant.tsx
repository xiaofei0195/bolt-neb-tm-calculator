import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Lightbulb, BookOpen, Settings } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your PCR optimization assistant. I can help you interpret Tm results, troubleshoot PCR issues, and recommend protocol adjustments. What would you like to know?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Lightbulb, text: "PCR Troubleshooting", action: "troubleshoot" },
    { icon: BookOpen, text: "Protocol Recommendations", action: "protocol" },
    { icon: Settings, text: "Optimization Tips", action: "optimize" }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual DeepSeek API call)
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(inputMessage)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string) => {
    // This would be replaced with actual DeepSeek API integration
    const responses = {
      troubleshoot: "For PCR troubleshooting, consider these common issues:\n\n1. **No amplification**: Check primer concentrations, template quality, and cycling conditions\n2. **Non-specific bands**: Optimize annealing temperature, reduce primer concentration\n3. **Weak bands**: Increase template concentration, extend extension time\n\nWhat specific issue are you experiencing?",
      protocol: "Based on your Tm calculations, here's a recommended PCR protocol:\n\n1. **Initial Denaturation**: 95°C for 3 minutes\n2. **Cycling** (35 cycles):\n   - Denaturation: 95°C for 30 seconds\n   - Annealing: Use calculated Ta temperature for 30 seconds\n   - Extension: 72°C for 1 minute per kb\n3. **Final Extension**: 72°C for 10 minutes\n\nAdjust based on your polymerase specifications.",
      optimize: "To optimize your PCR:\n\n1. **Temperature gradient**: Test ±3°C around calculated Ta\n2. **Primer concentration**: Try 0.2-0.8 µM range\n3. **Mg²⁺ concentration**: Optimize between 1.5-3.0 mM\n4. **Template amount**: Use 10-100 ng for genomic DNA\n\nStart with calculated values and adjust one parameter at a time."
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('troubleshoot') || lowerQuestion.includes('problem')) {
      return responses.troubleshoot;
    } else if (lowerQuestion.includes('protocol') || lowerQuestion.includes('pcr')) {
      return responses.protocol;
    } else if (lowerQuestion.includes('optim') || lowerQuestion.includes('improve')) {
      return responses.optimize;
    } else {
      return "I can help you with PCR optimization, troubleshooting, and protocol recommendations. Could you be more specific about what you'd like assistance with?";
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action === 'troubleshoot' ? 'Help me troubleshoot PCR problems' : 
                   action === 'protocol' ? 'Recommend a PCR protocol' : 
                   'Give me optimization tips');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-fit sticky top-8">
      <div 
        className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-white/80 text-sm">PCR optimization help</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Quick Actions */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Quick Help</p>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className="w-full flex items-center space-x-2 p-2 text-left text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <action.icon className="h-4 w-4 text-purple-600" />
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      message.type === 'ai' 
                        ? 'bg-purple-50 border-purple-200' 
                        : 'bg-blue-50 border-blue-200 ml-4'
                    } p-3 rounded-lg border text-sm`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && (
                        <Bot className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-slate-700 whitespace-pre-line">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-purple-50 border-purple-200 p-3 rounded-lg border text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about PCR optimization..."
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;