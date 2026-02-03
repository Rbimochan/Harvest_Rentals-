
import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, TrendingUp, History, Download, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Resident } from '../types';

interface FinancialsProps {
  residents: Resident[];
  setResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
}

const Financials: React.FC<FinancialsProps> = ({ residents, setResidents }) => {
  const [showToast, setShowToast] = useState(false);

  const lowBalanceResidents = residents.filter(r => r.balance < 1000).map(r => ({
    id: r.id,
    resident: r.name,
    amount: r.balance,
    date: new Date().toISOString().split('T')[0],
    status: r.balance < 0 ? 'Deficit' : 'Warning',
    type: r.balance < 0 ? 'Debit' : 'Credit'
  }));

  const handleClearBalance = (id: string) => {
    setResidents(prev => prev.map(r => r.id === id ? { ...r, balance: Math.max(r.balance, 5000) } : r));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExport = () => {
    alert("Compiling immutable ledger archive... Download will initialize shortly.");
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {showToast && (
        <div className="fixed top-24 right-10 z-[100] bg-[#050B3E] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8">
          <CheckCircle2 size={20} className="text-emerald-500" />
          <p className="text-sm font-black uppercase tracking-widest">Balance Reconciled via Bank Node</p>
        </div>
      )}

      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#252D3A] tracking-tighter uppercase">Treasury</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Immutable sub-meter ledger and automated reconciliation logs.</p>
        </div>
        <button 
          onClick={handleExport}
          className="px-8 py-4 bg-[#252D3A] text-white rounded-[18px] text-sm font-black uppercase tracking-wider shadow-xl hover:bg-[#1a212c] transition-all flex items-center gap-2"
        >
          <Download size={18} /> Export Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Aggregated Yield', value: 'Rs. 1,42,840', sub: '+12% from last cycle', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Uncollected Dues', value: `Rs. ${Math.abs(residents.reduce((acc, r) => r.balance < 0 ? acc + r.balance : acc, 0)).toLocaleString()}`, sub: 'Requires Settlement', icon: CreditCard, color: 'text-rose-500' },
          { label: 'Operating Float', value: 'Rs. 22,100', sub: 'Maintained buffer', icon: History, color: 'text-blue-500' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm group hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-slate-50 rounded-[20px] group-hover:bg-[#252D3A] group-hover:text-white transition-all">
                <kpi.icon size={24} />
              </div>
              <ArrowUpRight className="text-slate-200" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{kpi.label}</p>
            <h3 className="text-3xl font-black text-[#252D3A] tracking-tight mb-2">{kpi.value}</h3>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${kpi.color}`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-12">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-[#252D3A] tracking-tight uppercase">Deficit Ledger Reconciler</h3>
             <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">View All Entries</button>
          </div>

          <div className="space-y-4">
            {lowBalanceResidents.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[32px] border border-slate-100/50 group hover:bg-white hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${tx.type === 'Credit' ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-500'}`}>
                    {tx.type === 'Credit' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="text-lg font-black text-[#252D3A] tracking-tight">{tx.resident}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Timestamp: {tx.date}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-12">
                  <div>
                    <p className={`text-xl font-black tracking-tight ${tx.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      Rs. {Math.abs(tx.amount).toLocaleString()}
                    </p>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{tx.status}</p>
                  </div>
                  <button 
                    onClick={() => handleClearBalance(tx.id)}
                    className="px-6 py-3 bg-[#252D3A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1a212c] transition-all"
                  >
                    Clear Dues
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
