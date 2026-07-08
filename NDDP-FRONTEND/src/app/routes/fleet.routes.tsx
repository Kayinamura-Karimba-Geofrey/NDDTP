import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const FleetDashboardPage = lazy(() => import('@/modules/fleet/pages/FleetDashboardPage').then((m) => ({ default: m.FleetDashboardPage })));
const FleetRegistryPage = lazy(() => import('@/modules/fleet/pages/FleetRegistryPage').then((m) => ({ default: m.FleetRegistryPage })));
const VehicleProfilePage = lazy(() => import('@/modules/fleet/pages/VehicleProfilePage').then((m) => ({ default: m.VehicleProfilePage })));
const DriverManagementPage = lazy(() => import('@/modules/fleet/pages/DriverManagementPage').then((m) => ({ default: m.DriverManagementPage })));
const DriverLicensingPage = lazy(() => import('@/modules/fleet/pages/DriverLicensingPage').then((m) => ({ default: m.DriverLicensingPage })));
const VehicleAssignmentsPage = lazy(() => import('@/modules/fleet/pages/VehicleAssignmentsPage').then((m) => ({ default: m.VehicleAssignmentsPage })));
const TripRequestsPage = lazy(() => import('@/modules/fleet/pages/TripRequestsPage').then((m) => ({ default: m.TripRequestsPage })));
const TripSchedulingPage = lazy(() => import('@/modules/fleet/pages/TripSchedulingPage').then((m) => ({ default: m.TripSchedulingPage })));
const DispatchCenterPage = lazy(() => import('@/modules/fleet/pages/DispatchCenterPage').then((m) => ({ default: m.DispatchCenterPage })));
const FuelManagementPage = lazy(() => import('@/modules/fleet/pages/FuelManagementPage').then((m) => ({ default: m.FuelManagementPage })));
const FleetMaintenancePage = lazy(() => import('@/modules/fleet/pages/FleetMaintenancePage').then((m) => ({ default: m.FleetMaintenancePage })));
const VehicleInspectionsPage = lazy(() => import('@/modules/fleet/pages/VehicleInspectionsPage').then((m) => ({ default: m.VehicleInspectionsPage })));
const FleetIncidentsPage = lazy(() => import('@/modules/fleet/pages/FleetIncidentsPage').then((m) => ({ default: m.FleetIncidentsPage })));
const GpsMonitoringPage = lazy(() => import('@/modules/fleet/pages/GpsMonitoringPage').then((m) => ({ default: m.GpsMonitoringPage })));
const ParkingGaragePage = lazy(() => import('@/modules/fleet/pages/ParkingGaragePage').then((m) => ({ default: m.ParkingGaragePage })));
const FleetCalendarPage = lazy(() => import('@/modules/fleet/pages/FleetCalendarPage').then((m) => ({ default: m.FleetCalendarPage })));
const FleetApprovalCenterPage = lazy(() => import('@/modules/fleet/pages/FleetApprovalCenterPage').then((m) => ({ default: m.FleetApprovalCenterPage })));
const FleetReportsPage = lazy(() => import('@/modules/fleet/pages/FleetReportsPage').then((m) => ({ default: m.FleetReportsPage })));
const FleetHistoryPage = lazy(() => import('@/modules/fleet/pages/FleetHistoryPage').then((m) => ({ default: m.FleetHistoryPage })));
const FleetSettingsPage = lazy(() => import('@/modules/fleet/pages/FleetSettingsPage').then((m) => ({ default: m.FleetSettingsPage })));

export const fleetRoutes: RouteObject[] = [
  { path: 'fleet', element: <Navigate to="/fleet/dashboard" replace /> },
  { path: 'fleet/dashboard', element: wrap(<FleetDashboardPage />) },
  { path: 'fleet/registry', element: wrap(<FleetRegistryPage />) },
  { path: 'fleet/vehicles/:id', element: wrap(<VehicleProfilePage />) },
  { path: 'fleet/drivers', element: wrap(<DriverManagementPage />) },
  { path: 'fleet/licensing', element: wrap(<DriverLicensingPage />) },
  { path: 'fleet/assignments', element: wrap(<VehicleAssignmentsPage />) },
  { path: 'fleet/trip-requests', element: wrap(<TripRequestsPage />) },
  { path: 'fleet/scheduling', element: wrap(<TripSchedulingPage />) },
  { path: 'fleet/dispatch', element: wrap(<DispatchCenterPage />) },
  { path: 'fleet/fuel', element: wrap(<FuelManagementPage />) },
  { path: 'fleet/maintenance', element: wrap(<FleetMaintenancePage />) },
  { path: 'fleet/inspections', element: wrap(<VehicleInspectionsPage />) },
  { path: 'fleet/incidents', element: wrap(<FleetIncidentsPage />) },
  { path: 'fleet/gps', element: wrap(<GpsMonitoringPage />) },
  { path: 'fleet/parking', element: wrap(<ParkingGaragePage />) },
  { path: 'fleet/calendar', element: wrap(<FleetCalendarPage />) },
  { path: 'fleet/approvals', element: wrap(<FleetApprovalCenterPage />) },
  { path: 'fleet/reports', element: wrap(<FleetReportsPage />) },
  { path: 'fleet/history', element: wrap(<FleetHistoryPage />) },
  { path: 'fleet/settings', element: wrap(<FleetSettingsPage />) },
];
