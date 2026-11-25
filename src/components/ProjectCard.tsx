'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/content';
import { cn } from '@/lib/utils';
import { useCaseStudy } from './CaseStudyProvider';
import { Mono, Tags } from './primitives';

/** Max tilt in degrees at the card's edges. */
const TILT = 10;

/**
 * Personal-project card that tilts in 3D toward the cursor.
 * Clicking anywhere on it opens the case-study dialog; the Live / Source links sit above that layer.
 */
export default function ProjectCard({ p, index, className }: { p: Project; index: number; className?: string }) {
  const open = useCaseStudy();
  const card = useRef<HTMLDivElement>(null);

  const tilt = (e: React.PointerEvent) => {
    const el = card.current;
    // Mouse only — touch would fight scrolling — and respect reduced motion.
    if (!el || e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0 → 1
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * TILT * 2}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * TILT * 2}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };
  const reset = () => {
    const el = card.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const links = [
    ...(p.liveUrl ? [{ label: 'Live Demo', url: p.liveUrl }] : []),
    ...(p.repos ?? []),
  ];

  return (
    // Outer element keeps the scroll reveal's transform separate from the tilt.
    <div className={cn('reveal [perspective:1100px]', className)}>
      <div
        ref={card}
        onPointerMove={tilt}
        onPointerLeave={reset}
        className="group/card relative h-full rounded-[26px] border border-white/10 bg-panel/80 transition-[transform,border-color,box-shadow] duration-300 ease-out-expo [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-gold/45 hover:shadow-[0_30px_80px_-30px_rgb(var(--gold-rgb)/0.35)]"
      >
        {/* Whole-card click target → case study */}
        <button
          type="button"
          onClick={() => open(p.id)}
          aria-label={`View details: ${p.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-[26px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />

        {/* Cursor-following glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[26px] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), rgb(255 255 255 / 0.09), transparent 45%)' }}
        />

        {/* Content ignores the pointer so clicks reach the button; only the links opt back in. */}
        <div className="pointer-events-none relative z-20 flex h-full flex-col p-3 [transform-style:preserve-3d]">
          {/* Image pops forward in 3D */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-white/8 bg-ink [transform:translateZ(40px)]">
            {p.image && (
              <img
                src={p.image}
                alt={`${p.title} cover`}
                loading="lazy"
                className="size-full object-cover brightness-[0.85] saturate-[0.7] transition-[transform,filter] duration-700 ease-out-expo group-hover/card:scale-[1.06] group-hover/card:brightness-100 group-hover/card:saturate-100"
              />
            )}
            <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-ink/75 px-2.5 py-1 font-mono text-[10.5px] tracking-[.14em] text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex flex-1 flex-col px-2 pt-4 pb-1.5 [transform:translateZ(24px)]">
            <Mono className="text-[10.5px]">{p.category}</Mono>
            <h3 className="mt-2 mb-0 font-display text-[23px] leading-[1.1] font-semibold tracking-[-0.03em]">
              {p.name}
              {p.subtitle && <span className="mt-0.5 block text-[14px] font-normal tracking-normal text-zinc-400">{p.subtitle}</span>}
            </h3>
            <p className="mt-3 mb-0 line-clamp-2 text-[14.5px] leading-[1.55] text-zinc-300">{p.desc}</p>
            <Tags items={p.tags.slice(0, 3)} className="mt-4" />

            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                View details <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" aria-hidden />
              </span>
              {links.map((l) => (
                // Re-enable the pointer so external links open instead of the case study.
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto font-mono text-[10.5px] tracking-[.06em] text-zinc-400 uppercase no-underline transition-colors hover:text-gold"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
