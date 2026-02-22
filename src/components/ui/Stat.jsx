import { c } from '../../constants/theme';

export function Stat({ label, value, sub, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: color || c.text }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: c.dim, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
