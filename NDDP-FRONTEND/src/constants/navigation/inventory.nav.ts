import type { NavItem } from '@/types';

export const inventoryNav: NavItem = {
    id: 'inventory',
    label: 'Inventory & Warehouse',
    path: '/inventory/dashboard',
    icon: 'FiArchive',
    module: 'inventory',
    permissions: ['inventory:read:items'],
    children: [
      { id: 'inventory-dashboard', label: 'Dashboard', path: '/inventory/dashboard', icon: 'FiGrid', module: 'inventory' },
      { id: 'inventory-warehouses', label: 'Warehouses', path: '/inventory/warehouses', icon: 'FiHome', module: 'inventory' },
      { id: 'inventory-items', label: 'Items', path: '/inventory/items', icon: 'FiList', module: 'inventory' },
      { id: 'inventory-stock', label: 'Stock Levels', path: '/inventory/stock-levels', icon: 'FiLayers', module: 'inventory' },
      { id: 'inventory-receipts', label: 'Goods Receipt', path: '/inventory/goods-receipt', icon: 'FiDownload', module: 'inventory' },
      { id: 'inventory-issues', label: 'Goods Issue', path: '/inventory/goods-issue', icon: 'FiUpload', module: 'inventory' },
      { id: 'inventory-requests', label: 'Requests', path: '/inventory/requests', icon: 'FiInbox', module: 'inventory' },
      { id: 'inventory-transfers', label: 'Transfers', path: '/inventory/transfers', icon: 'FiRepeat', module: 'inventory' },
      { id: 'inventory-expiry', label: 'Expiry', path: '/inventory/expiry', icon: 'FiClock', module: 'inventory' },
      { id: 'inventory-reports', label: 'Reports', path: '/inventory/reports', icon: 'FiBarChart2', module: 'inventory' },
      { id: 'inventory-settings', label: 'Settings', path: '/inventory/settings', icon: 'FiSliders', module: 'inventory' },
    ],
  };
