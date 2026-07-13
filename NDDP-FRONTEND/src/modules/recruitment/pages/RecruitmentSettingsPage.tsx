import 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useUpdateSettingsMutation } from '../api/recruitment.api';

const settingsSchema = z.object({
  numberingFormat: z.string().min(1, 'Format is required'),
  offerValidity: z.number().min(1, 'Must be at least 1 day'),
  defaultWorkflow: z.string().min(1, 'Required'),
  assessmentTemplate: z.string().min(1, 'Required'),
  interviewTemplate: z.string().min(1, 'Required'),
  interviewEmailTemplate: z.string().min(1, 'Required'),
  offerEmailTemplate: z.string().min(1, 'Required'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export function RecruitmentSettingsPage() {
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      numberingFormat: 'APP-{YYYY}-{SEQ}',
      offerValidity: 14,
      defaultWorkflow: 'Standard Recruitment',
      assessmentTemplate: 'Technical + Panel Interview',
      interviewTemplate: 'Structured Panel Evaluation',
      interviewEmailTemplate: 'interview-invitation',
      offerEmailTemplate: 'offer-letter',
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await updateSettings(data).unwrap();
      toast.success('Recruitment settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Settings' }]} title="Recruitment Settings" description="Global recruitment configuration" />
      <RecruitmentSubNav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
            <div>
              <Input label="Application Numbering Format" {...register('numberingFormat')} />
              {errors.numberingFormat && <p className="text-xs text-destructive">{errors.numberingFormat.message}</p>}
            </div>
            <div>
              <Input label="Offer Validity Period (days)" type="number" {...register('offerValidity', { valueAsNumber: true })} />
              {errors.offerValidity && <p className="text-xs text-destructive">{errors.offerValidity.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Input label="Default Workflow" {...register('defaultWorkflow')} />
              {errors.defaultWorkflow && <p className="text-xs text-destructive">{errors.defaultWorkflow.message}</p>}
            </div>
            <div>
              <Input label="Assessment Template" {...register('assessmentTemplate')} />
              {errors.assessmentTemplate && <p className="text-xs text-destructive">{errors.assessmentTemplate.message}</p>}
            </div>
            <div>
              <Input label="Interview Template" {...register('interviewTemplate')} />
              {errors.interviewTemplate && <p className="text-xs text-destructive">{errors.interviewTemplate.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Input label="Email Template — Interview Invite" {...register('interviewEmailTemplate')} />
              {errors.interviewEmailTemplate && <p className="text-xs text-destructive">{errors.interviewEmailTemplate.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Input label="Email Template — Offer Letter" {...register('offerEmailTemplate')} />
              {errors.offerEmailTemplate && <p className="text-xs text-destructive">{errors.offerEmailTemplate.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Settings'}</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
