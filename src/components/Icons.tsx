type P = { size?: number; style?: React.CSSProperties };

const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export const ArrowRight = ({ size = 18, style }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" style={style} {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const DownloadIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...base}>
    <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
  </svg>
);

export const CloseIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const FocusIcon = ({ kind }: { kind: 'ai' | 'realtime' | 'platform' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.6" {...base}>
    {kind === 'ai' && (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5" />
      </>
    )}
    {kind === 'realtime' && <path d="M3 12h4l3-8 4 16 3-8h4" />}
    {kind === 'platform' && (
      <>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </>
    )}
  </svg>
);
