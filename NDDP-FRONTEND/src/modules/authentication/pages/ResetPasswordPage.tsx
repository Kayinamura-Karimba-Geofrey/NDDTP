import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCheck } from 'react-icons/fi';
import { useResetPasswordMutation } from '../api/auth.api';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/auth.schemas';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { PasswordField } from '../components/PasswordField';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { PasswordPolicyChecklist } from '../components/PasswordPolicyChecklist';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/app';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const [newPassword, setNewPassword] = useState('');

  const { register, handleSubmit, control, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: token || 'demo-token' },
  });

  useEffect(() => {
    if (!token) {
      toast.error('Missing reset token. Request a new reset link.');
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({ token: data.token, password: data.password }).unwrap();
      toast.success('Password reset successfully');
    } catch {
      toast.error('Invalid or expired reset token');
    }
  };

  if (isSuccess) {
    return (
      <AuthSplitLayout title="Password Reset Complete" subtitle="Your password has been updated">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <FiCheck className="h-7 w-7 text-success" />
          </div>
          <p className="text-sm text-muted-foreground">
            You can now sign in with your new password.
          </p>
          <Button className="w-full" onClick={() => navigate(ROUTES.LOGIN)}>
            Return to Login
          </Button>
        </div>
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout title="Reset Password" subtitle="Create a new secure password for your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <input type="hidden" {...register('token')} />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordField
              label="New Password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                setNewPassword(e.target.value);
              }}
            />
          )}
        />
        <PasswordStrengthMeter password={newPassword} />
        <PasswordPolicyChecklist password={newPassword} />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordField
              label="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Reset Password
        </Button>
      </form>
      <Link to={ROUTES.LOGIN} className="mt-4 block text-sm text-foreground hover:underline">
        Back to login
      </Link>
    </AuthSplitLayout>
  );
}
