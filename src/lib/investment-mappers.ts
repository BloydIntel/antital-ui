import type { InvestmentCardData } from "@/components/investment/organisms/investment-card";
import type {
  ContentBlock,
  FinancialMetric,
  Highlight,
  InvestmentListItem,
} from "@/types/investment";

export function toInvestmentCardData(item: InvestmentListItem): InvestmentCardData {
  return {
    id: item.slug,
    name: item.name,
    category: item.category,
    description: item.tagline,
    image: item.coverImageUrl,
    risk: item.risk,
    investors: item.investorCount,
    daysLeft: item.daysLeft ?? 0,
    minInvestment: item.minInvestment,
    raised: item.raisedAmount,
    goal: item.fundingGoal,
    percentage: item.fundingProgressPercent,
  };
}

export function findContentBlock(
  blocks: ContentBlock[],
  predicate: (block: ContentBlock) => boolean
): ContentBlock | undefined {
  return blocks.find(predicate);
}

export function findContentBlockByKey(
  blocks: ContentBlock[],
  key: string
): ContentBlock | undefined {
  return blocks.find((b) => b.key === key);
}

export function findContentBlockByType(
  blocks: ContentBlock[],
  blockType: string
): ContentBlock | undefined {
  return blocks.find((b) => b.blockType === blockType);
}

export function mapBlockItems(block?: ContentBlock) {
  return (block?.items ?? [])
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({ label: item.label, description: item.body }));
}

export function getMediaThumbnails(
  media: { assetType: string; url: string; sortOrder: number }[]
): string[] {
  return media
    .filter((m) => m.assetType.toLowerCase() === "thumbnail")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((m) => m.url);
}

export function getVideoUrl(
  media: { assetType: string; url: string }[]
): string | undefined {
  return media.find((m) => m.assetType.toLowerCase() === "video")?.url;
}

export function splitHighlights(highlights: Highlight[]) {
  const sorted = [...highlights].sort((a, b) => a.sortOrder - b.sortOrder);
  const stats = sorted
    .filter((h) => h.kind === "stat")
    .map((h) => ({ amount: h.headline ?? "", description: h.body }));
  const bullets = sorted
    .filter((h) => h.kind === "bullet")
    .map((h, index) => ({ number: index + 1, text: h.body }));
  return { stats, bullets };
}

export function formatFinancialMetricValue(metric: FinancialMetric): string {
  if (metric.value == null) {
    return "N/A";
  }

  switch (metric.unit) {
    case "currency":
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: metric.currencyCode ?? "NGN",
        maximumFractionDigits: 0,
      }).format(metric.value);
    case "percent":
      return `${metric.value}%`;
    default:
      return String(metric.value);
  }
}

export function buildFinancialTable(metrics: FinancialMetric[]) {
  const periods = [...new Map(
    metrics.map((m) => [m.periodLabel, m.periodSortOrder] as const)
  ).entries()]
    .sort(([, a], [, b]) => a - b)
    .map(([label]) => label);

  const metricNames = [...new Set(metrics.map((m) => m.metricName))];

  const rows = metricNames.map((metricName) => {
    const values = periods.map((periodLabel) => {
      const metric = metrics.find(
        (m) => m.metricName === metricName && m.periodLabel === periodLabel
      );
      return metric ? formatFinancialMetricValue(metric) : "N/A";
    });
    return { metric: metricName, values };
  });

  return { periods, rows };
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-NG").format(amount);
}
