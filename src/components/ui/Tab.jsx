import { c } from '../../constants/theme';

export function Tab({ id, label, active, onClick }) {
  return (
    <button onClick={() => onClick(id)} style={{ padding: '8px 16px', background: active ? `${c.accent}22` : 'transparent', border: `1px solid ${active ? c.accent + '44' : 'transparent'}`, borderRadius: 8, color: active ? '#a5b4fc' : c.dim, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{label}</button>
  );
}
