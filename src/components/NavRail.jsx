import { c } from '../constants/theme';

const sections = [
  { id: 'loans', label: 'Loans', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/><path d="M10 3v18"/></svg> },
  { id: 'costs', label: 'Costs', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { id: 'summary', label: 'Summary', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg> },
  { id: 'extra', label: 'Extra', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg> },
  { id: 'refi', label: 'Refi', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg> },
];

export function NavRail({ activeSection, setActiveSection, onExport, onSave, onLoad, onShare, shareTooltip }) {
  return (
    <div style={{
      width: 72,
      background: '#0a0a0b',
      borderRight: `1px solid ${c.border}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20,
      flexShrink: 0,
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
    }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: c.accent, marginBottom: 24 }}>HC</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, width: '100%', padding: '0 6px' }}>
        {sections.map(({ id, label, icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '10px 4px',
                borderRadius: 10,
                border: 'none',
                background: isActive ? `${c.accent}20` : 'transparent',
                color: isActive ? c.accent : c.dim,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                width: '100%',
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16, width: '100%', padding: '0 6px' }}>
        {[
          { label: 'Save', onClick: onSave, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> },
          { label: 'Load', onClick: onLoad, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> },
          { label: shareTooltip || 'Share', onClick: onShare, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
          { label: 'Print', onClick: onExport, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
        ].map(({ label, onClick, icon }, i) => (
          <button
            key={i}
            onClick={onClick}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '8px 4px',
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              color: c.muted,
              cursor: 'pointer',
              fontSize: 9,
              width: '100%',
              transition: 'color 0.15s',
            }}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
