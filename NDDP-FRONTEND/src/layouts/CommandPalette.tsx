import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { MAIN_NAVIGATION, QUICK_ACTIONS } from '@/constants/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import type { NavItem } from '@/types';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

function flattenNav(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenNav(item.children) : [])]);
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { filterNavItems } = usePermissions();
  const [query, setQuery] = useState('');
  const allItems = [...flattenNav(filterNavItems(MAIN_NAVIGATION)), ...QUICK_ACTIONS.map((a) => ({
    id: a.path,
    label: a.label,
    path: a.path,
    icon: a.icon,
    module: 'quick',
  }))];

  const filtered = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const select = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-white text-foreground shadow-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <FiSearch className="h-5 w-5 text-foreground" />
              <input
                autoFocus
                type="text"
                placeholder="Search modules and actions..."
                className="h-14 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="hidden rounded border border-border px-2 py-0.5 text-xs text-foreground sm:block">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.slice(0, 10).map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                    onClick={() => select(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-foreground">No results found</li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
