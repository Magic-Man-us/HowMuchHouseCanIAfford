import { useState, useCallback, useEffect, useRef } from 'react';
import { lenders } from './constants/lenders';
import { getCreditAdjustment, getCreditTier } from './constants/creditTiers';
import { c } from './constants/theme';
import { fmt } from './utils/formatters';
import { useMortgageCalculations } from './hooks/useMortgageCalculations';
import { exportReport } from './utils/exportReport';
import { saveScenario, loadScenario } from './utils/saveLoad';
import { encodeStateToUrl, decodeStateFromUrl } from './utils/urlParams';
import { Stat } from './components/ui';
import { NavRail } from './components/NavRail';
import { Sidebar } from './components/Sidebar';
import { LoansTab, CostsTab, SummaryTab, ExtraPaymentsTab, RefinanceTab } from './components/TabContent';

export default function App() {
  // Borrower Profile
  const [totalIncome, setTotalIncome] = useState(200000);
  const [creditScore, setCreditScore] = useState(850);
  const [employmentType, setEmploymentType] = useState('W-2');
  const [assets, setAssets] = useState(0);

  // Monthly Debts
  const [studentLoans, setStudentLoans] = useState(500);
  const [carPayment, setCarPayment] = useState(0);
  const [creditCards, setCreditCards] = useState(0);
  const [otherDebt, setOtherDebt] = useState(0);

  // Property & Taxes
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [propertyType, setPropertyType] = useState('Single Family');
  const [propertyUse, setPropertyUse] = useState('Primary');
  const [propertyState, setPropertyState] = useState('');
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1);
  const [homeInsurance, setHomeInsurance] = useState(150);
  const [hoaFees, setHoaFees] = useState(0);

  // Loan Structure
  const [loanType, setLoanType] = useState('conventional');
  const [rateType, setRateType] = useState('Fixed');
  const [discountPoints, setDiscountPoints] = useState(0);

  // Lender & Rates
  const [selectedLender, setSelectedLender] = useState('navy');
  const [customLenderName, setCustomLenderName] = useState('');
  const [savedCustomRates, setSavedCustomRates] = useState(null);
  const [rate30Base, setRate30Base] = useState(lenders.navy.r30);
  const [rate15Base, setRate15Base] = useState(lenders.navy.r15);
  const [rateJumbo30Base, setRateJumbo30Base] = useState(lenders.navy.j30);
  const [rateJumbo15Base, setRateJumbo15Base] = useState(lenders.navy.j15);

  // Upfront Costs
  const [closingCostPercent, setClosingCostPercent] = useState(3);
  const [inspectionFee, setInspectionFee] = useState(500);
  const [appraisalFee, setAppraisalFee] = useState(550);
  const [titleInsurance, setTitleInsurance] = useState(0);
  const [renovationBudget, setRenovationBudget] = useState(0);
  const [movingCosts, setMovingCosts] = useState(3000);
  const [furnitureAppliances, setFurnitureAppliances] = useState(5000);

  // Refinance
  const [refiYears, setRefiYears] = useState(5);
  const [refiRate, setRefiRate] = useState(5.5);
  const [refiTerm, setRefiTerm] = useState(30);
  const [refiClosingPercent, setRefiClosingPercent] = useState(2);

  // Extra Payments
  const [extraPayment, setExtraPayment] = useState(200);
  const [extraPaymentLoan, setExtraPaymentLoan] = useState('30');

  // UI
  const [activeSection, setActiveSection] = useState('loans');
  const [shareTooltip, setShareTooltip] = useState(null);
  const fileInputRef = useRef(null);

  const creditAdjustment = getCreditAdjustment(creditScore);
  const creditTier = getCreditTier(creditScore);

  const rate30 = rate30Base + creditAdjustment;
  const rate15 = rate15Base + creditAdjustment;
  const rateJumbo30 = rateJumbo30Base + creditAdjustment;
  const rateJumbo15 = rateJumbo15Base + creditAdjustment;

  const handleLenderChange = useCallback((lenderId) => {
    // Save current rates if leaving custom
    if (selectedLender === 'custom') {
      setSavedCustomRates({ r30: rate30Base, r15: rate15Base, j30: rateJumbo30Base, j15: rateJumbo15Base });
    }

    setSelectedLender(lenderId);

    if (lenderId === 'custom') {
      // Restore saved custom rates if they exist
      if (savedCustomRates) {
        setRate30Base(savedCustomRates.r30);
        setRate15Base(savedCustomRates.r15);
        setRateJumbo30Base(savedCustomRates.j30);
        setRateJumbo15Base(savedCustomRates.j15);
      }
      // If no saved rates, keep current rates (don't overwrite)
    } else {
      const l = lenders[lenderId];
      setRate30Base(l.r30);
      setRate15Base(l.r15);
      setRateJumbo30Base(l.j30);
      setRateJumbo15Base(l.j15);
    }
  }, [selectedLender, rate30Base, rate15Base, rateJumbo30Base, rateJumbo15Base, savedCustomRates]);

  const calc = useMortgageCalculations({
    totalIncome, studentLoans, carPayment, creditCards, otherDebt,
    homePrice, downPaymentPercent, propertyTaxRate, homeInsurance, hoaFees,
    rate30, rate15, rateJumbo30, rateJumbo15,
    closingCostPercent, inspectionFee, appraisalFee, titleInsurance,
    renovationBudget, movingCosts, furnitureAppliances,
    refiYears, refiRate, refiTerm, refiClosingPercent,
    extraPayment, extraPaymentLoan,
    loanType, discountPoints,
  });

  const handleExport = () => {
    exportReport({
      calc,
      inputs: {
        totalIncome, creditScore, employmentType, assets,
        homePrice, downPaymentPercent, propertyType, propertyUse,
        loanType, discountPoints, rateType,
        selectedLender, customLenderName,
      },
    });
  };

  const getState = useCallback(() => ({
    totalIncome, creditScore, employmentType, assets,
    studentLoans, carPayment, creditCards, otherDebt,
    homePrice, downPaymentPercent, propertyType, propertyUse, propertyState,
    propertyTaxRate, homeInsurance, hoaFees,
    loanType, rateType, discountPoints,
    selectedLender, customLenderName,
    rate30Base, rate15Base, rateJumbo30Base, rateJumbo15Base,
    closingCostPercent, inspectionFee, appraisalFee, titleInsurance,
    renovationBudget, movingCosts, furnitureAppliances,
    refiYears, refiRate, refiTerm, refiClosingPercent,
    extraPayment, extraPaymentLoan,
  }), [
    totalIncome, creditScore, employmentType, assets,
    studentLoans, carPayment, creditCards, otherDebt,
    homePrice, downPaymentPercent, propertyType, propertyUse, propertyState,
    propertyTaxRate, homeInsurance, hoaFees,
    loanType, rateType, discountPoints,
    selectedLender, customLenderName,
    rate30Base, rate15Base, rateJumbo30Base, rateJumbo15Base,
    closingCostPercent, inspectionFee, appraisalFee, titleInsurance,
    renovationBudget, movingCosts, furnitureAppliances,
    refiYears, refiRate, refiTerm, refiClosingPercent,
    extraPayment, extraPaymentLoan,
  ]);

  const setters = {
    totalIncome: setTotalIncome, creditScore: setCreditScore, employmentType: setEmploymentType, assets: setAssets,
    studentLoans: setStudentLoans, carPayment: setCarPayment, creditCards: setCreditCards, otherDebt: setOtherDebt,
    homePrice: setHomePrice, downPaymentPercent: setDownPaymentPercent, propertyType: setPropertyType, propertyUse: setPropertyUse, propertyState: setPropertyState,
    propertyTaxRate: setPropertyTaxRate, homeInsurance: setHomeInsurance, hoaFees: setHoaFees,
    loanType: setLoanType, rateType: setRateType, discountPoints: setDiscountPoints,
    selectedLender: setSelectedLender, customLenderName: setCustomLenderName,
    rate30Base: setRate30Base, rate15Base: setRate15Base, rateJumbo30Base: setRateJumbo30Base, rateJumbo15Base: setRateJumbo15Base,
    closingCostPercent: setClosingCostPercent, inspectionFee: setInspectionFee, appraisalFee: setAppraisalFee, titleInsurance: setTitleInsurance,
    renovationBudget: setRenovationBudget, movingCosts: setMovingCosts, furnitureAppliances: setFurnitureAppliances,
    refiYears: setRefiYears, refiRate: setRefiRate, refiTerm: setRefiTerm, refiClosingPercent: setRefiClosingPercent,
    extraPayment: setExtraPayment, extraPaymentLoan: setExtraPaymentLoan,
  };

  const applyState = useCallback((data) => {
    for (const [key, val] of Object.entries(data)) {
      if (setters[key]) setters[key](val);
    }
  }, []);

  // Hydrate from URL params on mount
  useEffect(() => {
    const urlState = decodeStateFromUrl();
    if (urlState) {
      applyState(urlState);
      // Clean URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleSave = () => saveScenario(getState);

  const handleLoad = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await loadScenario(file);
      applyState(data);
    } catch (err) {
      alert(err.message);
    }
    e.target.value = '';
  };

  const handleShare = async () => {
    const url = encodeStateToUrl(getState);
    try {
      await navigator.clipboard.writeText(url);
      setShareTooltip('Copied!');
      setTimeout(() => setShareTooltip(null), 2000);
    } catch {
      // Fallback: select from prompt
      window.prompt('Copy this URL to share your scenario:', url);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* NavRail */}
      <NavRail
        activeSection={activeSection} setActiveSection={setActiveSection}
        onExport={handleExport} onSave={handleSave} onLoad={handleLoad} onShare={handleShare}
        shareTooltip={shareTooltip}
      />
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />

      {/* Main layout */}
      <div style={{ display: 'flex', marginLeft: 72 }}>
        {/* Input Panel */}
        <div style={{ width: 320, flexShrink: 0, borderRight: `1px solid ${c.border}`, minHeight: '100vh', padding: '20px 16px', overflowY: 'auto' }}>
          <Sidebar
            totalIncome={totalIncome} setTotalIncome={setTotalIncome}
            creditScore={creditScore} setCreditScore={setCreditScore}
            creditTier={creditTier} creditAdjustment={creditAdjustment}
            employmentType={employmentType} setEmploymentType={setEmploymentType}
            assets={assets} setAssets={setAssets}
            studentLoans={studentLoans} setStudentLoans={setStudentLoans}
            carPayment={carPayment} setCarPayment={setCarPayment}
            creditCards={creditCards} setCreditCards={setCreditCards}
            otherDebt={otherDebt} setOtherDebt={setOtherDebt}
            homePrice={homePrice} setHomePrice={setHomePrice}
            downPaymentPercent={downPaymentPercent} setDownPaymentPercent={setDownPaymentPercent}
            propertyType={propertyType} setPropertyType={setPropertyType}
            propertyUse={propertyUse} setPropertyUse={setPropertyUse}
            propertyState={propertyState} setPropertyState={setPropertyState}
            propertyTaxRate={propertyTaxRate} setPropertyTaxRate={setPropertyTaxRate}
            homeInsurance={homeInsurance} setHomeInsurance={setHomeInsurance}
            hoaFees={hoaFees} setHoaFees={setHoaFees}
            loanType={loanType} setLoanType={setLoanType}
            rateType={rateType} setRateType={setRateType}
            discountPoints={discountPoints} setDiscountPoints={setDiscountPoints}
            selectedLender={selectedLender} handleLenderChange={handleLenderChange}
            customLenderName={customLenderName} setCustomLenderName={setCustomLenderName}
            rate30Base={rate30Base} setRate30Base={setRate30Base}
            rate15Base={rate15Base} setRate15Base={setRate15Base}
            rateJumbo30Base={rateJumbo30Base} setRateJumbo30Base={setRateJumbo30Base}
            rateJumbo15Base={rateJumbo15Base} setRateJumbo15Base={setRateJumbo15Base}
            rate30={rate30} rate15={rate15}
            calc={calc}
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px 32px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Mortgage Calculator</h1>
              <p style={{ color: c.dim, marginBottom: 24, fontSize: 14 }}>Complete home buying cost analysis</p>
            </div>
            <a
              href="https://github.com/Magic-Man-us"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: c.dim, transition: 'color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = c.text; }}
              onMouseLeave={e => { e.currentTarget.style.color = c.dim; }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>

          {/* KPI Stats Strip */}
          <div style={{ background: `linear-gradient(135deg, ${c.accent}15, ${c.accent2}10)`, borderRadius: 16, border: `1px solid ${c.accent}30`, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20 }}>
              <Stat label="Credit Score" value={creditScore} sub={creditTier.label} color={creditTier.color} />
              <Stat label="Max Home Price" value={fmt(calc.maxHome)} sub="at 36% DTI" color="#4ade80" />
              <Stat label="Selected Home" value={fmt(homePrice)} sub={`${fmt(calc.downPayment)} down`} />
              <Stat label="Cash to Close" value={fmt(calc.cashToClose)} sub="down + closing" color={c.warning} />
            </div>
          </div>

          {/* Tab content (no tab bar, NavRail controls section) */}
          {activeSection === 'loans' && (
            <LoansTab
              calc={calc} selectedLender={selectedLender}
              homeInsurance={homeInsurance} hoaFees={hoaFees}
              loanType={loanType}
            />
          )}

          {activeSection === 'costs' && (
            <CostsTab
              calc={calc}
              closingCostPercent={closingCostPercent} setClosingCostPercent={setClosingCostPercent}
              inspectionFee={inspectionFee} setInspectionFee={setInspectionFee}
              appraisalFee={appraisalFee} setAppraisalFee={setAppraisalFee}
              titleInsurance={titleInsurance} setTitleInsurance={setTitleInsurance}
              renovationBudget={renovationBudget} setRenovationBudget={setRenovationBudget}
              movingCosts={movingCosts} setMovingCosts={setMovingCosts}
              furnitureAppliances={furnitureAppliances} setFurnitureAppliances={setFurnitureAppliances}
              loanType={loanType}
            />
          )}

          {activeSection === 'summary' && (
            <SummaryTab calc={calc} renovationBudget={renovationBudget} movingCosts={movingCosts} furnitureAppliances={furnitureAppliances} />
          )}

          {activeSection === 'extra' && (
            <ExtraPaymentsTab calc={calc} extraPayment={extraPayment} setExtraPayment={setExtraPayment} extraPaymentLoan={extraPaymentLoan} setExtraPaymentLoan={setExtraPaymentLoan} />
          )}

          {activeSection === 'refi' && (
            <RefinanceTab
              calc={calc}
              refiYears={refiYears} setRefiYears={setRefiYears}
              refiRate={refiRate} setRefiRate={setRefiRate}
              refiTerm={refiTerm} setRefiTerm={setRefiTerm}
              refiClosingPercent={refiClosingPercent} setRefiClosingPercent={setRefiClosingPercent}
            />
          )}

          <p style={{ textAlign: 'center', fontSize: 12, color: c.dim, marginTop: 24 }}>Estimates only. Get quotes from lenders for actual rates and fees.</p>
        </div>
      </div>
    </div>
  );
}
