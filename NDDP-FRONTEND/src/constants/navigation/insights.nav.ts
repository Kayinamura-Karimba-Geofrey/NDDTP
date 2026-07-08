import type { NavItem } from '@/types';

export const insightsNav: NavItem = {
    id: 'insights',
    label: 'Reporting & Analytics',
    path: '/reports/dashboard',
    icon: 'FiBarChart2',
    module: 'reporting',
    permissions: ['reporting:read:definitions'],
    children: [
      { id: 'reports-dashboard', label: 'Executive Dashboard', path: '/reports/dashboard', icon: 'FiGrid', module: 'reporting' },
      { id: 'reports-operational', label: 'Operational', path: '/reports/operational', icon: 'FiActivity', module: 'reporting' },
      { id: 'reports-kpis', label: 'KPI Management', path: '/reports/kpis', icon: 'FiActivity', module: 'reporting' },
      { id: 'reports-library', label: 'Report Library', path: '/reports/library', icon: 'FiFileText', module: 'reporting' },
      { id: 'reports-builder', label: 'Report Builder', path: '/reports/builder', icon: 'FiEdit3', module: 'reporting' },
      { id: 'reports-analytics', label: 'Analytics', path: '/reports/analytics', icon: 'FiPieChart', module: 'reporting' },
      { id: 'reports-forecasting', label: 'Forecasting', path: '/reports/forecasting', icon: 'FiTrendingUp', module: 'reporting' },
      { id: 'reports-exports', label: 'Data Exports', path: '/reports/exports', icon: 'FiDownload', module: 'reporting' },
      { id: 'reports-integrations', label: 'BI Integrations', path: '/reports/integrations', icon: 'FiLayers', module: 'reporting' },
      { id: 'reports-settings', label: 'Settings', path: '/reports/settings', icon: 'FiSliders', module: 'reporting' },
    ],
  };
