import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/inventory/dashboard' },
  { label: 'Warehouses', path: '/inventory/warehouses' },
  { label: 'Locations', path: '/inventory/locations' },
  { label: 'Items', path: '/inventory/items' },
  { label: 'Categories', path: '/inventory/categories' },
  { label: 'Units', path: '/inventory/units' },
  { label: 'Stock Levels', path: '/inventory/stock-levels' },
  { label: 'Receipts', path: '/inventory/goods-receipt' },
  { label: 'Issues', path: '/inventory/goods-issue' },
  { label: 'Requests', path: '/inventory/requests' },
  { label: 'Transfers', path: '/inventory/transfers' },
  { label: 'Adjustments', path: '/inventory/adjustments' },
  { label: 'Stock Counts', path: '/inventory/stock-counts' },
  { label: 'Batches', path: '/inventory/batches' },
  { label: 'Expiry', path: '/inventory/expiry' },
  { label: 'Reorder', path: '/inventory/reorder' },
  { label: 'Suppliers', path: '/inventory/suppliers' },
  { label: 'Valuation', path: '/inventory/valuation' },
  { label: 'Reports', path: '/inventory/reports' },
  { label: 'Settings', path: '/inventory/settings' },
] as const;

export function InventorySubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Inventory">
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
