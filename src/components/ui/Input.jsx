import { useState, useEffect } from 'react';
import { c } from '../../constants/theme';
import { Tooltip } from './Tooltip';
import { InfoPanel } from './InfoPanel';
import { fieldHelp } from '../../constants/fieldHelp';

export function Input({ label, value, onChange, prefix, suffix, step = 1, small, min, max, tooltip, highlightBorder, fieldKey }) {
  const [localValue, setLocalValue] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  const help = fieldKey ? fieldHelp[fieldKey] : null;
  const hintText = help?.hint || tooltip;

  const formatDisplay = (num) => {
    if (num === 0) return '0';
    if (!Number.isInteger(num)) return String(num);
    return num.toLocaleString('en-US');
  };

  useEffect(() => {
    if (!isFocused) setLocalValue(String(value));
  }, [value, isFocused]);

  const parseInput = (raw) => {
    const stripped = raw.replace(/[^0-9.\-]/g, '');
    return parseFloat(stripped) || 0;
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    let num = parseInput(e.target.value);
    if (min !== undefined && num < min) num = min;
    if (max !== undefined && num > max) num = max;
    onChange(num);
  };

  return (
    <div style={{ marginBottom: small ? 12 : 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: c.muted, marginBottom: 6 }}>
        {label}
        {help && <InfoPanel fieldKey={fieldKey} helpData={help} />}
        {!help && hintText && (
          <Tooltip text={hintText}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.dim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'help' }}>
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </Tooltip>
        )}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          {prefix && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.dim, fontSize: 14 }}>{prefix}</span>}
          <Tooltip text={hintText}>
            <input
              type="text"
              inputMode="decimal"
              value={isFocused ? localValue : formatDisplay(value)}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setLocalValue(e.target.value)}
              onBlur={handleBlur}
              step={step}
              style={{
                width: '100%',
                padding: small ? '8px 12px' : '10px 12px',
                paddingLeft: prefix ? 24 : 12,
                background: '#0a0a0b',
                border: `1px solid ${highlightBorder ? c.accent : c.border}`,
                borderRadius: 8,
                color: c.text,
                fontSize: 14,
                outline: 'none',
              }}
            />
          </Tooltip>
        </div>
        {suffix && <span style={{ fontSize: 12, color: c.dim, whiteSpace: 'nowrap' }}>{suffix}</span>}
      </div>
    </div>
  );
}
