import { BRANDING } from '@/constants/branding';

const ENV = import.meta.env.MODE === 'production' ? 'Production' : import.meta.env.MODE === 'staging' ? 'Staging' : 'Development';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-5">
      <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p>© {new Date().getFullYear()} {BRANDING.organization}. All rights reserved.</p>
          <p>
            {BRANDING.platformAcronym} v1.0.0 · Environment: <span className="font-medium text-foreground">{ENV}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href="https://mod.gov.rw" target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline">Documentation</a>
          <a href="https://mod.gov.rw" target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline">Privacy Policy</a>
          <a href="https://mod.gov.rw" target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline">Terms of Use</a>
          <a href={`mailto:${BRANDING.contact.email}`} className="hover:text-foreground hover:underline">{BRANDING.contact.email}</a>
        </div>
        <p className="text-muted-foreground">
          Last sync: {new Date().toLocaleString()}
        </p>
      </div>
    </footer>
  );
}
