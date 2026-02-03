
import React, { useState } from 'react';
import { Handshake, Search, Plus, CreditCard, ExternalLink, ShieldCheck, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const PartyPayments: React.FC = () => {
  const [parties, setParties] = useState([
    { id: 'V-001', name: 'Subash Electric', category: 'Maintenance', balance: -4500, lastPay: '2026-05-12', status: 'Pending' },
    { id: 'V-002', name: 'Municipal Water Board', category: 'Utilities', balance: -12800, lastPay: '2026-04-30', status: 'Overdue' },
    { id: 'V-003', name: 'Dhaka Cleaning Co.', category: 'Staffing', balance: 0, lastPay: '2026-05-20', status: 'Settled' },
    { id: 'V-004', name: 'Kunwar Hardware', category: 'Supplies', balance: -1200, lastPay: '2026-05-15', status: 'Pending' },
  ]);
  const [showToast, setShowToast] = useState(false);

  const handleClearBalance = (id: string) => {
    setParties(prev => prev.map(p => p.id === id ? { ...p, balance: 0, status: 'Settled', lastPay: new Date().toISOString().split('T')[0] } : p));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRegister = () => {
    const name = prompt("Enter Vendor Name:");
    if (name) {
      const newVendor = {
        id: `V-00${parties.length + 1}`,
        name,
        category: 'General',
        balance: 0,
        lastPay: '---',
        status: 'Settled'
      };
      setParties([...parties, newVendor]);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {showToast && (
        <div className="fixed top-24 right-10 z-[100] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8">
          <CheckCircle2 size={20} />
          <p className="text-sm font-black uppercase tracking-widest">Vendor Settlement Confirmed</p>
        </div>
      )}

      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">Vendor Desk</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Third-party service registries and automated settlements.</p>
        </div>
        <button 
          onClick={handleRegister}
          className="px-8 py-4 bg-[#050B3E] text-white rounded-[18px] text-sm font-black uppercase tracking-wider shadow-xl hover:bg-[#030626] transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Register Party
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Payable', value: `Rs. ${Math.abs(parties.reduce((acc, p) => p.balance < 0 ? acc + p.balance : acc, 0)).toLocaleString()}`, sub: `Across ${parties.filter(p => p.balance < 0).length} vendors`, icon: AlertCircle, color: 'text-rose-500' },
          { label: 'Settled Status', value: `${parties.filter(p => p.balance === 0).length} Cleared`, sub: 'Current billing cycle', icon: UserCheck, color: 'text-emerald-500' },
          { label: 'Active Contracts', value: `${parties.length} Nodes`, sub: 'Utility + Maintenance', icon: Handshake, color: 'text-blue-500' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm group">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-slate-50 rounded-[20px] group-hover:bg-[#050B3E] group-hover:text-white transition-all">
                <kpi.icon size={24} />
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{kpi.label}</p>
            <h3 className="text-3xl font-black text-[#050B3E] tracking-tight mb-2">{kpi.value}</h3>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${kpi.color}`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[56px] p-12 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <h3 className="text-3xl font-black text-[#050B3E] tracking-tighter uppercase">Payable Registry</h3>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" 
              placeholder="Search registered parties..."
              className="w-full bg-slate-50 border-none rounded-full py-4 pl-16 pr-8 text-sm font-bold focus:ring-4 focus:ring-[#050B3E]/5 outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          {parties.map((party) => (
            <div key={party.id} className="p-10 bg-slate-50/50 rounded-[48px] border border-slate-100/50 group hover:bg-white hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center shadow-sm border border-slate-100 text-[#050B3E]">
                  <Handshake size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#050B3E] tracking-tight">{party.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{party.id}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{party.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dues Outstanding</p>
                  <p className={`text-2xl font-black ${party.balance < 0 ? 'text-rose-500' : 'text-[#050B3E]'}`}>
                    Rs. {Math.abs(party.balance).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    party.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                    party.status === 'Settled' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {party.status}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => alert(`Reviewing internal contract for ${party.name}...`)} className="p-5 bg-white text-slate-400 rounded-[28px] border border-slate-200 hover:text-[#050B3E] hover:border-[#050B3E] transition-all">
                    <ExternalLink size={20} />
                  </button>
                  {party.balance < 0 && (
                    <button 
                      onClick={() => handleClearBalance(party.id)}
                      className="px-8 py-5 bg-[#050B3E] text-white rounded-[28px] text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-[#030626] transition-all active:scale-95"
                    >
                      Clear Balance
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartyPayments;
