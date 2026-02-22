import { fmt, pct } from './formatters';
import { lenders } from '../constants/lenders';

export function exportReport({ calc, inputs }) {
  const {
    totalIncome, creditScore, employmentType, assets,
    homePrice, downPaymentPercent, propertyType, propertyUse,
    loanType, discountPoints, rateType,
    selectedLender, customLenderName,
  } = inputs;

  const lenderName = selectedLender === 'custom' ? (customLenderName || 'Custom') : lenders[selectedLender].name;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the report.');
    return;
  }
  const doc = printWindow.document;

  const style = doc.createElement('style');
  style.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; color: #1a1a2e; background: #fff; padding: 40px; max-width: 900px; margin: 0 auto; line-height: 1.6; }
    h1 { font-size: 24px; margin-bottom: 4px; color: #1a1a2e; }
    h2 { font-size: 16px; margin: 28px 0 12px; color: #6366f1; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px; }
    .subtitle { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
    .card-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-bottom: 12px; font-weight: 600; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
    .row:last-child { border-bottom: none; }
    .row-label { color: #6b7280; font-size: 13px; }
    .row-value { font-weight: 600; font-size: 13px; }
    .highlight { font-size: 28px; font-weight: 700; color: #1a1a2e; }
    .highlight-sub { font-size: 12px; color: #6b7280; }
    .disclaimer { margin-top: 32px; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 11px; color: #9ca3af; line-height: 1.6; }
    @media print { body { padding: 20px; } }
  `;
  doc.head.appendChild(style);
  doc.title = 'Mortgage Report';

  function makeRow(label, value, extraStyle) {
    const div = doc.createElement('div');
    div.className = 'row';
    const lbl = doc.createElement('span');
    lbl.className = 'row-label';
    lbl.textContent = label;
    const val = doc.createElement('span');
    val.className = 'row-value';
    if (extraStyle) val.style.cssText = extraStyle;
    val.textContent = value;
    div.appendChild(lbl);
    div.appendChild(val);
    return div;
  }

  function makeCard(title, rows) {
    const card = doc.createElement('div');
    card.className = 'card';
    if (title) {
      const t = doc.createElement('div');
      t.className = 'card-title';
      t.textContent = title;
      card.appendChild(t);
    }
    rows.forEach(r => card.appendChild(r));
    return card;
  }

  function makeSection(title) {
    const h = doc.createElement('h2');
    h.textContent = title;
    return h;
  }

  function makeGrid(cards) {
    const g = doc.createElement('div');
    g.className = 'grid';
    cards.forEach(card => g.appendChild(card));
    return g;
  }

  const body = doc.body;

  const h1 = doc.createElement('h1');
  h1.textContent = 'Mortgage Analysis Report';
  body.appendChild(h1);

  const sub = doc.createElement('p');
  sub.className = 'subtitle';
  sub.textContent = 'Generated ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  body.appendChild(sub);

  // Borrower Profile
  body.appendChild(makeSection('Borrower Profile'));
  body.appendChild(makeGrid([
    makeCard('Income & Employment', [
      makeRow('Total Annual Income', fmt(totalIncome)),
      makeRow('Monthly Gross', fmt(calc.monthlyIncome)),
      makeRow('Employment Type', employmentType),
      makeRow('Assets / Savings', fmt(assets)),
      makeRow('Credit Score', String(creditScore)),
    ]),
    makeCard('Monthly Debts', [
      makeRow('Total Monthly Debt', fmt(calc.monthlyDebt) + '/mo'),
      makeRow('Max Housing Budget', fmt(calc.maxHousing) + '/mo'),
    ]),
  ]));

  // Property & Loan
  body.appendChild(makeSection('Property & Loan'));
  body.appendChild(makeGrid([
    makeCard('Property', [
      makeRow('Home Price', fmt(homePrice)),
      makeRow('Down Payment', downPaymentPercent + '% (' + fmt(calc.downPayment) + ')'),
      makeRow('Loan Amount', fmt(calc.loanAmount)),
      makeRow('Property Type', propertyType),
      makeRow('Property Use', propertyUse),
    ]),
    makeCard('Loan Structure', [
      makeRow('Loan Type', loanType.toUpperCase()),
      makeRow('Rate Type', rateType),
      makeRow('Discount Points', String(discountPoints)),
      makeRow('Lender', lenderName),
    ]),
  ]));

  // Loan Comparison
  body.appendChild(makeSection('Loan Comparison'));
  function makeLoanCard(title, loan) {
    const card = doc.createElement('div');
    card.className = 'card';
    const t = doc.createElement('div');
    t.className = 'card-title';
    t.textContent = title;
    card.appendChild(t);
    const hl = doc.createElement('div');
    hl.className = 'highlight';
    hl.textContent = fmt(Math.round(loan.total));
    card.appendChild(hl);
    const hlSub = doc.createElement('div');
    hlSub.className = 'highlight-sub';
    hlSub.textContent = 'per month at ' + pct(loan.rate);
    card.appendChild(hlSub);
    const spacer = doc.createElement('div');
    spacer.style.marginTop = '12px';
    spacer.appendChild(makeRow('P&I', fmt(Math.round(loan.principal))));
    spacer.appendChild(makeRow('Front DTI', pct(loan.frontDTI)));
    spacer.appendChild(makeRow('Back DTI', pct(loan.backDTI)));
    spacer.appendChild(makeRow('Total Interest', fmt(Math.round(loan.totalInterest))));
    card.appendChild(spacer);
    return card;
  }
  body.appendChild(makeGrid([
    makeLoanCard('30-Year Fixed', calc.loan30),
    makeLoanCard('15-Year Fixed', calc.loan15),
  ]));

  // Costs Breakdown
  body.appendChild(makeSection('Costs Breakdown'));
  const costRows = [makeRow('Closing Costs', fmt(Math.round(calc.closingCosts)))];
  if (calc.pointsCost > 0) costRows.push(makeRow('Discount Points Cost', fmt(Math.round(calc.pointsCost))));
  if (calc.upfrontMIP > 0) costRows.push(makeRow('Upfront MIP/Guarantee Fee', fmt(Math.round(calc.upfrontMIP))));
  costRows.push(makeRow('Prepaid Items', fmt(Math.round(calc.prepaidItems))));
  costRows.push(makeRow('Total Closing', fmt(Math.round(calc.totalClosingCosts)), 'color:#f59e0b;font-size:15px'));
  body.appendChild(makeCard(null, costRows));

  // Cash Summary
  body.appendChild(makeSection('Cash Summary'));
  body.appendChild(makeCard(null, [
    makeRow('Down Payment', fmt(Math.round(calc.downPayment))),
    makeRow('Total Closing Costs', fmt(Math.round(calc.totalClosingCosts))),
    makeRow('Cash to Close', fmt(Math.round(calc.cashToClose)), 'font-size:16px;color:#f59e0b'),
    makeRow('Total Upfront (incl. reno, moving, etc.)', fmt(Math.round(calc.totalUpfront))),
    makeRow('Recommended Reserves (6mo)', fmt(Math.round(calc.recommendedReserves))),
  ]));

  // Disclaimer
  const disclaimer = doc.createElement('div');
  disclaimer.className = 'disclaimer';
  const strong = doc.createElement('strong');
  strong.textContent = 'Disclaimer: ';
  disclaimer.appendChild(strong);
  disclaimer.appendChild(doc.createTextNode(
    'This report is for informational purposes only and does not constitute financial advice. ' +
    'All figures are estimates based on the inputs provided and may not reflect actual loan terms, rates, or costs. ' +
    'Interest rates, fees, and loan programs vary by lender and are subject to change. PMI, MIP, and funding fee ' +
    'calculations are approximate. Consult with a licensed mortgage professional before making any financial decisions.'
  ));
  body.appendChild(disclaimer);

  printWindow.focus();
  setTimeout(() => printWindow.print(), 300);
}
