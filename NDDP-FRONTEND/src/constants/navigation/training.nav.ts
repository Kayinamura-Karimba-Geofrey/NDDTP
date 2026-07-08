import type { NavItem } from '@/types';

export const trainingNav: NavItem = {
    id: 'training',
    label: 'Training',
    path: '/training/dashboard',
    icon: 'FiBookOpen',
    module: 'training',
    permissions: ['training:read:courses'],
    children: [
      { id: 'training-dashboard', label: 'Dashboard', path: '/training/dashboard', icon: 'FiGrid', module: 'training' },
      { id: 'training-my-learning', label: 'My Learning', path: '/training/my-learning', icon: 'FiUser', module: 'training' },
      { id: 'training-catalog', label: 'Catalog', path: '/training/catalog', icon: 'FiBook', module: 'training' },
      { id: 'training-programs', label: 'Programs', path: '/training/programs', icon: 'FiLayers', module: 'training' },
      { id: 'training-courses', label: 'Courses', path: '/training/courses', icon: 'FiBookOpen', module: 'training' },
      { id: 'training-paths', label: 'Learning Paths', path: '/training/learning-paths', icon: 'FiMap', module: 'training' },
      { id: 'training-calendar', label: 'Calendar', path: '/training/calendar', icon: 'FiCalendar', module: 'training' },
      { id: 'training-enrollments', label: 'Enrollments', path: '/training/enrollments', icon: 'FiUsers', module: 'training' },
      { id: 'training-certifications', label: 'Certifications', path: '/training/certifications', icon: 'FiAward', module: 'training' },
      { id: 'training-competencies', label: 'Competencies', path: '/training/competencies', icon: 'FiCpu', module: 'training' },
      { id: 'training-approvals', label: 'Approvals', path: '/training/approvals', icon: 'FiCheckCircle', module: 'training', permissions: ['training:manage:enrollments'] },
      { id: 'training-history', label: 'History', path: '/training/history', icon: 'FiClock', module: 'training' },
      { id: 'training-reports', label: 'Reports', path: '/training/reports', icon: 'FiBarChart2', module: 'training' },
      { id: 'training-settings', label: 'Settings', path: '/training/settings', icon: 'FiSliders', module: 'training' },
    ],
  };
