import { profile, projects } from '@/data/content';
import { ArrowRight } from './Icons';
import ResumeButton from './ResumeButton';

export default function Hero() {
  return (
    <section id="top" className="hero" data-galaxy="1" data-gx="hero" style={{ position: 'relative' }}>
      <div className="wrap" style={{ width: '100%' }}>
        <div style={{ maxWidth: '820px' }}>
          <div className="sec-label rv">
            <span className="dot" />
            <span className="mono gold">{profile.role}</span>
          </div>
          <h1 className="h1 disp rvt">
            Engineering <em>Intelligent</em> Digital Experiences.
          </h1>
          <p className="lead rv" style={{ maxWidth: '620px', marginTop: '32px', fontSize: '20px' }}>
            I’m {profile.name}, an {profile.role} with {profile.experience} of experience building scalable web
            applications, intelligent AI systems, and real-time digital products.
          </p>
          <div className="rv" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '44px' }}>
            <a className="btn btn-gold" href="#projects">
              Explore My Work <ArrowRight />
            </a>
            <ResumeButton />
          </div>
          <div className="facts rv">
            <div><b>{profile.experienceShort}</b><span>Shipping production software</span></div>
            <div><b>{String(projects.length).padStart(2, '0')}</b><span>Selected projects below</span></div>
            <div><b>AI · RT · FS</b><span>AI, real-time and full-stack</span></div>
          </div>
        </div>
      </div>
      <div className="cue">
        <i />
        <span className="mono dim" style={{ fontSize: '10.5px' }}>Scroll to explore</span>
      </div>
    </section>
  );
}
