'use client';

import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { projects } from '@/data/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Caps, Mono, Note, Tags } from './primitives';
import { StoreLinks } from './project-parts';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: number;
  onNavigate: (index: number) => void;
};

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-4 font-mono text-[11.5px] tracking-[.16em] text-gold uppercase">{children}</p>;
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[18px] border border-dashed border-white/18 p-[22px] text-sm leading-[1.55] text-zinc-400">{children}</div>;
}

function LinkLine({ label, url }: { label: string; url?: string }) {
  return (
    <>
      {label}:{' '}
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="text-gold hover:text-ember">
          {url.replace(/^https?:\/\//, '')}
        </a>
      ) : (
        '[add URL]'
      )}
    </>
  );
}

export default function CaseStudyModal({ open, onOpenChange, index, onNavigate }: Props) {
  const n = projects.length;
  const p = projects[index];
  const prev = (index - 1 + n) % n;
  const next = (index + 1) % n;

  // ← / → switch between case studies while the dialog is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNavigate(next);
      if (e.key === 'ArrowLeft') onNavigate(prev);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, next, prev, onNavigate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header */}
        <div className="relative border-b border-white/8 bg-[radial-gradient(700px_320px_at_85%_0%,rgb(var(--ember-rgb)/0.18),rgb(var(--ember-rgb)/0)_70%),radial-gradient(500px_260px_at_10%_100%,rgb(var(--gold-rgb)/0.1),rgb(var(--gold-rgb)/0)_70%)] px-16 pt-16 pb-12 max-md:px-6 max-md:pt-10 max-md:pb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Mono tone="gold">Case study</Mono>
              <Mono>{p.category}</Mono>
            </div>
            <DialogClose asChild>
              <Button variant="icon" size="icon" aria-label="Close">
                <X size={18} aria-hidden />
              </Button>
            </DialogClose>
          </div>
          <DialogTitle className="mt-6 mb-0 max-w-[860px] font-display text-[clamp(38px,5vw,68px)] leading-none font-semibold tracking-[-0.035em]">
            {p.title}
          </DialogTitle>
          <p className="mt-5 mb-0">
            <Badge variant="org">{p.owner}</Badge>
          </p>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-7 px-16 pt-14 pb-16 max-md:px-6 max-md:pt-8 max-md:pb-10 md:grid-cols-12 md:gap-12">
          <div className="flex flex-col gap-11 md:col-span-7">
            <div>
              <Heading>Overview</Heading>
              <DialogDescription className="m-0 text-lg leading-[1.65] text-zinc-400">{p.desc}</DialogDescription>
            </div>
            <div>
              <Heading>Key capabilities</Heading>
              <Caps items={p.features} className="mt-0" />
            </div>
            <div>
              <Heading>System concept</Heading>
              <div className="flex flex-wrap items-center gap-2.5">
                {p.flow.map((step, i) => (
                  <span key={step} className="contents">
                    <span className="rounded-[14px] border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-white">{step}</span>
                    {i < p.flow.length - 1 && <ArrowRight size={18} className="text-ember" aria-hidden />}
                  </span>
                ))}
              </div>
              <Note className="mt-3">Simplified view of the end-to-end flow.</Note>
            </div>
          </div>

          <div className="flex flex-col gap-9 md:col-span-5">
            {p.stack.length > 0 && (
              <div>
                <Heading>Stack</Heading>
                <Tags items={p.stack} />
              </div>
            )}
            <div>
              <Heading>My role</Heading>
              {p.myRole ? (
                <p className="m-0 text-[15px] leading-[1.65] text-zinc-400">{p.myRole}</p>
              ) : (
                <Placeholder>[Describe your responsibilities, scope and key decisions.]</Placeholder>
              )}
            </div>
            {(p.links?.length || p.liveUrl || !p.privateProduct || p.linkNote) && (
              <div>
                <Heading>Links</Heading>
                {p.linkNote && !p.links?.length && !p.liveUrl ? (
                  <Note className="text-xs">{p.linkNote}</Note>
                ) : p.links?.length ? (
                  <StoreLinks links={p.links} />
                ) : (
                  <Note className="text-xs">
                    {!p.privateProduct ? (
                      <>
                        <LinkLine label="Live link" url={p.liveUrl} /> · <LinkLine label="Repository" url={p.repoUrl} />
                      </>
                    ) : (
                      <LinkLine label="Live site" url={p.liveUrl} />
                    )}
                  </Note>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Prev / next */}
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/8 px-16 pt-6 pb-10 max-md:px-6">
          <Button variant="outline" size="sm" onClick={() => onNavigate(prev)}>
            <ArrowLeft size={16} aria-hidden /> {projects[prev].short}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onNavigate(next)}>
            {projects[next].short} <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
