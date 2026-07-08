import type { NavItem } from '@/types';

export const auditNav: NavItem = {
    id: 'audit',
    label: 'Audit & Compliance',
    path: '/audit/dashboard',
    icon: 'FiClipboard',
    module: 'audit',
    permissions: ['audit:read:logs'],
    children: [
      { id: 'audit-dashboard', label: 'Dashboard', path: '/audit/dashboard', icon: 'FiGrid', module: 'audit' },
      { id: 'audit-logs', label: 'Audit Logs', path: '/audit/logs', icon: 'FiFileText', module: 'audit' },
      { id: 'audit-security', label: 'Security Events', path: '/audit/security-events', icon: 'FiShield', module: 'audit' },
      { id: 'audit-compliance', label: 'Compliance', path: '/audit/compliance', icon: 'FiCheckCircle', module: 'audit' },
      { id: 'audit-alerts', label: 'Alert Center', path: '/audit/alerts', icon: 'FiAlertTriangle', module: 'audit' },
      { id: 'audit-tracing', label: 'Tracing', path: '/audit/tracing', icon: 'FiGitBranch', module: 'audit' },
      { id: 'audit-monitoring', label: 'System Health', path: '/audit/system-monitoring', icon: 'FiActivity', module: 'audit' },
      { id: 'audit-explorer', label: 'Log Explorer', path: '/audit/log-explorer', icon: 'FiSearch', module: 'audit' },
      { id: 'audit-reports', label: 'Reports', path: '/audit/reports', icon: 'FiBarChart2', module: 'audit' },
      { id: 'audit-settings', label: 'Settings', path: '/audit/settings', icon: 'FiSliders', module: 'audit' },
    ],
  };
