import React, { Suspense } from "react";
import { ApplicationFeeCallbackContent } from "./ApplicationFeeCallbackContent";
import { FundraiserOnly } from "@/components/auth/require-user-type";

export default function ApplicationFeeCallbackPage() {
  return (
    <FundraiserOnly>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">Loading…</div>
        }
      >
        <ApplicationFeeCallbackContent />
      </Suspense>
    </FundraiserOnly>
  );
}
