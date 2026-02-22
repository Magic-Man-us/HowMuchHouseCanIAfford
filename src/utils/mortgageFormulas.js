export const JUMBO_THRESHOLD = 766550;

export const calculatePayment = (principal, rate, years) => {
  const r = rate / 100 / 12;
  const n = years * 12;
  return r === 0 ? principal / n : principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

export const remainingBalance = (principal, rate, years, paymentsMade) => {
  const r = rate / 100 / 12;
  const monthlyPmt = calculatePayment(principal, rate, years);
  return principal * Math.pow(1 + r, paymentsMade) - monthlyPmt * (Math.pow(1 + r, paymentsMade) - 1) / r;
};

export const calcPayoffWithExtra = (principal, rate, years, extraMonthly) => {
  const r = rate / 100 / 12;
  const minPayment = calculatePayment(principal, rate, years);
  const totalPayment = minPayment + extraMonthly;

  let balance = principal;
  let months = 0;
  let totalInterest = 0;
  let totalPaid = 0;

  while (balance > 0 && months < years * 12 + 120) {
    const interestPayment = balance * r;
    const principalPayment = Math.min(totalPayment - interestPayment, balance);
    totalInterest += interestPayment;
    totalPaid += Math.min(totalPayment, balance + interestPayment);
    balance -= principalPayment;
    months++;
  }

  return { months, totalInterest, totalPaid, minPayment };
};
