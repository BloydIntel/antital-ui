'use client' // Required for useState in Next.js App Router

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { TYPOGRAPHY } from '@/constants/styles'
import { cn } from '@/lib/utils'
import { Settings } from 'lucide-react'
import { Overview } from '@/components/balance-funding/Overview'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { TransactionRecordsTable } from '@/components/balance-funding/TransactionRecordsTable'
import { userData } from '@/data/transactionsMockData';

const sections = ["Overview", "Transactions", "Payment Methods"];

export default function BalanceFunding() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeSection, setActiveSection] = useState(
    tabParam === "Transactions" ? "Transactions" : "Overview"
  );

  useEffect(() => {
    if (tabParam === "Transactions") {
      setActiveSection("Transactions");
    } else {

      setActiveSection(prev => prev === "Transactions" ? "Overview" : prev);
    }
  }, [tabParam]);

  const handleTabChange = (section: string) => {
    setActiveSection(section);

    if (section === "Transactions") {
      // Keep the query string for deep linking
      router.push(`${pathname}?tab=Transactions`);
    } else {
      // Wipe the query parameter cleanly when moving to Overview or Payment Methods
      router.push(pathname);
    }
  };

  return (
    <div className='px-8 space-y-8'>
      {/* Header Section */}
      <div className='flex justify-between items-center'>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-clash), sans-serif',
              fontSize: '28px',
              fontWeight: 500
            }}
          >
            Balance & Funding
          </h2>
          <p className='text-[16px] text-[#505050]' style={TYPOGRAPHY.body}>
            Manage your funds and payment methods
          </p>
        </div>

        <Button
          variant="outline"
          className='text-[16px] h-11 px-4 flex items-center gap-2 border-[#EAEAEA] text-[#1A1C1E] bg-white hover:bg-gray-50 rounded-md cursor-pointer'
          style={TYPOGRAPHY.heading}
        >
          <Settings className='w-5 h-5' />
          Settings
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-between items-center bg-[#E6EAE9] p-1 rounded-lg w-full">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleTabChange(section)}
            className={cn(
              "px-3 lg:px-6 py-2 text-[12px] lg:text-[16px] rounded-md cursor-pointer transition-all whitespace-nowrap w-full",
              activeSection === section
                ? "bg-[#052119] text-white shadow-sm"
                : "text-[#1F1F1F] hover:text-black"
            )}
            style={TYPOGRAPHY.body}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Conditional Content Rendering */}
      <div className="mt-6">
        {activeSection === "Overview" && <Overview />}
        {activeSection === "Transactions" && <TransactionRecordsTable data={userData.recentActivity} />}
        {activeSection === "Payment Methods" && <div>Payment Methods goes here...</div>}
      </div>
    </div>
  )
}