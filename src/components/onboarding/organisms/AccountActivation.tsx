import Image from "next/image"
import { Clock, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"

const list = [
    {
        title: "Verification in Progress",
        desc: "Our compliance team is reviewing your application and will verify your identity.",
        icon: <Clock className="text-[#3B82F6]" size={20} />, // Blue-500
        bgColor: "bg-[#EFF6FF]", // Blue-50
    },
    {
        title: "Email Confirmation",
        desc: "Check your inbox or spam for the confirmation email.",
        icon: <Mail className="text-[#22C55E]" size={20} />, // Green-500
        bgColor: "bg-[#F0FDF4]", // Green-50
    },
    {
        title: "Email Updates",
        desc: "We'll text you at each stage of the verification process to keep you informed.",
        icon: <MessageSquare className="text-[#A855F7]" size={20} />, // Purple-500
        bgColor: "bg-[#FAF5FF]", // Purple-50
    },
];

export function AccountActivation() {
    return (
        <div className="max-w-[558px] flex flex-col items-center">
            <Image
                src="/onboarding/congratulation.png"
                alt="Caution Illustration"
                width={80}
                height={80}
            />

            <h4 className="text-[24px] text-center text-[#1F1F1F] leading-none pt-[16px]"
                style={{
                    fontFamily: "var(--font-rethink-sans)",
                    fontWeight: 500,
                    letterSpacing: "-1%",
                }}

            >
                Individual Account Application Submitted Successfully!
            </h4>

            <p className="text-[16px] text-center text-[#858585] leading-none py-[8px]"
                style={{
                    fontFamily: "var(--font-dm-sans)",
                    letterSpacing: "-1%",
                }}
            >
                Your documents have been received and are now under review by our compliance team.
            </p>

            <div className="w-full max-w-[600px] flex flex-col gap-4 mt-[32px]">
                <h2 className="text-[18px] font-medium text-[#1B1B1B] mb-2"
                    style={{ fontFamily: "var(--font-rethink-sans)" }}>
                    What Happens Next
                </h2>

                <div className="flex flex-col gap-3">
                    {list.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 border border-[#EAEAEA] rounded-xl bg-white shadow-sm transition-all hover:border-[#D1D1D1]"
                        >
                            {/* Icon Container */}
                            <div className={cn(
                                "flex items-center justify-center min-w-[48px] h-[48px] rounded-lg",
                                step.bgColor
                            )}>
                                {step.icon}
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col">
                                <h4 className="text-[16px] font-medium text-[#1B1B1B] leading-snug">
                                    {step.title}
                                </h4>
                                <p className="text-[12px] text-[#858585] leading-relaxed mt-0.5">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <OnboardingButton Label="Return to Dashboard" className="mt-[32px]" />
        </div>
    )
}
