export type LeaveRequestStatus = 'DRAFT' | 'PENDING' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type AccrualType = 'MONTHLY' | 'ANNUAL' | 'NONE';

export interface LeaveType {
  id: string;
  code: string;
  name: string;
  description: string;
  maxDays: number;
  paid: boolean;
  carryOverAllowed: boolean;
  documentationRequired: boolean;
  accrualType: AccrualType;
}

export interface LeaveBalance {
  id: string;
  userId: string;
  employeeName: string;
  department: string;
  leaveTypeId: string;
  leaveTypeName: string;
  year: number;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  availableDays: number;
  carryOverDays?: number;
  expiryDate?: string;
}

export interface LeaveRequest {
  id: string;
  requestNumber: string;
  userId: string;
  employeeName: string;
  department: string;
  leaveTypeId: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  halfDay?: boolean;
  reason?: string;
  status: LeaveRequestStatus;
  submittedAt?: string;
  approver?: string;
  currentBalance?: number;
}

export interface PublicHoliday {
  id: string;
  name: string;
  date: string;
  region?: string;
  recurring: boolean;
  description?: string;
}

export interface LeaveDelegation {
  id: string;
  delegator: string;
  delegate: string;
  effectiveDate: string;
  expiryDate: string;
  reason: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
}

export interface LeaveAccrualEntry {
  id: string;
  employeeName: string;
  leaveType: string;
  amount: number;
  type: 'MONTHLY' | 'ANNUAL' | 'MANUAL' | 'SPECIAL' | 'EXPIRED';
  date: string;
  notes?: string;
}

export interface CarryOverRecord {
  id: string;
  employeeName: string;
  leaveType: string;
  eligibleDays: number;
  carriedDays: number;
  maxCarryOver: number;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED';
}

