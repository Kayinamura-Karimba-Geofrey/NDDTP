import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail } from 'react-icons/fi';
import { useForgotPasswordMutation } from '../api/auth.api';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/auth.schemas';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { Button, Input, Alert } from '@/components/ui';
import { ROUTES } from '@/constants/app';

export function ForgotPasswordPage() {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success('Password reset instructions have been sent.');
    } catch {
      toast.error('Unable to process request. Please try again.');
    }
  };

  return (
    <AuthSplitLayout
      title="Forgot Password"
      subtitle="Enter your official email to receive reset instructions"
    >
      {isSuccess ? (
        <Alert variant="success" title="Check your email">
          Password reset instructions have been sent. If an account exists for that email, you will
          receive a link shortly.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Email or Username"
            type="email"
            placeholder="name@mod.gov.rw"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" className="w-full" isLoading={isLoading}>
            <FiMail className="h-4 w-4" /> Send Reset Link
          </Button>
        </form>
      )}
      <Link to={ROUTES.LOGIN} className="mt-6 block text-sm font-medium text-foreground hover:underline">
        Back to login
      </Link>
    </AuthSplitLayout>
  );
}
