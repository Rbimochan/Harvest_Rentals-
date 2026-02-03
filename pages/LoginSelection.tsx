
import React from 'react';
import { Building, User, ChevronRight, Zap } from 'lucide-react';
import { RentAppLogo } from '../components/Layout';

interface LoginSelectionProps {
  onSelectRole: (role: 'owner' | 'tenant', instant?: boolean) => void;
}

const LoginSelection: React.FC<LoginSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden animate-in fade-in duration-1000">
      {/* Background brand accents */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#050B3E]/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        <div className="md:col-span-2 text-center mb-24 flex flex-col items-center">
          {/* Massive Logo for Home Page - increased scale to [3] for a premium, bold entrance */}
          <div className="mb-12 transform scale-[3] md:scale-[3.5] animate-in zoom-in duration-1000 ease-out">
            <RentAppLogo size={56} />
          </div>
          <p className="mt-16 text-slate-400 font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs opacity-60">
            PropTech Infrastructure Gateway
          </p>
        </div>

        {/* Owner Card - High Contrast Light */}
        <div className="flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500">
          <button 
            onClick={() => onSelectRole('owner')}
            className="bg-white p-14 rounded-[64px] shadow-[0_24px_80px_rgba(0,0,0,0.04)] border border-white hover:shadow-[0_48px_120px_rgba(5,11,62,0.12)] transition-all flex flex-col items-center text-center w-full h-full"
          >
            <div className="w-28 h-28 bg-[#050B3E] rounded-[36px] flex items-center justify-center text-white mb-10 group-hover:rotate-6 transition-transform shadow-2xl">
              <Building size={48} />
            </div>
            <h2 className="text-3xl font-black text-[#050B3E] mb-4 tracking-tighter uppercase">Administrator</h2>
            <p className="text-slate-400 text-sm mb-12 leading-relaxed font-bold uppercase tracking-tight opacity-70">
              Enterprise management for scaling utility networks and financial auditing.
            </p>
            <div className="mt-auto flex items-center gap-3 text-[#050B3E] font-black text-xs uppercase tracking-[0.3em] group-hover:text-blue-600 transition-colors">
              Initialize Portal <ChevronRight size={18} />
            </div>
          </button>
          <button 
            onClick={() => onSelectRole('owner', true)}
            className="w-full py-5 bg-[#050B3E]/5 border border-[#050B3E]/10 rounded-[28px] text-[10px] font-black uppercase tracking-[0.4em] text-[#050B3E] flex items-center justify-center gap-3 hover:bg-[#050B3E]/10 transition-all active:scale-95"
          >
            <Zap size={16} className="text-blue-500" /> BYPASS AUTH
          </button>
        </div>

        {/* Tenant Card - Bold Dark */}
        <div className="flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500">
          <button 
            onClick={() => onSelectRole('tenant')}
            className="bg-[#050B3E] p-14 rounded-[64px] shadow-[0_48px_120px_rgba(5,11,62,0.3)] transition-all flex flex-col items-center text-center w-full h-full relative overflow-hidden"
          >
            <div className="w-28 h-28 bg-white/10 rounded-[36px] flex items-center justify-center text-white mb-10 group-hover:-rotate-6 transition-transform backdrop-blur-md">
              <User size={48} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">Resident</h2>
            <p className="text-slate-400 text-sm mb-12 leading-relaxed font-bold uppercase tracking-tight opacity-80">
              Seamlessly monitor consumption metrics and reconcile service dues.
            </p>
            <div className="mt-auto flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">
              Access My Hub <ChevronRight size={18} />
            </div>
          </button>
          <button 
            onClick={() => onSelectRole('tenant', true)}
            className="w-full py-5 bg-white border border-slate-200 rounded-[28px] text-[10px] font-black uppercase tracking-[0.4em] text-[#050B3E] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <Zap size={16} className="text-amber-500" /> SUBASH ACCESS
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 text-center w-full">
        <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.8em]">
          Deterministic Housing Protocol
        </p>
      </div>
    </div>
  );
};

export default LoginSelection;
