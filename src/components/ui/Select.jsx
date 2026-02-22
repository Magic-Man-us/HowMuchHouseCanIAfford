import { c } from '../../constants/theme';

export function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, color: c.muted, marginBottom: 6 }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0a0a0b', border: `1px solid ${c.border}`, borderRadius: 8, color: c.text, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
        {options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
      </select>
    </div>
  );
}
