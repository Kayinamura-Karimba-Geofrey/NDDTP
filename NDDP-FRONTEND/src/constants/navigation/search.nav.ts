import type { NavItem } from '@/types';

export const searchNav: NavItem = {
    id: 'search',
    label: 'Search',
    path: '/search/dashboard',
    icon: 'FiSearch',
    module: 'search',
    permissions: ['search:read:indexes'],
    children: [
      { id: 'search-dashboard', label: 'Dashboard', path: '/search/dashboard', icon: 'FiGrid', module: 'search' },
      { id: 'search-query', label: 'Query', path: '/search/query', icon: 'FiSearch', module: 'search' },
      { id: 'search-my-queries', label: 'My Queries', path: '/search/queries/mine', icon: 'FiInbox', module: 'search' },
      { id: 'search-queries', label: 'All Queries', path: '/search/queries', icon: 'FiList', module: 'search' },
      { id: 'search-indexes', label: 'Indexes', path: '/search/indexes', icon: 'FiLayers', module: 'search' },
      { id: 'search-documents', label: 'Documents', path: '/search/documents', icon: 'FiFileText', module: 'search' },
      { id: 'search-reports', label: 'Reports', path: '/search/reports', icon: 'FiBarChart2', module: 'search' },
      { id: 'search-settings', label: 'Settings', path: '/search/settings', icon: 'FiSliders', module: 'search' },
    ],
  };
