
import React, { useState } from 'react';
import { generateRedAlertMessage } from '../services/geminiService';
import { Send, MessageSquare, AlertTriangle, Wand2, Sparkles, Phone, Smartphone } from 'lucide-react';

const Communication: React.FC = () => {
  const [targetTenant, setTargetTenant] = useState('Marcus Miller');
  const [balance, setBalance] = useState(1200);
  const [days, setDays] = useState(14);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const msg = await generateRedAlertMessage(targetTenant, balance, days);
      setMessage(msg);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Communication Hub</h2>
          <p className="text-slate-500">Automated reminders and manual messaging</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Bulk SMS</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Email Blast</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message Composer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Red Alert Composer</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Tenant</label>
                <input 
                  type="text" 
                  value={targetTenant} 
                  onChange={(e) => setTargetTenant(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Balance ($)</label>
                <input 
                  type="number" 
                  value={balance} 
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Days Late</label>
                <input 
                  type="number" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="relative mb-6">
              <textarea 
                placeholder="The AI suggested message will appear here..."
                className="w-full h-40 p-6 bg-slate-900 text-emerald-400 font-mono text-sm rounded-xl border-none focus:ring-2 focus:ring-emerald-500 resize-none placeholder:text-slate-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-xs font-black uppercase tracking-tighter hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isLoading ? <Sparkles size={14} className="animate-spin" /> : <Wand2 size={14} />}
                {isLoading ? 'Thinking...' : 'Rewrite with AI'}
              </button>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                <Smartphone size={18} /> Send as SMS
              </button>
              <button className="flex-1 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                <Send size={18} /> Send as Email
              </button>
            </div>
          </div>
        </div>

        {/* Channels & Activity */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400 group-hover:text-emerald-500">
                    <MessageSquare size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Pre-due Reminder</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">7 Days</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400 group-hover:text-emerald-500">
                    <Smartphone size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Due Date Alert</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Today</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-rose-50 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400 group-hover:text-rose-500">
                    <AlertTriangle size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Eviction Notice</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Legal</span>
              </button>
            </div>
          </div>

          <div className="bg-emerald-500 p-6 rounded-2xl shadow-xl shadow-emerald-500/10 text-slate-900">
            <h4 className="font-black text-lg mb-2">Message Quota</h4>
            <div className="mb-4">
              <div className="flex justify-between text-xs font-bold uppercase mb-1">
                <span>SMS Credits</span>
                <span>842 / 1000</span>
              </div>
              <div className="w-full h-2 bg-emerald-950/20 rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-emerald-900"></div>
              </div>
            </div>
            <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all">Top up Credits</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
