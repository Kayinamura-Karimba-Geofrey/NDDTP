import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, MobileSidebarOverlay } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';
import { useAppSelector } from '@/store';
import { cn } from '@/utils/cn';

export function MainLayout() {
  const collapsed = useAppSelector((s) => s.theme.sidebarCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page">
      <Sidebar />
      <MobileSidebarOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />

      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-64',
        )}
      >
        <Header
          onMenuClick={() => setMobileOpen(true)}
          onCommandPalette={() => setCommandOpen(true)}
        />
        <main className="flex-1 p-6 md:p-8" id="main-content">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      {children}
    </div>
  );
}
