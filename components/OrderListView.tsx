
import React from 'react';
import { ChevronLeft, Package, MessageSquare, Truck, Store } from 'lucide-react';

interface OrderListViewProps {
  status: string;
  onBack: () => void;
}

const OrderListView: React.FC<OrderListViewProps> = ({ status, onBack }) => {
  // Mock orders
  const orders = [
    { id: 'TW20250101-001', shop: '官方正貨旗艦店', product: '頂級智慧降噪耳機', price: 8900, qty: 1, status: status, img: 'https://picsum.photos/seed/o1/200/200' },
    { id: 'TW20250102-042', shop: '夏季服飾特賣網', product: '透氣涼感上衣 (白色/L)', price: 399, qty: 3, status: status, img: 'https://picsum.photos/seed/o2/200/200' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1 active:scale-90">
          <ChevronLeft className="text-shopee-orange" />
        </button>
        <h1 className="text-base font-bold flex-1">{status}</h1>
      </header>

      {/* Status Tabs (Mock) */}
      <div className="flex bg-white overflow-x-auto no-scrollbar border-b border-gray-50">
        {['全部', '待付款', '待出貨', '待收貨', '待評價', '已取消', '退貨/退款'].map((tab) => (
          <div 
            key={tab} 
            className={`px-4 py-3 text-sm whitespace-nowrap ${tab === status || (status === '全部訂單' && tab === '全部') ? 'text-shopee-orange border-b-2 border-shopee-orange font-bold' : 'text-gray-600'}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="p-3 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded p-3 shadow-sm">
            <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
              <div className="flex items-center gap-2">
                <Store size={14} className="text-gray-600" />
                <span className="text-xs font-bold">{order.shop}</span>
              </div>
              <span className="text-[10px] text-shopee-orange font-medium uppercase tracking-wider">{order.status}</span>
            </div>

            <div className="flex gap-3 mb-3">
              <img src={order.img} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium line-clamp-2">{order.product}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-gray-400">數量: x{order.qty}</span>
                  <span className="text-xs font-bold">${order.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-50 pt-3">
              <span className="text-[10px] text-gray-400">訂單編號: {order.id}</span>
              <div className="flex gap-2">
                <button className="border border-gray-200 text-gray-600 text-[10px] px-3 py-1.5 rounded active:bg-gray-50">查看詳情</button>
                <button className="bg-shopee-orange text-white text-[10px] px-3 py-1.5 rounded active:opacity-80">再買一次</button>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Package size={48} className="opacity-10 mb-2" />
            <p className="text-sm">尚無相關訂單紀錄</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListView;
