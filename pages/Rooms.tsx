
import React from 'react';
import { mockRooms } from '../services/mockData';
import { RoomStatus } from '../types';
import { Grid, List, Building2, Plus, Users, Info } from 'lucide-react';

const Rooms: React.FC = () => {
  const getStatusColor = (status: RoomStatus) => {
    switch(status) {
      case RoomStatus.OCCUPIED: return 'bg-emerald-500';
      case RoomStatus.VACANT: return 'bg-slate-300';
      case RoomStatus.PENDING_PAYMENT: return 'bg-amber-500';
      case RoomStatus.MAINTENANCE: return 'bg-rose-500';
      default: return 'bg-slate-200';
    }
  };

  const getStatusLabelColor = (status: RoomStatus) => {
    switch(status) {
      case RoomStatus.OCCUPIED: return 'bg-emerald-100 text-emerald-700';
      case RoomStatus.VACANT: return 'bg-slate-100 text-slate-700';
      case RoomStatus.PENDING_PAYMENT: return 'bg-amber-100 text-amber-700';
      case RoomStatus.MAINTENANCE: return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Room Management</h2>
          <p className="text-slate-500">Inventory control and occupancy monitoring</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Building2 size={18} /> All Floors
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
            <Plus size={18} /> Add Room
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto whitespace-nowrap">
        {Object.values(RoomStatus).map((status) => (
          <div key={status} className="flex items-center gap-2 px-4 py-1 border-r border-slate-100 last:border-0">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-tight">{status}</span>
            <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              {mockRooms.filter(r => r.status === status).length}
            </span>
          </div>
        ))}
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {mockRooms.map((room) => (
          <div key={room.id} className="relative group">
            <div className={`aspect-square rounded-2xl border-2 transition-all p-4 flex flex-col justify-between cursor-pointer ${
              room.status === RoomStatus.OCCUPIED ? 'bg-white border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10' : 
              room.status === RoomStatus.VACANT ? 'bg-slate-50 border-slate-200 hover:border-slate-300' :
              room.status === RoomStatus.MAINTENANCE ? 'bg-rose-50 border-rose-500 hover:shadow-lg hover:shadow-rose-500/10' :
              'bg-white border-amber-500 hover:shadow-lg hover:shadow-amber-500/10'
            }`}>
              <div className="flex justify-between items-start">
                <span className="text-xl font-black text-slate-900">#{room.number}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusLabelColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
              
              <div className="mt-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Base Rent</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">${room.baseRent}</span>
                  {room.currentTenantId && (
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
          <h3 className="font-bold">Occupancy Overview</h3>
          <p className="text-xs text-slate-400">Inventory distribution for the current fiscal period.</p>
        </div>
        <div className="flex gap-8">
           <div className="text-center">
            <p className="text-2xl font-black text-emerald-400">82%</p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Efficiency</p>
          </div>
           <div className="text-center">
            <p className="text-2xl font-black text-slate-100">18</p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Units</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-amber-400">2</p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
