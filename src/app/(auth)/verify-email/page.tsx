import { Metadata } from "next";
import { VerifyEmailCallback } from "@/components/auth/organisms/VerifyEmailCallback";

export const metadata: Metadata = {
  title: "Verify Email | Antital",
  description:
    "Verify your Antital email address to complete account setup and continue onboarding.",
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <VerifyEmailCallback />
          </div>
        </div>

        <p
          className="text-center text-sm text-[#858585]"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
          }}
        >
          All rights reserved - Antital ©2025 | Built by GADA Studios
        </p>
      </div>
    </div>
  );
}
