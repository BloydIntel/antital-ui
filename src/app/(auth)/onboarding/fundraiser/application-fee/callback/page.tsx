import React, { Suspense } from "react";
import { ApplicationFeeCallbackContent } from "./ApplicationFeeCallbackContent";
import { FundraiserOnly } from "@/components/auth/require-user-type";
import { RequireAuthentication } from "@/components/auth/require-authentication";
import { PageLoadingSkeleton } from "@/components/skeletons/page-skeletons";

export default function ApplicationFeeCallbackPage() {
  return (
    <RequireAuthentication>
      <FundraiserOnly>
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ApplicationFeeCallbackContent />
        </Suspense>
      </FundraiserOnly>
    </RequireAuthentication>
  );
}
