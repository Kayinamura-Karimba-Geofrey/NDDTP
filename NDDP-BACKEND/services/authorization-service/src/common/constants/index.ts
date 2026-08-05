export const CACHE_KEYS = {
  USER_PERMISSIONS: (userId: string) => `authz:user:${userId}:permissions`,
  USER_ROLES: (userId: string) => `authz:user:${userId}:roles`,
  ROLE: (roleId: string) => `authz:role:${roleId}`,
  ROLE_PERMISSIONS: (roleId: string) => `authz:role:${roleId}:permissions`,
  PERMISSION: (code: string) => `authz:permission:${code}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  ROLE_CREATED: 'authorization.role.created',
  ROLE_UPDATED: 'authorization.role.updated',
  ROLE_DELETED: 'authorization.role.deleted',
  PERMISSION_CREATED: 'authorization.permission.created',
  PERMISSION_UPDATED: 'authorization.permission.updated',
  PERMISSION_DELETED: 'authorization.permission.deleted',
  ROLE_ASSIGNED: 'authorization.role.assigned',
  ROLE_REVOKED: 'authorization.role.revoked',
  PERMISSION_GRANTED: 'authorization.permission.granted',
  PERMISSION_REVOKED: 'authorization.permission.revoked',
  ACCESS_DENIED: 'authorization.access.denied',
  ACCESS_GRANTED: 'authorization.access.granted',
} as const;

export const RABBITMQ_QUEUES = {
  AUTH_EVENTS: 'authorization-service.auth.events',
  AUTH_EVENTS_DLQ: 'authorization-service.auth.events.dlq',
} as const;

export const SYSTEM_PERMISSIONS = [
  // Authorization / Core Platform
  { code: 'authorization:manage:roles', name: 'Manage Roles', module: 'authorization', action: 'manage', resource: 'roles' },
  { code: 'authorization:manage:permissions', name: 'Manage Permissions', module: 'authorization', action: 'manage', resource: 'permissions' },
  { code: 'authorization:assign:roles', name: 'Assign Roles', module: 'authorization', action: 'assign', resource: 'roles' },
  { code: 'authorization:read:audit', name: 'Read Authorization Audit', module: 'authorization', action: 'read', resource: 'audit' },
  { code: 'system:manage:tenants', name: 'Manage Tenants/Organizations', module: 'system', action: 'manage', resource: 'tenants' },
  { code: 'system:manage:users', name: 'Manage All Users', module: 'system', action: 'manage', resource: 'users' },
  { code: 'system:manage:settings', name: 'Configure System Settings', module: 'system', action: 'manage', resource: 'settings' },
  { code: 'system:read:logs', name: 'View System Logs', module: 'system', action: 'read', resource: 'logs' },

  // Personnel
  { code: 'personnel:read:records', name: 'Read Personnel Records', module: 'personnel', action: 'read', resource: 'records' },
  { code: 'personnel:create:records', name: 'Create Personnel Records', module: 'personnel', action: 'create', resource: 'records' },
  { code: 'personnel:update:records', name: 'Update Personnel Records', module: 'personnel', action: 'update', resource: 'records' },
  { code: 'personnel:delete:records', name: 'Delete Personnel Records', module: 'personnel', action: 'delete', resource: 'records' },
  { code: 'personnel:approve:workflows', name: 'Approve Personnel Workflows', module: 'personnel', action: 'approve', resource: 'workflows' },
  { code: 'personnel:export:reports', name: 'Export Personnel Reports', module: 'personnel', action: 'export', resource: 'reports' },
  { code: 'personnel:read:own', name: 'Read Own Profile', module: 'personnel', action: 'read', resource: 'own_profile' },
  { code: 'personnel:update:own', name: 'Update Own Profile', module: 'personnel', action: 'update', resource: 'own_profile' },

  // Leave & Welfare
  { code: 'leave:read:requests', name: 'Read Leave Requests', module: 'leave', action: 'read', resource: 'requests' },
  { code: 'leave:create:requests', name: 'Submit Leave Requests', module: 'leave', action: 'create', resource: 'requests' },
  { code: 'leave:approve:requests', name: 'Approve Leave Requests', module: 'leave', action: 'approve', resource: 'requests' },
  { code: 'welfare:read:requests', name: 'Read Welfare Requests', module: 'welfare', action: 'read', resource: 'requests' },
  { code: 'welfare:manage:benefits', name: 'Manage Benefits', module: 'welfare', action: 'manage', resource: 'benefits' },

  // Recruitment
  { code: 'recruitment:read:applications', name: 'Read Applications', module: 'recruitment', action: 'read', resource: 'applications' },
  { code: 'recruitment:manage:applications', name: 'Manage Applications', module: 'recruitment', action: 'manage', resource: 'applications' },
  { code: 'recruitment:manage:vacancies', name: 'Manage Vacancies', module: 'recruitment', action: 'manage', resource: 'vacancies' },

  // Finance & Procurement
  { code: 'finance:read:reports', name: 'Read Finance Reports', module: 'finance', action: 'read', resource: 'reports' },
  { code: 'finance:manage:budgets', name: 'Manage Budgets', module: 'finance', action: 'manage', resource: 'budgets' },
  { code: 'procurement:create:requisitions', name: 'Create Requisitions', module: 'procurement', action: 'create', resource: 'requisitions' },
  { code: 'procurement:manage:tenders', name: 'Manage Tenders', module: 'procurement', action: 'manage', resource: 'tenders' },
  { code: 'procurement:approve:purchase_orders', name: 'Approve Purchase Orders', module: 'procurement', action: 'approve', resource: 'purchase_orders' },

  // Logistics (Inventory, Fleet, Assets)
  { code: 'inventory:manage:stock', name: 'Manage Stock', module: 'inventory', action: 'manage', resource: 'stock' },
  { code: 'fleet:assign:vehicles', name: 'Assign Vehicles', module: 'fleet', action: 'assign', resource: 'vehicles' },
  { code: 'fleet:manage:maintenance', name: 'Manage Maintenance', module: 'fleet', action: 'manage', resource: 'maintenance' },
  { code: 'assets:register:assets', name: 'Register Assets', module: 'assets', action: 'register', resource: 'assets' },

  // Document Management
  { code: 'documents:upload:files', name: 'Upload Documents', module: 'documents', action: 'upload', resource: 'files' },
  { code: 'documents:sign:files', name: 'Sign Documents', module: 'documents', action: 'sign', resource: 'files' },

  // Security, Audit, Compliance
  { code: 'audit:read:logs', name: 'Read Audit Logs', module: 'audit', action: 'read', resource: 'logs' },
  { code: 'security:manage:policies', name: 'Manage Security Policies', module: 'security', action: 'manage', resource: 'policies' },
  { code: 'compliance:read:reports', name: 'Read Compliance Reports', module: 'compliance', action: 'read', resource: 'reports' },
  { code: 'risk:manage:register', name: 'Manage Risk Register', module: 'risk', action: 'manage', resource: 'register' },

  // Reporting & Notifications
  { code: 'reports:create:dashboards', name: 'Create Dashboards', module: 'reports', action: 'create', resource: 'dashboards' },
  { code: 'reports:export:data', name: 'Export Data', module: 'reports', action: 'export', resource: 'data' },
  { code: 'reports:read:dashboards', name: 'View Dashboards', module: 'reports', action: 'read', resource: 'dashboards' },
  { code: 'notifications:manage:templates', name: 'Manage Templates', module: 'notifications', action: 'manage', resource: 'templates' },
] as const;

export const SYSTEM_ROLES = [
  { code: 'SUPER_ADMIN', name: 'System Super Administrator', description: 'Full platform access, tenant, and technical control', isSystem: true },
  { code: 'PLATFORM_ADMIN', name: 'Platform Administrator', description: 'Platform administration and user management', isSystem: true },
  { code: 'SECURITY_ADMIN', name: 'Security Administrator', description: 'Cybersecurity and policy administration', isSystem: true },
  { code: 'EXECUTIVE_LEADERSHIP', name: 'Executive Leadership', description: 'Strategic view and high-level approvals', isSystem: true },
  
  { code: 'DEPARTMENT_DIRECTOR', name: 'Department Director', description: 'Full access within own department', isSystem: true },
  { code: 'DEPARTMENT_MANAGER', name: 'Department Manager', description: 'Manage daily operations within department', isSystem: true },
  { code: 'DEPARTMENT_OFFICER', name: 'Department Officer', description: 'Create and update records within department', isSystem: true },
  
  { code: 'EMPLOYEE', name: 'Employee / Staff Member', description: 'Standard self-service employee access', isSystem: true },
  { code: 'APPROVER', name: 'Approver', description: 'Functional role for workflow approvals', isSystem: true },
  { code: 'AUDITOR', name: 'Auditor', description: 'Read-only audit log and reports access', isSystem: true },
  
  { code: 'COMPLIANCE_OFFICER', name: 'Compliance Officer', description: 'Compliance monitoring and risk reporting', isSystem: true },
  { code: 'LEGAL_OFFICER', name: 'Legal Officer', description: 'Legal documents, contracts, investigations', isSystem: true },
  { code: 'FINANCE_OFFICER', name: 'Finance Officer', description: 'Budgets, payments, financial reports', isSystem: true },
  { code: 'PROCUREMENT_OFFICER', name: 'Procurement Officer', description: 'Requisitions, tenders, and purchase orders', isSystem: true },
  { code: 'INVENTORY_OFFICER', name: 'Inventory Officer', description: 'Warehouse and stock management', isSystem: true },
  { code: 'ASSET_OFFICER', name: 'Asset Officer', description: 'Asset registration and transfers', isSystem: true },
  { code: 'FLEET_OFFICER', name: 'Fleet Officer', description: 'Vehicles, drivers, fuel, maintenance', isSystem: true },
  { code: 'MEDICAL_OFFICER', name: 'Medical Officer', description: 'Medical administrative records', isSystem: true },
  { code: 'TRAINING_OFFICER', name: 'Training Officer', description: 'Training schedules and records', isSystem: true },
  { code: 'RECRUITMENT_OFFICER', name: 'Recruitment Officer', description: 'Vacancies and candidate evaluation', isSystem: true },
  { code: 'PERFORMANCE_OFFICER', name: 'Performance Officer', description: 'KPIs and performance reviews', isSystem: true },
  { code: 'WELFARE_OFFICER', name: 'Welfare Officer', description: 'Benefits and welfare requests', isSystem: true },
  
  { code: 'DOCUMENT_CONTROLLER', name: 'Document Controller', description: 'Version control and document archives', isSystem: true },
  { code: 'PROJECT_MANAGER', name: 'Project Manager', description: 'Project milestones and budgets', isSystem: true },
  { code: 'RISK_OFFICER', name: 'Risk Officer', description: 'Risk assessment and mitigation', isSystem: true },
  { code: 'NOTIFICATION_ADMINISTRATOR', name: 'Notification Administrator', description: 'Email/SMS templates and broadcasts', isSystem: true },
  { code: 'REPORTING_ANALYST', name: 'Reporting Analyst', description: 'Analytics and dashboard creation', isSystem: true },
  { code: 'HELP_DESK_OFFICER', name: 'Help Desk / Support Officer', description: 'Incident resolution and support tickets', isSystem: true },
  { code: 'READ_ONLY_USER', name: 'Read-Only User', description: 'View access to authorized records', isSystem: true },
  { code: 'EXTERNAL_USER', name: 'External User', description: 'Restricted access for external parties', isSystem: true },
] as const;
