// Decorative concept mockup (from the original design export)
export default function PharmaMockup() {
  return (
<div className="pv-in" style={{ background: 'radial-gradient(560px 340px at 20% 100%,rgba(232,150,90,0.18),rgba(232,150,90,0) 70%),#0A0A0A' }}>
<div className="plx" style={{ position: 'absolute', inset: '64px 24px 24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
<div className="br">
<div className="br-bar"><i></i><i></i><i></i><span className="br-url">[project-url]</span></div>
<div style={{ flex: 1, display: 'flex', minHeight: '0', fontSize: '11px' }}>
<div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontFamily: "'Space Grotesk'", fontSize: '14px' }}>All products</b><span style={{ width: '120px', height: '26px', borderRadius: '8px', background: '#161616', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 8px', color: '#71717A' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>Search</span></div>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '8px', flex: 1 }}>
<div style={{ borderRadius: '10px', background: '#141414', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}><div style={{ flex: 1, borderRadius: '7px', background: 'radial-gradient(circle at 50% 50%,rgba(242,184,96,0.25),#141414 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '34px', height: '14px', borderRadius: '7px', background: 'linear-gradient(90deg,#F2B860 50%,#F5F5F5 50%)' }}></span></div><span>[Product name]</span><span style={{ color: '#A1A1AA' }}>[Price]</span></div>
<div style={{ borderRadius: '10px', background: '#141414', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', outline: '1px solid rgba(242,184,96,0.5)' }}><div style={{ flex: 1, borderRadius: '7px', background: 'radial-gradient(circle at 50% 50%,rgba(224,118,58,0.25),#141414 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '26px', height: '34px', borderRadius: '5px', background: '#F5F5F5', borderTop: '6px solid #E0763A' }}></span></div><span>[Product name]</span><span style={{ color: '#A1A1AA' }}>[Price]</span></div>
<div style={{ borderRadius: '10px', background: '#141414', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}><div style={{ flex: 1, borderRadius: '7px', background: 'radial-gradient(circle at 50% 50%,rgba(242,184,96,0.2),#141414 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#F5F5F5', boxShadow: 'inset 0 0 0 5px #F2B860' }}></span></div><span>[Product name]</span><span style={{ color: '#A1A1AA' }}>[Price]</span></div>
<div style={{ borderRadius: '10px', background: '#141414', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}><div style={{ flex: 1, borderRadius: '7px', background: '#181818' }}></div><span>[Product name]</span><span style={{ color: '#A1A1AA' }}>[Price]</span></div>
<div style={{ borderRadius: '10px', background: '#141414', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}><div style={{ flex: 1, borderRadius: '7px', background: '#181818' }}></div><span>[Product name]</span><span style={{ color: '#A1A1AA' }}>[Price]</span></div>
<div style={{ borderRadius: '10px', background: '#141414', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}><div style={{ flex: 1, borderRadius: '7px', background: '#181818' }}></div><span>[Product name]</span><span style={{ color: '#A1A1AA' }}>[Price]</span></div>
</div>
</div>
<div className="mock-hide" style={{ width: '190px', borderLeft: '1px solid rgba(255,255,255,0.07)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#0b0b0b' }}>
<b style={{ fontFamily: "'Space Grotesk'", fontSize: '14px' }}>Cart</b>
<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#161616' }}></span><div><span>[Product name]</span><p style={{ margin: '2px 0 0', color: '#71717A' }}>Qty 1</p></div></div>
<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#161616' }}></span><div><span>[Product name]</span><p style={{ margin: '2px 0 0', color: '#71717A' }}>Qty 2</p></div></div>
<div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}><div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1AA' }}><span>Subtotal</span><span>[—]</span></div><div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Total</b><b>[—]</b></div><span style={{ height: '32px', borderRadius: '999px', background: '#F2B860', color: '#050505', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Secure checkout</span></div>
</div>
</div>
</div>
</div>
</div>
  );
}
