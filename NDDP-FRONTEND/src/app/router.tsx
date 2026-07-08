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
const AssetDashboardPage = lazy(() => import('@/modules/assets/pages/AssetDashboardPage').then((m) => ({ default: m.AssetDashboardPage })));
const AssetRegistryPage = lazy(() => import('@/modules/assets/pages/AssetRegistryPage').then((m) => ({ default: m.AssetRegistryPage })));
const AssetCategoriesPage = lazy(() => import('@/modules/assets/pages/AssetCategoriesPage').then((m) => ({ default: m.AssetCategoriesPage })));
const AssetTypesPage = lazy(() => import('@/modules/assets/pages/AssetTypesPage').then((m) => ({ default: m.AssetTypesPage })));
const AssetProfileDetailPage = lazy(() => import('@/modules/assets/pages/AssetProfileDetailPage').then((m) => ({ default: m.AssetProfileDetailPage })));
const AssetAssignmentPage = lazy(() => import('@/modules/assets/pages/AssetAssignmentPage').then((m) => ({ default: m.AssetAssignmentPage })));
const AssetTransfersPage = lazy(() => import('@/modules/assets/pages/AssetTransfersPage').then((m) => ({ default: m.AssetTransfersPage })));
const AssetReturnsPage = lazy(() => import('@/modules/assets/pages/AssetReturnsPage').then((m) => ({ default: m.AssetReturnsPage })));
const MaintenanceManagementPage = lazy(() => import('@/modules/assets/pages/MaintenanceManagementPage').then((m) => ({ default: m.MaintenanceManagementPage })));
const InspectionManagementPage = lazy(() => import('@/modules/assets/pages/InspectionManagementPage').then((m) => ({ default: m.InspectionManagementPage })));
const WarrantyManagementPage = lazy(() => import('@/modules/assets/pages/WarrantyManagementPage').then((m) => ({ default: m.WarrantyManagementPage })));
const AssetLifecyclePage = lazy(() => import('@/modules/assets/pages/AssetLifecyclePage').then((m) => ({ default: m.AssetLifecyclePage })));
const AssetDocumentsPage = lazy(() => import('@/modules/assets/pages/AssetDocumentsPage').then((m) => ({ default: m.AssetDocumentsPage })));
const AssetAuditPage = lazy(() => import('@/modules/assets/pages/AssetAuditPage').then((m) => ({ default: m.AssetAuditPage })));
const AssetDisposalPage = lazy(() => import('@/modules/assets/pages/AssetDisposalPage').then((m) => ({ default: m.AssetDisposalPage })));
const AssetReservationsPage = lazy(() => import('@/modules/assets/pages/AssetReservationsPage').then((m) => ({ default: m.AssetReservationsPage })));
const BarcodeManagementPage = lazy(() => import('@/modules/assets/pages/BarcodeManagementPage').then((m) => ({ default: m.BarcodeManagementPage })));
const AssetReportsPage = lazy(() => import('@/modules/assets/pages/AssetReportsPage').then((m) => ({ default: m.AssetReportsPage })));
const AssetSettingsPage = lazy(() => import('@/modules/assets/pages/AssetSettingsPage').then((m) => ({ default: m.AssetSettingsPage })));
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
const FinanceDashboardPage = lazy(() => import('@/modules/finance/pages/FinanceDashboardPage').then((m) => ({ default: m.FinanceDashboardPage })));
const FiscalYearsPage = lazy(() => import('@/modules/finance/pages/FiscalYearsPage').then((m) => ({ default: m.FiscalYearsPage })));
const BudgetPlanningPage = lazy(() => import('@/modules/finance/pages/BudgetPlanningPage').then((m) => ({ default: m.BudgetPlanningPage })));
const BudgetAllocationPage = lazy(() => import('@/modules/finance/pages/BudgetAllocationPage').then((m) => ({ default: m.BudgetAllocationPage })));
const BudgetTransfersPage = lazy(() => import('@/modules/finance/pages/BudgetTransfersPage').then((m) => ({ default: m.BudgetTransfersPage })));
const BudgetMonitoringPage = lazy(() => import('@/modules/finance/pages/BudgetMonitoringPage').then((m) => ({ default: m.BudgetMonitoringPage })));
const CostCentersPage = lazy(() => import('@/modules/finance/pages/CostCentersPage').then((m) => ({ default: m.CostCentersPage })));
const ProgramsProjectsPage = lazy(() => import('@/modules/finance/pages/ProgramsProjectsPage').then((m) => ({ default: m.ProgramsProjectsPage })));
const CommitmentsPage = lazy(() => import('@/modules/finance/pages/CommitmentsPage').then((m) => ({ default: m.CommitmentsPage })));
const ExpenditureManagementPage = lazy(() => import('@/modules/finance/pages/ExpenditureManagementPage').then((m) => ({ default: m.ExpenditureManagementPage })));
const InvoiceManagementPage = lazy(() => import('@/modules/finance/pages/InvoiceManagementPage').then((m) => ({ default: m.InvoiceManagementPage })));
const PaymentManagementPage = lazy(() => import('@/modules/finance/pages/PaymentManagementPage').then((m) => ({ default: m.PaymentManagementPage })));
const AccountsPayablePage = lazy(() => import('@/modules/finance/pages/AccountsPayablePage').then((m) => ({ default: m.AccountsPayablePage })));
const AccountsReceivablePage = lazy(() => import('@/modules/finance/pages/AccountsReceivablePage').then((m) => ({ default: m.AccountsReceivablePage })));
const RevenueManagementPage = lazy(() => import('@/modules/finance/pages/RevenueManagementPage').then((m) => ({ default: m.RevenueManagementPage })));
const FinanceApprovalCenterPage = lazy(() => import('@/modules/finance/pages/FinanceApprovalCenterPage').then((m) => ({ default: m.FinanceApprovalCenterPage })));
const FinanceCalendarPage = lazy(() => import('@/modules/finance/pages/FinanceCalendarPage').then((m) => ({ default: m.FinanceCalendarPage })));
const FinanceReportsPage = lazy(() => import('@/modules/finance/pages/FinanceReportsPage').then((m) => ({ default: m.FinanceReportsPage })));
const FinanceSettingsPage = lazy(() => import('@/modules/finance/pages/FinanceSettingsPage').then((m) => ({ default: m.FinanceSettingsPage })));
const FinanceAuditPage = lazy(() => import('@/modules/finance/pages/FinanceAuditPage').then((m) => ({ default: m.FinanceAuditPage })));
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
const DmsDashboardPage = lazy(() => import('@/modules/dms/pages/DmsDashboardPage').then((m) => ({ default: m.DmsDashboardPage })));
const DocumentLibraryPage = lazy(() => import('@/modules/dms/pages/DocumentLibraryPage').then((m) => ({ default: m.DocumentLibraryPage })));
const MyDocumentsPage = lazy(() => import('@/modules/dms/pages/MyDocumentsPage').then((m) => ({ default: m.MyDocumentsPage })));
const SharedDocumentsPage = lazy(() => import('@/modules/dms/pages/SharedDocumentsPage').then((m) => ({ default: m.SharedDocumentsPage })));
const RecentDocumentsPage = lazy(() => import('@/modules/dms/pages/RecentDocumentsPage').then((m) => ({ default: m.RecentDocumentsPage })));
const FoldersCategoriesPage = lazy(() => import('@/modules/dms/pages/FoldersCategoriesPage').then((m) => ({ default: m.FoldersCategoriesPage })));
const DocumentUploadPage = lazy(() => import('@/modules/dms/pages/DocumentUploadPage').then((m) => ({ default: m.DocumentUploadPage })));
const DocumentViewerPage = lazy(() => import('@/modules/dms/pages/DocumentViewerPage').then((m) => ({ default: m.DocumentViewerPage })));
const VersionHistoryPage = lazy(() => import('@/modules/dms/pages/VersionHistoryPage').then((m) => ({ default: m.VersionHistoryPage })));
const MetadataManagementPage = lazy(() => import('@/modules/dms/pages/MetadataManagementPage').then((m) => ({ default: m.MetadataManagementPage })));
const DigitalSignaturesPage = lazy(() => import('@/modules/dms/pages/DigitalSignaturesPage').then((m) => ({ default: m.DigitalSignaturesPage })));
const ApprovalWorkflowsPage = lazy(() => import('@/modules/dms/pages/ApprovalWorkflowsPage').then((m) => ({ default: m.ApprovalWorkflowsPage })));
const RecordsRetentionPage = lazy(() => import('@/modules/dms/pages/RecordsRetentionPage').then((m) => ({ default: m.RecordsRetentionPage })));
const ArchiveDisposalPage = lazy(() => import('@/modules/dms/pages/ArchiveDisposalPage').then((m) => ({ default: m.ArchiveDisposalPage })));
const FullTextSearchPage = lazy(() => import('@/modules/dms/pages/FullTextSearchPage').then((m) => ({ default: m.FullTextSearchPage })));
const AccessPermissionsPage = lazy(() => import('@/modules/dms/pages/AccessPermissionsPage').then((m) => ({ default: m.AccessPermissionsPage })));
const DocumentAuditPage = lazy(() => import('@/modules/dms/pages/DocumentAuditPage').then((m) => ({ default: m.DocumentAuditPage })));
const DmsReportsPage = lazy(() => import('@/modules/dms/pages/DmsReportsPage').then((m) => ({ default: m.DmsReportsPage })));
const DmsSettingsPage = lazy(() => import('@/modules/dms/pages/DmsSettingsPage').then((m) => ({ default: m.DmsSettingsPage })));
const WorkflowDashboardPage = lazy(() => import('@/modules/workflow/pages/WorkflowDashboardPage').then((m) => ({ default: m.WorkflowDashboardPage })));
const WorkflowTemplatesPage = lazy(() => import('@/modules/workflow/pages/WorkflowTemplatesPage').then((m) => ({ default: m.WorkflowTemplatesPage })));
const WorkflowDesignerPage = lazy(() => import('@/modules/workflow/pages/WorkflowDesignerPage').then((m) => ({ default: m.WorkflowDesignerPage })));
const BusinessRulesPage = lazy(() => import('@/modules/workflow/pages/BusinessRulesPage').then((m) => ({ default: m.BusinessRulesPage })));
const ApprovalChainsPage = lazy(() => import('@/modules/workflow/pages/ApprovalChainsPage').then((m) => ({ default: m.ApprovalChainsPage })));
const RunningWorkflowsPage = lazy(() => import('@/modules/workflow/pages/RunningWorkflowsPage').then((m) => ({ default: m.RunningWorkflowsPage })));
const PendingTasksPage = lazy(() => import('@/modules/workflow/pages/PendingTasksPage').then((m) => ({ default: m.PendingTasksPage })));
const MyApprovalsPage = lazy(() => import('@/modules/workflow/pages/MyApprovalsPage').then((m) => ({ default: m.MyApprovalsPage })));
const DelegationManagementPage = lazy(() => import('@/modules/workflow/pages/DelegationManagementPage').then((m) => ({ default: m.DelegationManagementPage })));
const EscalationManagementPage = lazy(() => import('@/modules/workflow/pages/EscalationManagementPage').then((m) => ({ default: m.EscalationManagementPage })));
const SlaManagementPage = lazy(() => import('@/modules/workflow/pages/SlaManagementPage').then((m) => ({ default: m.SlaManagementPage })));
const AutomationRulesPage = lazy(() => import('@/modules/workflow/pages/AutomationRulesPage').then((m) => ({ default: m.AutomationRulesPage })));
const WorkflowNotificationsPage = lazy(() => import('@/modules/workflow/pages/WorkflowNotificationsPage').then((m) => ({ default: m.WorkflowNotificationsPage })));
const ProcessHistoryPage = lazy(() => import('@/modules/workflow/pages/ProcessHistoryPage').then((m) => ({ default: m.ProcessHistoryPage })));
const WorkflowAnalyticsPage = lazy(() => import('@/modules/workflow/pages/WorkflowAnalyticsPage').then((m) => ({ default: m.WorkflowAnalyticsPage })));
const WorkflowReportsPage = lazy(() => import('@/modules/workflow/pages/WorkflowReportsPage').then((m) => ({ default: m.WorkflowReportsPage })));
const ApiIntegrationsPage = lazy(() => import('@/modules/workflow/pages/ApiIntegrationsPage').then((m) => ({ default: m.ApiIntegrationsPage })));
const WorkflowSettingsPage = lazy(() => import('@/modules/workflow/pages/WorkflowSettingsPage').then((m) => ({ default: m.WorkflowSettingsPage })));
const NotificationDashboardPage = lazy(() => import('@/modules/notification/pages/NotificationDashboardPage').then((m) => ({ default: m.NotificationDashboardPage })));
const NotificationCenterPage = lazy(() => import('@/modules/notification/pages/NotificationCenterPage').then((m) => ({ default: m.NotificationCenterPage })));
const MyNotificationsPage = lazy(() => import('@/modules/notification/pages/MyNotificationsPage').then((m) => ({ default: m.MyNotificationsPage })));
const NotificationAnnouncementsPage = lazy(() => import('@/modules/notification/pages/NotificationAnnouncementsPage').then((m) => ({ default: m.NotificationAnnouncementsPage })));
const BroadcastMessagesPage = lazy(() => import('@/modules/notification/pages/BroadcastMessagesPage').then((m) => ({ default: m.BroadcastMessagesPage })));
const EmailTemplatesPage = lazy(() => import('@/modules/notification/pages/EmailTemplatesPage').then((m) => ({ default: m.EmailTemplatesPage })));
const SmsTemplatesPage = lazy(() => import('@/modules/notification/pages/SmsTemplatesPage').then((m) => ({ default: m.SmsTemplatesPage })));
const PushTemplatesPage = lazy(() => import('@/modules/notification/pages/PushTemplatesPage').then((m) => ({ default: m.PushTemplatesPage })));
const NotificationTemplatesPage = lazy(() => import('@/modules/notification/pages/NotificationTemplatesPage').then((m) => ({ default: m.NotificationTemplatesPage })));
const ScheduledNotificationsPage = lazy(() => import('@/modules/notification/pages/ScheduledNotificationsPage').then((m) => ({ default: m.ScheduledNotificationsPage })));
const ReminderEnginePage = lazy(() => import('@/modules/notification/pages/ReminderEnginePage').then((m) => ({ default: m.ReminderEnginePage })));
const NotificationPreferencesPage = lazy(() => import('@/modules/notification/pages/NotificationPreferencesPage').then((m) => ({ default: m.NotificationPreferencesPage })));
const DeliveryTrackingPage = lazy(() => import('@/modules/notification/pages/DeliveryTrackingPage').then((m) => ({ default: m.DeliveryTrackingPage })));
const FailedDeliveriesPage = lazy(() => import('@/modules/notification/pages/FailedDeliveriesPage').then((m) => ({ default: m.FailedDeliveriesPage })));
const RetryQueuePage = lazy(() => import('@/modules/notification/pages/RetryQueuePage').then((m) => ({ default: m.RetryQueuePage })));
const CommunicationHistoryPage = lazy(() => import('@/modules/notification/pages/CommunicationHistoryPage').then((m) => ({ default: m.CommunicationHistoryPage })));
const NotificationReportsPage = lazy(() => import('@/modules/notification/pages/NotificationReportsPage').then((m) => ({ default: m.NotificationReportsPage })));
const NotificationIntegrationsPage = lazy(() => import('@/modules/notification/pages/NotificationIntegrationsPage').then((m) => ({ default: m.NotificationIntegrationsPage })));
const NotificationSettingsPage = lazy(() => import('@/modules/notification/pages/NotificationSettingsPage').then((m) => ({ default: m.NotificationSettingsPage })));
const ExecutiveDashboardPage = lazy(() => import('@/modules/reporting/pages/ExecutiveDashboardPage').then((m) => ({ default: m.ExecutiveDashboardPage })));
const OperationalDashboardsPage = lazy(() => import('@/modules/reporting/pages/OperationalDashboardsPage').then((m) => ({ default: m.OperationalDashboardsPage })));
const ReportingKpiManagementPage = lazy(() => import('@/modules/reporting/pages/ReportingKpiManagementPage').then((m) => ({ default: m.ReportingKpiManagementPage })));
const ReportLibraryPage = lazy(() => import('@/modules/reporting/pages/ReportLibraryPage').then((m) => ({ default: m.ReportLibraryPage })));
const ReportBuilderPage = lazy(() => import('@/modules/reporting/pages/ReportBuilderPage').then((m) => ({ default: m.ReportBuilderPage })));
const ScheduledReportsPage = lazy(() => import('@/modules/reporting/pages/ScheduledReportsPage').then((m) => ({ default: m.ScheduledReportsPage })));
const ReportSubscriptionsPage = lazy(() => import('@/modules/reporting/pages/ReportSubscriptionsPage').then((m) => ({ default: m.ReportSubscriptionsPage })));
const DataExplorerPage = lazy(() => import('@/modules/reporting/pages/DataExplorerPage').then((m) => ({ default: m.DataExplorerPage })));
const AdvancedAnalyticsPage = lazy(() => import('@/modules/reporting/pages/AdvancedAnalyticsPage').then((m) => ({ default: m.AdvancedAnalyticsPage })));
const ForecastingPage = lazy(() => import('@/modules/reporting/pages/ForecastingPage').then((m) => ({ default: m.ForecastingPage })));
const GeographicAnalyticsPage = lazy(() => import('@/modules/reporting/pages/GeographicAnalyticsPage').then((m) => ({ default: m.GeographicAnalyticsPage })));
const ComparativeAnalysisPage = lazy(() => import('@/modules/reporting/pages/ComparativeAnalysisPage').then((m) => ({ default: m.ComparativeAnalysisPage })));
const DataExportsPage = lazy(() => import('@/modules/reporting/pages/DataExportsPage').then((m) => ({ default: m.DataExportsPage })));
const AuditReportsPage = lazy(() => import('@/modules/reporting/pages/AuditReportsPage').then((m) => ({ default: m.AuditReportsPage })));
const DashboardDesignerPage = lazy(() => import('@/modules/reporting/pages/DashboardDesignerPage').then((m) => ({ default: m.DashboardDesignerPage })));
const BiIntegrationsPage = lazy(() => import('@/modules/reporting/pages/BiIntegrationsPage').then((m) => ({ default: m.BiIntegrationsPage })));
const ReportHistoryPage = lazy(() => import('@/modules/reporting/pages/ReportHistoryPage').then((m) => ({ default: m.ReportHistoryPage })));
const ReportingSettingsPage = lazy(() => import('@/modules/reporting/pages/ReportingSettingsPage').then((m) => ({ default: m.ReportingSettingsPage })));

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
      { path: 'assets', element: <Navigate to="/assets/dashboard" replace /> },
      { path: 'assets/dashboard', element: wrap(<AssetDashboardPage />) },
      { path: 'assets/registry', element: wrap(<AssetRegistryPage />) },
      { path: 'assets/categories', element: wrap(<AssetCategoriesPage />) },
      { path: 'assets/types', element: wrap(<AssetTypesPage />) },
      { path: 'assets/profiles/:id', element: wrap(<AssetProfileDetailPage />) },
      { path: 'assets/assignment', element: wrap(<AssetAssignmentPage />) },
      { path: 'assets/transfers', element: wrap(<AssetTransfersPage />) },
      { path: 'assets/returns', element: wrap(<AssetReturnsPage />) },
      { path: 'assets/maintenance', element: wrap(<MaintenanceManagementPage />) },
      { path: 'assets/inspections', element: wrap(<InspectionManagementPage />) },
      { path: 'assets/warranty', element: wrap(<WarrantyManagementPage />) },
      { path: 'assets/lifecycle', element: wrap(<AssetLifecyclePage />) },
      { path: 'assets/documents', element: wrap(<AssetDocumentsPage />) },
      { path: 'assets/audit', element: wrap(<AssetAuditPage />) },
      { path: 'assets/disposal', element: wrap(<AssetDisposalPage />) },
      { path: 'assets/reservations', element: wrap(<AssetReservationsPage />) },
      { path: 'assets/barcodes', element: wrap(<BarcodeManagementPage />) },
      { path: 'assets/reports', element: wrap(<AssetReportsPage />) },
      { path: 'assets/settings', element: wrap(<AssetSettingsPage />) },
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
      { path: 'finance', element: <Navigate to="/finance/dashboard" replace /> },
      { path: 'finance/dashboard', element: wrap(<FinanceDashboardPage />) },
      { path: 'finance/fiscal-years', element: wrap(<FiscalYearsPage />) },
      { path: 'finance/budget-planning', element: wrap(<BudgetPlanningPage />) },
      { path: 'finance/budget-allocation', element: wrap(<BudgetAllocationPage />) },
      { path: 'finance/budget-transfers', element: wrap(<BudgetTransfersPage />) },
      { path: 'finance/budget-monitoring', element: wrap(<BudgetMonitoringPage />) },
      { path: 'finance/cost-centers', element: wrap(<CostCentersPage />) },
      { path: 'finance/programs', element: wrap(<ProgramsProjectsPage />) },
      { path: 'finance/commitments', element: wrap(<CommitmentsPage />) },
      { path: 'finance/expenditures', element: wrap(<ExpenditureManagementPage />) },
      { path: 'finance/invoices', element: wrap(<InvoiceManagementPage />) },
      { path: 'finance/payments', element: wrap(<PaymentManagementPage />) },
      { path: 'finance/accounts-payable', element: wrap(<AccountsPayablePage />) },
      { path: 'finance/accounts-receivable', element: wrap(<AccountsReceivablePage />) },
      { path: 'finance/revenue', element: wrap(<RevenueManagementPage />) },
      { path: 'finance/approvals', element: wrap(<FinanceApprovalCenterPage />) },
      { path: 'finance/calendar', element: wrap(<FinanceCalendarPage />) },
      { path: 'finance/reports', element: wrap(<FinanceReportsPage />) },
      { path: 'finance/settings', element: wrap(<FinanceSettingsPage />) },
      { path: 'finance/audit', element: wrap(<FinanceAuditPage />) },
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
      moduleRoute('logistics/*', 'logistics'),
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
      { path: 'dms', element: <Navigate to="/dms/dashboard" replace /> },
      { path: 'dms/dashboard', element: wrap(<DmsDashboardPage />) },
      { path: 'dms/library', element: wrap(<DocumentLibraryPage />) },
      { path: 'dms/my-documents', element: wrap(<MyDocumentsPage />) },
      { path: 'dms/shared', element: wrap(<SharedDocumentsPage />) },
      { path: 'dms/recent', element: wrap(<RecentDocumentsPage />) },
      { path: 'dms/folders', element: wrap(<FoldersCategoriesPage />) },
      { path: 'dms/upload', element: wrap(<DocumentUploadPage />) },
      { path: 'dms/documents/:id', element: wrap(<DocumentViewerPage />) },
      { path: 'dms/versions', element: wrap(<VersionHistoryPage />) },
      { path: 'dms/metadata', element: wrap(<MetadataManagementPage />) },
      { path: 'dms/signatures', element: wrap(<DigitalSignaturesPage />) },
      { path: 'dms/approvals', element: wrap(<ApprovalWorkflowsPage />) },
      { path: 'dms/retention', element: wrap(<RecordsRetentionPage />) },
      { path: 'dms/archive', element: wrap(<ArchiveDisposalPage />) },
      { path: 'dms/search', element: wrap(<FullTextSearchPage />) },
      { path: 'dms/permissions', element: wrap(<AccessPermissionsPage />) },
      { path: 'dms/audit', element: wrap(<DocumentAuditPage />) },
      { path: 'dms/reports', element: wrap(<DmsReportsPage />) },
      { path: 'dms/settings', element: wrap(<DmsSettingsPage />) },
      { path: 'workflow', element: <Navigate to="/workflow/dashboard" replace /> },
      { path: 'workflow/dashboard', element: wrap(<WorkflowDashboardPage />) },
      { path: 'workflow/templates', element: wrap(<WorkflowTemplatesPage />) },
      { path: 'workflow/designer', element: wrap(<WorkflowDesignerPage />) },
      { path: 'workflow/rules', element: wrap(<BusinessRulesPage />) },
      { path: 'workflow/approval-chains', element: wrap(<ApprovalChainsPage />) },
      { path: 'workflow/running', element: wrap(<RunningWorkflowsPage />) },
      { path: 'workflow/tasks', element: wrap(<PendingTasksPage />) },
      { path: 'workflow/my-approvals', element: wrap(<MyApprovalsPage />) },
      { path: 'workflow/delegation', element: wrap(<DelegationManagementPage />) },
      { path: 'workflow/escalation', element: wrap(<EscalationManagementPage />) },
      { path: 'workflow/sla', element: wrap(<SlaManagementPage />) },
      { path: 'workflow/automation', element: wrap(<AutomationRulesPage />) },
      { path: 'workflow/notifications', element: wrap(<WorkflowNotificationsPage />) },
      { path: 'workflow/history', element: wrap(<ProcessHistoryPage />) },
      { path: 'workflow/analytics', element: wrap(<WorkflowAnalyticsPage />) },
      { path: 'workflow/reports', element: wrap(<WorkflowReportsPage />) },
      { path: 'workflow/integrations', element: wrap(<ApiIntegrationsPage />) },
      { path: 'workflow/settings', element: wrap(<WorkflowSettingsPage />) },
      { path: 'notifications', element: <Navigate to="/notifications/dashboard" replace /> },
      { path: 'notifications/inbox', element: <Navigate to="/notifications/center" replace /> },
      { path: 'notifications/dashboard', element: wrap(<NotificationDashboardPage />) },
      { path: 'notifications/center', element: wrap(<NotificationCenterPage />) },
      { path: 'notifications/my', element: wrap(<MyNotificationsPage />) },
      { path: 'notifications/announcements', element: wrap(<NotificationAnnouncementsPage />) },
      { path: 'notifications/broadcast', element: wrap(<BroadcastMessagesPage />) },
      { path: 'notifications/email-templates', element: wrap(<EmailTemplatesPage />) },
      { path: 'notifications/sms-templates', element: wrap(<SmsTemplatesPage />) },
      { path: 'notifications/push-templates', element: wrap(<PushTemplatesPage />) },
      { path: 'notifications/templates', element: wrap(<NotificationTemplatesPage />) },
      { path: 'notifications/scheduled', element: wrap(<ScheduledNotificationsPage />) },
      { path: 'notifications/reminders', element: wrap(<ReminderEnginePage />) },
      { path: 'notifications/preferences', element: wrap(<NotificationPreferencesPage />) },
      { path: 'notifications/delivery', element: wrap(<DeliveryTrackingPage />) },
      { path: 'notifications/failed', element: wrap(<FailedDeliveriesPage />) },
      { path: 'notifications/retry', element: wrap(<RetryQueuePage />) },
      { path: 'notifications/history', element: wrap(<CommunicationHistoryPage />) },
      { path: 'notifications/reports', element: wrap(<NotificationReportsPage />) },
      { path: 'notifications/integrations', element: wrap(<NotificationIntegrationsPage />) },
      { path: 'notifications/settings', element: wrap(<NotificationSettingsPage />) },
      moduleRoute('maintenance/*', 'maintenance'),
      moduleRoute('facilities/*', 'facilities'),
      moduleRoute('visitors/*', 'visitor'),
      moduleRoute('calendar/*', 'calendar'),
      { path: 'reports', element: <Navigate to="/reports/dashboard" replace /> },
      { path: 'reports/dashboard', element: wrap(<ExecutiveDashboardPage />) },
      { path: 'reports/operational', element: wrap(<OperationalDashboardsPage />) },
      { path: 'reports/kpis', element: wrap(<ReportingKpiManagementPage />) },
      { path: 'reports/library', element: wrap(<ReportLibraryPage />) },
      { path: 'reports/builder', element: wrap(<ReportBuilderPage />) },
      { path: 'reports/scheduled', element: wrap(<ScheduledReportsPage />) },
      { path: 'reports/subscriptions', element: wrap(<ReportSubscriptionsPage />) },
      { path: 'reports/explorer', element: wrap(<DataExplorerPage />) },
      { path: 'reports/analytics', element: wrap(<AdvancedAnalyticsPage />) },
      { path: 'reports/forecasting', element: wrap(<ForecastingPage />) },
      { path: 'reports/geographic', element: wrap(<GeographicAnalyticsPage />) },
      { path: 'reports/comparative', element: wrap(<ComparativeAnalysisPage />) },
      { path: 'reports/exports', element: wrap(<DataExportsPage />) },
      { path: 'reports/audit', element: wrap(<AuditReportsPage />) },
      { path: 'reports/designer', element: wrap(<DashboardDesignerPage />) },
      { path: 'reports/integrations', element: wrap(<BiIntegrationsPage />) },
      { path: 'reports/history', element: wrap(<ReportHistoryPage />) },
      { path: 'reports/settings', element: wrap(<ReportingSettingsPage />) },
      { path: 'analytics', element: <Navigate to="/reports/analytics" replace /> },
      { path: 'analytics/*', element: <Navigate to="/reports/analytics" replace /> },
      { path: 'business-intelligence', element: <Navigate to="/reports/integrations" replace /> },
      { path: 'business-intelligence/*', element: <Navigate to="/reports/integrations" replace /> },
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
