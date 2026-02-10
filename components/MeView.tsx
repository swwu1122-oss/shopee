
import React from 'react';
import { Settings, ShoppingCart, MessageCircle, Wallet, Coins, CreditCard, ChevronRight, Package, Ticket, Truck, Star, RotateCcw, Heart, Store, HelpCircle, MapPin, Key, User } from 'lucide-react';

interface MeViewProps {
  userName?: string;
  onOrderClick: (status: string) => void;
  onMenuClick: (label: string) => void;
}

const MeView: React.FC<MeViewProps> = ({ userName = 'tom', onOrderClick, onMenuClick }) => {
  const handleSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
  };

  return (
    <div className="animate-in fade-in duration-500 bg-gray-100 min-h-screen">
      {/* Profile Header - Clickable to Account Settings */}
      <div 
        onClick={() => onMenuClick('帳號設定')}
        className="bg-[#ee4d2d] p-6 pb-12 relative overflow-hidden cursor-pointer active:brightness-95 transition-all"
      >
        <div className="flex justify-end gap-4 text-white mb-6 relative z-10 pointer-events-none">
          <Settings size={22} className="opacity-80" />
          <ShoppingCart size={22} className="opacity-80" />
          <MessageCircle size={22} className="opacity-80" />
        </div>
        
        <div className="flex items-center gap-4 text-white relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-white/50 bg-gray-200 overflow-hidden shadow-lg shrink-0">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="Avatar" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">{userName}</h1>
              <div className="flex items-center gap-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full border border-white/20">
                會員中心 <ChevronRight size={10} />
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1 opacity-80 text-[11px]">
               <User size={12} />
               <span>編輯個人資料與頭像</span>
            </div>
            <div className="flex items-center gap-3 mt-3 text-[10px]">
              <span>追蹤中 124</span>
              <span className="w-0.5 h-2 bg-white/30"></span>
              <span>粉絲 88</span>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Order Status Section */}
      <div className="mx-3 -mt-6 bg-white rounded-lg shadow-sm p-4 relative z-10">
        <div 
          onClick={() => onOrderClick('全部訂單')}
          className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2 cursor-pointer group"
        >
          <h2 className="text-sm font-bold">我的購買</h2>
          <span className="text-[11px] text-gray-400 flex items-center group-active:text-[#ee4d2d]">查看購買歷史 <ChevronRight size={14} /></span>
        </div>
        <div className="flex justify-around">
          {[
            { icon: <Wallet size={24} />, label: '待付款' },
            { icon: <Package size={24} />, label: '待出貨' },
            { icon: <Truck size={24} />, label: '待收貨', count: 2 },
            { icon: <Star size={24} />, label: '待評價' },
            { icon: <RotateCcw size={24} />, label: '退貨/退款' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => onOrderClick(item.label)}
              className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
            >
              <div className="text-gray-600 relative">
                {item.icon}
                {item.count && <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[8px] px-1 rounded-full flex items-center justify-center min-w-[14px]">{item.count}</span>}
              </div>
              <span className="text-[10px] text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet & Coins Section */}
      <div className="mx-3 mt-3 bg-white rounded-lg shadow-sm overflow-hidden flex divide-x divide-gray-50">
        <div 
          onClick={() => onMenuClick('蝦皮錢包')}
          className="flex-1 p-3 flex flex-col items-center gap-1 cursor-pointer active:bg-gray-50"
        >
          <Wallet className="text-[#ee4d2d]" size={20} />
          <span className="text-xs font-bold">$0</span>
          <span className="text-[9px] text-gray-400">蝦皮錢包</span>
        </div>
        <div 
          onClick={() => onMenuClick('蝦幣中心')}
          className="flex-1 p-3 flex flex-col items-center gap-1 cursor-pointer active:bg-gray-50"
        >
          <Coins className="text-yellow-500" size={20} />
          <span className="text-xs font-bold">540</span>
          <span className="text-[9px] text-gray-400">我的蝦幣</span>
        </div>
        <div 
          onClick={() => onMenuClick('優惠券')}
          className="flex-1 p-3 flex flex-col items-center gap-1 cursor-pointer active:bg-gray-50"
        >
          {/* Fix: Changed ")" to ">" to properly close the div tag */}
          <Ticket className="text-blue-500" size={20} />
          <span className="text-xs font-bold">12 張</span>
          <span className="text-[9px] text-gray-400">優惠券</span>
        </div>
      </div>

      {/* Main Menu List */}
      <div className="mx-3 mt-3 bg-white rounded-lg shadow-sm overflow-hidden mb-2">
        {[
          { icon: <MapPin className="text-blue-600" />, label: '我的地址' },
          { icon: <Heart className="text-red-500" />, label: '按讚好物' },
          { icon: <RotateCcw className="text-orange-500" />, label: '最近看過' },
          { icon: <Store className="text-blue-500" />, label: '追蹤中的賣家' },
          { icon: <Star className="text-yellow-400" />, label: '我的評價' },
          { icon: <Settings className="text-gray-500" />, label: '帳號設定' },
          { icon: <HelpCircle className="text-green-500" />, label: '幫助中心' },
        ].map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => onMenuClick(item.label)}
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>

      {/* API Selector Tool - Moved to Bottom and subtle */}
      <div className="px-6 py-8 flex flex-col items-center gap-4">
        <button 
          onClick={handleSelectKey}
          className="flex items-center gap-2 text-[10px] font-bold text-gray-400 border border-gray-200 px-6 py-2 rounded-full active:bg-white transition-colors"
        >
          <Key size={12} /> 切換 API 金鑰
        </button>
        <p className="text-[9px] text-gray-300">版本號 2.5.0-flash-native</p>
      </div>
    </div>
  );
};

export default MeView;
