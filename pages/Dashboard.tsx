
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { TrendingUp, Users, AlertCircle, Home, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 4200 },
  { name: 'Feb', revenue: 4500 },
  { name: 'Mar', revenue: 4800 },
  { name: 'Apr', revenue: 4300 },
  { name: 'May', revenue: 5200 },
  { name: 'Jun', revenue: 6100 },
];

const statusData = [
  { name: 'Occupied', value: 5, color: '#10b981' },
  { name: 'Vacant', value: 2, color: '#94a3b8' },
  { name: 'Maintenance', value: 1, color: '#f59e0b' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">The Pulse</h2>
          <p className="text-slate-500">Property health and collection overview</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Export PDF</button>
          <button className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors">Refresh Stats</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$12,450', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'emerald' },
          { title: 'Total Tenants', value: '42', change: '+2', trend: 'up', icon: Users, color: 'blue' },
          { title: 'Occupancy Rate', value: '88%', change: '-2%', trend: 'down', icon: Home, color: 'amber' },
          { title: 'Red Alerts', value: '3', change: 'Urgent', trend: 'neutral', icon: AlertCircle, color: 'rose' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-xl bg-${kpi.color}-100 text-${kpi.color}-600`}>
                <kpi.icon size={20} />
              </div>
              <span className={`text-xs font-bold flex items-center gap-1 ${
                kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-rose-600' : 'text-amber-600'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                {kpi.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Revenue Trend</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-md text-xs p-1 px-2 focus:ring-emerald-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ fill: '#10b981', r: 4 }} 
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Room Status</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Urgent Red Alerts</h3>
          <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider">View All Alerts</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Amount Due</th>
              <th className="px-6 py-4">Days Overdue</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: 'Marcus Miller', room: '201', amount: '$1,200', days: 14, color: 'rose' },
              { name: 'Sarah Jenkins', room: '102', amount: '$450', days: 4, color: 'amber' },
            ].map((alert, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{alert.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{alert.room}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{alert.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${alert.color}-100 text-${alert.color}-800`}>
                    {alert.days} days
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs transition-colors">Notify AI</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
