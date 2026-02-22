// Centralized help data for all input fields
// Each entry: hint (hover tooltip) + info (click panel with details)

export const fieldHelp = {
  // ── Borrower Profile ──────────────────────────────────────────────
  totalIncome: {
    hint: 'Gross annual income before taxes — include salary, bonuses, side income.',
    info: {
      title: 'Total Annual Income',
      description: 'Your total gross (pre-tax) annual household income. Lenders use this to calculate your debt-to-income ratio, which is the single biggest factor in how much you can borrow.',
      formula: 'Monthly Income = Annual Income / 12\nFront-end DTI = Housing Payment / Monthly Income\nBack-end DTI = (Housing + All Debt) / Monthly Income',
      details: 'Include W-2 wages, self-employment income, bonuses, commissions, rental income, and spouse income. Lenders typically want 2 years of documented income history. Self-employed borrowers may need to show tax returns.',
      links: [
        { label: 'CFPB: DTI Ratios', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/' },
      ],
    },
  },
  creditScore: {
    hint: 'FICO score (620–850). Higher = better rates and lower PMI.',
    info: {
      title: 'Credit Score',
      description: 'Your FICO credit score directly impacts your mortgage interest rate. Each tier adds a rate adjustment on top of the lender\'s base rate.',
      formula: 'Adjusted Rate = Base Rate + Credit Adjustment\n760+: +0.000%  |  740-759: +0.125%\n720-739: +0.250%  |  700-719: +0.375%\n680-699: +0.500%  |  660-679: +0.750%\n640-659: +1.000%  |  620-639: +1.250%',
      details: 'Most lenders require a minimum 620 FICO. Scores above 760 get the best rates with no adjustment. A 40-point score improvement can save tens of thousands over the life of a loan.',
      links: [
        { label: 'myFICO: Score Ranges', url: 'https://www.myfico.com/credit-education/credit-scores' },
      ],
    },
  },
  employmentType: {
    hint: 'W-2 is simplest to qualify. Self-employed needs 2 years of tax returns.',
    info: {
      title: 'Employment Type',
      description: 'How you earn income affects the documentation lenders require and may influence qualifying ratios.',
      details: 'W-2 employees provide pay stubs and W-2 forms. Self-employed borrowers need 2 years of personal and business tax returns. 1099 contractors may need bank statements or a CPA letter. Some lenders have special programs for each type.',
    },
  },
  assets: {
    hint: 'Cash, investments, and retirement funds. Lenders want 6+ months of reserves.',
    info: {
      title: 'Assets / Savings',
      description: 'Total liquid and semi-liquid assets including savings, checking, investments, and retirement accounts.',
      formula: 'Recommended Reserves = 6 × (Monthly Tax + Insurance + PMI + HOA + Debt)',
      details: 'Lenders verify assets to ensure you can cover the down payment, closing costs, and have reserves. Reserves are measured in months of housing payments. 2 months is minimum, 6+ months is strong. Gift funds from family may be allowed with a gift letter.',
    },
  },

  // ── Monthly Debts ─────────────────────────────────────────────────
  studentLoans: {
    hint: 'Monthly student loan payment. Use IBR/IDR amount if applicable.',
    info: {
      title: 'Student Loans',
      description: 'Your monthly student loan payment obligation. This is included in the back-end DTI ratio calculation.',
      formula: 'Back-end DTI = (Housing + Student Loans + Car + Cards + Other) / Monthly Income',
      details: 'If loans are in deferment, lenders may use 0.5%-1% of the balance as a hypothetical monthly payment. Income-based repayment (IBR) amounts are typically accepted. Refinanced student loans use the actual payment.',
    },
  },
  carPayment: {
    hint: 'Monthly auto loan or lease payment.',
    info: {
      title: 'Car Payment',
      description: 'Monthly vehicle loan or lease payments. Included in back-end DTI.',
      details: 'If you have fewer than 10 payments remaining, some lenders will exclude this from DTI calculations.',
    },
  },
  creditCards: {
    hint: 'Total minimum monthly payments across all credit cards.',
    info: {
      title: 'Credit Card Payments',
      description: 'The sum of minimum payments on all revolving credit accounts.',
      details: 'Lenders use the minimum payment shown on your credit report, not the full balance or what you actually pay. Paying down balances before applying can lower your DTI and improve your score.',
    },
  },
  otherDebt: {
    hint: 'Alimony, child support, personal loans, or other recurring obligations.',
    info: {
      title: 'Other Monthly Debt',
      description: 'Any other recurring debt obligations reported to credit bureaus or disclosed on your loan application.',
      details: 'Includes alimony, child support, personal loans, medical debt payments, and any co-signed loan payments. Does not include utilities, subscriptions, or insurance premiums.',
    },
  },

  // ── Property & Taxes ──────────────────────────────────────────────
  homePrice: {
    hint: 'Full purchase price of the home, typically $200K–$2M.',
    info: {
      title: 'Home Price',
      description: 'The total purchase price of the property. This determines your loan amount, down payment, and whether you need a jumbo loan.',
      formula: 'Loan Amount = Home Price − Down Payment\nJumbo Threshold = $766,550 (2024)',
      details: 'The conforming loan limit for 2024 is $766,550 in most areas (higher in high-cost areas like SF, NYC). Loans above this limit are jumbo loans with different rates and requirements. The purchase price also determines property tax basis in most states.',
      links: [
        { label: 'FHFA Conforming Loan Limits', url: 'https://www.fhfa.gov/data/conforming-loan-limit' },
      ],
    },
  },
  downPaymentPercent: {
    hint: '20% avoids PMI. FHA allows 3.5%, VA/USDA allow 0%.',
    info: {
      title: 'Down Payment',
      description: 'Percentage of the home price you pay upfront. Directly affects loan amount, PMI requirements, and monthly payment.',
      formula: 'Down Payment = Home Price × (Down Payment % / 100)\nLoan Amount = Home Price − Down Payment\nPMI required if Down Payment < 20% (Conventional)',
      details: 'Conventional loans: 20% down avoids PMI entirely. 10-19% down = lower PMI. 3-5% minimum. FHA: 3.5% minimum with MIP for life. VA: 0% down OK, no PMI. USDA: 0% down in eligible rural areas. Larger down payments mean lower monthly payments and better rates.',
    },
  },
  propertyState: {
    hint: 'Select state to auto-fill average property tax rate.',
    info: {
      title: 'Property State',
      description: 'The state where the property is located. This auto-fills the average effective property tax rate for that state.',
      details: 'Tax rates vary dramatically by state — from 0.29% in Hawaii to 2.47% in New Jersey. These are state averages; your actual rate depends on county, city, and local tax districts. Select "Custom / Manual" to enter your exact rate.',
      links: [
        { label: 'Tax Foundation: Property Tax Rates', url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/' },
      ],
    },
  },
  propertyType: {
    hint: 'Condos and multi-units may have higher rates or require more down.',
    info: {
      title: 'Property Type',
      description: 'The type of property you\'re purchasing. Affects available loan programs and potentially your rate.',
      details: 'Single-family homes have the most loan options and lowest rates. Condos require HOA review and may have limited FHA eligibility. Multi-unit (2-4) can be financed as residential with owner occupancy — great for house-hacking. 5+ units require commercial financing.',
    },
  },
  propertyUse: {
    hint: 'Primary = best rates. Investment = 0.5-0.75% higher rate, 15-25% down.',
    info: {
      title: 'Property Use',
      description: 'How you intend to use the property. Primary residences get the best rates and lowest down payments.',
      details: 'Primary: Must occupy within 60 days. Best rates, lowest down (3-5%). Secondary/Vacation: 10% minimum down, slightly higher rates. Investment: 15-25% down, 0.5-0.75% rate premium, no FHA/VA/USDA. Misrepresenting occupancy is mortgage fraud.',
    },
  },
  propertyTaxRate: {
    hint: 'Annual tax as % of home value. US average is ~1.1%.',
    info: {
      title: 'Property Tax Rate',
      description: 'Annual property tax expressed as a percentage of the home\'s assessed value. This is a major component of your total monthly housing cost.',
      formula: 'Monthly Tax = (Home Price × Tax Rate%) / 12\nAnnual Tax = Home Price × Tax Rate%',
      details: 'Property taxes vary from 0.29% (Hawaii) to 2.47% (New Jersey). The rate depends on state, county, city, and local school/fire districts. Assessed value may differ from purchase price. Taxes are escrowed into your monthly payment. Rates can change annually.',
      links: [
        { label: 'Tax Foundation: Property Taxes by State', url: 'https://taxfoundation.org/data/all/state/property-taxes-by-state-county/' },
      ],
    },
  },
  homeInsurance: {
    hint: 'Homeowner\'s insurance, typically $100–$300/mo depending on location.',
    info: {
      title: 'Home Insurance',
      description: 'Monthly homeowner\'s insurance premium. Required by all mortgage lenders and escrowed into your monthly payment.',
      details: 'Average US premium is ~$1,800/year ($150/mo). Costs vary widely by state, location (flood/fire zones), home age, and coverage level. Florida and Louisiana are the most expensive. You may need additional flood, earthquake, or wind coverage depending on location.',
      links: [
        { label: 'NAIC: Homeowners Insurance', url: 'https://content.naic.org/cipr-topics/homeowners-insurance' },
      ],
    },
  },
  hoaFees: {
    hint: 'Homeowner association monthly dues. Common for condos/townhouses.',
    info: {
      title: 'HOA Fees',
      description: 'Monthly homeowners association dues. Included in your total housing payment and DTI calculation.',
      formula: 'Total Housing = Principal + Interest + Tax + Insurance + PMI + HOA',
      details: 'HOA fees cover shared amenities, exterior maintenance, insurance, and reserves. Typical range: $200-$500/mo for condos, $50-$200 for single-family communities. Always review the HOA budget and reserve fund. Special assessments can add surprise costs. Lenders include HOA in your DTI.',
    },
  },

  // ── Loan Structure ────────────────────────────────────────────────
  loanType: {
    hint: 'Conventional is most common. FHA/VA/USDA have special benefits.',
    info: {
      title: 'Loan Type',
      description: 'The mortgage program type. Each has different down payment, PMI, and qualification requirements.',
      formula: 'Conventional PMI: 0.5% of loan / year (if <20% down)\nFHA MIP: 0.55% annual + 1.75% upfront\nVA: No PMI, funding fee in closing\nUSDA: 0.35% annual + 1% upfront guarantee',
      details: 'Conventional: Most flexible, PMI drops at 80% LTV. FHA: Lower credit/income OK (580+), MIP for life on <10% down. VA: Military only, $0 down, no PMI, best rates. USDA: Rural areas only, $0 down, income limits apply.',
      links: [
        { label: 'CFPB: Loan Options', url: 'https://www.consumerfinance.gov/owning-a-home/loan-options/' },
      ],
    },
  },
  rateType: {
    hint: 'Fixed = stable payment. ARM = lower initial rate that adjusts later.',
    info: {
      title: 'Rate Type',
      description: 'Whether your interest rate stays fixed for the full term or adjusts after an initial period.',
      details: 'Fixed: Rate never changes. Predictable payments. Best if you plan to stay long-term. 5/1 ARM: Fixed for 5 years, then adjusts annually. Lower initial rate. Good if selling/refinancing within 5 years. 7/1 and 10/1 ARM: Same concept with longer fixed periods. ARMs typically have rate caps (2% per adjustment, 5-6% lifetime).',
    },
  },
  discountPoints: {
    hint: 'Pay upfront to lower your rate. 1 point = 1% of loan = -0.25% off rate.',
    info: {
      title: 'Discount Points',
      description: 'Upfront fees paid to the lender at closing to reduce your interest rate. Each point costs 1% of the loan amount.',
      formula: 'Point Cost = Loan Amount × (Points / 100)\nRate Reduction = Points × 0.25%\nBreak-even ≈ Point Cost / Monthly Savings',
      details: 'Buying points makes sense if you keep the loan long enough to recoup the upfront cost. Typical break-even: 4-7 years. If you plan to sell or refinance sooner, skip points. Points are tax-deductible in the year paid (for purchase) or over the loan life (for refi).',
      links: [
        { label: 'CFPB: Points', url: 'https://www.consumerfinance.gov/ask-cfpb/what-are-discount-points-and-lender-credits-en-136/' },
      ],
    },
  },

  // ── Lender & Rates ────────────────────────────────────────────────
  selectedLender: {
    hint: 'Pre-loaded rates from popular credit unions, or enter your own.',
    info: {
      title: 'Select Lender',
      description: 'Choose a lender to pre-fill current base rates, or select "Custom Rates" to enter your own quoted rates.',
      details: 'Pre-loaded lenders are popular credit unions with competitive rates. Rates shown are base rates before credit score adjustment. Always get a Loan Estimate from multiple lenders — rates vary significantly. Credit unions often beat banks by 0.125-0.25%.',
    },
  },
  customLenderName: {
    hint: 'Name of the lender who quoted you these rates.',
    info: {
      title: 'Custom Lender Name',
      description: 'Enter the name of the lender for your custom rate quote. This is for your reference when comparing scenarios.',
    },
  },
  rate30Base: {
    hint: 'Base 30-year fixed rate before credit adjustment.',
    info: {
      title: '30-Year Fixed Rate',
      description: 'The lender\'s base interest rate for a 30-year fixed conforming mortgage, before credit score adjustment.',
      formula: 'Your Rate = Base Rate + Credit Adjustment − (Points × 0.25%)\nMonthly P&I = P × [r(1+r)^n] / [(1+r)^n − 1]\nwhere r = rate/12, n = 360',
      details: 'The 30-year fixed is America\'s most popular mortgage. Lower monthly payments than 15-year, but you pay significantly more interest over the life of the loan. Current average is around 6.5-7.5% (2024).',
    },
  },
  rate15Base: {
    hint: 'Base 15-year fixed rate — typically 0.5-0.75% lower than 30-year.',
    info: {
      title: '15-Year Fixed Rate',
      description: 'The lender\'s base rate for a 15-year fixed conforming loan.',
      formula: 'Monthly P&I = P × [r(1+r)^n] / [(1+r)^n − 1]\nwhere r = rate/12, n = 180',
      details: '15-year loans have higher monthly payments but save massive interest. On a $400K loan, you might save $200K+ in interest vs. 30-year. Rate is typically 0.5-0.75% lower than 30-year.',
    },
  },
  rateJumbo30Base: {
    hint: 'Jumbo 30-year rate for loans above $766,550.',
    info: {
      title: 'Jumbo 30-Year Rate',
      description: 'Base rate for 30-year jumbo loans (above the conforming limit of $766,550).',
      details: 'Jumbo loans exceed the FHFA conforming limit, so they can\'t be sold to Fannie/Freddie. This means higher rates (usually +0.25-0.5%), larger down payment (10-20% minimum), and stricter credit requirements (often 700+ FICO).',
    },
  },
  rateJumbo15Base: {
    hint: 'Jumbo 15-year rate for loans above $766,550.',
    info: {
      title: 'Jumbo 15-Year Rate',
      description: 'Base rate for 15-year jumbo loans exceeding the conforming limit.',
      details: 'Combines jumbo loan requirements with the aggressive payoff of a 15-year term. Requires strong income to qualify due to higher monthly payments on a large balance.',
    },
  },

  // ── Closing Costs ─────────────────────────────────────────────────
  closingCostPercent: {
    hint: 'Lender fees as % of loan. Typically 2-5%.',
    info: {
      title: 'Closing Cost Percentage',
      description: 'Lender-related closing costs expressed as a percentage of the loan amount. Covers origination, underwriting, and processing fees.',
      formula: 'Lender Closing Costs = Loan Amount × (Closing Cost % / 100)',
      details: 'Typical range: 2-5% of loan amount. Includes origination fee, underwriting, credit report, flood cert, recording fees. Negotiate — some fees are junk fees. Compare the Loan Estimate forms from multiple lenders. Seller can contribute up to 3-6% toward closing costs depending on loan type.',
    },
  },
  inspectionFee: {
    hint: 'Home inspection cost, typically $300–$600.',
    info: {
      title: 'Inspection Fee',
      description: 'Cost of a professional home inspection before purchase.',
      details: 'A general inspection costs $300-$600. Additional specialty inspections (radon, termite, sewer scope, mold) add $100-$300 each. Never skip the inspection — it can reveal deal-breakers or negotiation leverage. Paid at time of inspection, not at closing.',
    },
  },
  appraisalFee: {
    hint: 'Lender-required appraisal, typically $400–$700.',
    info: {
      title: 'Appraisal Fee',
      description: 'Fee for a licensed appraiser to determine the property\'s market value. Required by the lender.',
      details: 'Typical cost: $400-$700. The lender orders the appraisal — you don\'t choose the appraiser. If the home appraises below the purchase price, you may need to renegotiate, bring extra cash, or walk away. VA appraisals include a property inspection.',
    },
  },
  titleInsurance: {
    hint: 'Protects against ownership disputes. ~0.5% of home price.',
    info: {
      title: 'Title Insurance',
      description: 'One-time premium protecting the lender (and optionally you) against title defects, liens, or ownership disputes.',
      formula: 'Estimated Title Insurance ≈ Home Price × 0.5%',
      details: 'Lender\'s title insurance is required; owner\'s policy is optional but recommended. Costs vary by state — some have regulated rates, others are competitive. Buying both policies together (simultaneous issue) saves money. Title search and exam fees may be separate.',
    },
  },
  renovationBudget: {
    hint: 'Planned renovation costs after purchase.',
    info: {
      title: 'Renovation Budget',
      description: 'Estimated cost of any renovations or repairs you plan after closing.',
      details: 'Factor this into your total cash needs. Kitchen remodels: $15K-$75K. Bathroom: $10K-$30K. New roof: $8K-$20K. Consider an FHA 203(k) or Fannie HomeStyle loan to finance renovations into the mortgage.',
    },
  },
  movingCosts: {
    hint: 'Moving expenses — local $1K-$3K, long-distance $3K-$10K.',
    info: {
      title: 'Moving Costs',
      description: 'Total cost of moving your belongings to the new home.',
      details: 'Local moves: $1,000-$3,000. Long-distance: $3,000-$10,000+. DIY with a rental truck: $500-$2,000. Get at least 3 quotes. Budget extra for packing supplies, storage, and tips.',
    },
  },
  furnitureAppliances: {
    hint: 'New furniture and appliance purchases after move-in.',
    info: {
      title: 'Furniture & Appliances',
      description: 'Budget for furnishing the new home and purchasing major appliances.',
      details: 'New appliance set: $3K-$8K. Furnishing a full home: $10K-$50K. Consider what conveys with the sale (check the purchase agreement). Don\'t open new credit cards for furniture before closing — it can affect your loan approval.',
    },
  },

  // ── Refinance ─────────────────────────────────────────────────────
  refiYears: {
    hint: 'How many years into your current loan before refinancing.',
    info: {
      title: 'Years Until Refinance',
      description: 'The number of years you\'ll pay on your current 30-year loan before refinancing.',
      formula: 'Balance at Refi = Remaining Balance after N years of payments\nEquity = Home Price − Balance',
      details: 'Earlier refinancing means a larger remaining balance but more time to benefit from a lower rate. Later refinancing means you\'ve already paid down principal. Most people refinance within 3-7 years when rates drop by 0.5-1%.',
    },
  },
  refiRate: {
    hint: 'Expected interest rate on the new refinanced loan.',
    info: {
      title: 'Expected New Rate',
      description: 'The interest rate you expect to get on your refinanced mortgage.',
      formula: 'Monthly Savings = Current Payment − New Payment\nBreak-even = Refi Closing Costs / Monthly Savings',
      details: 'A common rule: refinance when you can lower your rate by 0.5-1% or more. But always calculate the break-even point — if closing costs are $6K and you save $200/mo, break-even is 30 months. Only worth it if you\'ll stay past break-even.',
    },
  },
  refiTerm: {
    hint: 'New loan term length after refinancing.',
    info: {
      title: 'New Loan Term',
      description: 'The term length for your refinanced loan. Shorter terms have higher payments but save significantly on interest.',
      details: 'Options: 30, 25, 20, or 15 years. Dropping from 30 to 15 dramatically reduces total interest. Some borrowers refinance to a longer term to lower monthly payments (cash flow refi). Consider your goals: lower payment vs. faster payoff vs. total cost.',
    },
  },
  refiClosingPercent: {
    hint: 'Refi closing costs as % of remaining balance. Typically 2-3%.',
    info: {
      title: 'Refi Closing Costs',
      description: 'Closing costs for the refinance, expressed as a percentage of the remaining loan balance.',
      formula: 'Refi Closing Costs = Balance at Refi × (Refi Closing % / 100)',
      details: 'Typical range: 2-3% of the loan balance. Some lenders offer "no-closing-cost" refis with a slightly higher rate. These costs can be rolled into the new loan, but that increases your balance. Always compare total cost of each option.',
    },
  },

  // ── Extra Payments ────────────────────────────────────────────────
  extraPaymentLoan: {
    hint: 'Choose which loan term to apply extra payments to.',
    info: {
      title: 'Apply to Loan',
      description: 'Select whether to model extra payments against the 30-year or 15-year loan scenario.',
      details: 'Extra payments on a 30-year loan save more total interest because the baseline interest cost is higher. Extra payments on a 15-year loan have less impact since the term is already short and the rate is lower.',
    },
  },
  extraPayment: {
    hint: 'Additional monthly amount paid toward principal.',
    info: {
      title: 'Extra Monthly Payment',
      description: 'Additional amount paid each month directly toward the loan principal, above the minimum required payment.',
      formula: 'New Payment = Minimum Payment + Extra\nInterest Saved Per $1 Extra = Total Interest Saved / Total Extra Paid',
      details: 'Even small extra payments have big impact over time due to compounding. $200/mo extra on a $400K 30-year loan can save $80K+ in interest and pay off 5+ years early. You can also make one-time lump sum payments or biweekly payments for similar effect.',
    },
  },
};
