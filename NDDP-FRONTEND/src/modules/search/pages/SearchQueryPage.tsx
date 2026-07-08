import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { useGetSearchIndexesQuery } from '../api/search.api';
import { MOCK_QUERIES } from '../constants/search-data';

export function SearchQueryPage() {
  const navigate = useNavigate();
  const { data: indexes = [] } = useGetSearchIndexesQuery();
  const [query, setQuery] = useState('travel allowance policy');
  const [indexId, setIndexId] = useState('');

  const recent = MOCK_QUERIES.filter((q) => q.status === 'COMPLETED').slice(0, 4);

  const submit = () => {
    if (!query.trim()) {
      toast.error('Enter a search query');
      return;
    }
    toast.success('Search submitted');
    navigate('/search/queries/Q-701');
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Query' }]} title="Enterprise Search" description="Query across indexes for documents, personnel, assets, and announcements" />
      <SearchPlatformSubNav />
      <Card className="mb-6">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-3">
          <Input label="Query" value={query} onChange={(e) => setQuery(e.target.value)} className="sm:col-span-2" placeholder="Search keywords…" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Index</label>
            <select
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              value={indexId}
              onChange={(e) => setIndexId(e.target.value)}
            >
              <option value="">All indexes</option>
              {indexes.filter((i) => i.status === 'ACTIVE').map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <Button onClick={submit}><FiSearch className="h-4 w-4" /> Search</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent completed queries</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {recent.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium">{r.query}</p>
                <p className="text-muted-foreground">{r.indexName} · {r.hitCount} hits · {r.submittedAt}</p>
              </div>
              <Link to={`/search/queries/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
