import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { FiLock, FiMail } from 'react-icons/fi';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { Button, Alert } from '@/components/ui';
import { BRANDING } from '@/constants/branding';
import { ROUTES } from '@/constants/app';

export function AccountLockedPage() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') ?? 'Too many failed login attempts.';
  const until = searchParams.get('until');
  const unlockTime = until ? dayjs(until).format('MMMM D, YYYY [at] HH:mm') : 'Contact your administrator';

  return (
    <AuthSplitLayout title="Account Locked" subtitle="Your account is temporarily unavailable">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <FiLock className="h-8 w-8 text-danger" />
          </div>
        </div>

        <Alert variant="danger" title="Access temporarily suspended">
          {reason}
        </Alert>

        <dl className="space-y-2 rounded-lg border border-border p-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Reason</dt>
            <dd className="text-right text-foreground">Security lockout</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Unlock time</dt>
            <dd className="text-right font-medium text-foreground">{unlockTime}</dd>
          </div>
        </dl>

        <p className="text-sm text-muted-foreground">
          If you believe this is an error, contact the system administrator or IT help desk.
        </p>

        <div className="space-y-2">
          <Link to={ROUTES.LOGIN}>
            <Button className="w-full">Return to Login</Button>
          </Link>
          <a href={`mailto:${BRANDING.contact.email}`}>
            <Button variant="outline" className="w-full">
              <FiMail className="h-4 w-4" /> Contact Support
            </Button>
          </a>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
