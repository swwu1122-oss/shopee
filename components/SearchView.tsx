
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Filter, Search, Loader2, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { searchProductsWithAI } from '../services/geminiService';

interface SearchViewProps {
  query: string;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ query, onBack, onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIProducts = async () => {
      setLoading(true);
      const results = await searchProductsWithAI(query);
      setProducts(results);
      setLoading(false);
    };
    fetchAIProducts();
  }, [query]);

  return (
    <div className="bg-gray-100 min-h-screen animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-[#ee4d2d]" />
        </button>
        <div className="flex-1 flex items-center bg-gray-100 h-9 px-3 rounded text-sm text-gray-800 font-bold">
          <Search size={16} className="mr-2 text-gray-400" />
          <span>{query}</span>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="flex items-center justify-around border-b border-gray-50 py-3 sticky top-[53px] bg-white z-40 shadow-sm">
        <button className="text-xs font-bold text-[#ee4d2d]">精選結果</button>
        <button className="text-xs text-gray-600">最新</button>
        <button className="text-xs text-gray-600">銷量</button>
        <button className="text-xs text-gray-600 flex items-center gap-1">篩選 <Filter size={12} /></button>
      </div>

      <div className="p-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 px-6 text-center">
            <Loader2 className="animate-spin text-[#ee4d2d]" size={32} />
            <p className="text-sm font-bold text-gray-700">搜尋中...</p>
          </div>
        ) : (
          <>
            <div className="mb-3 px-1 flex items-center justify-between">
               <div className="flex items-center gap-2 text-[10px] text-blue-500 font-black uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  搜尋結果 ({products.length})
               </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchView;
