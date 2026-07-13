import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetInterviewsQuery, useCompleteInterviewMutation } from '../api/recruitment.api';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Interview } from '../constants/recruitment-data';
import { ScheduleInterviewModal } from '../components/ScheduleInterviewModal';

export function InterviewSchedulingPage() {
  const { data: interviews = [], isLoading } = useGetInterviewsQuery();
  const [completeInterview] = useCompleteInterviewMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<any>(undefined);

  const handleReschedule = (i: Interview) => {
    setModalInitialData({
      applicationId: i.applicationId,
      interviewType: i.interviewType,
      scheduledDate: i.scheduledDate.split('T')[0],
      scheduledTime: i.scheduledTime,
      location: i.location,
      meetingLink: i.meetingLink || '',
      panelMembers: i.panelMembers.join(', '),
    });
    setIsModalOpen(true);
  };

  const handleComplete = async (i: Interview) => {
    try {
      await completeInterview({ id: i.id, dto: { status: 'COMPLETED', notes: 'Passed' } }).unwrap();
      toast.success('Interview marked as completed');
    } catch (e) {
      toast.error('Failed to complete interview');
    }
  };

  const columns: DataTableColumn<Interview>[] = [
    { key: 'candidate', header: 'Candidate', render: (i) => <span className="font-medium">{i.candidateName}</span> },
    { key: 'pos', header: 'Position' },
    { key: 'type', header: 'Type' },
    { key: 'date', header: 'Date', render: (i) => dayjs(i.scheduledDate).format('MMM D, YYYY') },
    { key: 'time', header: 'Time', render: (i) => i.scheduledTime },
    { key: 'location', header: 'Location', render: (i) => i.meetingLink ? <a href={i.meetingLink} className="text-primary underline">Virtual</a> : i.location },
    { key: 'panel', header: 'Panel', render: (i) => i.panelMembers.join(', ') },
    { key: 'status', header: 'Status', render: (i) => i.status },
    { 
      key: 'actions', 
      header: 'Actions', 
      render: (i) => (
        <div className="flex gap-1">
          {i.status === 'SCHEDULED' && <Button variant="ghost" size="sm" onClick={() => handleComplete(i)}>Complete</Button>}
          <Button variant="ghost" size="sm" onClick={() => handleReschedule(i)}>Reschedule</Button>
        </div>
      ) 
    },
  ];

  return (
    <div>
      <PageHeader 
        breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Interview Scheduling' }]} 
        title="Interview Scheduling" 
        description="Calendar-based interview scheduling — daily, weekly, monthly views" 
        actions={<Button onClick={() => { setModalInitialData(undefined); setIsModalOpen(true); }}><FiPlus className="h-4 w-4" /> Schedule Interview</Button>} 
      />
      <RecruitmentSubNav />
      <div className="mb-4 flex gap-2">
        {['Daily', 'Weekly', 'Monthly'].map((v) => (
          <button key={v} type="button" className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">{v}</button>
        ))}
      </div>
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={interviews as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <ScheduleInterviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalInitialData}
      />
    </div>
  );
}
