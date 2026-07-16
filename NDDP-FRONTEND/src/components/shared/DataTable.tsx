import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey?: (row: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No records found',
  className,
}: DataTableProps<T>) {
  if (!rows.length) {
    return (
      <div className="data-table-empty">{emptyMessage}</div>
    );
  }

  return (
    <div className={cn('data-table-wrap', className)}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.headerClassName}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={rowKey?.(row, index) ?? String(row.id ?? index)}>
              {columns.map((col) => (
                <td key={col.key} className={col.className}>
                  {col.render ? col.render(row, index) : String(row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isLoading?: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function TablePagination({
  page,
  totalPages,
  total,
  pageSize,
  hasPreviousPage,
  hasNextPage,
  isLoading,
  onPrevious,
  onNext,
}: TablePaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="table-pagination">
      <p className="table-pagination-meta">
        Showing <span className="font-medium text-foreground">{from}–{to}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> records
        {totalPages > 1 && (
          <span className="text-muted-foreground"> · Page {page} of {totalPages}</span>
        )}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="table-pagination-btn"
          disabled={!hasPreviousPage || isLoading}
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="table-pagination-btn"
          disabled={!hasNextPage || isLoading}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
