import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { FACILITIES_DASHBOARD_KPIS, FACILITIES_BY_TYPE } from '../constants/facilities-data';

export function FacilitiesReportsPage() {
  const reports = [
    { title: 'Occupancy Summary', detail: `Avg occupancy ${FACILITIES_DASHBOARD_KPIS.avgOccupancy} across ${FACILITIES_DASHBOARD_KPIS.totalFacilities} facilities` },
    { title: 'Booking Throughput', detail: `${FACILITIES_DASHBOARD_KPIS.bookingsToday} bookings today · ${FACILITIES_DASHBOARD_KPIS.pendingBookings} pending approval` },
    { title: 'Estate Mix', detail: FACILITIES_BY_TYPE.map((t) => `${t.name}: ${t.value}`).join(' · ') },
    { title: 'Utilities & Alerts', detail: `${FACILITIES_DASHBOARD_KPIS.utilityAlerts} utility alerts · ${FACILITIES_DASHBOARD_KPIS.inspectionsDue} inspections due` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Reports' }]} title="Facilities Reports" description="Occupancy, bookings, utility, and inspection summaries" />
      <FacilitiesSubNav />
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.title}>
            <CardHeader className="border-b border-border pb-3 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm">{r.title}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => toast.success(`${r.title} exported`)}>Export</Button>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-muted-foreground">{r.detail}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
