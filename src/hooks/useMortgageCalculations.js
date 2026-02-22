import { useMemo } from 'react';
import { calculatePayment, remainingBalance, calcPayoffWithExtra, JUMBO_THRESHOLD } from '../utils/mortgageFormulas';

export function useMortgageCalculations({
  totalIncome, studentLoans, carPayment, creditCards, otherDebt,
  homePrice, downPaymentPercent, propertyTaxRate, homeInsurance, hoaFees,
  rate30, rate15, rateJumbo30, rateJumbo15,
  closingCostPercent, inspectionFee, appraisalFee, titleInsurance,
  renovationBudget, movingCosts, furnitureAppliances,
  refiYears, refiRate, refiTerm, refiClosingPercent,
  extraPayment, extraPaymentLoan,
  loanType, discountPoints,
}) {
  return useMemo(() => {
    const monthlyIncome = totalIncome / 12;
    const monthlyDebt = studentLoans + carPayment + creditCards + otherDebt;
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
    const isJumbo = loanAmount > JUMBO_THRESHOLD;

    // Discount points: reduce rate by 0.25% per point
    const pointsReduction = discountPoints * 0.25;
    const pointsCost = loanAmount * (discountPoints / 100);

    // PMI / MIP calculation based on loan type
    let pmi = 0;
    let pmiLabel = '';
    let upfrontMIP = 0;

    if (loanType === 'conventional') {
      if (downPaymentPercent < 20) {
        pmi = (loanAmount * 0.005) / 12;
        pmiLabel = 'PMI (0.5%)';
      }
    } else if (loanType === 'fha') {
      pmi = (loanAmount * 0.0055) / 12;
      pmiLabel = 'MIP (0.55%)';
      upfrontMIP = loanAmount * 0.0175;
    } else if (loanType === 'va') {
      pmi = 0;
      pmiLabel = '';
    } else if (loanType === 'usda') {
      pmi = (loanAmount * 0.0035) / 12;
      pmiLabel = 'Guarantee Fee (0.35%)';
      upfrontMIP = loanAmount * 0.01;
    }

    const closingCosts = loanAmount * (closingCostPercent / 100);
    const estimatedTitleInsurance = homePrice * 0.005;
    const prepaidItems = (monthlyTax * 3) + (homeInsurance * 3);
    const totalClosingCosts = closingCosts + inspectionFee + appraisalFee + (titleInsurance || estimatedTitleInsurance) + prepaidItems + pointsCost + upfrontMIP;

    const cashToClose = downPayment + totalClosingCosts;
    const totalUpfront = cashToClose + renovationBudget + movingCosts + furnitureAppliances;
    const recommendedReserves = (monthlyTax + homeInsurance + pmi + hoaFees + monthlyDebt) * 6;

    const make = (years, rate) => {
      const adjustedRate = Math.max(rate - pointsReduction, 0.125);
      const p = calculatePayment(loanAmount, adjustedRate, years);
      const total = p + monthlyTax + homeInsurance + pmi + hoaFees;
      return {
        principal: p,
        total,
        rate: adjustedRate,
        baseRate: rate,
        years,
        frontDTI: (total / monthlyIncome) * 100,
        backDTI: ((total + monthlyDebt) / monthlyIncome) * 100,
        totalInterest: (p * years * 12) - loanAmount,
      };
    };

    const loan30 = make(30, isJumbo ? rateJumbo30 : rate30);
    const loan15 = make(15, isJumbo ? rateJumbo15 : rate15);

    const firstYearTotal30 = totalUpfront + (loan30.total * 12);
    const firstYearTotal15 = totalUpfront + (loan15.total * 12);

    const maxHousing = (monthlyIncome * 0.36) - monthlyDebt;
    const r = ((isJumbo ? rateJumbo30 : rate30) - pointsReduction) / 100 / 12;
    const maxPrincipal = maxHousing - monthlyTax - homeInsurance - pmi - hoaFees;
    const maxLoan = maxPrincipal > 0 && r > 0 ? maxPrincipal * (Math.pow(1 + r, 360) - 1) / (r * Math.pow(1 + r, 360)) : 0;

    // Refinance calculations
    const currentRate = (isJumbo ? rateJumbo30 : rate30) - pointsReduction;
    const paymentsMadeAtRefi = refiYears * 12;
    const balanceAtRefi = remainingBalance(loanAmount, currentRate, 30, paymentsMadeAtRefi);
    const refiClosingCosts = balanceAtRefi * (refiClosingPercent / 100);

    const stayMonthlyPayment = loan30.principal;
    const stayRemainingPayments = (30 - refiYears) * 12;
    const stayTotalRemaining = stayMonthlyPayment * stayRemainingPayments;
    const stayTotalPaid = (loan30.principal * paymentsMadeAtRefi) + stayTotalRemaining;

    const refiMonthlyPayment = calculatePayment(balanceAtRefi, refiRate, refiTerm);
    const refiTotalPayments = refiMonthlyPayment * refiTerm * 12;
    const refiTotalPaid = (loan30.principal * paymentsMadeAtRefi) + refiClosingCosts + refiTotalPayments;

    const monthlySavings = stayMonthlyPayment - refiMonthlyPayment;
    const totalSavings = stayTotalPaid - refiTotalPaid;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refiClosingCosts / monthlySavings) : 0;

    const equityAtRefi = homePrice - balanceAtRefi;
    const ltv = (balanceAtRefi / homePrice) * 100;
    const pmiDropsAtRefi = ltv <= 80;

    // Extra payment calculations
    const selectedLoan = extraPaymentLoan === '30' ? loan30 : loan15;
    const selectedRate = selectedLoan.rate;
    const selectedYears = selectedLoan.years;

    const standardPayoff = calcPayoffWithExtra(loanAmount, selectedRate, selectedYears, 0);
    const acceleratedPayoff = calcPayoffWithExtra(loanAmount, selectedRate, selectedYears, extraPayment);

    const monthsSaved = standardPayoff.months - acceleratedPayoff.months;
    const interestSaved = standardPayoff.totalInterest - acceleratedPayoff.totalInterest;
    const totalExtraPaid = extraPayment * acceleratedPayoff.months;
    const interestSavedPerDollar = totalExtraPaid > 0 ? interestSaved / totalExtraPaid : 0;

    const extraPaymentComparisons = [100, 200, 300, 500, 750, 1000].map(extra => {
      const result = calcPayoffWithExtra(loanAmount, selectedRate, selectedYears, extra);
      const saved = standardPayoff.totalInterest - result.totalInterest;
      const timeSaved = standardPayoff.months - result.months;
      const totalExtra = extra * result.months;
      return { extra, months: result.months, years: result.months / 12, timeSaved, interestSaved: saved, perDollar: totalExtra > 0 ? saved / totalExtra : 0, totalExtra };
    });

    return {
      monthlyIncome, monthlyDebt, downPayment, loanAmount, isJumbo, pmi, pmiLabel, monthlyTax,
      loan30, loan15, pointsCost, upfrontMIP,
      maxHome: maxLoan / (1 - downPaymentPercent / 100), maxHousing, closingCosts, estimatedTitleInsurance,
      prepaidItems, totalClosingCosts, cashToClose, totalUpfront, recommendedReserves, firstYearTotal30, firstYearTotal15,
      refi: { balanceAtRefi, refiClosingCosts, stayMonthlyPayment, refiMonthlyPayment, monthlySavings, stayTotalPaid, refiTotalPaid, totalSavings, breakEvenMonths, breakEvenYears: breakEvenMonths / 12, equityAtRefi, ltv, pmiDropsAtRefi, newPayoffYear: refiYears + refiTerm, stayPayoffYear: 30 },
      extra: { selectedLoan, standardPayoff, acceleratedPayoff, monthsSaved, yearsSaved: monthsSaved / 12, interestSaved, totalExtraPaid, interestSavedPerDollar, comparisons: extraPaymentComparisons, newPayoffYears: acceleratedPayoff.months / 12, originalPayoffYears: standardPayoff.months / 12 },
    };
  }, [
    totalIncome, studentLoans, carPayment, creditCards, otherDebt,
    homePrice, downPaymentPercent, propertyTaxRate, homeInsurance, hoaFees,
    rate30, rate15, rateJumbo30, rateJumbo15,
    closingCostPercent, inspectionFee, appraisalFee, titleInsurance,
    renovationBudget, movingCosts, furnitureAppliances,
    refiYears, refiRate, refiTerm, refiClosingPercent,
    extraPayment, extraPaymentLoan,
    loanType, discountPoints,
  ]);
}
