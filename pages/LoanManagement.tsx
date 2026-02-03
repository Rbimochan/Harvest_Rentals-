
import React, { useState } from 'react';
import { Coins, Plus, TrendingUp, Calendar, ChevronRight, Scale, Info, PieChart, X, CheckCircle2 } from 'lucide-react';
import { mockResidents } from '../services/mockData';

const LoanManagement: React.FC = () => {
  const [loans, setLoans] = useState([
    { id: 'L-771', residentId: 't-subash', principal: 50000, interest: '0%', balance: 25000, progress: 50, due: '2026-06-15' },
    { id: 'L-882', residentId: 't4', principal: 15000, interest: '5%', balance: 12000, progress: 20, due: '2026-05-30' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleIssueLoan = () => {
    const residentName = prompt("Resident Name:");
    const amount = prompt("Principal Amount:");
    if (residentName && amount) {
      const newLoan = {
        id: `L-${Math.floor(Math.random() * 900 + 100)}`,
        residentId: 't5', // Mocking association
        principal: Number(amount),
        interest: '0%',
        balance: Number(amount),
        progress: 0,
        due: '2026-12-31'
      };
      setLoans([...loans, newLoan]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {showToast && (
        <div className="fixed top-24 right-10 z-[100] bg-[#050B3E] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8">
          <CheckCircle2 size={20} className="text-blue-400" />
          <p className="text-sm font-black uppercase tracking-widest">Capital Advanced Successfully</p>
        </div>
      )}

      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">Loan Desk</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Resident advances, security deposit financing, and property credit.</p>
        </div>
        <button 
          onClick={handleIssueLoan}
          className="px-8 py-4 bg-[#050B3E] text-white rounded-[18px] text-sm font-black uppercase tracking-wider shadow-xl hover:bg-[#030626] transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Issue New Loan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#050B3E] p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <PieChart size={32} className="text-blue-400 mb-8" />
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">Total Exposure</p>
            <h3 className="text-4xl font-black tracking-tighter mb-4">Rs. {loans.reduce((acc, l) => acc + l.balance, 0).toLocaleString()}</h3>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Active capital deployment</p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between">
            <TrendingUp size={32} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Health: Peak</span>
          </div>
          <div className="mt-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Repayment Velocity</p>
            <h3 className="text-3xl font-black text-[#050B3E] tracking-tight">84.2%</h3>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between">
            <Calendar size={32} className="text-blue-500" />
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">02 Delayed</span>
          </div>
          <div className="mt-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Next Liquidity Event</p>
            <h3 className="text-3xl font-black text-[#050B3E] tracking-tight">May 30</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[56px] p-12 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]">
        <h3 className="text-3xl font-black text-[#050B3E] tracking-tighter uppercase mb-12">Capital Ledger</h3>

        <div className="space-y-6">
          {loans.map((loan) => {
            const resident = mockResidents.find(r => r.id === loan.residentId);
            return (
              <div key={loan.id} className="bg-slate-50/50 rounded-[48px] p-10 border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                    <div className="relative">
                      <img 
                        src={resident?.avatarUrl || `https://picsum.photos/seed/${loan.residentId}/120/120`} 
                        className="w-20 h-20 rounded-[32px] object-cover border-4 border-white shadow-sm" 
                        alt={resident?.name} 
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#050B3E] text-white p-2 rounded-xl shadow-lg border-2 border-white">
                        <Scale size={14} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-[#050B3E] tracking-tight">{resident?.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{loan.id} • Interest: {loan.interest}</p>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md px-10">
                    <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Amortization Progress</span>
                      <span className="text-[#050B3E]">{loan.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#050B3E] rounded-full transition-all duration-1000 group-hover:bg-blue-500" 
                        style={{ width: `${loan.progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unpaid Balance</p>
                      <p className="text-2xl font-black text-[#050B3E]">Rs. {loan.balance.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Reviewing repayment audit for ${loan.id}... Next installment due ${loan.due}.`)}
                      className="p-6 bg-white text-[#050B3E] rounded-[32px] border-2 border-slate-100 hover:border-[#050B3E] transition-all group-hover:shadow-lg"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoanManagement;
