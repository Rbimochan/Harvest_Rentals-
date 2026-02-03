
import React from 'react';
// Fix: Use mockUnits instead of mockRooms
import { mockUnits } from '../services/mockData';
// Fix: Use UnitStatus instead of RoomStatus
import { UnitStatus } from '../types';
import { Building2, Plus, Users, Info } from 'lucide-react';

const Rooms: React.FC = () => {
  // Fix: Update status colors for UnitStatus
  const getStatusColor = (status: UnitStatus) => {
    switch(status) {
      case UnitStatus.ACTIVE: return 'bg-emerald-500';
      case UnitStatus.GRACE_PERIOD: return 'bg-amber-500';
      case UnitStatus.CURTAILED: return 'bg-rose-500';
      case UnitStatus.MAINTENANCE: return 'bg-slate-400';
      default: return 'bg-slate-200';
    }
  };

  const getStatusLabelColor = (status: UnitStatus) => {
    switch(status) {
      case UnitStatus.ACTIVE: return 'bg-emerald-100 text-emerald-700';
      case UnitStatus.GRACE_PERIOD: return 'bg-amber-100 text-amber-700';
      case UnitStatus.CURTAILED: return 'bg-rose-100 text-rose-700';
      case UnitStatus.MAINTENANCE: return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Unit Management</h2>
          <p className="text-slate-500">Inventory control and operational status monitoring</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Building2 size={18} /> All Floors
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
            <Plus size={18} /> Add Unit
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto whitespace-nowrap">
        {Object.values(UnitStatus).map((status) => (
          <div key={status} className="flex items-center gap-2 px-4 py-1 border-r border-slate-100 last:border-0">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status as UnitStatus)}`}></div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-tight">{status}</span>
            <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              {mockUnits.filter(u => u.status === status).length}
            </span>
          </div>
        ))}
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {mockUnits.map((unit) => (
          <div key={unit.id} className="relative group">
            <div className={`aspect-square rounded-2xl border-2 transition-all p-4 flex flex-col justify-between cursor-pointer ${
              unit.status === UnitStatus.ACTIVE ? 'bg-white border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10' : 
              unit.status === UnitStatus.GRACE_PERIOD ? 'bg-white border-amber-500 hover:shadow-lg hover:shadow-amber-500/10' :
              unit.status === UnitStatus.CURTAILED ? 'bg-rose-50 border-rose-500 hover:shadow-lg hover:shadow-rose-500/10' :
              'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex justify-between items-start">
                <span className="text-xl font-black text-slate-900">#{unit.number}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusLabelColor(unit.status)}`}>
                  {unit.status}
                </span>
              </div>
              
              <div className="mt-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Safety Limit</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">{unit.safetyLimitAmps}A</span>
                  {unit.currentResidentId && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                      <Users size={16} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick action menu appearing on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-1 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-emerald-600">
                <Info size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Legend & Floor Plan Info */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center gap-8 justify-between">
        <div className="space-y-1">
          <h3 className="font-bold">Operational Overview</h3>
          <p className="text-xs text-slate-400">System distribution for the current cycle.</p>
        </div>
        <div className="flex gap-8">
           <div className="text-center">
            <p className="text-2xl font-black text-emerald-400">
              {Math.round((mockUnits.filter(u => u.status === UnitStatus.ACTIVE).length / mockUnits.length) * 100)}%
            </p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Active Rate</p>
          </div>
           <div className="text-center">
            <p className="text-2xl font-black text-slate-100">{mockUnits.length}</p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Total Units</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-amber-400">
              {mockUnits.filter(u => u.status === UnitStatus.GRACE_PERIOD).length}
            </p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Grace Mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
