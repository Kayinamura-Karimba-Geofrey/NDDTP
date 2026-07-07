import { cn } from '@/utils/cn';
import {
  getPasswordStrength,
  STRENGTH_COLORS,
  STRENGTH_LABELS,
  type PasswordStrength,
} from '../utils/password-strength';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

const SEGMENTS: PasswordStrength[] = ['weak', 'medium', 'strong', 'very-strong'];

export function PasswordStrengthMeter({ password, className }: PasswordStrengthMeterProps) {
  const strength = getPasswordStrength(password);
  const activeIndex = SEGMENTS.indexOf(strength);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex gap-1" role="meter" aria-valuenow={activeIndex + 1} aria-valuemin={1} aria-valuemax={4}>
        {SEGMENTS.map((segment, index) => (
          <div
            key={segment}
            className={cn(
              'h-1.5 flex-1 rounded-full bg-muted transition-colors',
              index <= activeIndex && password && STRENGTH_COLORS[strength],
            )}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs text-muted-foreground">
          Strength: <span className="font-medium text-foreground">{STRENGTH_LABELS[strength]}</span>
        </p>
      )}
    </div>
  );
}
