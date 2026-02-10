
import React from 'react';
import { Tag, Truck, Bell, Users, MessageSquare, ChevronRight } from 'lucide-react';

interface NotificationsViewProps {
  onNotifyClick: (item: any) => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onNotifyClick }) => {
  const menuItems = [
    { type: 'promo', icon: <Tag className="text-shopee-orange" />, label: '優惠券與促銷', desc: '新優惠已送達', count: 3 },
    { type: 'order', icon: <Truck className="text-blue-500" />, label: '訂單更新', desc: '包裹已抵達營業所', count: 1 },
    { type: 'feed', icon: <Bell className="text-yellow-500" />, label: '蝦皮動態', desc: '追蹤的賣家有新動態', count: 0 },
    { type: 'friends', icon: <Users className="text-green-500" />, label: '好友活動', desc: '查看好友的分享', count: 0 },
  ];

  const recentNotifications = [
    { id: 1, title: '限時優惠！您感興趣的商品正在打折', body: '快來看看這款商品現在只要 $99，手慢就沒了！', time: '2小時前' },
    { id: 2, title: '恭喜！您獲得一張全站運費抵用券', body: '現在就去領取並使用，滿 $299 即享免運。', time: '5小時前' },
    { id: 3, title: '包裹遞送通知', body: '您的訂單 TW20250101 已由物流夥伴取件。', time: '昨天' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => onNotifyClick(item)}
            className="flex items-center p-4 gap-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{item.label}</p>
                <div className="flex items-center gap-2">
                  {item.count > 0 && <span className="bg-shopee-orange text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.count}</span>}
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 px-4 mb-2">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">最新動態</h3>
      </div>

      <div className="bg-white">
        {recentNotifications.map((notif) => (
          <div 
            key={notif.id} 
            onClick={() => onNotifyClick(notif)}
            className="p-4 flex gap-3 border-b border-gray-50 active:bg-gray-50 cursor-pointer"
          >
            <img src={`https://picsum.photos/seed/notify${notif.id}/100/100`} className="w-12 h-12 rounded object-cover flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-bold leading-tight">{notif.title}</p>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{notif.body}</p>
              <p className="text-[10px] text-gray-300 mt-2">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
