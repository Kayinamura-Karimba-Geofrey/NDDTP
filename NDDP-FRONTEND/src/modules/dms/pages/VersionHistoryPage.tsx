import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_VERSIONS } from '../constants/dms-data';

export function VersionHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Versions' }]} title="Version History" description="Every change creates a new version — view, compare, restore" />
      <DmsSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          {MOCK_VERSIONS.map((v, i) => (
            <div key={v.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full ${v.current ? 'bg-primary' : 'bg-muted-foreground'}`} />
                {i < MOCK_VERSIONS.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{v.version}</p>
                  {v.current && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Current</span>}
                </div>
                <p className="text-sm text-muted-foreground">{v.notes} · {v.author} · {dayjs(v.date).format('DD MMM YYYY HH:mm')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast(`View ${v.version}`)}>View</Button>
                  <Button size="sm" variant="outline" onClick={() => toast('Compare versions')}>Compare</Button>
                  <Button size="sm" variant="outline" onClick={() => toast(`Download ${v.version}`)}>Download</Button>
                  {!v.current && <Button size="sm" variant="outline" onClick={() => toast(`Restore ${v.version}`)}>Restore</Button>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
