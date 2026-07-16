import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Email Delivery Report',
  'SMS Delivery Report',
  'Push Notification Report',
  'Notification Activity Report',
  'Announcement Reach Report',
  'Delivery Failure Report',
  'Reminder Effectiveness Report',
  'Communication Volume Report',
];

export function NotificationReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Reports' }]} title="Notification Reports" description="Delivery, activity, announcement reach, failure, and volume analytics" />
      <NotificationSubNav />
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
