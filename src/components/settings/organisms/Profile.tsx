'use client';

import React, { useState, useEffect } from 'react';
import { User, MapPin, Edit3 } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { useUserStore } from '@/store/userStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Profile() {
    const store = useUserStore();

    // Local form state
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        userId: 'h3u4viwj3bu4viwbwhb3hv4',
        emailAddress: 'johnndoe@gmail.com',
        streetAddress: '15 Victoria Island Avenue',
        city: 'Lagos',
        state: 'Lagos State',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Sync store data with fallback values safely after hydration
    useEffect(() => {
        setFormData({
            firstName: store.firstName || 'John',
            lastName: store.lastName || 'Doe',
            userId: store.userId || 'h3u4viwj3bu4viwbwhb3hv4',
            emailAddress: store.emailAddress || 'johnndoe@gmail.com',
            streetAddress: store.streetAddress || '15 Victoria Island Avenue',
            city: store.city || 'Lagos',
            state: store.state || 'Lagos State',
        });
    }, [store.firstName, store.lastName, store.userId, store.emailAddress, store.streetAddress, store.city, store.state]);

    const handleInputChange = (name: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        if (isEditing) {
            // Commit changes to the Zustand store when saving
            store.updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.emailAddress,
                streetAddress: formData.streetAddress,
                city: formData.city,
                state: formData.state,
            });
            console.log('Saved data to global store:', formData);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="w-full mx-auto rounded-xl">
            {/* Header Layout Control Block */}
            <div className="flex flex-row items-start justify-between pb-6 mb-6">
                <div className="flex flex-col gap-1">

                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#1A1A1A]" fill="#1A1A1A" stroke="#1A1A1A" />
                        <h2 className="text-[18px] lg:text-[20px] text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                            Personal Information
                        </h2>
                    </div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                        Update your personal details and profile
                    </p>

                </div>

                <button
                    onClick={toggleEditMode}
                    className={`flex items-center gap-2 px-4 py-2 lg:h-[48px] border rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${isEditing
                        ? "bg-[#0F3D2E] text-white border-[#0F3D2E]"
                        : "border-[#EAEAEA] text-[#1A1A1A] bg-white hover:bg-gray-50"
                        }`}
                    style={TYPOGRAPHY.heading}
                >
                    <Edit3 size={16} />
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
            </div>

            {/* Profile Avatar Frame Container */}
            <Avatar className="h-12 w-12 border border-[#EAEAEA] cursor-pointer">
                <AvatarImage src="/dashboard/User-Avatar.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            {/* Personal Info Input Data Grid Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {(
                    [
                        { id: 'firstName', label: 'First Name', placeholder: 'Enter first name' },
                        { id: 'lastName', label: 'Last Name', placeholder: 'Enter last name' },
                        { id: 'userId', label: 'User ID', placeholder: 'Enter user id', alwaysDisabled: true },
                        { id: 'emailAddress', label: 'Email Address', placeholder: 'Enter email address' },
                    ] as Array<{ id: keyof typeof formData; label: string; placeholder: string; alwaysDisabled?: boolean }>
                ).map(({ id, label, placeholder, alwaysDisabled }) => (
                    <OnboardingInput
                        key={id}
                        label={label}
                        placeholder={placeholder}
                        value={formData[id]}
                        disabled={alwaysDisabled || !isEditing}
                        onChange={(e) => handleInputChange(id, e.target.value)}
                        inputAreaStyle='bg-[#FFFFFF] text-[16px] text-[#858585]'
                    />
                ))}
            </div>

            {/* Address Group Sub-Header Section */}
            <div className="flex items-center gap-3 mt-8 mb-6 border-t border-[#F4F5F7]">
                <MapPin className="w-5 h-5 text-[#1A1A1A]" />
                <h3 className="text-[16px] lg:text-[20px] text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                    Address Information
                </h3>
            </div>

            {/* Full Width Line Input followed by Split Grid */}
            <div className="w-full mb-2">
                <OnboardingInput
                    label="Street Address"
                    placeholder="Enter street address"
                    value={formData.streetAddress}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    inputAreaStyle='bg-[#FFFFFF] text-[16px] text-[#858585]'

                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {(
                    [
                        { id: 'city', label: 'City', placeholder: 'Enter city' },
                        { id: 'state', label: 'State', placeholder: 'Enter state' },
                    ] as const
                ).map(({ id, label, placeholder }) => (
                    <OnboardingInput
                        key={id}
                        label={label}
                        placeholder={placeholder}
                        value={formData[id]}
                        disabled={!isEditing}
                        onChange={(e) => handleInputChange(id, e.target.value)}
                        inputAreaStyle='bg-[#FFFFFF] text-[16px] text-[#858585]'
                    />
                ))}
            </div>
        </div>
    );
}