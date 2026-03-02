import { Lightbulb, User, Smile, Camera, FileUp, CheckCircle2 } from 'lucide-react';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useRef } from 'react';

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

export function SelfieUpload({ showErrors }: { showErrors: boolean }) {
    const { formData, updateFormData } = useOnboardingStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const selfieFile = formData.kycData.selfie;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateFormData({
                kycData: { selfie: file }
            });
            e.target.value = '';
        }
    };
    const handleSelfie = () => { }

    return (
        <div className="space-y-8 w-full">

            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
            />

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

            {selfieFile ? (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                    <p className="text-green-700 text-sm">Selfie captured: <b>{selfieFile.name}</b></p>
                </div>
            ) : showErrors && (
                <p className="text-red-500 text-sm font-medium">Please capture or upload a selfie to continue.</p>
            )}

            {/* Buttons Layout */}
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    label="Take Live Selfie"
                    variant="solid"
                    icon={<Camera size={20} />}
                    onClick={handleSelfie}
                />
                <OnboardingButton
                    label="Upload Photo"
                    variant="plain"
                    icon={<FileUp size={20} />}
                    onClick={() => fileInputRef.current?.click()}
                />
            </div>
        </div>
    );
}