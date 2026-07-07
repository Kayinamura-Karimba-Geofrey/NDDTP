import { cn } from '@/utils/cn';
import type { ApplicationStatus, VacancyStatus, OfferStatus } from '../constants/recruitment-data';

type Status = ApplicationStatus | VacancyStatus | OfferStatus | string;

const STYLES: Record<string, string> = {
  SUBMITTED: 'bg-muted text-muted-foreground',
  SCREENING: 'bg-primary/10 text-primary',
  SHORTLISTED: 'bg-primary/10 text-primary',
  INTERVIEW: 'bg-warning/10 text-warning',
  ASSESSED: 'bg-primary/10 text-primary',
  OFFERED: 'bg-success/10 text-success',
  HIRED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  WITHDRAWN: 'bg-muted text-muted-foreground',
  OPEN: 'bg-success/10 text-success',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  CLOSED: 'bg-muted text-muted-foreground',
  CANCELLED: 'bg-destructive/10 text-destructive',
  DRAFT: 'bg-muted text-muted-foreground',
  SENT: 'bg-primary/10 text-primary',
  ACCEPTED: 'bg-success/10 text-success',
  EXPIRED: 'bg-destructive/10 text-destructive',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
};

export function RecruitmentStatusBadge({ status }: { status: Status }) {
  const label = String(status).replace(/_/g, ' ');
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {label}
    </span>
  );
}
