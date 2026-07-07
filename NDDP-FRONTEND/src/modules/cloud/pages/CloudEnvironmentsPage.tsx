import { FiExternalLink } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { CloudSubNav } from '../components/CloudSubNav';
import { ServiceStatusBadge } from '../components/ServiceStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { CLOUD_ENVIRONMENTS } from '@/constants/cloud-data';
import dayjs from 'dayjs';

export function CloudEnvironmentsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Cloud Platform', path: '/cloud' }, { label: 'Environments' }]}
        title="Cloud Environments"
        description="Production, staging, and development environments hosted on NDDTP cloud infrastructure."
      />
      <CloudSubNav />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {CLOUD_ENVIRONMENTS.map((env) => (
          <Card key={env.id}>
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{env.name}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{env.provider}</p>
                </div>
                <ServiceStatusBadge status={env.status === 'healthy' ? 'healthy' : env.status === 'maintenance' ? 'maintenance' : 'degraded'} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Region</dt>
                  <dd className="mt-1 font-medium text-foreground">{env.region}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Version</dt>
                  <dd className="mt-1 font-medium text-foreground">{env.version}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Services</dt>
                  <dd className="mt-1 font-medium text-foreground">{env.servicesRunning}/{env.totalServices}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Last Deploy</dt>
                  <dd className="mt-1 font-medium text-foreground">{dayjs(env.lastDeploy).format('MMM D, HH:mm')}</dd>
                </div>
              </dl>
              <a
                href={env.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
              >
                {env.url} <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
