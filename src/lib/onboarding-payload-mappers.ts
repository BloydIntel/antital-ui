import type { QuestionValue } from "@/store/onboardingStore";
import type { KYCData } from "@/store/onboardingStore";
import type {
  SaveInvestmentProfilePayload,
  SaveKycPayload,
  SaveKycIdType,
} from "@/types/onboarding";

function toNumber(value: QuestionValue): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function toBooleanYesNo(value: QuestionValue): boolean | null {
  if (typeof value !== "string") return null;
  if (value === "Yes") return true;
  if (value === "No") return false;
  return null;
}

function toCsv(value: QuestionValue): string | null {
  if (Array.isArray(value) && value.length > 0) {
    return value.join(",");
  }
  return null;
}

function sourceOfWealth(
  value: QuestionValue
): { csv: string | null; other: string | null } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { csv: null, other: null };
  }
  const selections = Array.isArray(value.selections) ? value.selections : [];
  const csv = selections.length > 0 ? selections.join(",") : null;
  const other = typeof value.amount === "string" && value.amount.trim() !== "" ? value.amount : null;
  return { csv, other };
}

export function mapToInvestmentProfilePayload(
  selectedCategoryId: string,
  answers: Record<string, QuestionValue>
): SaveInvestmentProfilePayload {
  const base: SaveInvestmentProfilePayload = {
    investorCategory: "Retail",
    highRiskAllocationPast12MonthsPercent: null,
    highRiskAllocationNext12MonthsPercent: null,
    annualIncomeRange: null,
    netInvestmentAssetsValue: null,
    canAffordToLoseWithoutAffectingStability: null,
    understandsCrowdfundingIsHighRisk: null,
    readRiskDisclosureAndSecRules: null,
    understandsPastPerformanceNoGuarantee: null,
    awareOfLimitedLiquidity: null,
    yearsActivelyInvesting: null,
    investmentTypesCommaSeparated: null,
    investedInPrivateMarketsBefore: null,
    awareOfLimitedLiquiditySophisticated: null,
    confirmCrowdfundingAssessment: null,
    sourceOfWealthCommaSeparated: null,
    sourceOfWealthOther: null,
    confirmSecSophisticatedCriteria: null,
    netAssetsExceed100m: null,
    netInvestmentAssetsRange: null,
    adequateLiquidityForLosses: null,
    awareOfLimitedLiquidityHni: null,
    confirmSecHniCriteria: null,
  };

  if (selectedCategoryId === "retail") {
    base.investorCategory = "Retail";
    base.highRiskAllocationPast12MonthsPercent = toNumber(
      answers[
        "In the past 12 months, approximately what percentage of your net investment assets have you allocated to high-risk or speculative investments?"
      ]
    );
    base.highRiskAllocationNext12MonthsPercent = toNumber(
      answers[
        "Over the next 12 months, what percentage of your net investment assets do you intend to allocate to high-risk or speculative investments?"
      ]
    );
    const annualIncome = toNumber(answers["What is your annual income range?"]);
    base.annualIncomeRange = annualIncome !== null ? String(annualIncome) : null;
    base.netInvestmentAssetsValue = toNumber(
      answers[
        "What is the estimated total value of your net investment assets (excluding primary residence, car, and personal items)?"
      ]
    );
    base.canAffordToLoseWithoutAffectingStability = toBooleanYesNo(
      answers[
        "Can you afford to lose the amount you intend to invest without affecting your essential expenses or financial stability?"
      ]
    );
    base.understandsCrowdfundingIsHighRisk = toBooleanYesNo(
      answers[
        "Do you understand that crowdfunding investments are high-risk and may result in the loss of all invested funds?"
      ]
    );
    base.readRiskDisclosureAndSecRules = toBooleanYesNo(
      answers[
        "Have you read and understood the platform's risk disclosure and the Nigerian SEC crowdfunding rules that apply to retail investors?"
      ]
    );
    base.understandsPastPerformanceNoGuarantee = toBooleanYesNo(
      answers[
        "Do you understand that past performance does not guarantee future returns or profits?"
      ]
    );
    base.awareOfLimitedLiquidity = toBooleanYesNo(
      answers[
        "Are you aware that early-stage and private offerings may have limited liquidity and long exit horizons?"
      ]
    );
    return base;
  }

  if (selectedCategoryId === "sophisticated") {
    base.investorCategory = "Sophisticated";
    base.yearsActivelyInvesting = toNumber(
      answers[
        "How many years have you been actively investing in financial markets?"
      ]
    );
    base.investmentTypesCommaSeparated = toCsv(
      answers[
        "Which types of investments have you previously engaged in?"
      ]
    );
    base.investedInPrivateMarketsBefore = toBooleanYesNo(
      answers[
        "Have you previously invested in private markets or early-stage ventures?"
      ]
    );
    base.awareOfLimitedLiquiditySophisticated = toBooleanYesNo(
      answers[
        "Are you aware that early-stage and private offerings may have limited liquidity and long exit horizons?"
      ]
    );
    base.confirmCrowdfundingAssessment = toBooleanYesNo(
      answers[
        "Do you confirm that you have the knowledge, experience, and capacity to assess the merits and risks of crowdfunding investments without relying solely on basic disclosures?"
      ]
    );
    const wealth = sourceOfWealth(answers["Select below, your source of wealth"]);
    base.sourceOfWealthCommaSeparated = wealth.csv;
    base.sourceOfWealthOther = wealth.other;
    base.confirmSecSophisticatedCriteria = toBooleanYesNo(
      answers[
        "Do you confirm that you meet the SEC Nigeria criteria for a Sophisticated (Acclaimed) Investor?"
      ]
    );
    return base;
  }

  base.investorCategory = "HighNetWorth";
  base.netAssetsExceed100m = toBooleanYesNo(
    answers[
      "Does your net investment assets exceed ₦100 million (excluding your primary residence, vehicles, and personal household effects)?"
    ]
  );
  const rangeValue = answers[
    "Please indicate which asset range best reflects your net investment assets:"
  ];
  if (rangeValue === "₦100 Million - ₦250 Million") {
    base.netInvestmentAssetsRange = "Range100_250M";
  } else if (rangeValue === "₦250 Million - ₦500 Million") {
    base.netInvestmentAssetsRange = "Range250_500M";
  } else if (rangeValue === "Above ₦500 Million") {
    base.netInvestmentAssetsRange = "Above500M";
  }
  base.adequateLiquidityForLosses = toBooleanYesNo(
    answers[
      "Do you have adequate liquidity to absorb potential losses without affecting your financial stability or essential obligations?"
    ]
  );
  base.awareOfLimitedLiquidityHni = toBooleanYesNo(
    answers[
      "Are you aware that early-stage and private offerings may have limited liquidity and long exit horizons?"
    ]
  );
  const wealth = sourceOfWealth(answers["Select below, your source of wealth"]);
  base.sourceOfWealthCommaSeparated = wealth.csv;
  base.sourceOfWealthOther = wealth.other;
  base.confirmSecHniCriteria = toBooleanYesNo(
    answers[
      "Do you confirm that you meet the SEC Nigeria criteria for a classification as a High-Net-Worth Investor and consent to being treated as such for the purpose of investment eligibility and offering access on this platform?"
    ]
  );
  return base;
}

