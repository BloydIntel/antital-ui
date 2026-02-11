import { OnboardingInput } from "@/components/onboarding/molecules/OnboardingInput";
import { ChevronDown, House } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


export function LocationForm() {
    return (
        <div>
            <section className="max-w-[558px]">

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
                        Location Information
                    </p>

                    <OnboardingInput label="Nationality" type="text" placeholder="Nigeria" icon={ChevronDown} />

                    <div className="grid lg:grid-cols-2 lg:gap-4">
                        <OnboardingInput label="Country of Residence" type="text" placeholder="Nigeria" icon={ChevronDown} />
                        <OnboardingInput label="State of Residence" type="text" placeholder="Lagos" icon={ChevronDown} />
                    </div>

                    <OnboardingInput label="Residential Address" type="text" placeholder="23A Unity Crescent Lekki Phase 1,  Lagos State, Nigeria." icon={House} />

                    <div className="grid lg:grid-cols-2 lg:gap-4">
                        <OnboardingInput label="Create Password" type="password" placeholder="********" />
                        <OnboardingInput label="Confirm Password" type="password" placeholder="********" />
                    </div>

                    <div className="flex items-center space-x-2 space-y-0">

                        <Checkbox
                            className="mr-1 lg:mr-2 border-[#042E27] data-[state=checked]:bg-[#042E27] data-[state=checked]:text-white"
                        />

                        <p
                            className="inline-block text-[#505050] text-[12px] lg:text-[14px] cursor-pointer"
                            style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontWeight: 400,
                            }}
                        >
                            I agree to the Terms of Service and acknowledge that I have read and understood the Trading Policies.
                        </p>
                    </div>

                    {/* <OnboardingButton Label="Create Account" onClick={onNext} /> */}

                </div>

            </section>
        </div>
    );
}