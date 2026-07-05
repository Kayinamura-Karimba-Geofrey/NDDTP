import { BRANDING } from '@/constants/branding';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} {BRANDING.organization}. All rights reserved.
        </p>
        <p>
          {BRANDING.platformAcronym} v1.0 — {BRANDING.contact.phone} —{' '}
          <a href={`mailto:${BRANDING.contact.email}`} className="text-accent hover:underline">
            {BRANDING.contact.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
