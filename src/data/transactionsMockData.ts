export type TransactionType = "Investment" | "Buy" | "Sell" | "Fee" | "Deposit" | "Withdrawal";
export type TransactionStatus = "Completed" | "Pending" | "Failed";

export interface TransactionItem {
    id: string;
    type: TransactionType;
    description: string;
    subDescription: string;
    amount: number;
    fees?: number;
    date: string;
    timeStamp: string;
    status: TransactionStatus;
}

export interface BillToType {
    name: string;
    email: string;
    phone: string;
}

export interface TransactionDetailsType {
    type: TransactionType;
    status: TransactionStatus;
}

export interface BreakdownType {
    description: string;
    company: string;
    sector: string;
    units: number;
    pricePerUnit: number;
    subtotal: number;
    feePercentage: number;
    fees: number;
    totalAmount: number;
}

export interface InvoiceData {
    invoiceId: string;
    invoiceDate: string;
    paymentDate: string;
    paymentMethod: string;
    billTo: BillToType;
    transactionDetails: TransactionDetailsType;
    breakdown: BreakdownType;
}

const sharedBillTo: BillToType = {
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+234 801 234 5678"
};

export const userData = {
    availableBalance: 5325400,
    recentActivity: [
        {
            id: "INV-001",
            type: "Investment",
            description: "Primary Market Investment",
            subDescription: "GreenTech Solutions 50 units @ ₦1,500/unit",
            amount: 75000,
            fees: 1875,
            date: "Aug 25, 2025",
            timeStamp: "11:30 AM",
            status: "Completed"
        },
        {
            id: "INV-002",
            type: "Buy",
            description: "Secondary market purchase",
            subDescription: "MedTech Innovations 100 units @ ₦850/unit",
            amount: 85000,
            fees: 1275,
            date: "Aug 15, 2025",
            timeStamp: "03:20 PM",
            status: "Completed"
        },
        {
            id: "INV-003",
            type: "Sell",
            description: "Secondary market sale",
            subDescription: "FoodTech Africa 150 units @ ₦300/unit",
            amount: 45000,
            fees: 675,
            date: "Aug 5, 2025",
            timeStamp: "05:45 PM",
            status: "Pending"
        },
        {
            id: "INV-004",
            type: "Fee",
            description: "Annual platform maintenance fee",
            subDescription: "Antital Platform",
            amount: 1200,
            date: "Jul 30, 2025",
            timeStamp: "12:00 PM",
            status: "Completed"
        },
        {
            id: "INV-005",
            type: "Buy",
            description: "Secondary market purchase",
            subDescription: "GreenTech Solutions 15 units @ ₦1,250/unit",
            amount: 18750,
            fees: 281,
            date: "Jul 9, 2025",
            timeStamp: "04:20 PM",
            status: "Completed"
        },
        {
            id: "INV-006",
            type: "Deposit",
            description: "Wallet funding via bank transfer",
            subDescription: "Antital Wallet",
            amount: 250000,
            date: "Jun 28, 2025",
            timeStamp: "02:30 PM",
            status: "Failed"
        },
        {
            id: "INV-007",
            type: "Investment",
            description: "Primary Market Investment",
            subDescription: "FoodTech Africa 200 units @ ₦300/unit",
            amount: 60000,
            fees: 1500,
            date: "Jun 10, 2025",
            timeStamp: "01:00 PM",
            status: "Completed"
        },
        {
            id: "INV-008",
            type: "Withdrawal",
            description: "Bank transfer withdrawal",
            subDescription: "Antital Wallet",
            amount: 50000,
            fees: 250,
            date: "May 25, 2025",
            timeStamp: "04:20 PM",
            status: "Completed"
        }
    ] as TransactionItem[]
};

export const invoiceData: InvoiceData[] = [
    {
        invoiceId: "INV-001",
        invoiceDate: "Aug 25, 2025",
        paymentDate: "Aug 25, 2025",
        paymentMethod: "Bank Transfer",
        billTo: sharedBillTo,
        transactionDetails: { type: "Investment", status: "Completed" },
        breakdown: {
            description: "Primary Market Investment",
            company: "GreenTech Solutions",
            sector: "Clean Energy",
            units: 50,
            pricePerUnit: 1500,
            subtotal: 75000,
            feePercentage: 2.5,
            fees: 1875,
            totalAmount: 76875
        }
    },
    {
        invoiceId: "INV-002",
        invoiceDate: "Aug 15, 2025",
        paymentDate: "Aug 15, 2025",
        paymentMethod: "Bank Transfer",
        billTo: sharedBillTo,
        transactionDetails: { type: "Buy", status: "Completed" },
        breakdown: {
            description: "Secondary market purchase",
            company: "MedTech Innovations",
            sector: "Healthcare",
            units: 100,
            pricePerUnit: 850,
            subtotal: 85000,
            feePercentage: 1.5,
            fees: 1275,
            totalAmount: 86275
        }
    },
    {
        invoiceId: "INV-003",
        invoiceDate: "Aug 5, 2025",
        paymentDate: "Aug 5, 2025",
        paymentMethod: "Bank Transfer",
        billTo: sharedBillTo,
        transactionDetails: { type: "Sell", status: "Completed" },
        breakdown: {
            description: "Secondary market sale",
            company: "FoodTech Africa",
            sector: "Agriculture",
            units: 150,
            pricePerUnit: 300,
            subtotal: 45000,
            feePercentage: 1.5,
            fees: 675,
            totalAmount: 45675
        }
    },
    {
        invoiceId: "INV-004",
        invoiceDate: "Jul 30, 2025",
        paymentDate: "Jul 30, 2025",
        paymentMethod: "Platform Wallet",
        billTo: sharedBillTo,
        transactionDetails: { type: "Fee", status: "Completed" },
        breakdown: {
            description: "Annual platform maintenance fee",
            company: "Antital Platform",
            sector: "Infrastructure",
            units: 1,
            pricePerUnit: 1200,
            subtotal: 1200,
            feePercentage: 0,
            fees: 0,
            totalAmount: 1200
        }
    },
    {
        invoiceId: "INV-005",
        invoiceDate: "Jul 9, 2025",
        paymentDate: "Jul 9, 2025",
        paymentMethod: "Bank Transfer",
        billTo: sharedBillTo,
        transactionDetails: { type: "Buy", status: "Completed" },
        breakdown: {
            description: "Secondary market purchase",
            company: "GreenTech Solutions",
            sector: "Clean Energy",
            units: 15,
            pricePerUnit: 1250,
            subtotal: 18750,
            feePercentage: 1.5,
            fees: 281,
            totalAmount: 19031
        }
    },
    {
        invoiceId: "INV-007",
        invoiceDate: "Jun 10, 2025",
        paymentDate: "Jun 10, 2025",
        paymentMethod: "Bank Transfer",
        billTo: sharedBillTo,
        transactionDetails: { type: "Investment", status: "Completed" },
        breakdown: {
            description: "Primary Market Investment",
            company: "FoodTech Africa",
            sector: "Agriculture",
            units: 200,
            pricePerUnit: 300,
            subtotal: 60000,
            feePercentage: 2.5,
            fees: 1500,
            totalAmount: 61500
        }
    }
];