export interface LeavePolicy {
  id: string;
  name: string;
  rule: string;
  value: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface LeaveHistoryEntry {
  id: string;
  employeeName: string;
  event: string;
  description: string;
  date: string;
  performedBy?: string;
}

export interface CalendarLeaveEvent {
  id: string;
  title: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: LeaveRequestStatus;
  color: string;
}

export const LEAVE_DASHBOARD_KPIS = {
  annualBalance: 18,
  pendingRequests: 4,
  approvedRequests: 12,
  rejectedRequests: 1,
  teamOnLeave: 3,
  upcomingLeave: 2,
  daysUsedThisYear: 7,
  daysRemaining: 18,
  carryOverDays: 3,
  awaitingMyApproval: 5,
};

export const LEAVE_BY_TYPE = [
  { name: 'Annual Leave', value: 42 },
  { name: 'Sick Leave', value: 18 },
  { name: 'Compassionate', value: 6 },
  { name: 'Study Leave', value: 8 },
  { name: 'Maternity/Paternity', value: 4 },
  { name: 'Unpaid Leave', value: 3 },
  { name: 'Special Leave', value: 2 },
];

export const MONTHLY_LEAVE_TREND = [
  { month: 'Jan', days: 12 }, { month: 'Feb', days: 18 }, { month: 'Mar', days: 22 },
  { month: 'Apr', days: 15 }, { month: 'May', days: 28 }, { month: 'Jun', days: 24 },
  { month: 'Jul', days: 19 },
];

export const DEPARTMENT_LEAVE_DISTRIBUTION = [
  { name: 'HR', value: 45 }, { name: 'IT', value: 38 }, { name: 'Logistics', value: 62 },
  { name: 'Medical', value: 28 }, { name: 'Finance', value: 35 }, { name: 'Training', value: 22 },
];

export const APPROVAL_STATUS_BREAKDOWN = [
  { name: 'Pending', value: 14 },
  { name: 'Approved', value: 86 },
  { name: 'Rejected', value: 8 },
  { name: 'Cancelled', value: 5 },
];

export const MOCK_LEAVE_TYPES: LeaveType[] = [
  { id: 'lt1', code: 'ANNUAL', name: 'Annual Leave', description: 'Standard annual entitlement', maxDays: 30, paid: true, carryOverAllowed: true, documentationRequired: false, accrualType: 'MONTHLY' },
  { id: 'lt2', code: 'SICK', name: 'Sick Leave', description: 'Medical absence', maxDays: 15, paid: true, carryOverAllowed: false, documentationRequired: true, accrualType: 'ANNUAL' },
  { id: 'lt3', code: 'MATERNITY', name: 'Maternity Leave', description: 'Maternity entitlement', maxDays: 90, paid: true, carryOverAllowed: false, documentationRequired: true, accrualType: 'NONE' },
  { id: 'lt4', code: 'PATERNITY', name: 'Paternity Leave', description: 'Paternity entitlement', maxDays: 7, paid: true, carryOverAllowed: false, documentationRequired: false, accrualType: 'NONE' },
  { id: 'lt5', code: 'STUDY', name: 'Study Leave', description: 'Educational leave', maxDays: 10, paid: true, carryOverAllowed: false, documentationRequired: true, accrualType: 'NONE' },
  { id: 'lt6', code: 'COMPASSIONATE', name: 'Compassionate Leave', description: 'Bereavement or family emergency', maxDays: 5, paid: true, carryOverAllowed: false, documentationRequired: false, accrualType: 'NONE' },
  { id: 'lt7', code: 'UNPAID', name: 'Unpaid Leave', description: 'Leave without pay', maxDays: 30, paid: false, carryOverAllowed: false, documentationRequired: false, accrualType: 'NONE' },
];

export const MOCK_BALANCES: LeaveBalance[] = [
  { id: 'b1', userId: 'u1', employeeName: 'Patrick Habimana', department: 'Human Resources', leaveTypeId: 'lt1', leaveTypeName: 'Annual Leave', year: 2026, totalDays: 30, usedDays: 7, pendingDays: 2, availableDays: 21, carryOverDays: 3, expiryDate: '2026-12-31' },
  { id: 'b2', userId: 'u1', employeeName: 'Patrick Habimana', department: 'Human Resources', leaveTypeId: 'lt2', leaveTypeName: 'Sick Leave', year: 2026, totalDays: 15, usedDays: 2, pendingDays: 0, availableDays: 13 },
  { id: 'b3', userId: 'u2', employeeName: 'Alice Uwase', department: 'IT', leaveTypeId: 'lt1', leaveTypeName: 'Annual Leave', year: 2026, totalDays: 30, usedDays: 12, pendingDays: 0, availableDays: 18, expiryDate: '2026-12-31' },
  { id: 'b4', userId: 'u3', employeeName: 'Claire Mutesi', department: 'Finance', leaveTypeId: 'lt1', leaveTypeName: 'Annual Leave', year: 2026, totalDays: 30, usedDays: 5, pendingDays: 5, availableDays: 20, carryOverDays: 2 },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'lr1', requestNumber: 'LV-2026-0142', userId: 'u1', employeeName: 'Patrick Habimana', department: 'Human Resources', leaveTypeId: 'lt1', leaveTypeName: 'Annual Leave', startDate: '2026-07-15', endDate: '2026-07-19', totalDays: 5, reason: 'Family vacation', status: 'PENDING_APPROVAL', submittedAt: '2026-07-05T08:00:00Z', approver: 'Jean Mukamana', currentBalance: 21 },
  { id: 'lr2', requestNumber: 'LV-2026-0138', userId: 'u2', employeeName: 'Alice Uwase', department: 'IT', leaveTypeId: 'lt1', leaveTypeName: 'Annual Leave', startDate: '2026-08-01', endDate: '2026-08-05', totalDays: 5, status: 'APPROVED', submittedAt: '2026-06-20T10:00:00Z', approver: 'Jean Mukamana' },
  { id: 'lr3', requestNumber: 'LV-2026-0145', userId: 'u3', employeeName: 'Claire Mutesi', department: 'Finance', leaveTypeId: 'lt2', leaveTypeName: 'Sick Leave', startDate: '2026-07-08', endDate: '2026-07-09', totalDays: 2, reason: 'Medical appointment', status: 'PENDING_APPROVAL', submittedAt: '2026-07-07T07:30:00Z', approver: 'Patrick Habimana' },
  { id: 'lr4', requestNumber: 'LV-2026-0120', userId: 'u4', employeeName: 'Emmanuel Niyonsenga', department: 'Logistics', leaveTypeId: 'lt1', leaveTypeName: 'Annual Leave', startDate: '2026-06-10', endDate: '2026-06-14', totalDays: 5, status: 'APPROVED', submittedAt: '2026-05-25T09:00:00Z', approver: 'Jean Mukamana' },
  { id: 'lr5', requestNumber: 'LV-2026-0099', userId: 'u5', employeeName: 'Eric Habyarimana', department: 'Medical', leaveTypeId: 'lt5', leaveTypeName: 'Study Leave', startDate: '2026-04-01', endDate: '2026-04-05', totalDays: 5, status: 'REJECTED', submittedAt: '2026-03-15T11:00:00Z', approver: 'Jean Mukamana' },
];

export const MOCK_HOLIDAYS: PublicHoliday[] = [
  { id: 'h1', name: 'Liberation Day', date: '2026-07-04', region: 'National', recurring: true, description: 'Kwibohora' },
  { id: 'h2', name: 'Umuganura Day', date: '2026-08-07', region: 'National', recurring: true },
  { id: 'h3', name: 'Heroes Day', date: '2026-02-01', region: 'National', recurring: true },
  { id: 'h4', name: 'Christmas Day', date: '2026-12-25', region: 'National', recurring: true },
];

