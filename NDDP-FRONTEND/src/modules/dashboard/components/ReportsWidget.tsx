import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { REPORT_SHORTCUTS } from '@/constants/executive-dashboard';

const iconMap = FiIcons as Record<string, React.ComponentType<{ className?: string }>>;

export function ReportsWidget() {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">Reports & Exports</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 pt-4">
        {REPORT_SHORTCUTS.map((report) => {
          const Icon = iconMap[report.icon] ?? FiIcons.FiFileText;
          return (
            <Link
              key={report.label}
              to={report.path}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              {report.label}
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
