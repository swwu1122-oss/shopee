
import React from 'react';
import { ChevronLeft, Award, Star, Gift, Ticket, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

interface MemberPrivilegeViewProps {
  onBack: () => void;
}

const MemberPrivilegeView: React.FC<MemberPrivilegeViewProps> = ({ onBack }) => {
  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold">會員中心</h1>
      </header>

      <div className="p-6">
        <div className="bg-gradient-to-br from-[#d4af37] via-[#f7e08b] to-[#b8860b] rounded-[32px] p-6 text-[#1a1a1a] shadow-2xl relative overflow-hidden group">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                 <div className="bg-black/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/10">DIAMOND MEMBER</div>
                 <Award size={32} />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter mb-1">尊榮鑽石會員</h2>
              <p className="text-[10px] font-bold opacity-70">Membership Expires: 2025.12.31</p>
           </div>
           <Star size={150} className="absolute -right-10 -bottom-10 text-black/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="mt-8 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af37]/30 pb-2 flex items-center gap-2">
              <Zap size={16} /> 專屬權益
           </h3>
           <div className="grid grid-cols-2 gap-4">
              {[
                { label: '免運券 x12', icon: <Ticket />, desc: '每月自動發放' },
                { label: '蝦幣 1.2x', icon: <Star />, desc: '消費回饋加倍' },
                { label: '生日好禮', icon: <Gift />, desc: '領取 $500 券' },
                { label: '專屬客服', icon: <ShieldCheck />, desc: '優先處理權' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 active:bg-white/10 transition-colors">
                   <div className="text-[#d4af37] mb-3">{item.icon}</div>
                   <p className="text-xs font-bold">{item.label}</p>
                   <p className="text-[9px] text-white/40 mt-1">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="mt-10 bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/5">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37]">
                 <Award size={20} />
              </div>
              <div>
                 <p className="text-xs font-bold">查看會員升級進度</p>
                 <p className="text-[10px] text-white/40">再消費 $2,500 升級最高等級</p>
              </div>
           </div>
           <ChevronRight size={18} className="text-white/20" />
        </div>
      </div>
    </div>
  );
};

export default MemberPrivilegeView;
