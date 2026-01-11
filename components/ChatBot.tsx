
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import HaidaLogo from './HaidaLogo';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Guardian, I am Lovel AI. How can I assist your reforestation journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "You are Lovel AI, a solar-punk guardian spirit for Project Eden. You blend ancestral Haida wisdom with future-tech ecological restoration. Be encouraging, poetic, and informative. Help the user restore the biosphere."
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Connection lost to the forest mesh." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "The neural link is weak. Check your portal connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] glass-card rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl animate-slideUp">
      <div className="p-6 border-b border-white/5 bg-red-700/10 flex items-center gap-4">
        <div className="w-12 h-12">
          <HaidaLogo className="w-full h-full" />
        </div>
        <div>
          <h3 className="font-black text-white text-lg leading-tight uppercase tracking-widest">Lovel AI</h3>
          <span className="text-[10px] text-teal-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
            NEURAL LINK ACTIVE
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-red-700 text-white shadow-lg rounded-tr-none' 
                : 'bg-white/5 border border-white/10 text-teal-50 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl rounded-tl-none flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Lovel AI..."
          className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-red-700 transition-all placeholder:text-white/20"
        />
        <button 
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 bg-red-700 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform disabled:opacity-50"
        >
          <i className="fa-solid fa-paper-plane text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
