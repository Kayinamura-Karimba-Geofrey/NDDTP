import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const RecruitmentDashboardPage = lazy(() => import('@/modules/recruitment/pages/RecruitmentDashboardPage').then((m) => ({ default: m.RecruitmentDashboardPage })));
const WorkforceRequestsPage = lazy(() => import('@/modules/recruitment/pages/WorkforceRequestsPage').then((m) => ({ default: m.WorkforceRequestsPage })));
const JobRequisitionsPage = lazy(() => import('@/modules/recruitment/pages/JobRequisitionsPage').then((m) => ({ default: m.JobRequisitionsPage })));
const VacancyManagementPage = lazy(() => import('@/modules/recruitment/pages/VacancyManagementPage').then((m) => ({ default: m.VacancyManagementPage })));
const JobAdvertisementsPage = lazy(() => import('@/modules/recruitment/pages/JobAdvertisementsPage').then((m) => ({ default: m.JobAdvertisementsPage })));
const CandidatePortalPage = lazy(() => import('@/modules/recruitment/pages/CandidatePortalPage').then((m) => ({ default: m.CandidatePortalPage })));
const ApplicationsPage = lazy(() => import('@/modules/recruitment/pages/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage })));
const ResumeManagementPage = lazy(() => import('@/modules/recruitment/pages/ResumeManagementPage').then((m) => ({ default: m.ResumeManagementPage })));
const ScreeningPage = lazy(() => import('@/modules/recruitment/pages/ScreeningPage').then((m) => ({ default: m.ScreeningPage })));
const ShortlistingPage = lazy(() => import('@/modules/recruitment/pages/ShortlistingPage').then((m) => ({ default: m.ShortlistingPage })));
const AssessmentsPage = lazy(() => import('@/modules/recruitment/pages/AssessmentsPage').then((m) => ({ default: m.AssessmentsPage })));
const InterviewSchedulingPage = lazy(() => import('@/modules/recruitment/pages/InterviewSchedulingPage').then((m) => ({ default: m.InterviewSchedulingPage })));
const InterviewPanelPage = lazy(() => import('@/modules/recruitment/pages/InterviewPanelPage').then((m) => ({ default: m.InterviewPanelPage })));
const CandidateEvaluationPage = lazy(() => import('@/modules/recruitment/pages/CandidateEvaluationPage').then((m) => ({ default: m.CandidateEvaluationPage })));
const BackgroundVerificationPage = lazy(() => import('@/modules/recruitment/pages/BackgroundVerificationPage').then((m) => ({ default: m.BackgroundVerificationPage })));
const OfferManagementPage = lazy(() => import('@/modules/recruitment/pages/OfferManagementPage').then((m) => ({ default: m.OfferManagementPage })));
const OnboardingPage = lazy(() => import('@/modules/recruitment/pages/OnboardingPage').then((m) => ({ default: m.OnboardingPage })));
const TalentPoolPage = lazy(() => import('@/modules/recruitment/pages/TalentPoolPage').then((m) => ({ default: m.TalentPoolPage })));
const RecruitmentCalendarPage = lazy(() => import('@/modules/recruitment/pages/RecruitmentCalendarPage').then((m) => ({ default: m.RecruitmentCalendarPage })));
const RecruitmentReportsPage = lazy(() => import('@/modules/recruitment/pages/RecruitmentReportsPage').then((m) => ({ default: m.RecruitmentReportsPage })));
const RecruitmentSettingsPage = lazy(() => import('@/modules/recruitment/pages/RecruitmentSettingsPage').then((m) => ({ default: m.RecruitmentSettingsPage })));
const CandidateProfilePage = lazy(() => import('@/modules/recruitment/pages/CandidateProfilePage').then((m) => ({ default: m.CandidateProfilePage })));

import { ProtectedRoute } from '@/app/guards/RouteGuards';
import { Outlet } from 'react-router-dom';

export const recruitmentRoutes: RouteObject[] = [
  {
    path: 'recruitment',
    element: wrap(
      <ProtectedRoute roles={['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER', 'RECRUITER']}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: wrap(<RecruitmentDashboardPage />) },
      { path: 'workforce-requests', element: wrap(<WorkforceRequestsPage />) },
      { path: 'requisitions', element: wrap(<JobRequisitionsPage />) },
      { path: 'vacancies', element: wrap(<VacancyManagementPage />) },
      { path: 'advertisements', element: wrap(<JobAdvertisementsPage />) },
      { path: 'candidate-portal', element: wrap(<CandidatePortalPage />) },
      { path: 'applications', element: wrap(<ApplicationsPage />) },
      { path: 'resumes', element: wrap(<ResumeManagementPage />) },
      { path: 'screening', element: wrap(<ScreeningPage />) },
      { path: 'shortlisting', element: wrap(<ShortlistingPage />) },
      { path: 'assessments', element: wrap(<AssessmentsPage />) },
      { path: 'interviews', element: wrap(<InterviewSchedulingPage />) },
      { path: 'interview-panel', element: wrap(<InterviewPanelPage />) },
      { path: 'evaluations', element: wrap(<CandidateEvaluationPage />) },
      { path: 'background-verification', element: wrap(<BackgroundVerificationPage />) },
      { path: 'offers', element: wrap(<OfferManagementPage />) },
      { path: 'onboarding', element: wrap(<OnboardingPage />) },
      { path: 'talent-pool', element: wrap(<TalentPoolPage />) },
      { path: 'calendar', element: wrap(<RecruitmentCalendarPage />) },
      { path: 'reports', element: wrap(<RecruitmentReportsPage />) },
      { path: 'settings', element: wrap(<RecruitmentSettingsPage />) },
      { path: 'candidates/:id', element: wrap(<CandidateProfilePage />) },
    ],
  },
];
