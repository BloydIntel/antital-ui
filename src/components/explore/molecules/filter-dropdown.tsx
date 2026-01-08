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
        className={`h-[42px] ${width} bg-black/60 backdrop-blur-sm border border-white/30 ${rounded} text-white hover:bg-black/70 focus:ring-2 focus:ring-white/50 shadow-lg [&_svg]:text-white [&_svg]:opacity-100 [&_[data-slot=select-value]]:text-white`}
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
        className="bg-white border border-gray-200 shadow-xl"
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
            className="text-[#2C2C2C] hover:bg-[#F4F5F7] focus:bg-[#F4F5F7] focus:text-[#2C2C2C] data-[highlighted]:bg-[#F4F5F7] data-[highlighted]:text-[#2C2C2C]"
            style={{
              color: '#2C2C2C',
            }}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

