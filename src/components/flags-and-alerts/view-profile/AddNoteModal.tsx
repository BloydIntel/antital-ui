"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import Image from "next/image";

interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (noteData: { category: string; content: string }) => void;
    user: {
        name: string;
        id: string;
        avatarUrl?: string;
        initials?: string;
    };
}

const NOTE_CATEGORIES = [
    "Compliance / KYC",
    "General Inquiry",
    "Account Activity",
    "Support Escalation",
];

export function AddNoteModal({
    isOpen,
    onClose,
    onSubmit,
    user,
}: AddNoteModalProps) {
    const [category, setCategory] = useState(NOTE_CATEGORIES[0]);
    const [content, setContent] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ category, content });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-[520px] rounded-2xl bg-white shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#EAEAEA] px-6 py-5">
                    <h2 className="text-[16px] font-medium text-[#11110F]">Add Note</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1  text-[#11110F]hover:bg-[#F8F9FA] hover:text-[#858585] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* User info header */}
                    <div className="flex items-center gap-3">
                        {user.avatarUrl ? (
                            <Image
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover shrink-0"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-[#FFE3E0] text-[#D4001A] font-semibold flex items-center justify-center shrink-0">
                                {user.initials || user.name.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h4 className="text-[16px] font-normal text-[#11110F]">
                                {user.name}
                            </h4>
                            <span className="text-[14px] text-[#858585]">
                                ({user.id})
                            </span>
                        </div>
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] font-medium text-[#11110F]">
                            Note Category
                        </label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-[16px] text-[#323232] focus:border-[#11110F] focus:outline-none cursor-pointer"
                            >
                                {NOTE_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#858585]" />
                        </div>
                    </div>

                    {/* Note Content Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] font-medium text-[#11110F]">
                            Note Content
                        </label>
                        <textarea
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Spoke with the investor regarding..."
                            className="w-full resize-none rounded-md border border-[#E2E8F0] p-4 text-[16px] text-[#323232] placeholder-[#858585] focus:border-[#11110F] focus:outline-none"
                            required
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">

                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0 col-span-1"
                        />
                        <OnboardingButton
                            type="submit"
                            variant="plain"
                            label="Save notes"
                            className="my-0 col-span-1 bg-[#212121] text-[#FFFFFF] hover:text-black"
                        />

                    </div>
                </form>
            </div>
        </div>
    );
}