export const MOCK_DELEGATIONS: LeaveDelegation[] = [
  { id: 'd1', delegator: 'Jean Mukamana', delegate: 'Patrick Habimana', effectiveDate: '2026-08-01', expiryDate: '2026-08-15', reason: 'Annual leave', status: 'PENDING' },
  { id: 'd2', delegator: 'Alice Uwase', delegate: 'Eric Niyonsenga', effectiveDate: '2026-06-01', expiryDate: '2026-06-30', reason: 'Training abroad', status: 'ACTIVE' },
];

export const MOCK_ACCRUALS: LeaveAccrualEntry[] = [
  { id: 'a1', employeeName: 'Patrick Habimana', leaveType: 'Annual Leave', amount: 2.5, type: 'MONTHLY', date: '2026-07-01', notes: 'July accrual' },
  { id: 'a2', employeeName: 'Alice Uwase', leaveType: 'Annual Leave', amount: 2.5, type: 'MONTHLY', date: '2026-07-01' },
  { id: 'a3', employeeName: 'Claire Mutesi', leaveType: 'Annual Leave', amount: 3, type: 'SPECIAL', date: '2026-01-01', notes: 'Carry-over from 2025' },
];

export const MOCK_CARRY_OVER: CarryOverRecord[] = [
  { id: 'co1', employeeName: 'Patrick Habimana', leaveType: 'Annual Leave', eligibleDays: 5, carriedDays: 3, maxCarryOver: 5, expiryDate: '2026-03-31', status: 'ACTIVE' },
  { id: 'co2', employeeName: 'Claire Mutesi', leaveType: 'Annual Leave', eligibleDays: 4, carriedDays: 2, maxCarryOver: 5, expiryDate: '2026-03-31', status: 'ACTIVE' },
];

export const MOCK_POLICIES: LeavePolicy[] = [
  { id: 'pol1', name: 'Maximum Annual Leave', rule: 'max_annual_days', value: '30 days', status: 'ACTIVE' },
  { id: 'pol2', name: 'Minimum Notice Period', rule: 'min_notice_days', value: '5 working days', status: 'ACTIVE' },
  { id: 'pol3', name: 'Maximum Consecutive Leave', rule: 'max_consecutive', value: '21 days', status: 'ACTIVE' },
  { id: 'pol4', name: 'Weekend Counting', rule: 'count_weekends', value: 'No', status: 'ACTIVE' },
  { id: 'pol5', name: 'Negative Balance Policy', rule: 'negative_balance', value: 'Not allowed', status: 'ACTIVE' },
];

export const MOCK_LEAVE_HISTORY: LeaveHistoryEntry[] = [
  { id: 'lh1', employeeName: 'Patrick Habimana', event: 'Leave Request Submitted', description: 'Annual leave 5 days — LV-2026-0142', date: '2026-07-05T08:00:00Z' },
  { id: 'lh2', employeeName: 'Alice Uwase', event: 'Leave Approved', description: 'Annual leave 5 days — LV-2026-0138', date: '2026-06-22T14:00:00Z', performedBy: 'Jean Mukamana' },
  { id: 'lh3', employeeName: 'Claire Mutesi', event: 'Balance Adjusted', description: 'Manual grant +2 study leave days', date: '2026-06-01T09:00:00Z', performedBy: 'HR Directorate' },
  { id: 'lh4', employeeName: 'Patrick Habimana', event: 'Accrual', description: 'Monthly accrual +2.5 annual leave days', date: '2026-07-01T00:00:00Z' },
];

export const CALENDAR_EVENTS: CalendarLeaveEvent[] = [
  { id: 'ce1', title: 'Patrick Habimana — Annual Leave', employeeName: 'Patrick Habimana', leaveType: 'Annual Leave', startDate: '2026-07-15', endDate: '2026-07-19', status: 'PENDING_APPROVAL', color: '#94a3b8' },
  { id: 'ce2', title: 'Alice Uwase — Annual Leave', employeeName: 'Alice Uwase', leaveType: 'Annual Leave', startDate: '2026-08-01', endDate: '2026-08-05', status: 'APPROVED', color: '#3b82f6' },
  { id: 'ce3', title: 'Claire Mutesi — Sick Leave', employeeName: 'Claire Mutesi', leaveType: 'Sick Leave', startDate: '2026-07-08', endDate: '2026-07-09', status: 'PENDING_APPROVAL', color: '#ef4444' },
  { id: 'ce4', title: 'Liberation Day', employeeName: '—', leaveType: 'Public Holiday', startDate: '2026-07-04', endDate: '2026-07-04', status: 'APPROVED', color: '#f97316' },
];

export const LEAVE_TYPE_COLORS: Record<string, string> = {
  'Annual Leave': '#3b82f6',
  'Sick Leave': '#ef4444',
  'Study Leave': '#22c55e',
  'Public Holiday': '#f97316',
  'Compassionate Leave': '#a855f7',
};
