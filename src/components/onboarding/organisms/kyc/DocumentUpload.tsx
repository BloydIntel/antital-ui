"use client"

import React, { useState } from 'react';
import { ChevronUp, Home } from 'lucide-react';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { SelectInput } from '@/components/onboarding/molecules/SelectInput';
import { UploadSection } from '@/components/onboarding/molecules/UploadSection';
import { TYPOGRAPHY } from '@/constants/styles';
import { type KYCData, useOnboardingStore } from '@/store/onboardingStore';

export function DocumentUpload({ showErrors }: { showErrors: boolean }) {
    const { formData, updateFormData } = useOnboardingStore();
    const data = formData.kycData;


    const handleDataChange = <K extends keyof KYCData>(field: K, value: KYCData[K]) => {
        updateFormData({
            kycData: {
                [field]: value
            }
        });
    };

    const toElevenDigits = (value: string) => value.replace(/\D/g, "").slice(0, 11);

    // UI state for toggles
    const [showGovId, setShowGovId] = useState(true);
    const [showAddress, setShowAddress] = useState(true);

    const idOptions = [
        { label: 'National ID Card', value: 'national_id' },
        { label: 'International Passport', value: 'passport' },
        { label: "Voter's Card", value: 'voters_card' },
    ];

    // Determine the label for the ID Number input based on store value
    const selectedIdLabel = idOptions.find(opt => opt.value === data.idType)?.label || "National ID Card";

    return (
        <div className="space-y-4">
            {/* --- Section 1: Government ID --- */}
            <div className="space-y-1">
                <div
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => setShowGovId(!showGovId)}
                >
                    <h3 className="text-[20px] text-[#1B1B1B]" style={TYPOGRAPHY.body}>
                        Government-Issued Photo ID
                    </h3>
                    <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                        <ChevronUp
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!showGovId ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>

                <div className={`space-y-4 px-1 transition-all duration-300 ease-in-out overflow-hidden ${showGovId ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0 invisible"}`}>
                    <div>
                        <label
                            className="text-[16px] text-[#1A1A1A] mb-2 block"
                            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}
                        >
                            Select ID Type
                        </label>
                        <SelectInput
                            options={idOptions}
                            placeholder="Select ID Type"
                            value={data.idType}
                            onChange={(val) => handleDataChange('idType', val)}
                            error={showErrors && !data.idType ? "Please select an ID type" : ""}
                        />
                    </div>

                    <OnboardingInput
                        label={`${selectedIdLabel} Number`}
                        placeholder="Enter ID Number"
                        className="pb-0"
                        value={data.idNumber}
                        onChange={(e) => handleDataChange('idNumber', toElevenDigits(e.target.value))}
                        error={showErrors && !data.idNumber ? "ID number is required" : ""}
                    />

                    <UploadSection
                        label='Upload Government ID'
                        desc='Ensure all details are clearly visible'
                        value={data.idFile}
                        onUpload={(file) => handleDataChange('idFile', file)}
                        isError={showErrors && !data.idFile}
                    />

                    <OnboardingInput
                        label="Bank Verification Number"
                        placeholder="1234567890"
                        className="pb-0"
                        value={data.bvn}
                        onChange={(e) => handleDataChange('bvn', toElevenDigits(e.target.value))}
                        error={showErrors && !data.bvn ? "BVN is required" : ""}
                    />
                </div>
            </div>

            {/* --- Section 2: Proof of Address --- */}
            <div className="space-y-1 pt-4">
                <div
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => setShowAddress(!showAddress)}
                >
                    <h3 className="text-[20px] text-[#1B1B1B]" style={TYPOGRAPHY.body}>
                        Proof of Address
                    </h3>
                    <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                        <ChevronUp
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!showAddress ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>

                <div className={`space-y-4 px-1 transition-all duration-300 ease-in-out overflow-hidden ${showAddress ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0 invisible"}`}>
                    <div className="relative">
                        <OnboardingInput
                            label="Residential Address"
                            placeholder="Enter your full address"
                            icon={Home}
                            className="pb-0"
                            value={data.address}
                            onChange={(e) => handleDataChange('address', e.target.value)}
                            error={showErrors && !data.address ? "Residential address is required" : ""}
                        />
                    </div>

                    <UploadSection
                        label='Upload Proof of Address'
                        desc='Document must show your current residential address'
                        value={data.addressFile}
                        onUpload={(file) => handleDataChange('addressFile', file)}
                        isError={showErrors && !data.addressFile}
                    />
                </div>
            </div>
        </div>
    );
}
