import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ROUTES } from '@/constants/app';

function ErrorPage({ code, title, message }: { code: string; title: string; message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <p className="text-6xl font-bold text-accent">{code}</p>
          <CardTitle className="mt-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{message}</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
            <Link to={ROUTES.DASHBOARD}>
              <Button>Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function UnauthorizedPage() {
  return <ErrorPage code="401" title="Unauthorized" message="You must be signed in to access this page." />;
}

export function ForbiddenPage() {
  return <ErrorPage code="403" title="Access Denied" message="You do not have permission to access this resource." />;
}

export function NotFoundPage() {
  return <ErrorPage code="404" title="Page Not Found" message="The page you are looking for does not exist." />;
}

export function ServerErrorPage() {
  return <ErrorPage code="500" title="Server Error" message="An unexpected error occurred. Please try again later." />;
}
