
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Send, Users, X, Youtube, Play, Pause, Volume2, Share2, MoreHorizontal } from 'lucide-react';

interface LiveRoomViewProps {
  live: any;
  onBack: () => void;
}

const LiveRoomView: React.FC<LiveRoomViewProps> = ({ live, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [randomImage, setRandomImage] = useState('');
  
  const [messages, setMessages] = useState([
    { user: '系統提示', text: '歡迎進入影音開箱間！' },
    { user: '小助手', text: '喜歡這款商品可以點擊下方購物車喔！' },
    { user: '購物狂', text: '這款質感看起來真的不錯耶～' }
  ]);
  const [input, setInput] = useState('');

  // 進入頁面時生成隨機圖片
  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000);
    // 使用較高解析度的圖片並模擬影片比例
    setRandomImage(`https://picsum.photos/seed/${seed}/1080/1920`);

    // 模擬進度條
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: '我', text: input }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black max-w-md mx-auto flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden">
      
      {/* 隨機影音背景 (假裝在播放) */}
      <div className="absolute inset-0 w-full h-full bg-black z-0">
        <img 
          src={randomImage} 
          className={`w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-80'}`} 
          alt="Video content" 
        />
        {/* 播放中動畫效果 (輕微縮放模擬影片感) */}
        {isPlaying && <div className="absolute inset-0 bg-black/5 animate-pulse pointer-events-none"></div>}
      </div>

      {/* 播放控制 Overlay */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {!isPlaying && (
          <div className="bg-black/40 p-6 rounded-full backdrop-blur-sm border border-white/20 animate-in zoom-in">
            <Play className="text-white fill-white" size={48} />
          </div>
        )}
      </div>

      {/* UI 介面層 */}
      <div className="relative z-20 flex-1 flex flex-col pointer-events-none">
        {/* Header */}
        <div className="p-4 flex justify-between items-start pointer-events-auto bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/20 text-white">
             <img src={live.thumbnail || live.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${live.host}`} className="w-8 h-8 rounded-full object-cover" />
             <div className="text-[10px]">
               <p className="font-bold truncate max-w-[80px]">{live.channelTitle || live.host || '創作者'}</p>
               <p className="flex items-center gap-1 opacity-70">
                 <Users size={8} /> 
                 {Math.floor(Math.random() * 5000 + 1000).toLocaleString()} 觀看中
               </p>
             </div>
             <button className="ml-2 bg-[#ee4d2d] text-white text-[9px] px-2 py-0.5 rounded-full font-bold">關注</button>
          </div>
          <div className="flex gap-2">
            <button className="bg-black/40 p-2 rounded-full text-white active:scale-90 transition-transform">
              <Share2 size={20} />
            </button>
            <button onClick={onBack} className="bg-black/40 p-2 rounded-full text-white active:scale-90 transition-transform">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* 底部資訊區 */}
        <div className="p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="mb-4">
             <h3 className="text-white text-sm font-bold line-clamp-2 leading-tight">
               {live.title || '精彩影音內容開箱分享 #蝦皮影音 #好物推薦'}
             </h3>
             <p className="text-white/60 text-[10px] mt-2 flex items-center gap-1">
               <Youtube size={10} className="text-red-500" /> 原創內容 • 2025-02-14
             </p>
          </div>

          {/* 留言區 */}
          <div className="space-y-2 max-h-[20vh] overflow-y-auto no-scrollbar pointer-events-auto mb-4">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-2 text-[11px] items-start animate-in slide-in-from-left">
                <span className="text-orange-400 font-bold shrink-0">{m.user}:</span>
                <span className="text-white/90 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-[2px] border border-white/5">{m.text}</span>
              </div>
            ))}
          </div>

          {/* 進度條 */}
          <div className="w-full h-0.5 bg-white/20 rounded-full mb-4 overflow-hidden">
             <div 
               className="h-full bg-[#ee4d2d] transition-all duration-100 ease-linear"
               style={{ width: `${progress}%` }}
             ></div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex items-center gap-3 pointer-events-auto">
             <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 text-white flex items-center gap-2">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="跟大家聊聊..." 
                  className="bg-transparent border-none outline-none text-xs w-full placeholder:text-white/40"
                />
                <button onClick={handleSend} className="text-[#ee4d2d] font-black text-xs shrink-0">傳送</button>
             </div>
             
             <div className="flex gap-4">
               <div className="flex flex-col items-center">
                  <button 
                    onClick={() => setIsLiked(!isLiked)} 
                    className={`p-2.5 rounded-full transition-all active:scale-125 ${isLiked ? 'text-[#ee4d2d]' : 'text-white'}`}
                  >
                     <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <span className="text-[10px] text-white font-bold">{isLiked ? '1.3k' : '1.2k'}</span>
               </div>
               
               <div className="flex flex-col items-center">
                  <button className="p-2.5 text-white">
                     <MessageSquare size={28} className="rotate-y-180" />
                  </button>
                  <span className="text-[10px] text-white font-bold">88</span>
               </div>

               <div className="flex flex-col items-center">
                  <button className="p-2.5 bg-yellow-400 rounded-full text-[#ee4d2d] shadow-lg active:scale-95 transition-transform border-2 border-white/20">
                     <ShoppingCart size={24} />
                  </button>
                  <span className="text-[10px] text-white font-bold">購買</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

const MessageSquare = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

export default LiveRoomView;
