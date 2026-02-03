
import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Zap, 
  Settings, 
  ChevronLeft, 
  PlusCircle, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProvisionUnitProps {
  onCancel: () => void;
  // Fix: onSuccess should accept the newly created unit data to match App.tsx usage
  onSuccess: (unit: any) => void;
}

const ProvisionUnit: React.FC<ProvisionUnitProps> = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    number: '',
    floor: '1',
    safetyLimit: '32',
    status: 'Maintenance'
  });
  const [isDeploying, setIsDeploying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    // Simulate IoT node handshake
    setTimeout(() => {
      setIsDeploying(false);
      // Fix: Construct and pass the unit object back to allow App.tsx to update the global state
      const newUnit = {
        id: `u-${Math.random().toString(36).substr(2, 5)}`,
        number: formData.number,
        floor: parseInt(formData.floor),
        status: formData.status as any,
        safetyLimitAmps: parseInt(formData.safetyLimit)
      };
      onSuccess(newUnit);
    }, 1800);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6">
          <button 
            onClick={onCancel}
            className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-[#050B3E] hover:border-[#050B3E] transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">Provision Unit</h2>
            <p className="text-slate-400 font-bold text-sm mt-2 font-bold uppercase tracking-widest">Integrating new hardware node into building matrix.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Configuration Section */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-[#050B3E] mb-10 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              NODE PARAMETERS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Unit Identifier</label>
                <div className="relative group">
                  <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 101, 204B"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-6 pl-16 pr-8 text-sm font-bold outline-none transition-all placeholder:text-slate-200"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Vertical Floor Level</label>
                <div className="relative group">
                  <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <select 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-6 pl-16 pr-8 text-sm font-bold outline-none transition-all appearance-none cursor-pointer"
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: e.target.value})}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(f => (
                      <option key={f} value={f}>Floor 0{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Safety Limit (Amperes)</label>
                <div className="relative group">
                  <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <select 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-6 pl-16 pr-8 text-sm font-bold outline-none transition-all appearance-none cursor-pointer"
                    value={formData.safetyLimit}
                    onChange={(e) => setFormData({...formData, safetyLimit: e.target.value})}
                  >
                    <option value="16">16A (Eco)</option>
                    <option value="32">32A (Standard)</option>
                    <option value="63">63A (High Power)</option>
                    <option value="100">100A (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Initial Provisioning State</label>
                <div className="relative group">
                  <Activity className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <select 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-6 pl-16 pr-8 text-sm font-bold outline-none transition-all appearance-none cursor-pointer"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Maintenance">Maintenance Mode</option>
                    <option value="Active">Operational / Available</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[48px] p-12 border border-slate-100 border-dashed text-center">
            <div className="inline-block p-6 bg-white rounded-3xl mb-6 shadow-sm">
              <Settings className="text-slate-300 animate-spin-slow" size={32} />
            </div>
            <h4 className="text-sm font-black text-[#050B3E] uppercase tracking-widest mb-2">Automated Node Handshake</h4>
            <p className="text-xs text-slate-400 font-bold max-w-md mx-auto leading-relaxed uppercase tracking-tight">
              Provisioning will trigger a remote firmware handshake with the assigned edge-meter. Ensure hardware is physically connected before deployment.
            </p>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-[#050B3E] rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              DEPLOYMENT SUMMARY
            </h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Protocol Node</span>
                <span className="text-lg font-black tracking-tight">{formData.number || '---'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Safety Threshold</span>
                <span className="text-lg font-black tracking-tight">{formData.safetyLimit} Amps</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Encryption</span>
                <span className="text-lg font-black tracking-tight text-emerald-400">AES-256</span>
              </div>

              <div className="pt-8">
                <div className="flex items-center gap-4 text-xs font-bold text-white/60 mb-4">
                  <ShieldCheck size={18} className="text-emerald-500" /> Secure Boot Active
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-white/60">
                  <ShieldCheck size={18} className="text-emerald-500" /> Sub-meter sync ready
                </div>
              </div>
            </div>

            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
          </div>

          <div className="space-y-4 pt-6">
            <button 
              type="submit"
              disabled={isDeploying || !formData.number}
              className="w-full py-7 bg-[#050B3E] text-white rounded-[32px] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-70"
            >
              {isDeploying ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  INITIALIZE NODE
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-7 bg-white border-2 border-slate-100 text-slate-400 rounded-[32px] font-black text-xs uppercase tracking-[0.4em] hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel Integration
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProvisionUnit;
