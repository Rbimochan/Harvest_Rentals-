
import { UnitStatus, Resident, Unit, EventType, SystemEvent, AddonService } from '../types';

// Using stable Unsplash images that match the visual context provided by the user
const KUNWAR_NIWAS_BUILDING = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
const SUBASH_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80";

export const mockUnits: Unit[] = Array.from({ length: 22 }, (_, i) => {
  const id = `u${i + 1}`;
  const number = (100 + i + 1).toString();
  const floor = Math.floor(i / 8) + 1; 
  
  let status = UnitStatus.ACTIVE;
  if (i === 3) status = UnitStatus.CURTAILED;
  if (i === 1) status = UnitStatus.GRACE_PERIOD;
  if (i > 15) status = UnitStatus.MAINTENANCE;

  return {
    id,
    number,
    floor,
    status,
    safetyLimitAmps: i % 2 === 0 ? 32 : 63,
    currentResidentId: i === 0 ? 't-subash' : (i < 15 ? `t${i + 1}` : undefined),
    imageUrl: i === 0 ? KUNWAR_NIWAS_BUILDING : undefined
  };
});

const defaultAddons: AddonService[] = [
  { id: 'S1', name: 'Smart Meter Power', status: 'Active', monthlyRate: 0, type: 'Electricity' },
  { id: 'S2', name: 'Fiber Optics (60Mbps)', status: 'Active', monthlyRate: 1200, type: 'Internet' },
  { id: 'S3', name: 'Sanitation & Waste', status: 'Active', monthlyRate: 350, type: 'Waste' }
];

export const mockResidents: Resident[] = [
  { 
    id: 't-subash', 
    name: 'Subash', 
    unitId: 'u1', 
    balance: 8540.50, 
    dailyRate: 65, 
    daysRemaining: 131, 
    lastKwhReading: 12.4, 
    moveInDate: '2025-05-01',
    avatarUrl: SUBASH_AVATAR,
    subscriptions: [...defaultAddons]
  },
  { 
    id: 't2', name: 'Maya Shrestha', unitId: 'u2', balance: 450, dailyRate: 75, daysRemaining: 6, lastKwhReading: 201.8, moveInDate: '2025-02-15',
    subscriptions: [defaultAddons[0], defaultAddons[2]]
  },
  { 
    id: 't3', name: 'Suman Kunwar', unitId: 'u3', balance: 1200, dailyRate: 60, daysRemaining: 20, lastKwhReading: 45.2, moveInDate: '2025-03-10',
    subscriptions: [defaultAddons[0]]
  },
  { id: 't4', name: 'Marcus Miller', unitId: 'u4', balance: -350, dailyRate: 50, daysRemaining: -7, lastKwhReading: 412.0, moveInDate: '2024-11-20' },
  { id: 't5', name: 'Elena Rodriguez', unitId: 'u5', balance: 1200, dailyRate: 60, daysRemaining: 20, lastKwhReading: 88.2, moveInDate: '2025-05-10' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `t${i + 6}`,
    name: `Resident ${i + 6}`,
    unitId: `u${i + 6}`,
    balance: 2000 + (i * 100),
    dailyRate: 55,
    daysRemaining: 30 + i,
    lastKwhReading: 100 + (i * 12),
    moveInDate: '2025-04-01'
  }))
];

export interface Transaction {
  id: string;
  date: string;
  type: 'Payment' | 'Consumption' | 'Adjustment' | 'Penalty';
  amount: number;
  description: string;
}

export const mockTransactionsByResident: Record<string, Transaction[]> = {
  't-subash': [
    { id: 'TX-001', date: '2025-05-28', type: 'Payment', amount: 5000, description: 'Bank Transfer (E-Sewa)' },
    { id: 'TX-002', date: '2025-05-27', type: 'Consumption', amount: -65, description: 'Daily Utility Burn Rate (Unit 101)' },
    { id: 'TX-003', date: '2025-05-26', type: 'Consumption', amount: -65, description: 'Daily Utility Burn Rate (Unit 101)' },
    { id: 'TX-004', date: '2025-05-20', type: 'Payment', amount: 10000, description: 'Lease Renewal Advance' },
    { id: 'TX-005', date: '2025-05-15', type: 'Adjustment', amount: 200, description: 'Meter Recalibration Credit' },
  ],
  't4': [
    { id: 'TX-991', date: '2025-05-28', type: 'Consumption', amount: -50, description: 'Daily Utility Burn Rate' },
    { id: 'TX-992', date: '2025-05-27', type: 'Consumption', amount: -50, description: 'Daily Utility Burn Rate' },
    { id: 'TX-993', date: '2025-05-25', type: 'Penalty', amount: -150, description: 'Low Balance Curtailment Recovery Fee' },
  ]
};

export const mockEvents: SystemEvent[] = [
  { id: 'e1', timestamp: new Date().toISOString(), unitId: 'u1', type: EventType.MEASUREMENT, description: 'Consumption: 0.8kWh logged', signature: 'sig_abc123' },
  { id: 'e2', timestamp: new Date().toISOString(), unitId: 'u4', type: EventType.STATE_CHANGE, description: 'Transition: ACTIVE -> CURTAILED (Grace Expiry)', signature: 'sig_def456' },
  { id: 'e3', timestamp: new Date().toISOString(), unitId: 'u2', type: EventType.ALERT, description: 'Soft Alert: 6 days remaining', signature: 'sig_ghi789' },
];
