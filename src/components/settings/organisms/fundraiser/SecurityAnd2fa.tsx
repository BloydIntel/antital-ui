'use client';

import React, { useEffect, useState } from 'react';
import { Lock, Smartphone, Key, AlertTriangle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from '@/constants/styles';
import { SecurityRowItem } from '@/components/settings/organisms/fundraiser/password2fa/SecurityRowItem';
import { ActiveSessionsPanel } from '@/components/settings/organisms/fundraiser/password2fa/ActiveSessionsPanel';
import { LoginHistoryPanel } from '@/components/settings/organisms/fundraiser/password2fa/LoginHistoryPanel';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useChangePassword } from '@/hooks/use-settings';
import { showApiErrorToast } from '@/lib/error-feedback';

interface SecurityAnd2faProps {
  targetSection?: 'password-2fa' | 'authorized-devices' | 'login-history' | string;
}

export function SecurityAnd2fa({ targetSection }: SecurityAnd2faProps) {
  const changePassword = useChangePassword();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    if (!targetSection || targetSection === 'password-2fa') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [targetSection]);

  const handlePasswordFieldChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const resetPasswordForm = () => {
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    changePassword.mutate(
      {
        currentPassword: passwords.current,
        newPassword: passwords.new,
        confirmPassword: passwords.confirm,
      },
      {
        onSuccess: () => {
          toast.success('Password updated');
          resetPasswordForm();
          setIsPasswordDialogOpen(false);
        },
        onError: (error) => {
          showApiErrorToast(error, 'Unable to update password.');
        },
      },
    );
  };

  const isPasswordMismatch = passwords.confirm.length > 0 && passwords.new !== passwords.confirm;
  const isSubmitDisabled =
    changePassword.isPending
    || isPasswordMismatch
    || !passwords.current
    || !passwords.new
    || !passwords.confirm;

  return (
    <div className="w-full font-sans space-y-6">
      <div className="relative overflow-hidden bg-[#021310] text-white rounded-md p-6 md:p-8.5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl z-10">
          <h2 className="text-[24px] md:text-[28px] text-[#F4F5F7]" style={TYPOGRAPHY.heading}>
            Security Center
          </h2>
          <p className="text-[14px] text-[#858585] mt-2 leading-relaxed" style={TYPOGRAPHY.body}>
            Keep your account secure by enabling two-factor authentication and monitoring your login activity. We recommend using a hardware key for maximum security.
          </p>
        </div>

        <div className="relative z-10 bg-white/8 border border-white/10 rounded-xl p-4 min-w-[160px] text-center shrink-0">
          <span className="block text-[14px] text-[#B9C65B] font-medium">Security Score</span>
          <div className="text-[24px] text-[#F4F5F7] my-0.5" style={TYPOGRAPHY.heading}>
            82<span className="text-[19px] text-[#A8A8A8]" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>/100</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[12px] text-[#DCA73B]">
            <AlertTriangle className="w-4 h-4" />
            <span>Action required</span>
          </div>
        </div>

        <div className="hidden absolute -right-18.5 -top-18 bottom-0 opacity-10 pointer-events-none lg:flex items-center pr-10">
          <Shield className="w-64 h-64 text-white" strokeWidth={1.3} />
        </div>
      </div>

      <div className="bg-white border border-[#F4F5F7] rounded-md p-6">
        <SecurityRowItem
          icon={Lock}
          title="Account Password"
          description="Last change 3 months ago. We recommend changing it every 6 months."
          buttonLabel="Change Password"
          onActionClick={() => setIsPasswordDialogOpen(true)}
        />

        <SecurityRowItem
          icon={Smartphone}
          title="Two-Factor Authentication"
          badge={{ label: 'DISABLED', variant: 'disabled' }}
          description="Add an extra layer of security to your account using an authenticator app."
          buttonLabel="Setup 2FA"
          onActionClick={() =>
            toast.message('Coming soon', {
              description: 'Two-factor authentication setup is not available yet.',
            })
          }
        />

        <SecurityRowItem
          icon={Key}
          title="Hardware Security Keys"
          badge={{ label: 'ENABLE', variant: 'enable' }}
          description="Use Physical Keys like Yubikey for the highest level of account protection."
          buttonLabel="Manage Keys"
          onActionClick={() =>
            toast.message('Coming soon', {
              description: 'Hardware security key management is not available yet.',
            })
          }
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div id="authorized-devices" className="scroll-mt-6">
          <ActiveSessionsPanel />
        </div>

        <div id="login-history" className="scroll-mt-6">
          <LoginHistoryPanel />
        </div>
      </div>

      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={(open) => {
          setIsPasswordDialogOpen(open);
          if (!open) {
            resetPasswordForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <OnboardingInput
              label="Current Password"
              placeholder="Enter current password"
              type="password"
              value={passwords.current}
              onChange={(e) => handlePasswordFieldChange('current', e.target.value)}
              inputAreaStyle="bg-[#FFFFFF] text-[16px] text-[#858585] pr-10"
            />
            <OnboardingInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={passwords.new}
              onChange={(e) => handlePasswordFieldChange('new', e.target.value)}
              inputAreaStyle="bg-[#FFFFFF] text-[16px] text-[#858585] pr-10"
            />
            <div>
              <OnboardingInput
                label="Confirm new password"
                placeholder="Confirm new password"
                type="password"
                value={passwords.confirm}
                onChange={(e) => handlePasswordFieldChange('confirm', e.target.value)}
                inputAreaStyle="bg-[#FFFFFF] text-[16px] text-[#858585] pr-10"
              />
              {isPasswordMismatch && (
                <p className="text-[12px] text-[#D4001A] mt-1">Passwords do not match.</p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <OnboardingButton
                type="button"
                label="Cancel"
                variant="plain"
                className="my-0 max-w-none"
                onClick={() => setIsPasswordDialogOpen(false)}
                disabled={changePassword.isPending}
              />
              <OnboardingButton
                type="submit"
                label="Update Password"
                className="my-0 max-w-none"
                loading={changePassword.isPending}
                disabled={isSubmitDisabled}
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
