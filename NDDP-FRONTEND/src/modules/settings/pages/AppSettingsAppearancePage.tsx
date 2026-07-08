import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AppSettingsSubNav } from '../components/AppSettingsSubNav';
import { setTheme, toggleSidebar } from '@/store/slices/theme-slice';
import { updateSettings } from '@/store/slices/settings-slice';
import type { RootState } from '@/store';

export function AppSettingsAppearancePage() {
  const dispatch = useDispatch();
  const theme = useSelector((s: RootState) => s.theme);
  const settings = useSelector((s: RootState) => s.settings);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Settings', path: '/settings/overview' }, { label: 'Appearance' }]} title="Appearance" description="Theme, density, and sidebar preferences" />
      <AppSettingsSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Theme</CardTitle></CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">Current theme: <span className="font-medium text-foreground capitalize">{theme.resolved}</span></p>
            <div className="flex flex-wrap gap-2">
              <Button variant={theme.resolved === 'light' ? 'primary' : 'outline'} onClick={() => { dispatch(setTheme('light')); toast.success('Light theme applied'); }}>Light</Button>
              <Button variant={theme.resolved === 'dark' ? 'primary' : 'outline'} onClick={() => { dispatch(setTheme('dark')); toast.success('Dark theme applied'); }}>Dark</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Layout</CardTitle></CardHeader>
          <CardContent className="space-y-4 pt-4">
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>Compact mode</span>
              <input
                type="checkbox"
                className="rounded border-border"
                checked={settings.compactMode}
                onChange={(e) => dispatch(updateSettings({ compactMode: e.target.checked }))}
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>Collapsed sidebar</span>
              <input
                type="checkbox"
                className="rounded border-border"
                checked={theme.sidebarCollapsed}
                onChange={() => dispatch(toggleSidebar())}
              />
            </label>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Default page size</label>
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                value={settings.pageSize}
                onChange={(e) => dispatch(updateSettings({ pageSize: Number(e.target.value) }))}
              >
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n} rows</option>)}
              </select>
            </div>
            <Button onClick={() => toast.success('Appearance preferences saved')}>Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
