import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { MY_LEARNING_SUMMARY, MY_LEARNING_COURSES, MOCK_CERTIFICATIONS } from '../constants/training-data';

export function MyLearningPage() {
  const myCerts = MOCK_CERTIFICATIONS.filter((c) => c.recipient === 'Patrick Habimana');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'My Learning' }]} title="My Learning" description="Your courses, progress, and certifications" />
      <TrainingSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: 'Completed', value: MY_LEARNING_SUMMARY.completedCourses },
          { label: 'In Progress', value: MY_LEARNING_SUMMARY.inProgress },
          { label: 'Upcoming', value: MY_LEARNING_SUMMARY.upcoming },
          { label: 'Training Hours', value: MY_LEARNING_SUMMARY.trainingHours },
          { label: 'Certifications', value: MY_LEARNING_SUMMARY.certifications },
          { label: 'Path Progress', value: `${MY_LEARNING_SUMMARY.pathProgress}%` },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs text-muted-foreground">{k.label}</p><p className="mt-1 text-xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card className="mb-6">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Current Courses</CardTitle></CardHeader>
        <CardContent className="pt-4 space-y-4">
          {MY_LEARNING_COURSES.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">Instructor: {c.instructor}</p>
                </div>
                <TrainingStatusBadge status={c.progress === 100 ? 'COMPLETED' : 'IN_PROGRESS'} />
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs"><span>Progress</span><span>{c.progress}%</span></div>
                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${c.progress}%` }} /></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{c.remainingLessons} lessons remaining · Assessment: {c.assessmentStatus}{c.completionDate ? ` · Completed ${dayjs(c.completionDate).format('MMM D, YYYY')}` : ''}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Certificates</CardTitle></CardHeader>
        <CardContent className="pt-4 space-y-2">
          {myCerts.map((cert) => (
            <div key={cert.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3 text-sm">
              <div>
                <p className="font-medium">{cert.course}</p>
                <p className="text-xs text-muted-foreground">{cert.certificateNumber} · Issued {dayjs(cert.issueDate).format('MMM D, YYYY')}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => toast('Preview certificate')}>Preview</Button>
                <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
                <Button variant="ghost" size="sm" onClick={() => toast('Certificate verified')}>Verify</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
