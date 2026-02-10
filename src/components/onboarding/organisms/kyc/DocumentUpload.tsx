"use client"

import React, { useState } from 'react';
import { Info, Upload, ChevronUp, Home } from 'lucide-react';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { SelectInput } from '@/components/onboarding/molecules/SelectInput';

export function DocumentUpload() {
    const [selectedIdLabel, setSelectedIdLabel] = useState("National ID Card");

    // State for toggling sections
    const [showGovId, setShowGovId] = useState(true);
    const [showAddress, setShowAddress] = useState(true);

    const idOptions = [
        { label: 'National ID Card', value: 'national_id' },
        { label: 'International Passport', value: 'passport' },
        { label: 'Voters Card', value: 'voters_card' },
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
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 400,
                            letterSpacing: "-1%",
                        }}
                    >Government-Issued Photo ID</h3>
                    <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                        <ChevronUp
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!showGovId ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </div>

                {/* Collapsible Content */}
                <div className={`space-y-4 transition-all duration-300 ease-in-out overflow-hidden ${showGovId ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 invisible"
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

                    <div className="space-y-2">
                        <p className="text-[16px] text-[#2C2C2C]" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}>
                            Upload Government ID <span className="text-red-500">*</span>
                        </p>
                        <p className="text-[14px] text-gray-400" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}>
                            Ensure all details are clearly visible
                        </p>

                        <div className="border-2 border-dashed border-[#E6EEDC] rounded-xl px-10 py-18 flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-3" />
                            <p className="text-[14px] text-center text-gray-500 max-w-[446px]">
                                Click here to upload, or drag and drop files (JPG&apos;s and PNG&apos;s are supported)
                            </p>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg border border-[#D1E4F9]">
                            <Info className="w-4 h-4 text-[#3E82D5]" />
                            <p className="text-[12px] text-[#3E82D5]">Ensure the document is clear and all information is visible</p>
                        </div>
                    </div>
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
                <div className={`space-y-4 transition-all duration-300 ease-in-out overflow-hidden ${showAddress ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 invisible"
                    }`}>
                    <div className="relative">
                        <OnboardingInput
                            label="Residential Address"
                            placeholder="23A Unity Crescent Lekki Phase 1, Lagos State Nigeria."
                            icon={Home}
                            className="pb-0"
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-[16px] text-[#2C2C2C]" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}>
                            Upload Proof of Address <span className="text-red-500">*</span>
                        </p>
                        <p className="text-[14px] text-gray-400" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}>
                            Document must show your current residential address
                        </p>

                        <div className="border-2 border-dashed border-[#E6EEDC] rounded-xl px-10 py-18 flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-3" />
                            <p className="text-[14px] text-center text-gray-500 max-w-[446px]">
                                Click here to upload, or drag and drop files (JPG&apos;s and PNG&apos;s are supported)
                            </p>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg border border-[#D1E4F9]">
                            <Info className="w-4 h-4 text-[#3E82D5]" />
                            <p className="text-[12px] text-[#3E82D5]">Ensure the document is clear and all information is visible</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}