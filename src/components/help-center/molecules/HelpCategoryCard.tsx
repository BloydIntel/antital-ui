'use client';

import { ChevronRight } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { HelpCategory } from '@/app/(dashboard)/help-center/components/HelpCenter';

interface HelpCategoryCardProps {
    category: HelpCategory;
    onClick: (slug: string) => void;
}

// Map slug/IDs to cohesive Icon Background + Icon Color combinations
const BRAND_THEME_MAP: Record<string, { bg: string; icon: string; tag: string }> = {
    'account-setup': {
        bg: 'bg-[#7D8A26]/10',
        icon: 'text-[#7D8A26]',
        tag: 'bg-[#7D8A26]'
    },
    'kyc-verification': {
        bg: 'bg-[#7A6FF0]/10',
        icon: 'text-[#7A6FF0]',
        tag: 'bg-[#7A6FF0]'
    },
    'investments': {
        bg: 'bg-[#C28A24]/10',
        icon: 'text-[#C28A24]',
        tag: 'bg-[#C28A24]'
    },
    'payment-wallet': {
        bg: 'bg-[#1F4068]/10',
        icon: 'text-[#1F4068]',
        tag: 'bg-[#1F4068]'
    },
    'troubleshooting': {
        bg: 'bg-[#D30A1A]/10',
        icon: 'text-[#D30A1A]',
        tag: 'bg-[#D30A1A]'
    },
    'secondary-market': {
        bg: 'bg-[#6F42C1]/10',
        icon: 'text-[#6F42C1]',
        tag: 'bg-[#6F42C1]'
    }
};

export function HelpCategoryCard({ category, onClick }: HelpCategoryCardProps) {
    const IconComponent = category.icon;

    // Fallback to generic slate colors if an API category slug doesn't match our predefined list
    const theme = BRAND_THEME_MAP[category.slug] || {
        bg: 'bg-gray-100',
        icon: 'text-gray-700',
        tag: 'bg-gray-600'
    };

    return (
        <div
            onClick={() => onClick(category.slug)}
            className="bg-white border-b-4 border-transparent hover:border-[#042E27] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
        >
            <div>
                {/* Icon wrapper matching container background with the icon color */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between gap-2">
                        <div className={`p-3 rounded-xl border border-transparent ${theme.bg} ${theme.icon}`}>
                            <IconComponent className="w-6 h-6 shrink-0" />
                        </div>

                        {/* Header Title & Article Count Badge */}
                        <div className="flex flex-col items-start gap-1 flex-wrap">
                            <h3
                                className="text-[20px] font-medium text-[#1A1A1A]"
                                style={TYPOGRAPHY.body}
                            >
                                {category.title}
                            </h3>
                            <span className={`text-white text-[12px] px-2 py-0.5 rounded font-medium ${theme.tag}`}>
                                {category.articleCount} articles
                            </span>
                        </div>

                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors transform group-hover:translate-x-0.5 duration-200" />

                </div>



                {/* Sub-text Detail */}
                <p
                    className="text-[16px] text-[#666666] leading-relaxed"
                    style={TYPOGRAPHY.body}
                >
                    {category.description}
                </p>
            </div>
        </div>
    );
}