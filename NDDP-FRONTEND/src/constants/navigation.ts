import type { NavItem } from '@/types';
import { dashboardNav } from './navigation/dashboard.nav';
import { recruitmentNav } from './navigation/recruitment.nav';
import { leaveNav } from './navigation/leave.nav';
import { welfareNav } from './navigation/welfare.nav';
import { medicalNav } from './navigation/medical.nav';
import { trainingNav } from './navigation/training.nav';
import { performanceNav } from './navigation/performance.nav';
import { personnelNav } from './navigation/personnel.nav';
import { assetsNav } from './navigation/assets.nav';
import { inventoryNav } from './navigation/inventory.nav';
import { procurementNav } from './navigation/procurement.nav';
import { fleetNav } from './navigation/fleet.nav';
import { logisticsNav } from './navigation/logistics.nav';
import { facilitiesNav } from './navigation/facilities.nav';
import { maintenanceNav } from './navigation/maintenance.nav';
import { financeNav } from './navigation/finance.nav';
import { workflowNav } from './navigation/workflow.nav';
import { visitorsNav } from './navigation/visitors.nav';
import { calendarNav } from './navigation/calendar.nav';
import { insightsNav } from './navigation/insights.nav';
import { communicationNav } from './navigation/communication.nav';
import { messagingNav } from './navigation/messaging.nav';
import { searchNav } from './navigation/search.nav';
import { aiAssistantNav } from './navigation/ai-assistant.nav';
import { authenticationNav } from './navigation/authentication.nav';
import { dmsNav } from './navigation/dms.nav';
import { authorizationNav } from './navigation/authorization.nav';
import { usersNav } from './navigation/users.nav';
import { auditNav } from './navigation/audit.nav';
import { profileNav } from './navigation/profile.nav';
import { settingsNav } from './navigation/settings.nav';
import { adminNav } from './navigation/admin.nav';

/** Composed sidebar navigation. Individual sections live in `constants/navigation/*.nav.ts`. */
export const MAIN_NAVIGATION: NavItem[] = [
  dashboardNav,
  recruitmentNav,
  leaveNav,
  welfareNav,
  medicalNav,
  trainingNav,
  performanceNav,
  personnelNav,
  assetsNav,
  inventoryNav,
  procurementNav,
  fleetNav,
  logisticsNav,
  facilitiesNav,
  maintenanceNav,
  financeNav,
  workflowNav,
  visitorsNav,
  calendarNav,
  insightsNav,
  communicationNav,
  messagingNav,
  searchNav,
  aiAssistantNav,
  authenticationNav,
  dmsNav,
  authorizationNav,
  usersNav,
  auditNav,
  profileNav,
  settingsNav,
  adminNav,
];

export const QUICK_ACTIONS = [
  { label: 'New Leave Request', path: '/leave/new', icon: 'FiCalendar' },
  { label: 'Submit Requisition', path: '/procurement/requisitions/new', icon: 'FiShoppingCart' },
  { label: 'View Reports', path: '/reports', icon: 'FiFileText' },
];
