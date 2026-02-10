
import React from 'react';
import { ChevronLeft, MapPin, LocateFixed, Navigation, Box, ShieldCheck, Clock, ChevronRight } from 'lucide-react';

interface ShopeeStationViewProps {
  onBack: () => void;
}

const ShopeeStationView: React.FC<ShopeeStationViewProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white px-4 py-3 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold">蝦皮店到店</h1>
      </header>

      <div className="p-4 bg-[#ee4d2d] text-white pb-12">
        <h2 className="text-2xl font-black mb-2">智取店 全新上線</h2>
        <p className="text-xs opacity-80">24H 隨時取件，不需排隊，快速又方便！</p>
      </div>

      <div className="mx-4 -mt-8 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 relative z-10">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <MapPin size={18} className="text-[#ee4d2d]" />
               <span className="text-sm font-bold">搜尋附近門市</span>
            </div>
            <LocateFixed size={18} className="text-blue-500" />
         </div>
         <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
               <Navigation size={20} className="text-[#ee4d2d]" />
            </div>
            <div className="flex-1">
               <p className="text-xs font-bold text-gray-800">台北 101 店 (智取店)</p>
               <p className="text-[10px] text-gray-400">台北市信義區信義路五段7號</p>
            </div>
            <span className="text-[10px] text-gray-400">0.5km</span>
         </div>
         <button className="w-full bg-[#ee4d2d] text-white py-3 rounded-xl font-bold text-sm shadow-md">開啟地圖查看更多</button>
      </div>

      <div className="mt-8 px-4 space-y-4">
         <h3 className="text-sm font-black text-gray-800">服務特色</h3>
         <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
               <Box size={20} className="text-orange-500 mb-2" />
               <p className="text-xs font-bold">免排隊智取</p>
               <p className="text-[9px] text-gray-400 mt-1">自助手續更快速</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
               <Clock size={20} className="text-blue-500 mb-2" />
               <p className="text-xs font-bold">24H 服務</p>
               <p className="text-[9px] text-gray-400 mt-1">取件時間更彈性</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ShopeeStationView;
