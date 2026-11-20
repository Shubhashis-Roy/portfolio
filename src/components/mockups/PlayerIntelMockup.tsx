// Decorative concept mockup (from the original design export)
export default function PlayerIntelMockup() {
  return (
<div className="pv-in" style={{ background: 'radial-gradient(500px 300px at 90% 0%,rgba(242,184,96,0.16),rgba(242,184,96,0) 70%),#0A0A0A' }}>
<div className="plx" style={{ position: 'absolute', inset: '64px 24px 24px', borderRadius: '18px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', overflow: 'hidden' }}>
<div className="mock-hide" style={{ width: '48px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingTop: '16px' }}><span style={{ width: '20px', height: '20px', borderRadius: '6px', background: '#F2B860' }}></span><span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#262626' }}></span><span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#262626' }}></span><span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#262626' }}></span></div>
<div style={{ flex: 1, padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gridTemplateRows: 'auto 1fr 1fr', gap: '12px', fontSize: '11px', minWidth: '0' }}>
<div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontFamily: "'Space Grotesk'", fontSize: '15px' }}>Squad Intelligence</b><span style={{ font: "9.5px 'JetBrains Mono'", color: '#F2B860', border: '1px solid rgba(242,184,96,0.35)', padding: '4px 8px', borderRadius: '999px' }}>AI INSIGHTS</span></div>
<div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
<span style={{ color: '#A1A1AA' }}>Player comparison</span>
<div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717A', fontSize: '9.5px' }}><span style={{ color: '#F2B860' }}>Player A</span><span style={{ color: '#E0763A' }}>Player B</span></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
<div><span style={{ color: '#71717A', fontSize: '9.5px' }}>Pace</span><div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}><i style={{ height: '5px', width: '62%', background: '#F2B860', borderRadius: '3px' }}></i><i style={{ height: '5px', width: '38%', background: '#E0763A', borderRadius: '3px', opacity: '.8' }}></i></div></div>
<div><span style={{ color: '#71717A', fontSize: '9.5px' }}>Passing</span><div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}><i style={{ height: '5px', width: '45%', background: '#F2B860', borderRadius: '3px' }}></i><i style={{ height: '5px', width: '55%', background: '#E0763A', borderRadius: '3px', opacity: '.8' }}></i></div></div>
<div><span style={{ color: '#71717A', fontSize: '9.5px' }}>Workload</span><div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}><i style={{ height: '5px', width: '52%', background: '#F2B860', borderRadius: '3px' }}></i><i style={{ height: '5px', width: '48%', background: '#E0763A', borderRadius: '3px', opacity: '.8' }}></i></div></div>
</div>
</div>
<div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<span style={{ color: '#A1A1AA' }}>Fitness indicator</span>
<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="86" height="86" viewBox="0 0 100 100" role="img" aria-label="Illustrative fitness ring"><circle cx="50" cy="50" r="40" fill="none" stroke="#1f1f1f" strokeWidth="10" /><circle cx="50" cy="50" r="40" fill="none" stroke="#F2B860" strokeWidth="10" strokeLinecap="round" strokeDasharray="180 252" transform="rotate(-90 50 50)" /><circle cx="50" cy="50" r="26" fill="none" stroke="#1f1f1f" strokeWidth="7" /><circle cx="50" cy="50" r="26" fill="none" stroke="#E0763A" strokeWidth="7" strokeLinecap="round" strokeDasharray="100 164" transform="rotate(-90 50 50)" /></svg></div>
</div>
<div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column' }}>
<span style={{ color: '#A1A1AA' }}>Performance trend</span>
<svg viewBox="0 0 200 70" preserveAspectRatio="none" style={{ flex: 1, width: '100%', marginTop: '6px' }} aria-hidden="true"><path d="M0 55 C 25 50, 35 30, 60 34 S 100 52, 120 30 S 165 10, 200 18" fill="none" stroke="#F2B860" strokeWidth="2" /><path d="M0 60 C 30 58, 50 48, 80 50 S 130 40, 150 44 S 185 36, 200 38" fill="none" stroke="#E0763A" strokeWidth="1.6" strokeDasharray="4 4" /></svg>
</div>
<div style={{ border: '1px solid rgba(242,184,96,0.25)', background: 'rgba(242,184,96,0.04)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
<span style={{ color: '#F2B860' }}>AI recommendations</span>
<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Player 07</span><span style={{ color: '#050505', background: '#F2B860', padding: '1px 7px', borderRadius: '999px', fontSize: '9.5px' }}>PLAY</span></div>
<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Player 12</span><span style={{ color: '#F2B860', border: '1px solid #F2B860', padding: '0 7px', borderRadius: '999px', fontSize: '9.5px' }}>BENCH</span></div>
<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Player 03</span><span style={{ color: '#050505', background: '#E0763A', padding: '1px 7px', borderRadius: '999px', fontSize: '9.5px' }}>TRADE</span></div>
<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Player 18</span><span style={{ color: '#A1A1AA', border: '1px solid #52525B', padding: '0 7px', borderRadius: '999px', fontSize: '9.5px' }}>RELEASE</span></div>
</div>
</div>
</div>
</div>
  );
}
