
import React from 'react';
import { Search, ShoppingCart, MessageCircle, Camera } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  scrolled: boolean;
  activeTab: TabType;
  onSearchClick?: () => void;
  onImageSearchClick?: () => void;
  onCartClick?: () => void;
  onChatClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrolled, activeTab, onSearchClick, onImageSearchClick, onCartClick, onChatClick }) => {
  if (activeTab === 'Notifications') {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-gray-800">通知中心</h1>
        <div className="flex gap-4">
          <ShoppingCart onClick={onCartClick} size={22} className="text-[#ee4d2d] cursor-pointer" />
          <MessageCircle onClick={onChatClick} size={22} className="text-[#ee4d2d] cursor-pointer" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-[#ee4d2d] px-3 pt-3 pb-2 shadow-sm transition-all">
      <div className="flex items-center gap-3">
        {/* Search Input Box - Interactive Area */}
        <div 
          onClick={onSearchClick}
          className="flex-1 flex items-center bg-white h-9 rounded-[2px] px-3 shadow-sm cursor-text relative group overflow-hidden"
        >
          <Search size={18} className="text-gray-400 mr-2" />
          <span className="flex-1 text-[13px] text-gray-300 font-medium">搜尋商品、賣家</span>
          <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              onImageSearchClick?.();
            }}
            className="p-1 hover:bg-gray-50 rounded transition-colors active:scale-90"
          >
            <Camera size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <div onClick={onCartClick} className="relative p-2 cursor-pointer active:scale-90 transition-transform">
            <ShoppingCart size={28} className="text-white" strokeWidth={1.5} />
            <span className="absolute top-0 right-0 bg-white text-[#ee4d2d] text-[9px] font-black px-1 rounded-full border border-[#ee4d2d] min-w-[17px] h-4 flex items-center justify-center shadow-sm">
              15
            </span>
          </div>
          <div onClick={onChatClick} className="relative p-2 cursor-pointer active:scale-90 transition-transform">
            <MessageCircle size={28} className="text-white" strokeWidth={1.5} />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-[#ee4d2d]"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
