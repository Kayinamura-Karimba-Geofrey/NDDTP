import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_EVALUATIONS, type SupplierEvaluation } from '../constants/procurement-data';

export function SupplierEvaluationPage() {
  const columns: DataTableColumn<SupplierEvaluation>[] = [
    { key: 'supplier', header: 'Supplier', render: (r) => <span className="font-medium">{r.supplierName}</span> },
    { key: 'delivery', header: 'Delivery', render: (r) => `${r.deliveryScore}%` },
    { key: 'quality', header: 'Quality', render: (r) => `${r.qualityScore}%` },
    { key: 'pricing', header: 'Pricing', render: (r) => `${r.pricingScore}%` },
    { key: 'compliance', header: 'Compliance', render: (r) => `${r.complianceScore}%` },
    { key: 'overall', header: 'Overall', render: (r) => <span className="font-bold">{r.overallRating}%</span> },
    { key: 'period', header: 'Period' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Supplier Evaluation' }]} title="Supplier Evaluation" description="Track supplier performance — delivery, quality, pricing, compliance" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EVALUATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}
