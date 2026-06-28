'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { HELP_DETAILS_MAP } from '@/constants/helpData';
import { ArticleGuideCard } from '@/components/help-center/molecules/ArticleGuideCard';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

export default function HelpArticleDetailPage() {
    const params = useParams();
    const router = useRouter();

    const slug = typeof params?.slug === 'string' ? params.slug : 'account-setup';
    const articleIdParam = typeof params?.articleId === 'string' ? params.articleId : '';

    // Resolve matching state details
    const categoryData = HELP_DETAILS_MAP[slug] || HELP_DETAILS_MAP['account-setup'];

    // Find current article by translating structural tag id ("Article 001" <-> "article-001")
    const currentArticle = categoryData.articles.find(
        (a) => a.id.toLowerCase().replace(/\s+/g, '-') === articleIdParam
    ) || categoryData.articles[0];

    // Feedback State Nodes
    const [yesCount, setYesCount] = useState(45);
    const [noCount, setNoCount] = useState(0);
    const [hasVoted, setHasVoted] = useState<null | 'yes' | 'no'>(null);

    const handleFeedback = (type: 'yes' | 'no') => {
        // Scenario 1: User clicks the same choice again -> Undo the vote
        if (hasVoted === type) {
            setHasVoted(null);
            if (type === 'yes') setYesCount(prev => prev - 1);
            if (type === 'no') setNoCount(prev => prev - 1);
            return;
        }

        // Scenario 2: User switches choice from 'yes' to 'no' or vice versa
        if (hasVoted !== null) {
            if (type === 'yes') {
                setYesCount(prev => prev + 1);
                setNoCount(prev => prev - 1);
            } else {
                setNoCount(prev => prev + 1);
                setYesCount(prev => prev - 1);
            }
        }
        // Scenario 3: Initial vote selection
        else {
            if (type === 'yes') setYesCount(prev => prev + 1);
            if (type === 'no') setNoCount(prev => prev + 1);
        }

        setHasVoted(type);
    };

    // Extract related articles excluding the active one to populate bottom section of image_e7b71d.png
    const relatedArticles = categoryData.articles.filter((a) => a.id !== currentArticle.id).slice(0, 2);

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen">
            <div className="mx-auto">

                {/* Header Back Navigation Link matching image_e7b71d.png */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push(`/help-center/${slug}`)}
                        className="flex items-center gap-3 text-[#1A1A1A] hover:opacity-80 transition-opacity group cursor-pointer text-left"
                    >
                        <ArrowLeft className="hidden lg:block w-6 h-6 flex-shrink-0 transform group-hover:-translate-x-0.5 transition-transform" />
                        <h1 className="text-[24px] lg:text-[28px] text-[#1B1B1B] tracking-tight" style={TYPOGRAPHY.heading}>
                            {currentArticle.title}
                        </h1>
                    </button>

                    <div className="flex gap-4 text-[14px] lg:text-[16px] text-[#666666] mt-2" style={TYPOGRAPHY.body}>
                        <span>Last updated: 12/10/2024</span>
                        <span>{currentArticle.readTime}</span>
                    </div>
                </div>

                {/* Core Markdown Body Content Block loaded dynamically from constants */}
                <div
                    className="text-[16px] lg:text-[20px] text-[#2D2D2D] leading-[28px] space-y-6 mb-14"
                    style={TYPOGRAPHY.body}
                >
                    {currentArticle.content.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Was This Article Helpful Interactive Box */}
                <div className="pl-2 py-6 mb-14">
                    <h3 className="text-[16px] lg:text-[20px] text-[#1A1A1A] mb-3" style={TYPOGRAPHY.body}>
                        Was this article helpful?
                    </h3>
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => handleFeedback('yes')}
                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-[14px] font-medium transition-all cursor-pointer ${hasVoted === 'yes'
                                ? 'bg-green-50 border-green-300 text-green-700'
                                : 'border-gray-200 bg-white hover:bg-gray-50 text-[#1A1A1A]'
                                }`}
                        >
                            <ThumbsUp className="w-4 h-4 text-blue-500" fill={hasVoted === 'yes' ? 'currentColor' : 'none'} />
                            <span>Yes ({yesCount})</span>
                        </button>

                        <button
                            onClick={() => handleFeedback('no')}
                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-[14px] font-medium transition-all cursor-pointer ${hasVoted === 'no'
                                ? 'bg-red-50 border-red-300 text-red-700'
                                : 'border-gray-200 bg-white hover:bg-gray-50 text-[#1A1A1A]'
                                }`}
                        >
                            <ThumbsDown className="w-4 h-4 text-gray-400" fill={hasVoted === 'no' ? 'currentColor' : 'none'} />
                            <span>No ({noCount})</span>
                        </button>
                    </div>
                    <p className="text-[14px] text-[#767676]">Your feedback helps us improve our help content for everyone.</p>
                </div>

                {/* Related Articles Section Matrix Grid */}
                <div className="mb-20">
                    <h3 className="text-[16px] lg:text-[20px] text-[#1A1A1A] mb-6" style={TYPOGRAPHY.body}>
                        Related articles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[640px]">
                        {relatedArticles.map((article, idx) => (
                            <ArticleGuideCard
                                key={idx}
                                article={article}
                                onClick={() => router.push(`/help-center/${slug}/${article.id.toLowerCase().replace(/\s+/g, '-')}`)}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Banner: Still need help block callout CTA */}
                <div className="flex flex-col items-center gap-4 bg-[#F4F6F5] rounded-xl p-4 text-center mx-auto border border-[#EAEAEA]">
                    <h4 className="text-[16px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                        Still need help?
                    </h4>
                    <p className="text-[14px] text-[#666666]" style={TYPOGRAPHY.body}>
                        Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                    </p>
                    <OnboardingButton
                        label='Contact support'
                        className='w-[154px]'
                    />
                </div>

            </div>
        </div>
    );
}