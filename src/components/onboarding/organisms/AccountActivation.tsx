"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Clock, Mail, MessageSquare, FileText, UsersRound } from "lucide-react"
import { cn } from "@/lib/utils"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"
import { TYPOGRAPHY } from "@/constants/styles"
import { useOnboardingStore } from "@/store/onboardingStore"

const individualActivationSteps = [
    {
        title: "Verification in Progress",
        desc: "Our compliance team is reviewing your application and will verify your identity.",
        icon: <Clock className="text-[#3B82F6]" size={20} />,
        bgColor: "bg-[#EFF6FF]",
    },
    {
        title: "Email Confirmation",
        desc: "Check your inbox or spam for the confirmation email.",
        icon: <Mail className="text-[#22C55E]" size={20} />,
        bgColor: "bg-[#F0FDF4]",
    },
    {
        title: "Email Updates",
        desc: "We'll text you at each stage of the verification process to keep you informed.",
        icon: <MessageSquare className="text-[#A855F7]" size={20} />,
        bgColor: "bg-[#FAF5FF]",
    },
];

const corporateActivationSteps = [
    {
        title: "Application Under Review",
        desc: "Our business development team is evaluating your submission",
        icon: <FileText className="text-[#3B82F6]" size={20} />,
        bgColor: "bg-[#EFF6FF]",
    },
    {
        title: "Confirmation Email Sent",
        desc: "Check your inbox for detailed next steps",
        icon: <Mail className="text-[#22C55E]" size={20} />,
        bgColor: "bg-[#F0FDF4]",
    },
    {
        title: "Director Verification Required",
        desc: "You will receive KYC completion email within 24 hours",
        icon: <UsersRound className="text-[#A855F7]" size={20} />,
        bgColor: "bg-[#FAF5FF]",
    },
];

const fundraiserSubmissionMessage = [
    "Thank you for submitting your fundraising application on Antital! Our team has received it and will begin the review and due diligence process in line with the relevant regulations. You can expect feedback within two weeks, although it may take a little longer in some cases.",
    "Please note that submitting an application does not guarantee approval or listing.",
    "Approval depends on successful due diligence, regulatory compliance checks, and alignment with our platform standards. We appreciate your cooperation and timely response to any follow-up requests.",
]

export function AccountActivation() {
    const router = useRouter();
    const { investorUserType } = useOnboardingStore();
    const isCorporate = investorUserType === "corporate";
    const isFundraiser = investorUserType === "fundraiser"

    const steps = isCorporate ? corporateActivationSteps : individualActivationSteps;
    const titles = {
        corporate: "Business Account Application Submitted!",
        individual: "Individual Account Application Submitted Successfully!",
        fundraiser: "Fundraiser Account Application Submitted!"
    };

    const mainTitle = investorUserType ? titles[investorUserType] : titles.individual;

    return (
        <div className="max-w-[558px] flex flex-col items-center mx-auto">
            <Image
                src="/onboarding/congratulation.png"
                alt="Success"
                width={80}
                height={80}
                className="mb-4"
            />

            <h4 className="text-[24px] text-center text-[#1F1F1F] leading-tight px-4" style={TYPOGRAPHY.heading}>
                {mainTitle}
            </h4>

            <p className="text-[16px] text-center text-[#858585] mt-2 px-6" style={TYPOGRAPHY.body}>
                Your documents have been received and are now under review by our compliance team.
            </p>

            <div className="w-full mt-10">
                {!isFundraiser && <h2 className="text-[18px] font-medium text-[#1B1B1B] mb-4" style={TYPOGRAPHY.body}>
                    What Happens Next
                </h2>}

                {isFundraiser ?
                    (
                        <div className="w-full lg:w-[558px] p-[24px] text-center border border-[#E6E6E6] rounded-lg gap-6 flex flex-col">
                            {fundraiserSubmissionMessage.map((msg, i) => (
                                <p key={i} className="text-[18px] text-[#505050] leading-tight"
                                    style={TYPOGRAPHY.body}
                                >
                                    {msg}
                                </p>
                            ))
                            }
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 border border-[#EAEAEA] rounded-xl bg-white transition-all"
                                >
                                    <div className={cn(
                                        "flex items-center justify-center min-w-[48px] h-[48px] rounded-lg",
                                        step.bgColor
                                    )}>
                                        {step.icon}
                                    </div>

                                    <div className="flex flex-col">
                                        <h4 className="text-[16px] font-medium text-[#1B1B1B] leading-snug">
                                            {step.title}
                                        </h4>
                                        <p className="text-[13px] text-[#858585] leading-relaxed mt-0.5">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>)
                }
            </div>

            <OnboardingButton label="Go to Login" className="mt-[32px]" onClick={() => router.push("/sign-in")} />
        </div>
    )
}
