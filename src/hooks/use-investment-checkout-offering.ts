"use client";

import { useQuery } from "@tanstack/react-query";
import investmentService from "@/services/investmentService";
import type { OfferingShell } from "@/types/investment";

export function useInvestmentCheckoutOffering(slug: string | null) {
  return useQuery<OfferingShell>({
    queryKey: ["investment-checkout-offering", slug],
    queryFn: () => investmentService.getShell(slug!),
    enabled: Boolean(slug),
  });
}
