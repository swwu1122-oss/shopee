
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Smartphone, 
  Gamepad2, 
  Receipt, 
  HeartPulse, 
  Plane, 
  Gift, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  CreditCard,
  Loader2,
  Search,
  CheckCircle2,
  Zap,
  Ticket,
  MapPin,
  Calendar,
  Utensils,
  Wallet,
  TrendingUp,
  BarChart3,
  Coffee,
  Car,
  // Add Coins icon fix
  Coins
} from 'lucide-react';
import { askShoppingAssistant } from '../services/geminiService';
import ProgressBar from './ProgressBar';

interface ValueAddedCenterViewProps {
  onBack: () => void;
}

type ServiceType = {
  id: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  color: string;
};

const ValueAddedCenterView: React.FC<ValueAddedCenterViewProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [subLoading, setSubLoading] = useState(false);
  const [serviceInfo, setServiceInfo] = useState('');

  const services: ServiceType[] = [
    { id: 'topup', icon: <Smartphone className="text-blue-500" />, label: '手機儲值', desc: '即時儲值免手續費', color: 'bg-blue-50' },
    { id: 'games', icon: <Gamepad2 className="text-purple-500" />, label: '遊戲點數', desc: '熱門遊戲點數卡', color: 'bg-purple-50' },
    { id: 'bills', icon: <Receipt className="text-orange-500" />, label: '生活繳費', desc: '水電瓦斯一鍵繳', color: 'bg-orange-50' },
    { id: 'insurance', icon: <HeartPulse className="text-red-500" />, label: '保險服務', desc: '線上投保好安心', color: 'bg-red-50' },
    { id: 'travel', icon: <Plane className="text-cyan-500" />, label: '機票票券', desc: '國內外優惠機票', color: 'bg-cyan-50' },
    { id: 'eticket', icon: <Gift className="text-pink-500" />, label: '電子票券', desc: '連鎖餐飲下午茶', color: 'bg-pink-50' },
    { id: 'credit', icon: <CreditCard className="text-indigo-500" />, label: '信用卡中心', desc: '繳卡費拿回饋', color: 'bg-indigo-50' },
    { id: 'ai_wealth', icon: <Sparkles className="text-yellow-500" />, label: '智能理財', desc: '小資存錢計畫', color: 'bg-yellow-50' },
  ];

  useEffect(() => {
    const fetchAIAdvice = async () => {
      setLoading(true);
      const advice = await askShoppingAssistant("請針對『加值中心』的所有功能，給一段 80 字內的智慧生活理財建議。");
      setAiAdvice(advice);
      setLoading(false);
    };
    fetchAIAdvice();
  }, []);

  const handleServiceClick = async (service: ServiceType) => {
    setSelectedService(service);
    setSubLoading(true);
    const info = await askShoppingAssistant(`請針對『${service.label}』服務，撰寫一段 80 字內的貼心提示或目前的省錢亮點。`);
    setServiceInfo(info);
    setSubLoading(false);
  };

  const renderDetailContent = () => {
    if (!selectedService) return null;

    switch (selectedService.id) {
      case 'topup':
        return (
          <div className="p-4 space-y-5">
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-500 mb-3">儲值手機號碼</p>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 focus-within:border-[#ee4d2d]">
                   <Smartphone size={18} className="text-gray-400" />
                   <input type="tel" placeholder="09XX-XXX-XXX" className="bg-transparent border-none outline-none text-sm font-bold flex-1" defaultValue="0912345678" />
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                {[100, 300, 500, 1000].map(price => (
                  <div key={price} className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-all cursor-pointer hover:border-[#ee4d2d]">
                     <p className="text-lg font-black text-gray-800">${price}</p>
                     <p className="text-[10px] text-green-600 font-bold">送 5% 蝦幣</p>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'games':
        return (
          <div className="p-4 space-y-5">
             <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="搜尋遊戲或點數卡..." className="w-full bg-white p-3 pl-10 rounded-xl text-xs border border-gray-100 outline-none shadow-sm" />
             </div>
             <div className="grid grid-cols-3 gap-3">
                {['MyCard', 'Garena', 'Steam', 'Nintendo', 'PSN', 'Riot'].map((n, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl flex flex-col items-center gap-2 border border-gray-100 shadow-sm active:scale-95">
                     <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-xl font-bold text-gray-400">{n[0]}</div>
                     <span className="text-[10px] font-bold text-gray-600">{n}</span>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'bills':
        return (
          <div className="p-4 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">繳費項目</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '水費', icon: <Zap className="text-blue-500" />, color: 'bg-blue-50' },
                { label: '電費', icon: <Zap className="text-yellow-500" />, color: 'bg-yellow-50' },
                { label: '瓦斯費', icon: <Zap className="text-orange-500" />, color: 'bg-orange-50' },
                { label: '電信費', icon: <Smartphone className="text-indigo-500" />, color: 'bg-indigo-50' },
                { label: '停車費', icon: <Car className="text-gray-500" />, color: 'bg-gray-50' },
                { label: '學雜費', icon: <Receipt className="text-green-500" />, color: 'bg-green-50' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 active:scale-95 shadow-sm">
                  <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>{item.icon}</div>
                  <span className="text-xs font-bold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'insurance':
        return (
          <div className="p-4 space-y-4">
             <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-5 text-white shadow-lg">
                <h4 className="font-bold text-sm">平安出遊，線上投保</h4>
                <p className="text-[10px] opacity-80 mt-1">最低 $50 起，5分鐘快速生效</p>
                <button className="mt-4 bg-white text-red-600 text-[10px] font-black px-4 py-1.5 rounded-full">立即試算</button>
             </div>
             <div className="space-y-3">
                {['旅平險', '意外險', '防疫險', '汽機車險'].map(n => (
                  <div key={n} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center active:bg-gray-50">
                    <div className="flex items-center gap-3">
                       <HeartPulse className="text-red-500" size={18} />
                       <span className="text-xs font-bold">{n}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                ))}
             </div>
          </div>
        );
      case 'travel':
        return (
          <div className="p-4 space-y-4">
             <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                   <div className="flex-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">出發地</p>
                      <p className="text-sm font-black border-b border-gray-100 py-2">台北 (TPE)</p>
                   </div>
                   <div className="bg-cyan-50 p-2 rounded-full"><Plane className="text-cyan-600 rotate-90" size={16} /></div>
                   <div className="flex-1 text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">目的地</p>
                      <p className="text-sm font-black border-b border-gray-100 py-2">東京 (NRT)</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                   <Calendar size={14} /> 2025/03/15 - 2025/03/22
                </div>
                <button className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-cyan-100">搜尋最低價機票</button>
             </div>
          </div>
        );
      case 'eticket':
        return (
          <div className="p-4 space-y-4">
             <div className="flex overflow-x-auto gap-3 no-scrollbar py-1">
                {['咖啡飲料', '美食餐廳', '舒壓按摩', '電影票券'].map(f => (
                  <button key={f} className="px-4 py-2 bg-pink-50 text-pink-600 text-[10px] font-black rounded-full whitespace-nowrap border border-pink-100">{f}</button>
                ))}
             </div>
             <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { n: '星巴克 150元券', p: 135, i: <Coffee /> },
                  { n: '陶板屋 套餐券', p: 645, i: <Utensils /> },
                  { n: '威秀影城 雙人券', p: 580, i: <Ticket /> },
                  { n: '漢來海港 平日午餐', p: 850, i: <Utensils /> },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm active:scale-95">
                     <div className="aspect-[4/3] bg-pink-50 flex items-center justify-center text-pink-300">{item.i}</div>
                     <div className="p-2.5">
                        <p className="text-[11px] font-bold text-gray-800 line-clamp-1">{item.n}</p>
                        <p className="text-[#ee4d2d] font-black text-sm mt-1">${item.p}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'credit':
        return (
          <div className="p-4 space-y-4">
             <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                   <h4 className="font-bold text-sm">蝦拼信用卡</h4>
                   <p className="text-[10px] opacity-80 mt-1">最高 10% 蝦幣回饋</p>
                   <button className="mt-4 bg-white text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full">立即申請</button>
                </div>
                <CreditCard className="absolute -right-4 top-1/2 -translate-y-1/2 text-white/10" size={100} />
             </div>
             <div className="space-y-3">
                {[
                  { l: '繳交信用卡費', d: '全台銀行皆可繳', i: <Wallet /> },
                  { l: '分期付款設定', d: '減輕您的支付負擔', i: <Clock /> },
                  { l: '紅利點數查詢', d: '點數可兌換蝦幣', i: <Coins /> },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm active:bg-gray-50">
                    <div className="text-indigo-500">{item.i}</div>
                    <div className="flex-1">
                       <p className="text-xs font-bold text-gray-800">{item.l}</p>
                       <p className="text-[10px] text-gray-400">{item.d}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                ))}
             </div>
          </div>
        );
      case 'ai_wealth':
        return (
          <div className="p-4 space-y-4">
             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                   <TrendingUp className="text-yellow-600" size={18} />
                   <h4 className="text-xs font-bold text-gray-800 uppercase tracking-widest">個人財富概覽</h4>
                </div>
                <div className="flex items-end gap-2 mb-6">
                   <span className="text-[10px] text-gray-400 mb-1">本月累計節省</span>
                   <span className="text-2xl font-black text-green-600">$1,240</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                      <p className="text-[9px] text-yellow-800 font-bold opacity-70">蝦幣資產</p>
                      <p className="text-sm font-black text-yellow-900 mt-1">540 <span className="text-[8px] font-normal">幣</span></p>
                   </div>
                   <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <p className="text-[9px] text-blue-800 font-bold opacity-70">儲值餘額</p>
                      <p className="text-sm font-black text-blue-900 mt-1">$0</p>
                   </div>
                </div>
             </div>
             <div className="bg-gray-800 rounded-2xl p-5 text-white shadow-xl flex items-center gap-4">
                <BarChart3 className="text-yellow-400 shrink-0" size={32} />
                <div className="flex-1">
                   <p className="text-[11px] font-bold">智能理財建議</p>
                   <p className="text-[9px] text-white/60 mt-0.5 italic">根據您的消費習慣，建議將結餘轉入...</p>
                </div>
                <ChevronRight size={16} />
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderServiceDetail = () => {
    if (!selectedService) return null;

    return (
      <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col animate-in slide-in-from-right duration-300">
        <ProgressBar isLoading={subLoading} />
        <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white px-4 py-3 flex items-center gap-4 shadow-sm">
          <button onClick={() => setSelectedService(null)} className="p-1 active:scale-90"><ChevronLeft size={24} /></button>
          <h1 className="text-lg font-bold">{selectedService.label}</h1>
        </header>

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Header Card */}
          <div className="bg-[#ee4d2d] px-4 pb-16 pt-4">
             <div className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex items-center gap-4">
                <div className={`w-16 h-16 ${selectedService.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                   {selectedService.icon}
                </div>
                <div className="flex-1">
                   <h2 className="text-white font-black text-xl">{selectedService.label}</h2>
                   <p className="text-white/70 text-[10px] mt-1 italic uppercase tracking-widest">Shopee Value Service</p>
                </div>
             </div>
          </div>

          {/* AI Info Box */}
          <div className="mx-4 -mt-10 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 relative z-10">
             <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-yellow-500" size={16} />
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">AI 智慧提示</h3>
             </div>
             {subLoading ? (
               <div className="flex items-center gap-2 py-2">
                  <Loader2 className="animate-spin text-gray-300" size={14} />
                  <p className="text-[10px] text-gray-300 italic">正在獲取專屬數據...</p>
               </div>
             ) : (
               <p className="text-[11px] text-gray-600 leading-relaxed italic border-l-2 border-[#ee4d2d] pl-3">
                 「{serviceInfo}」
               </p>
             )}
          </div>

          {/* Dynamic Content Based on ID */}
          {renderDetailContent()}

          {/* Safety Notice */}
          <div className="p-6">
             <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3 border border-green-100">
                <ShieldCheck className="text-green-600 mt-0.5 shrink-0" size={18} />
                <div>
                   <p className="text-[11px] font-bold text-green-800">安全支付保障</p>
                   <p className="text-[9px] text-green-600/70 mt-0.5 leading-relaxed">
                     所有交易均受 SSL 256 加密保護，若加值失敗將於 24 小時內退款。
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
           <button className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-xl font-bold text-xs active:scale-95 transition-all">常見問題</button>
           <button className="flex-[2] bg-[#ee4d2d] text-white py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-orange-100 active:scale-95 transition-all">立即開始使用</button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10 animate-in slide-in-from-right duration-300 overflow-x-hidden">
      <ProgressBar isLoading={loading} />
      
      <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white px-4 py-3 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-1 active:scale-90"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold">加值中心</h1>
      </header>

      <div className="bg-[#ee4d2d] px-4 pb-12 pt-4">
        <div className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-md">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-black text-xl italic tracking-tighter">VALUE HUB</h2>
              <div className="bg-yellow-400 text-[#ee4d2d] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                EXCLUSIVE
              </div>
           </div>
           <p className="text-white/80 text-xs leading-relaxed">
             手機儲值、生活繳費、保險理財一站式完成，使用蝦拼錢包支付更享回饋！
           </p>
        </div>
      </div>

      <div className="mx-4 -mt-8 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 relative z-10">
         <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
               <Sparkles className="text-[#ee4d2d]" size={16} />
            </div>
            <h3 className="text-sm font-bold text-gray-800">AI 智慧加值建議</h3>
         </div>
         {loading ? (
            <div className="flex items-center gap-2 py-2">
               <Loader2 className="animate-spin text-gray-300" size={14} />
               <p className="text-xs text-gray-300 italic">正在運算個人化建議...</p>
            </div>
         ) : (
            <p className="text-[11px] text-gray-600 leading-relaxed italic border-l-2 border-[#ee4d2d] pl-3">
              「{aiAdvice}」
            </p>
         )}
      </div>

      <div className="mt-8 px-4">
         <h3 className="text-sm font-black text-gray-800 mb-6 px-1 flex items-center gap-2 uppercase tracking-widest">
           <Zap size={16} className="text-[#ee4d2d] fill-current" /> 服務類別
         </h3>
         <div className="grid grid-cols-4 gap-y-10">
            {services.map((service, idx) => (
               <div 
                key={idx} 
                onClick={() => handleServiceClick(service)}
                className="flex flex-col items-center gap-3 cursor-pointer group active:scale-90 transition-transform"
               >
                  <div className={`w-14 h-14 ${service.color} rounded-[22px] flex items-center justify-center shadow-sm border border-gray-50 group-hover:shadow-md transition-all`}>
                     {service.icon}
                  </div>
                  <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">
                    {service.label}
                  </span>
               </div>
            ))}
         </div>
      </div>

      <div className="mt-12 px-4">
         <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-1">
                 <Ticket size={14} className="text-yellow-400" />
                 <span className="text-[10px] font-bold tracking-widest opacity-80 uppercase">Promo</span>
               </div>
               <h4 className="font-black text-xl italic tracking-tighter uppercase">電費繳交 5% 回饋</h4>
               <p className="text-[11px] opacity-70 mt-1">使用蝦拼信用卡，上限 200 蝦幣</p>
               <button className="mt-4 bg-white text-indigo-800 text-[11px] font-black px-5 py-2 rounded-full uppercase">
                  立即領取
               </button>
            </div>
            <Receipt size={100} className="absolute -right-6 top-1/2 -translate-y-1/2 text-white/5 rotate-12" />
         </div>
      </div>

      <div className="mt-12 px-4 pb-12">
         <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">最近紀錄</h3>
            <button className="text-[10px] font-bold text-gray-400">查看全部 <ChevronRight size={12} className="inline"/></button>
         </div>
         <div className="space-y-4">
            {[
              { label: '遠傳電信 $300', date: '2025/02/10', status: '完成' },
              { label: '台灣電力公司', date: '2025/01/25', status: '完成' },
            ].map((record, idx) => (
               <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                        <Clock size={18} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-gray-800">{record.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{record.date}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-black">{record.status}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {renderServiceDetail()}
    </div>
  );
};

export default ValueAddedCenterView;
