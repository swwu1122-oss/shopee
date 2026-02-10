
import React, { useState } from 'react';
import { ChevronLeft, Search, ShoppingBag, Clock, Sparkles, Filter, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ShopeeMartViewProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const ShopeeMartView: React.FC<ShopeeMartViewProps> = ({ onBack, onProductClick }) => {
  const products: Product[] = [
    { id: 'm1', name: '【蝦皮超市】得意抽取式衛生紙 100抽x12包x6串/箱', price: 699, image: 'https://picsum.photos/seed/mart1/400/400', soldCount: 50000, rating: 4.9, isMall: true, location: '台北市' },
    { id: 'm2', name: '【蝦皮超市】橘子工坊 天然濃縮洗衣精 補充包', price: 159, image: 'https://picsum.photos/seed/mart2/400/400', soldCount: 12000, rating: 4.8, isMall: true, location: '台北市' },
    { id: 'm3', name: '【蝦皮超市】義美 牛奶小泡芙 3入組 經典零食', price: 85, image: 'https://picsum.photos/seed/mart3/400/400', soldCount: 35000, rating: 5.0, location: '台北市' },
  ];

  return (
    <div className="bg-[#f2f2f2] min-h-screen animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-[#00b14f] text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <div className="flex-1 bg-white/20 rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/20">
          <Search size={16} className="text-white/60" />
          <span className="text-xs text-white/80">在蝦皮超市搜尋商品...</span>
        </div>
      </header>

      <div className="bg-[#00b14f] p-4 text-white pb-10">
        <div className="flex items-center gap-2 mb-2">
           <ShoppingBag size={24} className="fill-current" />
           <h1 className="text-xl font-black italic tracking-tighter">SHOPEE MART</h1>
        </div>
        <p className="text-xs opacity-90 font-bold">24H 快速到貨 • 滿 $499 免運</p>
      </div>

      <div className="mx-3 -mt-6 bg-white rounded-2xl p-4 shadow-lg border border-green-50 relative z-10">
         <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-[#00b14f]" />
            <span className="text-xs font-bold text-gray-800">今天訂，明天送達！</span>
         </div>
         <div className="grid grid-cols-4 gap-4 py-2">
            {[
              { label: '休閒零食', icon: '🍪' },
              { label: '居家生活', icon: '🏠' },
              { label: '清潔用品', icon: '🧹' },
              { label: '飲料水飲', icon: '🧃' }
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                 <div className="text-2xl">{cat.icon}</div>
                 <span className="text-[10px] text-gray-500">{cat.label}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="p-2 mt-4">
        <div className="flex items-center justify-between px-2 mb-3">
           <h3 className="text-sm font-black text-gray-800 flex items-center gap-1">
             <Sparkles size={16} className="text-yellow-500" /> 超市熱銷榜
           </h3>
           <ChevronRight size={16} className="text-gray-300" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopeeMartView;
