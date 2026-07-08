import type { NavItem } from '@/types';

export const medicalNav: NavItem = {
    id: 'medical',
    label: 'Medical',
    path: '/medical/dashboard',
    icon: 'FiActivity',
    module: 'medical',
    permissions: ['medical:read:appointments'],
    children: [
      { id: 'medical-dashboard', label: 'Dashboard', path: '/medical/dashboard', icon: 'FiGrid', module: 'medical' },
      { id: 'medical-my', label: 'My Medical', path: '/medical/my-medical', icon: 'FiUser', module: 'medical' },
      { id: 'medical-profiles', label: 'Profiles', path: '/medical/profiles', icon: 'FiUsers', module: 'medical', permissions: ['medical:manage:records'] },
      { id: 'medical-appointments', label: 'Appointments', path: '/medical/appointments', icon: 'FiCalendar', module: 'medical' },
      { id: 'medical-assessments', label: 'Assessments', path: '/medical/assessments', icon: 'FiClipboard', module: 'medical' },
      { id: 'medical-clearances', label: 'Clearances', path: '/medical/clearances', icon: 'FiCheckCircle', module: 'medical' },
      { id: 'medical-fitness', label: 'Fitness', path: '/medical/fitness', icon: 'FiHeart', module: 'medical' },
      { id: 'medical-vaccinations', label: 'Vaccinations', path: '/medical/vaccinations', icon: 'FiShield', module: 'medical' },
      { id: 'medical-referrals', label: 'Referrals', path: '/medical/referrals', icon: 'FiShare2', module: 'medical' },
      { id: 'medical-calendar', label: 'Calendar', path: '/medical/calendar', icon: 'FiClock', module: 'medical' },
      { id: 'medical-approvals', label: 'Approvals', path: '/medical/approvals', icon: 'FiCheckSquare', module: 'medical', permissions: ['medical:manage:certificates'] },
      { id: 'medical-reports', label: 'Reports', path: '/medical/reports', icon: 'FiBarChart2', module: 'medical' },
      { id: 'medical-history', label: 'History', path: '/medical/history', icon: 'FiList', module: 'medical' },
      { id: 'medical-settings', label: 'Settings', path: '/medical/settings', icon: 'FiSliders', module: 'medical' },
    ],
  };
