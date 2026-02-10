
import React from 'react';
import { ShieldCheck, RotateCcw, Truck, ChevronRight } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface MallViewProps {
  onProductClick: (product: Product) => void;
  onBrandClick: (brand: string) => void;
}

const MallView: React.FC<MallViewProps> = ({ onProductClick, onBrandClick }) => {
  return (
    <div className="animate-in fade-in duration-500 bg-white">
      {/* Mall Promises */}
      <div className="flex justify-around py-3 border-b border-gray-50">
        {[
          { icon: <ShieldCheck size={14} className="text-shopee-orange" />, label: '100% 正品保證' },
          { icon: <RotateCcw size={14} className="text-shopee-orange" />, label: '15天鑑賞期' },
          { icon: <Truck size={14} className="text-shopee-orange" />, label: '蝦皮安心退' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => onBrandClick(item.label)} className="flex items-center gap-1 cursor-pointer group active:opacity-70">
            {item.icon}
            <span className="text-[10px] text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Brand Carousel */}
      <div className="p-3 cursor-pointer overflow-hidden group" onClick={() => onBrandClick('商城年度大促')}>
        <img 
          src="https://picsum.photos/seed/mallbanner/800/300" 
          className="w-full h-32 object-cover rounded-lg group-active:scale-105 transition-transform duration-500" 
          alt="Mall Banner" 
        />
      </div>

      {/* Brand Grid */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-sm">熱門品牌旗艦店</h2>
          <button 
            onClick={() => onBrandClick('熱門品牌列表')}
            className="text-xs text-shopee-orange flex items-center active:underline"
          >
            查看更多 <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} onClick={() => onBrandClick(`品牌旗艦店 ${i}`)} className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                <img src={`https://picsum.photos/seed/mbrand${i}/100/100`} className="max-w-full" alt="Brand" />
              </div>
              <span className="text-[10px] text-gray-600 truncate w-full text-center font-medium">品牌 {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mall Products */}
      <div className="bg-gray-50 p-2">
        <div className="bg-white rounded-t-lg p-3 border-b border-gray-100">
           <h2 className="text-sm font-bold">精選商城推薦</h2>
        </div>
        <ProductGrid onProductClick={onProductClick} />
      </div>
    </div>
  );
};

export default MallView;
