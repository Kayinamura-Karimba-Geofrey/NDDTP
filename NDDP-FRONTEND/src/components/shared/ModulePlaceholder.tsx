import { Card, CardContent, CardHeader, CardTitle, Breadcrumbs, EmptyState } from '@/components/ui';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  module: string;
}

export function ModulePlaceholder({ title, description, module }: ModulePlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: title }]} />
        <h1 className="mt-2 text-2xl font-bold">{title}</h1>
        <p className="text-sm text-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{title} Module</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title={`${title} — Ready for Integration`}
            description={`This module maps to the ${module} microservice. Connect via API Gateway at /api/v1/${module}.`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
