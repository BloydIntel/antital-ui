import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '../atoms/search-icon'

export function SearchBar() {
  return (
    <div className="w-full max-w-[848px] bg-[#F4F5F7] rounded-lg flex flex-row items-center overflow-hidden">
      {/* Search Input - Takes up most of the space */}
      <div className="relative flex-1 flex items-center">
        <SearchIcon />
        <Input
          type="search"
          placeholder="Search companies, sectors, Keywords...."
          className="h-12 pl-12 pr-4 bg-transparent border-0 rounded-none text-foreground placeholder:text-[#A2A3A1] focus-visible:ring-0"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '14px',
            lineHeight: '17px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        />
      </div>

      {/* Search Now Button - Integrated on the right */}
      <Button
        className="h-12 w-[119px] bg-[#03211C] hover:bg-[#03211C]/90 text-white rounded-none rounded-r-lg shrink-0"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontSize: '16px',
          lineHeight: '21px',
          fontWeight: 500,
        }}
      >
        Search Now
      </Button>
    </div>
  )
}

