import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute, PublicRoute, SuspenseFallback } from '@/app/guards/RouteGuards';
import { ROUTES } from '@/constants/app';

const LoginPage = lazy(() => import('@/modules/authentication/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const OtpPage = lazy(() => import('@/modules/authentication/pages/OtpPage').then((m) => ({ default: m.OtpPage })));
const SessionExpiredPage = lazy(() => import('@/modules/authentication/pages/AuthStatusPages').then((m) => ({ default: m.SessionExpiredPage })));
const ResetPasswordPage = lazy(() => import('@/modules/authentication/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));
const AccountLockedPage = lazy(() => import('@/modules/authentication/pages/AccountLockedPage').then((m) => ({ default: m.AccountLockedPage })));
const ChangePasswordPage = lazy(() => import('@/modules/authentication/pages/ChangePasswordPage').then((m) => ({ default: m.ChangePasswordPage })));
const SessionManagementPage = lazy(() => import('@/modules/authentication/pages/SessionManagementPage').then((m) => ({ default: m.SessionManagementPage })));
const LoginHistoryPage = lazy(() => import('@/modules/authentication/pages/LoginHistoryPage').then((m) => ({ default: m.LoginHistoryPage })));
const SecuritySettingsPage = lazy(() => import('@/modules/authentication/pages/SecuritySettingsPage').then((m) => ({ default: m.SecuritySettingsPage })));
const DeviceManagementPage = lazy(() => import('@/modules/authentication/pages/DeviceManagementPage').then((m) => ({ default: m.DeviceManagementPage })));
const UnauthorizedPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.UnauthorizedPage })));
const ForbiddenPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ForbiddenPage })));
const NotFoundPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.NotFoundPage })));
const ServerErrorPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ServerErrorPage })));
const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const CloudOverviewPage = lazy(() => import('@/modules/cloud/pages/CloudOverviewPage').then((m) => ({ default: m.CloudOverviewPage })));
const CloudServicesPage = lazy(() => import('@/modules/cloud/pages/CloudServicesPage').then((m) => ({ default: m.CloudServicesPage })));
const CloudEnvironmentsPage = lazy(() => import('@/modules/cloud/pages/CloudEnvironmentsPage').then((m) => ({ default: m.CloudEnvironmentsPage })));
const CloudGatewayPage = lazy(() => import('@/modules/cloud/pages/CloudGatewayPage').then((m) => ({ default: m.CloudGatewayPage })));
const CloudDeploymentsPage = lazy(() => import('@/modules/cloud/pages/CloudDeploymentsPage').then((m) => ({ default: m.CloudDeploymentsPage })));
const ServiceListPage = lazy(() => import('@/components/shared/ServiceListPage').then((m) => ({ default: m.ServiceListPage })));
const AuthorizationDashboardPage = lazy(() => import('@/modules/authorization/pages/AuthorizationDashboardPage').then((m) => ({ default: m.AuthorizationDashboardPage })));
const RolesPage = lazy(() => import('@/modules/authorization/pages/RolesPage').then((m) => ({ default: m.RolesPage })));
const PermissionsPage = lazy(() => import('@/modules/authorization/pages/PermissionsPage').then((m) => ({ default: m.PermissionsPage })));
const PermissionGroupsPage = lazy(() => import('@/modules/authorization/pages/PermissionGroupsPage').then((m) => ({ default: m.PermissionGroupsPage })));
const RoleHierarchyPage = lazy(() => import('@/modules/authorization/pages/RoleHierarchyPage').then((m) => ({ default: m.RoleHierarchyPage })));
const UserRoleAssignmentsPage = lazy(() => import('@/modules/authorization/pages/UserRoleAssignmentsPage').then((m) => ({ default: m.UserRoleAssignmentsPage })));
const ResourcePermissionsPage = lazy(() => import('@/modules/authorization/pages/ResourcePermissionsPage').then((m) => ({ default: m.ResourcePermissionsPage })));
const MenuPermissionsPage = lazy(() => import('@/modules/authorization/pages/MenuPermissionsPage').then((m) => ({ default: m.MenuPermissionsPage })));
const ActionPermissionsPage = lazy(() => import('@/modules/authorization/pages/ActionPermissionsPage').then((m) => ({ default: m.ActionPermissionsPage })));
const ApprovalLevelsPage = lazy(() => import('@/modules/authorization/pages/ApprovalLevelsPage').then((m) => ({ default: m.ApprovalLevelsPage })));
const DelegatedAccessPage = lazy(() => import('@/modules/authorization/pages/DelegatedAccessPage').then((m) => ({ default: m.DelegatedAccessPage })));
const AccessPoliciesPage = lazy(() => import('@/modules/authorization/pages/AccessPoliciesPage').then((m) => ({ default: m.AccessPoliciesPage })));
const AccessRequestsPage = lazy(() => import('@/modules/authorization/pages/AccessRequestsPage').then((m) => ({ default: m.AccessRequestsPage })));
const TemporaryAccessPage = lazy(() => import('@/modules/authorization/pages/TemporaryAccessPage').then((m) => ({ default: m.TemporaryAccessPage })));
const PermissionAuditPage = lazy(() => import('@/modules/authorization/pages/PermissionAuditPage').then((m) => ({ default: m.PermissionAuditPage })));
const AuthorizationSettingsPage = lazy(() => import('@/modules/authorization/pages/AuthorizationSettingsPage').then((m) => ({ default: m.AuthorizationSettingsPage })));
const UsersDashboardPage = lazy(() => import('@/modules/users/pages/UsersDashboardPage').then((m) => ({ default: m.UsersDashboardPage })));
const UsersListPage = lazy(() => import('@/modules/users/pages/UsersListPage').then((m) => ({ default: m.UsersListPage })));
const CreateUserPage = lazy(() => import('@/modules/users/pages/CreateUserPage').then((m) => ({ default: m.CreateUserPage })));
const UserDetailsPage = lazy(() => import('@/modules/users/pages/UserDetailsPage').then((m) => ({ default: m.UserDetailsPage })));
const EditUserPage = lazy(() => import('@/modules/users/pages/EditUserPage').then((m) => ({ default: m.EditUserPage })));
const OrganizationalAssignmentsPage = lazy(() => import('@/modules/users/pages/OrganizationalAssignmentsPage').then((m) => ({ default: m.OrganizationalAssignmentsPage })));
const UserStatusPage = lazy(() => import('@/modules/users/pages/UserStatusPage').then((m) => ({ default: m.UserStatusPage })));
const DepartmentsPage = lazy(() => import('@/modules/users/pages/DepartmentsPage').then((m) => ({ default: m.DepartmentsPage })));
const PositionsPage = lazy(() => import('@/modules/users/pages/PositionsPage').then((m) => ({ default: m.PositionsPage })));
const ProfileDocumentsPage = lazy(() => import('@/modules/users/pages/ProfileDocumentsPage').then((m) => ({ default: m.ProfileDocumentsPage })));
const UserPreferencesPage = lazy(() => import('@/modules/users/pages/UserPreferencesPage').then((m) => ({ default: m.UserPreferencesPage })));
const ImportUsersPage = lazy(() => import('@/modules/users/pages/ImportUsersPage').then((m) => ({ default: m.ImportUsersPage })));
const ExportUsersPage = lazy(() => import('@/modules/users/pages/ExportUsersPage').then((m) => ({ default: m.ExportUsersPage })));
const UserHistoryPage = lazy(() => import('@/modules/users/pages/UserHistoryPage').then((m) => ({ default: m.UserHistoryPage })));
const UserSettingsPage = lazy(() => import('@/modules/users/pages/UserSettingsPage').then((m) => ({ default: m.UserSettingsPage })));
const PersonnelDashboardPage = lazy(() => import('@/modules/personnel/pages/PersonnelDashboardPage').then((m) => ({ default: m.PersonnelDashboardPage })));
const PersonnelDirectoryPage = lazy(() => import('@/modules/personnel/pages/PersonnelDirectoryPage').then((m) => ({ default: m.PersonnelDirectoryPage })));
const PersonnelProfilePage = lazy(() => import('@/modules/personnel/pages/PersonnelProfilePage').then((m) => ({ default: m.PersonnelProfilePage })));
const RegisterPersonnelPage = lazy(() => import('@/modules/personnel/pages/RegisterPersonnelPage').then((m) => ({ default: m.RegisterPersonnelPage })));
const EditPersonnelPage = lazy(() => import('@/modules/personnel/pages/EditPersonnelPage').then((m) => ({ default: m.EditPersonnelPage })));
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
const RecruitmentDashboardPage = lazy(() => import('@/modules/recruitment/pages/RecruitmentDashboardPage').then((m) => ({ default: m.RecruitmentDashboardPage })));
const WorkforceRequestsPage = lazy(() => import('@/modules/recruitment/pages/WorkforceRequestsPage').then((m) => ({ default: m.WorkforceRequestsPage })));
const JobRequisitionsPage = lazy(() => import('@/modules/recruitment/pages/JobRequisitionsPage').then((m) => ({ default: m.JobRequisitionsPage })));
const VacancyManagementPage = lazy(() => import('@/modules/recruitment/pages/VacancyManagementPage').then((m) => ({ default: m.VacancyManagementPage })));
const JobAdvertisementsPage = lazy(() => import('@/modules/recruitment/pages/JobAdvertisementsPage').then((m) => ({ default: m.JobAdvertisementsPage })));
const CandidatePortalPage = lazy(() => import('@/modules/recruitment/pages/CandidatePortalPage').then((m) => ({ default: m.CandidatePortalPage })));
const ApplicationsPage = lazy(() => import('@/modules/recruitment/pages/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage })));
const CandidateProfilePage = lazy(() => import('@/modules/recruitment/pages/CandidateProfilePage').then((m) => ({ default: m.CandidateProfilePage })));
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
const LeaveDashboardPage = lazy(() => import('@/modules/leave/pages/LeaveDashboardPage').then((m) => ({ default: m.LeaveDashboardPage })));
const MyLeavePage = lazy(() => import('@/modules/leave/pages/MyLeavePage').then((m) => ({ default: m.MyLeavePage })));
const LeaveRequestsPage = lazy(() => import('@/modules/leave/pages/LeaveRequestsPage').then((m) => ({ default: m.LeaveRequestsPage })));
const RequestLeavePage = lazy(() => import('@/modules/leave/pages/RequestLeavePage').then((m) => ({ default: m.RequestLeavePage })));
const LeaveCalendarPage = lazy(() => import('@/modules/leave/pages/LeaveCalendarPage').then((m) => ({ default: m.LeaveCalendarPage })));
const TeamCalendarPage = lazy(() => import('@/modules/leave/pages/TeamCalendarPage').then((m) => ({ default: m.TeamCalendarPage })));
const LeaveBalancesPage = lazy(() => import('@/modules/leave/pages/LeaveBalancesPage').then((m) => ({ default: m.LeaveBalancesPage })));
const LeaveTypesPage = lazy(() => import('@/modules/leave/pages/LeaveTypesPage').then((m) => ({ default: m.LeaveTypesPage })));
const PublicHolidaysPage = lazy(() => import('@/modules/leave/pages/PublicHolidaysPage').then((m) => ({ default: m.PublicHolidaysPage })));
const ApprovalCenterPage = lazy(() => import('@/modules/leave/pages/ApprovalCenterPage').then((m) => ({ default: m.ApprovalCenterPage })));
const DelegationPage = lazy(() => import('@/modules/leave/pages/DelegationPage').then((m) => ({ default: m.DelegationPage })));
const LeaveAccrualPage = lazy(() => import('@/modules/leave/pages/LeaveAccrualPage').then((m) => ({ default: m.LeaveAccrualPage })));
const CarryOverPage = lazy(() => import('@/modules/leave/pages/CarryOverPage').then((m) => ({ default: m.CarryOverPage })));
const LeavePoliciesPage = lazy(() => import('@/modules/leave/pages/LeavePoliciesPage').then((m) => ({ default: m.LeavePoliciesPage })));
const LeaveHistoryPage = lazy(() => import('@/modules/leave/pages/LeaveHistoryPage').then((m) => ({ default: m.LeaveHistoryPage })));
const LeaveReportsPage = lazy(() => import('@/modules/leave/pages/LeaveReportsPage').then((m) => ({ default: m.LeaveReportsPage })));
const LeaveSettingsPage = lazy(() => import('@/modules/leave/pages/LeaveSettingsPage').then((m) => ({ default: m.LeaveSettingsPage })));
const WelfareDashboardPage = lazy(() => import('@/modules/welfare/pages/WelfareDashboardPage').then((m) => ({ default: m.WelfareDashboardPage })));
const MyWelfarePage = lazy(() => import('@/modules/welfare/pages/MyWelfarePage').then((m) => ({ default: m.MyWelfarePage })));
const WelfareProgramsPage = lazy(() => import('@/modules/welfare/pages/WelfareProgramsPage').then((m) => ({ default: m.WelfareProgramsPage })));
const BenefitManagementPage = lazy(() => import('@/modules/welfare/pages/BenefitManagementPage').then((m) => ({ default: m.BenefitManagementPage })));
const AssistanceRequestsPage = lazy(() => import('@/modules/welfare/pages/AssistanceRequestsPage').then((m) => ({ default: m.AssistanceRequestsPage })));
const NewAssistanceRequestPage = lazy(() => import('@/modules/welfare/pages/NewAssistanceRequestPage').then((m) => ({ default: m.NewAssistanceRequestPage })));
const EmergencySupportPage = lazy(() => import('@/modules/welfare/pages/EmergencySupportPage').then((m) => ({ default: m.EmergencySupportPage })));
const CounselingReferralsPage = lazy(() => import('@/modules/welfare/pages/CounselingReferralsPage').then((m) => ({ default: m.CounselingReferralsPage })));
const FamilySupportPage = lazy(() => import('@/modules/welfare/pages/FamilySupportPage').then((m) => ({ default: m.FamilySupportPage })));
const WellnessProgramsPage = lazy(() => import('@/modules/welfare/pages/WellnessProgramsPage').then((m) => ({ default: m.WellnessProgramsPage })));
const WelfareEventsPage = lazy(() => import('@/modules/welfare/pages/WelfareEventsPage').then((m) => ({ default: m.WelfareEventsPage })));
const WelfareApplicationsPage = lazy(() => import('@/modules/welfare/pages/WelfareApplicationsPage').then((m) => ({ default: m.WelfareApplicationsPage })));
const WelfareApprovalCenterPage = lazy(() => import('@/modules/welfare/pages/WelfareApprovalCenterPage').then((m) => ({ default: m.WelfareApprovalCenterPage })));
const WelfareDocumentsPage = lazy(() => import('@/modules/welfare/pages/WelfareDocumentsPage').then((m) => ({ default: m.WelfareDocumentsPage })));
const WelfareHistoryPage = lazy(() => import('@/modules/welfare/pages/WelfareHistoryPage').then((m) => ({ default: m.WelfareHistoryPage })));
const WelfareReportsPage = lazy(() => import('@/modules/welfare/pages/WelfareReportsPage').then((m) => ({ default: m.WelfareReportsPage })));
const WelfareSettingsPage = lazy(() => import('@/modules/welfare/pages/WelfareSettingsPage').then((m) => ({ default: m.WelfareSettingsPage })));
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

const wrap = (element: React.ReactNode) => (
  <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
);

const moduleRoute = (path: string, moduleKey: string): RouteObject => ({
  path,
  element: wrap(<ServiceListPage moduleKey={moduleKey} />),
});

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  {
    path: '/auth',
    children: [
      { path: 'login', element: wrap(<PublicRoute><LoginPage /></PublicRoute>) },
      { path: 'forgot-password', element: wrap(<PublicRoute><ForgotPasswordPage /></PublicRoute>) },
      { path: 'otp', element: wrap(<PublicRoute><OtpPage /></PublicRoute>) },
      { path: 'session-expired', element: wrap(<SessionExpiredPage />) },
      { path: 'account-locked', element: wrap(<AccountLockedPage />) },
      { path: 'reset-password', element: wrap(<PublicRoute><ResetPasswordPage /></PublicRoute>) },
    ],
  },
  { path: '/unauthorized', element: wrap(<UnauthorizedPage />) },
  { path: '/403', element: wrap(<ForbiddenPage />) },
  { path: '/404', element: wrap(<NotFoundPage />) },
  { path: '/500', element: wrap(<ServerErrorPage />) },
  {
    element: wrap(<ProtectedRoute><MainLayout /></ProtectedRoute>),
    children: [
      { path: 'dashboard', element: wrap(<DashboardPage />) },
      { path: 'auth/change-password', element: wrap(<ChangePasswordPage />) },
      { path: 'auth/sessions', element: wrap(<SessionManagementPage />) },
      { path: 'auth/login-history', element: wrap(<LoginHistoryPage />) },
      { path: 'auth/security', element: wrap(<SecuritySettingsPage />) },
      { path: 'auth/devices', element: wrap(<DeviceManagementPage />) },
      { path: 'cloud', element: wrap(<CloudOverviewPage />) },
      { path: 'cloud/services', element: wrap(<CloudServicesPage />) },
      { path: 'cloud/environments', element: wrap(<CloudEnvironmentsPage />) },
      { path: 'cloud/gateway', element: wrap(<CloudGatewayPage />) },
      { path: 'cloud/deployments', element: wrap(<CloudDeploymentsPage />) },
      moduleRoute('profile', 'user'),
      { path: 'users', element: <Navigate to="/users/dashboard" replace /> },
      { path: 'users/dashboard', element: wrap(<UsersDashboardPage />) },
      { path: 'users/list', element: wrap(<UsersListPage />) },
      { path: 'users/new', element: wrap(<CreateUserPage />) },
      { path: 'users/departments', element: wrap(<DepartmentsPage />) },
      { path: 'users/positions', element: wrap(<PositionsPage />) },
      { path: 'users/organization', element: wrap(<OrganizationalAssignmentsPage />) },
      { path: 'users/status', element: wrap(<UserStatusPage />) },
      { path: 'users/documents', element: wrap(<ProfileDocumentsPage />) },
      { path: 'users/preferences', element: wrap(<UserPreferencesPage />) },
      { path: 'users/import', element: wrap(<ImportUsersPage />) },
      { path: 'users/export', element: wrap(<ExportUsersPage />) },
      { path: 'users/history', element: wrap(<UserHistoryPage />) },
      { path: 'users/settings', element: wrap(<UserSettingsPage />) },
      { path: 'users/:id/edit', element: wrap(<EditUserPage />) },
      { path: 'users/:id', element: wrap(<UserDetailsPage />) },
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
      { path: 'recruitment', element: <Navigate to="/recruitment/dashboard" replace /> },
      { path: 'recruitment/dashboard', element: wrap(<RecruitmentDashboardPage />) },
      { path: 'recruitment/workforce-requests', element: wrap(<WorkforceRequestsPage />) },
      { path: 'recruitment/requisitions', element: wrap(<JobRequisitionsPage />) },
      { path: 'recruitment/vacancies', element: wrap(<VacancyManagementPage />) },
      { path: 'recruitment/advertisements', element: wrap(<JobAdvertisementsPage />) },
      { path: 'recruitment/candidate-portal', element: wrap(<CandidatePortalPage />) },
      { path: 'recruitment/applications', element: wrap(<ApplicationsPage />) },
      { path: 'recruitment/resumes', element: wrap(<ResumeManagementPage />) },
      { path: 'recruitment/screening', element: wrap(<ScreeningPage />) },
      { path: 'recruitment/shortlisting', element: wrap(<ShortlistingPage />) },
      { path: 'recruitment/assessments', element: wrap(<AssessmentsPage />) },
      { path: 'recruitment/interviews', element: wrap(<InterviewSchedulingPage />) },
      { path: 'recruitment/interview-panel', element: wrap(<InterviewPanelPage />) },
      { path: 'recruitment/evaluations', element: wrap(<CandidateEvaluationPage />) },
      { path: 'recruitment/background-verification', element: wrap(<BackgroundVerificationPage />) },
      { path: 'recruitment/offers', element: wrap(<OfferManagementPage />) },
      { path: 'recruitment/onboarding', element: wrap(<OnboardingPage />) },
      { path: 'recruitment/talent-pool', element: wrap(<TalentPoolPage />) },
      { path: 'recruitment/calendar', element: wrap(<RecruitmentCalendarPage />) },
      { path: 'recruitment/reports', element: wrap(<RecruitmentReportsPage />) },
      { path: 'recruitment/settings', element: wrap(<RecruitmentSettingsPage />) },
      { path: 'recruitment/candidates/:id', element: wrap(<CandidateProfilePage />) },
      { path: 'leave', element: <Navigate to="/leave/dashboard" replace /> },
      { path: 'leave/dashboard', element: wrap(<LeaveDashboardPage />) },
      { path: 'leave/my-leave', element: wrap(<MyLeavePage />) },
      { path: 'leave/requests', element: wrap(<LeaveRequestsPage />) },
      { path: 'leave/new', element: wrap(<RequestLeavePage />) },
      { path: 'leave/calendar', element: wrap(<LeaveCalendarPage />) },
      { path: 'leave/team-calendar', element: wrap(<TeamCalendarPage />) },
      { path: 'leave/balances', element: wrap(<LeaveBalancesPage />) },
      { path: 'leave/types', element: wrap(<LeaveTypesPage />) },
      { path: 'leave/holidays', element: wrap(<PublicHolidaysPage />) },
      { path: 'leave/approvals', element: wrap(<ApprovalCenterPage />) },
      { path: 'leave/delegation', element: wrap(<DelegationPage />) },
      { path: 'leave/accrual', element: wrap(<LeaveAccrualPage />) },
      { path: 'leave/carry-over', element: wrap(<CarryOverPage />) },
      { path: 'leave/policies', element: wrap(<LeavePoliciesPage />) },
      { path: 'leave/history', element: wrap(<LeaveHistoryPage />) },
      { path: 'leave/reports', element: wrap(<LeaveReportsPage />) },
      { path: 'leave/settings', element: wrap(<LeaveSettingsPage />) },
      { path: 'welfare', element: <Navigate to="/welfare/dashboard" replace /> },
      { path: 'welfare/dashboard', element: wrap(<WelfareDashboardPage />) },
      { path: 'welfare/my-welfare', element: wrap(<MyWelfarePage />) },
      { path: 'welfare/programs', element: wrap(<WelfareProgramsPage />) },
      { path: 'welfare/benefits', element: wrap(<BenefitManagementPage />) },
      { path: 'welfare/assistance/new', element: wrap(<NewAssistanceRequestPage />) },
      { path: 'welfare/assistance', element: wrap(<AssistanceRequestsPage />) },
      { path: 'welfare/emergency', element: wrap(<EmergencySupportPage />) },
      { path: 'welfare/counseling', element: wrap(<CounselingReferralsPage />) },
      { path: 'welfare/family-support', element: wrap(<FamilySupportPage />) },
      { path: 'welfare/wellness', element: wrap(<WellnessProgramsPage />) },
      { path: 'welfare/events', element: wrap(<WelfareEventsPage />) },
      { path: 'welfare/applications', element: wrap(<WelfareApplicationsPage />) },
      { path: 'welfare/approvals', element: wrap(<WelfareApprovalCenterPage />) },
      { path: 'welfare/documents', element: wrap(<WelfareDocumentsPage />) },
      { path: 'welfare/history', element: wrap(<WelfareHistoryPage />) },
      { path: 'welfare/reports', element: wrap(<WelfareReportsPage />) },
      { path: 'welfare/settings', element: wrap(<WelfareSettingsPage />) },
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
      moduleRoute('performance/*', 'performance'),
      moduleRoute('assets/*', 'asset'),
      moduleRoute('inventory/*', 'inventory'),
      moduleRoute('logistics/*', 'logistics'),
      moduleRoute('procurement/*', 'procurement'),
      moduleRoute('fleet/*', 'fleet'),
      moduleRoute('maintenance/*', 'maintenance'),
      moduleRoute('facilities/*', 'facilities'),
      moduleRoute('finance/*', 'finance'),
      moduleRoute('visitors/*', 'visitor'),
      moduleRoute('workflow/*', 'workflow'),
      moduleRoute('calendar/*', 'calendar'),
      moduleRoute('reports/*', 'reporting'),
      moduleRoute('analytics/*', 'analytics'),
      moduleRoute('business-intelligence/*', 'business-intelligence'),
      moduleRoute('notifications/*', 'notification'),
      moduleRoute('messaging/*', 'messaging'),
      moduleRoute('search/*', 'search'),
      moduleRoute('ai-assistant/*', 'ai-assistant'),
      moduleRoute('settings/*', 'settings'),
      { path: 'administration/authorization', element: wrap(<AuthorizationDashboardPage />) },
      { path: 'administration/roles', element: wrap(<RolesPage />) },
      { path: 'administration/permissions', element: wrap(<PermissionsPage />) },
      { path: 'administration/permission-groups', element: wrap(<PermissionGroupsPage />) },
      { path: 'administration/role-hierarchy', element: wrap(<RoleHierarchyPage />) },
      { path: 'administration/assignments', element: wrap(<UserRoleAssignmentsPage />) },
      { path: 'administration/resource-permissions', element: wrap(<ResourcePermissionsPage />) },
      { path: 'administration/menu-permissions', element: wrap(<MenuPermissionsPage />) },
      { path: 'administration/action-permissions', element: wrap(<ActionPermissionsPage />) },
      { path: 'administration/approval-levels', element: wrap(<ApprovalLevelsPage />) },
      { path: 'administration/delegated-access', element: wrap(<DelegatedAccessPage />) },
      { path: 'administration/access-policies', element: wrap(<AccessPoliciesPage />) },
      { path: 'administration/access-requests', element: wrap(<AccessRequestsPage />) },
      { path: 'administration/temporary-access', element: wrap(<TemporaryAccessPage />) },
      { path: 'administration/permission-audit', element: wrap(<PermissionAuditPage />) },
      { path: 'administration/authorization-settings', element: wrap(<AuthorizationSettingsPage />) },
      moduleRoute('administration/*', 'configuration'),
      moduleRoute('audit-logs/*', 'audit'),
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
