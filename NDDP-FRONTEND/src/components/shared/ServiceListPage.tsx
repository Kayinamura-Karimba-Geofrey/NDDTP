import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getModuleConfig } from '@/constants/module-config';
import { MICROSERVICES } from '@/constants/services';
import { useListResourcesQuery, useGetResourceQuery } from '@/services/api/modules.api';
import { usePermissions } from '@/hooks/usePermissions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Breadcrumbs,
  EmptyState,
  Skeleton,
  Badge,
  Button,
  Input,
  Alert,
} from '@/components/ui';
import { getApiErrorMessage } from '@/services/api/axios-instance';

interface ServiceListPageProps {
  moduleKey: string;
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') {
    if ('name' in (value as object)) return String((value as { name: string }).name);
    return JSON.stringify(value);
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value).toLocaleDateString('en-RW');
  }
  return String(value);
}

function formatFieldLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function ServiceListPage({ moduleKey }: ServiceListPageProps) {
  const config = getModuleConfig(moduleKey);
  const { hasPermission } = usePermissions();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, isError, error, isFetching, refetch } = useListResourcesQuery(
    {
      service: config?.serviceKey ?? 'user',
      path: config?.listPath ?? '/users',
      page,
      limit: 20,
      search: search || undefined,
    },
    { skip: !config || Boolean(config.singleResource) },
  );

  const {
    data: singleData,
    isLoading: singleLoading,
    isError: singleError,
    error: singleErrorObj,
    refetch: refetchSingle,
  } = useGetResourceQuery(
    { service: config?.serviceKey ?? 'user', path: config?.listPath ?? '/users/me' },
    { skip: !config || !config.singleResource },
  );

  if (!config) {
    return (
      <EmptyState
        title="Module not configured"
        description={`No API mapping found for module "${moduleKey}".`}
      />
    );
  }

  if (config.permission && !hasPermission(config.permission)) {
    return <Navigate to="/403" replace />;
  }

  const rows = config.singleResource
    ? singleData
      ? [singleData]
      : []
    : data?.data ?? [];
  const meta = config.singleResource ? undefined : data?.meta;
  const loading = config.singleResource ? singleLoading : isLoading;
  const hasError = config.singleResource ? singleError : isError;
  const errorObj = config.singleResource ? singleErrorObj : error;
  const handleRefetch = config.singleResource ? refetchSingle : refetch;

  const serviceLabel = MICROSERVICES[config.serviceKey].label;
  const fields =
    config.displayFields ??
    (rows[0] ? Object.keys(rows[0]).slice(0, 6) : ['id']);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: config.title }]} />
        <h1 className="mt-2 text-2xl font-bold">{config.title}</h1>
        <p className="text-sm text-muted-foreground">{config.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{serviceLabel}</Badge>
          <Badge variant="outline" className="font-mono text-xs">
            {config.listPath}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{config.singleResource ? 'Details' : 'Records'}</CardTitle>
          {!config.singleResource && (
          <form
            className="flex w-full max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(searchInput);
              setPage(1);
            }}
          >
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search records"
            />
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </form>
          )}
        </CardHeader>
        <CardContent>
          {hasError && (
            <Alert variant="danger" title="Failed to load data" className="mb-4">
              {getApiErrorMessage(errorObj)}
              <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRefetch()}>
                Retry
              </Button>
            </Alert>
          )}

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: config.singleResource ? 1 : 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !rows.length ? (
            <EmptyState
              title="No records found"
              description={
                hasError
                  ? 'The microservice may be offline or returned an error.'
                  : 'No data returned from the backend for this resource.'
              }
            />
          ) : config.singleResource ? (
            <dl className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field} className="rounded-md border border-border p-4">
                  <dt className="text-xs font-medium text-muted-foreground">{formatFieldLabel(field)}</dt>
                  <dd className="mt-1 text-sm font-medium">{formatCellValue(rows[0][field])}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <>
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      {fields.map((field) => (
                        <th key={field} className="px-4 py-3 font-medium text-muted-foreground">
                          {formatFieldLabel(field)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={String(row.id ?? idx)} className="border-b border-border last:border-0">
                        {fields.map((field) => (
                          <td key={field} className="px-4 py-3">
                            {formatCellValue(row[field])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {meta && (
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Page {meta.page} of {meta.totalPages || 1} — {meta.total} total
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!meta.hasPreviousPage || isFetching}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!meta.hasNextPage || isFetching}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
