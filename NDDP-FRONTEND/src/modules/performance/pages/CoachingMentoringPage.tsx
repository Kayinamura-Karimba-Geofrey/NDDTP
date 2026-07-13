import { FiPlus } from 'react-icons/fi';
import { useGetCoachingSessionsQuery, useScheduleCoachingSessionMutation } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, Button } from '@/components/ui';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

export function CoachingMentoringPage() {
  const { data: sessions = [], isLoading } = useGetCoachingSessionsQuery();
  const [scheduleSession, { isLoading: isScheduling }] = useScheduleCoachingSessionMutation();

  const handleSchedule = async () => {
    try {
      await scheduleSession({ objectives: 'New coaching engagement' }).unwrap();
      toast.success('Coaching session scheduled');
    } catch {
      toast.error('Failed to schedule session');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Coaching' }]} title="Coaching & Mentoring" description="Manage coaching relationships and sessions" actions={<Button onClick={handleSchedule} isLoading={isScheduling}><FiPlus className="h-4 w-4" /> Schedule Session</Button>} />
      <PerformanceSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <Card key={s.id}>
              <CardContent className="pt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">{s.coach[0]}</div>
                  <div>
                    <p className="font-semibold">{s.coach}</p>
                    <p className="text-xs text-muted-foreground">Coach</p>
                  </div>
                </div>
                <p><strong>Employee:</strong> {s.employee}</p>
                <p><strong>Objectives:</strong> {s.objectives}</p>
                <p><strong>Progress:</strong> {s.progress}</p>
                {s.nextMeeting && <p><strong>Next Meeting:</strong> {dayjs(s.nextMeeting).format('MMM D, YYYY')}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
