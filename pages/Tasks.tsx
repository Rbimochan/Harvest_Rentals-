
import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calendar, 
  Tag, 
  MoreVertical, 
  CheckCircle2, 
  Circle,
  AlertCircle,
  DollarSign
} from 'lucide-react';

interface Task {
  id: string;
  text: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  financialLink?: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Monthly Maintenance Audit - Floor 2', category: 'Maintenance', priority: 'high', completed: false },
    { id: '2', text: 'Update Ledger for Unit 302', category: 'Financial', priority: 'medium', completed: false, financialLink: true },
    { id: '3', text: 'Renew Staff Insurance', category: 'Compliance', priority: 'medium', completed: true },
    { id: '4', text: 'Water Tank Cleaning', category: 'Maintenance', priority: 'high', completed: false },
  ]);

  const [newTaskText, setNewTaskText] = useState('');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addTask = () => {
    if (!newTaskText) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTaskText,
      category: 'General',
      priority: 'medium',
      completed: false
    };
    setTasks([task, ...tasks]);
    setNewTaskText('');
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">To-Do List</h2>
          <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Operational Protocol Tasks</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Open Protocols</p>
            <p className="text-xl font-black text-[#050B3E]">{tasks.filter(t => !t.completed).length}</p>
          </div>
          <div className="w-px h-10 bg-slate-100" />
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency Rate</p>
            <p className="text-xl font-black text-emerald-500">
              {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main List Section */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Entry */}
          <div className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="flex-1 relative group">
              <CheckSquare className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Initialize new protocol task..."
                className="w-full bg-slate-50 border-none rounded-[24px] py-4 pl-16 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-[#050B3E]/5 transition-all"
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
              />
            </div>
            <button 
              onClick={addTask}
              className="bg-[#050B3E] text-white p-4 rounded-[24px] shadow-lg hover:bg-[#030626] transition-all active:scale-95"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Active Tasks */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6 mb-2">Incomplete Protocols</h3>
            {tasks.filter(t => !t.completed).map((task) => (
              <div key={task.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm group hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="w-8 h-8 rounded-xl border-2 border-slate-100 flex items-center justify-center text-transparent hover:border-emerald-500 transition-all"
                  >
                    <Circle size={14} className="text-slate-200" />
                  </button>
                  <div>
                    <h4 className="text-sm font-black text-[#050B3E]">{task.text}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        task.priority === 'high' ? 'text-rose-500' : 
                        task.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'
                      }`}>
                        {task.priority} priority
                      </span>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{task.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {task.financialLink && (
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl" title="Linked to Daily Log">
                      <DollarSign size={16} />
                    </div>
                  )}
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-3 text-slate-100 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Tasks */}
          <div className="space-y-4 opacity-50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6 mb-2">Settled Protocols</h3>
            {tasks.filter(t => t.completed).map((task) => (
              <div key={task.id} className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                  <div>
                    <h4 className="text-sm font-black text-slate-400 line-through">{task.text}</h4>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-3 text-slate-200 hover:text-rose-500 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-[#050B3E] rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              TASK INTELLIGENCE
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle size={16} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Warning</span>
                </div>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">
                  3 High-priority maintenance tasks have exceeded the 24h service-level threshold. Deploying maintenance staff notification.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Avg Resolution</p>
                  <p className="text-xl font-black">4.2h</p>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Compliance</p>
                  <p className="text-xl font-black">98%</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
          </div>

          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-sm font-black text-[#050B3E] uppercase tracking-widest">Protocol Categories</h3>
            <div className="space-y-4">
              {[
                { name: 'Maintenance', count: 12, color: 'bg-blue-500' },
                { name: 'Financial', count: 4, color: 'bg-emerald-500' },
                { name: 'Compliance', count: 2, color: 'bg-rose-500' },
                { name: 'General', count: 8, color: 'bg-slate-400' },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                    <span className="text-xs font-bold text-slate-500">{cat.name}</span>
                  </div>
                  <span className="text-xs font-black text-[#050B3E]">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
