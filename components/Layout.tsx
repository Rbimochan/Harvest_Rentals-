
import React from 'react';
import { 
  Activity, 
  Users, 
  LayoutGrid, 
  CreditCard, 
  MessageSquare, 
  ShieldCheck, 
  Bell,
  LogOut,
  Search,
  Phone,
  BookOpen,
  Handshake,
  Coins,
  CheckSquare
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
}

/**
 * High-fidelity 'rentapp' wordmark SVG based on provided brand image
 */
export const RentAppLogo = ({ size = 32, className = "", color }: { size?: number, className?: string, color?: string }) => (
  <svg 
    width={size * 4} 
    height={size} 
    viewBox="0 0 160 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <text 
      x="0" 
      y="28" 
      fontFamily="'Plus Jakarta Sans', sans-serif" 
      fontSize="26" 
      fontWeight="700" 
      letterSpacing="-0.04em"
    >
      <tspan fill={color || "#71717A"}>rent</tspan>
      <tspan fill={color || "#050B3E"}>app</tspan>
    </text>
  </svg>
);

// Version for dark backgrounds (Sidebar)
export const RentAppLogoDark = ({ size = 32, className = "", color }: { size?: number, className?: string, color?: string }) => (
  <svg 
    width={size * 4} 
    height={size} 
    viewBox="0 0 160 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <text 
      x="0" 
      y="28" 
      fontFamily="'Plus Jakarta Sans', sans-serif" 
      fontSize="26" 
      fontWeight="700" 
      letterSpacing="-0.04em"
    >
      <tspan fill={color || "#94A3B8"}>rent</tspan>
      <tspan fill={color || "white"}>app</tspan>
    </text>
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, onLogout }) => {
  const navItems = [
    { id: 'pulse', label: 'The Pulse', icon: Activity },
    { id: 'residents', label: 'Residents', icon: Users },
    { id: 'units', label: 'Units', icon: LayoutGrid },
    { id: 'tasks', label: 'To-Do List', icon: CheckSquare },
    { id: 'daily-log', label: 'Daily Journal', icon: BookOpen },
    { id: 'parties', label: 'Vendors', icon: Handshake },
    { id: 'loans', label: 'Loan Desk', icon: Coins },
    { id: 'payments', label: 'Financials', icon: CreditCard },
    { id: 'comms', label: 'Messages', icon: MessageSquare },
    { id: 'audit', label: 'System Log', icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar - Deep Navy/Slate */}
      <aside className="w-72 bg-[#050B3E] flex flex-col shrink-0 shadow-[8px_0_32px_rgba(0,0,0,0.1)]">
        <div className="p-8 pb-10 flex items-center gap-3">
          <RentAppLogoDark size={38} />
        </div>

        <nav className="flex-1 px-6 space-y-1 overflow-y-auto custom-scrollbar pb-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activePage === item.id 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={activePage === item.id ? 2.5 : 2} />
                {item.label}
              </div>
              {activePage === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 bg-[#050B3E]">
          <div className="bg-white/5 p-4 rounded-2xl mb-4 border border-white/10">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Concierge Support</p>
            <div className="flex items-center gap-2 text-slate-200">
              <Phone size={14} className="text-slate-400" />
              <span className="text-xs font-bold">984164243</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-rose-400 transition-all text-sm font-medium"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white/80 border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-4">
             <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
             <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Global Ops Node</span>
               <span className="text-sm font-black text-[#050B3E] tracking-tight italic">KunwarNiwas Property</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-300" />
              </div>
              <input 
                type="text" 
                placeholder="Secure command search..."
                className="bg-slate-100 border-none rounded-full py-2.5 pl-10 pr-4 text-xs w-64 focus:ring-2 focus:ring-[#050B3E]/10 transition-all outline-none"
              />
            </div>
            <button className="relative p-2.5 text-slate-400 hover:text-[#050B3E] transition-colors bg-slate-50 rounded-xl">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right mr-2 hidden sm:block">
                <p className="text-xs font-bold text-[#050B3E]">Property Admin</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Level 4 Access</p>
              </div>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80&q=80" className="w-10 h-10 rounded-2xl border border-slate-200 shadow-sm object-cover" alt="Admin" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
