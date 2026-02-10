import { useOnboardingStore } from "@/store/onboardingStore";
import { PersonalDetailsForm } from "@/components/onboarding/organisms/personal-step/PersonalDetailsForm";
import { LocationForm } from "@/components/onboarding/organisms/personal-step/LocationForm";
import { useRouter } from "next/navigation";

export function PersonalStep() {
    const subStep = useOnboardingStore((s) => s.personalSubStep);
    const setSubStep = useOnboardingStore((s) => s.setPersonalSubStep);
    const router = useRouter();

    if (subStep === "location") {
        return (
            <LocationForm

                onNext={() => router.push('/onboarding/email')}
            />
        );
    }

    return (
        <PersonalDetailsForm
            onNext={() => setSubStep("location")}
        />
    );
}