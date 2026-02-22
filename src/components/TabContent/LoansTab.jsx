import { c } from '../../constants/theme';
import { Card } from '../ui';
import { LoanCard } from '../LoanCard';
import { fmt } from '../../utils/formatters';

export function LoansTab({
  calc, selectedLender, homeInsurance, hoaFees,
  loanType,
}) {
  const loanTypeLabels = {
    conventional: { label: 'Conventional Loan', color: c.accent, desc: 'Standard loan. PMI required if down payment < 20%.' },
    fha: { label: 'FHA Loan', color: '#fb923c', desc: 'Government-backed. 3.5% min down. Includes annual MIP (0.55%) and upfront MIP (1.75%).' },
    va: { label: 'VA Loan', color: '#4ade80', desc: 'For eligible veterans. 0% down, no monthly PMI. Funding fee applies.' },
    usda: { label: 'USDA Loan', color: '#06b6d4', desc: 'Rural property program. 0% down. Annual guarantee fee (0.35%) + 1% upfront.' },
  };
  const info = loanTypeLabels[loanType];

  return (
    <>
      {info && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px', marginBottom: 20,
          background: `${info.color}10`, border: `1px solid ${info.color}30`,
          borderRadius: 12,
        }}>
          <div style={{ width: 4, height: 36, borderRadius: 2, background: info.color, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: info.color }}>{info.label}</div>
            <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{info.desc}</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <LoanCard name="30-Year Fixed" loan={calc.loan30} color={c.accent} calc={calc} selectedLender={selectedLender} homeInsurance={homeInsurance} hoaFees={hoaFees} />
        <LoanCard name="15-Year Fixed" loan={calc.loan15} color={c.accent2} calc={calc} selectedLender={selectedLender} homeInsurance={homeInsurance} hoaFees={hoaFees} />
      </div>

      <Card style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>15-Year vs 30-Year</h3>
        {[
          ['Monthly Difference', `+${fmt(calc.loan15.total - calc.loan30.total)}/mo`, '#facc15'],
          ['Interest Savings (15-yr)', fmt(calc.loan30.totalInterest - calc.loan15.totalInterest), '#4ade80'],
          ['Payoff Difference', '15 years earlier', c.accent],
        ].map(([label, value, color], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${c.border}22` : 'none' }}>
            <span style={{ color: c.muted, fontSize: 13 }}>{label}</span>
            <span style={{ fontWeight: 600, color, fontSize: 14 }}>{value}</span>
          </div>
        ))}
      </Card>
    </>
  );
}
