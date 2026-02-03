
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ResidentHub from './pages/ResidentHub';
import RegisterResident from './pages/RegisterResident';
import ProvisionUnit from './pages/ProvisionUnit';
import Units from './pages/Units';
import Communication from './pages/Communication';
import LoginPage from './pages/LoginPage';
import LoginSelection from './pages/LoginSelection';
import TenantDashboard from './pages/TenantDashboard';
import Financials from './pages/Financials';
import AuditLog from './pages/AuditLog';
import DailyLog from './pages/DailyLog';
import PartyPayments from './pages/PartyPayments';
import LoanManagement from './pages/LoanManagement';
import Tasks from './pages/Tasks';
import { mockResidents as initialResidents, mockUnits as initialUnits } from './services/mockData';
import { UnitStatus } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'owner' | 'tenant' | null>(null);
  const [activePage, setActivePage] = useState('pulse');
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  // Central Shared State
  const [residents, setResidents] = useState(initialResidents);
  const [units, setUnits] = useState(initialUnits);
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 'mr1', unit: '101', issue: 'Leaking Faucet', status: 'Pending', time: '2h ago' },
    { id: 'mr2', unit: '204', issue: 'WiFi Connection', status: 'In Progress', time: '5h ago' },
  ]);

  const handleLogin = (id: string, pass: string) => {
    const cleanId = id.trim().toLowerCase();
    const cleanPass = pass.trim().toLowerCase();

    if (userRole === 'owner') {
      if (cleanId === 'admin' && cleanPass === 'admin') {
        setIsAuthenticated(true);
      } else {
        alert("Invalid Owner credentials. Please use 'admin' / 'admin'.");
      }
    } else if (userRole === 'tenant') {
      if (cleanId === 'tenet' && (cleanPass === 'tent' || cleanPass === 'tenet')) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid Tenant credentials. Please use 'tenet' / 'Tent'.");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setShowRoleSelection(true);
  };

  const selectRole = (role: 'owner' | 'tenant', instant?: boolean) => {
    setUserRole(role);
    setShowRoleSelection(false);
    if (instant) {
      setIsAuthenticated(true);
    }
  };

  const renderOwnerPage = () => {
    switch(activePage) {
      case 'pulse': return (
        <Dashboard 
          units={units} 
          setUnits={setUnits} 
          requests={maintenanceRequests} 
          setRequests={setMaintenanceRequests}
          onDeployUnit={() => setActivePage('provision-unit')}
        />
      );
      case 'residents': return (
        <ResidentHub 
          residents={residents}
          setResidents={setResidents}
          onRegister={() => setActivePage('register-resident')} 
        />
      );
      case 'register-resident': return (
        <RegisterResident 
          onCancel={() => setActivePage('residents')} 
          onSuccess={(newResident) => {
            if (newResident) setResidents([...residents, newResident]);
            setActivePage('residents');
          }} 
        />
      );
      case 'units': return (
        <Units 
          units={units}
          setUnits={setUnits}
          residents={residents}
          onProvision={() => setActivePage('provision-unit')} 
        />
      );
      case 'provision-unit': return (
        <ProvisionUnit 
          onCancel={() => setActivePage('units')} 
          onSuccess={(newUnit) => {
            if (newUnit) setUnits([...units, newUnit]);
            setActivePage('units');
          }} 
        />
      );
      case 'tasks': return <Tasks />;
      case 'daily-log': return <DailyLog />;
      case 'parties': return <PartyPayments />;
      case 'loans': return <LoanManagement />;
      case 'comms': return <Communication />;
      case 'payments': return (
        <Financials 
          residents={residents} 
          setResidents={setResidents}
        />
      );
      case 'audit': return <AuditLog />;
      default: return <Dashboard units={units} setUnits={setUnits} requests={maintenanceRequests} setRequests={setMaintenanceRequests} onDeployUnit={() => setActivePage('provision-unit')} />;
    }
  };

  if (showRoleSelection) {
    return <LoginSelection onSelectRole={selectRole} />;
  }

  if (!isAuthenticated) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowRoleSelection(true)}
          className="absolute top-8 left-8 z-50 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-[#252D3A] transition-colors"
        >
          ← Back to selection
        </button>
        <LoginPage onLogin={handleLogin} role={userRole || 'tenant'} />
      </div>
    );
  }

  if (userRole === 'tenant') {
    return <TenantDashboard residentId="t-subash" onLogout={handleLogout} />;
  }

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout}>
      {renderOwnerPage()}
    </Layout>
  );
};

export default App;
