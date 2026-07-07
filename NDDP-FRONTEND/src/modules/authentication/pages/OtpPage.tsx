import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/slices/auth-slice';
import { useVerifyOtpMutation } from '../api/auth.api';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { OtpInput } from '../components/OtpInput';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/app';
import { SEED_CREDENTIALS } from '@/constants/seed-credentials';

const RESEND_SECONDS = 60;

export function OtpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [status, setStatus] = useState<'pending' | 'verified' | 'expired' | 'invalid'>('pending');

  useEffect(() => {
    if (countdown <= 0) return;
    const id = window.setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => window.clearInterval(id);
  }, [countdown]);

  const handleVerify = useCallback(async () => {
    if (code.length !== 6) {
      setError('Enter the 6-digit verification code');
      setStatus('invalid');
      return;
    }
    setError(null);
    try {
      const result = await verifyOtp({ code }).unwrap();
      setStatus('verified');
      dispatch(setCredentials({ user: result.user, tokens: result.tokens }));
      toast.success('Verification successful');
      navigate(ROUTES.DASHBOARD);
    } catch {
      setError('Invalid or expired verification code');
      setStatus('invalid');
    }
  }, [code, dispatch, navigate, verifyOtp]);

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(RESEND_SECONDS);
    setError(null);
    setStatus('pending');
    toast.success('A new verification code has been sent');
  };

  return (
    <AuthSplitLayout
      title="Two-Factor Verification"
      subtitle="Enter the 6-digit code from your authenticator app"
    >
      <div className="space-y-6">
        <OtpInput value={code} onChange={setCode} disabled={isLoading} error={error ?? undefined} />

        <div className="text-center text-sm text-muted-foreground">
          {countdown > 0 ? (
            <span>Resend code in {countdown}s</span>
          ) : (
            <button type="button" className="font-medium text-foreground hover:underline" onClick={handleResend}>
              Resend OTP
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <Button className="flex-1" isLoading={isLoading} onClick={handleVerify}>
            Verify
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate(ROUTES.LOGIN)}>
            Cancel
          </Button>
        </div>

        {import.meta.env.DEV && (
          <p className="text-center text-xs text-muted-foreground">
            Demo OTP: <code>{SEED_CREDENTIALS.mfa.otp}</code>
          </p>
        )}

        {status === 'expired' && (
          <p className="text-center text-sm text-danger">Code expired. Request a new code.</p>
        )}
      </div>

      <Link to={ROUTES.LOGIN} className="mt-6 block text-center text-sm text-foreground hover:underline">
        Back to login
      </Link>
    </AuthSplitLayout>
  );
}
