
import React, { useState } from 'react';
import { ChevronLeft, Search, X, Clock, TrendingUp } from 'lucide-react';

interface SearchSuggestionsViewProps {
  onBack: () => void;
  onSearch: (query: string) => void;
}

const SearchSuggestionsView: React.FC<SearchSuggestionsViewProps> = ({ onBack, onSearch }) => {
  const [input, setInput] = useState('');
  const history = ['iPhone 16', 'Nike 運動鞋', '咖啡機', '人氣零食'];
  const trending = ['保暖外套', '新年福袋', 'PS5 遊戲片', '無線耳機', '空氣清淨機', '保濕精華液'];

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-200 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b flex items-center px-4 py-2 gap-3">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} className="text-[#ee4d2d]" /></button>
        <div className="flex-1 bg-gray-100 h-9 rounded-[2px] px-3 flex items-center">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(input)}
            placeholder="搜尋商品、賣家"
            className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-800"
          />
          {input && <button onClick={() => setInput('')}><X size={16} className="text-gray-400" /></button>}
        </div>
        <button 
          onClick={() => onSearch(input || '推薦商品')}
          className="text-sm font-bold text-[#ee4d2d]"
        >
          搜尋
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recent Search */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold text-gray-400 flex items-center gap-1">
              <Clock size={12} /> 最近搜尋
            </h3>
            <button className="text-[10px] text-gray-300">清除歷史</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map(h => (
              <button 
                key={h} 
                onClick={() => onSearch(h)}
                className="bg-gray-50 border border-gray-100 text-[11px] text-gray-600 px-3 py-1.5 rounded-[2px] active:bg-gray-100"
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Search */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 flex items-center gap-1 mb-3">
            <TrendingUp size={12} /> 熱門搜尋
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {trending.map((t, i) => (
              <button 
                key={t}
                onClick={() => onSearch(t)}
                className="flex items-center gap-3 py-2 border-b border-gray-50 text-left group"
              >
                <span className={`text-[11px] font-black w-4 ${i < 3 ? 'text-[#ee4d2d]' : 'text-gray-300'}`}>{i + 1}</span>
                <span className="text-xs text-gray-700 flex-1 truncate group-active:text-[#ee4d2d]">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestionsView;
