import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

export function ExportUsersPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Export' }]} title="Export Users" description="Export filtered user data" />
      <UserSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <p className="text-sm text-muted-foreground">Apply filters on the Users page first, then export the current result set.</p>
          <div className="flex flex-wrap gap-3">
            {['PDF', 'Excel', 'CSV'].map((fmt) => (
              <Button key={fmt} variant="outline" onClick={() => toast.success(`Exporting ${fmt}...`)}>
                <FiDownload className="h-4 w-4" /> Export {fmt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
