import type { NavItem } from '@/types';

export const welfareNav: NavItem = {
    id: 'welfare',
    label: 'Welfare',
    path: '/welfare/dashboard',
    icon: 'FiHeart',
    module: 'welfare',
    permissions: ['welfare:read:claims'],
    children: [
      { id: 'welfare-dashboard', label: 'Dashboard', path: '/welfare/dashboard', icon: 'FiGrid', module: 'welfare' },
      { id: 'welfare-my', label: 'My Welfare', path: '/welfare/my-welfare', icon: 'FiUser', module: 'welfare' },
      { id: 'welfare-programs', label: 'Programs', path: '/welfare/programs', icon: 'FiLayers', module: 'welfare' },
      { id: 'welfare-benefits', label: 'Benefits', path: '/welfare/benefits', icon: 'FiGift', module: 'welfare' },
      { id: 'welfare-assistance', label: 'Assistance', path: '/welfare/assistance', icon: 'FiFileText', module: 'welfare' },
      { id: 'welfare-emergency', label: 'Emergency', path: '/welfare/emergency', icon: 'FiAlertCircle', module: 'welfare' },
      { id: 'welfare-wellness', label: 'Wellness', path: '/welfare/wellness', icon: 'FiActivity', module: 'welfare' },
      { id: 'welfare-events', label: 'Events', path: '/welfare/events', icon: 'FiCalendar', module: 'welfare' },
      { id: 'welfare-applications', label: 'Applications', path: '/welfare/applications', icon: 'FiInbox', module: 'welfare' },
      { id: 'welfare-approvals', label: 'Approvals', path: '/welfare/approvals', icon: 'FiCheckCircle', module: 'welfare', permissions: ['welfare:approve:claims'] },
      { id: 'welfare-documents', label: 'Documents', path: '/welfare/documents', icon: 'FiFile', module: 'welfare' },
      { id: 'welfare-history', label: 'History', path: '/welfare/history', icon: 'FiClock', module: 'welfare' },
      { id: 'welfare-reports', label: 'Reports', path: '/welfare/reports', icon: 'FiBarChart2', module: 'welfare' },
      { id: 'welfare-settings', label: 'Settings', path: '/welfare/settings', icon: 'FiSliders', module: 'welfare' },
    ],
  };
