import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import { Avatar } from '@/components/ui';
import { MedicalStatusBadge } from './MedicalStatusBadge';
import type { MedicalProfile } from '../constants/medical-data';

interface MedicalProfileHeaderProps {
  profile: MedicalProfile;
}

export function MedicalProfileHeader({ profile }: MedicalProfileHeaderProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Avatar name={fullName} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-foreground">{fullName}</h2>
          <p className="text-sm text-muted-foreground">{profile.department} · Age {profile.age}{profile.bloodGroup ? ` · ${profile.bloodGroup}` : ''}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <MedicalStatusBadge status={profile.medicalStatus} />
            <code className="text-xs text-muted-foreground">{profile.personnelNumber}</code>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><FiPhone className="h-3.5 w-3.5" />{profile.emergencyContact}</p>
        </div>
      </div>
      <div className="text-sm">
        <p><span className="text-muted-foreground">Clearance:</span> <MedicalStatusBadge status={profile.clearanceStatus === 'Cleared' ? 'CLEARED' : 'RESTRICTED'} /></p>
        <p className="mt-1"><span className="text-muted-foreground">Fitness:</span> {profile.fitnessStatus}</p>
        {profile.nextAssessmentDate && <p className="mt-1 text-muted-foreground">Next assessment: {profile.nextAssessmentDate}</p>}
        <Link to="/medical/appointments" className="mt-2 inline-block text-xs underline">Schedule appointment</Link>
      </div>
    </div>
  );
}
