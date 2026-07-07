import { Link } from 'react-router-dom';
import { FiEdit, FiMail, FiPhone } from 'react-icons/fi';
import { Avatar, Button } from '@/components/ui';
import { PersonnelStatusBadge } from './PersonnelStatusBadge';
import type { PersonnelRecord } from '../constants/personnel-data';

interface PersonnelProfileHeaderProps {
  person: PersonnelRecord;
  showActions?: boolean;
}

export function PersonnelProfileHeader({ person, showActions = true }: PersonnelProfileHeaderProps) {
  const fullName = `${person.firstName} ${person.middleName ? `${person.middleName} ` : ''}${person.lastName}`;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Avatar name={fullName} src={person.profilePhotoUrl} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-foreground">{fullName}</h2>
          <p className="text-sm text-muted-foreground">
            {person.position}{person.rank ? ` · ${person.rank}` : ''} · {person.department}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <PersonnelStatusBadge status={person.serviceStatus} />
            <code className="text-xs text-muted-foreground">{person.serviceNumber}</code>
            <span className="text-xs text-muted-foreground">{person.yearsOfService} yrs service</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><FiMail className="h-3.5 w-3.5" />{person.email}</span>
            {person.phone && <span className="flex items-center gap-1"><FiPhone className="h-3.5 w-3.5" />{person.phone}</span>}
          </div>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2">
          <Link to={`/personnel/${person.id}/edit`}>
            <Button variant="outline" size="sm"><FiEdit className="h-4 w-4" /> Edit</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
