import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const PerformanceDashboardPage = lazy(() => import('@/modules/performance/pages/PerformanceDashboardPage').then((m) => ({ default: m.PerformanceDashboardPage })));
const MyPerformancePage = lazy(() => import('@/modules/performance/pages/MyPerformancePage').then((m) => ({ default: m.MyPerformancePage })));
const OrganizationalGoalsPage = lazy(() => import('@/modules/performance/pages/OrganizationalGoalsPage').then((m) => ({ default: m.OrganizationalGoalsPage })));
const DepartmentGoalsPage = lazy(() => import('@/modules/performance/pages/DepartmentGoalsPage').then((m) => ({ default: m.DepartmentGoalsPage })));
const IndividualObjectivesPage = lazy(() => import('@/modules/performance/pages/IndividualObjectivesPage').then((m) => ({ default: m.IndividualObjectivesPage })));
const KpiManagementPage = lazy(() => import('@/modules/performance/pages/KpiManagementPage').then((m) => ({ default: m.KpiManagementPage })));
const CompetencyEvaluationPage = lazy(() => import('@/modules/performance/pages/CompetencyEvaluationPage').then((m) => ({ default: m.CompetencyEvaluationPage })));
const PerformanceReviewsPage = lazy(() => import('@/modules/performance/pages/PerformanceReviewsPage').then((m) => ({ default: m.PerformanceReviewsPage })));
const ContinuousFeedbackPage = lazy(() => import('@/modules/performance/pages/ContinuousFeedbackPage').then((m) => ({ default: m.ContinuousFeedbackPage })));
const RecognitionAwardsPage = lazy(() => import('@/modules/performance/pages/RecognitionAwardsPage').then((m) => ({ default: m.RecognitionAwardsPage })));
const PerformanceImprovementPlansPage = lazy(() => import('@/modules/performance/pages/PerformanceImprovementPlansPage').then((m) => ({ default: m.PerformanceImprovementPlansPage })));
const DevelopmentPlansPage = lazy(() => import('@/modules/performance/pages/DevelopmentPlansPage').then((m) => ({ default: m.DevelopmentPlansPage })));
const CoachingMentoringPage = lazy(() => import('@/modules/performance/pages/CoachingMentoringPage').then((m) => ({ default: m.CoachingMentoringPage })));
const Feedback360Page = lazy(() => import('@/modules/performance/pages/Feedback360Page').then((m) => ({ default: m.Feedback360Page })));
const ReviewCyclesPage = lazy(() => import('@/modules/performance/pages/ReviewCyclesPage').then((m) => ({ default: m.ReviewCyclesPage })));
const PerformanceApprovalCenterPage = lazy(() => import('@/modules/performance/pages/PerformanceApprovalCenterPage').then((m) => ({ default: m.PerformanceApprovalCenterPage })));
const PerformanceReportsPage = lazy(() => import('@/modules/performance/pages/PerformanceReportsPage').then((m) => ({ default: m.PerformanceReportsPage })));
const PerformanceHistoryPage = lazy(() => import('@/modules/performance/pages/PerformanceHistoryPage').then((m) => ({ default: m.PerformanceHistoryPage })));
const PerformanceSettingsPage = lazy(() => import('@/modules/performance/pages/PerformanceSettingsPage').then((m) => ({ default: m.PerformanceSettingsPage })));

export const performanceRoutes: RouteObject[] = [
  { path: 'performance', element: <Navigate to="/performance/dashboard" replace /> },
  { path: 'performance/dashboard', element: wrap(<PerformanceDashboardPage />) },
  { path: 'performance/my-performance', element: wrap(<MyPerformancePage />) },
  { path: 'performance/org-goals', element: wrap(<OrganizationalGoalsPage />) },
  { path: 'performance/department-goals', element: wrap(<DepartmentGoalsPage />) },
  { path: 'performance/objectives', element: wrap(<IndividualObjectivesPage />) },
  { path: 'performance/kpis', element: wrap(<KpiManagementPage />) },
  { path: 'performance/competencies', element: wrap(<CompetencyEvaluationPage />) },
  { path: 'performance/reviews', element: wrap(<PerformanceReviewsPage />) },
  { path: 'performance/feedback', element: wrap(<ContinuousFeedbackPage />) },
  { path: 'performance/recognition', element: wrap(<RecognitionAwardsPage />) },
  { path: 'performance/pips', element: wrap(<PerformanceImprovementPlansPage />) },
  { path: 'performance/development-plans', element: wrap(<DevelopmentPlansPage />) },
  { path: 'performance/coaching', element: wrap(<CoachingMentoringPage />) },
  { path: 'performance/360-feedback', element: wrap(<Feedback360Page />) },
  { path: 'performance/review-cycles', element: wrap(<ReviewCyclesPage />) },
  { path: 'performance/approvals', element: wrap(<PerformanceApprovalCenterPage />) },
  { path: 'performance/reports', element: wrap(<PerformanceReportsPage />) },
  { path: 'performance/history', element: wrap(<PerformanceHistoryPage />) },
  { path: 'performance/settings', element: wrap(<PerformanceSettingsPage />) },
];
