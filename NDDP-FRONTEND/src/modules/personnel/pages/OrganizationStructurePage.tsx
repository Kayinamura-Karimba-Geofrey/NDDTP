import { PageHeader } from '@/components/shared/PageHeader';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { Card, CardContent } from '@/components/ui';
import { MOCK_DEPARTMENTS, MOCK_UNITS } from '../constants/personnel-data';

export function OrganizationStructurePage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Organization Structure' }]} title="Organization Structure" description="Interactive organizational chart — Organization → Department → Division → Unit → Team → Personnel" />
      <PersonnelSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="font-bold text-lg">Ministry of Defence</p>
              <p className="text-sm text-muted-foreground">Organization</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_DEPARTMENTS.map((dept) => (
                <div key={dept.id} className="rounded-lg border border-border p-4">
                  <p className="font-semibold">{dept.name}</p>
                  <p className="text-xs text-muted-foreground">{dept.code} · {dept.personnelCount} personnel</p>
                  <p className="mt-2 text-sm">Manager: {dept.manager}</p>
                  <ul className="mt-3 space-y-1 border-t border-border pt-2">
                    {MOCK_UNITS.filter((u) => u.department === dept.name).map((unit) => (
                      <li key={unit.id} className="text-sm text-muted-foreground">↳ {unit.name} ({unit.personnelCount})</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
