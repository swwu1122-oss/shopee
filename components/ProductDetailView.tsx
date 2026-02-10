
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  ShoppingCart, 
  MoreVertical, 
  Star, 
  MessageCircle, 
  CheckCircle2,
  ChevronRight,
  Truck,
  Heart,
  Loader2,
  ShieldCheck,
  X,
  Plus,
  Minus,
  Youtube,
  Play
} from 'lucide-react';
import { Product, YouTubeVideo } from '../types';
import { generateProductComments } from '../services/geminiService';
import { searchProductReviews } from '../services/youtubeService';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onBuyNow?: (product: Product) => void;
}

interface Comment {
  username: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onBack, onBuyNow }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [ytVideos, setYtVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState('預設款式');
  const [quantity, setQuantity] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoadingComments(true);
      setLoadingVideos(true);
      
      const [commentResults, videoResults] = await Promise.all([
        generateProductComments(product.name),
        searchProductReviews(product.name)
      ]);
      
      setComments(commentResults);
      setYtVideos(videoResults);
      setLoadingComments(false);
      setLoadingVideos(false);
    };
    fetchContent();
  }, [product.name]);

  const handleAddToCart = () => {
    setShowVariationModal(false);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    setShowVariationModal(false);
    onBuyNow?.(product);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen relative animate-in slide-in-from-right duration-300">
      {/* 頂部導航欄 - 透明懸浮 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 max-w-md mx-auto pointer-events-none">
        <button onClick={onBack} className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white active:scale-90 transition-transform pointer-events-auto">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2 pointer-events-auto">
          <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white active:scale-90 transition-transform">
            <Share2 size={20} />
          </button>
          <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white active:scale-90 transition-transform relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[8px] px-1 rounded-full border border-white">15</span>
          </button>
          <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white active:scale-90 transition-transform">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="pb-24">
        {/* 商品主圖 */}
        <div className="aspect-square bg-white">
          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        </div>

        {/* 商品標題與價格區塊 (對齊截圖風格) */}
        <div className="bg-white p-4">
          <div className="flex items-start gap-2 mb-4">
             <span className="bg-[#ee4d2d] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm italic shrink-0 mt-0.5 uppercase tracking-tighter">MALL</span>
             <h1 className="text-base font-medium leading-tight text-gray-800 line-clamp-2">{product.name}</h1>
          </div>
          
          <div className="flex items-center gap-1.5 mb-6">
            <span className="text-[#ee4d2d] text-xl font-medium">$</span>
            <span className="text-[#ee4d2d] text-4xl font-medium tracking-tighter">{product.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-[#ee4d2d] gap-1">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-bold border-b border-[#ee4d2d] leading-none">{product.rating}</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-200"></div>
              <span className="text-sm text-gray-400">已售出 {product.soldCount}</span>
            </div>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`${isFavorite ? 'text-[#ee4d2d]' : 'text-gray-300'} transition-colors active:scale-125`}
            >
              <Heart size={24} strokeWidth={1.5} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* YouTube 影音開箱區塊 (完全符合截圖設計) */}
        <div className="bg-white mt-2 p-4">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <div className="bg-[#ff0000] p-1.5 rounded-lg flex items-center justify-center">
                    <Youtube size={16} className="text-white fill-white" />
                 </div>
                 <h3 className="text-sm font-bold text-gray-800">YouTube 影音開箱</h3>
              </div>
              <button className="text-[11px] font-medium text-gray-400">熱門評論</button>
           </div>
           
           <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {loadingVideos ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="w-44 shrink-0 aspect-[16/9] bg-[#f2f2f2] rounded-xl animate-pulse" />
                ))
              ) : ytVideos.length > 0 ? (
                ytVideos.map(video => (
                  <div 
                    key={video.id} 
                    onClick={() => setSelectedVideoId(video.id)}
                    className="w-44 shrink-0 cursor-pointer active:scale-95 transition-transform"
                  >
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#f2f2f2] border border-gray-50">
                       <img src={video.thumbnail} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20">
                             <Play className="text-white fill-white" size={20} />
                          </div>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex gap-3">
                   <div className="w-44 h-24 bg-[#f2f2f2] rounded-xl"></div>
                   <div className="w-44 h-24 bg-[#f2f2f2] rounded-xl"></div>
                   <div className="w-12 h-24 bg-[#f2f2f2] rounded-xl"></div>
                </div>
              )}
           </div>
        </div>

        {/* 免運費區塊 (對齊截圖) */}
        <div className="bg-white mt-2">
           <div className="p-4 flex items-center gap-4 active:bg-gray-50 cursor-pointer group">
              <Truck className="text-[#00b14f] shrink-0" size={22} />
              <div className="flex-1">
                 <p className="text-sm font-bold text-gray-800">免運費</p>
                 <p className="text-[11px] text-gray-400 mt-0.5">滿 $299 享免運優惠</p>
              </div>
              <ChevronRight size={18} className="text-gray-200 group-active:text-gray-400 transition-colors" />
           </div>
        </div>

        {/* 商品評價標題 */}
        <div className="bg-white mt-2 border-b border-gray-50">
           <div className="p-4 flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-800">商品評價 ({loadingComments ? '...' : comments.length})</h3>
              <div className="flex items-center gap-1">
                 <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                 </div>
                 <ChevronRight size={14} className="text-gray-300" />
              </div>
           </div>
           
           {/* 模擬留言展示 */}
           {!loadingComments && comments.length > 0 && (
             <div className="px-4 pb-4">
                {comments.slice(0, 1).map((c, i) => (
                  <div key={i} className="flex gap-2">
                     <img src={c.avatar} className="w-6 h-6 rounded-full shrink-0" />
                     <div className="flex-1">
                        <p className="text-[10px] text-gray-500">{c.username}</p>
                        <p className="text-xs text-gray-700 mt-1 line-clamp-2">{c.comment}</p>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>

      {/* 底部按鈕欄 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 h-14 flex items-center p-1 z-[60] shadow-lg">
        <div className="flex flex-1 items-center justify-around h-full">
           <button className="flex flex-col items-center text-[#ee4d2d] active:scale-90 transition-transform">
             <MessageCircle size={20} />
             <span className="text-[10px] font-bold">聊聊</span>
           </button>
           <div className="w-[1px] h-6 bg-gray-100 mx-1"></div>
           <button 
             onClick={() => setShowVariationModal(true)}
             className="flex flex-col items-center text-[#ee4d2d] active:scale-90 transition-transform"
           >
             <ShoppingCart size={20} />
             <span className="text-[10px] font-bold">加購物車</span>
           </button>
        </div>
        <button 
          onClick={() => setShowVariationModal(true)}
          className="flex-[1.5] bg-[#ee4d2d] text-white h-full font-bold text-sm rounded-sm active:opacity-90"
        >
          直接購買
        </button>
      </div>

      {/* YouTube 播放器 Modal */}
      {selectedVideoId && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
           <button 
             onClick={() => setSelectedVideoId(null)}
             className="absolute top-10 right-6 text-white bg-white/10 p-2 rounded-full"
           >
             <X size={24} />
           </button>
           <div className="w-full aspect-video bg-gray-900">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
           </div>
           <div className="p-6 text-white text-center">
              <p className="text-sm font-bold">正在觀看商品開箱評論</p>
              <p className="text-xs opacity-60 mt-2">關閉影片即可回到商品詳情</p>
           </div>
        </div>
      )}

      {/* 規格選擇 Modal */}
      {showVariationModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-end justify-center pointer-events-auto animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-md rounded-t-2xl p-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-end">
                 <button onClick={() => setShowVariationModal(false)} className="p-1 text-gray-400"><X size={20}/></button>
              </div>
              <div className="flex gap-4 mb-6">
                 <img src={product.image} className="w-24 h-24 object-cover rounded-lg border border-gray-100 -mt-10 bg-white shadow-md" />
                 <div className="flex-1">
                    <p className="text-[#ee4d2d] text-2xl font-bold">${product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">庫存：999+</p>
                    <p className="text-xs mt-1 font-medium">選擇: <span className="text-[#ee4d2d]">{selectedVariation}</span></p>
                 </div>
              </div>
              
              <div className="mb-6">
                 <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">規格項目</p>
                 <div className="flex flex-wrap gap-2">
                    {['預設款式', '多色可選', '升級版', '超值組'].map(v => (
                      <button 
                        key={v}
                        onClick={() => setSelectedVariation(v)}
                        className={`px-4 py-2 rounded-md text-[11px] font-bold border transition-all ${
                          selectedVariation === v 
                          ? 'bg-orange-50 border-[#ee4d2d] text-[#ee4d2d]' 
                          : 'bg-gray-50 border-gray-100 text-gray-600'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex items-center justify-between mb-8 border-t border-gray-50 pt-4">
                 <p className="text-sm font-bold text-gray-700">購買數量</p>
                 <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2.5 bg-gray-50 text-gray-400 active:bg-gray-100"><Minus size={14}/></button>
                    <span className="px-6 text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(q => q+1)} className="p-2.5 bg-white text-gray-800 border-l border-gray-200 active:bg-gray-50"><Plus size={14}/></button>
                 </div>
              </div>

              <div className="flex gap-2">
                 <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-100 text-[#ee4d2d] py-3.5 rounded-sm font-bold text-sm active:opacity-80"
                 >
                   加入購物車
                 </button>
                 <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#ee4d2d] text-white py-3.5 rounded-sm font-bold text-sm active:opacity-90"
                 >
                   直接購買
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* 成功提示 */}
      {showAddSuccess && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[110] animate-in zoom-in duration-200">
          <div className="bg-black/70 text-white px-6 py-4 rounded-xl flex flex-col items-center gap-2 backdrop-blur-sm">
            <CheckCircle2 size={40} className="text-green-400" />
            <span className="font-bold text-sm tracking-widest">已加入購物車</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailView;
