
import React, { useState } from 'react';
import { generateRedAlertMessage } from '../services/geminiService';
// Added ShieldCheck to the imports
import { Send, MessageSquare, AlertTriangle, Wand2, Sparkles, Smartphone, ChevronRight, History, ShieldCheck } from 'lucide-react';

const Communication: React.FC = () => {
  const [targetTenant, setTargetTenant] = useState('Marcus Miller');
  const [balance, setBalance] = useState(1200);
  const [days, setDays] = useState(14);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const msg = await generateRedAlertMessage(targetTenant, balance, days);
      setMessage(msg);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#252D3A] tracking-tighter uppercase">Message Hub</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Edge-integrated messaging and AI-driven curtailment alerts.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white border border-slate-200 text-[#252D3A] rounded-[18px] text-[10px] font-black uppercase tracking-widest shadow-sm">Bulk Remind</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Composer Card */}
        <div className="lg:col-span-8 bg-white rounded-[48px] border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-rose-500 rounded-[20px] text-white shadow-xl shadow-rose-500/20">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#252D3A] tracking-tight">AI Protocol Dispatcher</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generative compliance engine active</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Subject Identity</label>
                <input 
                  type="text" 
                  value={targetTenant} 
                  onChange={(e) => setTargetTenant(e.target.value)}
                  className="w-full bg-transparent border-none text-sm font-bold text-[#252D3A] outline-none"
                />
              </div>
              <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Current Deficit</label>
                <input 
                  type="number" 
                  value={balance} 
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full bg-transparent border-none text-sm font-bold text-[#252D3A] outline-none"
                />
              </div>
              <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Latency (Days)</label>
                <input 
                  type="number" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full bg-transparent border-none text-sm font-bold text-[#252D3A] outline-none"
                />
              </div>
            </div>

            <div className="relative mb-10">
              <textarea 
                placeholder="Secure RA Protocol message buffer..."
                className="w-full h-56 p-10 bg-[#252D3A] text-slate-100 font-mono text-xs rounded-[40px] border-none focus:ring-4 focus:ring-blue-500/10 resize-none placeholder:text-slate-500 leading-relaxed"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="absolute bottom-6 right-6 flex items-center gap-2 px-6 py-3 bg-white text-[#252D3A] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl disabled:opacity-50"
              >
                {isLoading ? <Sparkles size={14} className="animate-spin" /> : <Wand2 size={14} className="text-blue-500" />}
                {isLoading ? 'Processing...' : 'RA Intelligence rewrite'}
              </button>
            </div>

            <div className="flex gap-6">
              <button className="flex-1 py-5 bg-[#252D3A] text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 transition-all">
                <Smartphone size={18} className="opacity-60" /> Dispatch via SMS
              </button>
              <button className="flex-1 py-5 bg-white border-2 border-slate-100 text-[#252D3A] rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                <Send size={18} className="text-slate-400" /> Send via Email
              </button>
            </div>
          </div>
          
          <div className="w-full py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
             <ShieldCheck size={16} /> Encrypted Transmission Protocol Active
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-[#252D3A] mb-8 tracking-tight">System Presets</h3>
            <div className="space-y-4">
              {[
                { label: 'Pre-due Alert', info: '7 Days prior', icon: MessageSquare, color: 'text-blue-500' },
                { label: 'Due Date Final', icon: Smartphone, color: 'text-emerald-500' },
                { label: 'Curtailment Warning', icon: AlertTriangle, color: 'text-rose-500' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-6 rounded-[28px] bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 transition-all group">
                  <div className="flex items-center gap-4">
                    <item.icon size={18} className={`${item.color}`} />
                    <span className="text-sm font-bold text-[#252D3A]">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#252D3A] p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden">
            <h4 className="font-black text-lg mb-8 flex items-center gap-3 uppercase tracking-tighter">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" /> Transmission Logs
            </h4>
            <div className="space-y-6 mb-10">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Marcus Miller • 2h ago</p>
                <p className="text-sm font-bold text-slate-200 mb-1 leading-relaxed">System transitioned to CURTAILED status. Alert delivered.</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase">Status: Confirmed</p>
              </div>
            </div>
            <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all">
              Full Comms Audit
            </button>
            <History size={100} className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
