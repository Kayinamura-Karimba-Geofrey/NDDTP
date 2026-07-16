export type MaintenanceStatus =
  | 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'ON_HOLD'
  | 'OVERDUE' | 'ACTIVE' | 'INACTIVE' | 'OPEN' | 'CLOSED';

export type MaintenanceType = 'PREVENTIVE' | 'CORRECTIVE' | 'EMERGENCY' | 'INSPECTION';
export type MaintenancePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface MaintenanceCategory {
  id: string;
  name: string;
  description: string;
  requestCount: number;
  status: MaintenanceStatus;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  category: string;
  type: MaintenanceType;
  asset: string;
  priority: MaintenancePriority;
  requestedBy: string;
  requestedAt: string;
  status: MaintenanceStatus;
}

export interface WorkOrder {
  id: string;
  title: string;
  type: MaintenanceType;
  asset: string;
  priority: MaintenancePriority;
  assignee: string;
  scheduledAt: string;
  dueAt?: string;
  status: MaintenanceStatus;
  progress: number;
}

export interface WorkOrderTask {
  id: string;
  workOrderId: string;
  name: string;
  assignee: string;
  status: MaintenanceStatus;
  estimatedHours: number;
}

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  openOrders: number;
  completedThisMonth: number;
  status: MaintenanceStatus;
}

export interface MaintenancePart {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorderLevel: number;
  unitCost: string;
  status: MaintenanceStatus;
}

export interface PreventiveSchedule {
  id: string;
  asset: string;
  frequency: string;
  nextDue: string;
  lastCompleted?: string;
  status: MaintenanceStatus;
}

export interface SlaRule {
  id: string;
  priority: MaintenancePriority;
  responseHours: number;
  resolutionHours: number;
  compliance: string;
  status: MaintenanceStatus;
}

export const MAINTENANCE_DASHBOARD_KPIS = {
  openWorkOrders: 47,
  pendingRequests: 12,
  overdueOrders: 5,
  emergencyToday: 2,
  preventiveDue: 9,
  inProgress: 18,
  completedThisMonth: 84,
  avgResolutionHours: '18.6h',
  slaCompliance: '93%',
  techniciansActive: 22,
};

export const WORK_ORDERS_BY_TYPE = [
  { name: 'Preventive', value: 38 },
  { name: 'Corrective', value: 52 },
  { name: 'Emergency', value: 8 },
  { name: 'Inspection', value: 21 },
];

export const WORK_ORDER_STATUS = [
  { name: 'Scheduled', value: 14 },
  { name: 'In Progress', value: 18 },
  { name: 'Completed', value: 84 },
  { name: 'Overdue', value: 5 },
  { name: 'On Hold', value: 4 },
];

export const WEEKLY_VOLUME = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 15 },
  { day: 'Wed', count: 11 },
  { day: 'Thu', count: 18 },
  { day: 'Fri', count: 14 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 2 },
];

export const MOCK_CATEGORIES: MaintenanceCategory[] = [
  { id: 'CAT-01', name: 'HVAC', description: 'Heating, ventilation, and cooling systems', requestCount: 24, status: 'ACTIVE' },
  { id: 'CAT-02', name: 'Electrical', description: 'Power, lighting, and switchgear', requestCount: 31, status: 'ACTIVE' },
  { id: 'CAT-03', name: 'Plumbing', description: 'Water and sanitation systems', requestCount: 18, status: 'ACTIVE' },
  { id: 'CAT-04', name: 'Vehicle Workshop', description: 'Fleet and mobile equipment', requestCount: 42, status: 'ACTIVE' },
  { id: 'CAT-05', name: 'IT Infrastructure', description: 'Network and facility IT hardware', requestCount: 9, status: 'INACTIVE' },
];

export const MOCK_REQUESTS: MaintenanceRequest[] = [
  { id: 'REQ-301', title: 'AC Unit Failure — Boardroom', category: 'HVAC', type: 'CORRECTIVE', asset: 'HVAC-HQ-04', priority: 'HIGH', requestedBy: 'Facilities Desk', requestedAt: '2026-07-08 08:20', status: 'PENDING' },
  { id: 'REQ-302', title: 'Generator Monthly Service', category: 'Electrical', type: 'PREVENTIVE', asset: 'GEN-01', priority: 'MEDIUM', requestedBy: 'Ops Engineer', requestedAt: '2026-07-07 14:00', status: 'APPROVED' },
  { id: 'REQ-303', title: 'Water Leak — Barracks B', category: 'Plumbing', type: 'EMERGENCY', asset: 'PLB-BB-12', priority: 'CRITICAL', requestedBy: 'Duty Officer', requestedAt: '2026-07-08 06:45', status: 'APPROVED' },
  { id: 'REQ-304', title: 'Truck Brake Inspection', category: 'Vehicle Workshop', type: 'INSPECTION', asset: 'VEH-TRK-22', priority: 'MEDIUM', requestedBy: 'Fleet Ops', requestedAt: '2026-07-06 11:10', status: 'REJECTED' },
  { id: 'REQ-305', title: 'Corridor Lighting Outage', category: 'Electrical', type: 'CORRECTIVE', asset: 'LIT-HQ-18', priority: 'LOW', requestedBy: 'Admin Staff', requestedAt: '2026-07-05 16:30', status: 'CANCELLED' },
];

