import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/procurement/dashboard' },
  { label: 'Plan', path: '/procurement/plan' },
  { label: 'Requisitions', path: '/procurement/requisitions' },
  { label: 'Requests', path: '/procurement/requests' },
  { label: 'Suppliers', path: '/procurement/suppliers' },
  { label: 'Evaluation', path: '/procurement/evaluation' },
  { label: 'Registration', path: '/procurement/vendor-registration' },
  { label: 'RFQ', path: '/procurement/rfqs' },
  { label: 'Tenders', path: '/procurement/tenders' },
  { label: 'Bids', path: '/procurement/bids' },
  { label: 'Bid Eval', path: '/procurement/bid-evaluation' },
  { label: 'Orders', path: '/procurement/orders' },
  { label: 'Contracts', path: '/procurement/contracts' },
  { label: 'Receipts', path: '/procurement/receipts' },
  { label: 'Invoices', path: '/procurement/invoice-matching' },
  { label: 'Approvals', path: '/procurement/approvals' },
  { label: 'Calendar', path: '/procurement/calendar' },
  { label: 'Reports', path: '/procurement/reports' },
  { label: 'Settings', path: '/procurement/settings' },
] as const;

export function ProcurementSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Procurement">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path || pathname.startsWith(`${link.path}/`)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
