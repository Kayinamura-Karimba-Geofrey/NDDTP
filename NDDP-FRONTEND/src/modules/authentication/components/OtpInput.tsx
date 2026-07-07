import { useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { cn } from '@/utils/cn';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: string;
}

export function OtpInput({ value, onChange, length = 6, disabled, error }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length, ' ').slice(0, length).split('');

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const updateDigit = (index: number, digit: string) => {
    const chars = value.padEnd(length, ' ').slice(0, length).split('');
    chars[index] = digit;
    const next = chars.join('').trimEnd();
    onChange(next.replace(/\s/g, ''));
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center gap-2" role="group" aria-label="One-time password">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={digits[index]?.trim() ? digits[index] : ''}
            onChange={(e) => updateDigit(index, e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              'h-12 w-10 rounded-lg border border-border bg-card text-center text-lg font-semibold text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              error && 'border-danger',
            )}
            aria-invalid={Boolean(error)}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-center text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
