
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Coins, 
  Sparkles, 
  Trophy, 
  Gamepad2, 
  Gift, 
  X, 
  Loader2, 
  Dribbble, 
  Star, 
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { askShoppingAssistant } from '../services/geminiService';

interface ShopeeGamesViewProps {
  onBack: () => void;
}

const ShopeeGamesView: React.FC<ShopeeGamesViewProps> = ({ onBack }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState<string | null>(null);
  const [xp, setXp] = useState(65);
  const [isShaking, setIsShaking] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);
  const [loadingFortune, setLoadingFortune] = useState(false);

  const gameList = [
    { id: 'orchard', title: '蝦皮果園', icon: '🍎', desc: '種樹免費換好禮', color: 'bg-green-100', trending: true },
    { id: 'bubble', title: '蝦皮消消樂', icon: '🫧', desc: '過關贏豐富蝦幣', color: 'bg-blue-100' },
    { id: 'shake', title: '蝦皮大搖大擺', icon: '🤝', desc: '整點搖蝦幣', color: 'bg-pink-100', hot: true },
    { id: 'claw', title: '蝦皮夾夾樂', icon: '🏗️', desc: '技術換好物', color: 'bg-yellow-100' },
    { id: 'pet', title: '蝦皮寵物', icon: '🐶', desc: '養寵物領券', color: 'bg-orange-100' },
    { id: 'candy', title: '蝦皮泡泡糖', icon: '🍬', desc: '積分換豪禮', color: 'bg-purple-100' },
  ];

  const handleLuckyDraw = async () => {
    if (spinning) return;
    
    setSpinning(true);
    // 縮短旋轉圈數與時間
    const newRotation = rotation + 1080 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    // AI 同步請求
    const result = await askShoppingAssistant("請扮演遊戲主持人，恭喜我獲得了一個遊戲驚喜，請簡短告訴我我抽到了什麼。");
    
    // 動畫完成後立即顯示
    setTimeout(() => {
      setReward(result);
      setSpinning(false);
      setXp(prev => Math.min(100, prev + 15));
    }, 1500); 
  };

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      alert("🎉 恭喜！你搖到了 1 蝦幣！");
      setXp(prev => Math.min(100, prev + 5));
    }, 500); // 縮短搖動延遲
  };

  const getFortune = async () => {
    setLoadingFortune(true);
    const res = await askShoppingAssistant("請幫我寫一句有趣的「今日購物運勢」。");
    setFortune(res);
    setLoadingFortune(false);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 animate-in slide-in-from-right duration-300 overflow-x-hidden">
      {/* 頂部導航與等級系統 */}
      <header className="sticky top-0 z-50 bg-[#ee4d2d] text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-1 active:scale-90"><ChevronLeft size={24} /></button>
          <h1 className="text-lg font-black italic tracking-widest">GAMES CENTER</h1>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 text-[#ee4d2d] rounded-full px-3 py-1 flex items-center gap-1 shadow-inner">
              <Coins size={14} className="animate-pulse" />
              <span className="text-xs font-black">540</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
           <div className="flex justify-between items-end mb-1">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm">LV.8</div>
                 <span className="text-xs font-bold">鑽石玩家</span>
              </div>
              <span className="text-[10px] opacity-80">{xp}/100 XP</span>
           </div>
           <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 transition-all duration-1000" style={{ width: `${xp}%` }}></div>
           </div>
        </div>
      </header>

      {/* 幸運大轉盤區 */}
      <div className="p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-1 text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
            <Zap size={10} fill="currentColor" /> DAILY BONUS
          </div>

          <div className="relative mt-4 mb-8">
            {/* 轉盤視覺設計 - 縮短動畫時間為 1.5s */}
            <div 
              className="w-56 h-56 rounded-full border-8 border-orange-500 relative transition-transform duration-[1500ms] cubic-bezier(0.15, 0, 0.15, 1)"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
               {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                 <div key={i} className="absolute inset-0 flex flex-col items-center pt-2" style={{ transform: `rotate(${deg}deg)` }}>
                    <div className={`w-0.5 h-full bg-orange-200 absolute left-1/2 -translate-x-1/2 top-0`}></div>
                    <div className="text-lg mt-2">{['🎁', '💰', '🎟️', '🍀', '💎', '🔥', '🌟', '🌈'][i]}</div>
                 </div>
               ))}
               <div className="absolute inset-4 rounded-full border-2 border-dashed border-orange-200"></div>
            </div>
            {/* 指針 */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
               <div className="w-6 h-8 bg-[#ee4d2d] clip-path-polygon shadow-md"></div>
            </div>
            {/* 中心圓 */}
            <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-4 border-orange-500 flex items-center justify-center shadow-lg z-20">
               <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
            </div>
          </div>

          <button 
            onClick={handleLuckyDraw}
            disabled={spinning}
            className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 active:scale-95 disabled:grayscale transition-all text-lg"
          >
            {spinning ? '轉動中...' : '立即旋轉抽大獎'}
          </button>
        </div>
      </div>

      {/* 搖搖樂區 */}
      <div className="px-4">
         <div 
           onClick={handleShake}
           className={`bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer transition-transform ${isShaking ? 'animate-bounce' : 'active:scale-95'}`}
         >
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-black italic">SHAKE SHAKE!</h3>
                  <p className="text-xs opacity-80">點擊金幣開始搖晃</p>
               </div>
               <div className="bg-white/20 p-2 rounded-xl">
                  <Coins size={24} />
               </div>
            </div>
            <div className="flex justify-center py-4">
               <div className={`text-6xl ${isShaking ? 'scale-125 rotate-12' : ''} transition-all`}>💰</div>
            </div>
         </div>
      </div>

      {/* AI 每日運勢 */}
      <div className="p-4">
         <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                  <Award size={24} />
               </div>
               <div>
                  <h3 className="text-sm font-black">AI 每日購物運勢</h3>
                  <p className="text-[10px] text-gray-400">Gemini 智能指引</p>
               </div>
            </div>
            
            {fortune ? (
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 animate-in zoom-in duration-500">
                 <p className="text-xs text-purple-800 leading-relaxed font-medium italic">「{fortune}」</p>
              </div>
            ) : (
              <button 
                onClick={getFortune}
                disabled={loadingFortune}
                className="w-full py-3 bg-gray-50 rounded-2xl text-xs font-bold text-gray-500 border border-dashed border-gray-200 flex items-center justify-center gap-2"
              >
                {loadingFortune ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-purple-500" />}
                獲取今日運勢
              </button>
            )}
         </div>
      </div>

      {/* 遊戲列表 */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-[#ee4d2d]" size={20} />
            <h3 className="font-black text-gray-800 tracking-tight">熱門小遊戲</h3>
          </div>
          <span className="text-[10px] font-bold text-blue-500">更多 ></span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gameList.map(game => (
            <div key={game.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-3 cursor-pointer active:scale-95 transition-all relative overflow-hidden">
              <div className={`w-12 h-12 rounded-2xl ${game.color} flex items-center justify-center text-2xl`}>
                {game.icon}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-black truncate text-gray-800">{game.title}</p>
                <p className="text-[9px] text-gray-400 truncate font-medium">{game.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 排行榜 */}
      <div className="mt-8 px-4">
         <div className="bg-gray-800/5 rounded-2xl p-3 flex items-center gap-3">
            <TrendingUp size={16} className="text-green-500" />
            <div className="flex-1 overflow-hidden h-4">
               <div className="animate-marquee whitespace-nowrap text-[10px] font-bold text-gray-500">
                  tom 剛剛在消消樂贏得了 50 蝦幣！ • 小明 剛剛在夾夾樂夾到了免運券！ • 雅婷 剛剛升到了 LV.12！
               </div>
            </div>
         </div>
      </div>

      {/* 獎勵彈窗 */}
      {reward && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
           <div className="bg-white rounded-[40px] p-8 w-full max-w-xs flex flex-col items-center animate-in zoom-in duration-300 shadow-2xl border-4 border-yellow-400">
              <Trophy size={80} className="text-yellow-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-black text-gray-800 italic">VICTORY!</h3>
              <div className="mt-4 bg-orange-50 p-5 rounded-3xl text-center text-sm text-orange-800 font-bold border border-orange-100">
                {reward}
              </div>
              <button 
                onClick={() => setReward(null)} 
                className="mt-8 w-full bg-[#ee4d2d] text-white py-4 rounded-2xl font-black shadow-lg active:scale-95"
              >
                收下獎勵
              </button>
           </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
        .clip-path-polygon {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
      `}</style>
    </div>
  );
};

export default ShopeeGamesView;
