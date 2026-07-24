'use client';

import React, { useEffect, useState } from 'react';
import { Globe, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import {
  useFundraiserSettingsProfile,
  useUpdateFundraiserSettingsProfile,
} from '@/hooks/use-fundraiser-settings';
import { showApiErrorToast } from '@/lib/error-feedback';
import type { FundraiserSettingsProfile } from '@/types/settings';

type ContactFormState = {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
};

const EMPTY_FORM: ContactFormState = {
  fullName: '',
  emailAddress: '',
  phoneNumber: '',
};

const CONTACT_FIELDS = [
  { key: 'fullName', label: 'Full Name', type: 'text' },
  { key: 'emailAddress', label: 'Email Address', type: 'email' },
  { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
] as const;

function mapProfileToForm(profile: FundraiserSettingsProfile): ContactFormState {
  return {
    fullName: profile.contact.fullName ?? '',
    emailAddress: profile.contact.emailAddress ?? '',
    phoneNumber: profile.contact.phoneNumber ?? '',
  };
}

interface ContactInformationProps {
  onBack: () => void;
}

export function ContactInformation({ onBack }: ContactInformationProps) {
  const { data: profile, isLoading, isError, error } = useFundraiserSettingsProfile();
  const updateProfile = useUpdateFundraiserSettingsProfile();
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);

  useEffect(() => {
    if (isError) {
      showApiErrorToast(error, 'Unable to load contact information.');
    }
  }, [isError, error]);

  useEffect(() => {
    if (profile) {
      setForm(mapProfileToForm(profile));
    }
  }, [profile]);

  const handleInputChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiscard = () => {
    if (profile) {
      setForm(mapProfileToForm(profile));
    }
    onBack();
  };

  const handleSubmit = () => {
    if (!profile) {
      return;
    }

    const companyName = profile.companyName?.trim();
    if (!companyName) {
      toast.error('Set a company name in Company Profile before saving contact details.');
      return;
    }

    updateProfile.mutate(
      {
        companyName,
        registrationNumber: profile.registrationNumber,
        bio: profile.bio,
        website: profile.website,
        publicEmail: profile.publicEmail,
        headquarters: profile.headquarters,
        contact: {
          fullName: form.fullName.trim() || null,
          emailAddress: form.emailAddress.trim() || null,
          phoneNumber: form.phoneNumber.trim() || null,
        },
      },
      {
        onSuccess: () => {
          toast.success('Contact information updated');
        },
        onError: (saveError) => {
          showApiErrorToast(saveError, 'Unable to update contact information.');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="w-full font-sans">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Loading contact information...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full font-sans">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Unable to load contact information.
        </p>
      </div>
    );
  }

  const supportChannels = [
    {
      id: 'whatsapp',
      label: 'WhatsApp Support',
      icon: MessageCircle,
      isConnected: profile.contact.isWhatsAppConnected,
    },
    {
      id: 'helpdesk',
      label: 'Public Help Desk',
      icon: Globe,
      isConnected: profile.contact.hasPublicHelpDesk,
    },
  ] as const;

  return (
    <div className="w-full font-sans space-y-6">
      <div>
        <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
          Contact Information
        </h2>
        <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
          Manage how we and your investors can reach you.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border border-[#F4F5F7] rounded-xl p-6 space-y-4">
          <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
            Primary Contact
          </h3>

          <div className="space-y-1">
            {CONTACT_FIELDS.map(({ key, label, type }) => (
              <OnboardingInput
                key={key}
                label={label}
                type={type}
                value={form[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                inputAreaStyle="text-[16px] text-[#505050] focus:ring-1"
                labelStyle="text-[#505050]"
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#F4F5F7] rounded-xl p-6 space-y-4">
          <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
            Support Channels
          </h3>

          <div className="space-y-3">
            {supportChannels.map(({ label, icon: Icon, isConnected }) => (
              <div
                key={label}
                className="flex items-center justify-between p-3.5 bg-[#F4F5F7] rounded-lg border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5 text-[#858585]" />
                  <span className="text-sm text-[#595959] font-medium">{label}</span>
                </div>
                <button
                  type="button"
                  className="text-[#B9C65B] text-[14px] font-medium cursor-pointer opacity-60"
                  onClick={() =>
                    toast.message('Coming soon', {
                      description: `${label} integration is not available yet.`,
                    })
                  }
                >
                  {isConnected ? 'Manage' : 'Connect'}
                </button>
              </div>
            ))}
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
          label="Save Contact"
          className="lg:max-w-[271px]"
          onClick={handleSubmit}
          loading={updateProfile.isPending}
        />
      </div>
    </div>
  );
}
