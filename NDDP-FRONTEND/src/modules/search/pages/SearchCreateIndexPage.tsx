import toast from 'react-hot-toast';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function SearchCreateIndexPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Indexes', path: '/search/indexes' }, { label: 'New' }]} title="Create Search Index" description="Register a new searchable corpus" />
      <SearchPlatformSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Code" defaultValue="CUST-KB" />
          <Input label="Index Type" defaultValue="CUSTOM" />
          <Input label="Name" defaultValue="Knowledge Base" className="sm:col-span-2" />
          <Input label="Description" defaultValue="Cross-module knowledge articles" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Index created')}>Create Index</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
