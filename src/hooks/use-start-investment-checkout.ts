"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  buildCheckoutPath,
  buildTradingSignInPath,
  type PendingInvestmentContext,
} from "@/lib/investment-checkout";
import { tokenStorage } from "@/lib/token-storage";

export function useStartInvestmentCheckout() {
  const router = useRouter();

  return useCallback(
    (context: PendingInvestmentContext) => {
      if (tokenStorage.getAccessToken()) {
        router.push(buildCheckoutPath(context));
        return;
      }

      router.push(buildTradingSignInPath(context));
    },
    [router]
  );
}
