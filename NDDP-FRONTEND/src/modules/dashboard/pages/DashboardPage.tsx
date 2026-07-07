import { useMemo } from 'react';
import { KPI_CATEGORIES } from '@/constants/executive-dashboard';
import { useDashboardVisibility } from '../hooks/useDashboardVisibility';
import { WelcomeSection } from '../components/WelcomeSection';
import { KpiCategorySection } from '../components/KpiCategorySection';
import { OrganizationOverview } from '../components/OrganizationOverview';
import { DashboardChartsGrid } from '../components/DashboardChartsGrid';
import { NotificationsCenter } from '../components/NotificationsCenter';
import { RecentActivityFeed } from '../components/RecentActivityFeed';
import { PendingApprovals } from '../components/PendingApprovals';
import { TaskManagement } from '../components/TaskManagement';
import { CalendarWidget } from '../components/CalendarWidget';
import { MessagesWidget } from '../components/MessagesWidget';
import { QuickActionsPanel } from '../components/QuickActionsPanel';
import { SystemHealthPanel } from '../components/SystemHealthPanel';
import { AiAssistantPanel } from '../components/AiAssistantPanel';
import { ReportsWidget } from '../components/ReportsWidget';
import { AuditSummary } from '../components/AuditSummary';
import { GlobalSearchWidget } from '../components/GlobalSearchWidget';

export function DashboardPage() {
  const visibility = useDashboardVisibility();

  const kpiCategories = useMemo(
    () =>
      KPI_CATEGORIES.filter((cat) =>
        visibility.canSeeDomain(cat.id, cat.permissions),
      ),
    [visibility],
  );

  return (
    <div className="space-y-8">
      <WelcomeSection />

      {visibility.showFullKpis && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Executive KPIs</h2>
          <KpiCategorySection categories={kpiCategories} />
        </section>
      )}

      {visibility.showOrgOverview && <OrganizationOverview />}

      {visibility.showOrgOverview && <DashboardChartsGrid />}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <NotificationsCenter />
          <RecentActivityFeed />
        </div>
        <div className="space-y-6">
          <QuickActionsPanel />
          {visibility.showPendingApprovals && <PendingApprovals />}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <TaskManagement />
        <CalendarWidget />
        <MessagesWidget />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlobalSearchWidget />
        {visibility.showAiAssistant && <AiAssistantPanel />}
        {!visibility.showAiAssistant && <ReportsWidget />}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibility.showAiAssistant && <ReportsWidget />}
      </div>

      {visibility.showSystemHealth && <SystemHealthPanel />}

      {visibility.showAuditSummary && <AuditSummary />}
    </div>
  );
}
