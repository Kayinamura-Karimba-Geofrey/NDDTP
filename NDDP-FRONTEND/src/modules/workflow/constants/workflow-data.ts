export type WorkflowStatus =
  | 'DRAFT' | 'RUNNING' | 'WAITING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED'
  | 'PAUSED' | 'ESCALATED' | 'OVERDUE' | 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'FAILED';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: WorkflowStatus;
  createdBy: string;
  lastModified: string;
  service?: string;
}

export interface RunningWorkflow {
  id: string;
  workflowId: string;
  template: string;
  currentStage: string;
  owner: string;
  started: string;
  dueDate?: string;
  status: WorkflowStatus;
  service: string;
}

export interface WorkflowTask {
  id: string;
  taskName: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
  slaStatus: string;
  workflow: string;
  workflowId: string;
  status: WorkflowStatus;
}

export interface ApprovalChain {
  id: string;
  name: string;
  service: string;
  type: string;
  levels: string[];
  status: WorkflowStatus;
}

export interface BusinessRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  category: string;
  status: WorkflowStatus;
}

export interface Delegation {
  id: string;
  delegate: string;
  actingFor: string;
  startDate: string;
  endDate: string;
  reason: string;
  scope: string;
  status: WorkflowStatus;
}

export interface EscalationRule {
  id: string;
  name: string;
  triggerHours: number;
  action: string;
  target: string;
  status: WorkflowStatus;
}

export interface SlaRule {
  id: string;
  workflowType: string;
  targetHours: number;
  compliance: number;
  status: WorkflowStatus;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: WorkflowStatus;
}

export interface WorkflowHistoryEvent {
  id: string;
  event: string;
  workflow: string;
  actor: string;
  decision?: string;
  comments?: string;
  date: string;
}

export const WORKFLOW_DASHBOARD_KPIS = {
  activeWorkflows: 1842,
  pendingApprovals: 284,
  completedToday: 419,
  overdueTasks: 37,
  escalatedTasks: 12,
  slaCompliance: '94.2%',
  avgApprovalTime: '18.4h',
  automatedProcesses: 156,
  failedProcesses: 3,
  totalTemplates: 48,
};

export const WORKFLOW_STATUS_BREAKDOWN = [
  { name: 'Running', value: 842 },
  { name: 'Waiting', value: 284 },
  { name: 'Approved', value: 419 },
  { name: 'Completed', value: 1250 },
  { name: 'Rejected', value: 28 },
  { name: 'Cancelled', value: 19 },
];

export const WORKFLOWS_BY_SERVICE = [
  { name: 'Personnel', value: 320 },
  { name: 'Procurement', value: 280 },
  { name: 'Finance', value: 245 },
  { name: 'Fleet', value: 120 },
  { name: 'Medical', value: 95 },
  { name: 'Training', value: 88 },
  { name: 'Assets', value: 76 },
  { name: 'DMS', value: 64 },
];

export const MONTHLY_WORKFLOW_VOLUME = [
  { month: 'Jan', count: 4200 }, { month: 'Feb', count: 4800 },
  { month: 'Mar', count: 5100 }, { month: 'Apr', count: 5400 },
  { month: 'May', count: 5800 }, { month: 'Jun', count: 6200 },
  { month: 'Jul', count: 4900 },
];

export const APPROVAL_BY_DEPT = [
  { name: 'HQ', hours: 14 },
  { name: 'Finance', hours: 22 },
  { name: 'Procurement', hours: 18 },
  { name: 'Medical', hours: 8 },
  { name: 'HR', hours: 16 },
  { name: 'Logistics', hours: 20 },
];

export const SLA_COMPLIANCE_TREND = [
  { month: 'Jan', value: 91 }, { month: 'Feb', value: 92 },
  { month: 'Mar', value: 93 }, { month: 'Apr', value: 94 },
  { month: 'May', value: 93 }, { month: 'Jun', value: 95 },
  { month: 'Jul', value: 94 },
];

