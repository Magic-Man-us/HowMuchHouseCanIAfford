import { c } from '../constants/theme';
import { lenders } from '../constants/lenders';
import { stateTaxRates } from '../constants/stateTaxRates';
import { fieldHelp } from '../constants/fieldHelp';
import { Input, Select, Slider, InfoPanel } from './ui';
import { fmt, pct } from '../utils/formatters';

const categories = [
  { id: 'profile', label: 'Profile', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: 'debts', label: 'Debts', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
  { id: 'property', label: 'Property', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'loan', label: 'Loan', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { id: 'rates', label: 'Rates', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg> },
];

function SectionHeader({ children }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, color: c.dim, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.border}` }}>
      {children}
    </div>
  );
}

export function Sidebar({
  activeCategory, setActiveCategory,
  totalIncome, setTotalIncome,
  creditScore, setCreditScore, creditTier, creditAdjustment,
  employmentType, setEmploymentType,
  assets, setAssets,
  marginalTaxRate, setMarginalTaxRate,
  rentalIncome, setRentalIncome,
  studentLoans, setStudentLoans, carPayment, setCarPayment,
  creditCards, setCreditCards, otherDebt, setOtherDebt,
  homePrice, setHomePrice,
  downPaymentPercent, setDownPaymentPercent,
  propertyType, setPropertyType,
  propertyUse, setPropertyUse,
  propertyState, setPropertyState,
  propertyTaxRate, setPropertyTaxRate,
  homeInsurance, setHomeInsurance,
  hoaFees, setHoaFees,
  appreciationRate, setAppreciationRate,
  loanType, setLoanType,
  loanTerm, setLoanTerm,
  rateType, setRateType,
  discountPoints, setDiscountPoints,
  selectedLender, handleLenderChange,
  customLenderName, setCustomLenderName,
  rate30Base, setRate30Base,
  rate15Base, setRate15Base,
  rateJumbo30Base, setRateJumbo30Base,
  rateJumbo15Base, setRateJumbo15Base,
  rate30, rate15,
  calc,
}) {
  const isCustom = selectedLender === 'custom';

  const handleStateChange = (code) => {
    setPropertyState(code);
    const st = stateTaxRates.find((s) => s.code === code);
    if (st && st.rate !== null) {
      setPropertyTaxRate(st.rate);
    }
  };

  return (
    <div>
      {/* Horizontal category tabs */}
      <div style={{
        display: 'flex',
        gap: 4,
        marginBottom: 16,
        padding: '4px',
        background: '#0a0a0b',
        borderRadius: 12,
        border: `1px solid ${c.border}`,
      }}>
        {categories.map(({ id, label, icon }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                padding: '8px 2px',
                borderRadius: 9,
                border: 'none',
                background: isActive ? `${c.accent}22` : 'transparent',
                color: isActive ? c.accent : c.dim,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontSize: 9,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      {/* Category content */}
      <div style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: '16px 14px',
      }}>

        {/* ── Profile ──────────────────────────────────────── */}
        {activeCategory === 'profile' && (
          <div>
            <SectionHeader>Income & Employment</SectionHeader>
            <Input
              label="Total Annual Income"
              value={totalIncome}
              onChange={setTotalIncome}
              prefix="$"
              min={0}
              max={10000000}
              fieldKey="totalIncome"
            />

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: c.muted, marginBottom: 8 }}>
                Credit Score: {creditScore}
                <InfoPanel fieldKey="creditScore" helpData={fieldHelp.creditScore} />
              </label>
              <Slider value={creditScore} onChange={setCreditScore} min={620} max={850} step={5} color={creditTier.color} title={fieldHelp.creditScore?.hint} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 10, color: c.dim }}>620</span>
                <span style={{ fontSize: 10, color: c.dim }}>740</span>
                <span style={{ fontSize: 10, color: c.dim }}>850</span>
              </div>
            </div>

            <div style={{ background: '#0a0a0b', borderRadius: 10, padding: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: c.muted }}>Credit Tier</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: creditTier.color }}>{creditTier.label}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: c.muted }}>Rate Adjustment</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: creditAdjustment === 0 ? '#4ade80' : '#fb923c' }}>
                  {creditAdjustment === 0 ? 'Best rate' : `+${creditAdjustment.toFixed(3)}%`}
                </span>
              </div>
            </div>

            <Select
              label="Employment Type"
              value={employmentType}
              onChange={setEmploymentType}
              options={[['W-2', 'W-2 Employee'], ['Self-Employed', 'Self-Employed'], ['1099', '1099 Contractor']]}
              fieldKey="employmentType"
            />

            <Input label="Assets / Savings" value={assets} onChange={setAssets} prefix="$" min={0} max={100000000} fieldKey="assets" />

            <Select
              label="Marginal Tax Rate"
              value={String(marginalTaxRate)}
              onChange={(v) => setMarginalTaxRate(Number(v))}
              options={[['10', '10% ($0-$11K)'], ['12', '12% ($11K-$44K)'], ['22', '22% ($44K-$95K)'], ['24', '24% ($95K-$191K)'], ['32', '32% ($191K-$243K)'], ['35', '35% ($243K-$609K)'], ['37', '37% ($609K+)']]}
              fieldKey="marginalTaxRate"
            />

            <Input label="Rental Income" value={rentalIncome} onChange={setRentalIncome} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="rentalIncome" />

            <div style={{ paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: c.dim }}>Monthly Gross</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{fmt(calc.monthlyIncome)}</span>
              </div>
              {rentalIncome > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: c.dim }}>+ Rental (75%)</span>
                  <span style={{ fontSize: 11, color: c.accent2 }}>+{fmt(rentalIncome * 0.75)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Debts ──────────────────────────────────────── */}
        {activeCategory === 'debts' && (
          <div>
            <SectionHeader>Monthly Obligations</SectionHeader>
            <Input label="Student Loans" value={studentLoans} onChange={setStudentLoans} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="studentLoans" />
            <Input label="Car Payment" value={carPayment} onChange={setCarPayment} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="carPayment" />
            <Input label="Credit Cards" value={creditCards} onChange={setCreditCards} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="creditCards" />
            <Input label="Other" value={otherDebt} onChange={setOtherDebt} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="otherDebt" />
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 13, color: c.dim }}>Total Monthly</span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{fmt(calc.monthlyDebt)}</span>
            </div>
          </div>
        )}

        {/* ── Property ─────────────────────────────────────── */}
        {activeCategory === 'property' && (
          <div>
            <SectionHeader>Property Details</SectionHeader>
            <Input label="Home Price" value={homePrice} onChange={setHomePrice} prefix="$" step={5000} min={0} max={100000000} fieldKey="homePrice" />

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: c.muted, marginBottom: 8 }}>
                Down Payment: {downPaymentPercent}% ({fmt(calc.downPayment)})
                <InfoPanel fieldKey="downPaymentPercent" helpData={fieldHelp.downPaymentPercent} />
              </label>
              <Slider value={downPaymentPercent} onChange={setDownPaymentPercent} min={0} max={50} title={fieldHelp.downPaymentPercent?.hint} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 10, color: c.dim }}>0%</span>
                <span style={{ fontSize: 10, color: c.dim }}>20%</span>
                <span style={{ fontSize: 10, color: c.dim }}>50%</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Select
                label="Property Type"
                value={propertyType}
                onChange={setPropertyType}
                options={[['Single Family', 'Single Family'], ['Condo', 'Condo'], ['Townhouse', 'Townhouse'], ['Multi-Unit', 'Multi-Unit']]}
                fieldKey="propertyType"
              />
              <Select
                label="Property Use"
                value={propertyUse}
                onChange={setPropertyUse}
                options={[['Primary', 'Primary'], ['Secondary', 'Vacation'], ['Investment', 'Investment']]}
                fieldKey="propertyUse"
              />
            </div>

            <Select
              label="State"
              value={propertyState}
              onChange={handleStateChange}
              options={stateTaxRates.map((s) => [s.code, s.code ? `${s.name} (${s.rate}%)` : s.name])}
              fieldKey="propertyState"
            />

            <SectionHeader>Taxes & Insurance</SectionHeader>
            <Input label="Property Tax Rate" value={propertyTaxRate} onChange={setPropertyTaxRate} suffix="% /yr" step={0.1} min={0} max={10} fieldKey="propertyTaxRate" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Input label="Home Insurance" value={homeInsurance} onChange={setHomeInsurance} prefix="$" suffix="/mo" small min={0} max={10000} fieldKey="homeInsurance" />
              <Input label="HOA Fees" value={hoaFees} onChange={setHoaFees} prefix="$" suffix="/mo" small min={0} max={10000} fieldKey="hoaFees" />
            </div>
            <Input label="Appreciation Rate" value={appreciationRate} onChange={setAppreciationRate} suffix="% /yr" step={0.5} min={-5} max={15} fieldKey="appreciationRate" />

            <div style={{ paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: c.dim }}>Loan Amount</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{fmt(calc.loanAmount)}</span>
              </div>
              {calc.isJumbo && <div style={{ fontSize: 11, color: '#a78bfa', background: '#7c3aed15', padding: '8px 12px', borderRadius: 8, marginBottom: 8 }}>Jumbo loan — exceeds $766,550</div>}
              {calc.pmi > 0 && <div style={{ fontSize: 11, color: '#facc15', background: '#facc1515', padding: '8px 12px', borderRadius: 8 }}>{calc.pmiLabel || 'PMI required'}</div>}
            </div>
          </div>
        )}

        {/* ── Loan ───────────────────────────────────────── */}
        {activeCategory === 'loan' && (
          <div>
            <SectionHeader>Loan Structure</SectionHeader>
            <Select
              label="Loan Type"
              value={loanType}
              onChange={setLoanType}
              options={[['conventional', 'Conventional'], ['fha', 'FHA'], ['va', 'VA'], ['usda', 'USDA']]}
              fieldKey="loanType"
            />

            <Select
              label="Primary Loan Term"
              value={String(loanTerm)}
              onChange={(v) => setLoanTerm(Number(v))}
              options={[['30', '30 Years'], ['25', '25 Years'], ['20', '20 Years'], ['15', '15 Years']]}
              fieldKey="loanTerm"
            />

            {loanType === 'fha' && (
              <div style={{ fontSize: 11, color: '#fb923c', background: '#fb923c15', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>
                FHA: 3.5% min down, 0.55% annual MIP, 1.75% upfront MIP
              </div>
            )}
            {loanType === 'va' && (
              <div style={{ fontSize: 11, color: '#4ade80', background: '#4ade8015', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>
                VA: 0% down OK, no monthly PMI, funding fee in closing costs
              </div>
            )}
            {loanType === 'usda' && (
              <div style={{ fontSize: 11, color: '#06b6d4', background: '#06b6d415', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>
                USDA: 0% down, 0.35% annual fee, 1% upfront guarantee fee
              </div>
            )}

            <Select
              label="Rate Type"
              value={rateType}
              onChange={setRateType}
              options={[['Fixed', 'Fixed Rate'], ['5-1 ARM', '5/1 ARM'], ['7-1 ARM', '7/1 ARM'], ['10-1 ARM', '10/1 ARM']]}
              fieldKey="rateType"
            />

            <Select
              label="Discount Points"
              value={String(discountPoints)}
              onChange={(v) => setDiscountPoints(Number(v))}
              options={[['0', '0 Points'], ['0.5', '0.5 Points (-0.125%)'], ['1', '1 Point (-0.25%)'], ['1.5', '1.5 Points (-0.375%)'], ['2', '2 Points (-0.50%)']]}
              fieldKey="discountPoints"
            />

            {discountPoints > 0 && (
              <div style={{ fontSize: 11, color: c.accent, background: `${c.accent}15`, padding: '8px 12px', borderRadius: 8, marginBottom: 8 }}>
                Points cost: {fmt(calc.pointsCost)} · Saves {pct(discountPoints * 0.25)} off rate
              </div>
            )}
          </div>
        )}

        {/* ── Rates ──────────────────────────────────────── */}
        {activeCategory === 'rates' && (
          <div>
            <SectionHeader>Lender & Rates</SectionHeader>
            <Select
              label="Select Lender"
              value={selectedLender}
              onChange={handleLenderChange}
              options={Object.entries(lenders).map(([id, l]) => [id, l.name])}
              fieldKey="selectedLender"
            />

            {isCustom && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: c.muted, marginBottom: 6 }}>
                  Lender Name
                  <InfoPanel fieldKey="customLenderName" helpData={fieldHelp.customLenderName} />
                </label>
                <input
                  type="text"
                  value={customLenderName}
                  onChange={(e) => setCustomLenderName(e.target.value)}
                  maxLength={80}
                  placeholder="e.g. Wells Fargo"
                  title={fieldHelp.customLenderName?.hint}
                  style={{ width: '100%', padding: '10px 12px', background: '#0a0a0b', border: `1px solid ${c.accent}`, borderRadius: 8, color: c.text, fontSize: 14, outline: 'none' }}
                />
              </div>
            )}

            <div style={{ fontSize: 12, color: c.dim, padding: '8px 12px', background: '#0a0a0b', borderRadius: 8, marginBottom: 12 }}>
              {lenders[selectedLender].note}
            </div>

            {isCustom && (
              <div style={{ fontSize: 11, fontWeight: 600, color: c.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
                Your Quoted Rates
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Input label="30-Year" value={rate30Base} onChange={setRate30Base} suffix="%" step={0.125} small min={0} max={20} highlightBorder={isCustom} fieldKey="rate30Base" />
              <Input label="15-Year" value={rate15Base} onChange={setRate15Base} suffix="%" step={0.125} small min={0} max={20} highlightBorder={isCustom} fieldKey="rate15Base" />
              <Input label="Jumbo 30" value={rateJumbo30Base} onChange={setRateJumbo30Base} suffix="%" step={0.125} small min={0} max={20} highlightBorder={isCustom} fieldKey="rateJumbo30Base" />
              <Input label="Jumbo 15" value={rateJumbo15Base} onChange={setRateJumbo15Base} suffix="%" step={0.125} small min={0} max={20} highlightBorder={isCustom} fieldKey="rateJumbo15Base" />
            </div>

            {creditAdjustment > 0 && (
              <div style={{ fontSize: 11, color: c.dim, marginTop: 8, padding: '8px 12px', background: '#0a0a0b', borderRadius: 8 }}>
                Your rates: 30yr {pct(rate30)} · 15yr {pct(rate15)}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
