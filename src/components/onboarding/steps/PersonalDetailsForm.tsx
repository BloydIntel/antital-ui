import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { Calendar } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface PersonalDetailsProps {
    onNext: () => void
}

export function PersonalDetailsForm({ onNext }: PersonalDetailsProps) {
    return (
        <section>

            <div>
                <h2 className="text-[36px] text-[#1B1B1B] leading-tight"
                    style={{
                        fontFamily: "var(--font-rethink-sans)",
                        fontWeight: 500,
                        letterSpacing: "-1%",
                    }}
                >
                    Start Your Investment Journey
                </h2>
                <p className="text-[16px] text-[#2C2C2C] leading-tight"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        letterSpacing: "-1%",
                    }}
                >
                    Join Nigerians building wealth through startup investing
                </p>
            </div>

            <div className="pt-[32px]">
                <p className="text-[24px] text-[#1B1B1B] leading-tight pb-[25px]"
                    style={{
                        fontFamily: "var(--font-rethink-sans)",
                        fontWeight: 500,
                        letterSpacing: "-1%",
                    }}
                >
                    Personal Details
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <OnboardingInput label="First Name" type="text" placeholder="John" />
                    <OnboardingInput label="Last Name" type="text" placeholder="Doe" />
                </div>

                <OnboardingInput label="Email" type="email" placeholder="johndoe@email.com" />

                <OnboardingInput label="Preferred Name/Alias" type="text" placeholder="John Doe" />

                <div className="grid grid-cols-2 gap-4">
                    <OnboardingInput label="Phone Number" type="tel" placeholder="+234 90 1234 5678" />
                    <OnboardingInput label="Date of Birth" type="date" placeholder="DD/MM/YYYY" icon={Calendar} />
                </div>

                <OnboardingButton Label="Proceed" onClick={onNext} />

            </div>

        </section>
    );
}