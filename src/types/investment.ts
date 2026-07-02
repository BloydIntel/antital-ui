export interface InvestmentListItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  coverImageUrl: string;
  risk: "low" | "moderate" | "high";
  investorCount: number;
  daysLeft: number | null;
  minInvestment: number;
  raisedAmount: number;
  fundingGoal: number;
  fundingProgressPercent: number;
}

export interface InvestmentListResponse {
  items: InvestmentListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface OfferingSummary {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  coverImageUrl: string;
  risk: string;
  daysLeft: number | null;
  status: string;
}

export interface OfferingFunding {
  raisedAmount: number;
  fundingGoal: number;
  investorCount: number;
  sharePrice: number;
  targetRating: number | null;
  minInvestment: number;
  maxInvestment: number;
  fundingProgressPercent: number;
}

export interface DealTerms {
  totalSharesOffered: number;
  pricePerShare: number;
  minimumInvestment: number;
  maximumInvestment: number;
  minimumThreshold: number;
  fundingGoal: number;
  deadline: string;
}

export interface CorporateProfile {
  entityType: string;
  jurisdiction: string;
  incorporationYear: number;
  registrationId: string;
  additionalNotes?: string | null;
}

export interface OfferingShell {
  offering: OfferingSummary;
  funding: OfferingFunding;
  dealTerms: DealTerms;
  corporateProfile: CorporateProfile | null;
}

export interface Highlight {
  id: number;
  kind: "stat" | "bullet";
  headline: string | null;
  body: string;
  sortOrder: number;
}

export interface ContentBlockItem {
  id: number;
  label: string;
  body: string;
  sortOrder: number;
}

export interface ContentBlock {
  id: number;
  blockType: string;
  key: string | null;
  title: string | null;
  summary: string | null;
  sortOrder: number;
  items: ContentBlockItem[];
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string | null;
  sortOrder: number;
}

export interface FinancialMetric {
  id: number;
  metricName: string;
  periodLabel: string;
  periodSortOrder: number;
  value: number | null;
  unit: string;
  currencyCode: string | null;
  valueType: string;
}

export interface UseOfProceedsItem {
  id: number;
  allocationPercent: number | null;
  category: string;
  description: string;
  sortOrder: number;
}

export interface OfferingFinancials {
  metrics: FinancialMetric[];
  useOfProceeds: UseOfProceedsItem[];
}

export interface OfferingRisk {
  id: number;
  category: string;
  description: string;
  mitigation: string;
  sortOrder: number;
}

export interface OfferingDocument {
  id: number;
  title: string;
  fileUrl: string;
  documentType: string;
  pageCount: number | null;
}

export interface MediaAsset {
  id: number;
  assetType: string;
  url: string;
  sortOrder: number;
}

export interface OfferingUpdate {
  id: number;
  publishedAt: string;
  title: string;
  body: string;
  likeCount: number;
}

export interface OfferingUpdatesResponse {
  items: OfferingUpdate[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  imageUrl: string | null;
  sortOrder: number;
}

export interface InvestmentDetailBundle {
  shell: OfferingShell;
  highlights: Highlight[];
  contentBlocks: ContentBlock[];
  team: TeamMember[];
  financials: OfferingFinancials;
  risks: OfferingRisk[];
  documents: OfferingDocument[];
  media: MediaAsset[];
  updates: OfferingUpdatesResponse;
  testimonials: Testimonial[];
}


export interface AddNewInvestmentFormPayload {
  founderAndTeamIntroduction?: File | null;
  fundraisingDeck?: File | null;
  investmentMemo?: File | null;
  termsOfOffering?: File | null;
  productDemo?: File | null;
  businessDescription?: string;
  businessSector?: string;
  instrumentType?: string;
  businessSize?: string;
  fundingTarget?: string;
  investmentRound?: string;
}