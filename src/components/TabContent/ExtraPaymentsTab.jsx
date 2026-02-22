import { c } from '../../constants/theme';
import { Card, Select, Slider } from '../ui';
import { fmt, fmt2, pct } from '../../utils/formatters';

export function ExtraPaymentsTab({ calc, extraPayment, setExtraPayment, extraPaymentLoan, setExtraPaymentLoan }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <Card title="Extra Payment Calculator" accent={c.cyan}>
        <Select label="Apply to Loan" value={extraPaymentLoan} onChange={setExtraPaymentLoan} options={[['30', `30-Year at ${pct(calc.loan30.rate)}`], ['15', `15-Year at ${pct(calc.loan15.rate)}`]]} />
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: c.muted, marginBottom: 8 }}>Extra Monthly Payment: {fmt(extraPayment)}</label>
          <Slider value={extraPayment} onChange={setExtraPayment} min={0} max={2000} step={50} color={c.cyan} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 10, color: c.dim }}>$0</span>
            <span style={{ fontSize: 10, color: c.dim }}>$1,000</span>
            <span style={{ fontSize: 10, color: c.dim }}>$2,000</span>
          </div>
        </div>
        <div style={{ background: '#0a0a0b', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 8 }}>Minimum Payment</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{fmt2(calc.extra.selectedLoan.principal)}</div>
          <div style={{ fontSize: 12, color: c.dim, marginTop: 8 }}>New Payment</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: c.cyan }}>{fmt2(calc.extra.selectedLoan.principal + extraPayment)}</div>
        </div>
      </Card>
      <Card title="Impact Analysis">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#0a0a0b', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', marginBottom: 8 }}>Time Saved</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.cyan }}>{calc.extra.yearsSaved.toFixed(1)}</div>
            <div style={{ fontSize: 11, color: c.dim }}>years ({Math.round(calc.extra.monthsSaved)} months)</div>
          </div>
          <div style={{ background: '#0a0a0b', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', marginBottom: 8 }}>Interest Saved</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#4ade80' }}>{fmt(calc.extra.interestSaved)}</div>
            <div style={{ fontSize: 11, color: c.dim }}>over life of loan</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
          {[['Original Payoff', `${calc.extra.originalPayoffYears.toFixed(1)} years`, c.muted], ['New Payoff', `${calc.extra.newPayoffYears.toFixed(1)} years`, c.cyan], ['Total Extra Paid', fmt(calc.extra.totalExtraPaid), c.text], ['Interest Saved per $1 Extra', `$${calc.extra.interestSavedPerDollar.toFixed(2)}`, '#4ade80']].map(([label, val, color], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${c.border}22` : 'none' }}>
              <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color }}>{val}</span>
            </div>
          ))}
        </div>
        {calc.extra.interestSavedPerDollar > 0 && (
          <div style={{ background: `${c.cyan}15`, borderRadius: 12, padding: 16, marginTop: 16 }}>
            <div style={{ fontSize: 13, color: c.text, marginBottom: 4 }}><strong>ROI:</strong> Every $1 extra saves ${calc.extra.interestSavedPerDollar.toFixed(2)} in interest</div>
            <div style={{ fontSize: 12, color: c.dim }}>That's a {(calc.extra.interestSavedPerDollar * 100).toFixed(0)}% return on your extra payments</div>
          </div>
        )}
      </Card>
      <div style={{ gridColumn: 'span 2' }}>
        <Card title="Extra Payment Comparison">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Extra /mo</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Payoff</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Time Saved</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Interest Saved</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Total Extra</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Per $1</th>
                </tr>
              </thead>
              <tbody>
                {calc.extra.comparisons.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${c.border}22`, background: row.extra === extraPayment ? `${c.cyan}15` : 'transparent' }}>
                    <td style={{ padding: '10px 8px', fontWeight: row.extra === extraPayment ? 600 : 400, color: row.extra === extraPayment ? c.cyan : c.text }}>{fmt(row.extra)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.text }}>{row.years.toFixed(1)} yrs</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.cyan }}>{(row.timeSaved / 12).toFixed(1)} yrs</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: '#4ade80', fontWeight: 500 }}>{fmt(row.interestSaved)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.muted }}>{fmt(row.totalExtra)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: '#4ade80' }}>${row.perDollar.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
