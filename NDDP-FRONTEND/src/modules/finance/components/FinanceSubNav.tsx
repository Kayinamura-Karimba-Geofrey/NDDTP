import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/finance/dashboard' },
  { label: 'Fiscal Years', path: '/finance/fiscal-years' },
  { label: 'Planning', path: '/finance/budget-planning' },
  { label: 'Allocation', path: '/finance/budget-allocation' },
  { label: 'Transfers', path: '/finance/budget-transfers' },
  { label: 'Monitoring', path: '/finance/budget-monitoring' },
  { label: 'Cost Centers', path: '/finance/cost-centers' },
  { label: 'Programs', path: '/finance/programs' },
  { label: 'Commitments', path: '/finance/commitments' },
  { label: 'Expenditures', path: '/finance/expenditures' },
  { label: 'Invoices', path: '/finance/invoices' },
  { label: 'Payments', path: '/finance/payments' },
  { label: 'Payable', path: '/finance/accounts-payable' },
  { label: 'Receivable', path: '/finance/accounts-receivable' },
  { label: 'Revenue', path: '/finance/revenue' },
  { label: 'Approvals', path: '/finance/approvals' },
  { label: 'Calendar', path: '/finance/calendar' },
  { label: 'Reports', path: '/finance/reports' },
  { label: 'Audit', path: '/finance/audit' },
  { label: 'Settings', path: '/finance/settings' },
] as const;

export function FinanceSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Finance">
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
