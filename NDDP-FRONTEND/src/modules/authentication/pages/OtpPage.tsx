import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/slices/auth-slice';
import { useVerifyOtpMutation } from '../api/auth.api';
import { otpSchema, type OtpFormData } from '../schemas/auth.schemas';
import { AuthLayout } from '@/layouts/MainLayout';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { ROUTES } from '@/constants/app';

export function OtpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormData) => {
    try {
      const result = await verifyOtp(data).unwrap();
      dispatch(setCredentials({ user: result.user, tokens: result.tokens }));
      toast.success('Verification successful');
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Invalid verification code');
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Two-Factor Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Verification Code" placeholder="123456" error={errors.code?.message} {...register('code')} />
              <Button type="submit" className="w-full" isLoading={isLoading}>Verify</Button>
            </form>
            <Link to={ROUTES.LOGIN} className="mt-4 block text-sm text-accent hover:underline">Back to login</Link>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}
