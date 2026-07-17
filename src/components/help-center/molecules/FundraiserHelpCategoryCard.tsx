'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

export interface FundraiserHelpCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    actionSlug: string;
}

interface FundraiserHelpCategoryCardProps {
    method: FundraiserHelpCategory;
    onFundraiserAction: (slug: string) => void;
}

export function FundraiserHelpCategoryCard({ method, onFundraiserAction }: FundraiserHelpCategoryCardProps) {
    const IconComponent = method.icon;

    return (
        <button
            type="button"
            onClick={() => onFundraiserAction(method.actionSlug)}
            className="w-full text-left bg-white border border-[#EAEAEA] rounded-xl p-6 flex flex-col justify-between items-start min-h-[220px] transition-all duration-300 hover:border-[#B9C65B] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B9C65B] focus-visible:ring-offset-2 cursor-pointer group"
        >
            {/* Top Content Information Block */}
            <div className="space-y-4 w-full">
                {/* Micro Icon Mask Box Wrapper */}
                <div className="w-12 h-12 bg-[#EAEAEA] rounded-lg flex items-center justify-center text-[#1A1A1A]">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                </div>

                {/* Main Identity Typography Stacks */}
                <div className="space-y-2">
                    <h3
                        className="text-[20px] text-[#1F1F1F] tracking-tight"
                        style={TYPOGRAPHY.body}
                    >
                        {method.title}
                    </h3>
                    <p
                        className="text-[16px] text-[#858585] leading-relaxed"
                        style={TYPOGRAPHY.body}
                    >
                        {method.description}
                    </p>
                </div>
            </div>

            {/* Bottom Footer Anchor Action Indicator */}
            <div className="flex items-center gap-1.5 pt-4 text-[12px] font-bold tracking-wider text-[#B9C65B] uppercase transition-colors group-hover:text-[#A4B04E]">
                <span>Visit Section</span>
                <ExternalLink className="w-4 h-4 translate-y-[-0.5px]" aria-hidden="true" />
            </div>
        </button>
    );
}