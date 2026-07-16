export type ReportingStatus =
  | 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'SCHEDULED' | 'RUNNING' | 'COMPLETED'
  | 'FAILED' | 'QUEUED' | 'DELIVERED' | 'PENDING' | 'SUBSCRIBED' | 'PAUSED';

export interface KpiItem {
  id: string;
  name: string;
  owner: string;
  domain: string;
  formula: string;
  target: string;
  actual: string;
  frequency: string;
  thresholds: string;
  trend: string;
  status: ReportingStatus;
}

export interface ReportDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  owner: string;
  format: string;
  lastRun?: string;
  status: ReportingStatus;
}

export interface ScheduledReport {
  id: string;
  report: string;
  frequency: string;
  nextRun: string;
  channels: string;
  recipients: number;
  status: ReportingStatus;
}

export interface ReportSubscription {
  id: string;
  report: string;
  subscriber: string;
  frequency: string;
  channel: string;
  nextDelivery: string;
  status: ReportingStatus;
}

export interface ForecastItem {
  id: string;
  name: string;
  domain: string;
  horizon: string;
  method: string;
  confidence: string;
  status: ReportingStatus;
}

export interface ExportJob {
  id: string;
  name: string;
  format: string;
  requestedBy: string;
  requestedAt: string;
  size?: string;
  status: ReportingStatus;
}

export interface AuditReportRow {
  id: string;
  type: string;
  actor: string;
  summary: string;
  timestamp: string;
  severity: string;
}

export interface ReportHistoryRow {
  id: string;
  report: string;
  generatedBy: string;
  generatedAt: string;
  parameters: string;
  duration: string;
  downloads: number;
  status: ReportingStatus;
}

export interface DashboardWidget {
  id: string;
  name: string;
  type: string;
  domain: string;
  status: ReportingStatus;
}

export const REPORTING_DASHBOARD_KPIS = {
  totalPersonnel: 4280,
  activeEmployees: 4012,
  recruitmentProgress: '68%',
  trainingCompletion: '87%',
  budgetUtilization: '72%',
  procurementStatus: 'On Track',
  fleetUtilization: '81%',
  assetUtilization: '76%',
  leaveStatistics: '312 open',
  medicalReadiness: '94%',
  performanceScore: '3.8/5',
  systemAvailability: '99.7%',
};

export const PERSONNEL_BY_DEPT = [
  { name: 'Operations', value: 1120 },
  { name: 'Training', value: 640 },
  { name: 'Logistics', value: 520 },
  { name: 'Medical', value: 380 },
  { name: 'Finance', value: 210 },
  { name: 'HQ Staff', value: 1410 },
];

export const BUDGET_UTILIZATION = [
  { name: 'Personnel', utilized: 78 },
  { name: 'Training', utilized: 64 },
  { name: 'Fleet', utilized: 71 },
  { name: 'Medical', utilized: 55 },
  { name: 'Procurement', utilized: 82 },
  { name: 'Facilities', utilized: 48 },
];

export const TRAINING_PROGRESS = [
  { month: 'Jan', rate: 72 },
  { month: 'Feb', rate: 75 },
  { month: 'Mar', rate: 78 },
  { month: 'Apr', rate: 81 },
  { month: 'May', rate: 84 },
  { month: 'Jun', rate: 87 },
];

export const FLEET_UTILIZATION_TREND = [
  { month: 'Jan', rate: 74 },
  { month: 'Feb', rate: 76 },
  { month: 'Mar', rate: 78 },
  { month: 'Apr', rate: 79 },
  { month: 'May', rate: 80 },
  { month: 'Jun', rate: 81 },
];

export const ASSET_STATUS = [
  { name: 'Active', value: 8420 },
  { name: 'In Maintenance', value: 312 },
  { name: 'Retired', value: 640 },
];

export const PERFORMANCE_BY_DEPT = [
  { name: 'Ops', score: 3.9 },
  { name: 'Trg', score: 4.1 },
  { name: 'Log', score: 3.6 },
  { name: 'Med', score: 4.0 },
  { name: 'Fin', score: 3.7 },
];

