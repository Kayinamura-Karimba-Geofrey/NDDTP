import dayjs from 'dayjs';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { LeaveStatusBadge } from '../components/LeaveStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_LEAVE_REQUESTS } from '../constants/leave-data';

export function TeamCalendarPage() {
  const teamLeave = MOCK_LEAVE_REQUESTS.filter((r) => ['APPROVED', 'PENDING_APPROVAL'].includes(r.status));

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Team Calendar' }]} title="Team Calendar" description="Team leave schedules with conflict detection" />
      <LeaveSubNav />
      <div className="mb-4 flex flex-wrap gap-3">
        <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>All Departments</option><option>Human Resources</option><option>IT</option></select>
        <input type="search" placeholder="Search employee..." className="rounded-lg border border-border px-3 py-2 text-sm" />
      </div>
      <Card className="mb-4"><CardContent className="pt-4 text-sm text-warning">⚠ Potential staffing conflict: 2 team members on leave Jul 15–19</CardContent></Card>
      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="pb-2">Employee</th><th className="pb-2">Department</th><th className="pb-2">Leave Type</th><th className="pb-2">Dates</th><th className="pb-2">Status</th></tr></thead>
            <tbody>
              {teamLeave.map((r) => (
                <tr key={r.id} className="border-b border-border">
                  <td className="py-3 font-medium">{r.employeeName}</td>
                  <td className="py-3">{r.department}</td>
                  <td className="py-3">{r.leaveTypeName}</td>
                  <td className="py-3">{dayjs(r.startDate).format('MMM D')} – {dayjs(r.endDate).format('MMM D')}</td>
                  <td className="py-3"><LeaveStatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
