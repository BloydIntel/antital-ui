import { TYPOGRAPHY } from "@/constants/styles";
import { InvestmentData, RISK_COLORS } from "@/types/dashboard";
import { ProgressBar } from '@/components/ui/progress-bar'
import Image from 'next/image'
import { Clock4 } from 'lucide-react'

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export function PrimaryMarketCard({ data }: { data: InvestmentData }) {
    const hasLogo = data.logoSrc && data.logoSrc.trim() !== "";

    const backgroundColor = RISK_COLORS[data.risk!];

    return (
        <div className="group border border-[#E0E0E0] rounded-xl p-2 lg:p-5 shadow-sm w-full">
            <div className='flex justify-between items-center mb-4'>
                <div className='flex flex-col lg:flex-row item-start lg:items-center gap-4'>
                    <div className="w-[78px] h-[75px] bg-[#F4F7F6] rounded-lg flex items-center justify-center overflow-hidden border border-[#EAEAEA]">
                        {hasLogo ? (
                            <Image
                                src={data.logoSrc!}
                                alt={`${data.name} logo`}
                                width={78}
                                height={75}
                                className="object-contain"
                            />
                        ) : (
                            <span className="text-[#1F1F1F] font-bold text-[28px]" style={TYPOGRAPHY.heading}>
                                {getInitials(data.name)}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                        <h4 className="text-[16px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>{data.name}</h4>
                        <div className="flex gap-2">
                            <span className="text-[#505050] text-[14px] px-2 py-1 rounded border border-[#75757566]" style={TYPOGRAPHY.body}>{data.category}</span>
                            <span className={`text-[12px] text-[#F6FBEF] px-2 py-2 rounded capitalize`} style={{ backgroundColor }}>
                                {data.risk === 'moderate' ? 'Medium' : data.risk} Risk
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-start mb-4 self-start">
                    <span className="text-[16px] text-[#858585] flex items-center gap-1">
                        <Clock4 width={24} height={24} className='pr-1' /> {data.daysLeft} days left
                    </span>
                </div>
            </div>

            <p className='text-[16px] text-[#505050] pb-4 lg:h-[42px]' style={TYPOGRAPHY.body}>
                {data.description}
            </p>

            <div className="grid grid-cols-2 lg:flex lg:gap-20 xl:gap-11 mb-4 pt-2">
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Raised</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>₦{data.raised?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Target</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>₦{data.goal?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Investors</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>{data.investors?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Min. Investment</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>₦{data.minInvestment?.toLocaleString()}</p>
                </div>
            </div>

            <div>
                <div className='flex justify-between'>
                    <p>Progress</p>
                    <p className="text-right text-xs mt-1 font-bold">{data.percentage}%</p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <ProgressBar value={data.percentage!} fillColor='#45B424' />
                </div>
            </div>

            <button className="w-full mt-4 bg-[#00332C] text-white py-3 rounded-lg font-medium cursor-pointer
  transition-all duration-300 ease-in-out
  /* Mobile: Always visible */
  opacity-100 translate-y-0 
  /* Desktop (Large screens): Hidden by default, shown on group hover */
  lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                Invest Now
            </button>
        </div>
    )
}