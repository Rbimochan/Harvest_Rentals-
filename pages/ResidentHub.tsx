
import React, { useState, useEffect } from 'react';
import { mockTransactionsByResident, Transaction } from '../services/mockData';
import { 
  Smartphone, 
  History, 
  CreditCard, 
  ChevronRight, 
  X, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  FileText,
  Plus,
  Wifi,
  Zap,
  Trash2,
  Info,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Resident, AddonService } from '../types';

interface ResidentHubProps {
  residents: Resident[];
  setResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
  onRegister: () => void;
}

const TransactionHistoryModal = ({ 
  resident, 
  onClose 
}: { 
  resident: Resident, 
  onClose: () => void 
}) => {
  const transactions = mockTransactionsByResident[resident.id] || [
    { id: 'TX-GEN', date: new Date().toISOString(), type: 'Consumption', amount: -resident.dailyRate, description: 'Daily Utility Burn Rate' },
    { id: 'TX-INIT', date: resident.moveInDate, type: 'Payment', amount: resident.balance + 500, description: 'Initial Security Deposit' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050B3E]/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-[0_48px_120px_rgba(0,0,0,0.3)] overflow-hidden relative z-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <div className="p-12">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#050B3E] text-white rounded-[20px]">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#050B3E] tracking-tight uppercase">Ledger Audit</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resident: {resident.name} • Unit {resident.unitId}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"><X size={20} /></button>
          </div>
          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 mb-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Current Floating Balance</p>
              <h4 className={`text-4xl font-black tracking-tighter ${resident.balance < 0 ? 'text-rose-500' : 'text-[#050B3E]'}`}>Rs. {resident.balance.toLocaleString()}</h4>
            </div>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {transactions.map((tx: Transaction, i: number) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[28px] hover:shadow-md transition-all group">
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-2xl ${tx.amount > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                    {tx.amount > 0 ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#050B3E]">{tx.description}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(tx.date).toLocaleDateString()} • {tx.type}</p>
                  </div>
                </div>
                <p className={`text-base font-black tracking-tight ${tx.amount > 0 ? 'text-emerald-500' : 'text-slate-700'}`}>{tx.amount > 0 ? '+' : ''}Rs. {Math.abs(tx.amount).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResidentHub: React.FC<ResidentHubProps> = ({ residents, setResidents, onRegister }) => {
  const [selectedResidentForAudit, setSelectedResidentForAudit] = useState<Resident | null>(null);
  const [targetResident, setTargetResident] = useState<Resident | null>(null);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [addonForm, setAddonForm] = useState({
    wifi: false,
    electricity: false,
    waste: false,
    previousDue: 0
  });

  const handleOpenAddon = (resident: Resident) => {
    setTargetResident(resident);
    setAddonForm({
      wifi: resident.subscriptions?.some(s => s.type === 'Internet') || false,
      electricity: resident.subscriptions?.some(s => s.type === 'Electricity') || false,
      waste: resident.subscriptions?.some(s => s.type === 'Waste') || false,
      previousDue: 0
    });
    setShowAddonModal(true);
  };

  const calculateBaseRate = (resident: Resident) => {
    let currentAddonDaily = 0;
    resident.subscriptions?.forEach(sub => {
      if (sub.monthlyRate > 0) currentAddonDaily += (sub.monthlyRate / 30);
    });
    return resident.dailyRate - currentAddonDaily;
  };

  const calculateNewDailyRate = () => {
    if (!targetResident) return 0;
    let rate = calculateBaseRate(targetResident);
    if (addonForm.wifi) rate += (1200 / 30);
    if (addonForm.electricity) rate += 0;
    if (addonForm.waste) rate += (350 / 30);
    return parseFloat(rate.toFixed(1));
  };

  const applyAddons = () => {
    if (!targetResident) return;
    const newDailyRate = calculateNewDailyRate();
    const newBalance = targetResident.balance - addonForm.previousDue;
    const newDaysRemaining = newDailyRate > 0 ? Math.floor(newBalance / newDailyRate) : 999;
    const updatedSubscriptions: AddonService[] = [];
    if (addonForm.wifi) updatedSubscriptions.push({ id: `wifi-${targetResident.id}`, name: 'Fiber Optics', status: 'Active', monthlyRate: 1200, type: 'Internet' });
    if (addonForm.electricity) updatedSubscriptions.push({ id: `elec-${targetResident.id}`, name: 'Smart Power', status: 'Active', monthlyRate: 0, type: 'Electricity' });
    if (addonForm.waste) updatedSubscriptions.push({ id: `waste-${targetResident.id}`, name: 'Waste Fee', status: 'Active', monthlyRate: 350, type: 'Waste' });

    setResidents(prev => prev.map(r => r.id === targetResident.id ? { ...r, dailyRate: newDailyRate, balance: newBalance, daysRemaining: newDaysRemaining, subscriptions: updatedSubscriptions } : r));
    setShowAddonModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handlePayment = () => {
    if (!targetResident || !paymentAmount) return;
    const amount = parseFloat(paymentAmount);
    setResidents(prev => prev.map(r => r.id === targetResident.id ? { ...r, balance: r.balance + amount } : r));
    setShowPaymentModal(false);
    setPaymentAmount('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleContact = (name: string) => {
    alert(`Initializing secure comms node for ${name}...`);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {showSuccessToast && (
        <div className="fixed top-24 right-10 z-[110] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 fade-in">
          <CheckCircle2 size={20} />
          <p className="text-sm font-black uppercase tracking-widest">Protocol Updated Successfully</p>
        </div>
      )}

      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">Residents</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">Audit-ready lease terms & live burn rates.</p>
        </div>
        <button 
          onClick={onRegister}
          className="px-8 py-4 bg-[#050B3E] text-white rounded-[18px] text-sm font-black uppercase tracking-wider shadow-xl hover:bg-[#030626] transition-all active:scale-95"
        >
          Register Resident
        </button>
      </div>

      <div className="flex flex-col gap-10">
        {residents.map((resident) => (
          <div key={resident.id} className="bg-white rounded-[48px] border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
            <div className="p-12">
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <img src={resident.avatarUrl || `https://picsum.photos/seed/${resident.id}/160/160`} className="w-24 h-24 rounded-[32px] border-4 border-slate-50 shadow-sm object-cover" alt={resident.name} />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <div className={`w-3.5 h-3.5 rounded-full ${resident.daysRemaining > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl font-black text-[#050B3E] tracking-tight">{resident.name}</h3>
                      <div className="flex items-center gap-1.5 ml-2">
                        {resident.subscriptions?.map((sub, idx) => (
                          <div key={idx} className="p-1.5 bg-slate-50 rounded-lg text-slate-400" title={sub.name}>
                            {sub.type === 'Internet' && <Wifi size={12} />}
                            {sub.type === 'Electricity' && <Zap size={12} />}
                            {sub.type === 'Waste' && <Trash2 size={12} />}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black text-[#050B3E] uppercase tracking-[0.2em] opacity-80">Unit {resident.unitId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <button onClick={() => handleOpenAddon(resident)} className="mt-1 p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm active:scale-90" title="Add Addon Services"><Plus size={16} /></button>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">Daily Rate</p>
                    <p className="text-2xl font-black text-[#050B3E] tracking-tight italic">Rs. {resident.dailyRate.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 p-10 bg-slate-50/50 rounded-[40px] mb-10 border border-slate-100/50">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Ledger</p>
                  <p className={`text-xl font-black ${resident.balance < 0 ? 'text-rose-500' : 'text-[#050B3E]'} tracking-tight`}>Rs. {resident.balance.toLocaleString()}</p>
                </div>
                <div className="text-center border-x border-slate-200/50 px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Condition</p>
                  <p className={`text-xl font-black ${resident.daysRemaining > 7 ? 'text-[#050B3E]' : 'text-rose-500'} tracking-tight`}>{resident.daysRemaining > 7 ? 'Stable' : resident.daysRemaining > 0 ? 'Low' : 'Critical'}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Buffer</p>
                  <p className={`text-xl font-black ${resident.daysRemaining < 7 ? 'text-rose-500' : 'text-emerald-500'} tracking-tight`}>{resident.daysRemaining}d</p>
                </div>
              </div>

              <div className="flex gap-6">
                <button 
                  onClick={() => handleContact(resident.name)}
                  className="flex-1 flex items-center justify-center gap-3 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-[28px] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all"
                >
                  <Smartphone size={20} className="text-slate-400" /> Contact
                </button>
                <button 
                  onClick={() => { setTargetResident(resident); setShowPaymentModal(true); }}
                  className="flex-[1.5] flex items-center justify-center gap-3 py-5 bg-[#050B3E] text-white rounded-[28px] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#030626] transition-all active:scale-95"
                >
                  <CreditCard size={20} className="opacity-60" /> Reconcile Payment
                </button>
              </div>
            </div>
            <button onClick={() => setSelectedResidentForAudit(resident)} className="w-full py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#050B3E] transition-colors group">
              <History size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" /> View Transaction History Audit <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && targetResident && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#050B3E]/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowPaymentModal(false)} />
          <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl relative z-10 animate-in zoom-in-95 p-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-2">Reconcile Funds</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Direct ledger top-up for: {targetResident.name}</p>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px]">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Deposit Amount</p>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">Rs.</span>
                  <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="w-full bg-transparent border-none text-xl font-black text-slate-800 focus:ring-0 pl-8" placeholder="0.00" autoFocus />
                </div>
              </div>
              <button onClick={handlePayment} className="w-full py-6 bg-emerald-500 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3"><DollarSign size={20} /> Commit Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* Provision Modal */}
      {showAddonModal && targetResident && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050B3E]/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowAddonModal(false)} />
          <div className="bg-white w-full max-w-xl rounded-[48px] shadow-[0_64px_200px_rgba(0,0,0,0.5)] relative z-10 animate-in zoom-in-95 duration-500 overflow-hidden p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><Sparkles size={24} /></div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Service Deployment</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provisioning Node for: {targetResident.name}</p>
                </div>
              </div>
              <button onClick={() => setShowAddonModal(false)} className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => setAddonForm(f => ({...f, wifi: !f.wifi}))} className={`flex items-center justify-between p-6 border rounded-[32px] transition-all group ${addonForm.wifi ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-4"><div className={`p-3 rounded-xl ${addonForm.wifi ? 'bg-blue-500 text-white' : 'bg-white text-slate-300'}`}><Wifi size={20} /></div><div className="text-left"><p className="text-sm font-black text-slate-800">WiFi Fiber</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rs. 1200 /mo</p></div></div>
                {addonForm.wifi && <CheckCircle2 size={18} className="text-blue-500" />}
              </button>
              <button onClick={() => setAddonForm(f => ({...f, electricity: !f.electricity}))} className={`flex items-center justify-between p-6 border rounded-[32px] transition-all group ${addonForm.electricity ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-4"><div className={`p-3 rounded-xl ${addonForm.electricity ? 'bg-amber-500 text-white' : 'bg-white text-slate-300'}`}><Zap size={20} /></div><div className="text-left"><p className="text-sm font-black text-slate-800">Electricity</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Meter Base</p></div></div>
                {addonForm.electricity && <CheckCircle2 size={18} className="text-amber-500" />}
              </button>
              <button onClick={() => setAddonForm(f => ({...f, waste: !f.waste}))} className={`flex items-center justify-between p-6 border rounded-[32px] transition-all group ${addonForm.waste ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-4"><div className={`p-3 rounded-xl ${addonForm.waste ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300'}`}><Trash2 size={20} /></div><div className="text-left"><p className="text-sm font-black text-slate-800">Waste Fee</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rs. 350 /mo</p></div></div>
                {addonForm.waste && <CheckCircle2 size={18} className="text-emerald-500" />}
              </button>
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px]"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Previous Due Adjustment</p><div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">Rs.</span><input type="number" value={addonForm.previousDue} onChange={(e) => setAddonForm(f => ({...f, previousDue: Number(e.target.value)}))} className="w-full bg-transparent border-none text-base font-black text-slate-800 focus:ring-0 pl-7" placeholder="0.00" /></div></div>
            </div>
            <div className="bg-[#050B3E] p-10 rounded-[40px] text-white flex justify-between items-center shadow-xl relative overflow-hidden"><div className="relative z-10"><p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Projected Daily Rate</p><h4 className="text-5xl font-black tracking-tighter italic">Rs. {calculateNewDailyRate().toFixed(1)}</h4></div><div className="text-right relative z-10"><p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Ledger Update</p><p className="text-2xl font-black text-rose-400">-Rs. {addonForm.previousDue.toLocaleString()}</p></div></div>
            <div className="mt-8"><button onClick={applyAddons} className="w-full py-6 bg-[#050B3E] text-white rounded-[28px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">Commit Entry & Add in Total</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentHub;
