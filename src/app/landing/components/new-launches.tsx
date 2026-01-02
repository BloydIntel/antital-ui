"use client"

import React from 'react';
import Link from 'next/link';
import { InvestmentCard } from '@/components/investment/organisms/investment-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Dummy data for new launches (recently opened deals)
const newLaunches = [
  {
    id: 'aquavera',
    name: 'AquaPure Innovations',
    category: 'Water Purification',
    description: 'Next-gen filtration systems reducing contaminants by 90%',
    image: '/investments/aqua_pure.jpg',
    risk: 'moderate' as const,
    investors: 150,
    daysLeft: 150,
    minInvestment: 500,
    raised: 300000,
    goal: 500000,
    percentage: 60,
  },
  {
    id: 'ecobuild',
    name: 'EcoBuild Materials',
    category: 'Sustainable Construction',
    description: 'Biodegradable materials for eco-friendly building solutions',
    image: '/investments/eco_build.jpg',
    risk: 'high' as const,
    investors: 120,
    daysLeft: 120,
    minInvestment: 2000,
    raised: 600000,
    goal: 800000,
    percentage: 75,
  },
  {
    id: 'smartwaste',
    name: 'SmartWaste Technologies',
    category: 'Waste Management',
    description: 'AI-powered sorting systems for efficient recycling',
    image: '/investments/smart_waste.jpg',
    risk: 'low' as const,
    investors: 90,
    daysLeft: 90,
    minInvestment: 1500,
    raised: 250000,
    goal: 500000,
    percentage: 50,
  },
];

export function NewLaunches() {
  return (
    <section className="w-full bg-background py-[62px]"> {/* padding: 62px 0px, gap: 92px */}
      <div className="w-full mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] flex flex-col items-center gap-[92px]">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-14 w-full max-w-[1232px]"> {/* Section Header Container, gap: 56px */}
          
          {/* Section Description */}
          <div className="flex flex-col items-start gap-2 max-w-[821px]"> {/* gap: 8px */}
            <h2
              className="font-rethink-sans font-medium text-[36px] leading-[43px] tracking-[-0.01em] text-[#212121]"
            >
              New launches
            </h2>
            <p
              className="font-dm-sans font-normal text-[18px] leading-[23px] tracking-[-0.01em] text-[#505050]"
            >
              The deals that have recently opened for investment
            </p>
          </div>

          {/* Projects Container */}
          <div className="flex flex-col items-center gap-12 w-full"> {/* gap: 48px */}
            
            {/* Projects List - Horizontal scroll on mobile, grid on larger screens */}
            <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full pb-4 md:pb-0">
              {newLaunches.map((project) => (
                <div key={project.id} className="flex-shrink-0 md:flex-shrink">
                  <InvestmentCard data={project} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <Button
              variant="outline"
              className={cn(
                "w-[192px] h-12 px-4 py-2 rounded-lg border border-[#A8A8A8] text-[#11110F] bg-white",
                "font-rethink-sans text-base font-medium leading-[21px] transition-all duration-300 ease-in-out",
                "shadow-none hover:bg-[#A7B832] hover:text-[#11110F] hover:border-[#A7B832] hover:shadow-none"
              )}
              asChild
            >
              <Link href="/investments/new">View all</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

