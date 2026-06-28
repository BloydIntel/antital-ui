export interface Article {
  id: string;
  title: string;
  readTime: string;
  bgColor: string;       // Outermost card container tailwind class
  innerBg: string;       // Hex code for top portion of diagonal split canvas
  splitDarkBg: string;   // Hex code for bottom portion of diagonal split canvas
  paperAccentBg: string; // Hex code for secondary background paper sheet accent
  content: string[];     // Paragraphs and markdown headings mirroring image_e7b71d.png
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
      {
        id: 'Article 001',
        title: 'The Future of Tech in West Africa',
        readTime: '9 minute read',
        bgColor: 'bg-[#D3E4F9]',
        innerBg: '#2B6CB0',
        splitDarkBg: '#092A4A',
        paperAccentBg: '#93C5FD',
        content: [
          "Understanding the digital transformation landscape across West Africa is essential for making informed early-stage ecosystem investments. Follow this primer to contextualize market tailwinds:",
          "## Step 1: Analyze Mobile Penetration Patterns\nLook beyond basic population sizes and isolate regions with high high-speed smartphone data usage alongside exploding mobile-money transaction volumes.",
          "## Step 2: Track Regional Regulatory Sandboxes\nIdentify jurisdictions like Nigeria and Ghana where proactive central bank licensing frames protect and validate fintech and equity distribution architectures.",
          "## Step 3: Evaluate Developer Talent Density\nReview local hubs and developer syndicates. Highly localized talent minimizes operational reliance on expensive international engineering nodes.",
          "## Step 4: Monitor Cross-Border Expansion Tracks\nPrioritize startups designed to clear operational inefficiencies across multiple regional trade hubs rather than remaining stagnant in a single localized city center."
        ]
      },
      {
        id: 'Article 002',
        title: 'How to Assess a Startup for Investment',
        readTime: '9 minute read',
        bgColor: 'bg-[#E1EDC5]',
        innerBg: '#7D8A26',
        splitDarkBg: '#02231E',
        paperAccentBg: '#A6D975',
        content: [
          "Evaluating fractional startup shares requires a disciplined methodology to weigh upside risks against execution capacities. Here is our recommended deal review playbook:",
          "## Step 1: Verify the True Product Market Fit\nEnsure the campaign documents real-world transaction patterns rather than just speculative waitlists or vanity social engagement counts.",
          "## Step 2: Conduct Founder Background Audits\nAssess operational history, previous corporate execution successes, or relevant industrial engineering competencies within the target market sector.",
          "## Step 3: Scrutinize the Unit Economics Matrix\nConfirm that the margin structure scales cleanly over time and does not burn disproportionate capital purely on unsustainably subsidized customer acquisitions.",
          "## Step 4: Review the Proposed Capital Utilization Roadmap\nConfirm that crowdsourced allocations fund explicit milestones like operational scaling or regulatory compliance parameters rather than generic debt maintenance."
        ]
      },
      {
        id: 'Article 003',
        title: 'Equity Crowdfunding 101',
        readTime: '10 minute read',
        bgColor: 'bg-[#D9D6FE]',
        innerBg: '#5B51D8',
        splitDarkBg: '#1A1249',
        paperAccentBg: '#B4B0FF',
        content: [
          "Creating your Antital account is quick and straightforward. Follow these steps to get started:",
          "## Step 1: Visit the Registration Page\nNavigate to the Antital homepage and click on \"Get Started\" or \"Sign Up\".",
          "## Step 2: Provide Basic Information\nEnter your email address, create a strong password, and provide your full name as it appears on your official documents.",
          "## Step 3: Verify Your Email\nCheck your email inbox for a verification link from Antital. Click the link to verify your email address.",
          "## Step 4: Complete Your Profile\nFill in additional information including your phone number, address, and employment details.",
          "## Step 5: Agree to Terms\nReview and accept our Terms of Service and Privacy Policy to complete your registration. Your account will be created instantly, but you'll need to complete KYC verification before you can start investing."
        ]
      },
      {
        id: 'Article 004',
        title: 'Understanding Term Sheets',
        readTime: '12 minute read',
        bgColor: 'bg-[#FCEFD2]',
        innerBg: '#B7791F',
        splitDarkBg: '#3F2604',
        paperAccentBg: '#FCD34D',
        content: [
          "Before confirming financial commitments to any campaign pool, mastering basic legal clauses in a standard startup investment offer sheet is key:",
          "## Step 1: Break Down Basic Pre-Money Valuations\nIdentify how the enterprise values its current capital position before campaign funding pools alter the complete outstanding capitalization tables.",
          "## Step 2: Review Liquidation Preference Allocations\nDetermine the specific payout sequences that occur if a business undergoes a corporate dissolution, exit asset transfer, or structural buyback window.",
          "## Step 3: Isolate Anti-Dilution Shield Protocols\nVerify what mechanisms exist to preserve retail investor equity percentages if secondary funding campaigns execute lower relative share values later.",
          "## Step 4: Identify Investor Information Rights\nConfirm specific timelines for quarterly operational declarations, fiscal updates, or auditable spreadsheet reporting frameworks."
        ]
      },
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
      {
        id: 'Article 005',
        title: 'Understanding SEC Identity Guidelines',
        readTime: '6 minute read',
        bgColor: 'bg-[#D9D6FE]',
        innerBg: '#5B51D8',
        splitDarkBg: '#1A1249',
        paperAccentBg: '#B4B0FF',
        content: [
          "To secure investment parameters and prevent institutional fraud vectors, regulatory commissions mandate absolute identity disclosures. Here is how compliance matches your user tier:",
          "## Step 1: Match Legal Full Names Eradicate Discrepancies\nEnsure your dashboard identity profile corresponds exactly to database records attached to verified national registries.",
          "## Step 2: Validate Anti-Money Laundering Frameworks\nOur engines run background scans against international compliance matrices to cross-examine PEP classifications or high-value velocity restrictions.",
          "## Step 3: Monitor Authorized Transaction Caps\nYour document verification directly affects maximum funding volumes permissible for individual micro-funding allocations."
        ]
      },
      {
        id: 'Article 006',
        title: 'Why Tiered Verification Matters',
        readTime: '8 minute read',
        bgColor: 'bg-[#D3E4F9]',
        innerBg: '#2B6CB0',
        splitDarkBg: '#092A4A',
        paperAccentBg: '#93C5FD',
        content: [
          "Antital configures tiered operational levels to support retail participation while managing platform security protocols effectively:",
          "## Step 1: Base Tier Core Sign-Up Checkpoints\nBasic name and contact parameters initialize simple access, allowing users to browse live fund structures without actively routing investments.",
          "## Step 2: Standard Investment Tier Setup\nLinking verified national database indicators opens up localized retail asset investment pools up to strict legislative thresholds.",
          "## Step 3: High-Net-Worth Accredited Access\nSubmitting explicit financial statements opens up institutional investment access parameters without standard cap restrictions."
        ]
      },
      {
        id: 'Article 007',
        title: 'BVN and NIN Verification Safety protocols',
        readTime: '5 minute read',
        bgColor: 'bg-[#E1EDC5]',
        innerBg: '#7D8A26',
        splitDarkBg: '#02231E',
        paperAccentBg: '#A6D975',
        content: [
          "Protecting your identification nodes is an foundational element of our architecture design. Understand our storage security parameters here:",
          "## Step 1: Cryptographic Ledger Masking Processes\nWe do not store plain-text biometric values or original authentication sequences directly inside exposed server environments.",
          "## Step 2: Direct Interfacing with Regulatory Gateways\nAll authorization requests route through isolated, encrypted pipeline vectors communicating directly with licensed verification partners.",
          "## Step 3: Continuous Infrastructure Threat Assessment\nOur data layers feature continuous programmatic security audits to identify and neutralize vector vulnerabilities ahead of system exploits."
        ]
      },
      {
        id: 'Article 008',
        title: 'What to do if your verification fails',
        readTime: '7 minute read',
        bgColor: 'bg-[#FCEFD2]',
        innerBg: '#B7791F',
        splitDarkBg: '#3F2604',
        paperAccentBg: '#FCD34D',
        content: [
          "Verification blocks typically trace back to simple formatting mismatches or network connection dropouts. Resolve validation errors using this loop:",
          "## Step 1: Check Database Registry Name Mismatches\nConfirm that details like shortened nicknames or misspelled middle names do not conflict with your official national database registries.",
          "## Step 2: Review Document Capture Clarity Requirements\nEnsure that physical identity scans avoid reflective glare, blurred typography edges, or cut-off corners.",
          "## Step 3: Refresh Active Session Data Channels\nIf network timeouts disrupt connection points, clear cache directories before re-submitting your validation documents."
        ]
      },
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
      {
        id: 'Article 009',
        title: 'Evaluating Startup Founders & Teams',
        readTime: '11 minute read',
        bgColor: 'bg-[#FCEFD2]',
        innerBg: '#B7791F',
        splitDarkBg: '#3F2604',
        paperAccentBg: '#FCD34D',
        content: [
          "Early-stage venture performance relies heavily on execution team capacity. Evaluate startup founders using this core checklist:",
          "## Step 1: Review Historic Domain Adaptability Metrics\nPrioritize technical founders who have engineered resilient systems through complex market shifts or local macroeconomic pivots.",
          "## Step 2: Analyze Executive Cohesion Balance Sheets\nVerify that the technical, design, and commercial roles are balanced effectively across co-founders to prevent single points of failure.",
          "## Step 3: Assess Strategic Operational Integrity standards\nLook for team cultures that emphasize transparent communication and structured asset tracking frameworks over short-term growth hacks."
        ]
      },
      {
        id: 'Article 010',
        title: 'Diversifying Your Crowd Portfolio',
        readTime: '8 minute read',
        bgColor: 'bg-[#E1EDC5]',
        innerBg: '#7D8A26',
        splitDarkBg: '#02231E',
        paperAccentBg: '#A6D975',
        content: [
          "Spreading capital across diverse startup archetypes helps minimize macroeconomic risk profiles. Build a diversified asset mix with these strategies:",
          "## Step 1: Avoid Over-Concentration in One Sector\nBalance digital fintech investments with alternative allocations in logistics, B2B commerce, or tech-enabled healthcare infrastructure.",
          "## Step 2: Stagger Your Capital Allocations Chronologically\nInstead of allocating your full budget to a single funding window, space your positions across different quarters.",
          "## Step 3: Mix Enterprise B2B Models with Scalable B2C Targets\nCombine highly predictable B2B SaaS models with high-volume, consumer-facing digital platforms."
        ]
      },
      {
        id: 'Article 011',
        title: 'Understanding Equity Dilution Over Time',
        readTime: '14 minute read',
        bgColor: 'bg-[#D3E4F9]',
        innerBg: '#2B6CB0',
        splitDarkBg: '#092A4A',
        paperAccentBg: '#93C5FD',
        content: [
          "When a startup raises follow-on capital, your ownership percentage changes. Understand how asset positions shift during extension cycles:",
          "## Step 1: Track Total Capitalization Table Adjustments\nLearn how new institutional share distributions adjust the total volume of outstanding operational stock options.",
          "## Step 2: Differentiate Absolute Ownership from Relative Valuation Metrics\nYour percentage ownership might decrease, but the net financial value of your shares can increase if the company's valuation rises.",
          "## Step 3: Evaluate Pre-Emptive Follow-On Allocation Options\nReview platform mechanics that allow seed participants to top up allocations during subsequent funding rounds to protect ownership stakes."
        ]
      },
      {
        id: 'Article 012',
        title: 'Vetting Models for High Yield Deals',
        readTime: '10 minute read',
        bgColor: 'bg-[#D9D6FE]',
        innerBg: '#5B51D8',
        splitDarkBg: '#1A1249',
        paperAccentBg: '#B4B0FF',
        content: [
          "Our platform engineering group uses data-driven filtering pipelines to select project listings. Review our curation steps here:",
          "## Step 1: Confirm Historical Revenue Generation Assets\nWe prioritize businesses that demonstrate real-world revenue traction over speculative, early-stage concepts.",
          "## Step 2: Conduct Comprehensive Legal Debt Verification Audits\nEvery pipeline candidate undergoes independent reviews to ensure they are free from hidden operational liabilities or regulatory encumbrances.",
          "## Step 3: Stress-Test Operational Unit Margins\nWe model growth projections against fluctuating local operational costs to confirm sustainable path-to-profitability structures."
        ]
      },
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
      {
        id: 'Article 013',
        title: 'Funding Your Escrow Wallet safely',
        readTime: '5 minute read',
        bgColor: 'bg-[#D3E4F9]',
        innerBg: '#2B6CB0',
        splitDarkBg: '#092A4A',
        paperAccentBg: '#93C5FD',
        content: [
          "Securely funding your platform escrow node is essential for swift investment execution. Use this funding workflow:",
          "## Step 1: Generate a Unique Virtual Inbound Account Number\nNavigate to your wallet dashboard to create a dedicated, bank-linked settlement profile.",
          "## Step 2: Execute Electronic Transfers Using Correct Bank Routing Codes\nUse your commercial banking application to push funds into your newly generated virtual account details.",
          "## Step 3: Track Real-Time Ledger Balance Updates\nOur platform systems automatically listen for inbound payment notifications, updating your available balance within minutes."
        ]
      },
      {
        id: 'Article 014',
        title: 'Processing Timelines for Local Settlements',
        readTime: '7 minute read',
        bgColor: 'bg-[#D9D6FE]',
        innerBg: '#5B51D8',
        splitDarkBg: '#1A1249',
        paperAccentBg: '#B4B0FF',
        content: [
          "Financial transit windows vary based on the specific payment rails chosen. Keep these settlement timelines in mind:",
          "## Step 1: Instant Virtual Inbound Bank Settlements\nStandard electronic bank-to-bank virtual transfers typically post to your dashboard balance within 2 to 15 minutes.",
          "## Step 2: Debit Card Payment Verification Windows\nCard transactions processing through secure payment gateways update almost instantly, subject to local banking 2FA approval speeds.",
          "## Step 3: Outbound Withdrawal Settlement Frameworks\nApproved withdrawal requests route to your linked commercial bank accounts within 24 to 48 hours, excluding public holidays."
        ]
      },
      {
        id: 'Article 015',
        title: 'Understanding Escrow Account Insurances',
        readTime: '9 minute read',
        bgColor: 'bg-[#E1EDC5]',
        innerBg: '#7D8A26',
        splitDarkBg: '#02231E',
        paperAccentBg: '#A6D975',
        content: [
          "Uncommitted wallet balances are held securely through licensed partner banks. Learn how your funds are protected:",
          "## Step 1: Capital Isolation via Ring-Fenced Escrow Accounts\nYour investment funds are segregated from our corporate operational cash flows at all times.",
          "## Step 2: Integration with Primary NDIC Insured Institutions\nAll cash balances rest inside tier-1 banking institutions covered by standard deposit insurance frameworks.",
          "## Step 3: Automated Escrow Disbursal Protocols\nFunds are only released to a startup once a campaign successfully hits its verified target funding milestones."
        ]
      },
      {
        id: 'Article 016',
        title: 'Configuring Direct Automated Bank Debits',
        readTime: '6 minute read',
        bgColor: 'bg-[#FCEFD2]',
        innerBg: '#B7791F',
        splitDarkBg: '#3F2604',
        paperAccentBg: '#FCD34D',
        content: [
          "Automate your monthly portfolio allocations by setting up direct recurring debits. Set up your automated plan here:",
          "## Step 1: Choose Your Preferred Recurring Allocation Amount\nDefine the precise funding schedule and target amount you want to automate from your dashboard settings.",
          "## Step 2: Complete the Secure Bank Mandate Authorization\nAuthenticate the secure token request provided by our payment gateway partner to authorize recurring debits.",
          "## Step 3: Adjust or Pause Your Automation Settings Dynamically\nYou retain full control over your recurring allocations and can pause or cancel them instantly via your account settings."
        ]
      },
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
      {
        id: 'Article 017',
        title: 'Fixing 2FA Code Match Latencies',
        readTime: '4 minute read',
        bgColor: 'bg-[#FFDFDF]',
        innerBg: '#C53030',
        splitDarkBg: '#4A1D1D',
        paperAccentBg: '#FEB2B2',
        content: [
          "SMS delivery delays or device clock desynchronizations can occasionally cause 2FA verification errors. Fix authentication sync issues here:",
          "## Step 1: Sync Your Device System Time Settings\nEnsure your device's system clock is set to update automatically based on your network timezone.",
          "## Step 2: Switch to an Authenticator Application Core Protocol\nWe recommend using app-based options like Google Authenticator or 1Password to avoid local carrier SMS delivery delays.",
          "## Step 3: Apply Your Secure Emergency Recovery Codes\nIf you lose access to your primary authentication device, use the backup recovery tokens provided during your initial setup."
        ]
      },
      {
        id: 'Article 018',
        title: 'Resetting Expired Session Access Nodes',
        readTime: '5 minute read',
        bgColor: 'bg-[#D3E4F9]',
        innerBg: '#2B6CB0',
        splitDarkBg: '#092A4A',
        paperAccentBg: '#93C5FD',
        content: [
          "For data protection, security tokens automatically expire after periods of inactivity. Refresh your login session safely:",
          "## Step 1: Perform a Secure Sign-Out Sequence\nClick the sign-out button to clear outdated authentication cookies and tokens from your active session.",
          "## Step 2: Clear Local Browser Cookie Repositories\nIf you experience persistent redirect loops, clear your browser's site cookies for the Antital domain name.",
          "## Step 3: Re-Authenticate Using Current Credentials\nEnter your username and password to establish a fresh, fully encrypted access token."
        ]
      },
      {
        id: 'Article 019',
        title: 'Clearing Ledger Update Stalls on Web',
        readTime: '6 minute read',
        bgColor: 'bg-[#FCEFD2]',
        innerBg: '#B7791F',
        splitDarkBg: '#3F2604',
        paperAccentBg: '#FCD34D',
        content: [
          "If your browser dashboard displays outdated investment balances, a local stale network state may be the cause. Force an asset data refresh with these steps:",
          "## Step 1: Force a Hard Browser Cache Reload\nPress Command+Shift+R (Mac) or Control+F5 (Windows) to reload the web page and fetch fresh server files.",
          "## Step 2: Verify Your Active Local Connection Points\nConfirm that firewall profiles or corporate VPN servers are not blocking our secure background websocket data streams.",
          "## Step 3: Inspect the Platform Status Dashboard Indicator\nCheck our official status page to confirm that system networks are operating normally across all data nodes."
        ]
      },
      {
        id: 'Article 020',
        title: 'Recovering Locked Account Context Profiles',
        readTime: '8 minute read',
        bgColor: 'bg-[#D9D6FE]',
        innerBg: '#5B51D8',
        splitDarkBg: '#1A1249',
        paperAccentBg: '#B4B0FF',
        content: [
          "Accounts may be temporarily locked following multiple consecutive incorrect password attempts to safeguard your assets. Unlock your profile safely:",
          "## Step 1: Initiate an Authorized Password Reset Request\nClick \"Forgot Password\" on the login page to send a secure recovery link to your registered email address.",
          "## Step 2: Complete the Identity Match Verification Link\nOpen the recovery email and complete the secure verification steps using your registered device context.",
          "## Step 3: Update Security Settings and Set a Strong Password\nCreate a new, unique password configuration and ensure your account recovery options are up to date."
        ]
      },
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
      {
        id: 'Article 021',
        title: 'Liquidity Rules for Active Trades',
        readTime: '10 minute read',
        bgColor: 'bg-[#D9D6FE]',
        innerBg: '#5B51D8',
        splitDarkBg: '#1A1249',
        paperAccentBg: '#B4B0FF',
        content: [
          "Our secondary market desk lets users list and trade fractional startup shares with other platform members. Review our market trading rules here:",
          "## Step 1: Check Mandatory Campaign Lock-Up Timelines\nVerify that your startup allocation has cleared its initial mandatory hold period before posting sell orders.",
          "## Step 2: Understand the Order Book Matching Priority Matrix\nOur secondary trading engine matches buy and sell orders based on price advantage and submission timestamps.",
          "## Step 3: Monitor Minimum and Maximum Order Sizes\nEnsure your trade volumes align with the liquidity caps set for the specific campaign pool."
        ]
      },
      {
        id: 'Article 022',
        title: 'Pricing Shares Based on Asset Book Values',
        readTime: '12 minute read',
        bgColor: 'bg-[#FCEFD2]',
        innerBg: '#B7791F',
        splitDarkBg: '#3F2604',
        paperAccentBg: '#FCD34D',
        content: [
          "Setting realistic share prices helps improve transaction matching speeds on the order book. Determine fair value positions using these steps:",
          "## Step 1: Review the Startup's Latest Verified Valuation Baseline\nCalculate your baseline share price using the official valuation from the company's most recent funding round.",
          "## Step 2: Factor In Company Performance Disclosures\nAdjust your pricing expectations based on the latest quarterly revenue summaries and performance updates.",
          "## Step 3: Analyze Current Market Spread Dynamics\nReview active buy bids and sell asks on the live ledger to find a competitive price point."
        ]
      },
      {
        id: 'Article 023',
        title: 'Matching Spread Orders on Orderbooks',
        readTime: '9 minute read',
        bgColor: 'bg-[#D3E4F9]',
        innerBg: '#2B6CB0',
        splitDarkBg: '#092A4A',
        paperAccentBg: '#93C5FD',
        content: [
          "Our integrated matching engines execute transactions when buyer bids align with seller ask parameters. Learn how the trading system handles orders:",
          "## Step 1: Understand Market Orders vs. Limit Orders\nUse limit orders to set specific execution prices, or choose market orders to complete trades instantly at current market rates.",
          "## Step 2: Track Automated Spread Clearance Metrics\nOur matching system processes order flows continuously, resolving spreads based on optimal price execution values.",
          "## Step 3: Monitor Completed Trade Status Confirmations\nOnce an order matches successfully, our systems update asset ownership details and settle balances immediately."
        ]
      },
      {
        id: 'Article 024',
        title: 'Tax Implications on Early Capital Gains',
        readTime: '11 minute read',
        bgColor: 'bg-[#E1EDC5]',
        innerBg: '#7D8A26',
        splitDarkBg: '#02231E',
        paperAccentBg: '#A6D975',
        content: [
          "Realizing profits on secondary market transactions may trigger local capital gains tax obligations. Review these primary tax compliance steps:",
          "## Step 1: Determine Asset Holding Timelines\nTrack the exact duration an asset was held to confirm whether short-term or long-term tax regulations apply.",
          "## Step 2: Calculate True Net Capital Gain Positions\nSubtract your initial purchase cost and platform processing fees from your final sale price to determine your net taxable gains.",
          "## Step 3: Export Your Comprehensive Transaction History Statements\nDownload complete, auditable data summaries from your dashboard settings to help simplify seasonal tax filings."
        ]
      },
    ],
    faqs: [
      { question: 'Can I sell my project allocation at any point?', answer: 'Yes. While direct lockups protect campaigns early on, our integrated peer-to-peer secondary desk allows you to post active bids or swap allocations with verified members.' },
      { question: 'How is secondary share transaction pricing regulated?', answer: 'Pricing operates on automated order matching algorithms, restricted by upper and lower valuation bounds verified through our quarterly audit reports.' }
    ]
  }
};