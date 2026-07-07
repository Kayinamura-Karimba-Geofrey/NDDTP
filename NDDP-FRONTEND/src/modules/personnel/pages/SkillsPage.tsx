import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SKILLS, SKILL_CATALOGUE, type SkillRecord } from '../constants/personnel-data';

export function SkillsPage() {
  const columns: DataTableColumn<SkillRecord>[] = [
    { key: 'person', header: 'Personnel', render: (s) => <span className="font-medium">{s.personnelName}</span> },
    { key: 'category', header: 'Category' },
    { key: 'skill', header: 'Skill' },
    { key: 'level', header: 'Level', render: (s) => <span className="font-medium">{s.level}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Skills' }]} title="Skills Inventory" description="Searchable catalogue for workforce planning" />
      <PersonnelSubNav />
      <Card className="mb-6"><CardContent className="pt-6">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Skill Catalogue</p>
        <div className="flex flex-wrap gap-2">
          {SKILL_CATALOGUE.map((skill) => (
            <span key={skill} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{skill}</span>
          ))}
        </div>
      </CardContent></Card>
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SKILLS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}
