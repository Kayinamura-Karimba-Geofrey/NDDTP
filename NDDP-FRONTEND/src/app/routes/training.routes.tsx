import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const TrainingDashboardPage = lazy(() => import('@/modules/training/pages/TrainingDashboardPage').then((m) => ({ default: m.TrainingDashboardPage })));
const MyLearningPage = lazy(() => import('@/modules/training/pages/MyLearningPage').then((m) => ({ default: m.MyLearningPage })));
const TrainingCatalogPage = lazy(() => import('@/modules/training/pages/TrainingCatalogPage').then((m) => ({ default: m.TrainingCatalogPage })));
const TrainingProgramsPage = lazy(() => import('@/modules/training/pages/TrainingProgramsPage').then((m) => ({ default: m.TrainingProgramsPage })));
const CoursesPage = lazy(() => import('@/modules/training/pages/CoursesPage').then((m) => ({ default: m.CoursesPage })));
const LearningPathsPage = lazy(() => import('@/modules/training/pages/LearningPathsPage').then((m) => ({ default: m.LearningPathsPage })));
const TrainingCalendarPage = lazy(() => import('@/modules/training/pages/TrainingCalendarPage').then((m) => ({ default: m.TrainingCalendarPage })));
const EnrollmentsPage = lazy(() => import('@/modules/training/pages/EnrollmentsPage').then((m) => ({ default: m.EnrollmentsPage })));
const AttendancePage = lazy(() => import('@/modules/training/pages/AttendancePage').then((m) => ({ default: m.AttendancePage })));
const InstructorsPage = lazy(() => import('@/modules/training/pages/InstructorsPage').then((m) => ({ default: m.InstructorsPage })));
const ClassroomsPage = lazy(() => import('@/modules/training/pages/ClassroomsPage').then((m) => ({ default: m.ClassroomsPage })));
const LearningMaterialsPage = lazy(() => import('@/modules/training/pages/LearningMaterialsPage').then((m) => ({ default: m.LearningMaterialsPage })));
const TrainingAssessmentsPage = lazy(() => import('@/modules/training/pages/AssessmentsPage').then((m) => ({ default: m.AssessmentsPage })));
const ExaminationsPage = lazy(() => import('@/modules/training/pages/ExaminationsPage').then((m) => ({ default: m.ExaminationsPage })));
const TrainingCertificationsPage = lazy(() => import('@/modules/training/pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage })));
const CompetenciesPage = lazy(() => import('@/modules/training/pages/CompetenciesPage').then((m) => ({ default: m.CompetenciesPage })));
const TrainingRequestsPage = lazy(() => import('@/modules/training/pages/TrainingRequestsPage').then((m) => ({ default: m.TrainingRequestsPage })));
const TrainingApprovalCenterPage = lazy(() => import('@/modules/training/pages/TrainingApprovalCenterPage').then((m) => ({ default: m.TrainingApprovalCenterPage })));
const TrainingHistoryPage = lazy(() => import('@/modules/training/pages/TrainingHistoryPage').then((m) => ({ default: m.TrainingHistoryPage })));
const TrainingReportsPage = lazy(() => import('@/modules/training/pages/TrainingReportsPage').then((m) => ({ default: m.TrainingReportsPage })));
const TrainingSettingsPage = lazy(() => import('@/modules/training/pages/TrainingSettingsPage').then((m) => ({ default: m.TrainingSettingsPage })));

export const trainingRoutes: RouteObject[] = [
  { path: 'training', element: <Navigate to="/training/dashboard" replace /> },
  { path: 'training/dashboard', element: wrap(<TrainingDashboardPage />) },
  { path: 'training/my-learning', element: wrap(<MyLearningPage />) },
  { path: 'training/catalog', element: wrap(<TrainingCatalogPage />) },
  { path: 'training/programs', element: wrap(<TrainingProgramsPage />) },
  { path: 'training/courses', element: wrap(<CoursesPage />) },
  { path: 'training/learning-paths', element: wrap(<LearningPathsPage />) },
  { path: 'training/calendar', element: wrap(<TrainingCalendarPage />) },
  { path: 'training/enrollments', element: wrap(<EnrollmentsPage />) },
  { path: 'training/attendance', element: wrap(<AttendancePage />) },
  { path: 'training/instructors', element: wrap(<InstructorsPage />) },
  { path: 'training/classrooms', element: wrap(<ClassroomsPage />) },
  { path: 'training/materials', element: wrap(<LearningMaterialsPage />) },
  { path: 'training/assessments', element: wrap(<TrainingAssessmentsPage />) },
  { path: 'training/examinations', element: wrap(<ExaminationsPage />) },
  { path: 'training/certifications', element: wrap(<TrainingCertificationsPage />) },
  { path: 'training/competencies', element: wrap(<CompetenciesPage />) },
  { path: 'training/requests', element: wrap(<TrainingRequestsPage />) },
  { path: 'training/approvals', element: wrap(<TrainingApprovalCenterPage />) },
  { path: 'training/history', element: wrap(<TrainingHistoryPage />) },
  { path: 'training/reports', element: wrap(<TrainingReportsPage />) },
  { path: 'training/settings', element: wrap(<TrainingSettingsPage />) },
];
