"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CACHE_KEY_INVESTMENTS } from "@/constants";
import investmentService from "@/services/investmentService";

const DEFAULT_PAGE_SIZE = 6;

export function useInfiniteInvestments(params?: {
  pageSize?: number;
  category?: string;
  risk?: string;
  search?: string;
}) {
  const pageSize = params?.pageSize ?? DEFAULT_PAGE_SIZE;
  const { category, risk, search } = params ?? {};

  return useInfiniteQuery({
    queryKey: [...CACHE_KEY_INVESTMENTS, "infinite", { pageSize, category, risk, search }],
    queryFn: ({ pageParam }) =>
      investmentService.getList({
        page: pageParam,
        pageSize,
        category,
        risk,
        search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      if (loaded >= lastPage.totalCount) {
        return undefined;
      }
      return lastPage.page + 1;
    },
  });
}
