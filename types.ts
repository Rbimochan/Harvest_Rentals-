
export enum RoomStatus {
  OCCUPIED = 'Occupied',
  VACANT = 'Vacant',
  PENDING_PAYMENT = 'Pending Payment',
  MAINTENANCE = 'Maintenance'
}

export enum PaymentStatus {
  PAID = 'Paid',
  PARTIAL = 'Partial',
  OVERDUE = 'Overdue',
  PENDING = 'Pending'
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  moveInDate: string;
  balance: number;
  status: 'active' | 'inactive';
  photo?: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  baseRent: number;
  status: RoomStatus;
  currentTenantId?: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Bank Transfer' | 'Check';
  status: PaymentStatus;
}

export interface KPI {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}
