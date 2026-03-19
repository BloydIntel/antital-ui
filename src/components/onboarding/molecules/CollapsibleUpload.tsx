import { ChevronUp } from "lucide-react";
import { UploadSection } from "@/components/onboarding/molecules/UploadSection";
import { TYPOGRAPHY } from "@/constants/styles";

interface CollapsibleProps {
    title: string;
    onUpload: (file: File | null) => void;
    isError: boolean;
    isOpen: boolean;
    onToggle: () => void;
    value: File | null;
}

export const CollapsibleUpload = ({ title, onUpload, isError, isOpen, onToggle, value }: CollapsibleProps) => (
    <div className="space-y-1 pt-4 border-b border-gray-50">
        <div
            className="flex justify-between items-center cursor-pointer group"
            onClick={onToggle}
        >
            <h3 className="text-[16px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                {title}
            </h3>
            <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                <ChevronUp
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
                />
            </div>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 mt-4 mb-4" : "max-h-0 opacity-0 invisible"
            }`}>
            <UploadSection
                value={value}
                onUpload={onUpload}
                isError={isError}
            />
        </div>
    </div>
);