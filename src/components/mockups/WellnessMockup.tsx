// Decorative concept mockup (from the original design export)
export default function WellnessMockup() {
  return (
<div className="pv-in" style={{ background: 'radial-gradient(520px 320px at 10% 100%,rgba(236,160,96,0.18),rgba(236,160,96,0) 70%),#0A0A0A' }}>
<div className="plx" style={{ position: 'absolute', inset: '64px 24px 24px', borderRadius: '18px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', overflow: 'hidden', fontSize: '11px' }}>
<div className="mock-hide" style={{ width: '150px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<span style={{ font: "9px 'JetBrains Mono'", letterSpacing: '.12em', color: '#71717A', marginBottom: '4px' }}>HISTORY</span>
<span style={{ padding: '7px 9px', borderRadius: '8px', background: 'rgba(242,184,96,0.08)', color: '#F2B860' }}>Evening check-in</span>
<span style={{ padding: '7px 9px', color: '#A1A1AA' }}>Sleep routine</span>
<span style={{ padding: '7px 9px', color: '#A1A1AA' }}>Work stress</span>
<span style={{ padding: '7px 9px', color: '#A1A1AA' }}>Breathing practice</span>
</div>
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '0' }}>
<div style={{ height: '42px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}><b style={{ fontFamily: "'Space Grotesk'", fontSize: '13px' }}>Wellness Assistant</b><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F2B860', border: '1px solid rgba(242,184,96,0.35)', borderRadius: '999px', padding: '4px 9px' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>Voice</span></div>
<div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
<span style={{ alignSelf: 'flex-end', maxWidth: '72%', padding: '9px 12px', borderRadius: '14px 14px 4px 14px', background: '#1c1c1c', lineHeight: 1.45 }}>I’ve been feeling overwhelmed this week.</span>
<div style={{ alignSelf: 'flex-start', display: 'flex', gap: '6px', flexWrap: 'wrap' }}><span style={{ font: "9px 'JetBrains Mono'", letterSpacing: '.08em', color: '#E0763A', border: '1px solid rgba(224,118,58,0.35)', padding: '4px 8px', borderRadius: '999px' }}>RETRIEVED · QDRANT</span><span style={{ font: "9px 'JetBrains Mono'", color: '#A1A1AA', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '999px' }}>context ×3</span></div>
<div style={{ alignSelf: 'flex-start', maxWidth: '86%', padding: '11px 13px', borderRadius: '14px 14px 14px 4px', background: 'linear-gradient(135deg,rgba(242,184,96,0.12),rgba(224,118,58,0.06))', border: '1px solid rgba(242,184,96,0.22)', lineHeight: 1.5 }}>That sounds like a lot to carry. Would it help to break the week into smaller pieces and look at what felt heaviest?</div>
<div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '22px', paddingLeft: '4px' }}><i style={{ width: '3px', height: '8px', background: '#F2B860', borderRadius: '2px' }}></i><i style={{ width: '3px', height: '16px', background: '#F2B860', borderRadius: '2px' }}></i><i style={{ width: '3px', height: '11px', background: '#F2B860', borderRadius: '2px' }}></i><i style={{ width: '3px', height: '20px', background: '#E0763A', borderRadius: '2px' }}></i><i style={{ width: '3px', height: '9px', background: '#E0763A', borderRadius: '2px' }}></i><i style={{ width: '3px', height: '14px', background: '#F2B860', borderRadius: '2px' }}></i><span style={{ marginLeft: '8px', color: '#71717A' }}>GPT-4.1 · responding</span></div>
</div>
<div style={{ margin: '0 12px 12px', height: '36px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 12px', color: '#71717A' }}>Share what’s on your mind…</div>
</div>
</div>
</div>
  );
}
