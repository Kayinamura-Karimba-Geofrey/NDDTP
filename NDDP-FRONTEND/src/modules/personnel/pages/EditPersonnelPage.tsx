import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetPersonnelByIdQuery } from '../api/personnel.api';
import { PageHeader } from '@/components/shared/PageHeader';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function EditPersonnelPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: person, isLoading } = useGetPersonnelByIdQuery(id!);

  if (isLoading) return <div className="data-table-empty">Loading...</div>;
  if (!person) return <div className="data-table-empty">Personnel not found</div>;

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Directory', path: '/personnel/directory' }, { label: `${person.firstName} ${person.lastName}`, path: `/personnel/${id}` }, { label: 'Edit' }]} title="Edit Personnel" description="Changes are tracked in audit history" />
      <PersonnelSubNav />
      <Card>
        <CardHeader><CardTitle className="text-base">Personal & Employment</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Input label="First Name" defaultValue={person.firstName} />
          <Input label="Last Name" defaultValue={person.lastName} />
          <Input label="Email" type="email" defaultValue={person.email} />
          <Input label="Phone" defaultValue={person.phone} />
          <Input label="Department" defaultValue={person.department} />
          <Input label="Unit" defaultValue={person.unit} />
          <Input label="Position" defaultValue={person.position} />
          <Input label="Supervisor" defaultValue={person.supervisor} />
          <Input label="Work Location" defaultValue={person.workLocation} />
        </CardContent>
      </Card>
      <div className="mt-6 flex gap-2">
        <Button onClick={() => { toast.success('Personnel record updated'); navigate(`/personnel/${id}`); }}>Save Changes</Button>
        <Button variant="outline" onClick={() => navigate(`/personnel/${id}`)}>Cancel</Button>
      </div>
    </div>
  );
}
