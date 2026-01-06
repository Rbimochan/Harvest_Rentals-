
import React, { useState } from 'react';
import { mockTenants } from '../services/mockData';
import { Search, Filter, Plus, Mail, Phone, MoreVertical } from 'lucide-react';

const Tenants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTenants = mockTenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.roomNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tenant Directory</h2>
          <p className="text-slate-500">Manage {mockTenants.length} residents across the property</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
          <Plus size={18} /> Add New Tenant
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, room, or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <div key={tenant.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={`https://picsum.photos/seed/${tenant.id}/60/60`} 
                      alt={tenant.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{tenant.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">Room {tenant.roomNumber}</p>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-50">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  {tenant.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  {tenant.phone}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-center px-2">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Move-in</p>
                  <p className="text-sm font-semibold text-slate-700">{new Date(tenant.moveInDate).toLocaleDateString()}</p>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-center px-2">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Balance</p>
                  <p className={`text-sm font-bold ${tenant.balance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    ${tenant.balance}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex border-t border-slate-100">
              <button className="flex-1 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wider border-r border-slate-100">View Profile</button>
              <button className="flex-1 py-3 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors uppercase tracking-wider">Send Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tenants;
