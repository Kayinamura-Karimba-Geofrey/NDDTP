import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/utils/cn';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm', className)}>
      <Link to="/dashboard" className="text-muted-foreground hover:text-foreground" aria-label="Dashboard">
        <FiHome className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <FiChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
