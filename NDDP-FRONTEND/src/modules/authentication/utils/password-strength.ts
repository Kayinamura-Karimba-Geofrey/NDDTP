export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface PasswordPolicyStatus {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export function getPasswordPolicyStatus(password: string): PasswordPolicyStatus {
  return {
    minLength: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'weak';
  const policy = getPasswordPolicyStatus(password);
  const score = Object.values(policy).filter(Boolean).length;
  if (score <= 2) return 'weak';
  if (score === 3) return 'medium';
  if (score === 4) return 'strong';
  return 'very-strong';
}

export const STRENGTH_LABELS: Record<PasswordStrength, string> = {
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
  'very-strong': 'Very Strong',
};

export const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  weak: 'bg-danger',
  medium: 'bg-warning',
  strong: 'bg-success',
  'very-strong': 'bg-primary',
};
