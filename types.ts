
export enum UnitStatus {
  ACTIVE = 'Active',
  GRACE_PERIOD = 'Grace Period',
  CURTAILED = 'Curtailed',
  MAINTENANCE = 'Maintenance'
}

export enum EventType {
  MEASUREMENT = 'measurement',
  STATE_CHANGE = 'state_change',
  PAYMENT = 'payment',
  ALERT = 'alert',
  MANUAL_OVERRIDE = 'manual_override'
}

export interface AddonService {
  id: string;
  name: string;
  status: 'Active' | 'Suspended' | 'Pending';
  monthlyRate: number;
  type: 'Electricity' | 'Internet' | 'Waste' | 'Water' | 'Security';
}

export interface Resident {
  id: string;
  name: string;
  unitId: string;
  balance: number;
  dailyRate: number; // Rs per day (fixed rate)
  daysRemaining: number;
  lastKwhReading: number;
  moveInDate: string;
  avatarUrl?: string;
  subscriptions?: AddonService[];
}

export interface Unit {
  id: string;
  number: string;
  floor: number;
  status: UnitStatus;
  safetyLimitAmps: number;
  currentResidentId?: string;
  imageUrl?: string;
}

export interface SystemEvent {
  id: string;
  timestamp: string;
  unitId: string;
  type: EventType;
  description: string;
  signature: string; // HMAC-SHA256 mock
}
