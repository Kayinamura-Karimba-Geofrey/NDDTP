import { useParams, Link } from 'react-router-dom';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetFacilitiesDirectoryQuery, useGetFacilitySpacesQuery } from '../api/facilities.api';

export function FacilitiesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: facilities = [] } = useGetFacilitiesDirectoryQuery();
  const { data: spaces = [] } = useGetFacilitySpacesQuery();
  const facility = facilities.find((f) => f.id === id) ?? facilities[0];
  const related = spaces.filter((s) => s.facility === facility?.name);

  if (!facility) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Directory', path: '/facilities/directory' }, { label: 'Not found' }]} title="Facility Not Found" description="No facility matches this reference" />
        <FacilitiesSubNav />
        <Link to="/facilities/directory"><Button variant="outline">Back to directory</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Directory', path: '/facilities/directory' }, { label: facility.name }]} title={facility.name} description={`${facility.type} · ${facility.location}`} actions={<FacilitiesStatusBadge status={facility.status} />} />
      <FacilitiesSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Floors', value: facility.floors },
          { label: 'Capacity', value: facility.capacity },
          { label: 'Occupancy', value: facility.occupancy },
          { label: 'Spaces', value: related.length },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Spaces in this facility</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {related.length === 0 ? <p className="py-4 text-sm text-muted-foreground">No spaces linked.</p> : related.map((s) => (
            <div key={s.id} className="flex items-center justify-between py-3 text-sm">
              <div><p className="font-medium">{s.name}</p><p className="text-muted-foreground">{s.type} · Floor {s.floor} · Cap {s.capacity}</p></div>
              <FacilitiesStatusBadge status={s.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
