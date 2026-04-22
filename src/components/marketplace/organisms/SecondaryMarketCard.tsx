import { TYPOGRAPHY } from "@/constants/styles";
import { InvestmentData } from "@/types/dashboard";
import Image from 'next/image';
import { Plus, Target } from 'lucide-react';
import { cn, formatCompactNumber } from "@/lib/utils";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export function SecondaryMarketCard({
    data,
    tradeType = "buy"
}: {
    data: InvestmentData,
    tradeType?: "buy" | "sell"
}) {
    const isBuyMode = tradeType === "buy";
    const hasLogo = data.logoSrc && data.logoSrc.trim() !== "";

    const isPos = data.priceChange! >= 0;

    const textColor = isPos ? "text-[#45B424]" : "text-[#EF4444]";
    const iconRotation = isPos ? "" : "rotate-90";

    return (
        <div className="group flex  gap-4 border border-[#E0E0E0] rounded-xl p-4 lg:p-6 shadow-sm w-full bg-white">

            <div className="w-[64px] h-[64px] bg-[#F4F7F6] rounded-lg flex items-center justify-center overflow-hidden border border-[#EAEAEA] shrink-0">
                {hasLogo ? (
                    <Image
                        src={data.logoSrc!}
                        alt={`${data.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain"
                    />
                ) : (
                    <span className="text-[#1F1F1F] font-bold text-[20px]" style={TYPOGRAPHY.heading}>
                        {getInitials(data.name)}
                    </span>
                )}
            </div>

            <div className="w-full">
                <div className='flex items-start gap-4 mb-5'>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                            <h4 className="text-[16px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>{data.name}</h4>
                            <span className="text-[#505050] text-[12px] p-1 lg:p-0.5 rounded border border-[#E0E0E0] bg-[#F9F9F9] w-fit inline-block" style={TYPOGRAPHY.body}>
                                {data.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[16px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                                ₦{data.price?.toLocaleString()}
                            </span>
                            <span className={cn("text-[14px] flex items-center", textColor)}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn("mr-1 transition-transform", iconRotation)}>
                                    <path d="m4 20 13-13M17 17V7H7" />
                                </svg>
                                {isPos ? '+' : ''}{data.priceChange}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Market Metrics Section */}
                <div className="grid lg:grid-cols-3 gap-4 mb-5">
                    <div>
                        <p className="text-[16px] text-[#858585] mb-1" style={TYPOGRAPHY.body}>24h Volume</p>
                        <p className="text-[16px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                            {formatCompactNumber(data.volume!)} shares
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] text-[#858585] mb-1" style={TYPOGRAPHY.body}>Market Cap</p>
                        <p className="text-[16px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                            ₦{formatCompactNumber(data.marketCap!)}
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] text-[#858585] mb-1" style={TYPOGRAPHY.body}>Available</p>
                        <p className="text-[16px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                            {data.offersCount} Offers
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col lg:flex-row gap-3">

                    <OnboardingButton
                        label={isBuyMode ? "Create Buy Order" : "Create Sell Offer"}
                        icon={<Plus size={18} strokeWidth={3} />}
                        className="max-w-[198px] px-0 my-0"
                    />
                    <OnboardingButton
                        variant="plain"
                        label={isBuyMode
                            ? `View Sell offers (${data.offersCount})`
                            : `View Buy offers (${data.offersCount || 0})`
                        }
                        icon={<Target size={18} />}
                        className="max-w-[198px] px-0 my-0"
                    />
                </div>
            </div>
        </div>
    );
}