import { skills } from '@/data/content';
import Tags from './Tags';

export default function Skills() {
  return (
    <section id="skills" className="sec" data-galaxy="0.35" data-gx="skills">
      <div className="wrap">
        <div className="g2" style={{ alignItems: 'end' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div className="sec-label rv"><i /><span className="mono gold">04 — Skills</span></div>
            <h2 className="h2 disp rvt">The stack behind the work.</h2>
          </div>
          <p className="lead rv" style={{ gridColumn: 'span 5' }}>
            Technologies used across the projects above — grouped by where they sit in the product.
          </p>
        </div>
        <div className="skills">
          {skills.map((s) => (
            <div className="card rv" key={s.group}>
              <span className="mono gold">{s.group}</span>
              <Tags items={s.items} style={{ marginTop: '20px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
