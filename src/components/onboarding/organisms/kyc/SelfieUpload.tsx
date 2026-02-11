import { Lightbulb, User, Smile, Camera, FileUp } from 'lucide-react';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

export function SelfieUpload() {
    const instructions = [
        {
            id: 1,
            icon: <Lightbulb size={20} className="text-[#1B1B1B]" />,
            text: "Ensure adequate lighting and avoid obstructions"
        },
        {
            id: 2,
            icon: <User size={20} className="text-[#1B1B1B]" />,
            text: "Keep your face fully visible"
        },
        {
            id: 3,
            icon: <Smile size={20} className="text-[#1B1B1B]" />,
            text: "Maintain a neutral expression"
        }
    ];

    return (
        <div className="space-y-8 w-full">
            {/* Instruction List */}
            <div className="space-y-4">
                {instructions.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#F4F5F7] rounded-lg shrink-0">
                            {item.icon}
                        </div>
                        <p className="text-[#505050] text-sm md:text-base font-normal">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Buttons Layout */}
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    Label="Take Live Selfie"
                    variant="solid"
                    icon={<Camera size={20} />}
                    onClick={() => console.log("Camera opened")}
                />
                <OnboardingButton
                    Label="Upload Photo"
                    variant="plain"
                    icon={<FileUp size={20} />}
                    onClick={() => console.log("File picker opened")}
                />
            </div>
        </div>
    );
}