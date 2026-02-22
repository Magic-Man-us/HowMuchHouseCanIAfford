import { useState } from 'react';
import { c } from '../constants/theme';
import { lenders } from '../constants/lenders';
import { stateTaxRates } from '../constants/stateTaxRates';
import { fieldHelp } from '../constants/fieldHelp';
import { Input, Select, Slider, InfoPanel } from './ui';
import { fmt, pct } from '../utils/formatters';

function AccordionSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 12px',
          background: '#0a0a0b',
          border: `1px solid ${c.border}`,
          borderRadius: open ? '10px 10px 0 0' : 10,
          color: c.text,
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
        }}
      >
        {title}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.dim} strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{
          padding: '14px 12px',
          background: c.card,
          border: `1px solid ${c.border}`,
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  totalIncome, setTotalIncome,
  creditScore, setCreditScore, creditTier, creditAdjustment,
  employmentType, setEmploymentType,
  assets, setAssets,
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
  loanType, setLoanType,
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
      {/* 1. Borrower Profile */}
      <AccordionSection title="Borrower Profile" defaultOpen={true}>
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

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          <span style={{ fontSize: 13, color: c.dim }}>Monthly Gross</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{fmt(calc.monthlyIncome)}</span>
        </div>
      </AccordionSection>

      {/* 2. Monthly Debts */}
      <AccordionSection title="Monthly Debts">
        <Input label="Student Loans" value={studentLoans} onChange={setStudentLoans} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="studentLoans" />
        <Input label="Car Payment" value={carPayment} onChange={setCarPayment} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="carPayment" />
        <Input label="Credit Cards" value={creditCards} onChange={setCreditCards} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="creditCards" />
        <Input label="Other" value={otherDebt} onChange={setOtherDebt} prefix="$" suffix="/mo" min={0} max={100000} fieldKey="otherDebt" />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          <span style={{ fontSize: 13, color: c.dim }}>Total Monthly</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{fmt(calc.monthlyDebt)}</span>
        </div>
      </AccordionSection>

      {/* 3. Property & Taxes */}
      <AccordionSection title="Property & Taxes" defaultOpen={true}>
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
          options={[['Primary', 'Primary Residence'], ['Secondary', 'Secondary / Vacation'], ['Investment', 'Investment Property']]}
          fieldKey="propertyUse"
        />

        <Select
          label="State"
          value={propertyState}
          onChange={handleStateChange}
          options={stateTaxRates.map((s) => [s.code, s.code ? `${s.name} (${s.rate}%)` : s.name])}
          fieldKey="propertyState"
        />

        <Input label="Property Tax Rate" value={propertyTaxRate} onChange={setPropertyTaxRate} suffix="% /yr" step={0.1} min={0} max={10} fieldKey="propertyTaxRate" />
        <Input label="Home Insurance" value={homeInsurance} onChange={setHomeInsurance} prefix="$" suffix="/mo" min={0} max={10000} fieldKey="homeInsurance" />
        <Input label="HOA Fees" value={hoaFees} onChange={setHoaFees} prefix="$" suffix="/mo" min={0} max={10000} fieldKey="hoaFees" />

        <div style={{ paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: c.dim }}>Loan Amount</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{fmt(calc.loanAmount)}</span>
          </div>
          {calc.isJumbo && <div style={{ fontSize: 11, color: '#a78bfa', background: '#7c3aed15', padding: '8px 12px', borderRadius: 8, marginBottom: 8 }}>Jumbo loan — exceeds $766,550</div>}
          {calc.pmi > 0 && <div style={{ fontSize: 11, color: '#facc15', background: '#facc1515', padding: '8px 12px', borderRadius: 8 }}>{calc.pmiLabel || 'PMI required'}</div>}
        </div>
      </AccordionSection>

      {/* 4. Loan Structure */}
      <AccordionSection title="Loan Structure">
        <Select
          label="Loan Type"
          value={loanType}
          onChange={setLoanType}
          options={[['conventional', 'Conventional'], ['fha', 'FHA'], ['va', 'VA'], ['usda', 'USDA']]}
          fieldKey="loanType"
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
      </AccordionSection>

      {/* 5. Lender & Rates */}
      <AccordionSection title="Lender & Rates" defaultOpen={true}>
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
      </AccordionSection>
    </div>
  );
}
