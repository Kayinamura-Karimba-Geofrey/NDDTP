import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const MedicalDashboardPage = lazy(() => import('@/modules/medical/pages/MedicalDashboardPage').then((m) => ({ default: m.MedicalDashboardPage })));
const MyMedicalPage = lazy(() => import('@/modules/medical/pages/MyMedicalPage').then((m) => ({ default: m.MyMedicalPage })));
const MedicalProfilesPage = lazy(() => import('@/modules/medical/pages/MedicalProfilesPage').then((m) => ({ default: m.MedicalProfilesPage })));
const MedicalProfileDetailPage = lazy(() => import('@/modules/medical/pages/MedicalProfileDetailPage').then((m) => ({ default: m.MedicalProfileDetailPage })));
const MedicalAppointmentsPage = lazy(() => import('@/modules/medical/pages/MedicalAppointmentsPage').then((m) => ({ default: m.MedicalAppointmentsPage })));
const MedicalAssessmentsPage = lazy(() => import('@/modules/medical/pages/MedicalAssessmentsPage').then((m) => ({ default: m.MedicalAssessmentsPage })));
const MedicalClearancesPage = lazy(() => import('@/modules/medical/pages/MedicalClearancesPage').then((m) => ({ default: m.MedicalClearancesPage })));
const MedicalFitnessPage = lazy(() => import('@/modules/medical/pages/MedicalFitnessPage').then((m) => ({ default: m.MedicalFitnessPage })));
const VaccinationRecordsPage = lazy(() => import('@/modules/medical/pages/VaccinationRecordsPage').then((m) => ({ default: m.VaccinationRecordsPage })));
const LaboratoryResultsPage = lazy(() => import('@/modules/medical/pages/LaboratoryResultsPage').then((m) => ({ default: m.LaboratoryResultsPage })));
const MedicalReferralsPage = lazy(() => import('@/modules/medical/pages/MedicalReferralsPage').then((m) => ({ default: m.MedicalReferralsPage })));
const MedicalDocumentsPage = lazy(() => import('@/modules/medical/pages/MedicalDocumentsPage').then((m) => ({ default: m.MedicalDocumentsPage })));
const MedicalIncidentsPage = lazy(() => import('@/modules/medical/pages/MedicalIncidentsPage').then((m) => ({ default: m.MedicalIncidentsPage })));
const OccupationalHealthPage = lazy(() => import('@/modules/medical/pages/OccupationalHealthPage').then((m) => ({ default: m.OccupationalHealthPage })));
const HealthCampaignsPage = lazy(() => import('@/modules/medical/pages/HealthCampaignsPage').then((m) => ({ default: m.HealthCampaignsPage })));
const MedicalCalendarPage = lazy(() => import('@/modules/medical/pages/MedicalCalendarPage').then((m) => ({ default: m.MedicalCalendarPage })));
const MedicalApprovalCenterPage = lazy(() => import('@/modules/medical/pages/MedicalApprovalCenterPage').then((m) => ({ default: m.MedicalApprovalCenterPage })));
const MedicalReportsPage = lazy(() => import('@/modules/medical/pages/MedicalReportsPage').then((m) => ({ default: m.MedicalReportsPage })));
const MedicalHistoryPage = lazy(() => import('@/modules/medical/pages/MedicalHistoryPage').then((m) => ({ default: m.MedicalHistoryPage })));
const MedicalSettingsPage = lazy(() => import('@/modules/medical/pages/MedicalSettingsPage').then((m) => ({ default: m.MedicalSettingsPage })));

export const medicalRoutes: RouteObject[] = [
  { path: 'medical', element: <Navigate to="/medical/dashboard" replace /> },
  { path: 'medical/dashboard', element: wrap(<MedicalDashboardPage />) },
  { path: 'medical/my-medical', element: wrap(<MyMedicalPage />) },
  { path: 'medical/profiles', element: wrap(<MedicalProfilesPage />) },
  { path: 'medical/profiles/:id', element: wrap(<MedicalProfileDetailPage />) },
  { path: 'medical/appointments', element: wrap(<MedicalAppointmentsPage />) },
  { path: 'medical/assessments', element: wrap(<MedicalAssessmentsPage />) },
  { path: 'medical/clearances', element: wrap(<MedicalClearancesPage />) },
  { path: 'medical/fitness', element: wrap(<MedicalFitnessPage />) },
  { path: 'medical/vaccinations', element: wrap(<VaccinationRecordsPage />) },
  { path: 'medical/laboratory', element: wrap(<LaboratoryResultsPage />) },
  { path: 'medical/referrals', element: wrap(<MedicalReferralsPage />) },
  { path: 'medical/documents', element: wrap(<MedicalDocumentsPage />) },
  { path: 'medical/incidents', element: wrap(<MedicalIncidentsPage />) },
  { path: 'medical/occupational-health', element: wrap(<OccupationalHealthPage />) },
  { path: 'medical/campaigns', element: wrap(<HealthCampaignsPage />) },
  { path: 'medical/calendar', element: wrap(<MedicalCalendarPage />) },
  { path: 'medical/approvals', element: wrap(<MedicalApprovalCenterPage />) },
  { path: 'medical/reports', element: wrap(<MedicalReportsPage />) },
  { path: 'medical/history', element: wrap(<MedicalHistoryPage />) },
  { path: 'medical/settings', element: wrap(<MedicalSettingsPage />) },
];
