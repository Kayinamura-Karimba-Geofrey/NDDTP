import type { NavItem } from '@/types';

export const dmsNav: NavItem = {
    id: 'dms',
    label: 'Documents & Records',
    path: '/dms/dashboard',
    icon: 'FiFolder',
    module: 'dms',
    children: [
      { id: 'dms-dashboard', label: 'Dashboard', path: '/dms/dashboard', icon: 'FiGrid', module: 'dms' },
      { id: 'dms-library', label: 'Library', path: '/dms/library', icon: 'FiFileText', module: 'dms' },
      { id: 'dms-my', label: 'My Documents', path: '/dms/my-documents', icon: 'FiUser', module: 'dms' },
      { id: 'dms-shared', label: 'Shared', path: '/dms/shared', icon: 'FiShare2', module: 'dms' },
      { id: 'dms-folders', label: 'Folders', path: '/dms/folders', icon: 'FiFolder', module: 'dms' },
      { id: 'dms-upload', label: 'Upload', path: '/dms/upload', icon: 'FiUpload', module: 'dms' },
      { id: 'dms-approvals', label: 'Approvals', path: '/dms/approvals', icon: 'FiCheckCircle', module: 'dms' },
      { id: 'dms-signatures', label: 'Signatures', path: '/dms/signatures', icon: 'FiEdit3', module: 'dms' },
      { id: 'dms-retention', label: 'Retention', path: '/dms/retention', icon: 'FiClock', module: 'dms' },
      { id: 'dms-search', label: 'Search', path: '/dms/search', icon: 'FiSearch', module: 'dms' },
      { id: 'dms-reports', label: 'Reports', path: '/dms/reports', icon: 'FiBarChart2', module: 'dms' },
      { id: 'dms-settings', label: 'Settings', path: '/dms/settings', icon: 'FiSliders', module: 'dms' },
    ],
  };
