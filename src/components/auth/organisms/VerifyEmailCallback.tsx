"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import authService from "@/services/authService";
import { getApiErrorMessages, getApiPrimaryMessage } from "@/lib/api-error";
import { showApiErrorToast } from "@/lib/error-feedback";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

type VerifyState = "idle" | "verifying" | "success" | "error" | "invalid";

export function VerifyEmailCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [state, setState] = useState<VerifyState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (!email || !token) {
      setState("invalid");
      setErrorMessage("Verification link is invalid.");
      setErrorDetails(["Missing email or token in the link."]);
      return;
    }

    const run = async () => {
      setState("verifying");
      try {
        await authService.verifyEmail({ email, token });
        setState("success");
      } catch (error) {
        setState("error");
        setErrorMessage(
          getApiPrimaryMessage(error, "Unable to verify email.")
        );
        setErrorDetails(
          getApiErrorMessages(error, "Unable to verify email.").slice(1, 4)
        );
        showApiErrorToast(error, "Unable to verify email.");
      }
    };

    void run();
  }, [email, token]);

  if (state === "verifying" || state === "idle") {
    return (
      <div className="rounded-xl border border-[#EAEAEA] p-8 flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#042E27]" />
        <h1 className="text-2xl text-[#1B1B1B] font-medium">
          Verifying your email
        </h1>
        <p className="text-sm text-[#505050] text-center">
          Please wait while we confirm your verification token.
        </p>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-[#EAEAEA] p-8 flex flex-col items-center gap-4">
        <CheckCircle2 className="h-10 w-10 text-[#2E9E4E]" />
        <h1 className="text-2xl text-[#1B1B1B] font-medium">
          Email verified successfully
        </h1>
        <p className="text-sm text-[#505050] text-center">
          Your account is now verified. You can proceed to sign in and continue
          onboarding.
        </p>
        <OnboardingButton
          label="Go to Sign In"
          className="w-full max-w-[240px]"
          onClick={() => router.push("/sign-in")}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#EAEAEA] p-8 flex flex-col items-center gap-4">
      <XCircle className="h-10 w-10 text-[#D9534F]" />
      <h1 className="text-2xl text-[#1B1B1B] font-medium">
        Verification failed
      </h1>
      <p className="text-sm text-[#505050] text-center">{errorMessage}</p>
      {errorDetails.length > 0 && (
        <ul className="text-xs text-[#6B7280] list-disc pl-5 self-start">
          {errorDetails.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}

      <div className="flex gap-3 w-full">
        <OnboardingButton
          label="Go to Sign In"
          className="w-full"
          onClick={() => router.push("/sign-in")}
        />
        <OnboardingButton
          label="Back to Email Step"
          variant="plain"
          className="w-full"
          onClick={() => router.push("/onboarding/individual/email")}
        />
      </div>

      <Link href="/sign-in" className="text-xs text-[#6B7280] underline">
        Open sign-in page
      </Link>
    </div>
  );
}
