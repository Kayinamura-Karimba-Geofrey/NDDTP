import { FiCheck, FiX } from 'react-icons/fi';
import { getPasswordPolicyStatus } from '../utils/password-strength';

interface PasswordPolicyChecklistProps {
  password: string;
}

const RULES = [
  { key: 'minLength' as const, label: 'Minimum 12 characters' },
  { key: 'uppercase' as const, label: 'Uppercase letter' },
  { key: 'lowercase' as const, label: 'Lowercase letter' },
  { key: 'number' as const, label: 'Number' },
  { key: 'special' as const, label: 'Special character' },
];

export function PasswordPolicyChecklist({ password }: PasswordPolicyChecklistProps) {
  const status = getPasswordPolicyStatus(password);

  return (
    <ul className="space-y-1.5 text-sm" aria-label="Password policy">
      {RULES.map((rule) => {
        const met = status[rule.key];
        return (
          <li key={rule.key} className="flex items-center gap-2">
            {met ? (
              <FiCheck className="h-4 w-4 text-success" aria-hidden />
            ) : (
              <FiX className="h-4 w-4 text-muted-foreground" aria-hidden />
            )}
            <span className={met ? 'text-foreground' : 'text-muted-foreground'}>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
