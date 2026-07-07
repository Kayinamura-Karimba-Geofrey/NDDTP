import { Link } from 'react-router-dom';
import { AuthLayout } from '@/layouts/MainLayout';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ROUTES } from '@/constants/app';

export function SessionExpiredPage() {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-warning/10 text-2xl">
              ⏱
            </div>
            <CardTitle>Session Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-muted-foreground">
              Your session has expired due to inactivity or token expiration. For your security, please sign in again.
            </p>
            <Link to={ROUTES.LOGIN}>
              <Button className="w-full">Login Again</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}
