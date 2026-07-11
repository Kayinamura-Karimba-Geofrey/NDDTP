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

import { useGetPersonnelKpiQuery, useGetRecruitmentKpiQuery } from '../api/dashboard.api';

export function DashboardPage() {
  const visibility = useDashboardVisibility();
  
  const { data: personnelKpi } = useGetPersonnelKpiQuery(undefined, { skip: !visibility.canSeeDomain('personnel') });
  const { data: recruitmentKpi } = useGetRecruitmentKpiQuery(undefined, { skip: !visibility.canSeeDomain('workflow') });

  const kpiCategories = useMemo(() => {
    return KPI_CATEGORIES.filter((cat) => visibility.canSeeDomain(cat.id, cat.permissions))
      .map(cat => {
        // Inject real Personnel data
        if (cat.id === 'personnel' && personnelKpi) {
          return {
            ...cat,
            metrics: cat.metrics.map(m => {
              if (m.id === 'p1') return { ...m, value: personnelKpi.total };
              if (m.id === 'p2') return { ...m, value: personnelKpi.active };
              return m;
            })
          };
        }
        // Inject real Recruitment data into Workflow category (for lack of a better place, or if recruitment is its own category)
        if (cat.id === 'workflow' && recruitmentKpi) {
          return {
            ...cat,
            metrics: cat.metrics.map(m => {
              // Assuming we repurpose Workflow pending for Recruitment pending
              if (m.id === 'w1') return { ...m, label: 'Pending Applications', value: recruitmentKpi.applications };
              if (m.id === 'w3') return { ...m, label: 'Active Vacancies', value: recruitmentKpi.vacancies };
              return m;
            })
          };
        }
        return cat;
      });
  }, [visibility, personnelKpi, recruitmentKpi]);

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
