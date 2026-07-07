import { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Input, type InputProps } from '@/components/ui/Input';

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  ({ label = 'Password', ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          label={label}
          type={visible ? 'text' : 'password'}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);
PasswordField.displayName = 'PasswordField';
