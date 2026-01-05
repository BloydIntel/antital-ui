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
        className={`h-[42px] ${width} bg-white border-0 ${rounded} text-[#858585] hover:bg-white/90`}
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontSize: '16px',
          lineHeight: '21px',
          fontWeight: 500,
        }}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

