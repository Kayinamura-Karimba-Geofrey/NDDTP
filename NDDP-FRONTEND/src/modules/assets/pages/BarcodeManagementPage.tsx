import toast from 'react-hot-toast';
import { AssetSubNav } from '../components/AssetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ASSETS } from '../constants/asset-data';

export function BarcodeManagementPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Barcodes' }]} title="Barcode / QR Management" description="Generate, print, and scan asset labels" />
      <AssetSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_ASSETS.slice(0, 6).map((a) => (
          <Card key={a.id}>
            <CardContent className="flex flex-col items-center pt-6">
              <div className="mb-3 flex h-24 w-24 items-center justify-center rounded border border-dashed border-border bg-muted text-xs text-muted-foreground">QR / Barcode</div>
              <p className="font-mono text-sm font-medium">{a.assetNumber}</p>
              <p className="text-xs text-muted-foreground">{a.name}</p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast(`Print label ${a.assetNumber}`)}>Print</Button>
                <Button variant="ghost" size="sm" onClick={() => toast(`Verified ${a.assetNumber}`)}>Verify</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
