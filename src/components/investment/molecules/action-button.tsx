import React from 'react'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface ActionButtonProps {
  text: string
  variant?: 'primary' | 'outline'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  width?: string
  height?: string
  onClick?: () => void
}

export function ActionButton({
  text,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  width = '368px',
  height = '48px',
  onClick,
}: ActionButtonProps) {
  const baseStyles = {
    fontFamily: 'var(--font-rethink-sans)',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '21px',
    width,
    height,
  }

  if (variant === 'primary') {
    return (
      <Button
        className="bg-[#042E27] hover:bg-[#042E27]/90 text-white rounded-lg"
        style={baseStyles}
        onClick={onClick}
      >
        {Icon && iconPosition === 'left' && <Icon className="w-6 h-6 mr-2" />}
        {text}
        {Icon && iconPosition === 'right' && <Icon className="w-6 h-6 ml-2" />}
      </Button>
    )
  }

  // Outline variant with lime green hover
  return (
    <Button
      variant="outline"
      className="border border-[#A8A8A8] text-foreground hover:bg-[#A7B832] hover:text-[#11110F] hover:border-[#A7B832] rounded-lg shadow-none hover:shadow-none transition-all duration-300"
      style={baseStyles}
      onClick={onClick}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-6 h-6 mr-2" />}
      {text}
      {Icon && iconPosition === 'right' && <Icon className="w-6 h-6 ml-2" />}
    </Button>
  )
}

