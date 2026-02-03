
import React, { useState } from 'react';
import { Unit, UnitStatus, Resident } from '../types';
import { 
  Zap, 
  ShieldAlert, 
  Lock, 
  Battery, 
  Plus, 
  Info, 
  ChevronRight, 
  LayoutGrid, 
  X, 
  Wifi, 
  Trash2, 
  ShieldCheck,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

interface UnitsProps {
  units: Unit[];
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  residents: Resident[];
  onProvision: () => void;
}

const Units: React.FC<UnitsProps> = ({ units, setUnits, residents, onProvision }) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getStatusTheme = (status: UnitStatus) => {
    switch(status) {
      case UnitStatus.ACTIVE: return { color: '#10B981', bg: '#10B98110', label: 'Operational' };
      case UnitStatus.GRACE_PERIOD: return { color: '#A67C52', bg: '#A67C5210', label: 'Grace Active' };
      case UnitStatus.CURTAILED: return { color: '#ef4444', bg: '#ef444410', label: 'Interrupted' };
      case UnitStatus.MAINTENANCE: return { color: '#94a3b8', bg: '#94a3b810', label: 'Offline' };
      default: return { color: '#cbd5e1', bg: '#f1f5f9', label: 'Unknown' };
    }
  };

  const handleOpenAddon = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowAddonModal(true);
  };

  const handleOpenDetails = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowDetailModal(true);
  };

  const handleOverride = (unitId: string) => {
    setUnits(prev => prev.map(u => 
      u.id === unitId 
        ? { ...u, status: u.status === UnitStatus.ACTIVE ? UnitStatus.MAINTENANCE : UnitStatus.ACTIVE } 
        : u
    ));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleActivateAddon = (name: string) => {
    alert(`Deploying protocol node: ${name} for Unit ${selectedUnit?.number}`);
    setShowAddonModal(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {showToast && (
        <div className="fixed top-24 right-10 z-[100] bg-[#050B3E] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8">
          <CheckCircle2 size={20} className="text-blue-400" />
          <p className="text-sm font-black uppercase tracking-widest">Circuit Logic Overridden</p>
        </div>
      )}

      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#252D3A] tracking-tighter uppercase">Inventory</h2>
          <p className="text-slate-400 font-bold text-sm mt-2 font-bold uppercase tracking-widest leading-relaxed">Edge-layer sub-meter monitoring & safety overrides.</p>
        </div>
        <button 
          onClick={onProvision}
          className="px-8 py-4 bg-[#252D3A] text-white rounded-[18px] text-sm font-black uppercase tracking-wider shadow-xl hover:bg-[#1a212c] transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} /> Provision Unit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {units.map((unit) => {
          const resident = residents.find(r => r.unitId === unit.id);
          const theme = getStatusTheme(unit.status);

          return (
            <div key={unit.id} className="bg-white rounded-[48px] border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] group">
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[24px] flex items-center justify-center transition-all group-hover:scale-105" style={{ backgroundColor: theme.bg, color: theme.color }}>
                      <Zap size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#252D3A] tracking-tight">Unit {unit.number}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.color }}>{theme.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-start gap-4">
                    <button 
                      onClick={() => handleOpenAddon(unit)}
                      className="mt-1 p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <Plus size={16} />
                    </button>
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">Floor</p>
                      <p className="text-xl font-black text-[#252D3A] tracking-tight">0{unit.floor}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-8 bg-slate-50/50 rounded-[32px] mb-8 border border-slate-100/50">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Safety Limit</p>
                    <p className="text-lg font-black text-[#252D3A] tracking-tight">{unit.safetyLimitAmps} Amps</p>
                  </div>
                  <div className="text-center border-l border-slate-200/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Connected</p>
                    <p className="text-lg font-black text-[#252D3A] tracking-tight">{resident ? 'Assigned' : 'Vacant'}</p>
                  </div>
                </div>

                {resident ? (
                  <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl mb-8">
                    <img src={resident.avatarUrl || `https://picsum.photos/seed/${resident.id}/80/80`} className="w-10 h-10 rounded-xl object-cover" alt={resident.name} />
                    <div>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Occupant</p>
                      <p className="text-sm font-bold text-[#252D3A]">{resident.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/30 border border-slate-100 border-dashed rounded-2xl mb-8 text-center">
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Inventory Vacant</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleOpenDetails(unit)}
                    className="flex-1 py-4 bg-white border-2 border-slate-100 text-[#252D3A] rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Info size={14} /> Details
                  </button>
                  <button 
                    onClick={() => handleOverride(unit.id)}
                    className="flex-1 py-4 bg-[#252D3A] text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#1a212c] transition-all flex items-center justify-center gap-2"
                  >
                    <Lock size={14} /> Override
                  </button>
                </div>
              </div>
              
              <button onClick={() => handleOpenDetails(unit)} className="w-full py-5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#252D3A] transition-colors group">
                Telemetry Audit Link <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Addon Modal */}
      {showAddonModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050B3E]/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowAddonModal(false)} />
          <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 overflow-hidden p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Provision Add-on</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Integrating service into Unit {selectedUnit?.number}</p>
              </div>
              <button onClick={() => setShowAddonModal(false)} className="p-3 bg-slate-50 text-slate-300 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"><X size={20} /></button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'High-Speed Fiber (100Mbps)', icon: Wifi, price: 1500, type: 'Internet' },
                { name: 'Smart Power Node Boost', icon: Zap, price: 800, type: 'Electricity' },
                { name: 'Premium Waste Logistics', icon: Trash2, price: 450, type: 'Waste' },
                { name: 'Concierge Security Shield', icon: ShieldCheck, price: 1200, type: 'Security' }
              ].map((addon, i) => (
                <button key={i} className="w-full flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[28px] hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all group" onClick={() => handleActivateAddon(addon.name)}>
                  <div className="flex items-center gap-5 text-left"><div className="p-4 bg-white rounded-2xl text-[#252D3A] shadow-sm group-hover:bg-[#252D3A] group-hover:text-white transition-all"><addon.icon size={22} /></div><div><p className="text-sm font-black text-[#252D3A]">{addon.name}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{addon.type}</p></div></div>
                  <div className="text-right"><p className="text-sm font-black text-[#252D3A]">Rs. {addon.price}</p><p className="text-[9px] font-bold text-slate-300 uppercase">/month</p></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailModal && selectedUnit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050B3E]/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowDetailModal(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 overflow-hidden p-12">
            <div className="flex justify-between items-start mb-10">
               <div>
                 <h3 className="text-3xl font-black text-[#252D3A] tracking-tighter uppercase">Hardware Node Audit</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit {selectedUnit.number} • Floor {selectedUnit.floor}</p>
               </div>
               <button onClick={() => setShowDetailModal(false)} className="p-3 bg-slate-50 text-slate-300 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Uptime Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-2xl font-black text-[#252D3A]">99.8%</span>
                </div>
              </div>
              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Network Latency</p>
                <div className="flex items-center gap-3">
                  <Zap className="text-blue-500" size={20} />
                  <span className="text-2xl font-black text-[#252D3A]">12ms</span>
                </div>
              </div>
            </div>
            <button className="w-full py-6 bg-[#252D3A] text-white rounded-[32px] font-black text-[10px] uppercase tracking-[0.4em]">View Raw Telemetry Feed</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;