export const MOCK_TEMPLATES: WorkflowTemplate[] = [
  { id: 't1', name: 'Leave Approval', description: 'Employee leave request — supervisor → HR', category: 'HR', version: 'v2.1', status: 'ACTIVE', createdBy: 'System Admin', lastModified: '2026-06-15', service: 'Personnel' },
  { id: 't2', name: 'Procurement Approval', description: 'Requisition and PO approval chain', category: 'Procurement', version: 'v3.0', status: 'ACTIVE', createdBy: 'Procurement Lead', lastModified: '2026-07-01', service: 'Procurement' },
  { id: 't3', name: 'Budget Approval', description: 'Budget revision and allocation', category: 'Finance', version: 'v1.5', status: 'ACTIVE', createdBy: 'Finance Director', lastModified: '2026-05-20', service: 'Finance' },
  { id: 't4', name: 'Vehicle Request', description: 'Fleet trip and assignment approval', category: 'Operations', version: 'v1.2', status: 'ACTIVE', createdBy: 'Fleet Officer', lastModified: '2026-06-28', service: 'Fleet' },
  { id: 't5', name: 'Medical Clearance', description: 'Fitness and clearance certification', category: 'Medical', version: 'v1.0', status: 'ACTIVE', createdBy: 'Medical Officer', lastModified: '2026-04-10', service: 'Medical' },
  { id: 't6', name: 'Document Approval', description: 'DMS document publication workflow', category: 'Records', version: 'v1.1', status: 'ACTIVE', createdBy: 'Records Officer', lastModified: '2026-07-05', service: 'DMS' },
  { id: 't7', name: 'Asset Disposal', description: 'Asset retirement and disposal', category: 'Assets', version: 'v1.0', status: 'DRAFT', createdBy: 'Asset Manager', lastModified: '2026-07-07', service: 'Assets' },
];

export const MOCK_RUNNING: RunningWorkflow[] = [
  { id: 'w1', workflowId: 'WF-2026-08942', template: 'Leave Approval', currentStage: 'Manager Approval', owner: 'Alice Uwase', started: '2026-07-08T08:00:00', dueDate: '2026-07-10', status: 'RUNNING', service: 'Personnel' },
  { id: 'w2', workflowId: 'WF-2026-08941', template: 'Procurement Approval', currentStage: 'Finance Review', owner: 'Eric Niyonsenga', started: '2026-07-07T14:30:00', dueDate: '2026-07-12', status: 'WAITING', service: 'Procurement' },
  { id: 'w3', workflowId: 'WF-2026-08940', template: 'Budget Approval', currentStage: 'Director Approval', owner: 'Marie Uwase', started: '2026-07-07T09:00:00', dueDate: '2026-07-09', status: 'RUNNING', service: 'Finance' },
  { id: 'w4', workflowId: 'WF-2026-08938', template: 'Vehicle Request', currentStage: 'Fleet Review', owner: 'Patrick Habimana', started: '2026-07-08T07:15:00', dueDate: '2026-07-08', status: 'ESCALATED', service: 'Fleet' },
  { id: 'w5', workflowId: 'WF-2026-08935', template: 'Document Approval', currentStage: 'Completed', owner: 'Alice N.', started: '2026-07-06T11:00:00', status: 'COMPLETED', service: 'DMS' },
];

export const MOCK_TASKS: WorkflowTask[] = [
  { id: 'tk1', taskName: 'Approve Leave — Alice Uwase', assignedTo: 'Jean Mukamana', priority: 'Normal', dueDate: '2026-07-10', slaStatus: 'On Track', workflow: 'Leave Approval', workflowId: 'WF-2026-08942', status: 'PENDING' },
  { id: 'tk2', taskName: 'Finance Review — PO-2026-0881', assignedTo: 'Marie Uwase', priority: 'High', dueDate: '2026-07-09', slaStatus: 'At Risk', workflow: 'Procurement Approval', workflowId: 'WF-2026-08941', status: 'PENDING' },
  { id: 'tk3', taskName: 'Director Sign-off — Budget Q3', assignedTo: 'Chief Administrator', priority: 'Urgent', dueDate: '2026-07-09', slaStatus: 'Due Today', workflow: 'Budget Approval', workflowId: 'WF-2026-08940', status: 'PENDING' },
  { id: 'tk4', taskName: 'Fleet Assignment — TRP-2026-0144', assignedTo: 'Fleet Officer', priority: 'Normal', dueDate: '2026-07-08', slaStatus: 'Overdue', workflow: 'Vehicle Request', workflowId: 'WF-2026-08938', status: 'ESCALATED' },
];

export const MOCK_CHAINS: ApprovalChain[] = [
  { id: 'c1', name: 'Standard Leave Chain', service: 'Personnel', type: 'Sequential', levels: ['Employee', 'Supervisor', 'HR Officer', 'Completed'], status: 'ACTIVE' },
  { id: 'c2', name: 'Procurement PO Chain', service: 'Procurement', type: 'Conditional', levels: ['Requester', 'Dept Head', 'Finance', 'Director'], status: 'ACTIVE' },
  { id: 'c3', name: 'Medical Clearance', service: 'Medical', type: 'Parallel', levels: ['Medical Officer', 'Fitness Board'], status: 'ACTIVE' },
];

