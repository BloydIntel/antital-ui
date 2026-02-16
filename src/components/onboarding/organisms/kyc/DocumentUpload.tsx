"use client"

import React, { useState } from 'react';
import { ChevronUp, Home } from 'lucide-react';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { SelectInput } from '@/components/onboarding/molecules/SelectInput';
import { UploadSection } from '@/components/onboarding/molecules/UploadSection';
import { TYPOGRAPHY } from '@/constants/styles';

export function DocumentUpload() {
    const [selectedIdLabel, setSelectedIdLabel] = useState("National ID Card");

    // State for toggling sections
    const [showGovId, setShowGovId] = useState(true);
    const [showAddress, setShowAddress] = useState(true);

    const idOptions = [
        { label: 'National ID Card', value: 'national_id' },
        { label: 'International Passport', value: 'passport' },
        { label: "Voter's Card", value: 'voters_card' },
    ];

    const handleIdChange = (value: string) => {
        const option = idOptions.find(opt => opt.value === value);
        if (option) setSelectedIdLabel(option.label);
    };

    return (
        <div className="space-y-4">
            {/* --- Section 1: Government ID --- */}
            <div className="space-y-1">
                <div
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => setShowGovId(!showGovId)}
                >
                    <h3 className="text-[20px] text-[#1B1B1B]"
                        style={TYPOGRAPHY.heading}
                    >Government-Issued Photo ID</h3>
                    <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                        <ChevronUp
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!showGovId ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </div>

                {/* Collapsible Content */}
                <div className={`space-y-4 px-1 transition-all duration-300 ease-in-out overflow-hidden ${showGovId ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 invisible"
                    }`}>
                    <div>
                        <label
                            className="text-[16px] text-[#1A1A1A] mb-2 block"
                            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}
                        >
                            Select ID Type
                        </label>
                        <SelectInput
                            options={idOptions}
                            placeholder="National ID Card"
                            onChange={handleIdChange}
                        />
                    </div>

                    <OnboardingInput
                        label={`${selectedIdLabel} Number`}
                        placeholder="1234567890"
                        className="pb-0"
                    />

                    <UploadSection label='Upload Government ID' desc='Ensure all details are clearly visible' />

                    <OnboardingInput
                        label="Bank Verification Number"
                        placeholder="1234567890"
                        className="pb-0"
                    />
                </div>
            </div>

            {/* --- Section 2: Proof of Address --- */}
            <div className="space-y-1">
                <div
                    className="flex justify-between items-center pt-2 cursor-pointer group"
                    onClick={() => setShowAddress(!showAddress)}
                >
                    <h3 className="text-[20px] text-[#1B1B1B]"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 400,
                            letterSpacing: "-1%",
                        }}>Proof of Address</h3>
                    <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                        <ChevronUp
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!showAddress ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </div>

                {/* Collapsible Content */}
                <div className={`space-y-4 px-1 transition-all duration-300 ease-in-out overflow-hidden ${showAddress ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 invisible"
                    }`}>
                    <div className="relative">
                        <OnboardingInput
                            label="Residential Address"
                            placeholder="23A Unity Crescent Lekki Phase 1, Lagos State Nigeria."
                            icon={Home}
                            className="pb-0"
                        />
                    </div>

                    <UploadSection label='Upload Proof of Address' desc='Document must show your current residential address' />
                </div>
            </div>
        </div>
    );
}