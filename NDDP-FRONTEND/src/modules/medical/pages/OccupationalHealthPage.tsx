import { MedicalSubNav } from '../components/MedicalSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const PROGRAMS = [
  { title: 'Routine Health Monitoring', description: 'Quarterly vitals and wellness checks for field personnel', status: 'Active — 1,842 enrolled' },
  { title: 'Ergonomic Assessments', description: 'Workstation and lifting posture evaluations', status: '12 assessments this quarter' },
  { title: 'Environmental Health Reviews', description: 'Facility air quality and hazard assessments', status: 'Last review: Jun 2026' },
  { title: 'Return-to-Work Programs', description: 'Structured rehabilitation and duty progression', status: '4 active cases' },
  { title: 'Workplace Wellness', description: 'Stress management and physical activity initiatives', status: 'Ongoing' },
];

export function OccupationalHealthPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Occupational Health' }]} title="Occupational Health" description="Workplace health programs and monitoring" />
      <MedicalSubNav />
      <div className="grid gap-4 sm:grid-cols-2">
        {PROGRAMS.map((p) => (
          <Card key={p.title}>
            <CardContent className="pt-6">
              <p className="font-medium">{p.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-2 text-xs text-primary">{p.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