function mapKycIdType(idType: string): SaveKycIdType {
  if (idType === "passport") return "InternationalPassport";
  if (idType === "voters_card") return "VotersCard";
  return "NationalIdCard";
}

function toElevenDigitsOrNull(value: string): string | null {
  const cleaned = value.trim();
  return /^\d{11}$/.test(cleaned) ? cleaned : null;
}

export function mapToKycPayload(kycData: KYCData): SaveKycPayload {
  const incomeDocCodeMap: Record<string, string> = {
    "Salary slip (last 3 months)": "SS",
    "Tax Return Certificate": "TR",
    "Employment Letter Official": "EL",
    "Bank statement (Last 3 months)": "BS",
  };

  const encodedIncomeTypes = kycData.incomeDocuments
    .map((label) => incomeDocCodeMap[label] ?? label)
    .filter(Boolean);

  return {
    idType: mapKycIdType(kycData.idType),
    nin: toElevenDigitsOrNull(kycData.idNumber),
    bvn: toElevenDigitsOrNull(kycData.bvn),
    governmentIdDocumentPathOrKey: null,
    proofOfAddressDocumentPathOrKey: null,
    selfieVerificationPathOrKey: null,
    incomeVerificationPathOrKey: null,
    incomeVerificationDocumentTypesCommaSeparated:
      encodedIncomeTypes.length > 0
        ? encodedIncomeTypes.join(",")
        : null,
  };
}
