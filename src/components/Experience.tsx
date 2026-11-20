import { experience } from '@/data/content';
import Tags from './Tags';

export default function Experience() {
  return (
    <section id="experience" className="sec" data-galaxy="0.25" data-gx="experience">
      <div className="wrap">
        <div className="sec-label rv"><i /><span className="mono gold">02 — Experience</span></div>
        <h2 className="h2 disp rvt" style={{ maxWidth: '820px', marginBottom: '64px' }}>
          Products built inside real teams.
        </h2>
        <div className="xp">
          {experience.map((x) => (
            <div className="xp-row rv" key={x.company}>
              <div style={{ gridColumn: 'span 4' }}>
                <p className="xp-co">{x.current && <span className="dot" />}{x.company}</p>
                <p className="mono dim" style={{ margin: '12px 0 0' }}>
                  {[x.current ? 'Current' : null, x.role, x.dates].filter(Boolean).join(' · ')}
                </p>
              </div>
              <div style={{ gridColumn: 'span 8' }}>
                <p className="lead" style={{ fontSize: '17px' }}>{x.summary}</p>
                <Tags items={x.tags} style={{ marginTop: '20px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
