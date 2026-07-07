import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function RecruitmentSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Settings' }]} title="Recruitment Settings" description="Global recruitment configuration" />
      <RecruitmentSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Application Numbering Format" defaultValue="APP-{YYYY}-{SEQ}" />
          <Input label="Offer Validity Period (days)" type="number" defaultValue="14" />
          <Input label="Default Workflow" defaultValue="Standard Recruitment" className="sm:col-span-2" />
          <Input label="Assessment Template" defaultValue="Technical + Panel Interview" />
          <Input label="Interview Template" defaultValue="Structured Panel Evaluation" />
          <Input label="Email Template — Interview Invite" defaultValue="interview-invitation" className="sm:col-span-2" />
          <Input label="Email Template — Offer Letter" defaultValue="offer-letter" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
