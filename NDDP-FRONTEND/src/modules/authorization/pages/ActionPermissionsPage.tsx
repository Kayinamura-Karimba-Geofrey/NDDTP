import { FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { ACTION_MATRIX_ACTIONS, ACTION_MATRIX_PAGES } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

export function ActionPermissionsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Action Permissions' }]}
        title="Action Permissions"
        description="Control page-level button and action visibility by role"
        actions={<Button onClick={() => toast.success('Action permissions saved')}>Save</Button>}
      />
      <AuthorizationSubNav />
      <div className="space-y-6">
        {ACTION_MATRIX_PAGES.map((page) => (
          <Card key={page.page}>
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold text-foreground">{page.page}</h3>
              <div className="data-table-wrap overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Role</th>
                      {ACTION_MATRIX_ACTIONS.map((a) => <th key={a}>{a}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(page.roles).map(([role, perms]) => (
                      <tr key={role}>
                        <td className="font-medium">{role}</td>
                        {perms.map((allowed, i) => (
                          <td key={i} className="text-center">
                            {allowed ? <FiCheck className="inline h-4 w-4 text-success" /> : <FiX className="inline h-4 w-4 text-muted-foreground" />}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
