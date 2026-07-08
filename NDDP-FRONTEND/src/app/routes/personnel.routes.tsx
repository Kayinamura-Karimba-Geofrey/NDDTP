import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const PersonnelDashboardPage = lazy(() => import('@/modules/personnel/pages/PersonnelDashboardPage').then((m) => ({ default: m.PersonnelDashboardPage })));
const PersonnelDirectoryPage = lazy(() => import('@/modules/personnel/pages/PersonnelDirectoryPage').then((m) => ({ default: m.PersonnelDirectoryPage })));
const RegisterPersonnelPage = lazy(() => import('@/modules/personnel/pages/RegisterPersonnelPage').then((m) => ({ default: m.RegisterPersonnelPage })));
const OrganizationStructurePage = lazy(() => import('@/modules/personnel/pages/OrganizationStructurePage').then((m) => ({ default: m.OrganizationStructurePage })));
const PersonnelDepartmentsPage = lazy(() => import('@/modules/personnel/pages/PersonnelDepartmentsPage').then((m) => ({ default: m.PersonnelDepartmentsPage })));
const UnitsPage = lazy(() => import('@/modules/personnel/pages/UnitsPage').then((m) => ({ default: m.UnitsPage })));
const PersonnelPositionsPage = lazy(() => import('@/modules/personnel/pages/PersonnelPositionsPage').then((m) => ({ default: m.PersonnelPositionsPage })));
const EmploymentHistoryPage = lazy(() => import('@/modules/personnel/pages/EmploymentHistoryPage').then((m) => ({ default: m.EmploymentHistoryPage })));
const TransfersPage = lazy(() => import('@/modules/personnel/pages/TransfersPage').then((m) => ({ default: m.TransfersPage })));
const PromotionsPage = lazy(() => import('@/modules/personnel/pages/PromotionsPage').then((m) => ({ default: m.PromotionsPage })));
const QualificationsPage = lazy(() => import('@/modules/personnel/pages/QualificationsPage').then((m) => ({ default: m.QualificationsPage })));
const CertificationsPage = lazy(() => import('@/modules/personnel/pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage })));
const SkillsPage = lazy(() => import('@/modules/personnel/pages/SkillsPage').then((m) => ({ default: m.SkillsPage })));
const AwardsPage = lazy(() => import('@/modules/personnel/pages/AwardsPage').then((m) => ({ default: m.AwardsPage })));
const PersonnelDocumentsPage = lazy(() => import('@/modules/personnel/pages/PersonnelDocumentsPage').then((m) => ({ default: m.PersonnelDocumentsPage })));
const EmergencyContactsPage = lazy(() => import('@/modules/personnel/pages/EmergencyContactsPage').then((m) => ({ default: m.EmergencyContactsPage })));
const DependentsPage = lazy(() => import('@/modules/personnel/pages/DependentsPage').then((m) => ({ default: m.DependentsPage })));
const EmploymentStatusPage = lazy(() => import('@/modules/personnel/pages/EmploymentStatusPage').then((m) => ({ default: m.EmploymentStatusPage })));
const RetirementPlanningPage = lazy(() => import('@/modules/personnel/pages/RetirementPlanningPage').then((m) => ({ default: m.RetirementPlanningPage })));
const SeparationRecordsPage = lazy(() => import('@/modules/personnel/pages/SeparationRecordsPage').then((m) => ({ default: m.SeparationRecordsPage })));
const BulkImportPage = lazy(() => import('@/modules/personnel/pages/BulkImportPage').then((m) => ({ default: m.BulkImportPage })));
const BulkExportPage = lazy(() => import('@/modules/personnel/pages/BulkExportPage').then((m) => ({ default: m.BulkExportPage })));
const PersonnelReportsPage = lazy(() => import('@/modules/personnel/pages/PersonnelReportsPage').then((m) => ({ default: m.PersonnelReportsPage })));
const EditPersonnelPage = lazy(() => import('@/modules/personnel/pages/EditPersonnelPage').then((m) => ({ default: m.EditPersonnelPage })));
const PersonnelProfilePage = lazy(() => import('@/modules/personnel/pages/PersonnelProfilePage').then((m) => ({ default: m.PersonnelProfilePage })));

export const personnelRoutes: RouteObject[] = [
  { path: 'personnel', element: <Navigate to="/personnel/dashboard" replace /> },
  { path: 'personnel/dashboard', element: wrap(<PersonnelDashboardPage />) },
  { path: 'personnel/directory', element: wrap(<PersonnelDirectoryPage />) },
  { path: 'personnel/new', element: wrap(<RegisterPersonnelPage />) },
  { path: 'personnel/organization', element: wrap(<OrganizationStructurePage />) },
  { path: 'personnel/departments', element: wrap(<PersonnelDepartmentsPage />) },
  { path: 'personnel/units', element: wrap(<UnitsPage />) },
  { path: 'personnel/positions', element: wrap(<PersonnelPositionsPage />) },
  { path: 'personnel/employment-history', element: wrap(<EmploymentHistoryPage />) },
  { path: 'personnel/transfers', element: wrap(<TransfersPage />) },
  { path: 'personnel/promotions', element: wrap(<PromotionsPage />) },
  { path: 'personnel/qualifications', element: wrap(<QualificationsPage />) },
  { path: 'personnel/certifications', element: wrap(<CertificationsPage />) },
  { path: 'personnel/skills', element: wrap(<SkillsPage />) },
  { path: 'personnel/awards', element: wrap(<AwardsPage />) },
  { path: 'personnel/documents', element: wrap(<PersonnelDocumentsPage />) },
  { path: 'personnel/emergency-contacts', element: wrap(<EmergencyContactsPage />) },
  { path: 'personnel/dependents', element: wrap(<DependentsPage />) },
  { path: 'personnel/employment-status', element: wrap(<EmploymentStatusPage />) },
  { path: 'personnel/retirement', element: wrap(<RetirementPlanningPage />) },
  { path: 'personnel/separation', element: wrap(<SeparationRecordsPage />) },
  { path: 'personnel/import', element: wrap(<BulkImportPage />) },
  { path: 'personnel/export', element: wrap(<BulkExportPage />) },
  { path: 'personnel/reports', element: wrap(<PersonnelReportsPage />) },
  { path: 'personnel/:id/edit', element: wrap(<EditPersonnelPage />) },
  { path: 'personnel/:id', element: wrap(<PersonnelProfilePage />) },
];
