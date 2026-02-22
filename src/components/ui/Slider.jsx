import { c } from '../../constants/theme';

export function Slider({ value, onChange, min, max, step = 1, color, title }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ position: 'relative', height: 32, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, height: 6, background: '#3f3f46', borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 6, background: color || c.accent, borderRadius: 3 }} />
      <input type="range" min={min} max={max} step={step} value={value} title={title} onChange={(e) => onChange(Number(e.target.value))} style={{ position: 'absolute', width: '100%', height: 32, opacity: 0, cursor: 'pointer' }} />
      <div style={{ position: 'absolute', left: `${pct}%`, width: 18, height: 18, background: color || c.accent, borderRadius: '50%', transform: 'translateX(-50%)', boxShadow: `0 2px 8px ${color || c.accent}66`, pointerEvents: 'none' }} />
    </div>
  );
}
