/**
 * Module metadata used for titles, permissions, and service mapping.
 * Routes and navigation live in modular registrations — this is not a page factory.
 */
import type { ServiceKey } from '@/constants/services';

export interface ModuleConfig {
  serviceKey: ServiceKey;
  listPath: string;
  title: string;
  description: string;
  permission?: string;
  displayFields?: string[];
  singleResource?: boolean;
}

export const MODULE_CONFIGS: Record<string, ModuleConfig> = {
  user: {
    serviceKey: 'user',
    listPath: '/profile',
    title: 'My Profile',
    description: 'Manage your personal information, addresses, and emergency contacts.',
    singleResource: true,
    displayFields: ['employeeNumber', 'firstName', 'lastName', 'email', 'status', 'rank', 'jobTitle', 'phone'],
  },
  users: {
    serviceKey: 'user',
    listPath: '/users',
    title: 'User Management',
    description: 'Manage platform users, departments, and access.',
    permission: 'personnel:read:profile',
    displayFields: ['employeeNumber', 'firstName', 'lastName', 'email', 'status', 'rank', 'jobTitle'],
  },
  personnel: {
    serviceKey: 'personnel',
    listPath: '/personnel/directory',
    title: 'Personnel',
    description: 'Employee records, org structure, and career history.',
    permission: 'personnel:read:profile',
    displayFields: ['employeeNumber', 'firstName', 'lastName', 'rank', 'unit', 'status'],
  },
  recruitment: {
    serviceKey: 'recruitment',
    listPath: '/recruitment/vacancies',
    title: 'Recruitment',
    description: 'Vacancies, applications, interviews, and offers.',
    permission: 'recruitment:read:vacancies',
    displayFields: ['requisitionNumber', 'title', 'status', 'department'],
  },
  leave: {
    serviceKey: 'leave',
    listPath: '/leave/requests',
    title: 'Leave Management',
    description: 'Leave requests, balances, and approvals.',
    permission: 'leave:read:requests',
    displayFields: ['requestNumber', 'leaveType', 'status', 'startDate', 'endDate'],
  },
  welfare: {
    serviceKey: 'welfare',
    listPath: '/welfare/assistance',
    title: 'Welfare',
    description: 'Assistance, benefits, counseling, and wellness.',
    permission: 'welfare:read:claims',
    displayFields: ['claimNumber', 'type', 'status', 'amount'],
  },
  medical: {
    serviceKey: 'medical',
    listPath: '/medical/appointments',
    title: 'Medical',
    description: 'Appointments, clearances, and medical records.',
    permission: 'medical:read:records',
    displayFields: ['appointmentNumber', 'type', 'status', 'scheduledAt'],
  },
  training: {
    serviceKey: 'training',
    listPath: '/training/catalog',
    title: 'Training',
    description: 'Courses, enrollments, and certifications.',
    permission: 'training:read:courses',
    displayFields: ['courseCode', 'title', 'status', 'startDate'],
  },
  performance: {
    serviceKey: 'performance',
    listPath: '/performance/dashboard',
    title: 'Performance',
    description: 'Goals, reviews, and appraisal cycles.',
    permission: 'performance:read:reviews',
    displayFields: ['cycleName', 'status', 'period'],
  },
  assets: {
    serviceKey: 'asset',
    listPath: '/assets/registry',
    title: 'Assets',
    description: 'Asset registry, assignment, and lifecycle.',
    permission: 'assets:read:assets',
    displayFields: ['assetTag', 'name', 'status', 'category'],
  },
  inventory: {
    serviceKey: 'inventory',
    listPath: '/inventory/items',
    title: 'Inventory',
    description: 'Stock items, warehouses, and movements.',
    permission: 'inventory:read:items',
    displayFields: ['itemCode', 'name', 'category', 'currentStock', 'status'],
  },
  logistics: {
    serviceKey: 'logistics',
    listPath: '/logistics/dashboard',
    title: 'Logistics',
    description: 'Locations, routes, shipments, and tracking.',
    permission: 'logistics:read:shipments',
    displayFields: ['trackingNumber', 'origin', 'destination', 'status', 'estimatedDelivery'],
  },
  procurement: {
    serviceKey: 'procurement',
    listPath: '/procurement/requisitions',
    title: 'Procurement',
    description: 'Requisitions, suppliers, orders, tenders, and contracts.',
    permission: 'procurement:read:requisitions',
    displayFields: ['requisitionNumber', 'department', 'category', 'status', 'estimatedCost'],
  },
  fleet: {
    serviceKey: 'fleet',
    listPath: '/fleet/dashboard',
    title: 'Logistics & Fleet',
    description: 'Vehicles, drivers, trips, fuel, maintenance, and dispatch.',
    permission: 'fleet:read:vehicles',
    displayFields: ['fleetNumber', 'registrationNumber', 'make', 'model', 'status'],
  },
  /** Document UI is mock-first; indexes/search underpin enterprise document discovery for now. */
  dms: {
    serviceKey: 'search',
    listPath: '/dms/dashboard',
    title: 'Documents & Records',
    description: 'Document store UI (mock) with search-backed discovery until a dedicated document-service ships.',
    displayFields: ['documentNumber', 'title', 'category', 'status', 'version'],
  },
  maintenance: {
    serviceKey: 'maintenance',
    listPath: '/maintenance/dashboard',
    title: 'Maintenance',
    description: 'Work orders, requests, preventive schedules, parts, SLA, and technicians.',
    permission: 'maintenance:read:work-orders',
    displayFields: ['referenceNumber', 'title', 'priority', 'status', 'scheduledAt'],
  },
  facilities: {
    serviceKey: 'facilities',
    listPath: '/facilities/dashboard',
    title: 'Facilities',
    description: 'Buildings, spaces, bookings, occupancy, utilities, and access control.',
    permission: 'facilities:read:facilities',
    displayFields: ['code', 'name', 'type', 'status', 'capacity'],
  },
  finance: {
    serviceKey: 'finance',
    listPath: '/finance/budget-allocation',
    title: 'Finance & Budget',
    description: 'Budget planning, expenditures, invoices, and payments.',
    permission: 'finance:read:budgets',
    displayFields: ['budgetCode', 'department', 'allocatedAmount', 'spentAmount', 'status'],
  },
  visitor: {
    serviceKey: 'visitor',
    listPath: '/visitors/dashboard',
    title: 'Visitors',
    description: 'Visit requests, check-in, badges, and host notifications.',
    permission: 'visitor:read:visits',
    displayFields: ['visitorName', 'host', 'purpose', 'status', 'scheduledAt'],
  },
  workflow: {
    serviceKey: 'workflow',
    listPath: '/workflow/dashboard',
    title: 'Workflow & BPM',
    description: 'Process definitions, instances, tasks, and approvals.',
    permission: 'workflow:read:definitions',
    displayFields: ['processKey', 'name', 'version', 'status'],
  },
  calendar: {
    serviceKey: 'calendar',
    listPath: '/calendar/dashboard',
    title: 'Calendar',
    description: 'Events, rooms, attendees, and reminders.',
    permission: 'calendar:read:events',
    displayFields: ['title', 'startAt', 'endAt', 'status'],
  },
  reporting: {
    serviceKey: 'reporting',
    listPath: '/reports/dashboard',
    title: 'Reporting & Analytics',
    description: 'Reports, KPIs, analytics, and BI dashboards.',
    permission: 'reporting:read:reports',
    displayFields: ['name', 'category', 'status', 'updatedAt'],
  },
  analytics: {
    serviceKey: 'analytics',
    listPath: '/reports/analytics',
    title: 'Analytics',
    description: 'Analytical datasets and insights.',
    permission: 'analytics:read:metrics',
    displayFields: ['name', 'status'],
  },
  'business-intelligence': {
    serviceKey: 'business-intelligence',
    listPath: '/reports/integrations',
    title: 'Business Intelligence',
    description: 'BI integrations and dashboards.',
    permission: 'bi:read:dashboards',
    displayFields: ['name', 'status'],
  },
  notification: {
    serviceKey: 'notification',
    listPath: '/notifications/center',
    title: 'Notifications',
    description: 'Inbox, templates, channels, and preferences.',
    permission: 'notification:read:notifications',
    displayFields: ['title', 'channel', 'status', 'createdAt'],
  },
  messaging: {
    serviceKey: 'messaging',
    listPath: '/messaging/inbox',
    title: 'Messaging',
    description: 'Channels, direct messages, and receipts.',
    permission: 'messaging:read:channels',
    displayFields: ['name', 'type', 'memberCount', 'lastMessageAt'],
  },
  search: {
    serviceKey: 'search',
    listPath: '/search/dashboard',
    title: 'Search',
    description: 'Indexes, documents, and enterprise queries.',
    permission: 'search:read:indexes',
    displayFields: ['name', 'documentCount', 'status', 'lastIndexedAt'],
  },
  'ai-assistant': {
    serviceKey: 'ai-assistant',
    listPath: '/ai-assistant/dashboard',
    title: 'AI Assistant',
    description: 'Agents, conversations, and messages.',
    permission: 'aiassistant:read:conversations',
    displayFields: ['title', 'agentName', 'status', 'messageCount', 'updatedAt'],
  },
  configuration: {
    serviceKey: 'configuration',
    listPath: '/administration/dashboard',
    title: 'System Administration',
    description: 'Configuration namespaces, entries, revisions, and platform health.',
    permission: 'configuration:read:namespaces',
    displayFields: ['code', 'name', 'description', 'entryCount'],
  },
  audit: {
    serviceKey: 'audit',
    listPath: '/audit/dashboard',
    title: 'Audit & Compliance',
    description: 'Audit logs, compliance, security events, monitoring, tracing, and alerts.',
    permission: 'audit:read:logs',
    displayFields: ['action', 'resourceType', 'userId', 'ipAddress', 'createdAt'],
  },
  settings: {
    serviceKey: 'user',
    listPath: '/settings/overview',
    title: 'Settings',
    description: 'Appearance, language, notifications, and security preferences.',
    displayFields: ['fullName', 'email', 'language', 'timezone'],
  },
};

export function getModuleConfig(moduleKey: string): ModuleConfig | undefined {
  return MODULE_CONFIGS[moduleKey];
}
