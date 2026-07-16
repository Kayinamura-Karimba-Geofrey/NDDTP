import * as FiIcons from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar } from '@/store/slices/theme-slice';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { BRANDING } from '@/constants/branding';
import { cn } from '@/utils/cn';
import type { NavItem } from '@/types';

const iconMap = FiIcons as Record<string, React.ComponentType<{ className?: string }>>;

function NavIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? FiIcons.FiCircle;
  return <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />;
}

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

  return (
    <Link
      to={item.path}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <NavIcon name={item.icon} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs text-primary-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  if (collapsed) {
    return item.children?.map((child) => <NavLink key={child.id} item={child} collapsed={collapsed} />);
  }

  return (
    <div>
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {item.label}
      </p>
      <div className="space-y-0.5">
        {item.children?.map((child) => (
          <NavLink key={child.id} item={child} collapsed={collapsed} />
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.theme.sidebarCollapsed);
  const { filterNavItems } = usePermissions();
  const navItems = filterNavItems(MAIN_NAVIGATION);

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <img
          src={BRANDING.logoUrl}
          alt={`${BRANDING.forceName} logo`}
          className="h-9 w-9 rounded-lg object-cover ring-1 ring-border"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">{BRANDING.platformAcronym}</p>
            <p className="truncate text-xs text-muted-foreground">{BRANDING.shortName}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-3">
        {navItems.map((item) =>
          item.children ? (
            <NavGroup key={item.id} item={item} collapsed={collapsed} />
          ) : (
            <NavLink key={item.id} item={item} collapsed={collapsed} />
          ),
        )}
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FiIcons.FiChevronLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>
    </aside>
  );
}

export function MobileSidebarOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}
