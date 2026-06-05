"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { InvestmentCard } from "@/components/investment/organisms/investment-card";
import { useInfiniteInvestments } from "@/hooks/use-infinite-investments";
import { toInvestmentCardData } from "@/lib/investment-mappers";

interface InvestmentInfiniteGridProps {
  pageSize?: number;
  category?: string;
  risk?: string;
  search?: string;
}

export function InvestmentInfiniteGrid({
  pageSize,
  category,
  risk,
  search,
}: InvestmentInfiniteGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteInvestments({ pageSize, category, risk, search });

  const items = useMemo(
    () =>
      data?.pages.flatMap((page) => page.items.map(toInvestmentCardData)) ?? [],
    [data]
  );

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="w-full bg-background">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-16 flex flex-col items-center gap-12">
        <div className="flex flex-col items-start gap-14 w-full max-w-[1232px]">
          <div className="flex flex-col items-start gap-2 max-w-[821px]">
            <h2
              className="text-foreground w-full"
              style={{
                fontFamily: "var(--font-rethink-sans)",
                fontWeight: 500,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: "1.208",
                letterSpacing: "-0.01em",
              }}
            >
              All investment opportunities
            </h2>
            <p
              className="text-muted-foreground w-full"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.8vw, 18px)",
                lineHeight: "1.278",
                letterSpacing: "-0.01em",
              }}
            >
              Scroll to browse every verified startup on Antital. New deals load
              automatically as you reach the bottom.
            </p>
          </div>

          {isLoading && (
            <p className="text-muted-foreground font-dm-sans w-full text-center">
              Loading investment opportunities...
            </p>
          )}

          {isError && (
            <p className="text-destructive font-dm-sans w-full text-center">
              Unable to load investment opportunities.
            </p>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <p className="text-muted-foreground font-dm-sans w-full text-center">
              No investment opportunities match your filters.
            </p>
          )}

          {!isLoading && !isError && items.length > 0 && (
            <>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                {items.map((investment) => (
                  <InvestmentCard key={investment.id} data={investment} />
                ))}
              </div>

              <div
                ref={sentinelRef}
                className="w-full flex flex-col items-center gap-2 py-4"
                aria-hidden={!hasNextPage}
              >
                {isFetchingNextPage && (
                  <p className="text-muted-foreground font-dm-sans text-sm">
                    Loading more opportunities...
                  </p>
                )}
                {!hasNextPage && totalCount > 0 && (
                  <p className="text-muted-foreground font-dm-sans text-sm">
                    Showing all {totalCount} opportunities
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
