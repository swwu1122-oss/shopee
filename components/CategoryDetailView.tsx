
import React from 'react';
import { ChevronLeft, Search, Filter, LayoutGrid, List } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface CategoryDetailViewProps {
  label: string;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({ label, onBack, onProductClick }) => {
  // 模擬過濾邏輯：如果標籤包含特定關鍵字，則回傳對應的模擬產品
  const getFilteredProducts = () => {
    const allProducts = [
      { id: 'c1', name: label + ' - 熱銷推薦款 A', price: 599, image: 'https://picsum.photos/seed/cat1/400/400', soldCount: 88, rating: 4.8, location: '台北市' },
      { id: 'c2', name: label + ' - 專業級系列 B', price: 1280, image: 'https://picsum.photos/seed/cat2/400/400', soldCount: 45, rating: 4.9, location: '台中市', isMall: true },
      { id: 'c3', name: label + ' - 限定優惠款 C', price: 299, image: 'https://picsum.photos/seed/cat3/400/400', soldCount: 230, rating: 4.5, discount: '5折', location: '海外' },
      { id: 'c4', name: label + ' - 旗艦店正貨 D', price: 2400, image: 'https://picsum.photos/seed/cat4/400/400', soldCount: 12, rating: 5.0, isMall: true, location: '新北市' }
    ];
    return allProducts;
  };

  const products = getFilteredProducts();

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-shopee-orange" />
        </button>
        <div className="flex-1 flex items-center bg-gray-100 h-9 px-3 rounded text-sm text-gray-500">
          <Search size={16} className="mr-2" />
          <span>{label}</span>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="flex items-center justify-around border-b border-gray-50 py-3 sticky top-[53px] bg-white z-40">
        <button className="text-xs font-bold text-shopee-orange">綜合排名</button>
        <button className="text-xs text-gray-600">最新</button>
        <button className="text-xs text-gray-600">銷量</button>
        <button className="text-xs text-gray-600 flex items-center gap-1">
          價格 
          <div className="flex flex-col text-[8px] leading-[0.5]">
            <span>▲</span>
            <span>▼</span>
          </div>
        </button>
        <div className="h-4 w-[1px] bg-gray-200"></div>
        <button className="text-xs text-gray-600 flex items-center gap-1">
          篩選 <Filter size={12} />
        </button>
      </div>

      <div className="p-2 bg-gray-100">
        <div className="grid grid-cols-2 gap-2">
          {products.map(function(p) {
            return (
              <div 
                key={p.id}
                onClick={function() { onProductClick(p); }}
                className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative pt-[100%]">
                  <img src={p.image} className="absolute inset-0 w-full h-full object-cover" />
                  {p.isMall && <div className="absolute top-1 left-1 bg-shopee-orange text-white text-[8px] font-bold px-1 rounded">MALL</div>}
                </div>
                <div className="p-2 flex flex-col flex-1">
                  <h3 className="text-[11px] text-gray-800 line-clamp-2 leading-tight min-h-[2rem]">{p.name}</h3>
                  <div className="mt-auto pt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-shopee-orange text-xs">$</span>
                      <span className="text-shopee-orange font-bold text-base">{p.price.toLocaleString()}</span>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-1">已售出 {p.soldCount} | {p.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailView;
