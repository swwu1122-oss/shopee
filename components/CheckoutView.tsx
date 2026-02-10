
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Truck, 
  ChevronRight, 
  CreditCard, 
  Ticket, 
  ShieldCheck, 
  Check, 
  Coins, 
  Loader2, 
  Lock,
  AlertCircle,
  ShieldAlert,
  Navigation,
  Box,
  LocateFixed,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { findNearbyLockers } from '../services/geminiService';

interface UserData {
  name: string;
  phone: string;
  address: string;
  city?: string;
  district?: string;
}

interface CheckoutViewProps {
  initialUserData: UserData;
  product: Product;
  onBack: () => void;
  onOrderComplete: (orderData: any) => void;
}

type CheckoutStep = 'Main' | 'Address' | 'Shipping' | 'Payment' | 'CreditCardForm' | 'LockerSelector';

const CheckoutView: React.FC<CheckoutViewProps> = ({ initialUserData, product, onBack, onOrderComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('Main');
  const [loadingLockers, setLoadingLockers] = useState(false);
  const [nearbyLockers, setNearbyLockers] = useState<any[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: initialUserData.name,
    phone: initialUserData.phone,
    city: initialUserData.city || '台北市',
    district: initialUserData.district || '信義區',
    address: initialUserData.address,
    zip: '110',
    shipping: 'Standard',
    payment: 'COD',
    cardInfo: {
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    }
  });

  const shippingFee = formData.shipping === 'Express' ? 120 : formData.shipping === 'Standard' ? 60 : 45;
  const totalAmount = product.price + shippingFee;

  const handlePlaceOrder = () => {
    if (formData.payment === 'CreditCard' && !formData.cardInfo.number) {
      setStep('CreditCardForm');
      return;
    }
    
    // 移除所有人工延遲與分析畫面
    onOrderComplete({
      ...formData,
      productName: product.name,
      amount: totalAmount,
      orderId: 'TW' + Math.random().toString().slice(2, 12),
      locker: selectedLocker
    });
  };

  const handleSearchLockers = () => {
    setStep('LockerSelector');
    if (nearbyLockers.length > 0) return;

    setLoadingLockers(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const result = await findNearbyLockers(latitude, longitude);
      
      const mockResults = result.chunks.map((chunk: any, index: number) => ({
        id: index,
        name: chunk.maps?.title || `蝦皮智取店 - ${index + 1}號店`,
        address: chunk.maps?.uri ? "點擊查看地圖地址" : "新北市板橋區縣民大道二段7號",
        uri: chunk.maps?.uri,
        distance: `${(Math.random() * 2 + 0.1).toFixed(1)}km`
      }));
      
      setNearbyLockers(mockResults.length > 0 ? mockResults : [
        { id: 101, name: '蝦皮智取店 - 板橋民權店', address: '新北市板橋區民權路202號', distance: '0.4km' },
        { id: 102, name: '蝦皮智取店 - 板橋文化店', address: '新北市板橋區文化路一段120號', distance: '1.2km' },
        { id: 103, name: '蝦皮智取店 - 中和中山店', address: '新北市中和區中山路三段5號', distance: '2.5km' }
      ]);
      setLoadingLockers(false);
    }, (err) => {
      console.error(err);
      setLoadingLockers(false);
      setNearbyLockers([
        { id: 101, name: '蝦皮智取店 - 信義忠孝店', address: '台北市信義區忠孝東路五段', distance: '0.8km' }
      ]);
    });
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setFormData({ ...formData, cardInfo: { ...formData.cardInfo, number: formatted } });
  };

  if (step === 'LockerSelector') {
    return (
      <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-200 flex flex-col">
        <header className="p-4 flex items-center gap-4 border-b bg-white">
          <button onClick={() => setStep('Main')} className="p-1"><ChevronLeft /></button>
          <h1 className="font-bold flex-1">選擇蝦皮智取店</h1>
        </header>
        
        <div className="p-4 flex-1">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-4 flex gap-3">
             <LocateFixed className="text-[#ee4d2d] shrink-0" size={20} />
             <div>
                <p className="text-xs font-bold text-[#ee4d2d]">自動定位附近門市</p>
                <p className="text-[10px] text-orange-800 opacity-70">AI 已根據您的位置篩選出最近的 24H 智取店</p>
             </div>
          </div>

          {loadingLockers ? (
            <div className="flex flex-col items-center py-20 gap-4">
               <Loader2 className="animate-spin text-[#ee4d2d]" size={32} />
               <p className="text-sm text-gray-400 font-medium">搜尋附近的智取店...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {nearbyLockers.map(locker => (
                <div 
                  key={locker.id}
                  onClick={() => {
                    setSelectedLocker(locker);
                    setFormData({...formData, shipping: 'Locker'});
                    setStep('Main');
                  }}
                  className={`bg-white p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedLocker?.id === locker.id ? 'border-[#ee4d2d]' : 'border-transparent shadow-sm'}`}
                >
                   <div className="flex justify-between items-start">
                      <div className="flex gap-2 items-center">
                         <Box size={16} className="text-[#ee4d2d]" />
                         <h3 className="text-sm font-bold">{locker.name}</h3>
                      </div>
                      <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-bold">{locker.distance}</span>
                   </div>
                   <p className="text-xs text-gray-400 mt-2">{locker.address}</p>
                   {locker.uri && (
                     <a href={locker.uri} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-1 text-[10px] text-blue-500 font-bold">
                       <ExternalLink size={10} /> 在地圖中查看詳情
                     </a>
                   )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'Address') {
    return (
      <div className="bg-white min-h-screen animate-in slide-in-from-right duration-200">
        <header className="p-4 flex items-center gap-4 border-b">
          <button onClick={() => setStep('Main')} className="p-1"><ChevronLeft /></button>
          <h1 className="font-bold">編輯收貨地址</h1>
        </header>
        <div className="p-4 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-bold">收件人全名</label>
            <input className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-bold">手機號碼</label>
            <input className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-bold">詳細地址 (含樓層)</label>
            <textarea className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none h-24" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}/>
          </div>
          <button onClick={() => setStep('Main')} className="w-full bg-[#ee4d2d] text-white py-4 rounded-xl font-bold mt-10 shadow-lg">確認修改</button>
        </div>
      </div>
    );
  }

  if (step === 'CreditCardForm') {
    return (
      <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-200">
        <header className="p-4 flex items-center gap-4 border-b bg-white">
          <button onClick={() => setStep('Main')} className="p-1"><ChevronLeft /></button>
          <h1 className="font-bold">新增信用卡</h1>
        </header>
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl mb-6 aspect-[1.6/1] flex flex-col justify-between relative overflow-hidden">
             <div className="flex justify-between items-start">
                <div className="w-12 h-8 bg-yellow-400/20 rounded-md border border-yellow-400/50 flex items-center justify-center"><div className="w-8 h-6 bg-yellow-400/40 rounded-sm"></div></div>
                <div className="text-right italic font-black text-xl">VISA</div>
             </div>
             <div className="text-xl tracking-[0.2em] font-mono">{formData.cardInfo.number || '**** **** **** ****'}</div>
             <div className="flex justify-between items-end"><div className="text-[10px]"><p className="opacity-50 uppercase">Card Holder</p><p className="text-sm font-bold truncate max-w-[150px]">{formData.cardInfo.name || 'YOUR NAME'}</p></div><div className="text-[10px] text-right"><p className="opacity-50 uppercase">Expires</p><p className="text-sm font-bold">{formData.cardInfo.expiry || 'MM/YY'}</p></div></div>
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4 border border-gray-100">
             <div className="space-y-1"><label className="text-[10px] text-gray-400 font-bold uppercase">卡片號碼</label><input placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none" value={formData.cardInfo.number} onChange={handleCardNumberChange}/></div>
             <div className="grid grid-cols-2 gap-4"><div className="space-y-1"><label className="text-[10px] text-gray-400 font-bold uppercase">有效期限</label><input placeholder="MM/YY" className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none" value={formData.cardInfo.expiry} onChange={e => setFormData({...formData, cardInfo: {...formData.cardInfo, expiry: e.target.value}})}/></div><div className="space-y-1"><label className="text-[10px] text-gray-400 font-bold uppercase">CVV</label><input placeholder="123" className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none" value={formData.cardInfo.cvv} onChange={e => setFormData({...formData, cardInfo: {...formData.cardInfo, cvv: e.target.value}})}/></div></div>
             <div className="space-y-1"><label className="text-[10px] text-gray-400 font-bold uppercase">持卡人姓名</label><input placeholder="英文姓名" className="w-full bg-gray-50 p-3 rounded-lg text-sm border focus:border-[#ee4d2d] outline-none" value={formData.cardInfo.name} onChange={e => setFormData({...formData, cardInfo: {...formData.cardInfo, name: e.target.value.toUpperCase()}})}/></div>
          </div>
          <button onClick={() => { setFormData({...formData, payment: 'CreditCard'}); setStep('Main'); }} className="w-full bg-[#ee4d2d] text-white py-4 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition-transform">確認使用此卡</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-32 animate-in fade-in duration-300">
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1"><ChevronLeft className="text-[#ee4d2d]" /></button>
        <h1 className="text-base font-bold flex-1 text-center pr-8">確認訂單</h1>
      </header>

      {/* 1. Address Summary */}
      <div onClick={() => setStep('Address')} className="bg-white p-4 relative border-b-2 border-dashed border-[#ee4d2d] cursor-pointer active:bg-gray-50">
        <div className="flex items-start gap-3">
          <MapPin className="text-[#ee4d2d] mt-1" size={18} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold">{formData.name}</p>
              <p className="text-sm text-gray-500">{formData.phone}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{formData.address}</p>
          </div>
          <ChevronRight size={18} className="text-gray-300 self-center" />
        </div>
      </div>

      {/* 2. Product Summary */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-2">
          <ShieldCheck size={16} className="text-shopee-orange" />
          <span className="text-sm font-bold">蝦皮購物官方旗艦店</span>
        </div>
        <div className="flex gap-3">
          <img src={product.image} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
          <div className="flex-1 flex flex-col justify-between py-1">
            <p className="text-sm font-medium line-clamp-2 leading-tight">{product.name}</p>
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-sm">規格: 預設選項</span>
              <p className="text-sm font-bold">${product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Shipping Options */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center gap-2 mb-3">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">物流方式</h3>
           <span className="bg-green-100 text-green-700 text-[8px] px-1 rounded font-bold">免運可用</span>
        </div>
        <div className="space-y-3">
           {[
             { id: 'Locker', label: '蝦皮店到店 - 智取店', price: 45, desc: '24小時取件・AI 智取門市' },
             { id: 'Standard', label: '標準宅配', price: 60, desc: '預計 2/15 - 2/17 抵達' },
             { id: 'Express', label: '隔日到貨', price: 120, desc: '明日抵達！平日14:00前下單適用' },
           ].map(opt => (
             <div 
               key={opt.id} 
               onClick={() => {
                 if (opt.id === 'Locker') {
                   handleSearchLockers();
                 } else {
                   setFormData({...formData, shipping: opt.id});
                 }
               }}
               className={`p-3 rounded-xl border flex justify-between items-center transition-all ${formData.shipping === opt.id ? 'border-[#ee4d2d] bg-orange-50' : 'border-gray-100 bg-gray-50/30'}`}
             >
               <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.shipping === opt.id ? 'border-[#ee4d2d]' : 'border-gray-300'}`}>
                     {formData.shipping === opt.id && <div className="w-2.5 h-2.5 bg-[#ee4d2d] rounded-full"></div>}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                       <p className="text-sm font-bold">{opt.label}</p>
                       {opt.id === 'Locker' && <Sparkles size={12} className="text-[#ee4d2d]" />}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{opt.id === 'Locker' && selectedLocker ? selectedLocker.name : opt.desc}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#ee4d2d]">${opt.price}</p>
                  {opt.id === 'Locker' && <ChevronRight size={14} className="text-gray-300" />}
               </div>
             </div>
           ))}
        </div>
        {formData.shipping === 'Locker' && selectedLocker && (
           <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-start gap-2 border border-dashed border-gray-200">
              <div className="flex-1">
                 <p className="text-[11px] font-bold">已選門市：{selectedLocker.name}</p>
                 <p className="text-[10px] text-gray-400">{selectedLocker.address}</p>
              </div>
              <button onClick={handleSearchLockers} className="text-[10px] text-[#ee4d2d] font-bold">更換</button>
           </div>
        )}
      </div>

      <div className="bg-white mt-2 p-4">
        <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">付款方式</h3>
        <div className="grid grid-cols-1 gap-2">
           {[
             { id: 'COD', label: '貨到付款', icon: <Truck size={16} />, desc: '適合不方便線上支付的用戶' },
             { id: 'CreditCard', label: '信用卡 / 金融卡', icon: <CreditCard size={16} />, desc: formData.cardInfo.number ? `末四碼 ${formData.cardInfo.number.slice(-4)}` : '未設定' },
             { id: 'ShopeePay', label: 'ShopeePay', icon: <div className="text-[8px] font-black bg-[#ee4d2d] text-white px-1 rounded-sm">Pay</div>, desc: '餘額 $0' },
           ].map(pay => (
             <div key={pay.id} onClick={() => { if (pay.id === 'CreditCard' && !formData.cardInfo.number) { setStep('CreditCardForm'); } else { setFormData({...formData, payment: pay.id}); } }} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${formData.payment === pay.id ? 'border-[#ee4d2d] bg-orange-50' : 'border-gray-100 bg-white'}`}>
               <div className="flex items-center gap-3">
                  <div className="text-[#ee4d2d]">{pay.icon}</div>
                  <div><span className="text-sm font-medium">{pay.label}</span><p className="text-[10px] text-gray-400">{pay.desc}</p></div>
               </div>
               <div className="flex items-center gap-2">{pay.id === 'CreditCard' && <span className="text-[10px] text-[#ee4d2d] font-bold">編輯</span>}{formData.payment === pay.id ? (<div className="w-4 h-4 rounded-full bg-[#ee4d2d] flex items-center justify-center text-white"><Check size={10} strokeWidth={4} /></div>) : <ChevronRight size={14} className="text-gray-300" />}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-white mt-2 p-4 space-y-2 mb-24">
        <div className="flex justify-between text-xs text-gray-500"><span>商品小計</span><span>${product.price.toLocaleString()}</span></div>
        <div className="flex justify-between text-xs text-gray-500"><span>運費小計</span><span>${shippingFee}</span></div>
        <div className="flex justify-between items-center pt-4 border-t mt-4"><span className="text-sm font-bold">訂單總金額</span><span className="text-xl font-black text-[#ee4d2d]">${totalAmount.toLocaleString()}</span></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t h-20 flex items-center justify-between z-[70] px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
        <div className="text-left"><p className="text-[10px] text-gray-400">總付款金額</p><p className="text-xl font-black text-[#ee4d2d] leading-none">${totalAmount.toLocaleString()}</p></div>
        <button onClick={handlePlaceOrder} className="bg-[#ee4d2d] text-white px-10 py-3.5 rounded-sm font-bold text-sm active:scale-95 flex items-center gap-2 transition-all shadow-lg">下單購買</button>
      </div>
    </div>
  );
};

export default CheckoutView;
