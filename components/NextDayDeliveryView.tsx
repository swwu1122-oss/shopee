
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Zap, Truck, Clock, ShieldCheck, Sparkles, Filter, Search, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProgressBar from './ProgressBar';
import { askShoppingAssistant } from '../services/geminiService';

interface NextDayDeliveryViewProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const NextDayDeliveryView: React.FC<NextDayDeliveryViewProps> = ({ onBack, onProductClick }) => {
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [activeFilter, setActiveFilter] = useState('熱門');

  const products: Product[] = [
    { id: 'nd1', name: '【隔日到貨】3A級極速快充線 1.5M 防斷裂設計', price: 299, image: 'https://picsum.photos/seed/cable/400/400', soldCount: 12000, rating: 4.9, isMall: true, location: '台北市', discount: '9折' },
    { id: 'nd2', name: '【隔日到貨】大容量手持掛燙機 輕巧好收納', price: 680, image: 'https://picsum.photos/seed/iron/400/400', soldCount: 3500, rating: 4.8, location: '新北市' },
    { id: 'nd3', name: '【隔日到貨】高機能運動水壺 2000ml 大容量', price: 199, image: 'https://picsum.photos/seed/bottle/400/400', soldCount: 8200, rating: 4.7, location: '桃園市' },
    { id: 'nd4', name: '【隔日到貨】純棉親膚涼感T恤 舒適透氣', price: 350, image: 'https://picsum.photos/seed/tshirt/400/400', soldCount: 5400, rating: 5.0, isMall: true, location: '台中市' },
    { id: 'nd5', name: '【隔日到貨】摺疊式平板支架 鋁合金材質', price: 450, image: 'https://picsum.photos/seed/stand/400/400', soldCount: 1200, rating: 4.6, location: '新竹縣' },
    { id: 'nd6', name: '【隔日到貨】極速吸水超細纖維浴巾', price: 280, image: 'https://picsum.photos/seed/towel/400/400', soldCount: 2900, rating: 4.8, isMall: true, location: '台北市' },
  ];

  useEffect(() => {
    const fetchAIStatus = async () => {
      setLoading(true);
      const advice = await askShoppingAssistant("請扮演專業物流分析師，說明為什麼『隔日到貨』對現代人很重要，並強調蝦皮隔日到貨的優勢（如：今天訂明天到、物流追蹤、準時保障）。字數約80字。");
      setAiAnalysis(advice);
      setLoading(false);
    };
    fetchAIStatus();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen animate-in slide-in-from-right duration-300">
      <ProgressBar isLoading={loading} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <div className="flex-1 flex items-center bg-white/20 rounded-full px-3 py-1.5 border border-white/20">
          <Search size={16} className="text-white/60 mr-2" />
          <span className="text-xs text-white/80">在隔日到貨專區搜尋...</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="pb-10">
        {/* Banner */}
        <div className="bg-gradient-to-b from-[#ee4d2d] to-orange-500 p-6 pt-4 text-white overflow-hidden relative">
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                 <Zap className="text-yellow-300 fill-yellow-300" size={24} />
                 <h1 className="text-2xl font-black italic tracking-wider">隔日到貨</h1>
              </div>
              <p className="text-sm font-bold opacity-90">今日 14:00 前下單，明天就送到！</p>
              <div className="flex gap-4 mt-6">
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-md">
                       <Truck size={20} />
                    </div>
                    <span className="text-[10px] font-medium">快速配送</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-md">
                       <Clock size={20} />
                    </div>
                    <span className="text-[10px] font-medium">準時到達</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-md">
                       <ShieldCheck size={20} />
                    </div>
                    <span className="text-[10px] font-medium">品質保障</span>
                 </div>
              </div>
           </div>
           <Zap size={120} className="absolute -right-8 top-0 text-white/10 -rotate-12" />
        </div>

        {/* AI Insight Section */}
        <div className="mx-3 -mt-4 bg-white rounded-2xl p-4 shadow-lg border border-orange-50 relative z-10 flex flex-col gap-3">
           <div className="flex items-center gap-2">
              <Sparkles className="text-[#ee4d2d]" size={18} />
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">AI 物流環境分析</h3>
           </div>
           {loading ? (
             <div className="animate-pulse space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
             </div>
           ) : (
             <p className="text-[11px] text-gray-600 leading-relaxed italic border-l-2 border-[#ee4d2d] pl-3">
               「{aiAnalysis}」
             </p>
           )}
           <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-1">
              <span className="text-[9px] text-gray-400 font-medium italic">系統狀態: 物流繁忙度 低 (最佳配送時機)</span>
              <button className="text-[9px] font-bold text-[#ee4d2d] flex items-center">了解配送詳情 <ChevronRight size={10}/></button>
           </div>
        </div>

        {/* Filters */}
        <div className="sticky top-[52px] z-40 bg-gray-100 py-3 px-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
           {['熱門', '3C配件', '居家生活', '服飾美妝', '母嬰用品'].map(f => (
             <button 
               key={f}
               onClick={() => setActiveFilter(f)}
               className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all shadow-sm ${
                 activeFilter === f ? 'bg-[#ee4d2d] text-white' : 'bg-white text-gray-500 border border-gray-100'
               }`}
             >
               {f}
             </button>
           ))}
           <div className="flex-1"></div>
           <button className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-100"><Filter size={14} className="text-gray-400"/></button>
        </div>

        {/* Products Grid */}
        <div className="px-2 pt-1 grid grid-cols-2 gap-2">
           {products.map(p => (
             <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
           ))}
        </div>

        {/* Floating AI Summary Bubble */}
        <div className="m-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 items-start">
           <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-sm">
             <Truck size={16} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-blue-800">配送提醒</p>
              <p className="text-[9px] text-blue-600 mt-0.5 leading-relaxed">
                當前區域支持 24H 到貨。AI 預測下單後 18 小時內可送達您的常用地址。
              </p>
           </div>
        </div>
      </div>

      {/* Sticky Bottom Prompt */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto p-4 flex justify-center pointer-events-none">
         <div className="bg-black/80 backdrop-blur-md text-white text-[10px] px-6 py-2 rounded-full font-bold shadow-2xl flex items-center gap-2 border border-white/10 pointer-events-auto animate-bounce">
            <Zap size={12} className="text-yellow-400" />
            還有 2 小時 15 分下單，明天準時到！
         </div>
      </div>
    </div>
  );
};

export default NextDayDeliveryView;
