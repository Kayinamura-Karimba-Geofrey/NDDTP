import toast from 'react-hot-toast';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

const FIELDS = ['Employee Name', 'Department', 'Rank', 'Status', 'Hire Date', 'Unit', 'Leave Balance', 'Performance Score'];
const AGGS = ['Count', 'Sum', 'Average', 'Min', 'Max', 'Distinct'];

export function ReportBuilderPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Builder' }]} title="Report Builder" description="Create reports without coding — fields, filters, grouping, aggregations, charts, and calculated fields" actions={<Button onClick={() => toast('Report template saved')}>Save Template</Button>} />
      <ReportingSubNav />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-3 text-sm font-semibold">Available Fields</h3>
            <div className="space-y-2">
              {FIELDS.map((f) => (
                <button key={f} type="button" className="block w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted" onClick={() => toast(`Added field: ${f}`)}>{f}</button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
            <Input label="Report Name" defaultValue="Custom Personnel Analysis" className="sm:col-span-2" />
            <Input label="Category" defaultValue="Personnel" />
            <Input label="Default Format" defaultValue="Excel" />
            <Input label="Group By" defaultValue="Department" />
            <Input label="Sort By" defaultValue="Employee Name ASC" />
            <Input label="Filters" defaultValue="status = ACTIVE" className="sm:col-span-2" />
            <Input label="Aggregation" defaultValue={AGGS.join(', ')} className="sm:col-span-2" />
            <Input label="Chart Type" defaultValue="Bar, Pie, Line, Table" className="sm:col-span-2" />
            <div className="sm:col-span-2 flex gap-2">
              <Button onClick={() => toast('Preview generated')}>Preview</Button>
              <Button variant="outline" onClick={() => toast('Report published')}>Publish</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
