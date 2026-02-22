import { c } from '../../constants/theme';
import { Card, Input } from '../ui';
import { fmt, fmt2 } from '../../utils/formatters';

export function SummaryTab({ calc, renovationBudget, movingCosts, furnitureAppliances, currentRent, setCurrentRent }) {
  const rows = [
    ['Down Payment', calc.downPayment],
    ['Closing Costs', calc.closingCosts],
  ];
  if (calc.sellerCredits > 0) rows.push(['Seller Credits', -calc.sellerCredits]);
  if (calc.pointsCost > 0) rows.push(['Discount Points', calc.pointsCost]);
  if (calc.upfrontMIP > 0) rows.push(['Upfront MIP / Guarantee', calc.upfrontMIP]);
  rows.push(
    ['Prepaid Items', calc.prepaidItems],
    ['Renovation Budget', renovationBudget],
    ['Moving Costs', movingCosts],
    ['Furniture & Appliances', furnitureAppliances],
  );

  const rvb = calc.rentVsBuy;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <Card title="Total Cash Needed" accent={c.warning}>
        {rows.map(([label, val], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${c.border}22` }}>
            <span style={{ fontSize: 13, color: val < 0 ? '#4ade80' : c.muted }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: val < 0 ? '#4ade80' : c.text }}>{fmt(val)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', marginTop: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Total Upfront</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: c.warning }}>{fmt(calc.totalUpfront)}</span>
        </div>
        <div style={{ background: '#0a0a0b', borderRadius: 12, padding: 16, marginTop: 8 }}>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 8 }}>Recommended Reserves</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: c.accent }}>{fmt(calc.recommendedReserves)}</div>
          <div style={{ fontSize: 11, color: c.dim, marginTop: 4 }}>6 months expenses</div>
        </div>
      </Card>

      <Card title="First Year Costs" accent={c.accent2}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 4 }}>With 30-Year Loan</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{fmt(calc.firstYearTotal30)}</div>
        </div>
        <div style={{ paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 4 }}>With 15-Year Loan</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{fmt(calc.firstYearTotal15)}</div>
        </div>
        {calc.loan30.monthlyTaxDeduction > 0 && (
          <div style={{ background: '#4ade8015', borderRadius: 12, padding: 16, marginTop: 16 }}>
            <div style={{ fontSize: 12, color: c.muted, marginBottom: 4 }}>Monthly Tax Deduction Savings</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#4ade80' }}>{fmt2(calc.loan30.monthlyTaxDeduction)}/mo</div>
            <div style={{ fontSize: 11, color: c.dim, marginTop: 4 }}>
              After-tax monthly cost: {fmt2(calc.loan30.afterTaxTotal)}
            </div>
          </div>
        )}
      </Card>

      {/* Rent vs Buy */}
      <div style={{ gridColumn: 'span 2' }}>
        <Card title="Rent vs Buy Analysis" accent={c.cyan}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <Input label="Current Monthly Rent" value={currentRent} onChange={setCurrentRent} prefix="$" suffix="/mo" min={0} max={50000} fieldKey="currentRent" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0a0a0b', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', marginBottom: 6 }}>Renting</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{fmt2(rvb.monthlyRent)}</div>
                <div style={{ fontSize: 11, color: c.dim }}>/month</div>
              </div>
              <div style={{ background: `${c.cyan}15`, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${c.cyan}33` }}>
                <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', marginBottom: 6 }}>True Cost to Own</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: c.cyan }}>{fmt2(rvb.trueMonthlyCostOwn)}</div>
                <div style={{ fontSize: 11, color: c.dim }}>/month (after tax + appreciation)</div>
              </div>
            </div>
          </div>

          {rvb.monthlySavingsVsRent > 0 ? (
            <div style={{ background: '#4ade8015', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#4ade80', marginBottom: 4 }}>
                Buying saves you {fmt2(rvb.monthlySavingsVsRent)}/mo vs renting
              </div>
              <div style={{ fontSize: 12, color: c.dim }}>
                After accounting for mortgage interest tax deduction, appreciation, and maintenance
              </div>
            </div>
          ) : (
            <div style={{ background: '#f8717115', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f87171', marginBottom: 4 }}>
                Renting is {fmt2(Math.abs(rvb.monthlySavingsVsRent))}/mo cheaper (short-term)
              </div>
              <div style={{ fontSize: 12, color: c.dim }}>
                But equity buildup and appreciation may still make buying worthwhile long-term
              </div>
            </div>
          )}

          {/* Projections table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Timeline</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Home Value</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Equity</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Own: Net Wealth</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Rent: Net Wealth</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', color: c.muted, fontWeight: 500 }}>Buy Advantage</th>
                </tr>
              </thead>
              <tbody>
                {rvb.projections.map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${c.border}22` }}>
                    <td style={{ padding: '10px 8px', fontWeight: 500 }}>{p.years} years</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.text }}>{fmt(p.homeValue)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.accent }}>{fmt(p.equity)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.cyan, fontWeight: 500 }}>{fmt(p.ownNetWealth)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: c.muted }}>{fmt(p.rentNetWealth)}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: p.buyAdvantage > 0 ? '#4ade80' : '#f87171', fontWeight: 600 }}>
                      {p.buyAdvantage > 0 ? '+' : ''}{fmt(p.buyAdvantage)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 11, color: c.dim, marginTop: 12, padding: '8px 12px', background: '#0a0a0b', borderRadius: 8 }}>
            Assumes 3% annual rent increases, 1% annual maintenance cost, 7% investment return for renter's saved capital.
            Rent at year {rvb.projections[rvb.projections.length - 1]?.years}: {fmt2(rvb.projections[rvb.projections.length - 1]?.monthlyRentAtEnd)}/mo
          </div>
        </Card>
      </div>
    </div>
  );
}
