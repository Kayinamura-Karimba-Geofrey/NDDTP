import { Link } from 'react-router-dom';
import { AssetStatusBadge } from './AssetStatusBadge';
import type { AssetProfile } from '../constants/asset-data';

interface AssetProfileHeaderProps {
  asset: AssetProfile;
}

export function AssetProfileHeader({ asset }: AssetProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-2xl">📦</div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{asset.name}</h2>
          <p className="text-sm text-muted-foreground">{asset.category} · {asset.type}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <AssetStatusBadge status={asset.status} />
            <code className="text-xs text-muted-foreground">{asset.assetNumber}</code>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{asset.location}</p>
        </div>
      </div>
      <div className="text-sm">
        {asset.assignedTo && <p><span className="text-muted-foreground">Assigned to:</span> {asset.assignedTo}</p>}
        <p className="mt-1"><span className="text-muted-foreground">Department:</span> {asset.department}</p>
        {asset.custodian && <p className="mt-1"><span className="text-muted-foreground">Custodian:</span> {asset.custodian}</p>}
        <Link to="/assets/assignment" className="mt-2 inline-block text-xs underline">Manage assignment</Link>
      </div>
    </div>
  );
}
