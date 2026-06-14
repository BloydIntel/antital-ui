'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, MapPin, Save, Pencil, Camera } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { useUserStore } from '@/store/userStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

export function Profile() {
    const store = useUserStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const objectUrlRef = useRef<string | null>(null);

    // Local form state
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        userId: 'h3u4viwj3bu4viwbwhb3hv4',
        emailAddress: 'johnndoe@gmail.com',
        streetAddress: '15 Victoria Island Avenue',
        city: 'Lagos',
        state: 'Lagos State',
        profilePictureUrl: '/dashboard/User-Avatar.png'
    });

    const [isEditing, setIsEditing] = useState(false);

    // Cleanup object URL on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

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
            profilePictureUrl: store.profilePictureUrl || '/dashboard/User-Avatar.png'
        });
    }, [store.firstName, store.lastName, store.userId, store.emailAddress, store.streetAddress, store.city, store.state, store.profilePictureUrl]);

    const handleInputChange = useCallback((name: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSaveChanges = () => {
        store.updateProfile({
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.emailAddress,
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            profilePictureUrl: formData.profilePictureUrl
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            firstName: store.firstName || 'John',
            lastName: store.lastName || 'Doe',
            userId: store.userId || 'h3u4viwj3bu4viwbwhb3hv4',
            emailAddress: store.emailAddress || 'johnndoe@gmail.com',
            streetAddress: store.streetAddress || '15 Victoria Island Avenue',
            city: store.city || 'Lagos',
            state: store.state || 'Lagos State',
            profilePictureUrl: store.profilePictureUrl || '/dashboard/User-Avatar.png'
        });
        setIsEditing(false);
    };

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size looks too large! Please choose an image up to 5MB.");
                return;
            }
            // Revoke previous object URL to prevent memory leaks
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
            // Generate a local preview URL
            const localUrl = URL.createObjectURL(file);
            objectUrlRef.current = localUrl;
            handleInputChange('profilePictureUrl', localUrl);
        }
    }, [handleInputChange]);

    return (
        <div className="w-full mx-auto rounded-xl">
            {/* Header Layout Control Block */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between mb-8">
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

                <div className='flex justify-end'>
                    <OnboardingButton
                        label={isEditing ? 'Save Changes' : 'Edit Profile'}
                        icon={isEditing ? <Save size={18} /> : <Pencil size={18} />}
                        variant={isEditing ? 'solid' : 'plain'}
                        onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
                        className={`mt-0 mb-0 border-none ${isEditing ? 'max-w-[167px]' : 'bg-white max-w-[139px]'}`}
                    />
                </div>
            </div>

            {/* Profile Avatar Frame Container */}
            <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-18 w-18 border border-[#EAEAEA]">
                    <AvatarImage src={formData.profilePictureUrl} alt="User Profile" className="object-cover" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                {isEditing && (
                    <div className="flex flex-col gap-2 items-start">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 border border-[#EAEAEA] rounded-lg bg-white text-[#1A1A1A] text-[14px] font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                            style={TYPOGRAPHY.heading}
                        >
                            <Camera size={16} className="text-[#1A1A1A]" />
                            <span>Change Photo</span>
                        </button>
                        <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                            JPG, PNG up to 5MB
                        </span>
                    </div>
                )}
            </div>

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
            {isEditing && <div className="flex flex-row gap-2 justify-end">
                <OnboardingButton
                    label='Save Changes'
                    icon={<Save size={18} />}
                    variant="solid"
                    onClick={handleSaveChanges}
                    className="max-w-[157px]"
                />
                <OnboardingButton
                    label='Cancel'
                    variant="plain"
                    onClick={handleCancel}
                    className="max-w-[115px]"
                />
            </div>}
        </div>
    );
}