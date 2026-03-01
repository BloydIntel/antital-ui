import { Info } from 'lucide-react';
import { UserTypeCard } from '@/components/create-account/molecules/user-type-card';
import { InvestorCategory } from '@/types/investor';
import { useOnboardingStore } from '@/store/onboardingStore';

interface Props {
    readonly categories: readonly InvestorCategory[];
    readonly selectedId: string | null;
    readonly onSelect: (id: string) => void;
    readonly title: string;
    readonly description: string;
}

export function InvestorSelectionView({ categories, selectedId, onSelect, title, description }: Props) {

    const { updateFormData } = useOnboardingStore();

    const handleCategorySelect = (categoryId: string) => {
        updateFormData({
            selectedCategoryId: categoryId,
            questionnaireAnswers: {}
        });

        onSelect(categoryId)
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="pb-[32px]">
                <h2 className="text-[36px] pb-2 text-[#1B1B1B] leading-tight font-[family-name:var(--font-rethink-sans)] font-medium">
                    {title}
                </h2>
                <p className="text-[16px] text-[#2C2C2C] font-[family-name:var(--font-dm-sans)]">
                    {description}
                </p>
            </div>

            <div className="space-y-4 mb-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`rounded-md transition-all cursor-pointer ${selectedId === category.id ? 'ring-2 ring-[#A7B832]' : ''
                            }`}
                    >
                        <UserTypeCard
                            onClick={() => handleCategorySelect(category.id)}
                            title={category.title}
                            subTitle={category.subTitle}
                            description={category.description}
                            cardType={category.iconType}
                        />
                    </div>
                ))}
            </div>

            <div className="flex flex-row bg-[#EDF4FC] border border-[#C7DDF6] rounded-sm p-3 mb-8">
                <Info className="h-4 lg:h-6 w-4 lg:w-6 text-[#3B73B5] shrink-0" />
                <p className="ml-2 text-[12px] lg:text-[14px] text-[#3B73B5] font-[family-name:var(--font-dm-sans)]">
                    Nigerian SEC regulations require us to categorize investores to ensure appropraite investment limits and protections. This helps match you with suitable investment opportunities
                </p>
            </div>
        </div>
    );
}

