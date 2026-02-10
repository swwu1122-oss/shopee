
import React from 'react';
import { CheckCircle, Home, FileText, ShoppingBag, Truck, MapPin } from 'lucide-react';

interface OrderSuccessViewProps {
  orderData: any;
  onBackToHome: () => void;
}

const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ orderData, onBackToHome }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col p-6 animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-black text-gray-800">下單成功！</h1>
        <p className="text-xs text-gray-400 mt-1">訂單編號: {orderData.orderId}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
         <div className="flex items-start gap-3">
            <MapPin size={18} className="text-gray-400 mt-1" />
            <div>
               <p className="text-sm font-bold">{orderData.name} ({orderData.phone})</p>
               <p className="text-xs text-gray-400 mt-0.5">{orderData.city}{orderData.district}{orderData.address}</p>
            </div>
         </div>
         <div className="flex items-center gap-3 border-t pt-4">
            <Truck size={18} className="text-gray-400" />
            <p className="text-sm text-gray-600">已選擇 {orderData.shipping === 'Express' ? '隔日到貨' : '標準宅配'}</p>
         </div>
         <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-800">付款總額</span>
            <span className="text-xl font-black text-[#ee4d2d]">${orderData.amount.toLocaleString()}</span>
         </div>
      </div>

      <div className="mt-auto space-y-3 pb-8">
        <button 
          onClick={onBackToHome}
          className="w-full bg-[#ee4d2d] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
        >
          <Home size={18} />
          回到蝦拼首頁
        </button>
        <button 
          className="w-full bg-white text-gray-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-gray-200 active:bg-gray-50"
        >
          <FileText size={18} />
          查看訂單詳情
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessView;
