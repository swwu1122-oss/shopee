
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Ticket, Truck, Sparkles, Clock, CheckCircle2, Info, ChevronRight } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { askShoppingAssistant } from '../services/geminiService';

interface Coupon {
  id: string;
  type: 'shipping' | 'discount' | 'cashback';
  title: string;
  desc: string;
  expiry: string;
  claimed: boolean;
  minSpend?: number;
}

interface CouponListViewProps {
  onBack: () => void;
  initialCategory?: string;
}

const CouponListView: React.FC<CouponListViewProps> = ({ onBack, initialCategory = '全部' }) => {
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [aiAdvice, setAiAdvice] = useState('');

  const tabs = ['全部', '免運券', '全站券', '商城券', '店家券'];

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      
      // 模擬從 API 獲取優惠券
      const mockCoupons: Coupon[] = [
        { id: 'c1', type: 'shipping', title: '全站免運券', desc: '限指定店家使用，滿 $299 免運', expiry: '2025.12.31 止', claimed: false, minSpend: 299 },
        { id: 'c2', type: 'shipping', title: '全站免運券', desc: '不限店家使用，滿 $0 免運', expiry: '2025.12.31 止', claimed: true, minSpend: 0 },
        { id: 'c3', type: 'discount', title: '9折優惠券', desc: '全站商品適用，最高折抵 $100', expiry: '2025.12.31 止', claimed: false, minSpend: 500 },
        { id: 'c4', type: 'cashback', title: '10% 蝦幣回饋', desc: '商城商品適用，無折抵上限', expiry: '2025.12.31 止', claimed: false, minSpend: 0 },
        { id: 'c5', type: 'shipping', title: '海外免運券', desc: '限指定海外店家，滿 $499 免運', expiry: '2025.12.31 止', claimed: false, minSpend: 499 },
      ];

      setCoupons(mockCoupons);

      // AI 生成專屬省錢建議
      const advice = await askShoppingAssistant("請針對目前有的優惠券（免運券、9折券、蝦幣回饋），給我一段 100 字以內的專業省錢分析建議。");
      setAiAdvice(advice);
      
      setLoading(false);
    };
    fetchCoupons();
  }, []);

  const handleClaim = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, claimed: true } : c));
  };

  const filteredCoupons = activeTab === '全部' 
    ? coupons 
    : coupons.filter(c => {
        if (activeTab === '免運券') return c.type === 'shipping';
        if (activeTab === '全站券') return c.type === 'discount';
        return true;
      });

  return (
    <div className="bg-gray-100 min-h-screen animate-in slide-in-from-right duration-300">
      <ProgressBar isLoading={loading} />
      
      <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold">免運與優惠券中心</h1>
      </header>

      {/* Tabs */}
      <div className="sticky top-[52px] z-40 bg-white border-b border-gray-100 overflow-x-auto no-scrollbar flex shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 whitespace-nowrap text-sm font-medium transition-all relative ${
              activeTab === tab ? 'text-[#ee4d2d]' : 'text-gray-500'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ee4d2d]"></div>}
          </button>
        ))}
      </div>

      <div className="p-3 space-y-4">
        {/* AI Analysis Card */}
        <div className="bg-gradient-to-br from-[#1a365d] to-[#2d3748] rounded-2xl p-4 text-white shadow-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-yellow-400" size={18} />
            <h3 className="text-sm font-bold italic">AI 省錢分析建議</h3>
          </div>
          <p className="text-xs text-blue-100/90 leading-relaxed min-h-[40px]">
            {loading ? 'AI 正在分析您的最佳省錢方案...' : aiAdvice}
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
             <span className="text-[10px] text-white/50 italic">由 Gemini Pro 智能驅動分析</span>
             <button className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full border border-white/20">查看更多建議</button>
          </div>
        </div>

        {/* Coupon Grid */}
        <div className="space-y-3">
          {filteredCoupons.map((coupon) => (
            <div 
              key={coupon.id} 
              className={`bg-white rounded-xl overflow-hidden flex shadow-sm relative transition-all ${coupon.claimed ? 'opacity-70' : ''}`}
            >
               {/* Left Segment */}
               <div className={`w-24 flex flex-col items-center justify-center p-3 text-white ${
                 coupon.type === 'shipping' ? 'bg-[#10b981]' : coupon.type === 'cashback' ? 'bg-[#f59e0b]' : 'bg-[#ee4d2d]'
               }`}>
                  {coupon.type === 'shipping' ? <Truck size={32} /> : <Ticket size={32} />}
                  <span className="text-[10px] font-black mt-1 uppercase">
                    {coupon.type === 'shipping' ? '免運' : coupon.type === 'cashback' ? '回饋' : '折價'}
                  </span>
               </div>

               {/* Right Segment */}
               <div className="flex-1 p-3 flex flex-col justify-between border-l border-dashed border-gray-100">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-800">{coupon.title}</h4>
                      {coupon.claimed && <CheckCircle2 size={14} className="text-green-500" />}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 leading-tight">{coupon.desc}</p>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-end">
                    <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                       <Clock size={10} />
                       <span>{coupon.expiry}</span>
                    </div>
                    <button 
                      onClick={() => !coupon.claimed && handleClaim(coupon.id)}
                      disabled={coupon.claimed}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                        coupon.claimed 
                        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-default' 
                        : 'bg-[#ee4d2d] text-white shadow-md active:scale-95'
                      }`}
                    >
                      {coupon.claimed ? '去使用' : '立即領取'}
                    </button>
                  </div>
               </div>

               {/* Decorative Semi-Circles */}
               <div className="absolute top-1/2 -left-2 w-4 h-4 bg-gray-100 rounded-full -translate-y-1/2"></div>
               <div className="absolute top-1/2 -right-2 w-4 h-4 bg-gray-100 rounded-full -translate-y-1/2"></div>
            </div>
          ))}
        </div>

        {/* Promotion Banner */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer active:bg-gray-50">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                 <Info className="text-[#ee4d2d]" size={20} />
              </div>
              <div>
                 <p className="text-sm font-bold text-gray-800">免運券使用說明</p>
                 <p className="text-[10px] text-gray-400">了解如何套用運費抵用券</p>
              </div>
           </div>
           <ChevronRight size={18} className="text-gray-300" />
        </div>
      </div>

      {/* Sticky Bottom Note */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 text-center">
         <p className="text-[10px] text-gray-400">更多驚喜優惠券將於每日 00:00 與 12:00 定時發放</p>
      </div>
    </div>
  );
};

export default CouponListView;
