import { useState, useEffect, useRef, useCallback } from 'react';
import { c } from '../../constants/theme';

export function InfoPanel({ fieldKey, helpData }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  const info = helpData?.info;
  if (!info) return null;

  const updatePosition = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const panelW = 340;
    const panelH = 380;
    let top = rect.bottom + 6;
    let left = rect.left;
    if (left + panelW > window.innerWidth - 12) left = window.innerWidth - panelW - 12;
    if (left < 12) left = 12;
    if (top + panelH > window.innerHeight - 12) top = rect.top - panelH - 6;
    setPos({ top, left });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onScroll = () => updatePosition();
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open, updatePosition]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 16, height: 16, borderRadius: '50%',
          background: open ? c.accent : 'transparent',
          border: `1.5px solid ${open ? c.accent : c.dim}`,
          color: open ? '#fff' : c.dim,
          fontSize: 10, fontWeight: 700, fontStyle: 'italic', fontFamily: 'Georgia, serif',
          cursor: 'pointer', padding: 0, lineHeight: 1, flexShrink: 0,
          transition: 'all 0.15s',
        }}
        aria-label={`Info about ${info.title || fieldKey}`}
      >
        i
      </button>
      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed', top: pos.top, left: pos.left,
            width: 340, maxHeight: 380, overflowY: 'auto',
            background: '#1c1c20', border: `1px solid ${c.border}`,
            borderRadius: 12, padding: 0,
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', borderBottom: `1px solid ${c.border}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{info.title || fieldKey}</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', color: c.dim,
                cursor: 'pointer', padding: 2, fontSize: 16, lineHeight: 1,
              }}
            >&times;</button>
          </div>
          {/* Body */}
          <div style={{ padding: '12px 16px' }}>
            {info.description && (
              <p style={{ fontSize: 12, lineHeight: 1.6, color: c.muted, margin: '0 0 12px' }}>{info.description}</p>
            )}
            {info.formula && (
              <pre style={{
                fontSize: 11, lineHeight: 1.5, color: c.accent,
                background: '#0a0a0b', borderRadius: 8, padding: '10px 12px',
                margin: '0 0 12px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                border: `1px solid ${c.border}`,
              }}>{info.formula}</pre>
            )}
            {info.details && (
              <p style={{ fontSize: 12, lineHeight: 1.6, color: c.dim, margin: '0 0 12px' }}>{info.details}</p>
            )}
            {info.links && info.links.length > 0 && (
              <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 10 }}>
                {info.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', fontSize: 11, color: c.accent,
                      textDecoration: 'none', marginBottom: 4,
                    }}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
