import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Trash2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const StudyBuddy: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm your AI Study Buddy. Need help with homework, explaining a concept, or preparing for an exam? Just ask!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = 'gemini-3-flash-preview';
      
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: "You are a helpful, encouraging, and knowledgeable AI Study Buddy for a school student. Explain concepts clearly, provide examples, and help with homework without just giving the answers directly. Use encouraging language.",
        },
      });

      // Simple history formatting for the API
      const response = await chat.sendMessage({ message: userMessage });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'model', text: "Hi! I'm your AI Study Buddy. Need help with homework, explaining a concept, or preparing for an exam? Just ask!" }]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-[calc(100vh-80px)] bg-gray-50"
    >
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Study Buddy</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Online & Ready</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "flex gap-3 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-blue-100 text-blue-600" : "bg-white border border-gray-100 text-gray-600 shadow-sm"
            )}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed",
              msg.role === 'user' 
                ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100" 
                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm"
            )}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-white">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[85%]">
            <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 text-gray-600 shadow-sm flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
              <Loader2 size={16} className="animate-spin text-blue-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-gray-100 shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-5 pr-14 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "absolute right-2 p-2 rounded-xl transition-all",
              input.trim() && !isLoading ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-gray-200 text-gray-400"
            )}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3 uppercase tracking-widest font-medium">
          Powered by Gemini AI
        </p>
      </div>
    </motion.div>
  );
};
