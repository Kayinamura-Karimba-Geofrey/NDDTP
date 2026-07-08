import type { NavItem } from '@/types';

export const performanceNav: NavItem = {
    id: 'performance',
    label: 'Performance Management',
    path: '/performance/dashboard',
    icon: 'FiTrendingUp',
    module: 'performance',
    permissions: ['performance:read:cycles'],
    children: [
      { id: 'performance-dashboard', label: 'Dashboard', path: '/performance/dashboard', icon: 'FiGrid', module: 'performance' },
      { id: 'performance-my', label: 'My Performance', path: '/performance/my-performance', icon: 'FiUser', module: 'performance' },
      { id: 'performance-objectives', label: 'Objectives', path: '/performance/objectives', icon: 'FiTarget', module: 'performance' },
      { id: 'performance-reviews', label: 'Reviews', path: '/performance/reviews', icon: 'FiFileText', module: 'performance' },
      { id: 'performance-feedback', label: 'Feedback', path: '/performance/feedback', icon: 'FiMessageSquare', module: 'performance' },
      { id: 'performance-recognition', label: 'Recognition', path: '/performance/recognition', icon: 'FiAward', module: 'performance' },
      { id: 'performance-development', label: 'Development Plans', path: '/performance/development-plans', icon: 'FiBookOpen', module: 'performance' },
      { id: 'performance-cycles', label: 'Review Cycles', path: '/performance/review-cycles', icon: 'FiCalendar', module: 'performance' },
      { id: 'performance-approvals', label: 'Approvals', path: '/performance/approvals', icon: 'FiCheckCircle', module: 'performance' },
      { id: 'performance-reports', label: 'Reports', path: '/performance/reports', icon: 'FiBarChart2', module: 'performance' },
      { id: 'performance-settings', label: 'Settings', path: '/performance/settings', icon: 'FiSliders', module: 'performance' },
    ],
  };
