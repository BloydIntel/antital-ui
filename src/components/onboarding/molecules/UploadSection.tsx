import { Info, Upload } from 'lucide-react'
import React from 'react'

interface UploadSectionProps {
    label: string,
    desc: string
}

export function UploadSection({ label, desc }: UploadSectionProps) {
    return (
        <div className="space-y-2">
            <p className="text-[16px] text-[#2C2C2C]" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}>
                {label} <span className="text-red-500">*</span>
            </p>
            <p className="text-[14px] text-gray-400" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, letterSpacing: "-1%" }}>
                {desc}
            </p>

            <div className="border-2 border-dashed border-[#E6EEDC] rounded-xl px-10 py-[72px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-3" />
                <p className="text-[14px] text-center text-gray-500 max-w-[446px]">
                    Click here to upload, or drag and drop files (JPG&apos;s and PNG&apos;s are supported)
                </p>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg border border-[#D1E4F9]">
                <Info className="w-5 h-5 text-[#3E82D5]" />
                <p className="text-[12px] text-[#3E82D5]">Ensure the document is clear and all information is visible</p>
            </div>
        </div>
    )
}
