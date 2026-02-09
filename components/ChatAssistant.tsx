
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Copy, Check, Clock } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage, UserRole } from '../types';
import { marked } from 'marked';

interface ChatAssistantProps {
  role: UserRole;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ role }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`glucoscan_chat_history_${role}`);
    if (saved) return JSON.parse(saved);
    
    return [
      { 
        role: 'model', 
        timestamp: Date.now(),
        text: role === 'professional' 
          ? 'Welcome, Clinical Specialist. I am your **GlucoScan Clinical Assistant**. I can help you interpret patient data, suggest further diagnostic tests, or provide summaries based on current endocrine guidelines. How can I assist your practice today?'
          : 'Hello! I am your **GlucoScan Health Coach**. I am here to help you understand your diabetes risk and suggest simple, healthy changes you can make today. What would you like to talk about?' 
      }
    ];
  });
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // Save to localStorage
    localStorage.setItem(`glucoscan_chat_history_${role}`, JSON.stringify(messages));
  }, [messages, isTyping, role]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await geminiService.getChatResponse(messages, input, role);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that.", timestamp: Date.now() }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Service error. Please try again.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    const initialMessage = [messages[0]];
    setMessages(initialMessage);
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col h-[650px] overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-100 dark:shadow-none">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white leading-none mb-1">
              {role === 'professional' ? 'Clinical Assistant AI' : 'Health Coach AI'}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">Active & Encrypted</span>
            </div>
          </div>
        </div>
        <button className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg" onClick={clearChat}>
          Clear History
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-900/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              
              <div className="group relative">
                <div 
                  className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm prose-chat ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
                  }`}
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                />
                
                <div className={`flex items-center gap-2 mt-1 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                     <Clock size={8} /> {formatTime(msg.timestamp)}
                   </span>
                </div>

                <button 
                  onClick={() => copyToClipboard(msg.text, idx)}
                  className={`absolute -bottom-8 ${msg.role === 'user' ? 'right-0' : 'left-0'} p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5`}
                >
                  {copiedIndex === idx ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span className="text-[11px] font-bold uppercase tracking-wider">{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 flex items-center justify-center shadow-sm">
                <Bot size={20} />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-3 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="relative flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={role === 'professional' ? "Query diagnostic criteria..." : "Ask a health coach question..."}
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-xl shadow-blue-100 dark:shadow-none"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
