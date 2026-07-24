'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Globe, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import {
  useFundraiserSettingsProfile,
  useUpdateFundraiserSettingsProfile,
} from '@/hooks/use-fundraiser-settings';
import { showApiErrorToast } from '@/lib/error-feedback';
import type { FundraiserSettingsProfile } from '@/types/settings';

type CompanyFormState = {
  companyName: string;
  registrationNumber: string;
  bio: string;
  website: string;
  publicEmail: string;
  headquarters: string;
};

const EMPTY_FORM: CompanyFormState = {
  companyName: '',
  registrationNumber: '',
  bio: '',
  website: '',
  publicEmail: '',
  headquarters: '',
};

function mapProfileToForm(profile: FundraiserSettingsProfile): CompanyFormState {
  return {
    companyName: profile.companyName ?? '',
    registrationNumber: profile.registrationNumber ?? '',
    bio: profile.bio ?? '',
    website: profile.website ?? '',
    publicEmail: profile.publicEmail ?? '',
    headquarters: profile.headquarters ?? '',
  };
}

interface CompanyProfileProps {
  onBack: () => void;
}

export function CompanyProfile({ onBack }: CompanyProfileProps) {
  const { data: profile, isLoading, isError, error } = useFundraiserSettingsProfile();
  const updateProfile = useUpdateFundraiserSettingsProfile();
  const [form, setForm] = useState<CompanyFormState>(EMPTY_FORM);

  useEffect(() => {
    if (isError) {
      showApiErrorToast(error, 'Unable to load company profile.');
    }
  }, [isError, error]);

  useEffect(() => {
    if (profile) {
      setForm(mapProfileToForm(profile));
    }
  }, [profile]);

  const handleInputChange = (field: keyof CompanyFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiscard = () => {
    if (profile) {
      setForm(mapProfileToForm(profile));
    }
    onBack();
  };

  const handleSubmit = () => {
    if (!form.companyName.trim()) {
      toast.error('Company name is required.');
      return;
    }

    updateProfile.mutate(
      {
        companyName: form.companyName.trim(),
        registrationNumber: form.registrationNumber.trim() || null,
        bio: form.bio.trim() || null,
        website: form.website.trim() || null,
        publicEmail: form.publicEmail.trim() || null,
        headquarters: form.headquarters.trim() || null,
        contact: profile
          ? {
              fullName: profile.contact.fullName,
              emailAddress: profile.contact.emailAddress,
              phoneNumber: profile.contact.phoneNumber,
            }
          : null,
      },
      {
        onSuccess: () => {
          toast.success('Company profile updated');
        },
        onError: (saveError) => {
          showApiErrorToast(saveError, 'Unable to update company profile.');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="w-full font-sans">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Loading company profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full font-sans">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Unable to load company profile.
        </p>
      </div>
    );
  }

  const locationLabel = profile.locationLabel || 'Location not set';
  const avatarFallback = profile.companyAvatarFallback || 'FR';
  const completionPercentage = profile.completionPercentage ?? 0;

  return (
    <div className="w-full font-sans space-y-6">
      <div className="w-full bg-white border border-[#F4F5F7] rounded-xl overflow-hidden">
        <div className="w-full h-27 bg-[#0EA5E9] relative" />
        <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
          <Avatar className="mb-4 h-25 w-25 cursor-pointer mt-[-40px]">
            {profile.companyAvatarUrl ? (
              <AvatarImage src={profile.companyAvatarUrl} alt="Company shorthand" />
            ) : null}
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>

          <div className="mt-2 lg:-mt-2">
            <h2 className="text-[24px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
              {form.companyName || 'Organization Name'}
            </h2>
            <p className="text-[16px] text-[#858585]">
              Fundraising Organization – {locationLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#F4F5F7] rounded-xl px-4 pt-4">
            <h3 className="text-[16px] text-[#1B1B1B] mb-4" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
              General Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <OnboardingInput
                label="Company Name"
                type="text"
                value={form.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                inputAreaStyle="text-[16px] text-[#505050] focus:ring-1"
                labelStyle="text-[#505050]"
              />

              <OnboardingInput
                label="Registration Number"
                type="text"
                value={form.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                inputAreaStyle="text-[16px] text-[#505050] focus:ring-1"
                labelStyle="text-[#505050]"
              />
            </div>

            <OnboardingInput
              label="Company Bio"
              type="textarea"
              value={form.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              inputAreaStyle="text-[16px] text-[#505050] focus:ring-1"
              labelStyle="text-[#505050]"
              className="pb-0"
            />
          </div>

          <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4">
            <h3 className="text-[16px] text-[#1B1B1B] mb-4" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
              Online Presence
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 bg-[#F4F5F7] rounded-lg">
                <Globe className="w-5 h-5 text-[#1F1F1F] mt-6 shrink-0" />
                <div className="flex-1">
                  <OnboardingInput
                    label="Website"
                    type="text"
                    value={form.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    inputAreaStyle="text-[16px] text-[#505050] focus:ring-1 bg-white"
                    labelStyle="text-[#A8A8A8]"
                    className="pb-0"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-[#F4F5F7] rounded-lg">
                <Mail className="w-5 h-5 text-[#1F1F1F] mt-6 shrink-0" />
                <div className="flex-1">
                  <OnboardingInput
                    label="Public email"
                    type="email"
                    value={form.publicEmail}
                    onChange={(e) => handleInputChange('publicEmail', e.target.value)}
                    inputAreaStyle="text-[16px] text-[#505050] focus:ring-1 bg-white"
                    labelStyle="text-[#A8A8A8]"
                    className="pb-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4">
            <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
              Location
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#858585] shrink-0 mt-1" />
              <div className="flex-1">
                <OnboardingInput
                  label="Headquarters"
                  type="textarea"
                  value={form.headquarters}
                  onChange={(e) => handleInputChange('headquarters', e.target.value)}
                  inputAreaStyle="text-[14px] text-[#858585] focus:ring-1"
                  labelStyle="text-[#505050]"
                  className="pb-0"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#EDF1D6] border border-[#B9C65B] rounded-xl px-4 py-6 space-y-3">
            <h4 className="text-[16px] text-[#7D8A26]" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
              Profile Strength
            </h4>

            <p className="text-[14px] text-[#858585]">
              Complete your profile to increase trust with potential investors
            </p>
            <div className="space-y-2 pt-3">
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7D8A26] rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="block text-[12px] font-bold text-[#858585]">
                {completionPercentage}% Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-end items-center gap-3 pt-4">
        <OnboardingButton
          label="Discard Changes"
          variant="plain"
          className="lg:max-w-[271px] border-[#EAEAEA]"
          onClick={handleDiscard}
          disabled={updateProfile.isPending}
        />
        <OnboardingButton
          label="Save Profile"
          className="lg:max-w-[271px]"
          onClick={handleSubmit}
          loading={updateProfile.isPending}
        />
      </div>
    </div>
  );
}