export const OPERATIONAL_DASHBOARDS = [
  { id: 'op-personnel', name: 'Personnel Dashboard', domain: 'Personnel', kpis: 12, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-training', name: 'Training Dashboard', domain: 'Training', kpis: 8, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-finance', name: 'Finance Dashboard', domain: 'Finance', kpis: 10, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-fleet', name: 'Fleet Dashboard', domain: 'Fleet', kpis: 9, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-medical', name: 'Medical Dashboard', domain: 'Medical', kpis: 7, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-procurement', name: 'Procurement Dashboard', domain: 'Procurement', kpis: 8, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-inventory', name: 'Inventory Dashboard', domain: 'Inventory', kpis: 6, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-asset', name: 'Asset Dashboard', domain: 'Assets', kpis: 7, status: 'ACTIVE' as ReportingStatus },
  { id: 'op-security', name: 'Security Dashboard', domain: 'Security', kpis: 5, status: 'ACTIVE' as ReportingStatus },
];

export const MOCK_KPIS: KpiItem[] = [
  { id: 'KPI-01', name: 'Staff Strength', owner: 'HR Director', domain: 'Personnel', formula: 'Headcount / Authorized', target: '100%', actual: '98.4%', frequency: 'Monthly', thresholds: '95% / 90%', trend: '↑', status: 'ACTIVE' },
  { id: 'KPI-02', name: 'Turnover Rate', owner: 'HR Director', domain: 'Personnel', formula: 'Separations / Avg Strength', target: '<5%', actual: '3.2%', frequency: 'Quarterly', thresholds: '5% / 8%', trend: '↓', status: 'ACTIVE' },
  { id: 'KPI-03', name: 'Budget Utilization', owner: 'CFO', domain: 'Finance', formula: 'Spent / Allocated', target: '85–95%', actual: '72%', frequency: 'Monthly', thresholds: '95% / 100%', trend: '↑', status: 'ACTIVE' },
  { id: 'KPI-04', name: 'Vehicle Availability', owner: 'Fleet Cmdr', domain: 'Fleet', formula: 'Available / Fleet Size', target: '90%', actual: '88%', frequency: 'Weekly', thresholds: '85% / 75%', trend: '→', status: 'ACTIVE' },
  { id: 'KPI-05', name: 'Training Completion', owner: 'Training Dir', domain: 'Training', formula: 'Completed / Enrolled', target: '90%', actual: '87%', frequency: 'Monthly', thresholds: '85% / 75%', trend: '↑', status: 'ACTIVE' },
  { id: 'KPI-06', name: 'Procurement Cycle Time', owner: 'Procurement Dir', domain: 'Procurement', formula: 'Avg days PR→PO', target: '≤14d', actual: '16d', frequency: 'Monthly', thresholds: '14d / 21d', trend: '↓', status: 'ACTIVE' },
  { id: 'KPI-07', name: 'Avg Appraisal Score', owner: 'Perf Mgmt', domain: 'Performance', formula: 'Mean score', target: '≥3.5', actual: '3.8', frequency: 'Annual', thresholds: '3.0 / 2.5', trend: '↑', status: 'ACTIVE' },
];

export const MOCK_REPORTS: ReportDefinition[] = [
  { id: 'RPT-001', name: 'Employee List', category: 'Personnel', description: 'Active and inactive personnel roster', owner: 'HR Ops', format: 'Excel', lastRun: '2026-07-08 06:00', status: 'ACTIVE' },
  { id: 'RPT-002', name: 'Leave Summary', category: 'Personnel', description: 'Leave balances and utilization', owner: 'HR Ops', format: 'PDF', lastRun: '2026-07-07 18:00', status: 'ACTIVE' },
  { id: 'RPT-003', name: 'Budget Report', category: 'Finance', description: 'Budget vs actual by department', owner: 'Finance', format: 'Excel', lastRun: '2026-07-01 08:00', status: 'ACTIVE' },
  { id: 'RPT-004', name: 'Procurement Summary', category: 'Procurement', description: 'POs, suppliers, cycle times', owner: 'Procurement', format: 'PDF', lastRun: '2026-07-06 09:00', status: 'ACTIVE' },
  { id: 'RPT-005', name: 'Vehicle Utilization', category: 'Fleet', description: 'Fleet usage and availability', owner: 'Fleet', format: 'Excel', lastRun: '2026-07-08 05:00', status: 'ACTIVE' },
  { id: 'RPT-006', name: 'Asset Register', category: 'Inventory', description: 'Full asset inventory snapshot', owner: 'Assets', format: 'Excel', lastRun: '2026-07-05 12:00', status: 'ACTIVE' },
  { id: 'RPT-007', name: 'Medical Clearance Report', category: 'Medical', description: 'Clearance status by unit', owner: 'Medical', format: 'PDF', lastRun: '2026-07-04 10:00', status: 'ACTIVE' },
  { id: 'RPT-008', name: 'Performance Summary', category: 'Performance', description: 'Appraisal distribution', owner: 'Perf Mgmt', format: 'PDF', lastRun: '2026-06-30 16:00', status: 'ACTIVE' },
  { id: 'RPT-009', name: 'Audit Activity Report', category: 'Audit', description: 'System-wide audit events', owner: 'Audit', format: 'CSV', lastRun: '2026-07-08 00:30', status: 'ACTIVE' },
];

export const MOCK_SCHEDULED: ScheduledReport[] = [
  { id: 'SCH-01', report: 'Daily Operations Summary', frequency: 'Daily', nextRun: '2026-07-09 06:00', channels: 'Email, In-App', recipients: 42, status: 'SCHEDULED' },
  { id: 'SCH-02', report: 'Weekly Fleet Utilization', frequency: 'Weekly', nextRun: '2026-07-13 07:00', channels: 'Email, DMS', recipients: 18, status: 'SCHEDULED' },
  { id: 'SCH-03', report: 'Monthly Budget Report', frequency: 'Monthly', nextRun: '2026-08-01 08:00', channels: 'Email, DMS', recipients: 56, status: 'SCHEDULED' },
  { id: 'SCH-04', report: 'Quarterly Performance Pack', frequency: 'Quarterly', nextRun: '2026-10-01 09:00', channels: 'Secure Download', recipients: 24, status: 'SCHEDULED' },
];

export const MOCK_SUBSCRIPTIONS: ReportSubscription[] = [
  { id: 'SUB-01', report: 'Monthly Budget Report', subscriber: 'finance.director@mod.gov.rw', frequency: 'Monthly (1st)', channel: 'Email + DMS', nextDelivery: '2026-08-01', status: 'SUBSCRIBED' },
  { id: 'SUB-02', report: 'Weekly Leave Summary', subscriber: 'hr.ops@mod.gov.rw', frequency: 'Weekly (Mon)', channel: 'Email', nextDelivery: '2026-07-13', status: 'SUBSCRIBED' },
  { id: 'SUB-03', report: 'Daily Operations Summary', subscriber: 'coo@mod.gov.rw', frequency: 'Daily', channel: 'In-App', nextDelivery: '2026-07-09', status: 'SUBSCRIBED' },
];

export const MOCK_FORECASTS: ForecastItem[] = [
  { id: 'FC-01', name: 'Budget Forecasting', domain: 'Finance', horizon: '12 months', method: 'Moving Average', confidence: '82%', status: 'ACTIVE' },
  { id: 'FC-02', name: 'Training Demand', domain: 'Training', horizon: '6 months', method: 'Seasonal', confidence: '78%', status: 'ACTIVE' },
  { id: 'FC-03', name: 'Recruitment Demand', domain: 'Personnel', horizon: '6 months', method: 'Trend + Attrition', confidence: '74%', status: 'ACTIVE' },
  { id: 'FC-04', name: 'Vehicle Replacement', domain: 'Fleet', horizon: '24 months', method: 'Lifecycle Model', confidence: '80%', status: 'ACTIVE' },
  { id: 'FC-05', name: 'Inventory Consumption', domain: 'Inventory', horizon: '3 months', method: 'Exponential Smoothing', confidence: '85%', status: 'ACTIVE' },
];

export const MOCK_EXPORTS: ExportJob[] = [
  { id: 'EXP-8841', name: 'Employee List Q2', format: 'Excel', requestedBy: 'hr.ops', requestedAt: '2026-07-08 09:12', size: '4.2 MB', status: 'COMPLETED' },
  { id: 'EXP-8840', name: 'Budget vs Actual', format: 'PDF', requestedBy: 'finance', requestedAt: '2026-07-08 08:45', size: '1.1 MB', status: 'COMPLETED' },
  { id: 'EXP-8839', name: 'Asset Register Full', format: 'CSV', requestedBy: 'assets', requestedAt: '2026-07-08 08:20', size: '12.8 MB', status: 'RUNNING' },
  { id: 'EXP-8838', name: 'Audit Events JSON', format: 'JSON', requestedBy: 'audit', requestedAt: '2026-07-08 07:55', status: 'QUEUED' },
];

export const MOCK_AUDIT_REPORTS: AuditReportRow[] = [
  { id: 'AUD-01', type: 'Login', actor: 'admin@mod.gov.rw', summary: 'Successful login from HQ network', timestamp: '2026-07-08 09:01', severity: 'Info' },
  { id: 'AUD-02', type: 'Approval', actor: 'mgr.ops@mod.gov.rw', summary: 'Leave request LV-1024 approved', timestamp: '2026-07-08 08:40', severity: 'Info' },
  { id: 'AUD-03', type: 'Access Attempt', actor: 'unknown', summary: 'Denied access to sensitive report', timestamp: '2026-07-08 07:22', severity: 'Warning' },
  { id: 'AUD-04', type: 'Config Change', actor: 'sysadmin', summary: 'KPI threshold updated — Budget Utilization', timestamp: '2026-07-07 16:10', severity: 'Info' },
];

export const MOCK_HISTORY: ReportHistoryRow[] = [
  { id: 'RH-100', report: 'Employee List', generatedBy: 'hr.ops', generatedAt: '2026-07-08 06:00', parameters: 'status=ACTIVE', duration: '4.2s', downloads: 12, status: 'COMPLETED' },
  { id: 'RH-099', report: 'Monthly Budget Report', generatedBy: 'scheduler', generatedAt: '2026-07-01 08:00', parameters: 'month=2026-06', duration: '18.6s', downloads: 56, status: 'COMPLETED' },
  { id: 'RH-098', report: 'Vehicle Utilization', generatedBy: 'fleet.ops', generatedAt: '2026-07-07 14:20', parameters: 'unit=All', duration: '9.1s', downloads: 8, status: 'COMPLETED' },
  { id: 'RH-097', report: 'Audit Activity Report', generatedBy: 'scheduler', generatedAt: '2026-07-08 00:30', parameters: 'days=1', duration: '22.4s', downloads: 3, status: 'COMPLETED' },
];

export const MOCK_DESIGNER_WIDGETS: DashboardWidget[] = [
  { id: 'W-01', name: 'Personnel KPI Strip', type: 'KPI Cards', domain: 'Executive', status: 'ACTIVE' },
  { id: 'W-02', name: 'Budget Gauge', type: 'Gauge', domain: 'Finance', status: 'ACTIVE' },
  { id: 'W-03', name: 'Training Heatmap', type: 'Heatmap', domain: 'Training', status: 'DRAFT' },
  { id: 'W-04', name: 'Facility Map', type: 'Map', domain: 'Facilities', status: 'ACTIVE' },
  { id: 'W-05', name: 'Performance Table', type: 'Table', domain: 'Performance', status: 'ACTIVE' },
];

export const COMPARATIVE_SERIES = [
  { name: 'Ops', thisYear: 88, lastYear: 82 },
  { name: 'Trg', thisYear: 91, lastYear: 85 },
  { name: 'Log', thisYear: 76, lastYear: 79 },
  { name: 'Med', thisYear: 84, lastYear: 80 },
  { name: 'Fin', thisYear: 79, lastYear: 74 },
];

export const GEO_REGIONS = [
  { region: 'Kigali', personnel: 1840, facilities: 12, incidents: 2 },
  { region: 'Northern', personnel: 920, facilities: 8, incidents: 1 },
  { region: 'Southern', personnel: 680, facilities: 6, incidents: 0 },
  { region: 'Eastern', personnel: 540, facilities: 5, incidents: 1 },
  { region: 'Western', personnel: 300, facilities: 4, incidents: 0 },
];

export const ANALYTICS_INSIGHTS = [
  { id: 'A-01', title: 'Department Comparison', description: 'Cross-department KPI benchmarking', trend: '+4.2%' },
  { id: 'A-02', title: 'Trend Analysis', description: '6-month operational trends', trend: '+2.8%' },
  { id: 'A-03', title: 'Variance Analysis', description: 'Budget vs actual variance', trend: '-3.1%' },
  { id: 'A-04', title: 'Productivity Analysis', description: 'Output per unit indicators', trend: '+1.5%' },
  { id: 'A-05', title: 'Workload Analysis', description: 'Task and approval load', trend: '+6.0%' },
  { id: 'A-06', title: 'Compliance Analysis', description: 'Policy and SLA compliance', trend: '+0.9%' },
];
