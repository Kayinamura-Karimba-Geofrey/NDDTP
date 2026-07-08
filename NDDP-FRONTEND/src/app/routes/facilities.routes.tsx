import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const FacilitiesDashboardPage = lazy(() => import('@/modules/facilities/pages/FacilitiesDashboardPage').then((m) => ({ default: m.FacilitiesDashboardPage })));
const FacilitiesDirectoryPage = lazy(() => import('@/modules/facilities/pages/FacilitiesDirectoryPage').then((m) => ({ default: m.FacilitiesDirectoryPage })));
const FacilitiesDetailPage = lazy(() => import('@/modules/facilities/pages/FacilitiesDetailPage').then((m) => ({ default: m.FacilitiesDetailPage })));
const FacilitiesTypesPage = lazy(() => import('@/modules/facilities/pages/FacilitiesTypesPage').then((m) => ({ default: m.FacilitiesTypesPage })));
const FacilitiesSpacesPage = lazy(() => import('@/modules/facilities/pages/FacilitiesSpacesPage').then((m) => ({ default: m.FacilitiesSpacesPage })));
const FacilitiesAvailableSpacesPage = lazy(() => import('@/modules/facilities/pages/FacilitiesAvailableSpacesPage').then((m) => ({ default: m.FacilitiesAvailableSpacesPage })));
const FacilitiesBookingsPage = lazy(() => import('@/modules/facilities/pages/FacilitiesBookingsPage').then((m) => ({ default: m.FacilitiesBookingsPage })));
const FacilitiesMyBookingsPage = lazy(() => import('@/modules/facilities/pages/FacilitiesMyBookingsPage').then((m) => ({ default: m.FacilitiesMyBookingsPage })));
const FacilitiesCreateBookingPage = lazy(() => import('@/modules/facilities/pages/FacilitiesCreateBookingPage').then((m) => ({ default: m.FacilitiesCreateBookingPage })));
const FacilitiesBookingDetailPage = lazy(() => import('@/modules/facilities/pages/FacilitiesBookingDetailPage').then((m) => ({ default: m.FacilitiesBookingDetailPage })));
const FacilitiesOccupancyPage = lazy(() => import('@/modules/facilities/pages/FacilitiesOccupancyPage').then((m) => ({ default: m.FacilitiesOccupancyPage })));
const FacilitiesUtilitiesPage = lazy(() => import('@/modules/facilities/pages/FacilitiesUtilitiesPage').then((m) => ({ default: m.FacilitiesUtilitiesPage })));
const FacilitiesInspectionsPage = lazy(() => import('@/modules/facilities/pages/FacilitiesInspectionsPage').then((m) => ({ default: m.FacilitiesInspectionsPage })));
const FacilitiesAccessPage = lazy(() => import('@/modules/facilities/pages/FacilitiesAccessPage').then((m) => ({ default: m.FacilitiesAccessPage })));
const FacilitiesReportsPage = lazy(() => import('@/modules/facilities/pages/FacilitiesReportsPage').then((m) => ({ default: m.FacilitiesReportsPage })));
const FacilitiesSettingsPage = lazy(() => import('@/modules/facilities/pages/FacilitiesSettingsPage').then((m) => ({ default: m.FacilitiesSettingsPage })));

export const facilitiesRoutes: RouteObject[] = [
  { path: 'facilities', element: <Navigate to="/facilities/dashboard" replace /> },
  { path: 'facilities/dashboard', element: wrap(<FacilitiesDashboardPage />) },
  { path: 'facilities/directory', element: wrap(<FacilitiesDirectoryPage />) },
  { path: 'facilities/directory/:id', element: wrap(<FacilitiesDetailPage />) },
  { path: 'facilities/types', element: wrap(<FacilitiesTypesPage />) },
  { path: 'facilities/spaces', element: wrap(<FacilitiesSpacesPage />) },
  { path: 'facilities/spaces/available', element: wrap(<FacilitiesAvailableSpacesPage />) },
  { path: 'facilities/bookings', element: wrap(<FacilitiesBookingsPage />) },
  { path: 'facilities/bookings/mine', element: wrap(<FacilitiesMyBookingsPage />) },
  { path: 'facilities/bookings/new', element: wrap(<FacilitiesCreateBookingPage />) },
  { path: 'facilities/bookings/:id', element: wrap(<FacilitiesBookingDetailPage />) },
  { path: 'facilities/occupancy', element: wrap(<FacilitiesOccupancyPage />) },
  { path: 'facilities/utilities', element: wrap(<FacilitiesUtilitiesPage />) },
  { path: 'facilities/inspections', element: wrap(<FacilitiesInspectionsPage />) },
  { path: 'facilities/access', element: wrap(<FacilitiesAccessPage />) },
  { path: 'facilities/reports', element: wrap(<FacilitiesReportsPage />) },
  { path: 'facilities/settings', element: wrap(<FacilitiesSettingsPage />) },
];
