
import { RoomStatus, PaymentStatus, Tenant, Room, Payment } from '../types';

export const mockTenants: Tenant[] = [
  { id: '1', name: 'Alex Thompson', email: 'alex.t@example.com', phone: '555-0101', roomNumber: '101', moveInDate: '2023-01-15', balance: 0, status: 'active' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@example.com', phone: '555-0102', roomNumber: '102', moveInDate: '2023-03-10', balance: 450, status: 'active' },
  { id: '3', name: 'Marcus Miller', email: 'm.miller@example.com', phone: '555-0103', roomNumber: '201', moveInDate: '2023-05-20', balance: 1200, status: 'active' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena.r@example.com', phone: '555-0104', roomNumber: '202', moveInDate: '2023-06-01', balance: 0, status: 'active' },
  { id: '5', name: 'James Wilson', email: 'j.wilson@example.com', phone: '555-0105', roomNumber: '301', moveInDate: '2023-08-15', balance: 0, status: 'active' },
];

export const mockRooms: Room[] = [
  { id: 'r1', number: '101', floor: 1, baseRent: 1200, status: RoomStatus.OCCUPIED, currentTenantId: '1' },
  { id: 'r2', number: '102', floor: 1, baseRent: 1250, status: RoomStatus.PENDING_PAYMENT, currentTenantId: '2' },
  { id: 'r3', number: '103', floor: 1, baseRent: 1100, status: RoomStatus.VACANT },
  { id: 'r4', number: '201', floor: 2, baseRent: 1300, status: RoomStatus.OCCUPIED, currentTenantId: '3' },
  { id: 'r5', number: '202', floor: 2, baseRent: 1300, status: RoomStatus.OCCUPIED, currentTenantId: '4' },
  { id: 'r6', number: '203', floor: 2, baseRent: 1300, status: RoomStatus.MAINTENANCE },
  { id: 'r7', number: '301', floor: 3, baseRent: 1500, status: RoomStatus.OCCUPIED, currentTenantId: '5' },
  { id: 'r8', number: '302', floor: 3, baseRent: 1500, status: RoomStatus.VACANT },
];

export const mockPayments: Payment[] = [
  { id: 'p1', tenantId: '1', amount: 1200, date: '2024-05-01', method: 'Bank Transfer', status: PaymentStatus.PAID },
  { id: 'p2', tenantId: '2', amount: 800, date: '2024-05-03', method: 'Cash', status: PaymentStatus.PARTIAL },
  { id: 'p3', tenantId: '4', amount: 1300, date: '2024-05-01', method: 'Bank Transfer', status: PaymentStatus.PAID },
  { id: 'p4', tenantId: '3', amount: 0, date: '2024-05-05', method: 'Check', status: PaymentStatus.OVERDUE },
];
