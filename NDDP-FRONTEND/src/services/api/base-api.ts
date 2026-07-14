import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { API_SERVICE_BASE } from '@/constants/services';
import type { ServiceKey } from '@/constants/services';
import { TOKEN_KEYS } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import { redirectToSessionExpired } from '@/utils/auth-storage';

export interface ServiceFetchArgs extends FetchArgs {
  service: ServiceKey;
  skipAuthRedirect?: boolean;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_SERVICE_BASE,
  prepareHeaders: (headers) => {
    const token =
      sessionStorage.getItem(TOKEN_KEYS.ACCESS) ?? localStorage.getItem(TOKEN_KEYS.ACCESS);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('X-Correlation-Id', crypto.randomUUID());
    return headers;
  },
});

function resolveUrl(args: string | ServiceFetchArgs): string {
  if (typeof args === 'string') return args;
  const path = args.url ?? '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!args.service) return normalized;
  return `/${args.service}${normalized}`;
}

function toFetchArgs(args: string | ServiceFetchArgs): string | FetchArgs {
  if (typeof args === 'string') return args;
  const { service: _service, skipAuthRedirect: _skip, ...fetchArgs } = args;
  return { ...fetchArgs, url: resolveUrl(args) };
}

function isPublicAuthPath(url: string): boolean {
  return (
    url.includes('/auth/login') ||
    url.includes('/auth/mfa/verify') ||
    url.includes('/auth/refresh') ||
    url.includes('/auth/forgot-password') ||
    url.includes('/auth/reset-password')
  );
}

