# HowMuchHouseCanIAfford

A comprehensive mortgage calculator that provides complete home buying cost analysis, loan comparisons, refinance modeling, and extra payment projections. Built as a zero-dependency client-side React app.

**Live:** Deployed to GitHub Pages at `/HowMuchHouseCanIAfford/`

## Features

### Three-Column Layout
- **NavRail** (72px) - Fixed vertical navigation with icon buttons for 5 sections + export
- **Input Panel** (320px) - Collapsible accordion sidebar with all inputs organized into 5 groups
- **Main Content** (flex) - KPI stats strip + active tab content

### Loan Types
| Type | Min Down | Monthly Insurance | Upfront Fee |
|------|----------|-------------------|-------------|
| Conventional | 0% (PMI if <20%) | 0.5% annual PMI | None |
| FHA | 3.5% | 0.55% annual MIP | 1.75% upfront MIP |
| VA | 0% | None | Funding fee (in costs) |
| USDA | 0% | 0.35% annual | 1% upfront guarantee |

### Discount Points
Buy down your rate by 0.25% per point (0, 0.5, 1, 1.5, or 2 points). Points cost is calculated as a percentage of the loan amount and included in closing costs.

### Credit Score Modeling
Slider from 620-850 with tiered rate adjustments:
| Score | Tier | Rate Adjustment |
|-------|------|-----------------|
| 760+ | Excellent | Best rate (0%) |
| 740-759 | Very Good | +0.125% |
| 720-739 | Good | +0.25% |
| 700-719 | Good | +0.375% |
| 680-699 | Fair | +0.5% |
| 660-679 | Fair | +0.75% |
| 640-659 | Poor | +1.0% |
| 620-639 | Very Poor | +1.25% |

### Lender Presets
Three preset credit union lenders (Navy Federal, PenFed, Alliant) with pre-filled rates for 30-year, 15-year, Jumbo 30, and Jumbo 15 loans. Plus a **Custom** option that:
- Preserves user-edited rates when switching away and back
- Shows an editable "Lender Name" field
- Highlights rate inputs with an accent border + "YOUR QUOTED RATES" label

### Five Analysis Tabs

1. **Loans** - Side-by-side 30-year vs 15-year loan cards with P&I, tax, insurance, PMI/MIP, HOA breakdown. DTI ratios with color-coded health indicators. Loan type info banner.
2. **Upfront Costs** - Editable closing cost percentage, inspection, appraisal, title insurance. Itemized breakdown including discount points and upfront MIP when applicable.
3. **Cash Summary** - Total cash needed (down payment + closing + renovation + moving + furniture). First year costs for both loan terms. 6-month recommended reserves.
4. **Extra Payments** - Model extra monthly payments ($0-$2,000). Shows time saved, interest saved, ROI per dollar. Comparison table for $100-$1,000 increments.
5. **Refinance** - Model refinancing at year N with new rate/term. Stay vs refi comparison with break-even analysis, monthly savings, lifetime savings.

### Export Report
Print-based export (zero dependencies) that generates a light-themed HTML report in a new window with:
- Borrower profile (income, employment, assets, credit)
- Property & loan details (type, rate type, points, lender)
- 30-year vs 15-year loan comparison
- Costs breakdown with conditional discount points / MIP rows
- Cash summary with recommended reserves
- Disclaimer footer

## Sidebar Accordion Sections

1. **Borrower Profile** - Total income (with tooltip), credit score slider, employment type (W-2/Self-Employed/1099), assets/savings
2. **Monthly Debts** - Student loans, car, credit cards, other
3. **Property Details** - Home price, down payment (0-50% slider), property type (SFR/Condo/Townhouse/Multi-Unit), property use (Primary/Secondary/Investment), tax rate, insurance, HOA
4. **Loan Structure** - Loan type (Conventional/FHA/VA/USDA), rate type (Fixed/5-1 ARM/7-1 ARM/10-1 ARM), discount points
5. **Lender & Rates** - Lender select, base rate inputs (30yr, 15yr, Jumbo 30, Jumbo 15), credit adjustment display

## Tech Stack

- **React 18** - UI framework
- **Vite 6** - Build tool with Terser minification
- **Zero runtime dependencies** beyond React/ReactDOM
- **Inline styles** - No CSS framework, all styling via JavaScript style objects
- **CSP hardened** - Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, no-referrer

## Project Structure

```
src/
  App.jsx                          # Root component, all state, 3-column layout
  main.jsx                         # React DOM entry point
  components/
    NavRail.jsx                    # Fixed vertical navigation rail
    Sidebar.jsx                    # Accordion input panel (5 sections)
    LoanCard.jsx                   # Individual loan display card
    ui/
      Card.jsx                     # Generic card container
      Input.jsx                    # Numeric input with prefix/suffix/tooltip
      Select.jsx                   # Dropdown select
      Slider.jsx                   # Range slider with fill track
      Stat.jsx                     # KPI stat display
      Tooltip.jsx                  # Hover tooltip
      index.js                     # Barrel export
    TabContent/
      LoansTab.jsx                 # Loan comparison + type info banner
      CostsTab.jsx                 # Closing costs + post-purchase costs
      SummaryTab.jsx               # Cash summary + first year costs
      ExtraPaymentsTab.jsx         # Extra payment calculator + comparison table
      RefinanceTab.jsx             # Stay vs refinance scenario modeler
      index.js                     # Barrel export
  constants/
    creditTiers.js                 # Score-to-adjustment mapping + tier labels
    lenders.js                     # Preset lender rates
    theme.js                       # Dark theme color palette + DTI helpers
  hooks/
    useMortgageCalculations.js     # All mortgage math (useMemo)
  utils/
    exportReport.js                # Print-based HTML report generation
    formatters.js                  # Currency (fmt/fmt2) and percentage (pct) formatters
    mortgageFormulas.js            # Payment calculation, remaining balance, payoff with extra
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Build Output

Production build generates a single JS bundle (~58 KB gzipped) with:
- Source maps disabled
- Console/debugger statements dropped
- Terser minification

## Default Test Case

With default values ($500K home, 20% down, 850 credit, Navy Federal):
- Loan amount: $400,000
- 30-year P&I: ~$2,594/mo at 6.750%
- No PMI (20% down, conventional)
- Jumbo threshold: $766,550

## Key Formulas

**Monthly Payment:**
```
P = L * [r(1+r)^n] / [(1+r)^n - 1]
where L = loan amount, r = monthly rate, n = total months
```

**PMI/MIP:**
- Conventional PMI: 0.5% of loan annually (if down < 20%)
- FHA MIP: 0.55% annually + 1.75% upfront
- VA: No monthly insurance
- USDA: 0.35% annually + 1% upfront

**Discount Points:**
- Each point costs 1% of loan amount
- Each point reduces rate by 0.25%
- Rate floor: 0.125%

**DTI Ratios:**
- Front-end: Total housing payment / gross monthly income
- Back-end: (Housing + all debts) / gross monthly income
- Thresholds: Excellent (<=28%), Good (<=36%), Caution (<=43%), High (>43%)

**Max Home Price:**
- Derived from 36% back-end DTI limit
- Accounts for taxes, insurance, PMI, HOA, and existing debts
