import { Loader2 } from "lucide-react"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OnboardingButtonProps {
    label: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    /** Shows a spinner like the sign-in button while an async action runs. */
    loading?: boolean
    variant?: 'solid' | 'plain'
    type?: "button" | "submit" | "reset"
    icon?: React.ReactNode
    className?: string
    fontFamily?: string
    style?: React.CSSProperties
}

export function OnboardingButton({
    label,
    onClick,
    disabled,
    loading = false,
    variant = 'solid',
    type = "button",
    icon,
    className = "",
    fontFamily,
    style
}: OnboardingButtonProps) {

    const baseStyles = "w-full h-12 px-4 py-2 flex items-center justify-center gap-2 mb-[6px] mt-4 rounded-lg font-medium text-[16px] leading-[21px] cursor-pointer shadow-none transition-all duration-300 border"

    const variants = {
        solid: "bg-[#042E27] text-white border-[#042E27] hover:bg-[#042E27] hover:shadow-[0_6px_0px_#0C4037]",
        plain: "bg-transparent text-[#11110F] border-[#A8A8A8] hover:bg-[#B9C65B]"
    }

    const isBusy = loading || disabled

    const combinedStyles: React.CSSProperties = {
        fontFamily: fontFamily || style?.fontFamily || "var(--font-rethink-sans)",
        ...style,
    }

    return (
        <Button
            type={type}
            className={cn(baseStyles, variants[variant], className, "disabled:opacity-50")}
            style={combinedStyles}
            onClick={onClick}
            disabled={isBusy}
            aria-busy={loading}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
            ) : (
                icon && <span className="shrink-0">{icon}</span>
            )}
            {label}
        </Button>
    )
}