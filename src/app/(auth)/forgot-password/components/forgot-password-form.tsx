'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
import { useForgotPassword } from '@/hooks/use-settings';
import { showApiErrorToast } from '@/lib/error-feedback';
import { cn } from '@/lib/utils';

const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const forgotPassword = useForgotPassword();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values: ForgotPasswordValues) => {
    forgotPassword.mutate(
      { email: values.email.trim() },
      {
        onSuccess: () => {
          setSubmittedEmail(values.email.trim());
          toast.success('If that email exists, a reset link has been sent.');
        },
        onError: (error) => {
          showApiErrorToast(error, 'Unable to send reset link.');
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
          Forgot your password?
        </h1>
        <p
          className="text-[#505050] leading-tight text-base"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
          }}
        >
          Enter the email linked to your account and we&apos;ll send a reset link if it exists.
        </p>
      </div>

      {submittedEmail ? (
        <div className="space-y-6">
          <div className="rounded-lg border border-[#EAEAEA] bg-[#F9FAFB] p-4">
            <p
              className="text-[16px] text-[#1B1B1B]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Check your inbox for a password reset link sent to{' '}
              <span className="font-medium">{submittedEmail}</span>.
            </p>
            <p
              className="mt-2 text-[14px] text-[#858585]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              The link expires in about an hour. If you don&apos;t see it, check spam or try again.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full max-w-[540px] h-12"
            style={{ fontFamily: 'var(--font-rethink-sans)' }}
            onClick={() => {
              setSubmittedEmail(null);
              form.reset({ email: submittedEmail });
            }}
          >
            Send another link
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
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[540px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-[14px] text-[#505050]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 text-[16px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={forgotPassword.isPending}
              className="w-full h-12 bg-[#042E27] text-white hover:bg-[#042E27] hover:shadow-[0_6px_0px_#0C4037]"
              style={{ fontFamily: 'var(--font-rethink-sans)' }}
            >
              {forgotPassword.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
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
