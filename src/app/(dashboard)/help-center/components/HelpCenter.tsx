'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, TrendingUp, Wallet, AlertTriangle, RefreshCw, CircleUserRound, Lightbulb, MessageCircle, Phone } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { SearchInputBar } from '@/components/watchlist/organisms/SearchInputBar';
import { HelpCategoryCard } from '@/components/help-center/molecules/HelpCategoryCard';
import { FAQ } from '@/components/landing/organisms/faq';
import { useUserStore } from '@/store/userStore';
import { FundraiserHelpCategory, FundraiserHelpCategoryCard } from '@/components/help-center/molecules/FundraiserHelpCategoryCard';

export interface HelpCategory {
    id: string;
    slug: string;
    title: string;
    articleCount: number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const HELP_CATEGORIES: HelpCategory[] = [
    { id: '1', slug: 'account-setup', title: 'Account setup', articleCount: 4, description: 'Creating your account and updating your details', icon: CircleUserRound },
    { id: '2', slug: 'kyc-verification', title: 'KYC & Verification', articleCount: 4, description: 'Identity checks and compliance requirements', icon: ShieldCheck },
    { id: '3', slug: 'investments', title: 'Investments', articleCount: 4, description: 'How to invest, manage watchlist, and track performance', icon: TrendingUp },
    { id: '4', slug: 'payment-wallet', title: 'Payment & Wallet', articleCount: 4, description: 'Managing allocations, funding nodes, and withdrawal rules', icon: Wallet },
    { id: '5', slug: 'troubleshooting', title: 'Troubleshooting', articleCount: 4, description: 'Resolving errors, login issues, and notifications', icon: AlertTriangle },
    { id: '6', slug: 'secondary-market', title: 'Secondary market', articleCount: 4, description: 'Trading shares with other investors', icon: RefreshCw }
];

const FUNDRAISER_HELP_CATEGORIES: FundraiserHelpCategory[] = [
    { id: 'fhm-1', title: 'Knowledge Base', description: 'Browse our complete guide to fundraising on Antital.', icon: Lightbulb, actionSlug: 'knowledge-base' },
    { id: 'fhm-2', title: 'Live Chat', description: 'Speak with an advisor in real-time for immediate help.', icon: MessageCircle, actionSlug: 'live-chat' },
    { id: 'fhm-3', title: 'Direct Support', description: 'Dedicated line for Premium Fundraisers; 0800-ANTITAL', icon: Phone, actionSlug: 'direct-support' }
];

export function HelpCenter() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const userType = useUserStore((state) => state.userType)
    const [hasHydrated, setHasHydrated] = useState(false)

    useEffect(() => {
        setHasHydrated(true)
    }, [])

    const filteredCategories = useMemo(() => {
        return HELP_CATEGORIES.filter(category =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const filteredFundraiserHelpCategory = useMemo(() => {
        return FUNDRAISER_HELP_CATEGORIES.filter(category =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleCategoryNavigation = (slug: string) => {
        router.push(`/help-center/${slug}`);
    };

    const handleFundraiserCategoryAction = (actionSlug: string) => {
        switch (actionSlug) {
            case 'knowledge-base':
                router.push('/help-center/account-setup');
                break;
            case 'live-chat':
                window.open('mailto:support@antital.com?subject=Fundraiser%20Support%20Request', '_blank');
                break;
            case 'direct-support':
                window.location.href = 'tel:0800-ANTITAL';
                break;
            default:
                router.push('/help-center');
        }
    };

    const currentUserType = hasHydrated ? userType : "individual";
    const isFundraiser = currentUserType === 'fundraiser';

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen pt-[80px] lg:pt-[171px]">
            {/* Hero Text Banner Header */}
            <div className="text-center mx-auto mb-10">
                <h1
                    className="text-[24px] md:text-[28px] text-[#1A1A1A] mb-3 tracking-tight"
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

            <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isFundraiser ? (

                    filteredFundraiserHelpCategory.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-[#858585]" style={TYPOGRAPHY.body}>
                            No support methods found matching &quot;{searchQuery}&quot;.
                        </div>
                    ) : (
                        filteredFundraiserHelpCategory.map((category) => (
                            <FundraiserHelpCategoryCard
                                key={category.id}
                                category={category}
                                onAction={handleFundraiserCategoryAction}
                            />
                        ))
                    )
                ) : (

                    filteredCategories.length === 0 ? (
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
                    )
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