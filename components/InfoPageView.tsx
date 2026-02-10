
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Info, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { askShoppingAssistant } from '../services/geminiService';

interface InfoPageViewProps {
  title: string;
  context?: string;
  onBack: () => void;
}

const InfoPageView: React.FC<InfoPageViewProps> = ({ title, context, onBack }) => {
  const [aiContent, setAiContent] = useState(context || '正在獲取詳細資歷資訊...');
  const [isSyncing, setIsSyncing] = useState(!context);

  useEffect(() => {
    // 即使有傳入 context，也可以在背景更新更詳細的內容，但不使用全螢幕 loading 擋住使用者
    const fetchDetailedInfo = async () => {
      if (!context) setIsSyncing(true);
      const prompt = `請針對「${title}」這個品牌或功能，提供專業且詳細的資歷、背景介紹、以及對消費者的保障說明。請直接給出內容，不要有開場白。`;
      const result = await askShoppingAssistant(prompt);
      setAiContent(result);
      setIsSyncing(false);
    };
    fetchDetailedInfo();
  }, [title, context]);

  return (
    <div className="bg-white min-h-screen flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header - 依據截圖風格：橘紅色的返回箭頭，置中標題 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center">
        <button onClick={onBack} className="p-1 active:scale-90 transition-transform">
          <ChevronLeft className="text-[#ee4d2d]" size={28} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold pr-8 text-gray-800">{title}</h1>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center">
        {/* 1. 橘色圓角方塊與資訊圖示 (對齊截圖) */}
        <div className="w-32 h-32 bg-[#fff5f2] rounded-[32px] flex items-center justify-center mb-10 mt-4 shadow-sm">
           <div className="w-16 h-16 rounded-full border-4 border-[#ee4d2d] flex items-center justify-center">
              <span className="text-[#ee4d2d] text-4xl font-serif font-bold italic">i</span>
           </div>
        </div>

        {/* 2. 灰色標題條 (對齊截圖) */}
        <div className="w-full h-8 bg-[#f2f2f2] rounded-lg mb-6 flex items-center px-4">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Official Verification</span>
           </div>
        </div>

        {/* 3. 大型內容顯示區 (對齊截圖) */}
        <div className="w-full flex-1 bg-[#f9f9f9] rounded-2xl p-6 border border-gray-50 shadow-inner relative overflow-hidden">
           {isSyncing && (
             <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
                <div className="h-full bg-[#ee4d2d] w-1/3 animate-[loading_1s_infinite_linear]"></div>
             </div>
           )}
           
           <div className="flex items-center gap-2 mb-4">
              <Award className="text-orange-400" size={18} />
              <h3 className="text-sm font-bold text-gray-700">詳細資歷與介紹</h3>
           </div>
           
           <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
             {aiContent}
           </p>

           <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[#ee4d2d]">
                 <Sparkles size={14} />
                 <span className="text-[11px] font-bold">由蝦拼 AI 智慧管家彙整提供</span>
              </div>
           </div>
        </div>
      </main>

      {/* 底部按鈕 */}
      <div className="p-6 bg-white border-t border-gray-50">
         <button 
           onClick={onBack}
           className="w-full bg-[#ee4d2d] text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-100 active:scale-[0.98] transition-transform"
         >
           返回
         </button>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default InfoPageView;
