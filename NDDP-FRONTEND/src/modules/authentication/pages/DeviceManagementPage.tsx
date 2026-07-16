import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiMonitor, FiSmartphone, FiShield, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useGetDevicesQuery } from '../api/security.api';
import { AuthSecurityNav } from '../components/AuthSecurityNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import type { TrustedDevice } from '../constants/auth-mock-data';

export function DeviceManagementPage() {
  const { data: devices = [], isLoading, refetch } = useGetDevicesQuery();
  const [renaming, setRenaming] = useState<string | null>(null);

  const handleTrust = (device: TrustedDevice) => {
    toast.success(`${device.deviceName} marked as trusted`);
    refetch();
  };

  const handleRemove = (device: TrustedDevice) => {
    if (!window.confirm(`Remove device "${device.deviceName}"?`)) return;
    toast.success('Device removed');
    refetch();
  };

  const handleRename = (device: TrustedDevice) => {
    const name = window.prompt('Device name', device.deviceName);
    if (name) {
      toast.success('Device renamed');
      setRenaming(null);
      refetch();
    }
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authentication', path: '/auth/security' }, { label: 'Devices' }]}
        title="Device Management"
        description="Manage devices associated with your account"
      />
      <AuthSecurityNav />
      {isLoading ? (
        <div className="data-table-empty">Loading devices...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {device.platform === 'Mobile' ? (
                      <FiSmartphone className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <FiMonitor className="h-8 w-8 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{device.deviceName}</p>
                      <p className="text-xs text-muted-foreground">{device.browser} · {device.os}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    device.status === 'trusted' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {device.status}
                  </span>
                </div>
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">IP</dt>
                    <dd className="text-foreground">{device.ipAddress}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Location</dt>
                    <dd className="text-foreground">{device.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Last Login</dt>
                    <dd className="text-foreground">{dayjs(device.lastLogin).format('MMM D, HH:mm')}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  {device.status !== 'trusted' && (
                    <Button variant="outline" size="sm" onClick={() => handleTrust(device)}>
                      <FiShield className="h-3 w-3" /> Trust
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleRename(device)} disabled={renaming === device.id}>
                    <FiEdit2 className="h-3 w-3" /> Rename
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRemove(device)}>
                    <FiTrash2 className="h-3 w-3" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
