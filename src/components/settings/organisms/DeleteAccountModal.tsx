'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
    const [confirmationText, setConfirmationText] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Reset input state whenever modal toggles open or closed
    useEffect(() => {
        if (!isOpen) {
            setConfirmationText('');
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirmSubmit = async () => {
        if (confirmationText !== 'DELETE') return;

        setIsSubmitting(true);
        try {
            await onConfirm();
        } catch (error) {
            console.error("Failed to delete account:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 transition-fade">
            {/* Backdrop Click Dismiss */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content Box */}
            <div className="relative w-full max-w-[520px] bg-white rounded-xl shadow-xl overflow-hidden p-3 lg:p-6 z-10 animate-in fade-in zoom-in-95 duration-200">

                {/* Header Title */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-[#1A1A1A]" />
                        <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                            Delete Account
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Main Descriptive Message */}
                <p className="text-[14px] lg:text-[16px] text-[#858585] leading-relaxed mb-4" style={TYPOGRAPHY.body}>
                    This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </p>

                {/* Warning Content Card */}
                <div className="border border-[#D4001A] rounded-lg p-2 lg:p-4 flex items-center gap-3 mb-5">
                    <AlertTriangle className="w-5 h-5 text-[#D4001A] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[16px] lg:text-[18px] font-medium text-[#D4001A]" style={TYPOGRAPHY.body}>
                            Warning:
                        </h4>
                        <p className="text-[14px] lg:text-[16px] text-[#D4001A] font-medium leading-normal" style={TYPOGRAPHY.body}>
                            You will lose access to all your investments, transaction history, and account data.
                        </p>
                    </div>
                </div>

                {/* Input Check Fields */}
                <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-[16px] font-bold text-[#212121]" style={TYPOGRAPHY.body}>
                        Type DELETE to confirm
                    </label>
                    <input
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="w-full h-[48px] px-4 rounded-lg bg-[#F4F5F7] border border-transparent outline-none focus:border-gray-300 transition-colors text-[15px] text-[#1A1A1A]"
                        style={TYPOGRAPHY.body}
                    />
                </div>

                {/* Action Controls Section */}
                <div className="grid gap-3 grid-cols-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none w-full px-6 h-[44px] bg-white border border-[#E4E4E7] text-[14px] font-semibold text-[#1A1A1A] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        style={TYPOGRAPHY.body}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirmSubmit}
                        disabled={confirmationText !== 'DELETE' || isSubmitting}
                        className="flex-1 sm:flex-none w-full px-6 h-[44px] bg-[#D4001A] text-white text-[14px] font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:hover:bg-[#D30A1A]"
                        style={TYPOGRAPHY.body}
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete Account'}
                    </button>
                </div>

            </div>
        </div>
    );
}