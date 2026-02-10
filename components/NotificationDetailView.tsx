
import React from 'react';
import { ChevronLeft, Bell, Share2, MoreVertical } from 'lucide-react';

interface NotificationDetailViewProps {
  item: any;
  onBack: () => void;
}

const NotificationDetailView: React.FC<NotificationDetailViewProps> = ({ item, onBack }) => {
  return (
    <div className="bg-white min-h-screen animate-in slide-in-from-bottom duration-300">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1 active:scale-90">
          <ChevronLeft className="text-shopee-orange" />
        </button>
        <h1 className="text-base font-bold flex-1 truncate">{item.label || '通知詳情'}</h1>
        <div className="flex gap-4">
          <Share2 size={20} className="text-gray-400" />
          <MoreVertical size={20} className="text-gray-400" />
        </div>
      </header>

      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-shopee-orange/10 rounded-full flex items-center justify-center mb-4">
            <Bell size={32} className="text-shopee-orange" />
          </div>
          <h2 className="text-lg font-bold text-center">{item.title || item.label}</h2>
          <p className="text-xs text-gray-400 mt-2">{item.time || '剛剛'}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700 leading-relaxed shadow-inner">
          <p>{item.body || item.desc || '這是一條系統通知。感謝您使用蝦皮購物，我們致力於提供您更好的購物體驗。點擊下方按鈕以了解更多詳細資訊。'}</p>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
             <img src={`https://picsum.photos/seed/promo/600/300`} className="w-full rounded-lg mb-6 shadow-md" alt="Promotion" />
             <button className="w-full bg-shopee-orange text-white py-3 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-transform">
               立即前往查看
             </button>
          </div>
        </div>

        <div className="mt-10 text-center">
           <p className="text-[10px] text-gray-300">不感興趣？您可以進入設定關閉此類通知</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailView;
