
import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, User, Sparkles } from 'lucide-react';
import { RentAppLogo } from '../components/Layout';

interface LoginPageProps {
  onLogin: (id: string, pass: string) => void;
  role: 'owner' | 'tenant';
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, role }) => {
  const [propertyId, setPropertyId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyId && password) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(propertyId, password);
        setIsLoading(false);
      }, 600);
    }
  };

  const handleAutofill = () => {
    if (role === 'owner') {
      setPropertyId('admin');
      setPassword('admin');
    } else {
      setPropertyId('tenet');
      setPassword('Tent');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B3E] relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md px-10 py-16 bg-white rounded-[64px] shadow-[0_64px_200px_rgba(0,0,0,0.5)] relative z-10 transition-all duration-700 animate-in fade-in zoom-in-95">
        <div className="flex flex-col items-center mb-12">
          <div className="mb-8 transform scale-150">
            <RentAppLogo size={52} />
          </div>
          <p className="mt-3 text-slate-400 font-black text-center uppercase text-[10px] tracking-[0.4em]">
            {role} SECURITY GATEWAY
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6">
              Access Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#050B3E] transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                required
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                placeholder={role === 'owner' ? "admin" : "tenet"}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-5 pl-14 pr-8 text-sm font-bold outline-none transition-all placeholder:text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6">
              Encrypted Key
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#050B3E] transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={role === 'owner' ? "admin" : "Tent"}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-5 pl-14 pr-8 text-sm font-bold outline-none transition-all placeholder:text-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#050B3E] hover:bg-[#030626] text-white rounded-[28px] py-5 font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-3 group disabled:opacity-70 active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                AUTHENTICATE
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col items-center gap-6 text-center">
          <button 
            onClick={handleAutofill}
            className="flex items-center gap-3 px-8 py-3.5 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 transition-all text-[10px] font-black text-[#050B3E] uppercase tracking-[0.2em]"
          >
            <Sparkles size={16} className="text-blue-500" />
            DEMO BYPASS
          </button>
          
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              TLS 1.3 SECURE CONNECTION
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-center w-full">
        <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em]">
          rentapp infrastructure protocol
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
