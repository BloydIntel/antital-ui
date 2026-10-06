export type KycStatus = "pending" | "approved" | "rejected";

export interface KycUser {
    id: string;
    investorId: string;
    name: string;
    email: string;
    submittedDate: string;
    approvalDate?: string;
    status: KycStatus;
    tierLevel?: string;
    investorCategory?: "ordinary" | "sophisticated" | "hni";
}

export interface PersonalInformation {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    emailAddress: string;
    residentialAddress: string;
}

export interface BvnVerificationCheck {
    bvnMatch: boolean;
    nameMatch: boolean;
    dobMatch: boolean;
    livenessCheck: boolean;
    livenessScore: number;
}

export interface OcrFieldMatch {
    label: string;
    extractedValue: string;
    submittedValue: string;
    isMatched: boolean;
}

export interface ApprovalRecord {
    approvedBy: string;
    approvedDate: string;
    reviewReference: string;
    investmentLimit: string;
}

export interface AuditTrailItem {
    id: string;
    title: string;
    performedBy: string;
    timestamp: string;
}

export interface KycVerificationData {
    user: KycUser;
    personalInfo: PersonalInformation;
    bvnVerification: BvnVerificationCheck;
    ocrFields: OcrFieldMatch[];
    approvalRecord?: ApprovalRecord;
    capabilitiesUnlocked?: string[];
    auditTrail?: AuditTrailItem[];
}