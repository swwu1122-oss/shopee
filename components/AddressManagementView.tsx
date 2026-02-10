
import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, LocateFixed, Check, Loader2, Sparkles, Navigation } from 'lucide-react';
import { askShoppingAssistant } from '../services/geminiService';

interface UserData {
  name: string;
  phone: string;
  address: string;
}

interface AddressManagementViewProps {
  initialUserData: UserData;
  onSave: (data: UserData) => void;
  onBack: () => void;
}

const AddressManagementView: React.FC<AddressManagementViewProps> = ({ initialUserData, onSave, onBack }) => {
  const [address, setAddress] = useState(initialUserData.address);
  const [name, setName] = useState(initialUserData.name);
  const [phone, setPhone] = useState(initialUserData.phone);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const prompt = `我現在的經度是 ${longitude}，緯度是 ${latitude}。請幫我生成一個位於台灣的隨機但合理的測試地址字串，格式為「城市+區域+街道名+號數」，只需回傳地址字串，不要有其他文字。`;
        const result = await askShoppingAssistant(prompt);
        
        if (result && !result.includes('抱歉')) {
          setAddress(result.replace(/["']/g, ''));
        } else {
          setAddress(`定位座標: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        
        setIsLocating(false);
      }, (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        alert("無法取得定位，請確認已開啟權限。");
      });
    } else {
      setIsLocating(false);
      alert("您的瀏覽器不支援定位功能。");
    }
  };

  const handleSave = () => {
    onSave({ name, phone, address });
    // 立即返回，不等待提示
    onBack();
  };

  return (
    <div className="bg-gray-100 min-h-screen animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-shopee-orange" />
        </button>
        <h1 className="text-base font-bold flex-1 text-center pr-8">管理收貨地址</h1>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">地址詳情</span>
            <button 
              onClick={handleLocate}
              disabled={isLocating}
              className="flex items-center gap-1.5 text-xs font-bold text-shopee-orange bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 active:scale-95 transition-all"
            >
              {isLocating ? <Loader2 size={12} className="animate-spin" /> : <LocateFixed size={12} />}
              {isLocating ? '定位中...' : '使用目前位置'}
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 font-bold uppercase">姓名</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-shopee-orange outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 font-bold uppercase">手機號碼</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-shopee-orange outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 font-bold uppercase">詳細地址</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-shopee-orange outline-none h-24 resize-none"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-shopee-orange text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-[0.98] transition-all"
        >
          確認儲存地址
        </button>
      </div>
    </div>
  );
};

export default AddressManagementView;
