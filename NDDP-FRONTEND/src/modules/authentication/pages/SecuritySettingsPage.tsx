import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShield, FiSmartphone } from 'react-icons/fi';
import {
  useGetMfaStatusQuery,
  useSetupMfaMutation,
  useVerifyMfaSetupMutation,
  useDisableMfaMutation,
} from '../api/security.api';
import { AuthSecurityNav } from '../components/AuthSecurityNav';
import { OtpInput } from '../components/OtpInput';
import { PasswordField } from '../components/PasswordField';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, Input } from '@/components/ui';
import { ENABLE_MOCK_API, ROUTES } from '@/constants/app';

export function SecuritySettingsPage() {
  const { data: mfaStatus, isLoading } = useGetMfaStatusQuery(undefined, { skip: ENABLE_MOCK_API });
  const [setupMfa, { isLoading: settingUp }] = useSetupMfaMutation();
  const [verifySetup, { isLoading: verifying }] = useVerifyMfaSetupMutation();
  const [disableMfa, { isLoading: disabling }] = useDisableMfaMutation();

  const [setupData, setSetupData] = useState<{ secret: string; qrCodeUrl: string; backupCodes: string[] } | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [disablePassword, setDisablePassword] = useState('');
  const [disableCode, setDisableCode] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [mockMfaEnabled, setMockMfaEnabled] = useState(false);

  const mfaEnabled = ENABLE_MOCK_API ? mockMfaEnabled : (mfaStatus?.mfaEnabled ?? false);

  const handleEnableMfa = async () => {
    try {
      if (ENABLE_MOCK_API) {
        setSetupData({
          secret: 'JBSWY3DPEHPK3PXP',
          qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/NDDTP',
          backupCodes: ['A1B2-C3D4', 'E5F6-G7H8', 'I9J0-K1L2'],
        });
        return;
      }
      const result = await setupMfa().unwrap();
      setSetupData(result);
    } catch {
      toast.error('Failed to initiate MFA setup');
    }
  };

  const handleVerifySetup = async () => {
    try {
      if (ENABLE_MOCK_API) {
        setMockMfaEnabled(true);
        setSetupData(null);
        toast.success('MFA enabled successfully');
        return;
      }
      await verifySetup({ code: verifyCode }).unwrap();
      setSetupData(null);
      toast.success('MFA enabled successfully');
    } catch {
      toast.error('Invalid verification code');
    }
  };

  const handleDisableMfa = async () => {
    try {
      if (ENABLE_MOCK_API) {
        setMockMfaEnabled(false);
        toast.success('MFA disabled');
        return;
      }
      await disableMfa({ password: disablePassword, code: disableCode }).unwrap();
      toast.success('MFA disabled');
    } catch {
      toast.error('Failed to disable MFA');
    }
  };

  if (isLoading && !ENABLE_MOCK_API) {
    return <div className="data-table-empty">Loading security settings...</div>;
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authentication', path: '/auth/security' }, { label: 'Security Settings' }]}
        title="Security Settings"
        description="Configure account security and authentication options"
      />
      <AuthSecurityNav />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FiShield className="h-5 w-5" /> Multi-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Status:{' '}
              <span className="font-medium text-foreground">{mfaEnabled ? 'Enabled' : 'Disabled'}</span>
            </p>

            {!mfaEnabled && !setupData && (
              <Button onClick={handleEnableMfa} isLoading={settingUp}>
                Enable MFA
              </Button>
            )}

            {setupData && (
              <div className="space-y-4 rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-foreground">Scan with your authenticator app</p>
                <img src={setupData.qrCodeUrl} alt="MFA QR code" className="mx-auto h-40 w-40 rounded-lg border border-border" />
                <p className="text-xs text-muted-foreground">Secret: <code>{setupData.secret}</code></p>
                <div>
                  <p className="mb-2 text-sm font-medium">Backup codes</p>
                  <ul className="space-y-1 text-xs font-mono text-muted-foreground">
                    {setupData.backupCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                </div>
                <OtpInput value={verifyCode} onChange={setVerifyCode} />
                <Button onClick={handleVerifySetup} isLoading={verifying}>Verify & Enable</Button>
              </div>
            )}

            {mfaEnabled && (
              <div className="space-y-3 rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Disable MFA (requires password and current code)</p>
                <PasswordField label="Password" value={disablePassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisablePassword(e.target.value)} />
                <OtpInput value={disableCode} onChange={setDisableCode} length={6} />
                <Button variant="danger" onClick={handleDisableMfa} isLoading={disabling}>Disable MFA</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recovery & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Recovery Email"
              type="email"
              placeholder="recovery@mod.gov.rw"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
            />
            <Input
              label="Recovery Phone"
              type="tel"
              placeholder="+250 7XX XXX XXX"
              value={recoveryPhone}
              onChange={(e) => setRecoveryPhone(e.target.value)}
            />
            <div>
              <label className="text-sm font-medium text-foreground">Session Timeout (minutes)</label>
              <select
                className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <Button onClick={() => toast.success('Security preferences saved')}>Save Preferences</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FiSmartphone className="h-5 w-5" /> Trusted Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="info" title="Manage trusted devices">
              View and manage devices in the{' '}
              <Link to={ROUTES.DEVICES} className="font-medium underline">Device Management</Link> section.
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
