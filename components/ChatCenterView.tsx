
import React from 'react';
import { ChevronLeft, Search, MoreVertical, ShieldCheck, Clock } from 'lucide-react';

interface ChatCenterViewProps {
  onBack: () => void;
}

const ChatCenterView: React.FC<ChatCenterViewProps> = ({ onBack }) => {
  const chats = [
    { id: 1, name: '蝦皮購物官方旗艦店', text: '您好！感謝您的購買，包裹預計於明日送達。', time: '14:22', icon: 'https://picsum.photos/seed/mall/100/100', mall: true, unread: 1 },
    { id: 2, name: 'Nike 品牌館', text: '親愛的會員您好，最新的 8 折優惠券已存入帳戶。', time: '昨日', icon: 'https://picsum.photos/seed/nike/100/100', mall: true, unread: 0 },
    { id: 3, name: 'Gemini 智慧管家', text: '我是您的 AI 助手，有任何購物問題歡迎隨時詢問我！', time: '昨日', icon: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ai', mall: false, unread: 3 },
  ];

  return (
    <div className="bg-white min-h-screen animate-in slide-in-from-right duration-300 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1"><ChevronLeft className="text-[#ee4d2d]" /></button>
        <h1 className="text-lg font-bold flex-1">聊聊</h1>
        <div className="flex gap-4">
          <Search size={22} className="text-gray-400" />
          <MoreVertical size={22} className="text-gray-400" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#ee4d2d]" />
                <span className="text-xs font-bold text-[#ee4d2d]">購物保障：絕不透過聊聊詢問密碼或簡訊驗證碼</span>
             </div>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {chats.map(chat => (
            <div key={chat.id} className="p-4 flex gap-3 active:bg-gray-50 cursor-pointer transition-colors relative">
               <div className="relative">
                  <img src={chat.icon} className="w-12 h-12 rounded-full border border-gray-100 object-cover" />
                  {chat.mall && (
                    <div className="absolute -bottom-1 -right-1 bg-[#ee4d2d] text-white text-[7px] px-1 rounded font-black">MALL</div>
                  )}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                     <h3 className="text-sm font-bold text-gray-800 truncate">{chat.name}</h3>
                     <span className="text-[10px] text-gray-300 font-medium">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate pr-6">{chat.text}</p>
               </div>
               {chat.unread > 0 && (
                 <div className="absolute right-4 bottom-5 bg-[#ee4d2d] text-white text-[9px] font-black min-w-[16px] h-4 rounded-full flex items-center justify-center">
                   {chat.unread}
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 text-center opacity-20">
         <MessageCircle size={60} className="mx-auto mb-2" />
         <p className="text-xs">沒有更多聊天訊息囉</p>
      </div>
    </div>
  );
};

const MessageCircle = ({ size, className }: { size: number, className?: string }) => (
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

export default ChatCenterView;
