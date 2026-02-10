
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface FlashSaleProps {
  onProductClick?: (product: Product) => void;
}

const FlashSale: React.FC<FlashSaleProps> = ({ onProductClick }) => {
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="bg-white mt-2 p-3">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-shopee-orange font-bold text-base italic uppercase tracking-tighter">Flash Sale</h2>
          <div className="flex gap-1">
            <span className="bg-black text-white text-[10px] font-bold px-1 rounded">{time.h}</span>
            <span className="text-black text-[10px] font-bold">:</span>
            <span className="bg-black text-white text-[10px] font-bold px-1 rounded">{time.m}</span>
            <span className="text-black text-[10px] font-bold">:</span>
            <span className="bg-black text-white text-[10px] font-bold px-1 rounded">{time.s}</span>
          </div>
        </div>
        <button className="flex items-center text-xs text-gray-500 active:text-shopee-orange">
          查看全部 <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex overflow-x-auto gap-3 no-scrollbar">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            onClick={() => onProductClick?.({
              id: `flash-${i}`,
              name: `限時特賣商品 ${i} - 驚喜優惠價`,
              price: 299,
              image: `https://picsum.photos/seed/flash${i}/200/200`,
              soldCount: 450,
              rating: 4.8,
              discount: '-50%',
              location: '海外'
            })}
            className="min-w-[100px] flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative">
              <img 
                src={`https://picsum.photos/seed/flash${i}/200/200`} 
                className="w-24 h-24 object-cover rounded shadow-sm"
                alt="Product"
              />
              <div className="absolute top-0 right-0 bg-yellow-400 text-shopee-orange text-[9px] font-bold px-1 rounded-bl">
                -50%
              </div>
            </div>
            <div className="mt-2 text-shopee-orange font-bold text-sm">
              <span className="text-[10px]">$</span> 299
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full mt-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-shopee-orange w-3/4"></div>
              <span className="absolute inset-0 flex items-center justify-center text-[7px] text-white font-bold uppercase">
                已售出 75%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
