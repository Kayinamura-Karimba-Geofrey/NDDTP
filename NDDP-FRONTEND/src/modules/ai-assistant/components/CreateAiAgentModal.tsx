import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateAiAgentMutation } from '../api/ai-assistant.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(2, 'Reference code identifier is required'),
  agentType: z.enum(['GENERAL', 'HR', 'OPERATIONS', 'CUSTOM']),
  modelName: z.string().min(2, 'Target LLM model deployment name is required'),
  description: z.string().min(5, 'Short description is required'),
  systemPrompt: z.string().min(5, 'System instruction prompt is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAiAgentModal({ isOpen, onClose }: Props) {
  const [createAgent, { isLoading }] = useCreateAiAgentMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createAgent({
        ...data,
        conversationCount: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('AI Agent configured successfully');
      onClose();
    } catch {
      toast.error('Failed to configure agent parameters');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure System AI Agent">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Agent Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Leave Policy Advisor" />
          <Input label="Identifier Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. HR-LEAVE-BOT" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Domain Type *</label>
            <select {...register('agentType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="GENERAL">General Assistant</option>
              <option value="HR">HR & Welfare Desk</option>
              <option value="OPERATIONS">Logistics & Operations</option>
              <option value="CUSTOM">Custom Specialized Task</option>
            </select>
          </div>
          <Input label="LLM Model Name *" {...register('modelName')} error={errors.modelName?.message} placeholder="e.g. nddtp-lite-v1" />
        </div>
        <Input label="Short Description *" {...register('description')} error={errors.description?.message} placeholder="e.g. Leave, welfare, and personnel policy guidance" />
        <div className="space-y-1">
          <label className="text-sm font-medium">System Prompt Instructions *</label>
          <textarea {...register('systemPrompt')} rows={3} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="e.g. Answer HR policy questions using approved circulars only..." />
          {errors.systemPrompt && <p className="text-sm text-destructive">{errors.systemPrompt.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Agent</Button>
        </div>
      </form>
    </Modal>
  );
}