export const MOCK_PENDING = MOCK_REQUESTS.filter((r) => r.status === 'PENDING');
export const MOCK_MY_REQUESTS = MOCK_REQUESTS.filter((r) => ['REQ-301', 'REQ-303'].includes(r.id));

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  { id: 'WO-1201', title: 'Emergency Leak Repair — Barracks B', type: 'EMERGENCY', asset: 'PLB-BB-12', priority: 'CRITICAL', assignee: 'Jean Plumbing', scheduledAt: '2026-07-08 07:00', dueAt: '2026-07-08 12:00', status: 'IN_PROGRESS', progress: 60 },
  { id: 'WO-1202', title: 'Boardroom AC Corrective', type: 'CORRECTIVE', asset: 'HVAC-HQ-04', priority: 'HIGH', assignee: 'Alice HVAC', scheduledAt: '2026-07-08 10:00', dueAt: '2026-07-08 18:00', status: 'SCHEDULED', progress: 0 },
  { id: 'WO-1203', title: 'Generator Monthly Service', type: 'PREVENTIVE', asset: 'GEN-01', priority: 'MEDIUM', assignee: 'Eric Electrical', scheduledAt: '2026-07-09 08:00', dueAt: '2026-07-09 16:00', status: 'SCHEDULED', progress: 0 },
  { id: 'WO-1204', title: 'Pump Station Inspection', type: 'INSPECTION', asset: 'PMP-03', priority: 'MEDIUM', assignee: 'Claire Tech', scheduledAt: '2026-07-01 09:00', dueAt: '2026-07-01 12:00', status: 'COMPLETED', progress: 100 },
  { id: 'WO-1205', title: 'Elevator Door Adjustment', type: 'CORRECTIVE', asset: 'ELV-HQ-01', priority: 'HIGH', assignee: 'Jean Plumbing', scheduledAt: '2026-07-03 13:00', dueAt: '2026-07-04 17:00', status: 'OVERDUE', progress: 40 },
];

export const MOCK_TASKS: WorkOrderTask[] = [
  { id: 'TSK-01', workOrderId: 'WO-1201', name: 'Isolate water supply', assignee: 'Jean Plumbing', status: 'COMPLETED', estimatedHours: 0.5 },
  { id: 'TSK-02', workOrderId: 'WO-1201', name: 'Replace damaged pipe section', assignee: 'Jean Plumbing', status: 'IN_PROGRESS', estimatedHours: 2 },
  { id: 'TSK-03', workOrderId: 'WO-1201', name: 'Pressure test and restore', assignee: 'Jean Plumbing', status: 'PENDING', estimatedHours: 1 },
  { id: 'TSK-04', workOrderId: 'WO-1203', name: 'Oil and filter change', assignee: 'Eric Electrical', status: 'PENDING', estimatedHours: 3 },
];

export const MOCK_TECHNICIANS: Technician[] = [
  { id: 'TEC-01', name: 'Jean Plumbing', specialty: 'Plumbing / Facilities', openOrders: 3, completedThisMonth: 14, status: 'ACTIVE' },
  { id: 'TEC-02', name: 'Alice HVAC', specialty: 'HVAC', openOrders: 2, completedThisMonth: 11, status: 'ACTIVE' },
  { id: 'TEC-03', name: 'Eric Electrical', specialty: 'Electrical / Generators', openOrders: 4, completedThisMonth: 9, status: 'ACTIVE' },
  { id: 'TEC-04', name: 'Claire Tech', specialty: 'Inspections', openOrders: 1, completedThisMonth: 16, status: 'ON_HOLD' },
];

export const MOCK_PARTS: MaintenancePart[] = [
  { id: 'PRT-01', sku: 'PIPE-40PVC', name: 'PVC Pipe 40mm', stock: 48, reorderLevel: 20, unitCost: 'RWF 3,500', status: 'ACTIVE' },
  { id: 'PRT-02', sku: 'FLT-GEN-OIL', name: 'Generator Oil Filter', stock: 6, reorderLevel: 10, unitCost: 'RWF 18,000', status: 'OVERDUE' },
  { id: 'PRT-03', sku: 'AC-COMP-R32', name: 'AC Compressor R32 Compatible', stock: 2, reorderLevel: 2, unitCost: 'RWF 420,000', status: 'ACTIVE' },
  { id: 'PRT-04', sku: 'BRK-PAD-TRK', name: 'Truck Brake Pads Set', stock: 15, reorderLevel: 8, unitCost: 'RWF 65,000', status: 'ACTIVE' },
];

export const MOCK_PREVENTIVE: PreventiveSchedule[] = [
  { id: 'PM-01', asset: 'GEN-01', frequency: 'Monthly', nextDue: '2026-07-09', lastCompleted: '2026-06-09', status: 'SCHEDULED' },
  { id: 'PM-02', asset: 'HVAC-HQ-04', frequency: 'Quarterly', nextDue: '2026-08-15', lastCompleted: '2026-05-15', status: 'ACTIVE' },
  { id: 'PM-03', asset: 'ELV-HQ-01', frequency: 'Monthly', nextDue: '2026-07-05', lastCompleted: '2026-06-05', status: 'OVERDUE' },
  { id: 'PM-04', asset: 'VEH-TRK-22', frequency: 'Every 5,000 km', nextDue: '2026-07-20', lastCompleted: '2026-06-12', status: 'SCHEDULED' },
];

export const MOCK_SLA: SlaRule[] = [
  { id: 'SLA-01', priority: 'CRITICAL', responseHours: 1, resolutionHours: 4, compliance: '96%', status: 'ACTIVE' },
  { id: 'SLA-02', priority: 'HIGH', responseHours: 4, resolutionHours: 24, compliance: '92%', status: 'ACTIVE' },
  { id: 'SLA-03', priority: 'MEDIUM', responseHours: 8, resolutionHours: 72, compliance: '94%', status: 'ACTIVE' },
  { id: 'SLA-04', priority: 'LOW', responseHours: 24, resolutionHours: 120, compliance: '98%', status: 'ACTIVE' },
];
