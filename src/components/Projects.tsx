'use client';

import { useCallback, useState } from 'react';
import { projects, type Project } from '@/data/content';
import { ArrowRight } from './Icons';
import Tags from './Tags';
import CaseStudyModal from './CaseStudyModal';
import CrushesMockup from './mockups/CrushesMockup';
import PlayerIntelMockup from './mockups/PlayerIntelMockup';
import WellnessMockup from './mockups/WellnessMockup';
import HealthcareMockup from './mockups/HealthcareMockup';
import PharmaMockup from './mockups/PharmaMockup';

const MOCKUPS: Record<Project['id'], () => React.JSX.Element> = {
  crushes: CrushesMockup,
  player: PlayerIntelMockup,
  wellness: WellnessMockup,
  healthcare: HealthcareMockup,
  pharma: PharmaMockup,
};

const byId = (id: Project['id']) => {
  const index = projects.findIndex((p) => p.id === id);
  return { p: projects[index], index };
};

type OpenFn = (index: number) => void;

function Preview({ p, height, tall }: { p: Project; height: number; tall?: boolean }) {
  const Mockup = MOCKUPS[p.id];
  return (
    <div className={tall ? 'pv rvi tall' : 'pv rvi'} style={{ height: `${height}px` }}>
      <span className="pv-lbl">{p.previewLabel}</span>
      <Mockup />
    </div>
  );
}

function Actions({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const details = (
    <button className="btn btn-gold sm" type="button" onClick={onOpen}>
      View Details <ArrowRight size={16} />
    </button>
  );
  if (p.privateProduct) {
    return (
      <div className="acts">
        {details}
        <span className="note">Company product · no public link</span>
      </div>
    );
  }
  return (
    <>
      <div className="acts">
        {details}
        {p.liveUrl ? (
          <a className="btn btn-ghost sm" href={p.liveUrl} target="_blank" rel="noreferrer">View Project ↗</a>
        ) : (
          <button className="btn btn-ghost sm" type="button" disabled title="Add the live URL">View Project ↗</button>
        )}
      </div>
      {!p.liveUrl && <p className="note" style={{ marginTop: '12px' }}>Live link: [add URL]</p>}
    </>
  );
}

function Org({ p, dot }: { p: Project; dot?: boolean }) {
  if (!p.org) return null;
  return (
    <p style={{ margin: '16px 0 0' }}>
      <span className="org">
        {dot && <span className="dot" style={{ margin: 0, width: '6px', height: '6px' }} />}
        {p.org}
      </span>
    </p>
  );
}

const Caps = ({ items }: { items: string[] }) => (
  <ul className="caps">{items.map((c) => <li key={c}>{c}</li>)}</ul>
);

function Featured({ onOpen }: { onOpen: OpenFn }) {
  const { p, index } = byId('crushes');
  return (
    <article className="pj rv" style={{ marginBottom: '140px' }}>
      <Preview p={p} height={640} tall />
      <div className="feat-meta" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: '48px', marginTop: '48px' }}>
        <div style={{ gridColumn: 'span 5' }}>
          <div className="meta-top">
            <span className="mono gold">{p.num} — Featured</span>
            <span className="mono dim">{p.category}</span>
          </div>
          <h3 style={{ margin: 0, fontSize: 'clamp(40px,4.6vw,64px)', lineHeight: 1 }}><span className="pt">{p.name}</span></h3>
          {p.subtitle && (
            <p className="disp" style={{ fontSize: '22px', color: '#D4D4D8', margin: '12px 0 0', letterSpacing: '-0.02em' }}>{p.subtitle}</p>
          )}
          <Actions p={p} onOpen={() => onOpen(index)} />
        </div>
        <div style={{ gridColumn: 'span 7' }}>
          <p className="pd" style={{ marginTop: 0 }}>{p.desc}</p>
          <Caps items={p.caps} />
          <Tags items={p.tags} style={{ marginTop: '28px' }} />
        </div>
      </div>
    </article>
  );
}

