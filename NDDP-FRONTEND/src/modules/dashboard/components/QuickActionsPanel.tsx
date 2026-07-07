import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { EXECUTIVE_QUICK_ACTIONS } from '@/constants/executive-dashboard';

const iconMap = FiIcons as Record<string, React.ComponentType<{ className?: string }>>;

export function QuickActionsPanel() {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 pt-4">
        {EXECUTIVE_QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon] ?? FiIcons.FiZap;
          return (
            <Link
              key={action.path + action.label}
              to={action.path}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              {action.label}
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
