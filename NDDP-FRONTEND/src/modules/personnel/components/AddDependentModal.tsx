import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useAddDependentMutation, useGetPersonnelQuery } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  personnelId: z.string().min(1, 'Please select personnel'),
  name: z.string().min(2, 'Name is required'),
  relationship: z.string().min(2, 'Relationship is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  medicalCoverage: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDependentModal({ isOpen, onClose }: Props) {
  const [addDependent, { isLoading }] = useAddDependentMutation();
  const { data } = useGetPersonnelQuery({ page: 1, limit: 100 });
  const personnelList = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      medicalCoverage: true,
    },
  });

  useEffect(() => { if (isOpen) reset({ medicalCoverage: true }); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await addDependent(data).unwrap();
      toast.success('Dependent added successfully');
      onClose();
    } catch {
      toast.error('Failed to add dependent');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Dependent">
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
        <Input label="Dependent Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Kevin Habimana" />
        <Input label="Relationship *" {...register('relationship')} error={errors.relationship?.message} placeholder="e.g. Child" />
        <Input label="Date of Birth *" type="date" {...register('dateOfBirth')} error={errors.dateOfBirth?.message} />
        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="medicalCoverage" {...register('medicalCoverage')} className="rounded border-input text-primary shadow-sm" />
          <label htmlFor="medicalCoverage" className="text-sm font-medium">Include in Medical Coverage</label>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Dependent</Button>
        </div>
      </form>
    </Modal>
  );
}
