import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { ResetPasswordForm } from './components/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password | Antital',
  description: 'Choose a new password for your Antital account.',
};

export default function ResetPasswordPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-5">
      <div className="flex flex-col gap-4 p-6 md:p-10 col-span-3">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <Suspense
              fallback={
                <p className="text-[16px] text-[#858585]">Loading reset form...</p>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>

        <p
          className="text-center text-sm text-[#858585]"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
          }}
        >
          All rights reserved - Antital ©2025 | Built by GADA Studios
        </p>
      </div>

      <div className="relative hidden lg:block col-span-2 min-h-screen">
        <Image
          src="/Login-Image.png"
          alt="Investment illustration"
          fill
          className="object-cover"
          priority
          sizes="(min-width: 1024px) 40vw, 0px"
        />
      </div>
    </div>
  );
}
