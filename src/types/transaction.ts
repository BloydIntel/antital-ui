export interface TimelineEvent {
    date: string;
    description: string;
    actor: string;
}

export interface TransactionDetailsData {
    id: string;
    type: string;
    flagged?: boolean;
    status: "Completed" | "Pending" | "Flagged" | "Hold";
    date: string;
    overview: {
        type: string;
        status: string;
        amount: string;
        campaign: string;
        paymentMethod: string;
        currency: string;
        referenceId: string;
        initiatedBy: string;
        processedBy: string;
        dateTime: string;
        channel: string;
        sourceIp: string;
    };
    information: {
        transactionId: string;
        investmentId: string;
        investor: string;
        investorType: string;
        campaign: string;
        investmentAmount: string;
        fee: string;
        netAmount: string;
    };
    payment: {
        paymentMethod: string;
        bankName: string;
        accountName: string;
        accountNumber: string;
        transactionReference: string;
        paymentStatus: string;
        paymentDate: string;
        settlementDate: string;
    };
    timeline: TimelineEvent[];
}