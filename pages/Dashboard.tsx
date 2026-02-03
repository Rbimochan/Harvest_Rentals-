
import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { Zap, AlertTriangle, ShieldCheck, ArrowUpRight, Plus, Building, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { Unit, UnitStatus } from '../types';
import { suggestSystemReport } from '../services/geminiService';

const data = [
  { time: '00:00', kwh: 12 },
  { time: '04:00', kwh: 8 },
  { time: '08:00', kwh: 35 },
  { time: '12:00', kwh: 28 },
  { time: '16:00', kwh: 42 },
  { time: '20:00', kwh: 58 },
];

interface DashboardProps {
  units: Unit[];
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  requests: any[];
  setRequests: React.Dispatch<React.SetStateAction<any[]>>;
  onDeployUnit: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ units, setUnits, requests, setRequests, onDeployUnit }) => {
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const totalUnits = units.length;
  const activeUnits = units.filter(u => u.status === UnitStatus.ACTIVE).length;
  const curtailedUnits = units.filter(u => u.status === UnitStatus.CURTAILED).length;

  const handleDiagnostics = async () => {
    setIsDiagnosticRunning(true);
    try {
      const report = await suggestSystemReport('KunwarNiwas-001');
      setDiagnosticReport(report);
    } catch (e) {
      setDiagnosticReport("Diagnostic server unreachable. Manual bypass required.");
    } finally {
      setIsDiagnosticRunning(false);
    }
  };

  const handleReconcileRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAdminOverride = (unitId: string) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: UnitStatus.ACTIVE } : u));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {showToast && (
        <div className="fixed top-24 right-10 z-[100] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8">
          <CheckCircle2 size={20} />
          <p className="text-sm font-black uppercase tracking-widest">Protocol Successfully Reconciled</p>
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-black text-[#050B3E] tracking-tighter uppercase">The Pulse</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Real-time Telemetry • rentapp cloud infrastructure</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDiagnostics}
            disabled={isDiagnosticRunning}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            {isDiagnosticRunning ? <Sparkles size={16} className="animate-spin text-blue-500" /> : 'System Diagnostics'}
          </button>
          <button 
            onClick={onDeployUnit}
            className="px-6 py-3 bg-[#050B3E] text-white rounded-xl text-sm font-bold shadow-xl hover:bg-[#030626] transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Deploy Sub-Meter
          </button>
        </div>
      </div>

      {diagnosticReport && (
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-[40px] animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">AI Diagnostic Report</h3>
             <button onClick={() => setDiagnosticReport(null)} className="text-blue-300 hover:text-blue-500">Close Report</button>
          </div>
          <p className="text-sm text-blue-800 leading-relaxed font-medium">{diagnosticReport}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Inventory Nodes', value: `${totalUnits}`, sub: 'Active Endpoints', color: '#050B3E', icon: Building },
          { title: 'Anomalies Detected', value: `${curtailedUnits}`, sub: 'Requires Intervention', color: '#EF4444', icon: AlertTriangle },
          { title: 'System Uptime', value: `${Math.round((activeUnits/totalUnits)*100)}%`, sub: 'Service Health: Peak', color: '#10B981', icon: ShieldCheck },
          { title: 'Aggregated Revenue', value: 'Rs. 42k', sub: 'Projected Yield', color: '#3B82F6', icon: Zap },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3.5 rounded-2xl" style={{ backgroundColor: `${kpi.color}10`, color: kpi.color }}>
                <kpi.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{i === 1 && curtailedUnits > 0 ? 'CRITICAL' : 'NOMINAL'}</span>
            </div>
            <p className="text-sm font-bold text-slate-400 mb-1">{kpi.title}</p>
            <p className="text-4xl font-black text-[#050B3E] tracking-tight">{kpi.value}</p>
            <p className="text-xs font-bold mt-2" style={{ color: kpi.color }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <h3 className="text-xl font-black text-[#050B3E] tracking-tight">Load Distribution History</h3>
                <p className="text-sm text-slate-400 font-medium font-bold">Edge-meter aggregated telemetry across 24h cycle.</p>
              </div>
              <div className="px-4 py-1.5 bg-[#050B3E] rounded-lg text-[10px] font-black text-white uppercase tracking-widest">Live Feed</div>
            </div>
            <div className="h-80 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#050B3E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#050B3E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} tickMargin={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#050B3E', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="kwh" stroke="#050B3E" strokeWidth={4} fillOpacity={1} fill="url(#colorKwh)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-[#050B3E] tracking-tight">Maintenance Pipeline</h3>
              <Wrench className="text-slate-300" size={24} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((req, i) => (
                <div key={i} className={`p-8 rounded-[32px] border border-slate-100 transition-all ${req.status === 'Resolved' ? 'bg-slate-50 opacity-60' : 'bg-white hover:shadow-lg'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1 bg-[#050B3E] rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-md">UNIT {req.unit}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.time}</span>
                  </div>
                  <h4 className="text-lg font-black text-[#050B3E] mb-1">{req.issue}</h4>
                  <div className="flex items-center gap-2 mb-8">
                    <div className={`w-2.5 h-2.5 rounded-full ${req.status === 'Pending' ? 'bg-amber-500 animate-pulse' : req.status === 'Resolved' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                    <span className="text-xs font-bold text-slate-500">{req.status}</span>
                  </div>
                  {req.status !== 'Resolved' && (
                    <button 
                      onClick={() => handleReconcileRequest(req.id)}
                      className="w-full py-4 bg-[#050B3E] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#030626] transition-all shadow-lg"
                    >
                      Reconcile Issue
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#050B3E] p-12 rounded-[48px] shadow-2xl text-white flex flex-col h-full relative overflow-hidden">
          <h3 className="text-xl font-black mb-10 flex items-center gap-3">
             <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
             CRITICAL INCIDENTS
          </h3>
          <div className="space-y-8 flex-1 relative z-10">
            {units.filter(u => u.status === UnitStatus.CURTAILED).length > 0 ? (
              units.filter(u => u.status === UnitStatus.CURTAILED).slice(0, 2).map(u => (
                <div key={u.id} className="p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-sm animate-in slide-in-from-right-4">
                  <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Priority 01 • Unit {u.number}</p>
                  <p className="text-lg font-black text-white mb-2 tracking-tight">Circuit Curtailment</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 font-bold">Autonomous shutdown triggered via smart-meter due to ledger deficit.</p>
                  <button 
                    onClick={() => handleAdminOverride(u.id)}
                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/10"
                  >
                    Admin Override
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white/5 rounded-[40px] border border-white/10 border-dashed">
                <ShieldCheck size={48} className="mx-auto text-emerald-500 mb-4 opacity-40" />
                <p className="text-sm font-black text-white/40 uppercase tracking-widest">No Critical Alerts</p>
              </div>
            )}
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center relative z-10">
            <button className="flex items-center gap-3 text-[11px] font-black text-white uppercase tracking-[0.2em] hover:translate-x-1 transition-transform group">
              Audit Full Activity <ArrowUpRight size={16} className="text-blue-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
