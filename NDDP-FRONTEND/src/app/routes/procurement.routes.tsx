import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const ProcurementDashboardPage = lazy(() => import('@/modules/procurement/pages/ProcurementDashboardPage').then((m) => ({ default: m.ProcurementDashboardPage })));
const ProcurementPlanPage = lazy(() => import('@/modules/procurement/pages/ProcurementPlanPage').then((m) => ({ default: m.ProcurementPlanPage })));
const PurchaseRequisitionsPage = lazy(() => import('@/modules/procurement/pages/PurchaseRequisitionsPage').then((m) => ({ default: m.PurchaseRequisitionsPage })));
const PurchaseRequestsPage = lazy(() => import('@/modules/procurement/pages/PurchaseRequestsPage').then((m) => ({ default: m.PurchaseRequestsPage })));
const SupplierManagementPage = lazy(() => import('@/modules/procurement/pages/SupplierManagementPage').then((m) => ({ default: m.SupplierManagementPage })));
const SupplierDetailPage = lazy(() => import('@/modules/procurement/pages/SupplierDetailPage').then((m) => ({ default: m.SupplierDetailPage })));
const SupplierEvaluationPage = lazy(() => import('@/modules/procurement/pages/SupplierEvaluationPage').then((m) => ({ default: m.SupplierEvaluationPage })));
const VendorRegistrationPage = lazy(() => import('@/modules/procurement/pages/VendorRegistrationPage').then((m) => ({ default: m.VendorRegistrationPage })));
const RfqManagementPage = lazy(() => import('@/modules/procurement/pages/RfqManagementPage').then((m) => ({ default: m.RfqManagementPage })));
const TenderManagementPage = lazy(() => import('@/modules/procurement/pages/TenderManagementPage').then((m) => ({ default: m.TenderManagementPage })));
const BidManagementPage = lazy(() => import('@/modules/procurement/pages/BidManagementPage').then((m) => ({ default: m.BidManagementPage })));
const BidEvaluationPage = lazy(() => import('@/modules/procurement/pages/BidEvaluationPage').then((m) => ({ default: m.BidEvaluationPage })));
const PurchaseOrdersPage = lazy(() => import('@/modules/procurement/pages/PurchaseOrdersPage').then((m) => ({ default: m.PurchaseOrdersPage })));
const ContractManagementPage = lazy(() => import('@/modules/procurement/pages/ContractManagementPage').then((m) => ({ default: m.ContractManagementPage })));
const GoodsReceiptCoordinationPage = lazy(() => import('@/modules/procurement/pages/GoodsReceiptCoordinationPage').then((m) => ({ default: m.GoodsReceiptCoordinationPage })));
const InvoiceMatchingPage = lazy(() => import('@/modules/procurement/pages/InvoiceMatchingPage').then((m) => ({ default: m.InvoiceMatchingPage })));
const ProcurementApprovalCenterPage = lazy(() => import('@/modules/procurement/pages/ProcurementApprovalCenterPage').then((m) => ({ default: m.ProcurementApprovalCenterPage })));
const ProcurementCalendarPage = lazy(() => import('@/modules/procurement/pages/ProcurementCalendarPage').then((m) => ({ default: m.ProcurementCalendarPage })));
const ProcurementReportsPage = lazy(() => import('@/modules/procurement/pages/ProcurementReportsPage').then((m) => ({ default: m.ProcurementReportsPage })));
const ProcurementSettingsPage = lazy(() => import('@/modules/procurement/pages/ProcurementSettingsPage').then((m) => ({ default: m.ProcurementSettingsPage })));

export const procurementRoutes: RouteObject[] = [
  { path: 'procurement', element: <Navigate to="/procurement/dashboard" replace /> },
  { path: 'procurement/dashboard', element: wrap(<ProcurementDashboardPage />) },
  { path: 'procurement/plan', element: wrap(<ProcurementPlanPage />) },
  { path: 'procurement/requisitions', element: wrap(<PurchaseRequisitionsPage />) },
  { path: 'procurement/requests', element: wrap(<PurchaseRequestsPage />) },
  { path: 'procurement/suppliers', element: wrap(<SupplierManagementPage />) },
  { path: 'procurement/suppliers/:id', element: wrap(<SupplierDetailPage />) },
  { path: 'procurement/evaluation', element: wrap(<SupplierEvaluationPage />) },
  { path: 'procurement/vendor-registration', element: wrap(<VendorRegistrationPage />) },
  { path: 'procurement/rfqs', element: wrap(<RfqManagementPage />) },
  { path: 'procurement/tenders', element: wrap(<TenderManagementPage />) },
  { path: 'procurement/bids', element: wrap(<BidManagementPage />) },
  { path: 'procurement/bid-evaluation', element: wrap(<BidEvaluationPage />) },
  { path: 'procurement/orders', element: wrap(<PurchaseOrdersPage />) },
  { path: 'procurement/contracts', element: wrap(<ContractManagementPage />) },
  { path: 'procurement/receipts', element: wrap(<GoodsReceiptCoordinationPage />) },
  { path: 'procurement/invoice-matching', element: wrap(<InvoiceMatchingPage />) },
  { path: 'procurement/approvals', element: wrap(<ProcurementApprovalCenterPage />) },
  { path: 'procurement/calendar', element: wrap(<ProcurementCalendarPage />) },
  { path: 'procurement/reports', element: wrap(<ProcurementReportsPage />) },
  { path: 'procurement/settings', element: wrap(<ProcurementSettingsPage />) },
];
