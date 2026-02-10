
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, X, ImageIcon, Zap, Loader2, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { searchProductsWithAI } from '../services/geminiService';

interface ImageSearchViewProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const ImageSearchView: React.FC<ImageSearchViewProps> = ({ onBack, onProductClick }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [resultProducts, setResultProducts] = useState<Product[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    // 模擬 AI 分析圖片與搜尋
    const products = await searchProductsWithAI("精選相似產品");
    setResultProducts(products);
    setIsCapturing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black max-w-md mx-auto flex flex-col animate-in fade-in duration-300">
      {/* Camera View */}
      <div className="relative flex-1 bg-gray-900 overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Grid */}
        <div className="absolute inset-0 border-2 border-white/20 m-12 rounded-3xl pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10"></div>
        </div>

        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
          <button onClick={onBack} className="p-2 text-white"><ChevronLeft size={24} /></button>
          <span className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
            <Camera size={16} /> 以圖搜圖
          </span>
          <button className="p-2 text-white"><Zap size={20} /></button>
        </div>

        {/* AI Processing Text */}
        {isCapturing && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-4">
             <Loader2 className="animate-spin" size={40} />
             <div className="flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/30">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-xs font-bold">Gemini 正在辨識您的圖片...</span>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-white p-6 flex flex-col gap-6">
        {resultProducts.length > 0 ? (
          <div className="animate-in slide-in-from-bottom duration-300">
             <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-2">
               <Sparkles size={14} className="text-[#ee4d2d]" /> 為您找到相似商品
             </h3>
             <div className="flex overflow-x-auto gap-3 no-scrollbar pb-2">
                {resultProducts.map(p => (
                  <div key={p.id} onClick={() => onProductClick(p)} className="w-28 shrink-0 active:scale-95 transition-transform">
                     <img src={p.image} className="w-28 h-28 object-cover rounded-lg shadow-sm border" />
                     <p className="text-[10px] font-bold mt-1 line-clamp-1">${p.price}</p>
                  </div>
                ))}
             </div>
             <button onClick={() => setResultProducts([])} className="w-full mt-4 py-2 text-[10px] text-gray-400 font-bold border rounded-full">重新拍攝</button>
          </div>
        ) : (
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-1 opacity-50">
               <ImageIcon size={24} />
               <span className="text-[10px] font-bold">相簿</span>
            </div>
            <button 
              onClick={handleCapture}
              className="w-16 h-16 rounded-full border-4 border-gray-200 p-1 flex items-center justify-center active:scale-90 transition-transform"
            >
              <div className="w-full h-full bg-[#ee4d2d] rounded-full"></div>
            </button>
            <div className="flex flex-col items-center gap-1 opacity-50">
               <div className="w-6 h-6 border-2 border-black rounded flex items-center justify-center font-black text-[10px]">QR</div>
               <span className="text-[10px] font-bold">掃碼</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSearchView;
