import type { NavItem } from '@/types';

export const workflowNav: NavItem = {
    id: 'workflow',
    label: 'Workflow & BPM',
    path: '/workflow/dashboard',
    icon: 'FiGitBranch',
    module: 'workflow',
    permissions: ['workflow:read:instances'],
    children: [
      { id: 'workflow-dashboard', label: 'Dashboard', path: '/workflow/dashboard', icon: 'FiGrid', module: 'workflow' },
      { id: 'workflow-templates', label: 'Templates', path: '/workflow/templates', icon: 'FiLayers', module: 'workflow' },
      { id: 'workflow-designer', label: 'Designer', path: '/workflow/designer', icon: 'FiEdit3', module: 'workflow' },
      { id: 'workflow-tasks', label: 'Pending Tasks', path: '/workflow/tasks', icon: 'FiInbox', module: 'workflow' },
      { id: 'workflow-approvals', label: 'My Approvals', path: '/workflow/my-approvals', icon: 'FiCheckCircle', module: 'workflow' },
      { id: 'workflow-running', label: 'Running', path: '/workflow/running', icon: 'FiActivity', module: 'workflow' },
      { id: 'workflow-rules', label: 'Business Rules', path: '/workflow/rules', icon: 'FiCpu', module: 'workflow' },
      { id: 'workflow-sla', label: 'SLA', path: '/workflow/sla', icon: 'FiClock', module: 'workflow' },
      { id: 'workflow-analytics', label: 'Analytics', path: '/workflow/analytics', icon: 'FiBarChart2', module: 'workflow' },
      { id: 'workflow-reports', label: 'Reports', path: '/workflow/reports', icon: 'FiFileText', module: 'workflow' },
      { id: 'workflow-settings', label: 'Settings', path: '/workflow/settings', icon: 'FiSliders', module: 'workflow' },
    ],
  };
