import { Link } from 'react-router-dom';
import { AuthLayout } from '@/layouts/MainLayout';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ROUTES } from '@/constants/app';

function AuthMessagePage({ title, message, actionLabel, actionTo }: {
  title: string; message: string; actionLabel: string; actionTo: string;
}) {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-foreground">{message}</p>
            <Link to={actionTo}>
              <Button>{actionLabel}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}

export function SessionExpiredPage() {
  return (
    <AuthMessagePage
      title="Session Expired"
      message="Your session has expired for security reasons. Please sign in again."
      actionLabel="Sign In"
      actionTo={ROUTES.LOGIN}
    />
  );
}

export function ResetPasswordPage() {
  return (
    <AuthMessagePage
      title="Reset Password"
      message="Password reset form — connect to auth-service /auth/reset-password endpoint."
      actionLabel="Back to Login"
      actionTo={ROUTES.LOGIN}
    />
  );
}

export function ChangePasswordPage() {
  return (
    <AuthMessagePage
      title="Change Password"
      message="Change password form — connect to auth-service /auth/change-password endpoint."
      actionLabel="Back to Dashboard"
      actionTo={ROUTES.DASHBOARD}
    />
  );
}
