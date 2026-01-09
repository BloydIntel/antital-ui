import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterDropdownProps {
  defaultValue: string
  placeholder: string
  width: string
  options: { value: string; label: string }[]
  rounded?: 'rounded' | 'rounded-lg' | 'rounded-t'
  onValueChange?: (value: string) => void
}

export function FilterDropdown({
  defaultValue,
  placeholder,
  width,
  options,
  rounded = 'rounded-lg',
  onValueChange,
}: FilterDropdownProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-[42px] ${width} bg-white dark:bg-black/60 backdrop-blur-sm border border-gray-200 dark:border-white/30 ${rounded} text-[#2C2C2C] dark:text-white hover:bg-gray-50 dark:hover:bg-black/70 focus:ring-2 focus:ring-gray-300 dark:focus:ring-white/50 shadow-lg [&_svg]:text-[#2C2C2C] [&_svg]:opacity-100 [&_[data-slot=select-value]]:text-[#2C2C2C] dark:[&_svg]:text-white dark:[&_[data-slot=select-value]]:text-white`}
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontSize: '16px',
          lineHeight: '21px',
          fontWeight: 500,
        }}
      >
        <SelectValue 
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent 
        className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#404040] shadow-xl"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontSize: '16px',
          lineHeight: '21px',
        }}
      >
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value} 
            className="text-[#2C2C2C] dark:text-white hover:bg-[#F4F5F7] dark:hover:bg-[#2A2A2A] focus:bg-[#F4F5F7] dark:focus:bg-[#2A2A2A] focus:text-[#2C2C2C] dark:focus:text-white data-[highlighted]:bg-[#F4F5F7] dark:data-[highlighted]:bg-[#2A2A2A] data-[highlighted]:text-[#2C2C2C] dark:data-[highlighted]:text-white"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

