import toast from 'react-hot-toast';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetSearchIndexesQuery } from '../api/search.api';

export function SearchCreateDocumentPage() {
  const { data: indexes = [] } = useGetSearchIndexesQuery();
  const active = indexes.filter((i) => i.status === 'ACTIVE');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Documents', path: '/search/documents' }, { label: 'New' }]} title="Index Document" description="Add or re-index content into a search corpus" />
      <SearchPlatformSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Index</label>
            <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" defaultValue={active[0]?.id}>
              {active.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
          <Input label="External ID" defaultValue="DMS-4500" />
          <Input label="Title" defaultValue="Facility Inspection Checklist" />
          <Input label="Content" defaultValue="Quarterly structural and fire-safety inspection checklist for HQ campus buildings." className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Document queued for indexing')}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
