import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_BIDS } from '../constants/procurement-data';

export function BidEvaluationPage() {
  const bid = MOCK_BIDS[0];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Bid Evaluation' }]} title="Bid Evaluation" description="Evaluation committee workspace — technical, financial, compliance" />
      <ProcurementSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Technical Evaluation</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            <p>Supplier: <strong>{bid.supplier}</strong></p>
            <p>Technical Score: <strong>{bid.technicalScore}/100</strong></p>
            <p>Compliance: {bid.compliance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Financial Evaluation</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            <p>Bid Amount: <strong>{(bid.bidAmount / 1e6).toFixed(1)}M RWF</strong></p>
            <p>Financial Score: <strong>{bid.financialScore}/100</strong></p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recommendation</CardTitle></CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <p>Based on combined technical and financial scores, the evaluation committee recommends <strong>Award</strong> to {bid.supplier} for tender {bid.tenderNumber}.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
