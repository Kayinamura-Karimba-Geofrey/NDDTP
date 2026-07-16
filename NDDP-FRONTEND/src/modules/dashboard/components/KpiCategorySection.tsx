import * as FiIcons from 'react-icons/fi';
import type { KpiCategory } from '@/constants/executive-dashboard';
import { Badge } from '@/components/ui';
import { formatNumber } from '@/utils/cn';

const iconMap = FiIcons as Record<string, React.ComponentType<{ className?: string }>>;

interface KpiCategorySectionProps {
  categories: KpiCategory[];
}

export function KpiCategorySection({ categories }: KpiCategorySectionProps) {
  if (!categories.length) return null;

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const CategoryIcon = iconMap[category.icon] ?? FiIcons.FiActivity;
        return (
          <section key={category.id}>
            <div className="mb-4 flex items-center gap-2">
              <CategoryIcon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {category.metrics.map((metric) => {
                const Icon = iconMap[metric.icon] ?? FiIcons.FiCircle;
                return (
                  <div key={metric.id} className="stat-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="stat-label">{metric.label}</p>
                        <p className="stat-value">
                          {typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value}
                        </p>
                        {metric.change !== undefined && (
                          <div className="mt-2">
                            <Badge variant={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'danger' : 'secondary'}>
                              {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '' : ''}{metric.change}%
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
