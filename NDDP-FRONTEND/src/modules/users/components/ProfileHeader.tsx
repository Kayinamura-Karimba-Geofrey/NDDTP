import { Link } from 'react-router-dom';
import { FiEdit, FiMail, FiPhone } from 'react-icons/fi';
import { Avatar, Button } from '@/components/ui';
import { UserStatusBadge } from './UserStatusBadge';
import type { PlatformUser } from '../constants/users-data';

interface ProfileHeaderProps {
  user: PlatformUser;
  showActions?: boolean;
}

export function ProfileHeader({ user, showActions = true }: ProfileHeaderProps) {
  const fullName = `${user.firstName} ${user.middleName ? `${user.middleName} ` : ''}${user.lastName}`;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Avatar name={fullName} src={user.profilePhotoUrl} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-foreground">{fullName}</h2>
          <p className="text-sm text-muted-foreground">{user.position} · {user.department}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <UserStatusBadge status={user.status} />
            <code className="text-xs text-muted-foreground">{user.employeeNumber}</code>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><FiMail className="h-3.5 w-3.5" />{user.email}</span>
            {user.phone && <span className="flex items-center gap-1"><FiPhone className="h-3.5 w-3.5" />{user.phone}</span>}
          </div>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2">
          <Link to={`/users/${user.id}/edit`}>
            <Button variant="outline" size="sm"><FiEdit className="h-4 w-4" /> Edit</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
