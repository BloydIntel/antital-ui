'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useResetPassword } from '@/hooks/use-settings';
import { showApiErrorToast } from '@/lib/error-feedback';
import { cn } from '@/lib/utils';

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string().min(1, 'Confirm your new password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get('token')?.trim() ?? '', [searchParams]);
  const resetPassword = useResetPassword();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = (values: ResetPasswordValues) => {
    if (!token) {
      toast.error('Reset link is missing or invalid.');
      return;
    }

    resetPassword.mutate(
      {
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success('Password reset successfully. You can sign in now.');
          router.push('/sign-in');
        },
        onError: (error) => {
          showApiErrorToast(error, 'Unable to reset password.');
        },
      },
    );
  };

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex flex-col items-start gap-2 pb-[40px]">
        <Link href="/sign-in" className="block pb-[48px]">
          <ArrowLeft aria-label="Go Back" className="inline h-5 w-5 text-[#1B1B1B]" />
          <Image
            src="/icons/antital.svg"
            alt="Antital Logo"
            width={80}
            height={80}
            className="inline-block ml-2"
          />
        </Link>
        <h1
          className="text-[#1B1B1B] leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
          style={{
            fontFamily: 'var(--font-clash-display)',
            fontWeight: 500,
          }}
        >
          Reset your password
        </h1>
        <p
          className="text-[#505050] leading-tight text-base"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
          }}
        >
          Choose a new password for your Antital account.
        </p>
      </div>

      {!token ? (
        <div className="space-y-4">
          <p
            className="text-[16px] text-[#D4001A]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            This reset link is missing or invalid. Request a new one from the forgot password page.
          </p>
          <Link
            href="/forgot-password"
            className="text-[#7BA147] font-medium underline-offset-4 hover:underline"
            style={{ fontFamily: 'var(--font-rethink-sans)' }}
          >
            Request a new reset link
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[540px]">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-[14px] text-[#505050]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNew ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="h-12 text-[16px] pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585]"
                        onClick={() => setShowNew((v) => !v)}
                        aria-label={showNew ? 'Hide password' : 'Show password'}
                      >
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-[14px] text-[#505050]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Confirm new password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        className="h-12 text-[16px] pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585]"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={resetPassword.isPending}
              className="w-full h-12 bg-[#042E27] text-white hover:bg-[#042E27] hover:shadow-[0_6px_0px_#0C4037]"
              style={{ fontFamily: 'var(--font-rethink-sans)' }}
            >
              {resetPassword.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>

            <p
              className="text-center text-sm text-[#505050]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Remember your password?{' '}
              <Link href="/sign-in" className="text-[#7BA147] font-medium underline-offset-4 hover:underline">
                Back to sign in
              </Link>
            </p>
          </form>
        </Form>
      )}
    </div>
  );
}
