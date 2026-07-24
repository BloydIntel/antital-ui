"use client";

import applicationFeeService from "@/services/applicationFeeService";
import { useOnboardingStore } from "@/store/onboardingStore";
import type { PaymentMethod } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const FUNDRAISER_PAYMENT_STATE_KEY = "fundraiser_application_fee_state";
const FUNDRAISER_FEE_REFERENCE_KEY = "fundraiser_application_fee_reference";

export function ApplicationFeeCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateFormData } = useOnboardingStore();

  const reference = useMemo(() => {
    const fromQuery = searchParams.get("reference") ?? searchParams.get("trxref");
    if (fromQuery) return fromQuery;
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(FUNDRAISER_FEE_REFERENCE_KEY);
  }, [searchParams]);

  const feeQuery = useQuery({
    queryKey: ["application-fee-callback", reference],
    queryFn: async () => {
      try {
        return await applicationFeeService.verifyPayment(reference);
      } catch {
        return applicationFeeService.getApplicationFee();
      }
    },
    enabled: !!reference,
    refetchInterval: (query) => {
      if (query.state.data?.applicationFeePaid) return false;
      if (query.state.data?.paymentStatus === "Failed") return false;
      return 2000;
    },
  });

  useEffect(() => {
    const data = feeQuery.data;
    if (!data?.applicationFeePaid) return;

    const nextPaymentState = {
      paymentMethod: (data.paymentMethod as PaymentMethod | null) ?? null,
      paymentReference: data.paymentReference,
      paymentStatus: "success" as const,
      applicationFeePaid: true,
    };
    updateFormData(nextPaymentState);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        FUNDRAISER_PAYMENT_STATE_KEY,
        JSON.stringify(nextPaymentState)
      );
      window.sessionStorage.removeItem(FUNDRAISER_FEE_REFERENCE_KEY);
    }

    router.replace("/onboarding/fundraiser/review");
  }, [feeQuery.data, router, updateFormData]);

  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[#2C2C2C] text-lg">We could not find your payment reference.</p>
          <button
            type="button"
            className="text-[#7BA147] underline"
            onClick={() => router.push("/onboarding/fundraiser/application-fee")}
          >
            Back to application fee
          </button>
        </div>
      </div>
    );
  }

  if (feeQuery.isLoading || !feeQuery.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-[#505050]">Confirming your payment…</p>
      </div>
    );
  }

  if (feeQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[#2C2C2C] text-lg">Unable to confirm your payment right now.</p>
          <button
            type="button"
            className="text-[#7BA147] underline"
            onClick={() => feeQuery.refetch()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (feeQuery.data.applicationFeePaid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-[#505050]">Payment confirmed. Continuing…</p>
      </div>
    );
  }

  if (feeQuery.data.paymentStatus === "Failed") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[#2C2C2C] text-lg">Payment was not completed.</p>
          <button
            type="button"
            className="text-[#7BA147] underline"
            onClick={() => router.push("/onboarding/fundraiser/application-fee")}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-[#505050]">Waiting for Paystack confirmation…</p>
    </div>
  );
}
