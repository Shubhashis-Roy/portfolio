// Decorative concept mockup (from the original design export)
export default function HealthcareMockup() {
  return (
<div className="pv-in" style={{ background: 'radial-gradient(600px 360px at 80% 90%,rgba(224,118,58,0.2),rgba(224,118,58,0) 70%),radial-gradient(400px 260px at 0% 0%,rgba(255,224,140,0.08),rgba(255,224,140,0) 70%),#0A0A0A' }}>
<div className="plx" style={{ position: 'absolute', inset: '64px 24px 24px 24px' }}>
<div style={{ position: 'absolute', left: '0', top: '0', right: '110px', bottom: '0', borderRadius: '18px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontFamily: "'Space Grotesk'", fontSize: '15px' }}>Consultations</b><span style={{ color: '#A1A1AA' }}>Physician workspace</span></div>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ font: "9px 'JetBrains Mono'", color: '#71717A', letterSpacing: '.1em' }}>INTAKE</span><span style={{ height: '38px', borderRadius: '8px', background: '#161616' }}></span><span style={{ height: '38px', borderRadius: '8px', background: '#161616' }}></span></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ font: "9px 'JetBrains Mono'", color: '#71717A', letterSpacing: '.1em' }}>AI PLAN</span><span style={{ height: '38px', borderRadius: '8px', background: 'rgba(242,184,96,0.1)', border: '1px solid rgba(242,184,96,0.3)' }}></span><span style={{ height: '38px', borderRadius: '8px', background: '#161616' }}></span></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ font: "9px 'JetBrains Mono'", color: '#F2B860', letterSpacing: '.1em' }}>REVIEW</span><span style={{ height: '38px', borderRadius: '8px', background: '#161616' }}></span></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ font: "9px 'JetBrains Mono'", color: '#71717A', letterSpacing: '.1em' }}>PHARMACY</span><span style={{ height: '38px', borderRadius: '8px', background: '#161616' }}></span><span style={{ height: '38px', borderRadius: '8px', background: '#161616' }}></span></div>
</div>
<div style={{ flex: 1, borderRadius: '12px', border: '1px solid rgba(242,184,96,0.22)', background: 'rgba(242,184,96,0.03)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b>Treatment plan · draft</b><span style={{ font: "9px 'JetBrains Mono'", color: '#E0763A', border: '1px solid rgba(224,118,58,0.4)', padding: '3px 8px', borderRadius: '999px' }}>AI-GENERATED · AWAITING REVIEW</span></div>
<span style={{ color: '#71717A' }}>Patient [ID] · intake summary</span>
<i style={{ height: '6px', width: '92%', background: '#1f1f1f', borderRadius: '3px' }}></i><i style={{ height: '6px', width: '80%', background: '#1f1f1f', borderRadius: '3px' }}></i><i style={{ height: '6px', width: '86%', background: '#1f1f1f', borderRadius: '3px' }}></i><i style={{ height: '6px', width: '60%', background: '#1f1f1f', borderRadius: '3px' }}></i>
<div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}><span style={{ padding: '7px 12px', borderRadius: '999px', background: '#F2B860', color: '#050505', fontWeight: 600 }}>Approve plan</span><span style={{ padding: '7px 12px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)' }}>Request changes</span></div>
</div>
</div>
<div className="ph" style={{ position: 'absolute', right: '0', bottom: '-30px', width: '170px', height: '350px', borderRadius: '30px' }}><div className="scr" style={{ borderRadius: '24px', fontSize: '10px' }}>
<div className="isl" style={{ width: '54px', height: '15px' }}></div>
<div style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
<span style={{ font: "8.5px 'JetBrains Mono'", color: '#F2B860', letterSpacing: '.12em' }}>PATIENT APP</span>
<b style={{ fontFamily: "'Space Grotesk'", fontSize: '15px', lineHeight: 1.15 }}>Your plan is ready for review</b>
<div style={{ borderRadius: '12px', background: '#161616', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}><span style={{ color: '#A1A1AA' }}>Reviewed by</span><b>[Physician name]</b></div>
<div style={{ borderRadius: '12px', background: '#161616', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F2B860" strokeWidth="2" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg><span>Secure messages</span></div>
<span style={{ height: '34px', borderRadius: '999px', background: '#F2B860', color: '#050505', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>Approve &amp; checkout</span>
</div>
</div></div>
</div>
</div>
  );
}
