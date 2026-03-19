export const PERSONAL_SUB_STEPS = [
    { id: 'details', title: 'Personal Details' },
    { id: 'location', title: 'Location Information' }
] as const

export const COMPANY_SUB_STEPS = [
    { id: 'details', title: 'Company Details' },
    { id: 'address', title: 'Company Address' },
    { id: 'representative', title: 'Account representative details' }
] as const;

export const FUNDRAISER_COMPANY_SUB_STEPS = [
    { id: 'details', title: 'Company Details' },
    { id: 'address', title: 'Company Address' },
] as const;

export interface KYCSubStep {
    readonly id: 'docs' | 'selfie' | 'income' | 'oci' | 'qii' | 'representative';
    readonly title?: string;
    readonly description?: string;
    readonly sideBarTitle: string;
    readonly span?: string;
}

export const INDIVIDUAL_KYC_SUB_STEPS: readonly KYCSubStep[] = [
    { id: 'docs', title: 'Identity Verification', sideBarTitle: 'Upload your document', description: 'Upload your ID and proof of address to complete verification.' },
    { id: 'selfie', title: 'Selfie Verification', sideBarTitle: 'Selfie Upload', description: 'Take a live photo for identity confirmation.' },
    { id: 'income', title: 'Income Verification', sideBarTitle: 'Income Verification', span: '(Optional)', description: 'Increase your investment limits with income verification.' }
] as const;

export const CORPORATE_BASE_KYC: readonly KYCSubStep[] = [
    { id: 'docs', title: "Account Representative KYC", sideBarTitle: "Upload your document", description: "Upload your documents" },
    { id: 'selfie', title: "Account Representative KYC", sideBarTitle: "Selfie Upload", description: "Selfie Verification" },
];

export const CORPORATE_CATEGORY_STEPS: Record<string, KYCSubStep> = {
    qii: { id: 'qii', title: "QII KYC", sideBarTitle: "Qualified Institutional Investor", description: "Complete your institutional verification" },
    oci: { id: 'oci', title: "OCI KYC", sideBarTitle: "Other Corporate Investor", description: "Other Corporate Investor Details" },
};

export const FUNDRAISER_ACCOUNT_REP_KYC_SUB_STEPS: readonly KYCSubStep[] = [
    { id: 'representative', sideBarTitle: 'Personal Details', },
    { id: 'docs', title: 'Account Representative KYC', sideBarTitle: 'Upload your document', description: 'Upload your document' },
] as const;