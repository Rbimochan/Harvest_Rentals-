
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tenants from './pages/Tenants';
import Rooms from './pages/Rooms';
import Communication from './pages/Communication';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard': return <Dashboard />;
      case 'tenants': return <Tenants />;
      case 'rooms': return <Rooms />;
      case 'communication': return <Communication />;
      case 'billing': return (
        <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
             <span className="text-2xl font-bold">$</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Billing Logic Engine</h2>
          <p className="text-slate-500">Feature coming in Sprint 5</p>
        </div>
      );
      case 'reports': return (
        <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
             <span className="text-2xl font-bold">📄</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Financial Reports</h2>
          <p className="text-slate-500">Feature coming in Sprint 9</p>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
