import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OnboardingButtonProps {
    Label: string
    onClick?: () => void
    disabled?: boolean
    variant?: 'solid' | 'plain'
    type?: "button" | "submit" | "reset"
    icon?: React.ReactNode
    className?: string
}

export function OnboardingButton({
    Label,
    onClick,
    disabled,
    variant = 'solid',
    type = "button",
    icon,
    className = ""
}: OnboardingButtonProps) {

    const baseStyles = "w-full h-12 px-4 py-2 flex items-center justify-center gap-2 mb-[6px] mt-4 rounded-lg font-medium text-[16px] leading-[21px] cursor-pointer shadow-none transition-all duration-300 border"

    const variants = {
        solid: "bg-[#042E27] text-white border-[#042E27] hover:bg-[#042E27] hover:shadow-[0_6px_0px_#0C4037]",
        plain: "bg-transparent text-[#11110F] border-[#A8A8A8] hover:bg-[#B9C65B]"
    }

    return (
        <Button
            type={type}
            className={cn(baseStyles, variants[variant], className, "disabled:opacity-50")}
            style={{ fontFamily: "var(--font-rethink-sans)" }}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span>{icon}</span>}
            {Label}
        </Button>
    )
}