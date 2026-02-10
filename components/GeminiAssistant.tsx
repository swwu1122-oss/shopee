
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { askShoppingAssistant } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface GeminiAssistantProps {
  onClose: () => void;
}

const PROJECT_INFO = {
  displayName: "預設雙子座項目",
  fullName: "項目/558503238522"
};

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `您好！我是專案『${PROJECT_INFO.displayName}』的 AI 小助手，今天想找什麼寶物嗎？` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const aiResponse = await askShoppingAssistant(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm h-[80vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8">
        {/* Header */}
        <div className="bg-[#ee4d2d] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <div className="flex flex-col">
              <span className="font-bold text-sm">{PROJECT_INFO.displayName}</span>
              <span className="text-[9px] opacity-80">{PROJECT_INFO.fullName}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 no-scrollbar">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                m.role === 'user' 
                  ? 'bg-[#ee4d2d] text-white rounded-tr-none shadow-sm' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2 text-gray-400 italic text-xs">
                <Loader2 size={14} className="animate-spin" />
                正在查詢專案數據...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="問問小助手..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="text-[#ee4d2d] disabled:text-gray-300 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
