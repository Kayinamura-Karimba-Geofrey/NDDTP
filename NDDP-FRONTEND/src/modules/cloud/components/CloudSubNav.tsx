import { Link, useLocation } from 'react-router-dom';
import { FiCloud, FiServer, FiGlobe, FiShare2, FiUploadCloud } from 'react-icons/fi';
import { cn } from '@/utils/cn';

const CLOUD_NAV = [
  { label: 'Overview', path: '/cloud', icon: FiCloud },
  { label: 'Microservices', path: '/cloud/services', icon: FiServer },
  { label: 'Environments', path: '/cloud/environments', icon: FiGlobe },
  { label: 'API Gateway', path: '/cloud/gateway', icon: FiShare2 },
  { label: 'Deployments', path: '/cloud/deployments', icon: FiUploadCloud },
] as const;

export function CloudSubNav() {
  const location = useLocation();

  return (
    <nav className="mb-6 flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1 shadow-[var(--shadow-card)]" aria-label="Cloud platform">
      {CLOUD_NAV.map(({ label, path, icon: Icon }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
