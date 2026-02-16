export type InvestorIconType = "user" | "globe" | "naira";

export interface InvestorCategory {
    readonly id: string;
    readonly jsonKey: string;
    readonly title: string;
    readonly subTitle?: string;
    readonly description: string;
    readonly iconType: InvestorIconType;
}
