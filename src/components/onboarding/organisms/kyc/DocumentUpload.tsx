"use client"

import React, { useState } from 'react';
import { ChevronUp, Home } from 'lucide-react';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { SelectInput } from '@/components/onboarding/molecules/SelectInput';
import { UploadSection } from '@/components/onboarding/molecules/UploadSection';
import { TYPOGRAPHY } from '@/constants/styles';
import { type KYCData, useOnboardingStore } from '@/store/onboardingStore';
import { useOnboardingFileUpload } from '@/hooks/onboarding/useOnboardingFileUpload';
import { hasOnboardingDocument } from '@/lib/onboarding-file-upload';
import {
    bvnErrorMessage,
    kycIdNumberErrorMessage,
    normalizeKycIdNumber,
    toElevenDigits,
} from '@/lib/kyc-id-validation';

export type DocumentUploadFieldErrors = {
    idNumber?: string;
    bvn?: string;
};

export function DocumentUpload({
    showErrors,
    apiFieldErrors,
    onClearApiFieldError,
}: {
    showErrors: boolean;
    apiFieldErrors?: DocumentUploadFieldErrors;
    onClearApiFieldError?: (field: keyof DocumentUploadFieldErrors) => void;
}) {
    const { formData, updateFormData } = useOnboardingStore();
    const data = formData.kycData;
    const { uploadKycDocument, isUploading } = useOnboardingFileUpload();

    const handleDataChange = <K extends keyof KYCData>(field: K, value: KYCData[K]) => {
        updateFormData({
            kycData: {
                [field]: value
            }
        });
    };

    const [showGovId, setShowGovId] = useState(true);
    const [showAddress, setShowAddress] = useState(true);

    const idOptions = [
        { label: 'National ID Card', value: 'national_id' },
        { label: 'International Passport', value: 'passport' },
        { label: "Driver's Licence", value: 'drivers_licence' },
    ];

    const selectedIdLabel = idOptions.find(opt => opt.value === data.idType)?.label || "National ID Card";
    const idNumberError =
        apiFieldErrors?.idNumber ||
        (showErrors ? kycIdNumberErrorMessage(data.idType, data.idNumber) : null);
    const bvnError =
        apiFieldErrors?.bvn ||
        (showErrors ? bvnErrorMessage(data.bvn) : null);

    return (
        <div className="space-y-4">
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
                            onChange={(val) => {
                                handleDataChange('idType', val);
                                handleDataChange(
                                    'idNumber',
                                    normalizeKycIdNumber(data.idNumber, val)
                                );
                                onClearApiFieldError?.('idNumber');
                            }}
                            error={showErrors && !data.idType ? "Please select an ID type" : ""}
                        />
                    </div>

                    <OnboardingInput
                        name="idNumber"
                        autoComplete="off"
                        label={`${selectedIdLabel} Number`}
                        placeholder={
                            data.idType === "passport"
                                ? "A00123456"
                                : data.idType === "drivers_licence"
                                    ? "FKJ494A2133"
                                    : "11-digit NIN"
                        }
                        className="pb-0"
                        value={data.idNumber}
                        onChange={(e) => {
                            handleDataChange(
                                'idNumber',
                                normalizeKycIdNumber(e.target.value, data.idType)
                            );
                            onClearApiFieldError?.('idNumber');
                        }}
                        error={idNumberError || ""}
                    />

                    <UploadSection
                        label='Upload Government ID'
                        desc='Ensure all details are clearly visible'
                        value={data.idFile}
                        uploadedUrl={data.idFilePathOrKey}
                        uploading={isUploading("idFile")}
                        onUpload={(file) => {
                            void uploadKycDocument("idFile", "idFilePathOrKey", file);
                        }}
                        isError={showErrors && !hasOnboardingDocument(data.idFile, data.idFilePathOrKey)}
                    />

                    <OnboardingInput
                        name="bvn"
                        autoComplete="off"
                        label="Bank Verification Number"
                        placeholder="11-digit BVN"
                        className="pb-0"
                        value={data.bvn}
                        onChange={(e) => {
                            handleDataChange('bvn', toElevenDigits(e.target.value));
                            onClearApiFieldError?.('bvn');
                        }}
                        error={bvnError || ""}
                    />
                </div>
            </div>

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
                            name="address"
                            autoComplete="street-address"
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
                        uploadedUrl={data.addressFilePathOrKey}
                        uploading={isUploading("addressFile")}
                        onUpload={(file) => {
                            void uploadKycDocument("addressFile", "addressFilePathOrKey", file);
                        }}
                        isError={showErrors && !hasOnboardingDocument(data.addressFile, data.addressFilePathOrKey)}
                    />
                </div>
            </div>
        </div>
    );
}
