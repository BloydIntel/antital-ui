export interface Article {
  id: string;
  title: string;
  readTime: string;
  bgColor: string;       // Outermost card container tailwind class
  innerBg: string;       // Hex code for top portion of diagonal split canvas
  splitDarkBg: string;   // Hex code for bottom portion of diagonal split canvas
  paperAccentBg: string; // Hex code for secondary background paper sheet accent
}

export interface CategoryDetail {
  title: string;
  description: string;
  articles: Article[];
  faqs: Array<{ question: string; answer: string }>;
}

export const HELP_DETAILS_MAP: Record<string, CategoryDetail> = {
  'account-setup': {
    title: 'Account setup',
    description: 'Creating your account and updating your details',
    articles: [
      { id: 'Article 001', title: 'The Future of Tech in West Africa', readTime: '9 minute read', bgColor: 'bg-[#D3E4F9]', innerBg: '#2B6CB0', splitDarkBg: '#092A4A', paperAccentBg: '#93C5FD' },
      { id: 'Article 002', title: 'How to Assess a Startup for Investment', readTime: '9 minute read', bgColor: 'bg-[#E1EDC5]', innerBg: '#7D8A26', splitDarkBg: '#02231E', paperAccentBg: '#A6D975' },
      { id: 'Article 003', title: 'Equity Crowdfunding 101', readTime: '10 minute read', bgColor: 'bg-[#D9D6FE]', innerBg: '#5B51D8', splitDarkBg: '#1A1249', paperAccentBg: '#B4B0FF' },
      { id: 'Article 004', title: 'Understanding Term Sheets', readTime: '12 minute read', bgColor: 'bg-[#FCEFD2]', innerBg: '#B7791F', splitDarkBg: '#3F2604', paperAccentBg: '#FCD34D' },
    ],
    faqs: [
      { question: 'What information do I need to create an account?', answer: 'Antital is a micro investment and crowdfunding platform that connects average Nigerians with early stage startups and small businesses seeking funding. You will need your basic contact info, phone number, and email address to begin initialization.' },
      { question: 'Can non-Nigerian residents sign up?', answer: 'Yes, international diaspora investors can register, provided they complete the international verification procedures and submit valid alternative documentation.' }
    ]
  },
  'kyc-verification': {
    title: 'KYC & Verification',
    description: 'Identity checks and compliance requirements',
    articles: [
      { id: 'Article 005', title: 'Understanding SEC Identity Guidelines', readTime: '6 minute read', bgColor: 'bg-[#D9D6FE]', innerBg: '#5B51D8', splitDarkBg: '#1A1249', paperAccentBg: '#B4B0FF' },
      { id: 'Article 006', title: 'Why Tiered Verification Matters', readTime: '8 minute read', bgColor: 'bg-[#D3E4F9]', innerBg: '#2B6CB0', splitDarkBg: '#092A4A', paperAccentBg: '#93C5FD' },
      { id: 'Article 007', title: 'BVN and NIN Verification Safety protocols', readTime: '5 minute read', bgColor: 'bg-[#E1EDC5]', innerBg: '#7D8A26', splitDarkBg: '#02231E', paperAccentBg: '#A6D975' },
      { id: 'Article 008', title: 'What to do if your verification fails', readTime: '7 minute read', bgColor: 'bg-[#FCEFD2]', innerBg: '#B7791F', splitDarkBg: '#3F2604', paperAccentBg: '#FCD34D' },
    ],
    faqs: [
      { question: 'Why is my BVN or NIN required for validation?', answer: 'In compliance with CBN regulations and SEC frameworks, BVN or NIN verification confirms your identity securely without exposing financial details or compromise vulnerabilities.' },
      { question: 'How long does KYC document approval take?', answer: 'Automated verification is near instantaneous, but manual reviews for complex business entities or high-net-worth status usually complete within 24 hours.' }
    ]
  },
  'investments': {
    title: 'Investments',
    description: 'How to invest, manage watchlist, and track performance',
    articles: [
      { id: 'Article 009', title: 'Evaluating Startup Founders & Teams', readTime: '11 minute read', bgColor: 'bg-[#FCEFD2]', innerBg: '#B7791F', splitDarkBg: '#3F2604', paperAccentBg: '#FCD34D' },
      { id: 'Article 010', title: 'Diversifying Your Crowd Portfolio', readTime: '8 minute read', bgColor: 'bg-[#E1EDC5]', innerBg: '#7D8A26', splitDarkBg: '#02231E', paperAccentBg: '#A6D975' },
      { id: 'Article 011', title: 'Understanding Equity Dilution Over Time', readTime: '14 minute read', bgColor: 'bg-[#D3E4F9]', innerBg: '#2B6CB0', splitDarkBg: '#092A4A', paperAccentBg: '#93C5FD' },
      { id: 'Article 012', title: 'Vetting Models for High Yield Deals', readTime: '10 minute read', bgColor: 'bg-[#D9D6FE]', innerBg: '#5B51D8', splitDarkBg: '#1A1249', paperAccentBg: '#B4B0FF' },
    ],
    faqs: [
      { question: 'What is the minimum investment amount per project?', answer: 'The minimum threshold starts at ₦50,000 for standard retail tiers, making entry accessible for everyday retail participants across Nigeria.' },
      { question: 'When do I start earning returns on equity allocations?', answer: 'Returns materialize via distribution dividends when a business records profitability, secondary market operations, or standard corporate exit events.' }
    ]
  },
  'payment-wallet': {
    title: 'Payment & Wallet',
    description: 'Managing allocations, funding nodes, and withdrawal rules',
    articles: [
      { id: 'Article 013', title: 'Funding Your Escrow Wallet safely', readTime: '5 minute read', bgColor: 'bg-[#D3E4F9]', innerBg: '#2B6CB0', splitDarkBg: '#092A4A', paperAccentBg: '#93C5FD' },
      { id: 'Article 014', title: 'Processing Timelines for Local Settlements', readTime: '7 minute read', bgColor: 'bg-[#D9D6FE]', innerBg: '#5B51D8', splitDarkBg: '#1A1249', paperAccentBg: '#B4B0FF' },
      { id: 'Article 015', title: 'Understanding Escrow Account Insurances', readTime: '9 minute read', bgColor: 'bg-[#E1EDC5]', innerBg: '#7D8A26', splitDarkBg: '#02231E', paperAccentBg: '#A6D975' },
      { id: 'Article 016', title: 'Configuring Direct Automated Bank Debits', readTime: '6 minute read', bgColor: 'bg-[#FCEFD2]', innerBg: '#B7791F', splitDarkBg: '#3F2604', paperAccentBg: '#FCD34D' },
    ],
    faqs: [
      { question: 'Are there hidden costs when making payments?', answer: 'No. Antital charges a transparent 5% platform fee on successful actions. Exact charges are explicitly previewed prior to commitments.' },
      { question: 'How long do withdrawal transfers take to clear?', answer: 'Standard payments clear within 1-2 business days, while optional instant settlement pipelines process updates within minutes.' }
    ]
  },
  'troubleshooting': {
    title: 'Troubleshooting',
    description: 'Resolving errors, login issues, and notifications',
    articles: [
      { id: 'Article 017', title: 'Fixing 2FA Code Match Latencies', readTime: '4 minute read', bgColor: 'bg-[#FFDFDF]', innerBg: '#C53030', splitDarkBg: '#4A1D1D', paperAccentBg: '#FEB2B2' },
      { id: 'Article 018', title: 'Resetting Expired Session Access Nodes', readTime: '5 minute read', bgColor: 'bg-[#D3E4F9]', innerBg: '#2B6CB0', splitDarkBg: '#092A4A', paperAccentBg: '#93C5FD' },
      { id: 'Article 019', title: 'Clearing Ledger Update Stalls on Web', readTime: '6 minute read', bgColor: 'bg-[#FCEFD2]', innerBg: '#B7791F', splitDarkBg: '#3F2604', paperAccentBg: '#FCD34D' },
      { id: 'Article 020', title: 'Recovering Locked Account Context Profiles', readTime: '8 minute read', bgColor: 'bg-[#D9D6FE]', innerBg: '#5B51D8', splitDarkBg: '#1A1249', paperAccentBg: '#B4B0FF' },
    ],
    faqs: [
      { question: 'Why am I not receiving confirmation emails?', answer: 'Check your spam filter configuration or security policies. Alternatively, trigger a refresh token validation link directly from your account page context.' },
      { question: 'What should I do if my payment states processing?', answer: 'If system states linger longer than 30 minutes, capture the provider transaction reference hash code and ping our live engineering support desk.' }
    ]
  },
  'secondary-market': {
    title: 'Secondary market',
    description: 'Trading shares with other investors',
    articles: [
      { id: 'Article 021', title: 'Liquidity Rules for Active Trades', readTime: '10 minute read', bgColor: 'bg-[#D9D6FE]', innerBg: '#5B51D8', splitDarkBg: '#1A1249', paperAccentBg: '#B4B0FF' },
      { id: 'Article 022', title: 'Pricing Shares Based on Asset Book Values', readTime: '12 minute read', bgColor: 'bg-[#FCEFD2]', innerBg: '#B7791F', splitDarkBg: '#3F2604', paperAccentBg: '#FCD34D' },
      { id: 'Article 023', title: 'Matching Spread Orders on Orderbooks', readTime: '9 minute read', bgColor: 'bg-[#D3E4F9]', innerBg: '#2B6CB0', splitDarkBg: '#092A4A', paperAccentBg: '#93C5FD' },
      { id: 'Article 024', title: 'Tax Implications on Early Capital Gains', readTime: '11 minute read', bgColor: 'bg-[#E1EDC5]', innerBg: '#7D8A26', splitDarkBg: '#02231E', paperAccentBg: '#A6D975' },
    ],
    faqs: [
      { question: 'Can I sell my project allocation at any point?', answer: 'Yes. While direct lockups protect campaigns early on, our integrated peer-to-peer secondary desk allows you to post active bids or swap allocations with verified members.' },
      { question: 'How is secondary share transaction pricing regulated?', answer: 'Pricing operates on automated order matching algorithms, restricted by upper and lower valuation bounds verified through our quarterly audit reports.' }
    ]
  }
};