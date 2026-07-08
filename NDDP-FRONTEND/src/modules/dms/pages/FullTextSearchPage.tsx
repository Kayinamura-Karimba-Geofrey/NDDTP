import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useGetDmsDocumentsQuery } from '../api/dms.api';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, Input } from '@/components/ui';

export function FullTextSearchPage() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const { data } = useGetDmsDocumentsQuery({ page: 1, limit: 100, search: q });

  const results = useMemo(() => {
    let list = data?.data ?? [];
    if (category) list = list.filter((d) => d.category === category);
    if (status) list = list.filter((d) => d.status === status);
    return list;
  }, [data, category, status]);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Search' }]} title="Full-Text Search" description="Search titles, content, metadata, OCR text, comments, tags, and related entities" />
      <DmsSubNav />
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-3 pt-6">
          <div className="relative min-w-[240px] flex-1">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search documents…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {['Personnel', 'Procurement', 'Finance', 'Training', 'Medical'].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'PENDING_SIGNATURE', 'SIGNED', 'ARCHIVED'].map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 pt-6">
          <p className="text-sm text-muted-foreground">{results.length} result(s)</p>
          {results.map((d) => (
            <Link key={d.id} to={`/dms/documents/${d.id}`} className="block rounded-lg border border-border p-4 hover:bg-muted/50">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{d.title}</p>
                <DmsStatusBadge status={d.status} />
              </div>
              <p className="text-xs text-muted-foreground">{d.documentNumber} · {d.category} · {d.owner} · {d.department}</p>
              {d.tags && <p className="mt-1 text-xs text-muted-foreground">Tags: {d.tags.join(', ')}</p>}
            </Link>
          ))}
          {!results.length && <p className="text-sm text-muted-foreground">No documents match your filters.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
