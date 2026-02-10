
import React, { useState } from 'react';
import { ChevronLeft, Search, ShoppingCart, MessageSquare, Trash2, Minus, Plus, ChevronRight, Ticket, Coins } from 'lucide-react';

interface CartViewProps {
  onBack: () => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onBack, onCheckout }) => {
  const [items, setItems] = useState([
    { id: 1, name: '【限時特賣】戶外露營神器 質感盲盒福袋', price: 1, originalPrice: 1200, qty: 1, image: 'https://picsum.photos/seed/camping/200/200' },
    { id: 2, name: '【官方正貨】頂級智慧降噪耳機', price: 8900, originalPrice: 9900, qty: 1, image: 'https://picsum.photos/seed/p1/200/200' }
  ]);
  const [selectedIds, setSelectedIds] = useState<number[]>([1]);

  const toggleSelect = (id: number) => {
    if (selectedIds.indexOf(id) !== -1) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
      if (selectedIds.indexOf(item.id) !== -1) {
        total += item.price * item.qty;
      }
    });
    return total;
  };

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <div className="bg-gray-100 min-h-screen pb-32">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-shopee-orange" size={24} />
        </button>
        <div className="flex items-center gap-2">
           <ShoppingCart className="text-shopee-orange" size={20} fill="currentColor" />
           <h1 className="text-lg font-bold text-shopee-orange border-l border-gray-200 pl-2">購物車</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="text-sm text-gray-600" onClick={() => setSelectedIds([])}>取消選取</button>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <ShoppingCart size={64} className="mb-4 opacity-20" />
          <p>購物車是空的，快去逛逛吧！</p>
          <button onClick={onBack} className="mt-4 border border-shopee-orange text-shopee-orange px-6 py-2 rounded">去首頁</button>
        </div>
      ) : (
        <div className="space-y-3 mt-3">
          {items.map(item => (
            <div key={item.id} className="bg-white p-3">
              <div className="flex items-center gap-3 mb-2">
                <input 
                  type="checkbox" 
                  checked={selectedIds.indexOf(item.id) !== -1}
                  onChange={() => toggleSelect(item.id)}
                  className="w-4 h-4 rounded text-shopee-orange"
                />
                <span className="text-[10px] bg-shopee-orange text-white px-1 rounded">官方店</span>
                <span className="text-xs font-bold truncate">蝦皮精選賣場</span>
              </div>
              <div className="flex gap-3">
                <img src={item.image} className="w-20 h-20 rounded border border-gray-50" />
                <div className="flex-1">
                  <h3 className="text-[11px] leading-tight line-clamp-2">{item.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-shopee-orange font-bold text-sm">${item.price.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 line-through ml-2">${item.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 py-0.5 bg-gray-50 border-r border-gray-200"><Minus size={10}/></button>
                      <span className="px-3 text-xs">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="px-2 py-0.5 bg-white border-l border-gray-200"><Plus size={10}/></button>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button onClick={() => deleteItem(item.id)} className="text-gray-400 p-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 z-50">
        <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between text-[11px] text-gray-600">
          <div className="flex items-center gap-2"><Ticket size={14} className="text-shopee-orange"/> 蝦皮優惠券</div>
          <span>選擇或輸入代碼 <ChevronRight size={10} className="inline"/></span>
        </div>
        <div className="h-14 flex items-center px-4">
          <div className="flex items-center gap-2 mr-auto">
             <input 
               type="checkbox" 
               checked={isAllSelected}
               onChange={() => setSelectedIds(isAllSelected ? [] : items.map(i => i.id))}
               className="w-4 h-4 rounded text-shopee-orange"
             />
             <span className="text-xs">全選</span>
          </div>
          <div className="text-right mr-4">
             <span className="text-xs">總計: </span>
             <span className="text-lg font-bold text-shopee-orange">${calculateTotal().toLocaleString()}</span>
          </div>
          <button 
            onClick={onCheckout}
            disabled={selectedIds.length === 0}
            className="bg-shopee-orange text-white h-full px-8 font-bold text-sm disabled:opacity-50"
          >
            去買單({selectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
