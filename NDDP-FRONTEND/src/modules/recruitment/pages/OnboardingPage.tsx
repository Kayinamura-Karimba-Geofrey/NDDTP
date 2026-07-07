import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { ONBOARDING_CHECKLIST } from '../constants/recruitment-data';
import { FiCheck, FiCircle } from 'react-icons/fi';

export function OnboardingPage() {
  const completed = ONBOARDING_CHECKLIST.filter((i) => i.completed).length;

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Onboarding' }]} title="Onboarding" description="Transition candidates to employees — triggers Personnel, User, and Authentication services on completion" />
      <RecruitmentSubNav />
      <Card className="mb-6"><CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div><p className="font-medium">Grace Ingabire — HR Assistant</p><p className="text-sm text-muted-foreground">Onboarding progress: {completed}/{ONBOARDING_CHECKLIST.length}</p></div>
          <div className="h-2 w-48 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${(completed / ONBOARDING_CHECKLIST.length) * 100}%` }} /></div>
        </div>
        <ul className="space-y-3">
          {ONBOARDING_CHECKLIST.map((item) => (
            <li key={item.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
              {item.completed ? <FiCheck className="h-5 w-5 text-success" /> : <FiCircle className="h-5 w-5 text-muted-foreground" />}
              <span className={item.completed ? 'text-muted-foreground line-through' : 'font-medium'}>{item.label}</span>
              {!item.completed && <Button variant="ghost" size="sm" className="ml-auto" onClick={() => toast.success('Marked complete')}>Complete</Button>}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">On completion:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Publish <code>CandidateHired</code> event</li>
            <li><Link to="/personnel/directory" className="underline">Personnel Service</Link> creates personnel record</li>
            <li><Link to="/users/list" className="underline">User Service</Link> creates user profile</li>
            <li>Authentication Service provisions account</li>
            <li>Notification Service sends welcome message</li>
          </ul>
        </div>
        <Button className="mt-4" disabled={completed < ONBOARDING_CHECKLIST.length} onClick={() => toast.success('Onboarding completed — services notified')}>Complete Onboarding</Button>
      </CardContent></Card>
    </div>
  );
}
