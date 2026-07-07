import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { BACKGROUND_CHECKS } from '../constants/recruitment-data';

function StatusCell({ value }: { value: string }) {
  const cls = value === 'VERIFIED' ? 'text-success' : value === 'PENDING' ? 'text-warning' : value === 'FAILED' ? 'text-destructive' : 'text-muted-foreground';
  return <span className={cls}>{value}</span>;
}

export function BackgroundVerificationPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Background Verification' }]} title="Background Verification" description="Identity, employment, academic, reference, and certification checks" />
      <RecruitmentSubNav />
      <Card>
        <CardContent className="overflow-x-auto pt-6">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 pr-4">Candidate</th><th className="pb-2 pr-4">Identity</th><th className="pb-2 pr-4">Employment</th><th className="pb-2 pr-4">Academic</th><th className="pb-2 pr-4">References</th><th className="pb-2 pr-4">Certifications</th><th className="pb-2">Overall</th>
            </tr></thead>
            <tbody>
              {BACKGROUND_CHECKS.map((b) => (
                <tr key={b.id} className="border-b border-border">
                  <td className="py-3 font-medium">{b.candidate}</td>
                  <td className="py-3"><StatusCell value={b.identity} /></td>
                  <td className="py-3"><StatusCell value={b.employment} /></td>
                  <td className="py-3"><StatusCell value={b.academic} /></td>
                  <td className="py-3"><StatusCell value={b.references} /></td>
                  <td className="py-3"><StatusCell value={b.certifications} /></td>
                  <td className="py-3"><StatusCell value={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
