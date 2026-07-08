import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const InventoryDashboardPage = lazy(() => import('@/modules/inventory/pages/InventoryDashboardPage').then((m) => ({ default: m.InventoryDashboardPage })));
const WarehousesPage = lazy(() => import('@/modules/inventory/pages/WarehousesPage').then((m) => ({ default: m.WarehousesPage })));
const WarehouseDetailPage = lazy(() => import('@/modules/inventory/pages/WarehouseDetailPage').then((m) => ({ default: m.WarehouseDetailPage })));
const WarehouseLocationsPage = lazy(() => import('@/modules/inventory/pages/WarehouseLocationsPage').then((m) => ({ default: m.WarehouseLocationsPage })));
const InventoryItemsPage = lazy(() => import('@/modules/inventory/pages/InventoryItemsPage').then((m) => ({ default: m.InventoryItemsPage })));
const InventoryCategoriesPage = lazy(() => import('@/modules/inventory/pages/InventoryCategoriesPage').then((m) => ({ default: m.InventoryCategoriesPage })));
const UnitsOfMeasurePage = lazy(() => import('@/modules/inventory/pages/UnitsOfMeasurePage').then((m) => ({ default: m.UnitsOfMeasurePage })));
const StockLevelsPage = lazy(() => import('@/modules/inventory/pages/StockLevelsPage').then((m) => ({ default: m.StockLevelsPage })));
const GoodsReceiptPage = lazy(() => import('@/modules/inventory/pages/GoodsReceiptPage').then((m) => ({ default: m.GoodsReceiptPage })));
const GoodsIssuePage = lazy(() => import('@/modules/inventory/pages/GoodsIssuePage').then((m) => ({ default: m.GoodsIssuePage })));
const StockRequestsPage = lazy(() => import('@/modules/inventory/pages/StockRequestsPage').then((m) => ({ default: m.StockRequestsPage })));
const WarehouseTransfersPage = lazy(() => import('@/modules/inventory/pages/WarehouseTransfersPage').then((m) => ({ default: m.WarehouseTransfersPage })));
const StockAdjustmentsPage = lazy(() => import('@/modules/inventory/pages/StockAdjustmentsPage').then((m) => ({ default: m.StockAdjustmentsPage })));
const StockCountsPage = lazy(() => import('@/modules/inventory/pages/StockCountsPage').then((m) => ({ default: m.StockCountsPage })));
const BatchLotManagementPage = lazy(() => import('@/modules/inventory/pages/BatchLotManagementPage').then((m) => ({ default: m.BatchLotManagementPage })));
const ExpiryManagementPage = lazy(() => import('@/modules/inventory/pages/ExpiryManagementPage').then((m) => ({ default: m.ExpiryManagementPage })));
const ReorderManagementPage = lazy(() => import('@/modules/inventory/pages/ReorderManagementPage').then((m) => ({ default: m.ReorderManagementPage })));
const InventorySuppliersPage = lazy(() => import('@/modules/inventory/pages/InventorySuppliersPage').then((m) => ({ default: m.InventorySuppliersPage })));
const InventoryValuationPage = lazy(() => import('@/modules/inventory/pages/InventoryValuationPage').then((m) => ({ default: m.InventoryValuationPage })));
const InventoryReportsPage = lazy(() => import('@/modules/inventory/pages/InventoryReportsPage').then((m) => ({ default: m.InventoryReportsPage })));
const InventorySettingsPage = lazy(() => import('@/modules/inventory/pages/InventorySettingsPage').then((m) => ({ default: m.InventorySettingsPage })));

export const inventoryRoutes: RouteObject[] = [
  { path: 'inventory', element: <Navigate to="/inventory/dashboard" replace /> },
  { path: 'inventory/dashboard', element: wrap(<InventoryDashboardPage />) },
  { path: 'inventory/warehouses', element: wrap(<WarehousesPage />) },
  { path: 'inventory/warehouses/:id', element: wrap(<WarehouseDetailPage />) },
  { path: 'inventory/locations', element: wrap(<WarehouseLocationsPage />) },
  { path: 'inventory/items', element: wrap(<InventoryItemsPage />) },
  { path: 'inventory/categories', element: wrap(<InventoryCategoriesPage />) },
  { path: 'inventory/units', element: wrap(<UnitsOfMeasurePage />) },
  { path: 'inventory/stock-levels', element: wrap(<StockLevelsPage />) },
  { path: 'inventory/goods-receipt', element: wrap(<GoodsReceiptPage />) },
  { path: 'inventory/goods-issue', element: wrap(<GoodsIssuePage />) },
  { path: 'inventory/requests', element: wrap(<StockRequestsPage />) },
  { path: 'inventory/transfers', element: wrap(<WarehouseTransfersPage />) },
  { path: 'inventory/adjustments', element: wrap(<StockAdjustmentsPage />) },
  { path: 'inventory/stock-counts', element: wrap(<StockCountsPage />) },
  { path: 'inventory/batches', element: wrap(<BatchLotManagementPage />) },
  { path: 'inventory/expiry', element: wrap(<ExpiryManagementPage />) },
  { path: 'inventory/reorder', element: wrap(<ReorderManagementPage />) },
  { path: 'inventory/suppliers', element: wrap(<InventorySuppliersPage />) },
  { path: 'inventory/valuation', element: wrap(<InventoryValuationPage />) },
  { path: 'inventory/reports', element: wrap(<InventoryReportsPage />) },
  { path: 'inventory/settings', element: wrap(<InventorySettingsPage />) },
];
