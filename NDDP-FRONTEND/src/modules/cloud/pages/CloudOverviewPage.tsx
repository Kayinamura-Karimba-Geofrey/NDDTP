import { Link } from 'react-router-dom';
import { FiCloud, FiServer, FiGlobe, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { CloudSubNav } from '../components/CloudSubNav';
import { ServiceStatusBadge } from '../components/ServiceStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, Button, Skeleton, Alert } from '@/components/ui';
import { useGetGatewayHealthQuery, useGetServicesHealthQuery } from '../api/cloud.api';
import { CLOUD_ENVIRONMENTS, RECENT_DEPLOYMENTS } from '@/constants/cloud-data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function CloudOverviewPage() {
  const { data: gateway, isLoading: gatewayLoading, refetch: refetchGateway } = useGetGatewayHealthQuery();
  const { data: services, isLoading: servicesLoading, refetch: refetchServices, isError } = useGetServicesHealthQuery();

  const isLoading = gatewayLoading || servicesLoading;

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Cloud Platform' }]}
        title="Cloud Platform"
        description="Cloud-native infrastructure overview — microservices, environments, and deployment status."
        actions={
          <Button variant="outline" size="sm" onClick={() => { refetchGateway(); refetchServices(); }}>
            <FiRefreshCw className="h-4 w-4" /> Refresh
          </Button>
        }
      />
      <CloudSubNav />

      {isError && (
        <Alert variant="warning" title="Gateway unreachable" className="mb-6">
          Start the API gateway on port 3000 to see live service health. Run{' '}
          <code>npm run gateway:dev</code> in NDDP-BACKEND.
        </Alert>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
        ) : (
          <>
            <div className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="stat-label">Gateway Status</p>
                  <p className="stat-value capitalize">{gateway?.status ?? '—'}</p>
                  <div className="mt-2"><ServiceStatusBadge status={gateway?.status === 'ok' ? 'ok' : 'degraded'} /></div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted"><FiCloud className="h-5 w-5" /></div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="stat-label">Services Online</p>
                  <p className="stat-value">{services ? `${services.summary.up}/${services.summary.total}` : '—'}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{services?.summary.down ?? 0} offline</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted"><FiServer className="h-5 w-5" /></div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="stat-label">Environments</p>
                  <p className="stat-value">{CLOUD_ENVIRONMENTS.length}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Prod · Staging · Dev</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted"><FiGlobe className="h-5 w-5" /></div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="stat-label">Platform Health</p>
                  <p className="stat-value capitalize">{services?.status ?? '—'}</p>
                  <div className="mt-2"><ServiceStatusBadge status={services?.status === 'ok' ? 'healthy' : services?.status === 'degraded' ? 'degraded' : 'down'} /></div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted"><FiActivity className="h-5 w-5" /></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
            <CardTitle>Environments</CardTitle>
            <Link to="/cloud/environments" className="text-sm font-medium text-foreground hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {CLOUD_ENVIRONMENTS.map((env) => (
              <div key={env.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{env.name}</p>
                  <p className="text-xs text-muted-foreground">{env.region} · {env.version}</p>
                </div>
                <ServiceStatusBadge status={env.status === 'healthy' ? 'healthy' : 'degraded'} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
            <CardTitle>Recent Deployments</CardTitle>
            <Link to="/cloud/deployments" className="text-sm font-medium text-foreground hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="space-y-0 pt-2">
            {RECENT_DEPLOYMENTS.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between border-b border-border/60 py-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.service}</p>
                  <p className="text-xs text-muted-foreground">{d.environment} · {d.version}</p>
                </div>
                <div className="text-right">
                  <ServiceStatusBadge status={d.status} />
                  <p className="mt-1 text-xs text-muted-foreground">{dayjs(d.deployedAt).fromNow()}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
