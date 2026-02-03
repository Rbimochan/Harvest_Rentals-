
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  Users, 
  DoorOpen, 
  Wallet,
  Plus,
  Wrench,
  Smartphone,
  Wifi,
  Trash2,
  Zap,
  Info,
  Calendar,
  ChevronRight,
  ArrowDownRight,
  CreditCard,
  Clock,
  ArrowUpRight,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { mockResidents, mockUnits } from '../services/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RentAppLogo } from '../components/Layout';

interface TenantDashboardProps {
  residentId: string;
  onLogout: () => void;
}

const TenantDashboard: React.FC<TenantDashboardProps> = ({ residentId, onLogout }) => {
  const resident = mockResidents.find(r => r.id === residentId) || mockResidents[0]; 
  const unit = mockUnits.find(u => u.id === resident.unitId);

  const [hasGuests, setHasGuests] = useState(false);
  const [isAway, setIsAway] = useState(false);
  const [maintenanceIssue, setMaintenanceIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const usageData = [
    { day: 'Mon', kwh: 2.2 },
    { day: 'Tue', kwh: 1.8 },
    { day: 'Wed', kwh: 2.5 },
    { day: 'Thu', kwh: 2.1 },
    { day: 'Fri', kwh: 4.2 }, 
    { day: 'Sat', kwh: 3.1 },
    { day: 'Sun', kwh: 1.9 },
  ];

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintenanceIssue) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMaintenanceIssue('');
    }, 1500);
  };

  const getAddonIcon = (type: string) => {
    switch (type) {
      case 'Electricity': return <Zap size={18} />;
      case 'Internet': return <Wifi size={18} />;
      case 'Waste': return <Trash2 size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 animate-in fade-in duration-1000">
      <div className="max-w-6xl mx-auto space-y-8 pb-24">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={resident.avatarUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80`} 
                className="w-20 h-20 rounded-[32px] border-4 border-white shadow-xl object-cover" 
                alt={resident.name} 
              />
              <div className="absolute -bottom-1 -right-1 bg-[#050B3E] text-white p-1.5 rounded-xl shadow-lg border-2 border-white">
                <ShieldCheck size={14} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <RentAppLogo size={32} color="#050B3E" />
                <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">Resident Hub</span>
              </div>
              <p className="text-slate-400 font-black uppercase text-[9px] tracking-[0.3em] mb-1">Node {unit?.number} • Floor 0{unit?.floor}</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">Namaste, {resident.name}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2.5 transition-all shadow-sm ${isAway ? 'bg-[#050B3E] text-white border-[#050B3E]' : 'bg-white text-slate-400 border-slate-200'}`}>
              <DoorOpen size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">{isAway ? 'VACATE MODE' : 'AT HOME'}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* TOP SUMMARY BAR: Balance + Core Add-ons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Primary Balance Widget */}
          <div className="bg-[#050B3E] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Wallet className="text-blue-400" size={20} />
                <button 
                  onClick={() => setShowBreakdown(true)}
                  className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
              <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Current Ledger</p>
              <h3 className={`text-3xl font-black tracking-tighter ${resident.balance < 0 ? 'text-rose-400' : 'text-white'}`}>
                Rs. {Math.abs(resident.balance).toLocaleString()}
              </h3>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-tight mt-2">{resident.balance < 0 ? 'Due for settlement' : 'Credit Balance available'}</p>
            </div>
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/5 rounded-full blur-[40px]" />
          </div>

          {/* Add-on 1: Electricity */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center gap-5 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Electricity</p>
              <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-2">Smart Node</h4>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-emerald-600">Active</span>
              </div>
            </div>
          </div>

          {/* Add-on 2: Internet */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center gap-5 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
              <Wifi size={24} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fiber Link</p>
              <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-2">60 Mbps</h4>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase text-emerald-600">Online</span>
              </div>
            </div>
          </div>

          {/* Add-on 3: Waste */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center gap-5 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
              <Trash2 size={24} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sanitation</p>
              <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-2">Waste Ops</h4>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-[10px] font-black uppercase text-blue-600">Standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Controls & Charts */}
          <div className="lg:col-span-8 space-y-10">
            {/* IoT Control Panel */}
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Living Logic Panel</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Integrated circuit overrides</p>
                </div>
                <Smartphone className="text-slate-100 absolute -right-2 top-0" size={80} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <button 
                  onClick={() => setHasGuests(!hasGuests)}
                  className={`p-8 rounded-[40px] border-2 transition-all flex items-center gap-6 text-left ${
                    hasGuests ? 'bg-[#050B3E] text-white border-[#050B3E] shadow-2xl' : 'bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className={`p-4 rounded-2xl transition-colors ${hasGuests ? 'bg-white/10 text-white' : 'bg-white text-slate-300 shadow-sm'}`}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">Guest Protocol</h4>
                    <p className={`text-[9px] font-bold uppercase tracking-wide mt-1 ${hasGuests ? 'text-white/40' : 'text-slate-400'}`}>Safety 40A Active</p>
                  </div>
                </button>

                <button 
                  onClick={() => setIsAway(!isAway)}
                  className={`p-8 rounded-[40px] border-2 transition-all flex items-center gap-6 text-left ${
                    isAway ? 'bg-[#050B3E] text-white border-[#050B3E] shadow-2xl' : 'bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className={`p-4 rounded-2xl transition-colors ${isAway ? 'bg-white/10 text-white' : 'bg-white text-slate-300 shadow-sm'}`}>
                    <DoorOpen size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">Eco Standby</h4>
                    <p className={`text-[9px] font-bold uppercase tracking-wide mt-1 ${isAway ? 'text-white/40' : 'text-slate-400'}`}>Minimal Burn Cycle</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Consumption Chart */}
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Energy Signature</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Live Telemetry Feedback</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Consumption</p>
                    <p className="text-xl font-black text-slate-800">{resident.lastKwhReading} units</p>
                  </div>
                  <div className="text-right border-l border-slate-100 pl-6">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Rate</p>
                    <p className="text-xl font-black text-slate-400 italic">Rs. {resident.dailyRate}</p>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#050B3E" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#050B3E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      stroke="#94a3b8" 
                      fontSize={10} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontWeight: 700}}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050B3E', border: 'none', borderRadius: '16px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="kwh" stroke="#050B3E" strokeWidth={4} fillOpacity={1} fill="url(#colorUsage)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* Direct Ops Messenger */}
            <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">Direct Ops Messenger</h3>
                  <p className="text-xs text-slate-400 font-bold mb-8 leading-relaxed">
                    Repair requests are routed directly to site maintenance nodes.
                  </p>
                  <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
                    <input 
                      type="text" 
                      value={maintenanceIssue}
                      onChange={(e) => setMaintenanceIssue(e.target.value)}
                      placeholder="Operational requirement..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting || !maintenanceIssue}
                      className="w-full bg-white text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-400 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Dispatching...' : <>Dispatch Request <ChevronRight size={14} /></>}
                    </button>
                  </form>
               </div>
               <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            {/* Event Audit Snippet */}
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Recent Telemetry Audit</h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-800 leading-tight">Ledger Balance Validated</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">HMAC-SHA256 Sig Ready</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl opacity-60">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-800 leading-tight">Circuit Check: Nominal</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">2h ago via Sub-meter</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#050B3E] transition-colors">
                View Full Audit
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 text-[#050B3E]/30">
          <div className="flex items-center gap-3">
             <RentAppLogo size={28} color="currentColor" />
             <p className="text-[9px] font-black uppercase tracking-[0.3em]">
               Cloud Protocol v3.5.1 • Deterministic Housing
             </p>
          </div>
          <div className="flex gap-8">
            <button className="text-[9px] font-black uppercase tracking-widest hover:text-[#050B3E] transition-colors">Safety Code</button>
            <button className="text-[9px] font-black uppercase tracking-widest hover:text-[#050B3E] transition-colors">Node Support</button>
          </div>
        </footer>

      </div>

      {/* Statement Modal */}
      {showBreakdown && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050B3E]/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowBreakdown(false)} />
          <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 overflow-hidden">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Ledger Statement</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billing Period: Current Active</p>
                </div>
                <button 
                  onClick={() => setShowBreakdown(false)}
                  className="p-3 bg-slate-50 text-slate-300 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Space Occupancy (Daily)', amount: resident.dailyRate },
                  { label: 'Internet (Managed Link)', amount: 40 },
                  { label: 'Energy Burn (Aggregated)', amount: 14.50 },
                  { label: 'Waste Surcharge', amount: 11.60 }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{item.label}</span>
                    <span className="text-sm font-black text-slate-900">Rs. {item.amount.toLocaleString()} <span className="text-[8px] opacity-30">/day</span></span>
                  </div>
                ))}
                
                <div className="bg-slate-50 p-8 rounded-[32px] mt-8 flex justify-between items-center">
                   <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Effective Balance</p>
                     <h4 className={`text-3xl font-black tracking-tighter ${resident.balance < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        Rs. {Math.abs(resident.balance).toLocaleString()}
                     </h4>
                   </div>
                   <div className="text-right">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Cycle Days Left</p>
                     <p className="text-xl font-black text-slate-800 italic">{resident.daysRemaining}</p>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setShowBreakdown(false)}
                className="w-full mt-8 py-5 bg-slate-900 text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] hover:-translate-y-1 transition-all"
              >
                Close Statement Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
