import type { NavItem } from '@/types';

export const financeNav: NavItem = {
    id: 'finance',
    label: 'Finance & Budget',
    path: '/finance/dashboard',
    icon: 'FiDollarSign',
    module: 'finance',
    permissions: ['finance:read:budgets'],
    children: [
      { id: 'finance-dashboard', label: 'Dashboard', path: '/finance/dashboard', icon: 'FiGrid', module: 'finance' },
      { id: 'finance-budget', label: 'Budget Allocation', path: '/finance/budget-allocation', icon: 'FiPieChart', module: 'finance' },
      { id: 'finance-monitoring', label: 'Budget Monitoring', path: '/finance/budget-monitoring', icon: 'FiActivity', module: 'finance' },
      { id: 'finance-cost-centers', label: 'Cost Centers', path: '/finance/cost-centers', icon: 'FiLayers', module: 'finance' },
      { id: 'finance-expenditures', label: 'Expenditures', path: '/finance/expenditures', icon: 'FiTrendingDown', module: 'finance' },
      { id: 'finance-invoices', label: 'Invoices', path: '/finance/invoices', icon: 'FiFileText', module: 'finance' },
      { id: 'finance-payments', label: 'Payments', path: '/finance/payments', icon: 'FiCreditCard', module: 'finance' },
      { id: 'finance-approvals', label: 'Approvals', path: '/finance/approvals', icon: 'FiCheckCircle', module: 'finance' },
      { id: 'finance-reports', label: 'Reports', path: '/finance/reports', icon: 'FiBarChart2', module: 'finance' },
      { id: 'finance-settings', label: 'Settings', path: '/finance/settings', icon: 'FiSliders', module: 'finance' },
    ],
  };
