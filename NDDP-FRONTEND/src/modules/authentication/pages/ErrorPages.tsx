import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiMail, FiRefreshCw } from 'react-icons/fi';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { BRANDING } from '@/constants/branding';
import { ROUTES } from '@/constants/app';

interface ErrorPageProps {
  code: string;
  title: string;
  message: string;
  illustration?: string;
  actions?: React.ReactNode;
}

function ErrorPage({ code, title, message, illustration, actions }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          {illustration && (
            <div className="mb-4 text-6xl" role="img" aria-hidden>
              {illustration}
            </div>
          )}
          <p className="text-6xl font-bold text-foreground">{code}</p>
          <CardTitle className="mt-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{message}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {actions ?? (
              <>
                <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
                <Link to={ROUTES.DASHBOARD}>
                  <Button>Dashboard</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function UnauthorizedPage() {
  return (
    <ErrorPage
      code="401"
      title="Unauthorized"
      message="You must be signed in to access this page."
      illustration="🔒"
      actions={
        <Link to={ROUTES.LOGIN}>
          <Button className="w-full sm:w-auto">Sign In</Button>
        </Link>
      }
    />
  );
}

export function ForbiddenPage() {
  return (
    <ErrorPage
      code="403"
      title="Permission Denied"
      message="You do not have permission to access this resource. Contact your administrator if you need access."
      illustration="🚫"
      actions={
        <>
          <Link to={ROUTES.DASHBOARD}>
            <Button><FiHome className="h-4 w-4" /> Back to Dashboard</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.href = `mailto:${BRANDING.contact.email}?subject=Access%20Request`}>
            Request Access
          </Button>
          <a href={`mailto:${BRANDING.contact.email}`}>
            <Button variant="ghost"><FiMail className="h-4 w-4" /> Contact Administrator</Button>
          </a>
        </>
      }
    />
  );
}

export function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message="The page you are looking for does not exist or may have been moved."
      illustration="🔍"
      actions={
        <>
          <Link to={ROUTES.DASHBOARD}>
            <Button><FiHome className="h-4 w-4" /> Return Home</Button>
          </Link>
          <Link to="/search">
            <Button variant="outline"><FiSearch className="h-4 w-4" /> Search</Button>
          </Link>
        </>
      }
    />
  );
}

export function ServerErrorPage() {
  return (
    <ErrorPage
      code="500"
      title="Server Error"
      message="An unexpected error occurred on our servers. Please try again or contact support if the problem persists."
      illustration="⚠️"
      actions={
        <>
          <Button onClick={() => window.location.reload()}>
            <FiRefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <a href={`mailto:${BRANDING.contact.email}`}>
            <Button variant="outline"><FiMail className="h-4 w-4" /> Contact Support</Button>
          </a>
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="ghost">Return Dashboard</Button>
          </Link>
        </>
      }
    />
  );
}
