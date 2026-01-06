
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DoorClosed, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  Settings,
  Bell,
  LogOut,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Pulse Dashboard', icon: LayoutDashboard },
    { id: 'tenants', label: 'Tenant Directory', icon: Users },
    { id: 'rooms', label: 'Room Management', icon: DoorClosed },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'communication', label: 'Message Hub', icon: MessageSquare },
    { id: 'reports', label: 'Financial Reports', icon: FileText },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-slate-900">H</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Harvest Rentals</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                activePage === item.id 
                  ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-sm font-medium">
            <Settings size={18} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-all text-sm font-medium mt-1">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tenants, rooms, or invoices..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900 leading-none">Admin User</p>
                <p className="text-[10px] text-slate-500">Property Manager</p>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/40/40" 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Page Container */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
