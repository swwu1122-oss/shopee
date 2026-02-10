
import React from 'react';
import { ChevronLeft, Search, Utensils, Zap, Star, MapPin, ChevronRight, ShoppingCart } from 'lucide-react';

interface ShopeeFoodViewProps {
  onBack: () => void;
}

const ShopeeFoodView: React.FC<ShopeeFoodViewProps> = ({ onBack }) => {
  return (
    <div className="bg-[#f8f8f8] min-h-screen animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <div className="flex-1 bg-white/20 rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/20">
          <Search size={16} className="text-white/60" />
          <span className="text-xs text-white/80">今天想吃什麼美食？</span>
        </div>
      </header>

      <div className="p-4 bg-[#ee4d2d] text-white flex justify-between items-center pb-8">
         <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span className="text-xs font-bold underline">台北 101</span>
         </div>
         <ShoppingCart size={20} />
      </div>

      <div className="mx-4 -mt-4 bg-white rounded-2xl p-4 shadow-lg flex justify-around">
         {[
           { label: '便當', icon: '🍱' },
           { label: '手搖飲', icon: '🥤' },
           { label: '炸雞', icon: '🍗' },
           { label: '壽司', icon: '🍣' },
           { label: '甜點', icon: '🍰' }
         ].map((item, i) => (
           <div key={i} className="flex flex-col items-center gap-1 active:scale-90">
             <div className="text-2xl">{item.icon}</div>
             <span className="text-[10px] text-gray-600 font-bold">{item.label}</span>
           </div>
         ))}
      </div>

      <div className="p-4 mt-4">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-gray-800 flex items-center gap-1 uppercase tracking-tighter">
               <Zap size={16} className="text-yellow-500 fill-current" /> 限時外送優惠
            </h3>
            <span className="text-[10px] text-gray-400">更多 <ChevronRight size={10} className="inline"/></span>
         </div>
         <div className="space-y-4">
            {[
              { name: '麥當勞 McDonald\'s', rating: 4.8, time: '20-30 min', price: '$50 起', img: 'https://picsum.photos/seed/food1/300/200' },
              { name: '迷客夏 Milksha', rating: 4.9, time: '15-25 min', price: '$40 起', img: 'https://picsum.photos/seed/food2/300/200' }
            ].map((shop, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 active:scale-95 transition-transform">
                 <img src={shop.img} className="w-full h-32 object-cover" />
                 <div className="p-3">
                    <div className="flex justify-between items-center">
                       <h4 className="text-sm font-bold text-gray-800">{shop.name}</h4>
                       <div className="flex items-center gap-0.5 text-yellow-500">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs font-black">{shop.rating}</span>
                       </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{shop.time} • 外送費 {shop.price}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ShopeeFoodView;
