import { c } from '../../constants/theme';
import { Tooltip } from './Tooltip';
import { InfoPanel } from './InfoPanel';
import { fieldHelp } from '../../constants/fieldHelp';

export function Select({ label, value, onChange, options, fieldKey }) {
  const help = fieldKey ? fieldHelp[fieldKey] : null;
  const hintText = help?.hint;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: c.muted, marginBottom: 6 }}>
        {label}
        {help && <InfoPanel fieldKey={fieldKey} helpData={help} />}
      </label>
      <Tooltip text={hintText}>
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0a0a0b', border: `1px solid ${c.border}`, borderRadius: 8, color: c.text, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
          {options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
        </select>
      </Tooltip>
    </div>
  );
}
