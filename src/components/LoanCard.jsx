import { c, dtiColor, dtiLabel } from '../constants/theme';
import { fmt, fmt2, pct } from '../utils/formatters';
import { lenders } from '../constants/lenders';

export function LoanCard({ name, loan, color, calc, selectedLender, homeInsurance, hoaFees }) {
  return (
    <div style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: c.text }}>{name}</div>
          <div style={{ fontSize: 13, color: c.dim, marginTop: 2 }}>{pct(loan.rate)} APR · {lenders[selectedLender].name}</div>
        </div>
        {calc.isJumbo && <span style={{ fontSize: 10, fontWeight: 600, background: '#7c3aed22', color: '#a78bfa', padding: '4px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Jumbo</span>}
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: c.text }}>{fmt2(loan.total)}</div>
      <div style={{ fontSize: 13, color: c.dim, marginBottom: 20 }}>per month</div>
      <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
        {[['Principal & Interest', loan.principal], ['Property Tax', calc.monthlyTax], ['Insurance', homeInsurance], calc.pmi > 0 && [calc.pmiLabel || 'PMI', calc.pmi, '#facc15'], hoaFees > 0 && ['HOA', hoaFees]].filter(Boolean).map(([label, val, col], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${c.border}22` }}>
            <span style={{ fontSize: 13, color: col || c.muted }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: col || c.text }}>{fmt2(val)}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
        {[['Front-end DTI', loan.frontDTI], ['Back-end DTI', loan.backDTI]].map(([label, val], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, background: dtiColor(val) + '22', color: dtiColor(val), padding: '4px 10px', borderRadius: 6 }}>{pct(val)} {i === 1 && `· ${dtiLabel(val)}`}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: c.muted }}>Total Interest</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{fmt(loan.totalInterest)}</span>
      </div>
    </div>
  );
}
