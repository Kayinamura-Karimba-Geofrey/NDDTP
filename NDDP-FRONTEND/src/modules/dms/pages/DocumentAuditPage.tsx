import dayjs from 'dayjs';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_AUDIT } from '../constants/dms-data';

export function DocumentAuditPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Audit' }]} title="Document Audit Trail" description="Every view, download, edit, share, signature, and archive action is logged" />
      <DmsSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          {MOCK_AUDIT.map((a, i) => (
            <div key={a.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {i < MOCK_AUDIT.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-4">
                <p className="font-medium">{a.event} — {a.document}</p>
                <p className="text-sm text-muted-foreground">{a.detail}</p>
                <p className="text-xs text-muted-foreground">{a.actor} · {dayjs(a.date).format('DD MMM YYYY HH:mm')}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
