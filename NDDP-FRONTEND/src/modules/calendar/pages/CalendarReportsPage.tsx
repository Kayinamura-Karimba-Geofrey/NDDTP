import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Event Attendance Report',
  'Meeting Utilization Report',
  'Training Schedule Report',
  'Room Booking Report',
  'Holiday Calendar Report',
  'Conflict Summary Report',
  'Department Calendar Report',
  'Invitation Response Report',
];

export function CalendarReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Reports' }]} title="Calendar Reports" description="Attendance, utilization, training schedules, rooms, holidays, and conflicts" />
      <CalendarSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((report) => (
            <div key={report} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{report}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — PDF`)}>PDF</Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — Excel`)}><FiDownload className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — CSV`)}>CSV</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
