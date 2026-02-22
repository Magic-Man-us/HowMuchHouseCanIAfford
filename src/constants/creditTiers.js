export const getCreditAdjustment = (score) => {
  if (score >= 760) return 0;
  if (score >= 740) return 0.125;
  if (score >= 720) return 0.25;
  if (score >= 700) return 0.375;
  if (score >= 680) return 0.5;
  if (score >= 660) return 0.75;
  if (score >= 640) return 1.0;
  if (score >= 620) return 1.25;
  return 1.5;
};

export const getCreditTier = (score) => {
  if (score >= 760) return { label: 'Excellent', color: '#4ade80' };
  if (score >= 740) return { label: 'Very Good', color: '#4ade80' };
  if (score >= 720) return { label: 'Good', color: '#a3e635' };
  if (score >= 700) return { label: 'Good', color: '#facc15' };
  if (score >= 680) return { label: 'Fair', color: '#fb923c' };
  if (score >= 660) return { label: 'Fair', color: '#fb923c' };
  if (score >= 640) return { label: 'Poor', color: '#f87171' };
  return { label: 'Very Poor', color: '#f87171' };
};
