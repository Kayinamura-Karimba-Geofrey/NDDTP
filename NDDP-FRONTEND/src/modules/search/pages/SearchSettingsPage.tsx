import toast from 'react-hot-toast';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { MOCK_SYNONYMS, type SearchSynonym } from '../constants/search-data';

export function SearchSettingsPage() {
  const columns: DataTableColumn<SearchSynonym>[] = [
    { key: 'term', header: 'Term', render: (r) => <span className="font-medium">{r.term}</span> },
    { key: 'synonyms', header: 'Synonyms', render: (r) => r.synonyms },
    { key: 'status', header: 'Status', render: (r) => <SearchStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Settings' }]} title="Search Settings" description="Query defaults, cache, and synonym dictionary (preview)" />
      <SearchPlatformSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Query defaults</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Default result limit" defaultValue="50" type="number" />
            <Input label="Min relevance score" defaultValue="0.35" />
            <Input label="Cache TTL (seconds)" defaultValue="120" type="number" />
            <Button onClick={() => toast.success('Search defaults saved')}>Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Add synonym</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Term" defaultValue="facility" />
            <Input label="Synonyms (comma-separated)" defaultValue="building, campus, site" />
            <Button onClick={() => toast('Synonym API not wired yet — saved locally')}>Add Synonym</Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Synonym dictionary</CardTitle></CardHeader>
        <CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SYNONYMS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent>
      </Card>
    </div>
  );
}
