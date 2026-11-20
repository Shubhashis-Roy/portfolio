'use client';

import { useEffect, useRef } from 'react';
import { projects } from '@/data/content';
import { ArrowRight, CloseIcon } from './Icons';
import Tags from './Tags';

type Props = { index: number; onClose: () => void; onNavigate: (index: number) => void };

function LinkLine({ label, url }: { label: string; url?: string }) {
  return (
    <>
      {label}: {url ? <a href={url} target="_blank" rel="noreferrer">{url.replace(/^https?:\/\//, '')}</a> : '[add URL]'}
    </>
  );
}

export default function CaseStudyModal({ index, onClose, onNavigate }: Props) {
  const n = projects.length;
  const p = projects[index];
  const prev = projects[(index - 1 + n) % n];
  const next = projects[(index + 1) % n];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % n);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, n, onClose, onNavigate]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${p.title} case study`}>
      <button className="scrim" type="button" aria-label="Close case study" onClick={onClose} />
      <div className="panel">
        <div className="cs-hero">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
            <div className="meta-top" style={{ margin: 0 }}>
              <span className="mono gold">{p.num} — Case study</span>
              <span className="mono dim">{p.category}</span>
            </div>
            <button ref={closeRef} className="iconbtn" type="button" aria-label="Close" onClick={onClose}><CloseIcon /></button>
          </div>
          <h2 className="disp" style={{ fontSize: 'clamp(38px,5vw,68px)', lineHeight: 1, margin: '24px 0 0', fontWeight: 600, maxWidth: '860px' }}>{p.title}</h2>
          <p style={{ margin: '20px 0 0' }}><span className="org">{p.owner}</span></p>
        </div>
        <div className="cs-body">
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '44px' }}>
            <div>
              <p className="cs-h">Overview</p>
              <p className="lead" style={{ fontSize: '18px' }}>{p.desc}</p>
            </div>
            <div>
              <p className="cs-h">Key capabilities</p>
              <ul className="caps" style={{ marginTop: 0 }}>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <div>
              <p className="cs-h">System concept</p>
              <div className="flow">
                {p.flow.map((s, i) => (
                  <span key={s} style={{ display: 'contents' }}>
                    <span className="flow-n">{s}</span>
                    {i < p.flow.length - 1 && <ArrowRight style={{ color: '#E0763A' }} />}
                  </span>
                ))}
              </div>
              <p className="note" style={{ marginTop: '12px' }}>Concept view assembled from the project description — replace with your architecture diagram.</p>
            </div>
          </div>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <div><p className="cs-h">Stack</p><Tags items={p.stack} /></div>
            <div>
              <p className="cs-h">My role</p>
              {p.myRole ? <p className="lead" style={{ fontSize: '15px' }}>{p.myRole}</p> : <div className="ph-box">[Describe your responsibilities, scope and key decisions.]</div>}
            </div>
            <div>
              <p className="cs-h">Screens &amp; outcomes</p>
              <div className="ph-box">[Add real screenshots and verified outcomes. Left blank on purpose — nothing here is invented.]</div>
            </div>
            <div>
              <p className="cs-h">Links</p>
              <p className="note" style={{ margin: 0, fontSize: '12px' }}>
                {p.privateProduct ? 'Company product — no public link.' : <><LinkLine label="Live link" url={p.liveUrl} /> · <LinkLine label="Repository" url={p.repoUrl} /></>}
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '24px 64px 40px', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost sm" type="button" onClick={() => onNavigate((index - 1 + n) % n)}>
            <ArrowRight size={16} style={{ transform: 'scaleX(-1)' }} /> {prev.short}
          </button>
          <button className="btn btn-ghost sm" type="button" onClick={() => onNavigate((index + 1) % n)}>
            {next.short} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
