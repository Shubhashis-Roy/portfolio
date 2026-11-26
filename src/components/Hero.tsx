import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Container, Mono } from './primitives';
import ResumeButton from './ResumeButton';
import Greeting from './Greeting';
import RoleRotator from './RoleRotator';

/**
 * Role line: a per-theme gradient that contrasts with the black-hole disk behind it,
 * plus a dark halo (drop-shadow works with gradient text, text-shadow doesn't).
 */
const accent = [
  'not-italic bg-clip-text text-transparent [text-shadow:none]',
  'bg-[linear-gradient(100deg,#FFE7B8_0%,#F5BE6A_45%,#E9874A_100%)]',
  'theme-dark:bg-[linear-gradient(100deg,#F1E8FF_0%,#C9B6FF_45%,#9C7BFF_100%)]',
  '[filter:drop-shadow(0_0_1px_rgb(var(--ink-rgb)))_drop-shadow(0_2px_8px_rgb(var(--ink-rgb)/0.95))_drop-shadow(0_0_24px_rgb(var(--ink-rgb)/0.85))]',
].join(' ');

/** Tight dark halo for body text that crosses the bright accretion disk. */
const bodyShadow =
  '[text-shadow:0_0_2px_rgb(var(--ink-rgb)),0_0_6px_rgb(var(--ink-rgb)/0.95),0_0_14px_rgb(var(--ink-rgb)/0.9),0_2px_28px_rgb(var(--ink-rgb)/0.9)]';

const shadow = '[text-shadow:0_2px_24px_rgb(var(--ink-rgb)/0.95),0_0_2px_rgb(var(--ink-rgb)/0.8)]';

export default function Hero() {
  const facts = [
    [profile.experienceShort, 'Shipping production software'],
    ['AI · RT · FS', 'AI, real-time and full-stack'],
  ];
  return (
    <section
      id="top"
      data-galaxy={1}
      data-gx="hero"
      className="relative flex min-h-[min(calc(100svh-76px),940px)] items-center pt-[clamp(16px,3vh,48px)] pb-[clamp(72px,10vh,110px)] max-md:min-h-[min(100svh,860px)] max-md:pt-14 max-md:pb-[110px]"
    >
      <Container>
        <div className="max-w-[820px]">
          <div className="reveal mb-[clamp(8px,1.6vh,16px)] flex items-center gap-3.5">
            <Greeting className={`font-display text-[clamp(26px,min(2.8vw,5vh),40px)] leading-tight font-semibold tracking-[-0.02em] text-gold ${shadow}`} />
          </div>
          <p className={`reveal mt-0 mb-[clamp(12px,2vh,24px)] text-[clamp(17px,2.4vh,20px)] leading-[1.5] text-zinc-300 max-md:text-lg ${shadow}`}>
            Thank you for visiting my portfolio.
          </p>
          <h1 className={`reveal-text m-0 font-display text-[clamp(34px,min(4.8vw,8.5vh),72px)] leading-[1.02] font-semibold tracking-[-0.035em] ${shadow}`}>
            I’m {profile.name},{' '}
            <RoleRotator className={accent} />
          </h1>
          <p className={`reveal mt-[clamp(14px,3vh,32px)] mb-0 max-w-[640px] text-[clamp(16px,2.4vh,20px)] leading-[1.65] text-zinc-200 max-md:text-lg ${bodyShadow}`}>
            Nearly 4 years of experience in designing and building scalable web and mobile applications, specializing in AI engineering,
            LLM integrations, RAG pipelines, and real-time distributed systems with Socket.IO and WebRTC.
          </p>
          <div className="reveal mt-[clamp(18px,4vh,44px)] flex flex-wrap gap-3.5">
            <Button asChild>
              <a href="#projects">
                Explore My Work <ArrowRight size={18} aria-hidden />
              </a>
            </Button>
            <ResumeButton />
          </div>
          <div className={`reveal mt-[clamp(16px,3vh,40px)] grid max-w-[540px] grid-cols-2 border-t border-white/10 max-md:mt-12 max-md:grid-cols-1 ${shadow}`}>
            {facts.map(([value, label]) => (
              <div key={label} className="pt-[clamp(12px,2vh,22px)] pr-6 max-md:pt-[18px] max-md:pr-0">
                <b className="mb-1.5 block font-display text-[clamp(22px,3.4vh,28px)] font-semibold tracking-[-0.02em]">{value}</b>
                <span className="text-sm text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="absolute bottom-[clamp(12px,2.5vh,40px)] left-12 flex items-center gap-3.5 max-md:left-[22px]">
        <i className="block h-11 w-px animate-cue bg-linear-to-b from-gold to-gold/0 motion-reduce:animate-none" />
        <Mono className="text-[10.5px]">Scroll to explore</Mono>
      </div>
    </section>
  );
}
