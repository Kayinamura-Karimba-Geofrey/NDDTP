import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForgotPasswordMutation } from '../api/auth.api';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/auth.schemas';
import { AuthLayout } from '@/layouts/MainLayout';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { ROUTES } from '@/constants/app';

export function ForgotPasswordPage() {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPassword(data).unwrap();
    toast.success('Reset instructions sent if the account exists');
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <p className="text-sm text-muted-foreground">
                If an account exists for that email, you will receive password reset instructions shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
                <Button type="submit" className="w-full" isLoading={isLoading}>Send Reset Link</Button>
              </form>
            )}
            <Link to={ROUTES.LOGIN} className="mt-4 block text-sm text-accent hover:underline">Back to login</Link>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}
