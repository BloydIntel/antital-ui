export interface AdminInvestorItem { id: number; investorId: string; firstName: string; lastName: string; email: string; userType: string; walletBalance: number; joinedAt: string; accountStatus: string; kycStatus: string }
export interface AdminInvestorSummary { totalInvestors: number; pendingKyc: number; suspendedAccounts: number; totalWalletBalance: number }
export interface AdminInvestorsResponse { summary: AdminInvestorSummary; items: AdminInvestorItem[]; page: number; pageSize: number; totalCount: number; totalPages: number }
export interface AdminInvestorHolding { campaign: string; instrument: string; amount: number; currentValue: number; returns: number; status: string }
export interface AdminInvestorTransaction { id: number; type: string; amount: number; currency: string; status: string; occurredAt: string }
export interface AdminInvestorKycDocument { type: string; pathOrKey?: string; verifiedAt?: string; available: boolean }
export interface AdminInvestorVerificationCheck { name: string; passed: boolean; verifiedAt?: string }
export interface AdminInvestorKycReview { bvn?: string; nin?: string; documents: AdminInvestorKycDocument[]; checks: AdminInvestorVerificationCheck[] }
export interface AdminInvestorDetail extends AdminInvestorItem { phoneNumber: string; dateOfBirth: string; countryOfResidence: string; stateOfResidence: string; residentialAddress: string; kycReviewNote?: string; kycReviewedAt?: string; totalInvested: number; activePositions: number; estimatedReturns: number; holdings: AdminInvestorHolding[]; transactions: AdminInvestorTransaction[]; kycReview: AdminInvestorKycReview }
