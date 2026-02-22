import { useState } from 'react';
import { c } from '../../constants/theme';

export function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: 8,
          padding: '8px 12px',
          background: '#3f3f46',
          color: c.text,
          fontSize: 12,
          lineHeight: 1.5,
          borderRadius: 8,
          whiteSpace: 'normal',
          width: 240,
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #3f3f46',
          }} />
        </div>
      )}
    </span>
  );
}
