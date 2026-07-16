import { cn } from '@/utils/cn';
import type { AiStatus, ConversationStatus, MessageStatus } from '../constants/ai-assistant-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  CLOSED: 'bg-muted text-muted-foreground',
  ARCHIVED: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
  FAILED: 'bg-destructive/10 text-destructive',
};

export function AiAssistantStatusBadge({ status }: { status: AiStatus | ConversationStatus | MessageStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
