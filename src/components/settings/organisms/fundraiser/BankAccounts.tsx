'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from '@/constants/styles';
import {
    useAddFundraiserBankAccount,
    useDeleteFundraiserBankAccount,
    useFundraiserBankAccounts,
    useFundraiserPayoutSettings,
    useSetPrimaryFundraiserBankAccount,
    useUpdateFundraiserBankAccount,
    useUpdateFundraiserPayoutSettings,
    useVerifyFundraiserBankAccount,
} from '@/hooks/use-fundraiser-settings';
import type { FundraiserBankAccount } from '@/types/settings';
import { BankAccountCard } from '@/components/settings/organisms/fundraiser/bank-accounts/BankAccountCard';
import { PayoutSettingsCard } from '@/components/settings/organisms/fundraiser/bank-accounts/PayoutSettingsCard';
import { VerificationStatusCard } from '@/components/settings/organisms/fundraiser/bank-accounts/VerificationStatusCard';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type AccountForm = { bankName: string; accountHolder: string; accountNumber: string };
const EMPTY_ACCOUNT_FORM: AccountForm = { bankName: '', accountHolder: '', accountNumber: '' };

function errorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export function BankAccount() {
    const accountsQuery = useFundraiserBankAccounts();
    const payoutQuery = useFundraiserPayoutSettings();
    const addAccount = useAddFundraiserBankAccount();
    const updateAccount = useUpdateFundraiserBankAccount();
    const verifyAccount = useVerifyFundraiserBankAccount();
    const setPrimary = useSetPrimaryFundraiserBankAccount();
    const deleteAccount = useDeleteFundraiserBankAccount();
    const updatePayout = useUpdateFundraiserPayoutSettings();
    const accounts = useMemo(() => accountsQuery.data?.accounts ?? [], [accountsQuery.data?.accounts]);
    const verifiedAccounts = useMemo(() => accounts.filter((account) => account.isVerified), [accounts]);
    const [accountDialogOpen, setAccountDialogOpen] = useState(false);
    const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<FundraiserBankAccount | null>(null);
    const [accountForm, setAccountForm] = useState<AccountForm>(EMPTY_ACCOUNT_FORM);
    const [currency, setCurrency] = useState('NGN');
    const [payoutMethod, setPayoutMethod] = useState('Direct Deposit');
    const [primaryBankAccountId, setPrimaryBankAccountId] = useState<number | null>(null);

    useEffect(() => {
        if (payoutQuery.data) {
            setCurrency(payoutQuery.data.currency);
            setPayoutMethod(payoutQuery.data.payoutMethod);
            setPrimaryBankAccountId(payoutQuery.data.primaryBankAccountId);
        }
    }, [payoutQuery.data]);

    const openAddDialog = () => {
        setEditingAccount(null);
        setAccountForm(EMPTY_ACCOUNT_FORM);
        setAccountDialogOpen(true);
    };

    const openEditDialog = (id: number) => {
        const account = accounts.find((item) => item.id === id);
        if (!account) return;
        setEditingAccount(account);
        setAccountForm({ bankName: account.bankName, accountHolder: account.accountHolder, accountNumber: '' });
        setAccountDialogOpen(true);
    };

    const handleAccountSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (editingAccount) {
                await updateAccount.mutateAsync({ id: editingAccount.id, payload: { ...accountForm, accountNumber: accountForm.accountNumber || null } });
                toast.success('Bank account updated.');
            } else {
                await addAccount.mutateAsync(accountForm);
                toast.success('Bank account added and awaiting verification.');
            }
            setAccountDialogOpen(false);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    };

    const handleVerify = async (id: number) => {
        try { await verifyAccount.mutateAsync(id); toast.success('Bank account verified.'); }
        catch (error) { toast.error(errorMessage(error)); }
    };

    const handleSetPrimary = async (id: number) => {
        try { await setPrimary.mutateAsync(id); toast.success('Primary bank account updated.'); }
        catch (error) { toast.error(errorMessage(error)); }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Remove this bank account? This action cannot be undone.')) return;
        try { await deleteAccount.mutateAsync(id); toast.success('Bank account removed.'); }
        catch (error) { toast.error(errorMessage(error)); }
    };

    const handlePayoutSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updatePayout.mutateAsync({ currency, payoutMethod, primaryBankAccountId });
            toast.success('Payout settings saved.');
            setPayoutDialogOpen(false);
        } catch (error) { toast.error(errorMessage(error)); }
    };

    const isLoading = accountsQuery.isLoading || payoutQuery.isLoading;
    const isMutatingAccount = addAccount.isPending || updateAccount.isPending;

    return (
        <div className="w-full font-sans space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>Bank Accounts</h2>
                    <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>Manage your verified bank accounts for disbursements.</p>
                </div>
                <OnboardingButton label="Add Account" onClick={openAddDialog} icon={<Plus className="h-5 w-5" />} className="text-[16px] my-0 h-[42px] lg:w-fit flex-row-reverse font-normal rounded-md" />
            </div>

            {accountsQuery.isError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">Unable to load bank accounts: {errorMessage(accountsQuery.error)}</div>}
            {payoutQuery.isError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">Unable to load payout settings: {errorMessage(payoutQuery.error)}</div>}

            <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-4">
                    {isLoading && <div className="rounded-md border border-[#F4F5F7] bg-white p-8 text-center text-[#858585]">Loading bank accounts…</div>}
                    {!isLoading && accounts.length === 0 && <div className="rounded-md border border-[#F4F5F7] bg-white p-8 text-center text-[#858585]">No bank accounts added yet.</div>}
                    {accounts.map((account) => <BankAccountCard key={account.id} account={account} onEdit={openEditDialog} onVerify={handleVerify} onSetPrimary={handleSetPrimary} onDelete={handleDelete} />)}
                    <button type="button" onClick={openAddDialog} className="w-full lg:h-[180px] border-2 border-dashed border-[#888888] hover:border-[#B9C65B] rounded-md p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                        <Plus className="w-6 h-6 text-[#858585] group-hover:text-[#1B1B1B] mb-2 transition-colors" />
                        <span className="text-[14px] text-[#4D4D4D] group-hover:text-[#1B1B1B] transition-colors">Add another bank account (verification is required before payouts)</span>
                    </button>
                </div>
                <div className="lg:col-span-4 space-y-6">
                    <PayoutSettingsCard currency={payoutQuery.data?.currency === 'NGN' ? 'NGN (₦)' : payoutQuery.data?.currency} payoutMethod={payoutQuery.data?.payoutMethod} primaryBankAccountId={payoutQuery.data?.primaryBankAccountId} onEdit={() => setPayoutDialogOpen(true)} />
                    <VerificationStatusCard accounts={accounts} />
                </div>
            </div>

            <Dialog open={accountDialogOpen} onOpenChange={setAccountDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{editingAccount ? 'Edit bank account' : 'Add bank account'}</DialogTitle><DialogDescription>{editingAccount ? 'Changing the account number will require verification again.' : 'New accounts are pending until verification is completed.'}</DialogDescription></DialogHeader>
                    <form onSubmit={handleAccountSubmit} className="space-y-4">
                        <label className="block text-sm font-medium">Bank name<Input required value={accountForm.bankName} onChange={(event) => setAccountForm({ ...accountForm, bankName: event.target.value })} /></label>
                        <label className="block text-sm font-medium">Account holder<Input required value={accountForm.accountHolder} onChange={(event) => setAccountForm({ ...accountForm, accountHolder: event.target.value })} /></label>
                        <label className="block text-sm font-medium">{editingAccount ? 'New account number (optional)' : 'Account number'}<Input required={!editingAccount} inputMode="numeric" minLength={10} maxLength={10} value={accountForm.accountNumber} onChange={(event) => setAccountForm({ ...accountForm, accountNumber: event.target.value.replace(/\D/g, '') })} placeholder="10 digits" /></label>
                        <DialogFooter><OnboardingButton variant="plain" label="Cancel" onClick={() => setAccountDialogOpen(false)} className="mt-0" /><OnboardingButton type="submit" label={editingAccount ? 'Save changes' : 'Add account'} loading={isMutatingAccount} className="mt-0" /></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Edit payout settings</DialogTitle><DialogDescription>Only verified accounts can be selected for payouts.</DialogDescription></DialogHeader>
                    <form onSubmit={handlePayoutSubmit} className="space-y-4">
                        <label className="block text-sm font-medium">Currency<select className="mt-1 h-10 w-full rounded-md border px-3" value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="NGN">NGN (₦)</option><option value="USD">USD ($)</option></select></label>
                        <label className="block text-sm font-medium">Payout method<select className="mt-1 h-10 w-full rounded-md border px-3" value={payoutMethod} onChange={(event) => setPayoutMethod(event.target.value)}><option value="Direct Deposit">Direct Deposit</option><option value="Wire Transfer">Wire Transfer</option></select></label>
                        <label className="block text-sm font-medium">Primary account<select className="mt-1 h-10 w-full rounded-md border px-3" value={primaryBankAccountId ?? ''} onChange={(event) => setPrimaryBankAccountId(event.target.value ? Number(event.target.value) : null)}><option value="">No account selected</option>{verifiedAccounts.map((account) => <option key={account.id} value={account.id}>{account.bankName} · {account.accountNumberMasked}</option>)}</select></label>
                        <DialogFooter><OnboardingButton variant="plain" label="Cancel" onClick={() => setPayoutDialogOpen(false)} className="mt-0" /><OnboardingButton type="submit" label="Save settings" loading={updatePayout.isPending} className="mt-0" /></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