export const MOCK_RULES: BusinessRule[] = [
  { id: 'r1', name: 'High Value PO', condition: 'IF Amount > 10,000,000 RWF', action: 'Require Director Approval', category: 'Procurement', status: 'ACTIVE' },
  { id: 'r2', name: 'Extended Leave', condition: 'IF Leave Days > 30', action: 'Require HR Director Approval', category: 'Personnel', status: 'ACTIVE' },
  { id: 'r3', name: 'Ambulance Request', condition: 'IF Vehicle Type = Ambulance', action: 'Require Fleet Commander Approval', category: 'Fleet', status: 'ACTIVE' },
  { id: 'r4', name: 'Confidential Document', condition: 'IF Classification = Confidential', action: 'Require Security Review', category: 'DMS', status: 'ACTIVE' },
];

export const MOCK_DELEGATIONS: Delegation[] = [
  { id: 'd1', delegate: 'Patrick Habimana', actingFor: 'Jean Mukamana', startDate: '2026-07-01', endDate: '2026-07-15', reason: 'Annual leave', scope: 'Leave approvals', status: 'ACTIVE' },
  { id: 'd2', delegate: 'Alice Uwase', actingFor: 'Marie Uwase', startDate: '2026-07-08', endDate: '2026-07-12', reason: 'Conference travel', scope: 'Finance approvals', status: 'ACTIVE' },
];

export const MOCK_ESCALATIONS: EscalationRule[] = [
  { id: 'e1', name: 'Standard Escalation', triggerHours: 48, action: 'Reminder', target: 'Assignee', status: 'ACTIVE' },
  { id: 'e2', name: 'Supervisor Escalation', triggerHours: 72, action: 'Reassignment', target: 'Supervisor', status: 'ACTIVE' },
  { id: 'e3', name: 'Director Escalation', triggerHours: 96, action: 'Priority Increase', target: 'Director', status: 'ACTIVE' },
];

export const MOCK_SLAS: SlaRule[] = [
  { id: 's1', workflowType: 'Leave Approval', targetHours: 48, compliance: 96, status: 'ACTIVE' },
  { id: 's2', workflowType: 'Purchase Order', targetHours: 120, compliance: 91, status: 'ACTIVE' },
  { id: 's3', workflowType: 'Medical Clearance', targetHours: 24, compliance: 98, status: 'ACTIVE' },
  { id: 's4', workflowType: 'Incident Investigation', targetHours: 72, compliance: 88, status: 'ACTIVE' },
];

export const MOCK_AUTOMATION: AutomationRule[] = [
  { id: 'a1', name: 'Auto-approve Training Certificate', trigger: 'Training completion verified', action: 'Automatically approve certificate workflow', status: 'ACTIVE' },
  { id: 'a2', name: 'Notify Supervisor', trigger: 'Task assigned', action: 'Send in-app + email notification', status: 'ACTIVE' },
  { id: 'a3', name: 'Archive Completed Workflow', trigger: 'Workflow completed', action: 'Move to process history', status: 'ACTIVE' },
];

export const MOCK_HISTORY: WorkflowHistoryEvent[] = [
  { id: 'h1', event: 'Request Submitted', workflow: 'WF-2026-08935', actor: 'Alice N.', date: '2026-07-06T11:00:00' },
  { id: 'h2', event: 'Manager Approved', workflow: 'WF-2026-08935', actor: 'Jean Mukamana', decision: 'Approved', comments: 'Terms acceptable', date: '2026-07-06T14:30:00' },
  { id: 'h3', event: 'Finance Approved', workflow: 'WF-2026-08935', actor: 'Marie Uwase', decision: 'Approved', date: '2026-07-07T09:15:00' },
  { id: 'h4', event: 'Director Approved', workflow: 'WF-2026-08935', actor: 'Chief Administrator', decision: 'Approved', date: '2026-07-07T11:00:00' },
  { id: 'h5', event: 'Workflow Completed', workflow: 'WF-2026-08935', actor: 'System', decision: 'Completed', date: '2026-07-07T11:01:00' },
];

export const DESIGNER_STEPS = [
  'Start', 'Employee Request', 'Manager Approval', 'Finance Approval', 'Director Approval', 'Completed',
];
