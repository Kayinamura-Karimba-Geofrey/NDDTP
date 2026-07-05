import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBell, FiSearch, FiSun, FiMoon, FiLogOut, FiUser, FiSettings, FiMenu, FiCommand,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/auth-slice';
import { setTheme } from '@/store/slices/theme-slice';
import { setSearchOpen } from '@/store/slices/search-slice';
import { markAllRead } from '@/store/slices/notifications-slice';
import { Avatar, Button } from '@/components/ui';
import { ROUTES } from '@/constants/app';

interface HeaderProps {
  onMenuClick: () => void;
  onCommandPalette: () => void;
}

export function Header({ onMenuClick, onCommandPalette }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const { resolved } = useAppSelector((s) => s.theme);
  const unreadCount = useAppSelector((s) => s.notifications.unreadCount);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const toggleTheme = () => {
    dispatch(setTheme(resolved === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <button
        type="button"
        className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <FiMenu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 md:block">
        <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search modules, records, people... (Ctrl+K)"
          className="h-10 w-full rounded-md border border-border bg-muted/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          onFocus={() => dispatch(setSearchOpen(true))}
          onClick={onCommandPalette}
          readOnly
          aria-label="Global search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onCommandPalette} aria-label="Command palette" className="hidden sm:flex">
          <FiCommand className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {resolved === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
          >
            <FiBell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <button type="button" className="text-xs text-accent" onClick={() => dispatch(markAllRead())}>
                  Mark all read
                </button>
              </div>
              <p className="text-sm text-muted-foreground">No new notifications</p>
              <Link to="/notifications" className="mt-3 block text-sm text-accent hover:underline">
                View all
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md p-1 hover:bg-muted"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <Avatar
              name={user ? `${user.firstName} ${user.lastName}` : 'User'}
              src={user?.avatarUrl}
              size="sm"
            />
            <span className="hidden text-sm font-medium md:block">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card py-1 shadow-lg" role="menu">
              <Link to={ROUTES.PROFILE} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted" role="menuitem">
                <FiUser className="h-4 w-4" /> Profile
              </Link>
              <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted" role="menuitem">
                <FiSettings className="h-4 w-4" /> Settings
              </Link>
              <hr className="my-1 border-border" />
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-muted"
                onClick={handleLogout}
                role="menuitem"
              >
                <FiLogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
