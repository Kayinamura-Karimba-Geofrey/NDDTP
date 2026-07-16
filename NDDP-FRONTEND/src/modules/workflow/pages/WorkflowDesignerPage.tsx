import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { DESIGNER_STEPS } from '../constants/workflow-data';

export function WorkflowDesignerPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Designer' }]} title="Workflow Designer" description="Visual drag-and-drop process designer — BPMN-style elements" actions={<Button onClick={() => toast('Add element')}><FiPlus className="h-4 w-4" /> Add Element</Button>} />
      <WorkflowSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-2 py-8">
            {DESIGNER_STEPS.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`rounded-lg border-2 px-6 py-3 text-sm font-medium ${i === 0 ? 'border-success bg-success/10' : i === DESIGNER_STEPS.length - 1 ? 'border-primary bg-primary/10' : 'border-border bg-muted/50'}`}>
                  {step}
                </div>
                {i < DESIGNER_STEPS.length - 1 && <div className="h-6 w-px bg-border" />}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">Supported: Start Event, User Task, Approval Task, Service Call, Decision Gateway, Parallel Gateway, Timer, Notification, End Event</p>
        </CardContent>
      </Card>
    </div>
  );
}
