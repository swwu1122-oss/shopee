
import React from 'react';
import { Home, ShoppingBag, PlayCircle, Bell, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'Home' as TabType, icon: <Home size={24} strokeWidth={activeTab === 'Home' ? 2.5 : 2} />, label: '蝦拼' },
    { id: 'Mall' as TabType, icon: <ShoppingBag size={24} strokeWidth={activeTab === 'Mall' ? 2.5 : 2} />, label: '商場' },
    { id: 'Live' as TabType, icon: <PlayCircle size={24} strokeWidth={activeTab === 'Live' ? 2.5 : 2} />, label: '直播' },
    { id: 'Notifications' as TabType, icon: <Bell size={24} strokeWidth={activeTab === 'Notifications' ? 2.5 : 2} />, label: '通知', badge: 12 },
    { id: 'Me' as TabType, icon: <User size={24} strokeWidth={activeTab === 'Me' ? 2.5 : 2} />, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-16 z-[70] px-1 shadow-[0_-2px_15px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-all relative ${
            activeTab === tab.id ? 'text-[#ee4d2d]' : 'text-gray-400'
          }`}
        >
          <div className="mb-0.5 relative">
            {tab.icon}
            {tab.badge && (
              <span className="absolute -top-1.5 -right-2 bg-[#ee4d2d] text-white text-[9px] font-black px-1 rounded-full border border-white min-w-[17px] h-4 flex items-center justify-center shadow-sm">
                {tab.badge}
              </span>
            )}
          </div>
          <span className={`text-[11px] ${activeTab === tab.id ? 'font-black tracking-tighter' : 'font-medium'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
