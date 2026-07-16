import { cn } from '@/utils/cn';

interface PermissionMatrixProps {
  rows: string[];
  columns: string[];
  actions: readonly string[];
  values: Record<string, Record<string, boolean[]>>;
  onToggle?: (row: string, col: string, actionIndex: number, value: boolean) => void;
  readOnly?: boolean;
}

export function PermissionMatrix({ rows, columns, actions, values, onToggle, readOnly }: PermissionMatrixProps) {
  return (
    <div className="data-table-wrap overflow-x-auto">
      <table className="data-table min-w-[800px]">
        <thead>
          <tr>
            <th className="sticky left-0 bg-card">Resource</th>
            {columns.map((col) => (
              <th key={col} colSpan={actions.length} className="border-l border-border text-center">
                {col}
              </th>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 bg-card" />
            {columns.map((col) =>
              actions.map((action) => (
                <th key={`${col}-${action}`} className="text-xs font-normal text-muted-foreground">
                  {action}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td className="sticky left-0 bg-card font-medium">{row}</td>
              {columns.map((col) =>
                actions.map((action, actionIndex) => {
                  const checked = values[row]?.[col]?.[actionIndex] ?? false;
                  return (
                    <td key={`${row}-${col}-${action}`} className="text-center">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={readOnly}
                        onChange={(e) => onToggle?.(row, col, actionIndex, e.target.checked)}
                        className={cn('rounded border-border', checked && 'accent-primary')}
                        aria-label={`${row} ${col} ${action}`}
                      />
                    </td>
                  );
                }),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
