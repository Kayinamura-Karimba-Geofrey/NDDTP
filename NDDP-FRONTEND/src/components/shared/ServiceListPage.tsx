import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { getModuleConfig } from '@/constants/module-config';
import { MICROSERVICES } from '@/constants/services';
import { useListResourcesQuery, useGetResourceQuery } from '@/services/api/modules.api';
import { usePermissions } from '@/hooks/usePermissions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  Skeleton,
  Badge,
  Button,
  Input,
  Alert,
} from '@/components/ui';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, TablePagination, type DataTableColumn } from '@/components/shared/DataTable';
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
    return new Date(value).toLocaleDateString('en-RW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
  const pageSize = 20;

  const { data, isLoading, isError, error, isFetching, refetch } = useListResourcesQuery(
    {
      service: config?.serviceKey ?? 'user',
      path: config?.listPath ?? '/users',
      page,
      limit: pageSize,
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

  const fields = useMemo(() => {
    const rows = config?.singleResource
      ? singleData ? [singleData] : []
      : data?.data ?? [];
    return config?.displayFields ?? (rows[0] ? Object.keys(rows[0]).slice(0, 6) : ['id']);
  }, [config, data?.data, singleData]);

  const columns = useMemo<DataTableColumn<Record<string, unknown>>[]>(
    () =>
      fields.map((field) => ({
        key: field,
        header: formatFieldLabel(field),
        render: (row) => formatCellValue(row[field]),
      })),
    [fields],
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
    ? singleData ? [singleData] : []
    : data?.data ?? [];
  const meta = config.singleResource ? undefined : data?.meta;
  const loading = config.singleResource ? singleLoading : isLoading;
  const hasError = config.singleResource ? singleError : isError;
  const errorObj = config.singleResource ? singleErrorObj : error;
  const handleRefetch = config.singleResource ? refetchSingle : refetch;
  const serviceLabel = MICROSERVICES[config.serviceKey].label;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbs={[{ label: config.title }]}
        title={config.title}
        description={config.description}
        meta={<Badge variant="accent">{serviceLabel}</Badge>}
      />

      <Card className="section-card">
        <CardHeader className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              {config.singleResource ? 'Record Details' : 'All Records'}
            </CardTitle>
            {!config.singleResource && meta && (
              <p className="mt-1 text-[0.8125rem] text-foreground">
                {meta.total} total records
              </p>
            )}
          </div>
          {!config.singleResource && (
            <form
              className="flex w-full max-w-md gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(searchInput);
                setPage(1);
              }}
            >
              <Input
                placeholder="Search records..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search records"
                className="h-10"
              />
              <Button type="submit" variant="primary" className="shrink-0">
                <FiSearch className="h-4 w-4" />
                Search
              </Button>
            </form>
          )}
        </CardHeader>
        <CardContent className="pt-5">
          {hasError && (
            <Alert variant="danger" title="Failed to load data" className="mb-5">
              {getApiErrorMessage(errorObj)}
              <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRefetch()}>
                Retry
              </Button>
            </Alert>
          )}

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: config.singleResource ? 3 : 8 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full rounded-md" />
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
            <dl className="detail-grid">
              {fields.map((field) => (
                <div key={field} className="detail-field">
                  <dt className="detail-label">{formatFieldLabel(field)}</dt>
                  <dd className="detail-value">{formatCellValue(rows[0][field])}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <>
              <DataTable
                columns={columns}
                rows={rows}
                rowKey={(row, idx) => String(row.id ?? idx)}
              />
              {meta && (
                <TablePagination
                  page={meta.page}
                  totalPages={meta.totalPages || 1}
                  total={meta.total}
                  pageSize={pageSize}
                  hasPreviousPage={meta.hasPreviousPage}
                  hasNextPage={meta.hasNextPage}
                  isLoading={isFetching}
                  onPrevious={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => p + 1)}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
