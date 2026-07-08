import type { NavItem } from '@/types';

export const personnelNav: NavItem = {
    id: 'personnel',
    label: 'Personnel',
    path: '/personnel/dashboard',
    icon: 'FiUsers',
    module: 'personnel',
    permissions: ['personnel:read:profile', 'personnel:read:records'],
    children: [
      { id: 'personnel-dashboard', label: 'Dashboard', path: '/personnel/dashboard', icon: 'FiGrid', module: 'personnel' },
      { id: 'personnel-directory', label: 'Directory', path: '/personnel/directory', icon: 'FiUsers', module: 'personnel' },
      { id: 'personnel-organization', label: 'Organization', path: '/personnel/organization', icon: 'FiGitBranch', module: 'personnel' },
      { id: 'personnel-departments', label: 'Departments', path: '/personnel/departments', icon: 'FiBriefcase', module: 'personnel' },
      { id: 'personnel-units', label: 'Units', path: '/personnel/units', icon: 'FiLayers', module: 'personnel' },
      { id: 'personnel-positions', label: 'Positions', path: '/personnel/positions', icon: 'FiAward', module: 'personnel' },
      { id: 'personnel-transfers', label: 'Transfers', path: '/personnel/transfers', icon: 'FiShuffle', module: 'personnel' },
      { id: 'personnel-promotions', label: 'Promotions', path: '/personnel/promotions', icon: 'FiTrendingUp', module: 'personnel' },
      { id: 'personnel-qualifications', label: 'Qualifications', path: '/personnel/qualifications', icon: 'FiBook', module: 'personnel' },
      { id: 'personnel-skills', label: 'Skills', path: '/personnel/skills', icon: 'FiCpu', module: 'personnel' },
      { id: 'personnel-documents', label: 'Documents', path: '/personnel/documents', icon: 'FiFile', module: 'personnel' },
      { id: 'personnel-import', label: 'Import', path: '/personnel/import', icon: 'FiUpload', module: 'personnel' },
      { id: 'personnel-export', label: 'Export', path: '/personnel/export', icon: 'FiDownload', module: 'personnel' },
      { id: 'personnel-reports', label: 'Reports', path: '/personnel/reports', icon: 'FiBarChart2', module: 'personnel' },
    ],
  };
