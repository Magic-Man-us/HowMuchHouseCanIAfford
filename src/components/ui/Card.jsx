import { c } from '../../constants/theme';

export function Card({ title, children, accent, style: customStyle }) {
  return (
    <div style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: 20, marginBottom: 16, position: 'relative', overflow: 'hidden', ...customStyle }}>
      {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent }} />}
      {title && <h3 style={{ fontSize: 11, fontWeight: 600, color: c.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{title}</h3>}
      {children}
    </div>
  );
}
