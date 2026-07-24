'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, MapPin, Save, Pencil, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { useInvestorProfile, useUpdateInvestorProfile } from '@/hooks/use-settings';
import {
  mapFormDataToUpdateRequest,
  mapProfileToFormData,
  type ProfileFormData,
} from '@/lib/settings-mappers';
import { showApiErrorToast } from '@/lib/error-feedback';
import { SettingsProfileSkeleton } from '@/components/skeletons/settings-skeletons';

const EMPTY_FORM: ProfileFormData = {
  firstName: '',
  lastName: '',
  userId: '',
  emailAddress: '',
  phoneNumber: '',
  streetAddress: '',
  city: '',
  state: '',
  profilePictureUrl: '/dashboard/User-Avatar.png',
};

export function Profile() {
  const { data: profile, isLoading, isError, error } = useInvestorProfile();
  const updateProfile = useUpdateInvestorProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [formData, setFormData] = useState<ProfileFormData>(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isError) {
      showApiErrorToast(error, 'Unable to load profile.');
    }
  }, [isError, error]);

  useEffect(() => {
    if (profile && !isEditing) {
      setFormData(mapProfileToFormData(profile));
    }
  }, [profile, isEditing]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleInputChange = useCallback((name: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSaveChanges = () => {
    if (!profile) {
      return;
    }

    updateProfile.mutate(mapFormDataToUpdateRequest(formData, profile), {
      onSuccess: () => {
        toast.success('Profile updated');
        setIsEditing(false);
      },
      onError: (saveError) => {
        showApiErrorToast(saveError, 'Unable to update profile.');
      },
    });
  };

  const handleCancel = () => {
    if (profile) {
      setFormData(mapProfileToFormData(profile));
    }
    setIsEditing(false);
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size looks too large! Please choose an image up to 5MB.');
        return;
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const localUrl = URL.createObjectURL(file);
      objectUrlRef.current = localUrl;
      handleInputChange('profilePictureUrl', localUrl);
    }
  }, [handleInputChange]);

  const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.trim() || 'U';

  if (isLoading) {
    return (
      <SettingsProfileSkeleton />
    );
  }

  if (!profile) {
    return (
      <div className="w-full mx-auto rounded-xl">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Unable to load profile.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto rounded-xl">
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
            disabled={updateProfile.isPending}
            className={`mt-0 mb-0 border-none ${isEditing ? 'max-w-[167px]' : 'bg-white max-w-[139px]'}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-18 w-18 border border-[#EAEAEA]">
          <AvatarImage src={formData.profilePictureUrl} alt="User Profile" className="object-cover" />
          <AvatarFallback>{initials}</AvatarFallback>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        {(
          [
            { id: 'firstName', label: 'First Name', placeholder: 'Enter first name', autoComplete: 'given-name' },
            { id: 'lastName', label: 'Last Name', placeholder: 'Enter last name', autoComplete: 'family-name' },
            { id: 'userId', label: 'User ID', placeholder: 'Enter user id', alwaysDisabled: true, autoComplete: 'off' },
            { id: 'emailAddress', label: 'Email Address', placeholder: 'Enter email address', alwaysDisabled: true, autoComplete: 'email' },
            { id: 'phoneNumber', label: 'Phone Number', placeholder: 'Enter phone number', autoComplete: 'tel' },
          ] as Array<{ id: keyof ProfileFormData; label: string; placeholder: string; alwaysDisabled?: boolean; autoComplete: string }>
        ).map(({ id, label, placeholder, alwaysDisabled, autoComplete }) => (
          <OnboardingInput
            key={id}
            name={id}
            autoComplete={autoComplete}
            label={label}
            placeholder={placeholder}
            value={formData[id]}
            disabled={alwaysDisabled || !isEditing}
            onChange={(e) => handleInputChange(id, e.target.value)}
            inputAreaStyle='bg-[#FFFFFF] text-[16px] text-[#858585]'
          />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-8 mb-6 border-t border-[#F4F5F7]">
        <MapPin className="w-5 h-5 text-[#1A1A1A]" />
        <h3 className="text-[16px] lg:text-[20px] text-[#1A1A1A]" style={TYPOGRAPHY.body}>
          Address Information
        </h3>
      </div>

      <div className="w-full mb-2">
        <OnboardingInput
          name="streetAddress"
          autoComplete="street-address"
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
            { id: 'city', label: 'City', placeholder: 'Enter city', autoComplete: 'address-level2' },
            { id: 'state', label: 'State', placeholder: 'Enter state', autoComplete: 'address-level1' },
          ] as const
        ).map(({ id, label, placeholder, autoComplete }) => (
          <OnboardingInput
            key={id}
            name={id}
            autoComplete={autoComplete}
            label={label}
            placeholder={placeholder}
            value={formData[id]}
            disabled={!isEditing}
            onChange={(e) => handleInputChange(id, e.target.value)}
            inputAreaStyle='bg-[#FFFFFF] text-[16px] text-[#858585]'
          />
        ))}
      </div>

      {isEditing && (
        <div className="flex flex-row gap-2 justify-end">
          <OnboardingButton
            label='Save Changes'
            icon={<Save size={18} />}
            variant="solid"
            onClick={handleSaveChanges}
            disabled={updateProfile.isPending}
            className="max-w-[157px]"
          />
          <OnboardingButton
            label='Cancel'
            variant="plain"
            onClick={handleCancel}
            disabled={updateProfile.isPending}
            className="max-w-[115px]"
          />
        </div>
      )}
    </div>
  );
}