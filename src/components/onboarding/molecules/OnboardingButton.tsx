import { Button } from '@/components/ui/button'

interface OnboardingButtonProps {
    Label: string
    onClick?: () => void
}

export function OnboardingButton({ Label, onClick }: OnboardingButtonProps) {
    return (
        <Button
            className="w-full max-w-[540px] h-12 px-4 py-2 gap-2 mb-[6px] mt-4 rounded-lg font-medium text-base leading-[21px] shadow-none transition-all duration-300 border border-[#042E27] bg-[#042E27] text-white [&:hover]:bg-[#042E27] [&:hover]:text-white [&:hover]:border-[#042E27] [&:hover]:shadow-[0_6px_0px_#0C4037] disabled:opacity-50"
            style={{
                fontFamily: "var(--font-rethink-sans)",
            }}
            onClick={onClick}
        >
            {Label}
        </Button>
    )
}
