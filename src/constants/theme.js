export const c = {
  bg: '#09090b',
  card: '#18181b',
  border: '#27272a',
  text: '#fafafa',
  muted: '#a1a1aa',
  dim: '#71717a',
  accent: '#6366f1',
  accent2: '#10b981',
  warning: '#f59e0b',
  pink: '#ec4899',
  cyan: '#06b6d4',
};

export const dtiColor = (d) =>
  d <= 28 ? '#4ade80' : d <= 36 ? '#facc15' : d <= 43 ? '#fb923c' : '#f87171';

export const dtiLabel = (d) =>
  d <= 28 ? 'Excellent' : d <= 36 ? 'Good' : d <= 43 ? 'Caution' : 'High';
