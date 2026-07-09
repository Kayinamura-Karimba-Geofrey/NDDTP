/**
 * Side-effect imports that register RTK Query endpoints into baseApi.
 * Import this once from app bootstrap instead of listing every API in main.tsx.
 */
import '@/modules/cloud/api/cloud.api';
import '@/modules/dashboard/api/dashboard.api';
import '@/modules/authentication/api/auth.api';
import '@/modules/authentication/api/security.api';
import '@/modules/authorization/api/authorization.api';
import '@/modules/users/api/users.api';
import '@/modules/personnel/api/personnel.api';
import '@/modules/recruitment/api/recruitment.api';
import '@/modules/leave/api/leave.api';
import '@/modules/welfare/api/welfare.api';
import '@/modules/medical/api/medical.api';
import '@/modules/training/api/training.api';
import '@/modules/assets/api/asset.api';
import '@/modules/inventory/api/inventory.api';
import '@/modules/procurement/api/procurement.api';
import '@/modules/finance/api/finance.api';
import '@/modules/performance/api/performance.api';
import '@/modules/fleet/api/fleet.api';
import '@/modules/dms/api/dms.api';
import '@/modules/workflow/api/workflow.api';
import '@/modules/notification/api/notification.api';
import '@/modules/reporting/api/reporting.api';
import '@/modules/audit/api/audit.api';
import '@/modules/messaging/api/messaging.api';
import '@/modules/calendar/api/calendar.api';
import '@/modules/visitor/api/visitor.api';
import '@/modules/maintenance/api/maintenance.api';
import '@/modules/facilities/api/facilities.api';
import '@/modules/logistics/api/logistics.api';
import '@/modules/search/api/search.api';
import '@/modules/ai-assistant/api/ai-assistant.api';
import '@/modules/profile/api/profile.api';
import '@/modules/administration/api/configuration.api';
