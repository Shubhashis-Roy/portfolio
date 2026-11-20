import { profile } from '@/data/content';
import { ArrowRight } from './Icons';
import ResumeButton from './ResumeButton';

const linkStyle = { color: '#A1A1AA', textDecoration: 'none' };

function Social({ url, label }: { url: string; label: string }) {
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" style={linkStyle} className="mono">{label} ↗</a>
  ) : (
    <a href="#contact" style={linkStyle} className="mono">{label} [URL]</a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact" data-galaxy="0.85" data-gx="contact">
      <div className="wrap">
        <div className="sec-label rv" style={{ justifyContent: 'center' }}>
          <i /><span className="mono gold">05 — Contact</span><i style={{ transform: 'scaleX(-1)' }} />
        </div>
        <h2 className="disp rvt" style={{ fontSize: 'clamp(48px,7vw,108px)', lineHeight: 0.98, margin: '0 auto', maxWidth: '1000px', fontWeight: 600 }}>
          Let’s build something{' '}
          <span style={{ color: '#F2B860', textShadow: '0 0 60px rgba(242,184,96,0.4)' }}>intelligent.</span>
        </h2>
        <p className="lead rv" style={{ maxWidth: '560px', margin: '28px auto 0' }}>
          Open to conversations about AI products, full-stack engineering and real-time systems.
        </p>
        <div className="rv" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '44px' }}>
          <a className="btn btn-gold" href={`mailto:${profile.email || 'your.email@domain.com'}`}>
            {profile.email || '[your.email@domain.com]'} <ArrowRight />
          </a>
          <ResumeButton icon={false} />
        </div>
        <div className="rv" style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Social url={profile.linkedin} label="LinkedIn" />
          <Social url={profile.github} label="GitHub" />
        </div>
      </div>
    </section>
  );
}
