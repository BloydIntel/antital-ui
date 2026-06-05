"use client"

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InvestmentCard } from '@/components/investment/organisms/investment-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useInvestments } from '@/hooks/use-investments';
import { toInvestmentCardData } from '@/lib/investment-mappers';

export function NewLaunches() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useInvestments({ page: 1, pageSize: 3 });
  const items = data?.items.map(toInvestmentCardData) ?? [];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-background py-[62px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] flex flex-col items-center gap-[92px]">
        <div className="flex flex-col items-start gap-14 w-full max-w-[1232px]">
          <div className="flex flex-col items-start gap-2 max-w-[821px]">
            <h2 className="font-rethink-sans font-medium text-[36px] leading-[43px] tracking-[-0.01em] text-foreground">
              New launches
            </h2>
            <p className="font-dm-sans font-normal text-[18px] leading-[23px] tracking-[-0.01em] text-muted-foreground">
              The deals that have recently opened for investment
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 w-full">
            {isLoading && (
              <p className="text-muted-foreground font-dm-sans">Loading new launches...</p>
            )}
            {isError && (
              <p className="text-destructive font-dm-sans">Unable to load new launches.</p>
            )}
            {!isLoading && !isError && (
              <div
                ref={scrollRef}
                className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible scrollbar-hide"
              >
                {items.map((project) => (
                  <div key={project.id} className="flex-shrink-0 md:flex-shrink">
                    <InvestmentCard data={project} />
                  </div>
                ))}
              </div>
            )}

            <div className="md:hidden w-full flex justify-end gap-8 -mt-4">
              <button
                onClick={scrollLeft}
                className="h-12 w-14 py-2 px-4 rounded-lg border border-[#A8A8A8] flex items-center justify-center hover:bg-[#F4F5F7] transition"
              >
                <ArrowLeft aria-label='Scroll left to previous investments' className="h-6 w-6 text-[#A8A8A8]" />
              </button>
              <button
                onClick={scrollRight}
                className="h-12 w-14 py-2 px-4 rounded-lg border border-[#A8A8A8] flex items-center justify-center hover:bg-[#F4F5F7] transition"
              >
                <ArrowRight aria-label='Scroll right to next investments' className="h-6 w-6 text-[#A8A8A8]" />
              </button>
            </div>

            <Button
              variant="outline"
              className={cn(
                "w-[192px] h-12 px-4 py-2 rounded-lg border border-[#A8A8A8] text-foreground bg-background dark:bg-background",
                "font-rethink-sans text-base font-medium leading-[21px] transition-all duration-300 ease-in-out",
                "shadow-none [&:hover]:bg-[#A7B832] [&:hover]:text-[#11110F] [&:hover]:border-[#A7B832] [&:hover]:shadow-none",
                "dark:[&:hover]:bg-[#A7B832] dark:[&:hover]:text-[#11110F] dark:[&:hover]:border-[#A7B832]"
              )}
              asChild
            >
              <Link href="/explore">View all</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
