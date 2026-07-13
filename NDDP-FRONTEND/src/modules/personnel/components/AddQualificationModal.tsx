import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useAddQualificationMutation, useGetPersonnelQuery } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  personnelId: z.string().min(1, 'Please select personnel'),
  type: z.enum(['ACADEMIC', 'PROFESSIONAL', 'LICENSE']),
  name: z.string().min(2, 'Credential/Qualification Name is required'),
  institution: z.string().min(2, 'Institution is required'),
  graduationDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddQualificationModal({ isOpen, onClose }: Props) {
  const [addQual, { isLoading }] = useAddQualificationMutation();
  const { data } = useGetPersonnelQuery({ page: 1, limit: 100 });
  const personnelList = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedPerson = personnelList.find((p) => p.id === data.personnelId);
      await addQual({
        ...data,
        personnelName: selectedPerson ? `${selectedPerson.firstName} ${selectedPerson.lastName}` : '—',
      }).unwrap();
      toast.success('Qualification added successfully');
      onClose();
    } catch {
      toast.error('Failed to add qualification');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Qualification">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Personnel *</label>
          <select {...register('personnelId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {personnelList.map((p) => (
              <option key={p.id} value={p.id}>{p.serviceNumber} — {p.firstName} {p.lastName}</option>
            ))}
          </select>
          {errors.personnelId && <p className="text-sm text-destructive">{errors.personnelId.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Type *</label>
          <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="ACADEMIC">ACADEMIC</option>
            <option value="PROFESSIONAL">PROFESSIONAL</option>
            <option value="LICENSE">LICENSE</option>
          </select>
        </div>
        <Input label="Qualification / Credential Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Master of Computer Science" />
        <Input label="Issuing Institution *" {...register('institution')} error={errors.institution?.message} placeholder="e.g. University of Rwanda" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Graduation/Issue Date" type="date" {...register('graduationDate')} error={errors.graduationDate?.message} />
          <Input label="Expiry Date (If applicable)" type="date" {...register('expiryDate')} error={errors.expiryDate?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Qualification</Button>
        </div>
      </form>
    </Modal>
  );
}