function Column({ id, onOpen }: { id: Project['id']; onOpen: OpenFn }) {
  const { p, index } = byId(id);
  return (
    <article className="pj rv">
      <Preview p={p} height={460} />
      <div style={{ padding: '36px 4px 0' }}>
        <div className="meta-top">
          <span className="mono gold">{p.num}</span>
          <span className="mono dim">{p.category}</span>
        </div>
        <h3 style={{ margin: 0, fontSize: '34px', lineHeight: 1.1 }}><span className="pt">{p.name}</span></h3>
        <Org p={p} />
        <p className="pd">{p.desc}</p>
        <Caps items={p.caps} />
        <Tags items={p.tags} style={{ marginTop: '24px' }} />
        <Actions p={p} onOpen={() => onOpen(index)} />
      </div>
    </article>
  );
}

function Alternating({ id, onOpen, flip, last, height }: { id: Project['id']; onOpen: OpenFn; flip?: boolean; last?: boolean; height: number }) {
  const { p, index } = byId(id);
  const text = (
    <div style={{ gridColumn: 'span 5', ...(flip ? { order: 1 } : {}) }}>
      <div className="meta-top">
        <span className="mono gold">{p.num}</span>
        <span className="mono dim">{p.category}</span>
      </div>
      <h3 style={{ margin: 0, fontSize: '38px', lineHeight: 1.08 }}><span className="pt">{p.name}</span></h3>
      <Org p={p} dot={p.id === 'healthcare'} />
      <p className="pd">{p.desc}</p>
      <Caps items={p.caps} />
      <Tags items={p.tags} style={{ marginTop: '24px' }} />
      <Actions p={p} onOpen={() => onOpen(index)} />
    </div>
  );
  const preview = (
    <div style={{ gridColumn: 'span 7', ...(flip ? { order: 2 } : {}) }}>
      <Preview p={p} height={height} />
    </div>
  );
  return (
    <article className="pj alt rv" style={last ? undefined : { marginBottom: '150px' }}>
      {flip ? <>{text}{preview}</> : <>{preview}{text}</>}
    </article>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(-1);
  const close = useCallback(() => setOpen(-1), []);
  const onOpen: OpenFn = setOpen;
  const professional = projects.filter((p) => p.org).length;
  return (
    <section id="projects" className="sec" data-galaxy="0.6" data-gx="projects" style={{ paddingTop: '170px' }}>
      <div className="wrap">
        <div className="g2" style={{ alignItems: 'end', marginBottom: '88px' }}>
          <div style={{ gridColumn: 'span 8' }}>
            <div className="sec-label rv"><i /><span className="mono gold">03 — Selected Projects</span></div>
            <h2 className="disp rvt" style={{ fontSize: 'clamp(52px,7vw,104px)', lineHeight: 0.96, margin: 0, fontWeight: 600 }}>Selected Projects</h2>
            <p className="lead rv" style={{ marginTop: '28px', fontSize: '21px', maxWidth: '640px' }}>
              Turning complex ideas into intelligent, scalable digital products.
            </p>
          </div>
          <div className="rv" style={{ gridColumn: 'span 4', textAlign: 'right' }}>
            <p className="mono dim" style={{ margin: 0, lineHeight: 2 }}>
              {String(projects.length).padStart(2, '0')} projects<br />
              {String(professional).padStart(2, '0')} from professional roles
            </p>
          </div>
        </div>

        <Featured onOpen={onOpen} />

        <div className="two" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '40px', marginBottom: '150px' }}>
          <Column id="player" onOpen={onOpen} />
          <Column id="wellness" onOpen={onOpen} />
        </div>

        <Alternating id="healthcare" onOpen={onOpen} height={520} />
        <Alternating id="pharma" onOpen={onOpen} height={500} flip last />
      </div>
      {open >= 0 && <CaseStudyModal index={open} onClose={close} onNavigate={setOpen} />}
    </section>
  );
}
