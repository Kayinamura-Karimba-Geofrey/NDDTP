import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBell, FiSearch, FiLogOut, FiUser, FiSettings, FiMenu, FiCommand,
  FiMessageSquare, FiCheckSquare, FiCalendar, FiHelpCircle, FiSun, FiMoon, FiGlobe, FiZap,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/auth-slice';
import { setSearchOpen } from '@/store/slices/search-slice';
import { markAllRead } from '@/store/slices/notifications-slice';
import { setTheme } from '@/store/slices/theme-slice';
import { useLogoutMutation } from '@/modules/authentication/api/auth.api';
import { Avatar, Button } from '@/components/ui';
import { BRANDING } from '@/constants/branding';
import { ROUTES } from '@/constants/app';
import dayjs from 'dayjs';

interface HeaderProps {
  onMenuClick: () => void;
  onCommandPalette: () => void;
}

export function Header({ onMenuClick, onCommandPalette }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const tokens = useAppSelector((s) => s.auth.tokens);
  const { resolved } = useAppSelector((s) => s.theme);
  const unreadCount = useAppSelector((s) => s.notifications.unreadCount);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [logoutRequest] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutRequest({ refreshToken: tokens?.refreshToken }).unwrap();
    } catch {
      // Clear local session even if server logout fails.
    }
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const lastLogin =
    sessionStorage.getItem('nddtp_display_last_login') ??
    localStorage.getItem('nddtp_last_login') ??
    new Date(Date.now() - 86_400_000).toISOString();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card px-4 md:px-5">
      <button
        type="button"
        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <FiMenu className="h-5 w-5" />
      </button>

      <div className="hidden min-w-0 shrink-0 items-center gap-2 lg:flex">
        <img src={BRANDING.logoUrl} alt="" className="h-8 w-8 rounded-lg object-cover ring-1 ring-border" />
        <div className="hidden xl:block">
          <p className="truncate text-xs font-bold text-foreground">{BRANDING.platformAcronym}</p>
          <p className="truncate text-[10px] text-muted-foreground">National Defence Digital Transformation Platform</p>
        </div>
      </div>

      <div className="relative mx-2 hidden max-w-md flex-1 md:block">
        <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search personnel, assets, reports, users... (Ctrl+K)"
          className="h-10 w-full rounded-lg border-0 bg-muted pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          onFocus={() => dispatch(setSearchOpen(true))}
          onClick={onCommandPalette}
          readOnly
          aria-label="Global search"
        />
      </div>

      <div className="ml-auto flex items-center gap-0.5">
        <Button variant="ghost" size="icon" onClick={onCommandPalette} aria-label="Quick actions" className="hidden sm:flex" title="Quick actions">
          <FiZap className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onCommandPalette} aria-label="Command palette" className="hidden lg:flex">
          <FiCommand className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
            <FiBell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-elevated)]">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <button type="button" className="text-xs font-medium text-muted-foreground hover:text-foreground" onClick={() => dispatch(markAllRead())}>
                  Mark all read
                </button>
              </div>
              <Link to="/notifications/center" className="block text-sm font-medium text-foreground hover:underline" onClick={() => setNotifOpen(false)}>
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <Link to="/messaging/inbox" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Messages">
          <FiMessageSquare className="h-5 w-5" />
        </Link>

        <Link to="/workflow/my-approvals" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Tasks">
          <FiCheckSquare className="h-5 w-5" />
        </Link>

        <Link to="/calendar/view" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Calendar">
          <FiCalendar className="h-5 w-5" />
        </Link>

        <Button variant="ghost" size="icon" aria-label="Help center" title="Help center">
          <FiHelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => dispatch(setTheme(resolved === 'dark' ? 'light' : 'dark'))} aria-label="Toggle theme">
          {resolved === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" aria-label="Language" title="Language (EN)">
          <FiGlobe className="h-5 w-5" />
        </Button>

        <div className="relative ml-1">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <Avatar name={user ? `${user.firstName} ${user.lastName}` : 'User'} src={user?.avatarUrl} size="sm" />
            <span className="hidden text-sm font-medium text-foreground lg:block">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-card shadow-[var(--shadow-elevated)]" role="menu">
              <div className="border-b border-border px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={user ? `${user.firstName} ${user.lastName}` : 'User'} src={user?.avatarUrl} size="md" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{user ? `${user.firstName} ${user.lastName}` : 'Guest'}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {user?.employeeNumber && <div><dt className="inline">Employee #: </dt><dd className="inline text-foreground">{user.employeeNumber}</dd></div>}
                  {(user?.jobTitle || user?.rank) && (
                    <div><dt className="inline">Position: </dt><dd className="inline text-foreground">{user.jobTitle ?? user.rank}</dd></div>
                  )}
                  {user?.rank && user?.jobTitle && <div><dt className="inline">Rank: </dt><dd className="inline text-foreground">{user.rank}</dd></div>}
                  {user?.department && <div><dt className="inline">Department: </dt><dd className="inline text-foreground">{user.department}</dd></div>}
                  {user?.roles?.length ? (
                    <div><dt className="inline">Role: </dt><dd className="inline text-foreground">{user.roles.join(', ').replace(/_/g, ' ')}</dd></div>
                  ) : null}
                  <div><dt className="inline">Last login: </dt><dd className="inline text-foreground">{dayjs(lastLogin).format('MMM D, HH:mm')}</dd></div>
                </dl>
              </div>
              <div className="py-1">
                <Link to={ROUTES.PROFILE} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted" role="menuitem" onClick={() => setProfileOpen(false)}>
                  <FiUser className="h-4 w-4 text-muted-foreground" /> My Profile
                </Link>
                <Link to={ROUTES.CHANGE_PASSWORD} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted" role="menuitem" onClick={() => setProfileOpen(false)}>
                  <FiSettings className="h-4 w-4 text-muted-foreground" /> Change Password
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted" role="menuitem" onClick={() => setProfileOpen(false)}>
                  <FiSettings className="h-4 w-4 text-muted-foreground" /> Preferences
                </Link>
                <hr className="my-1 border-border" />
                <button type="button" className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted" onClick={handleLogout} role="menuitem">
                  <FiLogOut className="h-4 w-4 text-muted-foreground" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
