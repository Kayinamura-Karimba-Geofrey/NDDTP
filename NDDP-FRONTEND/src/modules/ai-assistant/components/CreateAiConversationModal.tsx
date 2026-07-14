import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateAiConversationMutation, useGetAiAgentsQuery } from '../api/ai-assistant.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(2, 'Conversation topic title is required'),
  agentId: z.string().min(1, 'Please select an AI assistant'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAiConversationModal({ isOpen, onClose }: Props) {
  const [createChat, { isLoading }] = useCreateAiConversationMutation();
  const { data: agents = [] } = useGetAiAgentsQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAgent = agents.find((a) => a.id === data.agentId);
      await createChat({
        ...data,
        agentName: selectedAgent?.name ?? '—',
        status: 'ACTIVE',
        messageCount: 0,
        lastMessageAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      }).unwrap();
      toast.success('AI Conversation started successfully');
      onClose();
    } catch {
      toast.error('Failed to initiate conversation');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initiate AI Conversation">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Topic Subject Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Leave balance check" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Assistant Agent *</label>
          <select {...register('agentId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>{a.name} ({a.agentType})</option>
            ))}
          </select>
          {errors.agentId && <p className="text-sm text-destructive">{errors.agentId.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Start Chat</Button>
        </div>
      </form>
    </Modal>
  );
}
