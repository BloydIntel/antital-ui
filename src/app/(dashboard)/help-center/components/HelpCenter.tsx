'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, TrendingUp, Wallet, AlertTriangle, RefreshCw, CircleUserRound } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { SearchInputBar } from '@/components/watchlist/organisms/SearchInputBar';
import { HelpCategoryCard } from '@/components/help-center/molecules/HelpCategoryCard';
import { FAQ } from '@/components/landing/organisms/faq';

export interface HelpCategory {
    id: string;
    slug: string;
    title: string;
    articleCount: number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const HELP_CATEGORIES: HelpCategory[] = [
    { id: '1', slug: 'account-setup', title: 'Account setup', articleCount: 8, description: 'Creating your account and updating your details', icon: CircleUserRound },
    { id: '2', slug: 'kyc-verification', title: 'KYC & Verification', articleCount: 8, description: 'Identity checks and compliance requirements', icon: ShieldCheck },
    { id: '3', slug: 'investments', title: 'Investments', articleCount: 8, description: 'How to invest, manage watchlist, and track performance', icon: TrendingUp },
    { id: '4', slug: 'payment-wallet', title: 'Payment & Wallet', articleCount: 8, description: 'Creating your account and updating your details', icon: Wallet },
    { id: '5', slug: 'troubleshooting', title: 'Troubleshooting', articleCount: 8, description: 'Resolving errors, login issues, and notifications', icon: AlertTriangle },
    { id: '6', slug: 'secondary-market', title: 'Secondary market', articleCount: 8, description: 'Trading shares with other investors', icon: RefreshCw }
];

export function HelpCenter() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredCategories = useMemo(() => {
        return HELP_CATEGORIES.filter(category =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleCategoryNavigation = (slug: string) => {
       router.push(`/help-center/${slug}`);
    };

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen pt-[171px]">
            {/* Hero Text Banner Header */}
            <div className="text-center mx-auto mb-10">
                <h1
                    className="text-[24px] md:text-28px] text-[#1A1A1A] mb-3 tracking-tight"
                    style={TYPOGRAPHY.heading}
                >
                    Hello, how can we help
                </h1>
                <p
                    className="text-[14px] md:text-[16px] text-[#666666]"
                    style={TYPOGRAPHY.body}
                >
                    Find answers to common questions, browse our guides, or get in touch with our support team
                </p>
            </div>

            <div className="max-w-3xl mx-auto mb-16">
                <SearchInputBar
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </div>

            {/* Interactive Knowledge Base Grid System */}
            <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-[#858585]" style={TYPOGRAPHY.body}>
                        No help topics found matching &quot;{searchQuery}&quot;.
                    </div>
                ) : (
                    filteredCategories.map((category) => (
                        <HelpCategoryCard
                            key={category.id}
                            category={category}
                            onClick={handleCategoryNavigation}
                        />
                    ))
                )}
            </div>

            <div className='py-[88px]'>
                <FAQ
                    title='Find answers to'
                    title2='Frequently Asked Questions'
                    titleStyle='text-[28px] text-[#1F1F1F]'
                    activeTabClassName="text-[#2A2E0C] bg-[#DCE3AD]"
                    inactiveTabClassName='text-[#11110F] cursor-pointer bg-transparent hover:bg-[#DCE3AD]/50'
                    containerClassName='border-[#3D3D3D] '
                    questionClassName='text-[#1F1F1F]'
                    answerClassName='text-[#505050]'
                    toggleButtonClassname='text-[#3D3D3D]'
                />
            </div>
        </div>
    );
}