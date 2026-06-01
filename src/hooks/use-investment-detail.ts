"use client";

import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_INVESTMENTS } from "@/constants";
import investmentService from "@/services/investmentService";

export function useInvestmentDetail(idOrSlug: string) {
  return useQuery({
    queryKey: [...CACHE_KEY_INVESTMENTS, "detail", idOrSlug],
    queryFn: () => investmentService.getDetailBundle(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}
