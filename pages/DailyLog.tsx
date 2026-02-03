
import React, { useState, useMemo } from 'react';
import { 
  Table as TableIcon, 
  Plus, 
  Save, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Download, 
  MoreHorizontal,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

const DailyLog: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: '1', date: '2025-06-01', description: 'Monthly Rent - Unit 101', category: 'Rent', type: 'income', amount: 15000 },
    { id: '2', date: '2025-06-01', description: 'Water Bill Payment', category: 'Utilities', type: 'expense', amount: 1200 },
    { id: '3', date: '2025-06-02', description: 'Advance Rent - Unit 204', category: 'Rent', type: 'income', amount: 5000 },
    { id: '4', date: '2025-06-02', description: 'Cleaning Supplies', category: 'Maintenance', type: 'expense', amount: 450 },
  ]);

  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'General',
    type: 'expense',
    amount: 0
  });

  const totals = useMemo(() => {
    return entries.reduce((acc, curr) => {
      if (curr.type === 'income') acc.income += curr.amount;
      else acc.expense += curr.amount;
      return acc;
    }, { income: 0, expense: 0 });
  }, [entries]);

  const handleAddEntry = () => {
    if (!newEntry.description || !newEntry.amount) return;
    const entry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: newEntry.date || new Date().toISOString().split('T')[0],
      description: newEntry.description,
      category: newEntry.category || 'General',
      type: newEntry.type as 'income' | 'expense',
      amount: Number(newEntry.amount)
    };
    setEntries([entry, ...entries]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: 'General',
      type: 'expense',
      amount: 0
    });
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">Daily Ledger</h2>
          <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Spreadsheet-mode Operational Journal</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Income</p>
              <p className="text-xl font-black text-emerald-600">Rs. {totals.income.toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Burn</p>
              <p className="text-xl font-black text-rose-500">Rs. {totals.expense.toLocaleString()}</p>
            </div>
          </div>
          <button className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-[#050B3E] hover:border-[#050B3E] transition-all shadow-sm">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Spreadsheet Component */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            {/* Quick Add Bar */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 grid grid-cols-12 gap-4">
              <div className="col-span-2">
                <input 
                  type="date"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-[#050B3E]/10 transition-all"
                  value={newEntry.date}
                  onChange={e => setNewEntry({...newEntry, date: e.target.value})}
                />
              </div>
              <div className="col-span-4">
                <input 
                  type="text"
                  placeholder="Transaction Description..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-[#050B3E]/10 transition-all"
                  value={newEntry.description}
                  onChange={e => setNewEntry({...newEntry, description: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-[#050B3E]/10 transition-all"
                  value={newEntry.type}
                  onChange={e => setNewEntry({...newEntry, type: e.target.value as any})}
                >
                  <option value="expense">Burn (Out)</option>
                  <option value="income">Yield (In)</option>
                </select>
              </div>
              <div className="col-span-2">
                <input 
                  type="number"
                  placeholder="Amount"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-[#050B3E]/10 transition-all"
                  value={newEntry.amount || ''}
                  onChange={e => setNewEntry({...newEntry, amount: Number(e.target.value)})}
                />
              </div>
              <div className="col-span-2">
                <button 
                  onClick={handleAddEntry}
                  className="w-full bg-[#050B3E] text-white rounded-xl py-2 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Plus size={14} /> Log Row
                </button>
              </div>
            </div>

            {/* Grid Headers */}
            <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-[#050B3E] text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
              <div className="col-span-2">Date Timestamp</div>
              <div className="col-span-4">Description Context</div>
              <div className="col-span-2">Classification</div>
              <div className="col-span-2">Monetary Value</div>
              <div className="col-span-1 text-center">Flow</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Grid Body */}
            <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto custom-scrollbar">
              {entries.map((entry) => (
                <div key={entry.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-2 text-xs font-bold text-slate-400">{entry.date}</div>
                  <div className="col-span-4 text-xs font-black text-[#050B3E]">{entry.description}</div>
                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      {entry.category}
                    </span>
                  </div>
                  <div className={`col-span-2 text-sm font-black ${entry.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                    Rs. {entry.amount.toLocaleString()}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {entry.type === 'income' ? (
                      <ArrowDownRight className="text-emerald-500" size={18} />
                    ) : (
                      <ArrowUpRight className="text-rose-400" size={18} />
                    )}
                  </div>
                  <div className="col-span-1 text-right">
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrated Task Widget Side */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-[#050B3E] rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
            <h3 className="text-lg font-black mb-6 uppercase tracking-widest flex items-center gap-3">
              <CheckCircle2 size={20} className="text-blue-400" />
              PRIORITY TASKS
            </h3>
            <div className="space-y-4 relative z-10">
              {[
                { task: 'Collect Unit 102 Rent', status: 'pending', deadline: 'Today' },
                { task: 'Pay Electricity Board', status: 'pending', deadline: 'Tomorrow' },
                { task: 'Fix Unit 104 Circuit', status: 'completed', deadline: 'Done' },
              ].map((t, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${t.status === 'completed' ? 'bg-white/5 border-white/10 opacity-50' : 'bg-white/10 border-white/20'} flex flex-col gap-2`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${t.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                      {t.task}
                    </span>
                    {t.status === 'completed' ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Clock size={14} className="text-amber-400" />}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{t.deadline}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              Manage Tasks
            </button>
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-[40px]" />
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-[#050B3E] mb-6 uppercase tracking-widest">Ledger Integrity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-500">All entries signed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-500">Cloud sync active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-slate-500">4 Unreconciled tasks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
