import { c } from '../../constants/theme';
import { Card, Input } from '../ui';
import { fmt } from '../../utils/formatters';

export function CostsTab({
  calc,
  closingCostPercent, setClosingCostPercent,
  sellerCredits, setSellerCredits,
  inspectionFee, setInspectionFee,
  appraisalFee, setAppraisalFee,
  titleInsurance, setTitleInsurance,
  renovationBudget, setRenovationBudget,
  movingCosts, setMovingCosts,
  furnitureAppliances, setFurnitureAppliances,
  loanType,
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <Card title="Closing Costs">
        <Input label="Closing Cost %" value={closingCostPercent} onChange={setClosingCostPercent} suffix="% of loan" step={0.5} min={0} max={10} fieldKey="closingCostPercent" />
        <div style={{ fontSize: 12, color: c.dim, marginBottom: 16 }}>Typically 2-5%</div>
        <Input label="Inspection Fee" value={inspectionFee} onChange={setInspectionFee} prefix="$" min={0} max={10000} fieldKey="inspectionFee" />
        <Input label="Appraisal Fee" value={appraisalFee} onChange={setAppraisalFee} prefix="$" min={0} max={10000} fieldKey="appraisalFee" />
        <Input label="Title Insurance" value={titleInsurance || Math.round(calc.estimatedTitleInsurance)} onChange={setTitleInsurance} prefix="$" min={0} max={100000} fieldKey="titleInsurance" />
        <Input label="Seller Credits" value={sellerCredits} onChange={setSellerCredits} prefix="$" min={0} max={100000} fieldKey="sellerCredits" />
        <div style={{ paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          {[
            ['Lender Closing Costs', calc.closingCosts],
            ['Inspection & Appraisal', inspectionFee + appraisalFee],
            ['Title Insurance', titleInsurance || calc.estimatedTitleInsurance],
            ['Prepaid (3mo escrow)', calc.prepaidItems],
            calc.pointsCost > 0 && ['Discount Points', calc.pointsCost, c.accent],
            calc.upfrontMIP > 0 && [loanType === 'fha' ? 'Upfront MIP (1.75%)' : 'Upfront Guarantee (1%)', calc.upfrontMIP, '#fb923c'],
            sellerCredits > 0 && ['Seller Credits', -sellerCredits, '#4ade80'],
          ].filter(Boolean).map(([label, val, color], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontSize: 12, color: color || c.muted }}>{label}</span>
              <span style={{ fontSize: 12, color: color || c.text }}>{fmt(val)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', marginTop: 8, borderTop: `1px solid ${c.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total Closing</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: c.warning }}>{fmt(calc.totalClosingCosts)}</span>
          </div>
        </div>
      </Card>
      <Card title="Post-Purchase Costs">
        <Input label="Renovation Budget" value={renovationBudget} onChange={setRenovationBudget} prefix="$" min={0} max={10000000} fieldKey="renovationBudget" />
        <Input label="Moving Costs" value={movingCosts} onChange={setMovingCosts} prefix="$" min={0} max={100000} fieldKey="movingCosts" />
        <Input label="Furniture & Appliances" value={furnitureAppliances} onChange={setFurnitureAppliances} prefix="$" min={0} max={1000000} fieldKey="furnitureAppliances" />
        <div style={{ paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total Post-Purchase</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: c.accent2 }}>{fmt(renovationBudget + movingCosts + furnitureAppliances)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
