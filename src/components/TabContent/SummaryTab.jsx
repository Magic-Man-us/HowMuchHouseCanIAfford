import { c } from '../../constants/theme';
import { Card } from '../ui';
import { fmt } from '../../utils/formatters';

export function SummaryTab({ calc, renovationBudget, movingCosts, furnitureAppliances }) {
  const rows = [
    ['Down Payment', calc.downPayment],
    ['Closing Costs', calc.closingCosts],
  ];
  if (calc.pointsCost > 0) rows.push(['Discount Points', calc.pointsCost]);
  if (calc.upfrontMIP > 0) rows.push(['Upfront MIP / Guarantee', calc.upfrontMIP]);
  rows.push(
    ['Prepaid Items', calc.prepaidItems],
    ['Renovation Budget', renovationBudget],
    ['Moving Costs', movingCosts],
    ['Furniture & Appliances', furnitureAppliances],
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <Card title="Total Cash Needed" accent={c.warning}>
        {rows.map(([label, val], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${c.border}22` }}>
            <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{fmt(val)}</span>
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
      </Card>
    </div>
  );
}
