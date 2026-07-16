import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetProfileHeader } from '../components/AssetProfileHeader';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { MOCK_PROFILES, MOCK_MAINTENANCE, MOCK_INSPECTIONS, MOCK_WARRANTIES, MOCK_RESERVATIONS, MOCK_AUDIT_HISTORY } from '../constants/asset-data';

const TABS = ['Overview', 'Specifications', 'Assignment', 'Maintenance', 'Inspection', 'Warranty', 'Documents', 'Reservations', 'Lifecycle', 'Audit'] as const;

export function AssetProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<typeof TABS[number]>('Overview');
  const asset = MOCK_PROFILES.find((p) => p.id === id) ?? MOCK_PROFILES[0];
  const history = MOCK_AUDIT_HISTORY.filter((h) => !h.assetNumber || h.assetNumber === asset.assetNumber);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Registry', path: '/assets/registry' }, { label: asset.assetNumber }]} title="Asset Profile" description="Complete asset lifecycle record" />
      <AssetSubNav />
      <AssetProfileHeader asset={asset} />
      <div className="mb-4 mt-6 flex gap-1 overflow-x-auto border-b border-border pb-3">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{t}</button>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6 text-sm">
          {tab === 'Overview' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <p><strong>Asset Number:</strong> {asset.assetNumber}</p>
              <p><strong>Category:</strong> {asset.category}</p>
              <p><strong>Manufacturer:</strong> {asset.manufacturer ?? '—'}</p>
              <p><strong>Model:</strong> {asset.model ?? '—'}</p>
              <p><strong>Serial:</strong> {asset.serialNumber ?? '—'}</p>
              <p><strong>Purchase Date:</strong> {asset.purchaseDate ? dayjs(asset.purchaseDate).format('MMM D, YYYY') : '—'}</p>
              <p><strong>Current Value:</strong> {asset.currentValue ? `RWF ${asset.currentValue.toLocaleString()}` : '—'}</p>
              <p><strong>Custodian:</strong> {asset.custodian ?? '—'}</p>
            </div>
          )}
          {tab === 'Specifications' && (
            <div className="space-y-2">
              <p><strong>Manufacturer:</strong> {asset.manufacturer}</p>
              <p><strong>Model:</strong> {asset.model}</p>
              <p><strong>Type:</strong> {asset.type}</p>
              <p><strong>Location:</strong> {asset.location}</p>
            </div>
          )}
          {tab === 'Assignment' && <p>Assigned to {asset.assignedTo ?? 'Unassigned'} — {asset.department}</p>}
          {tab === 'Maintenance' && MOCK_MAINTENANCE.filter((m) => m.assetNumber === asset.assetNumber).map((m) => (
            <div key={m.id} className="mb-2 rounded border p-2">{m.maintenanceNumber} — {m.type} · <AssetStatusBadge status={m.status} /></div>
          ))}
          {tab === 'Inspection' && MOCK_INSPECTIONS.filter((i) => i.assetNumber === asset.assetNumber).map((i) => (
            <div key={i.id} className="mb-2 rounded border p-2">{dayjs(i.inspectionDate).format('MMM D, YYYY')} — {i.condition} · {i.compliance}</div>
          ))}
          {tab === 'Warranty' && MOCK_WARRANTIES.filter((w) => w.assetNumber === asset.assetNumber).map((w) => (
            <div key={w.id} className="mb-2 rounded border p-2">{w.warrantyNumber} — {w.provider} · Expires {dayjs(w.expiryDate).format('MMM D, YYYY')}</div>
          ))}
          {tab === 'Documents' && <p className="text-muted-foreground"><Link to="/assets/documents" className="underline">View asset documents</Link></p>}
          {tab === 'Reservations' && MOCK_RESERVATIONS.filter((r) => r.assetName === asset.name).map((r) => (
            <div key={r.id} className="mb-2 rounded border p-2">{r.requester} — {dayjs(r.reservationDate).format('MMM D')}</div>
          ))}
          {tab === 'Lifecycle' && (
            <div className="flex flex-wrap gap-2 text-xs">
              {['Purchased', 'Received', 'Registered', 'Assigned', 'Maintained', 'Inspected'].map((s, i) => (
                <span key={s} className="flex items-center gap-2"><span className="rounded-full bg-primary/10 px-2 py-1 text-primary">{s}</span>{i < 5 && '↓'}</span>
              ))}
            </div>
          )}
          {tab === 'Audit' && history.map((h) => (
            <div key={h.id} className="mb-2 border-b pb-2">{dayjs(h.date).format('MMM D, YYYY')} — {h.event}: {h.description}</div>
          ))}
        </CardContent>
      </Card>
      <div className="mt-4"><Link to="/assets/registry" className="text-sm underline">← Back to registry</Link></div>
    </div>
  );
}