const baseQueryWithReauth: BaseQueryFn<string | ServiceFetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const url = resolveUrl(args);
  const skipRedirect = typeof args !== 'string' && args.skipAuthRedirect;

  let result = await rawBaseQuery(toFetchArgs(args), api, extraOptions);

  if (result.error?.status === 401 && !skipRedirect && !isPublicAuthPath(url)) {
    const refreshToken =
      sessionStorage.getItem(TOKEN_KEYS.REFRESH) ?? localStorage.getItem(TOKEN_KEYS.REFRESH);

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        toFetchArgs(
          serviceQuery('auth', '/auth/refresh', {
            method: 'POST',
            body: { refreshToken },
            skipAuthRedirect: true,
          }),
        ),
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const tokens = unwrapApiResponse<{
          accessToken: string;
          refreshToken: string;
          expiresIn?: number;
        }>(refreshResult.data);
        const storage = localStorage.getItem(TOKEN_KEYS.REFRESH) ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEYS.ACCESS, tokens.accessToken);
        storage.setItem(TOKEN_KEYS.REFRESH, tokens.refreshToken);
        result = await rawBaseQuery(toFetchArgs(args), api, extraOptions);
      }
    }

    if (result.error?.status === 401) {
      redirectToSessionExpired();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'Dashboard',
    'Personnel',
    'Notification',
    'Profile',
    'Search',
    'Module',
    'Cloud',
    'Sessions',
    'LoginHistory',
    'Devices',
    'Mfa',
    'Roles',
    'Permissions',
    'Assignments',
    'Users',
    'Departments',
    'PersonnelDepartments',
    'PersonnelUnits',
    'PersonnelQualifications',
    'PersonnelTransfers',
    'PersonnelPromotions',
    'PersonnelHistory',
    'PersonnelPositions',
    'PersonnelSkills',
    'PersonnelAwards',
    'PersonnelDocuments',
    'PersonnelDependents',
    'PersonnelEmergencyContacts',
    'RecruitmentVacancies',
    'RecruitmentApplications',
    'RecruitmentPipeline',
    'RecruitmentInterviews',
    'LeaveRequests',
    'LeaveBalances',
    'LeaveTypes',
    'LeaveApprovals',
    'WelfarePrograms',
    'WelfareClaims',
    'WelfareApprovals',
    'WelfareApplications',
    'MedicalAppointments',
    'MedicalClearances',
    'MedicalApprovals',
    'MedicalProfiles',
    'MedicalAssessments',
    'MedicalVaccinations',
    'MedicalLabResults',
    'MedicalReferrals',
    'MedicalDocuments',
    'MedicalIncidents',
    'MedicalFitness',
    'MedicalHistory',
    'MedicalCampaigns',
    'RecruitmentRequisitions',
    'RecruitmentWorkforceRequests',
    'RecruitmentOffers',
    'RecruitmentCandidates',
    'RecruitmentAssessments',
    'RecruitmentTalentPool',
    'TrainingCourses',
    'TrainingEnrollments',
    'TrainingCertifications',
    'TrainingApprovals',
    'TrainingPrograms',
    'TrainingLearningPaths',
    'TrainingInstructors',
    'TrainingClassrooms',
    'TrainingAssessments',
    'TrainingExaminations',
    'TrainingAttendance',
    'TrainingMaterials',
    'TrainingCompetencies',
    'TrainingRequests',
    'TrainingHistory',
    'Assets',
    'AssetCategories',
    'AssetAssignments',
    'AssetTransfers',
    'AssetReturns',
    'AssetMaintenance',
    'AssetInspections',
    'AssetWarranties',
    'AssetReservations',
    'AssetDisposals',
    'AssetAuditHistory',
    'AssetDocuments',
    'InventoryItems',
    'InventoryWarehouses',
    'InventoryCategories',
    'InventoryRequests',
    'InventoryStockLevels',
    'InventoryReceipts',
    'InventoryIssues',
    'InventoryTransfers',
    'InventoryAdjustments',
    'InventoryCounts',
    'InventoryBatches',
    'InventoryExpiry',
    'InventoryReorder',
    'InventorySuppliers',
    'InventoryUoms',
    'ProcurementRequisitions',
    'ProcurementSuppliers',
    'ProcurementOrders',
    'ProcurementRequests',
    'ProcurementPlans',
    'ProcurementEvaluations',
    'ProcurementRegistrations',
    'ProcurementRfqs',
    'ProcurementTenders',
    'ProcurementBids',
    'ProcurementContracts',
    'ProcurementReceipts',
    'ProcurementInvoices',
    'ProcurementApprovals',
    'ProcurementCalendar',
    'FinanceBudgets',
    'FinanceCostCenters',
    'FinanceExpenditures',
    'FinanceInvoices',
    'FinancePayments',
    'FinanceFiscalYears',
    'FinancePrograms',
    'FinanceTransfers',
    'FinanceCommitments',
    'FinanceRevenue',
    'FinanceReceivables',
    'FinancePayables',
    'FinanceAudit',
    'FinanceApprovals',
    'FinanceCalendar',
    'PerformanceGoals',
    'PerformanceReviews',
    'PerformanceCycles',
    'PerformancePlans',
    'PerformanceKpis',
    'PerformanceCompetencies',
    'PerformanceFeedback',
    'PerformanceRecognition',
    'PerformanceDevelopmentPlans',
    'PerformanceCoaching',
    'PerformanceApprovals',
    'FleetVehicles',
    'FleetAssignments',
    'FleetTrips',
    'FleetInspections',
    'FleetDrivers',
    'FleetLicenses',
    'FleetFuel',
    'FleetMaintenance',
    'FleetIncidents',
    'FleetParking',
    'FleetApprovals',
    'FleetHistory',
    'FleetCalendar',
    'DmsDocuments',
    'DmsShared',
    'DmsApprovals',
    'DmsSignatures',
    'WorkflowTemplates',
    'WorkflowInstances',
    'WorkflowTasks',
    'NotificationInbox',
    'NotificationTemplates',
    'NotificationPreferences',
    'ReportDefinitions',
    'ReportKpis',
    'ReportSchedules',
    'AuditLogs',
    'SecurityEvents',
    'MonitoringAlerts',
    'MessagingChannels',
    'MessagingMessages',
    'Calendars',
    'CalendarEvents',
    'CalendarAttendees',
    'VisitSites',
    'VisitorDirectory',
    'VisitRequests',
    'CheckInLogs',
    'MaintenanceCategories',
    'MaintenanceRequests',
    'WorkOrders',
    'MaintenanceTechnicians',
    'MaintenanceParts',
    'MaintenancePreventive',
    'MaintenanceSla',
    'FacilityTypes',
    'FacilitiesDirectory',
    'FacilitySpaces',
    'SpaceBookings',
    'FacilityUtilities',
    'FacilityInspections',
    'FacilityAccess',
    'LogisticsLocations',
    'TransportRoutes',
    'Shipments',
    'ShipmentTracking',
    'SearchIndexes',
    'SearchDocuments',
    'SearchQueries',
    'AiAgents',
    'AiConversations',
    'AiMessages',
    'ConfigNamespaces',
    'ConfigEntries',
    'ConfigRevisions',
  ],
  endpoints: () => ({}),
});

export function serviceQuery(
  service: ServiceKey,
  path: string,
  options?: Omit<ServiceFetchArgs, 'service' | 'url'>,
): ServiceFetchArgs {
  return { service, url: path, ...options };
}
