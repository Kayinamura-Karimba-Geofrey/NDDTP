import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { DMS_MOCK_DOCUMENTS } from '../constants/dms-data';

export function RecentDocumentsPage() {
  const recent = [...DMS_MOCK_DOCUMENTS].sort((a, b) => dayjs(b.lastModified).valueOf() - dayjs(a.lastModified).valueOf());

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Recent' }]} title="Recent Documents" description="Recently modified and accessed records" />
      <DmsSubNav />
      <Card>
        <CardContent className="space-y-3 pt-6">
          {recent.map((d) => (
            <Link key={d.id} to={`/dms/documents/${d.id}`} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-4 hover:bg-muted/50">
              <div>
                <p className="font-medium">{d.title}</p>
                <p className="text-xs text-muted-foreground">{d.documentNumber} · {d.category} · {d.owner}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <DmsStatusBadge status={d.status} />
                <span className="text-muted-foreground">{dayjs(d.lastModified).format('DD MMM HH:mm')}</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
