import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/slices/auth-slice';
import { useChangePasswordMutation } from '../api/auth.api';
import { changePasswordSchema, type ChangePasswordFormData } from '../schemas/auth.schemas';
import { AuthSecurityNav } from '../components/AuthSecurityNav';
import { PasswordField } from '../components/PasswordField';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { PasswordPolicyChecklist } from '../components/PasswordPolicyChecklist';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/shared/PageHeader';
import { ROUTES } from '@/constants/app';

export function ChangePasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [newPassword, setNewPassword] = useState('');

  const { handleSubmit, control, formState: { errors }, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success('Password changed. Please sign in again.');
      dispatch(logout());
      navigate(ROUTES.LOGIN);
    } catch {
      toast.error('Current password is incorrect or policy not met');
    }
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authentication', path: '/auth/security' }, { label: 'Change Password' }]}
        title="Change Password"
        description="Update your account password"
      />
      <AuthSecurityNav />
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-base">Password Update</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <PasswordField
                  label="Current Password"
                  autoComplete="current-password"
                  error={errors.currentPassword?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <PasswordField
                  label="New Password"
                  autoComplete="new-password"
                  error={errors.newPassword?.message}
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
                  label="Confirm New Password"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  {...field}
                />
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button type="submit" isLoading={isLoading}>Save Password</Button>
              <Button type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
            </div>
          </form>
          <Link to={ROUTES.DASHBOARD} className="mt-4 block text-sm text-muted-foreground hover:text-foreground">
            Back to dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
