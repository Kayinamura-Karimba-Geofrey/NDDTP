import dayjs from 'dayjs';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const SEPARATION_RECORDS = [
  { id: '1', name: 'Former Officer A', department: 'Logistics', separationDate: '2025-12-31', reason: 'Retirement', type: 'RETIREMENT' },
  { id: '2', name: 'Former Officer B', department: 'Finance', separationDate: '2026-03-15', reason: 'Contract expiry', type: 'CONTRACT_END' },
];

export function SeparationRecordsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Separation Records' }]} title="Separation Records" description="Records of personnel who have left the organization" />
      <PersonnelSubNav />
      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="pb-2">Name</th><th className="pb-2">Department</th><th className="pb-2">Separation Date</th><th className="pb-2">Type</th><th className="pb-2">Reason</th></tr></thead>
            <tbody>
              {SEPARATION_RECORDS.map((r) => (
                <tr key={r.id} className="border-b border-border">
                  <td className="py-3 font-medium">{r.name}</td>
                  <td className="py-3">{r.department}</td>
                  <td className="py-3">{dayjs(r.separationDate).format('MMM D, YYYY')}</td>
                  <td className="py-3">{r.type}</td>
                  <td className="py-3">{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
