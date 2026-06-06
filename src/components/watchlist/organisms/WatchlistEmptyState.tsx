'use client';

import { Bookmark } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { useRouter } from 'next/navigation';

export type WatchlistFilterType = 'all' | 'ending_soon' | 'near_target';

interface WatchlistEmptyStateProps {
    filterType: WatchlistFilterType;
}

export function WatchlistEmptyState({ filterType }: WatchlistEmptyStateProps) {
    const router = useRouter()


    // Dynamically adjust content depending on the active watch filter
    const getContent = () => {
        switch (filterType) {
            case 'ending_soon':
                return {
                    title: 'No Projects Ending Soon',
                    description: "No projects are nearing their deadline. Start building your watchlist by saving projects that interest you. We'll notify you of key updates and upcoming deadlines.",
                };
            case 'near_target':
                return {
                    title: 'Nearing Funding Target',
                    description: "Track projects that are close to reaching their investment goals. Stay updated and don't miss the chance to take action.",
                };
            case 'all':
            default:
                return {
                    title: 'Your Watchlist is Empty',
                    description: 'Keep track of projects you are interested in, monitor funding metrics, and manage your updates all in one location.',
                };
        }
    };

    const { title, description } = getContent();

    return (
        <div className="flex flex-col items-center justify-center text-center py-1 px-4 bg-white">
            {/* Checkerboard/Transparent placeholder box matching your wireframe layout */}
            <div
                className="w-20 h-20 border border-[#EAEAEA] rounded-xl mb-5 flex items-center justify-center shadow-sm"
                style={{
                    backgroundImage: 'radial-gradient(#EAEAEA 1px, transparent 0)',
                    backgroundSize: '8px 8px',
                    backgroundColor: '#fafafa'
                }}
            >
                <Bookmark className="w-7 h-7 text-[#858585]" />
            </div>

            <h4 className="text-[20px] font-semibold text-[#1A1C1E] mb-2 tracking-tight" style={TYPOGRAPHY.heading}>
                {title}
            </h4>

            <p className="text-[14px] text-[#717171] max-w-lg mb-8 leading-relaxed" style={TYPOGRAPHY.body}>
                {description}
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-3 w-full max-w-xs sm:max-w-none">
                <OnboardingButton label='Primary Market' variant="plain" className='w-[273px]' onClick={() => router.push("/marketplace")} />

                <OnboardingButton label='Secondary Market' className='w-[273px]' onClick={() => router.push("/marketplace?tab=secondary")} />
            </div>
        </div>
    );
}