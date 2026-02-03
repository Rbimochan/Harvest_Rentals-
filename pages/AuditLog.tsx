
import React from 'react';
// Added ChevronRight to the imports
import { ShieldCheck, Database, Zap, AlertTriangle, Key, Search, Filter, History, ChevronRight } from 'lucide-react';
import { mockEvents } from '../services/mockData';
import { EventType } from '../types';

const AuditLog: React.FC = () => {
  const getEventIcon = (type: EventType) => {
    switch(type) {
      case EventType.MEASUREMENT: return { icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' };
      case EventType.STATE_CHANGE: return { icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' };
      case EventType.ALERT: return { icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' };
      default: return { icon: Key, color: 'text-slate-500', bg: 'bg-slate-50' };
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#252D3A] tracking-tighter uppercase">System Logs</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Deterministic event sequence and non-repudiation audit trail.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search signatures..."
                className="bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-[#252D3A]/5 w-64 shadow-sm"
              />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-12">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-4">
               <div className="p-4 bg-[#252D3A] text-white rounded-[20px] shadow-xl">
                 <ShieldCheck size={24} />
               </div>
               <div>
                 <h3 className="text-2xl font-black text-[#252D3A] tracking-tight uppercase">Event Stream</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed with HMAC-SHA256 • v3.2 Protocol</p>
               </div>
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#252D3A] hover:bg-slate-100 transition-all">
               <Filter size={14} /> Filter Stream
             </button>
          </div>

          <div className="space-y-4">
            {mockEvents.map((event, i) => {
              const theme = getEventIcon(event.type);
              return (
                <div key={i} className="p-8 bg-slate-50/50 rounded-[36px] border border-slate-100/50 group hover:bg-white hover:shadow-lg transition-all flex items-start justify-between gap-8">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl ${theme.bg} ${theme.color}`}>
                      <theme.icon size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.color === 'text-blue-500' ? '#3B82F6' : theme.color === 'text-emerald-500' ? '#10B981' : '#EF4444' }}>{event.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit {event.unitId}</span>
                      </div>
                      <p className="text-lg font-black text-[#252D3A] tracking-tight leading-snug mb-3">{event.description}</p>
                      <div className="flex items-center gap-3">
                         <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg flex items-center gap-2">
                           <Key size={10} className="text-slate-300" />
                           <span className="text-[9px] font-mono text-slate-400">{event.signature}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-black text-[#252D3A] uppercase tracking-widest mb-1">{new Date(event.timestamp).toLocaleTimeString()}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(event.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="w-full py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#252D3A] transition-colors group">
           <History size={16} /> Chronological Sequence Audit Finalized <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default AuditLog;
