import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetUserByIdQuery } from '../api/users.api';
import { PageHeader } from '@/components/shared/PageHeader';
import { UserSubNav } from '../components/UserSubNav';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserByIdQuery(id!);

  if (isLoading) return <div className="data-table-empty">Loading...</div>;
  if (!user) return <div className="data-table-empty">User not found</div>;

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Users', path: '/users/list' }, { label: user.firstName, path: `/users/${id}` }, { label: 'Edit' }]} title="Edit User" description="Changes are tracked in audit history" />
      <UserSubNav />
      <Card>
        <CardHeader><CardTitle className="text-base">Personal & Employment</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Input label="First Name" defaultValue={user.firstName} />
          <Input label="Last Name" defaultValue={user.lastName} />
          <Input label="Email" type="email" defaultValue={user.email} />
          <Input label="Phone" defaultValue={user.phone} />
          <Input label="Department" defaultValue={user.department} />
          <Input label="Position" defaultValue={user.position} />
        </CardContent>
      </Card>
      <div className="mt-6 flex gap-2">
        <Button onClick={() => { toast.success('User updated'); navigate(`/users/${id}`); }}>Save Changes</Button>
        <Button variant="outline" onClick={() => navigate(`/users/${id}`)}>Cancel</Button>
      </div>
    </div>
  );
}
