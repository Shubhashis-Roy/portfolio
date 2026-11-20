import { focusAreas } from '@/data/content';
import { FocusIcon } from './Icons';

export default function About() {
  return (
    <section id="about" className="sec" data-galaxy="0.4" data-gx="about">
      <div className="wrap">
        <div className="g2">
          <div className="rv" style={{ gridColumn: 'span 4' }}>
            <div className="sec-label"><i /><span className="mono gold">01 — About</span></div>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <h2 className="h2 disp rvt">Building where AI meets product engineering.</h2>
            <p className="lead rv" style={{ marginTop: '32px', maxWidth: '720px' }}>
              I design and build full-stack products end to end — from real-time communication and conversational AI
              to clinical workflows and commerce platforms. My work connects large language models, retrieval
              pipelines, and real-time infrastructure to interfaces people actually enjoy using.
            </p>
          </div>
        </div>
        <div className="focus">
          {focusAreas.map((f) => (
            <div className="card rv" key={f.title}>
              <div className="ic"><FocusIcon kind={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
