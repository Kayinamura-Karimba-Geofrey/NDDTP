import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const CRITERIA = ['Technical Competence', 'Communication', 'Leadership', 'Problem Solving', 'Professionalism'];
const RECOMMENDATIONS = ['Highly Recommended', 'Recommended', 'Hold', 'Not Recommended'];

export function CandidateEvaluationPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Candidate Evaluation' }]} title="Candidate Evaluation" description="Interviewer evaluation form with scores and recommendations" />
      <RecruitmentSubNav />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div><p className="font-medium">Eric Niyonsenga — Software Engineer</p><p className="text-sm text-muted-foreground">Technical Interview · Jul 10, 2026</p></div>
          {CRITERIA.map((c) => (
            <div key={c}>
              <label className="text-sm font-medium">{c}</label>
              <div className="mt-1 flex gap-2">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" className="h-8 w-8 rounded border border-border text-sm hover:bg-muted">{n}</button>)}</div>
            </div>
          ))}
          <textarea className="w-full rounded-lg border border-border p-3 text-sm" rows={3} placeholder="Comments..." />
          <div>
            <p className="mb-2 text-sm font-medium">Final Recommendation</p>
            <div className="flex flex-wrap gap-2">{RECOMMENDATIONS.map((r) => <button key={r} type="button" className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{r}</button>)}</div>
          </div>
          <Button onClick={() => toast.success('Evaluation submitted')}>Submit Evaluation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
