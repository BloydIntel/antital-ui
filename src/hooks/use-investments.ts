"use client";

import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_INVESTMENTS } from "@/constants";
import investmentService from "@/services/investmentService";

export function useInvestments(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  risk?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: [...CACHE_KEY_INVESTMENTS, "list", params ?? {}],
    queryFn: () => investmentService.getList(params),
  });
}
