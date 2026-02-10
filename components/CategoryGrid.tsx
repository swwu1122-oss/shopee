
import React from 'react';
import { CreditCard, Truck, Zap, Gamepad2, Gift, LayoutGrid, Coins, Receipt } from 'lucide-react';

const categories = [
  { icon: <CreditCard className="text-blue-500" />, label: '蝦皮信用卡' },
  { icon: <Truck className="text-green-500" />, label: '免運專區' },
  { icon: <Coins className="text-yellow-500" />, label: '蝦幣獎勵' },
  { icon: <Zap className="text-red-500" />, label: '限時特賣' },
  { icon: <Gamepad2 className="text-purple-500" />, label: '蝦皮遊戲' },
  { icon: <Receipt className="text-orange-500" />, label: '蝦皮超取' },
  { icon: <Gift className="text-pink-500" />, label: '全站優惠' },
  { icon: <LayoutGrid className="text-gray-500" />, label: '所有類別' },
];

interface CategoryGridProps {
  onClick: (label: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onClick }) => {
  return (
    <div className="grid grid-cols-4 bg-white px-2 py-4 mt-2 gap-y-4">
      {categories.map((cat, idx) => (
        <div 
          key={idx} 
          onClick={() => onClick(cat.label)}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl group-active:scale-90 transition-transform shadow-sm">
            {cat.icon}
          </div>
          <span className="text-[10px] text-gray-600 font-medium">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
