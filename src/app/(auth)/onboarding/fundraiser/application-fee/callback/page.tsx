import React, { Suspense } from "react";
import { ApplicationFeeCallbackContent } from "./ApplicationFeeCallbackContent";
import { FundraiserOnly } from "@/components/auth/require-user-type";
import { PageLoadingSkeleton } from "@/components/skeletons/page-skeletons";

export default function ApplicationFeeCallbackPage() {
  return (
    <FundraiserOnly>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <ApplicationFeeCallbackContent />
      </Suspense>
    </FundraiserOnly>
  );
}
