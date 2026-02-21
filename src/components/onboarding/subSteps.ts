export const PERSONAL_SUB_STEPS = [
    { id: 'details', title: 'Personal Details' },
    { id: 'location', title: 'Location Information' }
] as const

export const COMPANY_SUB_STEPS = [
    { id: 'details', title: 'Company Details' },
    { id: 'address', title: 'Company Address' },
    { id: 'representative', title: 'Account representative details' }
] as const;

export interface KYCSubStep {
    readonly id: 'docs' | 'selfie' | 'income';
    readonly title: string;
    readonly description: string;
    readonly span?: string;
}

export const KYC_SUB_STEPS: readonly KYCSubStep[] = [
    {
        id: 'docs',
        title: 'Identity Verification',
        description: 'Upload your ID and proof of address to complete verification.'
    },
    {
        id: 'selfie',
        title: 'Selfie Verification',
        description: 'Take a live photo for identity confirmation.'
    },
    {
        id: 'income',
        title: 'Income Verification',
        span: '(Optional)',
        description: 'Increase your investment limits with income verification.'
    }
] as const;