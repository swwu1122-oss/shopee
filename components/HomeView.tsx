
import React, { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, Trophy, Heart, Eye, Zap, Flame, Star, ShoppingBag, Clock, Youtube, MessageSquare } from 'lucide-react';
import { Product, YouTubeVideo } from '../types';
import ProductCard from './ProductCard';
import BannerCarousel from './BannerCarousel';
import { getTrendingShoppingVideos } from '../services/youtubeService';

interface HomeViewProps {
  onProductClick: (product: Product) => void;
  onCategoryClick: (label: string) => void;
  onLiveClick?: (live: any) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onProductClick, onCategoryClick, onLiveClick }) => {
  const [timeLeft, setTimeLeft] = useState(3600 + 1260 + 19); 
  const [activeTab, setActiveTab] = useState('推薦');
  const [ytUnboxing, setYtUnboxing] = useState<YouTubeVideo[]>([]);
  const [loadingYt, setLoadingYt] = useState(true);

  const discoveryTabs = ['推薦', '美妝', '生活', '服飾', '3C', '零食'];

  const shortcuts = [
    { icon: '🚚', label: '全站大免運', color: 'bg-green-50' },
    { icon: '🎫', label: '免運專區', color: 'bg-blue-50' },
    { icon: '🛒', label: '隔日到貨', color: 'bg-red-50' },
    { icon: '💰', label: '蝦皮遊戲', color: 'bg-orange-50' },
    { icon: '📱', label: '加值中心', color: 'bg-indigo-50' },
    { icon: '🛍️', label: '蝦皮超市', color: 'bg-yellow-50' },
    { icon: '🏢', label: '蝦皮店到店', color: 'bg-cyan-50' },
    { icon: '🏷️', label: '折價券', color: 'bg-pink-50' },
    { icon: '🍱', label: '蝦皮美食外送', color: 'bg-emerald-50' },
    { icon: '🎁', label: '會員特權', color: 'bg-purple-50' },
  ];

  const topBrands = [
    { id: 'b1', name: 'Apple 旗艦店', logo: 'https://picsum.photos/seed/apple/200/200' },
    { id: 'b2', name: 'Nike 旗艦店', logo: 'https://picsum.photos/seed/nike/200/200' },
    { id: 'b3', name: 'Dyson 戴森', logo: 'https://picsum.photos/seed/dyson/200/200' },
    { id: 'b4', name: 'Samsung 三星', logo: 'https://picsum.photos/seed/samsung/200/200' },
  ];

  const flashSaleItems = [
    { id: 'fs1', name: '美味輕食沙拉組', price: 201, img: 'https://picsum.photos/seed/food_fs/200/200' },
    { id: 'fs2', name: '質感復古方向盤套', price: 990, img: 'https://picsum.photos/seed/car_fs/200/200' }
  ];

  const liveStreams = [
    { id: 'l1', title: '質感生活美學直播', host: '小雅', viewers: '3.2k', img: 'https://picsum.photos/seed/live_art/400/800' },
    { id: 'l2', title: '戶外運動大促銷', host: '阿強', viewers: '1.5k', img: 'https://picsum.photos/seed/live_nature/400/800' }
  ];

  const feedProducts: Product[] = [
    { id: 'f1', name: '【現貨】韓版簡約寬鬆純棉短T 多色可選', price: 199, image: 'https://picsum.photos/seed/feed1/400/400', soldCount: 15000, rating: 4.9, location: '台中市' },
    { id: 'f2', name: '大容量漸層色運動水壺 1000ml 隨身攜帶', price: 250, image: 'https://picsum.photos/seed/feed2/400/400', soldCount: 8200, rating: 4.8, isMall: true, location: '台北市' },
    { id: 'f3', name: '超強吸力無線手持吸塵器 居家必備', price: 1580, image: 'https://picsum.photos/seed/feed3/400/400', soldCount: 340, rating: 4.7, location: '桃園市', discount: '8折' },
    { id: 'f4', name: '日本熱銷免沖洗護髮油 專業沙龍級', price: 499, image: 'https://picsum.photos/seed/feed4/400/400', soldCount: 2100, rating: 5.0, isMall: true, location: '海外' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    const loadYoutube = async () => {
      setLoadingYt(true);
      const res = await getTrendingShoppingVideos();
      setYtUnboxing(res.slice(0, 5));
      setLoadingYt(false);
    };
    loadYoutube();

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24 relative overflow-x-hidden">
      {/* 1. 橫幅廣告輪播 */}
      <div className="bg-white px-2 pt-2">
        <BannerCarousel />
      </div>

      {/* 2. 捷徑選單 */}
      <div className="bg-white px-2 py-4 grid grid-cols-5 gap-y-4">
        {shortcuts.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform" 
            onClick={() => onCategoryClick(item.label)}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl border border-gray-50 shadow-sm ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[9px] text-gray-600 font-bold text-center leading-tight h-5 flex items-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 3. 限時特賣與直播 (對齊截圖風格) */}
      <div className="flex gap-2 p-2 mt-1">
        {/* FLASH SALE 左側 */}
        <div className="flex-[1.2] bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between" onClick={() => onCategoryClick('限時特賣')}>
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={18} className="text-[#ee4d2d] fill-current" />
              <h2 className="text-[#ee4d2d] font-black text-lg italic uppercase tracking-tighter">FLASH SALE</h2>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-black text-white text-[11px] px-1.5 py-0.5 rounded-[2px] font-black">{time.h}</span>
              <span className="text-black text-[11px] font-bold">:</span>
              <span className="bg-black text-white text-[11px] px-1.5 py-0.5 rounded-[2px] font-black">{time.m}</span>
              <span className="text-black text-[11px] font-bold">:</span>
              <span className="bg-black text-white text-[11px] px-1.5 py-0.5 rounded-[2px] font-black">{time.s}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            {flashSaleItems.map(item => (
              <div 
                key={item.id} 
                className="flex-1 flex flex-col items-center cursor-pointer active:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  onProductClick({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.img,
                    soldCount: 156,
                    rating: 4.8,
                    location: '新北市',
                    isMall: true
                  });
                }}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 w-full mb-2">
                   <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div className="h-full bg-[#ee4d2d] w-3/4"></div>
                   </div>
                </div>
                <span className="text-[#ee4d2d] font-black text-sm">${item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 蝦皮直播 右側 */}
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm" onClick={() => onCategoryClick('蝦皮直播')}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#ee4d2d] font-bold text-sm flex items-center gap-1">
              蝦皮直播 <ChevronRight size={14} className="text-gray-300" />
            </h2>
          </div>
          <div className="flex gap-2">
             {liveStreams.map(live => (
                <div 
                  key={live.id} 
                  className="relative flex-1 aspect-[9/20] rounded-xl overflow-hidden group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLiveClick?.({ ...live, thumbnail: live.img });
                  }}
                >
                   <img src={live.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Live" />
                   <div className="absolute top-2 left-2 bg-[#ee4d2d] text-white text-[8px] px-1.5 py-0.5 rounded-sm flex items-center gap-1 font-bold shadow-lg">
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div> LIVE
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* 4. 品牌旗艦店 (對齊截圖風格) */}
      <div className="px-2 mt-1">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-2">
               <Trophy size={18} className="text-yellow-500 fill-current" />
               <h3 className="text-base font-black text-gray-800">品牌旗艦店</h3>
             </div>
             <button 
               onClick={() => onCategoryClick('全部品牌')} 
               className="text-[11px] font-bold text-gray-400 flex items-center gap-0.5"
             >
               查看更多 <ChevronRight size={14} />
             </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {topBrands.map(brand => (
              <div 
                key={brand.id} 
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => onCategoryClick(`品牌故事: ${brand.name}`)}
              >
                 <div className="w-full aspect-square rounded-[24px] border border-gray-100 p-3 bg-white group-active:scale-95 transition-all shadow-sm flex items-center justify-center overflow-hidden">
                    <img src={brand.logo} className="w-full h-full object-contain" alt={brand.name} />
                 </div>
                 <div className="text-[10px] text-[#ee4d2d] font-black bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    搶免運
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. YouTube 影音開箱 */}
      <div className="px-2 mt-2">
         <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2">
                  <div className="bg-red-600 p-1 rounded-lg">
                    <Youtube size={16} className="text-white fill-white" />
                  </div>
                  <h3 className="text-sm font-black text-gray-800 tracking-tight">YouTube 影音開箱</h3>
               </div>
               <button onClick={() => onCategoryClick('熱門評論')} className="text-[10px] font-bold text-gray-400">熱門評論</button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
               {loadingYt ? (
                 [1, 2, 3].map(i => (
                   <div key={i} className="w-44 shrink-0 aspect-video bg-gray-100 rounded-xl animate-pulse" />
                 ))
               ) : ytUnboxing.map(video => (
                 <div 
                   key={video.id} 
                   onClick={() => onLiveClick?.({ ...video, host: video.channelTitle, viewers: 'YouTube', type: 'video' })}
                   className="w-44 shrink-0 group cursor-pointer active:scale-95 transition-transform"
                 >
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                       <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={video.title} />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                       <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded font-bold backdrop-blur-sm">
                          影音
                       </div>
                    </div>
                    <div className="mt-2 px-1">
                       <p className="text-[10px] font-black text-gray-800 line-clamp-2 leading-tight h-7">{video.title}</p>
                       <div className="flex items-center justify-between mt-1">
                          <p className="text-[9px] text-gray-400 font-medium truncate max-w-[100px]">@{video.channelTitle}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* 6. 每日新發現 */}
      <div className="mt-4 sticky top-[53px] z-40 bg-white border-b border-gray-100 shadow-sm">
         <div className="flex overflow-x-auto no-scrollbar px-1 py-1">
            {discoveryTabs.map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-5 py-2 whitespace-nowrap text-sm font-bold transition-all relative ${
                   activeTab === tab ? 'text-[#ee4d2d]' : 'text-gray-500 font-medium'
                 }`}
               >
                 {tab}
                 {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ee4d2d] rounded-full"></div>}
               </button>
            ))}
         </div>
      </div>

      <div className="p-2">
         <div className="flex items-center gap-2 px-2 py-4">
            <Flame size={18} className="text-[#ee4d2d]" />
            <h2 className="text-base font-black text-gray-800 tracking-tight">每日新發現</h2>
         </div>
         <div className="grid grid-cols-2 gap-2">
            {feedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
            ))}
         </div>
      </div>
    </div>
  );
};

export default HomeView;
