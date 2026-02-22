import { c } from '../../constants/theme';
import { Card, Input, Select } from '../ui';
import { fmt, fmt2, pct } from '../../utils/formatters';

export function RefinanceTab({
  calc,
  refiYears, setRefiYears,
  refiRate, setRefiRate,
  refiTerm, setRefiTerm,
  refiClosingPercent, setRefiClosingPercent,
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <Card title="Refinance Scenario" accent={c.pink}>
        <div style={{ fontSize: 12, color: c.dim, marginBottom: 16 }}>Model refinancing your 30-year loan</div>
        <Input label="Years Until Refinance" value={refiYears} onChange={setRefiYears} suffix="years" step={1} min={1} max={29} fieldKey="refiYears" />
        <Input label="Expected New Rate" value={refiRate} onChange={setRefiRate} suffix="%" step={0.125} min={0} max={20} fieldKey="refiRate" />
        <Select label="New Loan Term" value={refiTerm} onChange={(v) => setRefiTerm(Number(v))} options={[[30, '30 Years'], [25, '25 Years'], [20, '20 Years'], [15, '15 Years']]} fieldKey="refiTerm" />
        <Input label="Refi Closing Costs" value={refiClosingPercent} onChange={setRefiClosingPercent} suffix="% of balance" step={0.5} min={0} max={10} fieldKey="refiClosingPercent" />
        <div style={{ paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 8 }}>At refinance (year {refiYears})</div>
          {[['Remaining Balance', fmt(calc.refi.balanceAtRefi)], ['Home Equity', fmt(calc.refi.equityAtRefi)], ['Loan-to-Value', pct(calc.refi.ltv)], ['Refi Closing Costs', fmt(calc.refi.refiClosingCosts)]].map(([label, val], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontSize: 12, color: c.muted }}>{label}</span>
              <span style={{ fontSize: 12 }}>{val}</span>
            </div>
          ))}
          {calc.refi.pmiDropsAtRefi && calc.pmi > 0 && (
            <div style={{ fontSize: 11, color: '#4ade80', background: '#4ade8015', padding: '8px 12px', borderRadius: 8, marginTop: 8 }}>PMI drops off — LTV below 80%</div>
          )}
        </div>
      </Card>
      <Card title="Stay vs Refinance">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#0a0a0b', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', marginBottom: 8 }}>Stay at {pct(calc.loan30.rate)}</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{fmt2(calc.refi.stayMonthlyPayment)}</div>
            <div style={{ fontSize: 11, color: c.dim }}>/month</div>
          </div>
          <div style={{ background: `${c.pink}15`, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${c.pink}33` }}>
            <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', marginBottom: 8 }}>Refi to {pct(refiRate)}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: c.pink }}>{fmt2(calc.refi.refiMonthlyPayment)}</div>
            <div style={{ fontSize: 11, color: c.dim }}>/month</div>
          </div>
        </div>
        {calc.refi.monthlySavings > 0 ? (
          <>
            <div style={{ background: '#4ade8015', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: c.muted }}>Monthly Savings</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#4ade80' }}>{fmt2(calc.refi.monthlySavings)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: c.muted }}>Break-even</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{calc.refi.breakEvenMonths} months ({calc.refi.breakEvenYears.toFixed(1)} years)</span>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
              {[['Total Paid (Stay)', fmt(calc.refi.stayTotalPaid), c.muted], ['Total Paid (Refi)', fmt(calc.refi.refiTotalPaid), c.pink], ['Lifetime Savings', fmt(calc.refi.totalSavings), '#4ade80']].map(([label, val, color], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color }}>{val}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ background: '#f8717115', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f87171', marginBottom: 4 }}>Refinancing not beneficial</div>
            <div style={{ fontSize: 12, color: c.dim }}>New rate would need to be lower</div>
          </div>
        )}
      </Card>
    </div>
  );
}
