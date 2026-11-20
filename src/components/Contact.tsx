import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Container, Eyebrow, Lead } from './primitives';
import ResumeButton from './ResumeButton';

const linkClass = 'font-mono text-xs tracking-[0.14em] text-zinc-400 uppercase no-underline transition-colors hover:text-gold';

function Social({ url, label }: { url: string; label: string }) {
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className={linkClass}>{label} ↗</a>
  ) : (
    <a href="#contact" className={linkClass}>{label} [URL]</a>
  );
}

export default function Contact() {
  return (
    <section id="contact" data-galaxy={0.85} data-gx="contact" className="pt-[200px] pb-40 text-center max-md:pt-[130px] max-md:pb-[110px]">
      <Container>
        <Eyebrow center className="reveal">05 — Contact</Eyebrow>
        <h2 className="reveal-text mx-auto my-0 max-w-[1000px] font-display text-[clamp(48px,7vw,108px)] leading-[0.98] font-semibold tracking-[-0.035em]">
          Let’s build something{' '}
          <span className="text-gold [text-shadow:0_0_60px_rgba(242,184,96,0.4)]">intelligent.</span>
        </h2>
        <Lead className="reveal mx-auto mt-7 max-w-[560px]">
          Open to conversations about AI products, full-stack engineering and real-time systems.
        </Lead>
        <div className="reveal mt-11 flex flex-wrap justify-center gap-3.5">
          <Button asChild>
            <a href={`mailto:${profile.email || 'your.email@domain.com'}`}>
              {profile.email || '[your.email@domain.com]'} <ArrowRight size={18} aria-hidden />
            </a>
          </Button>
          <ResumeButton icon={false} />
        </div>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-7">
          <Social url={profile.linkedin} label="LinkedIn" />
          <Social url={profile.github} label="GitHub" />
        </div>
      </Container>
    </section>
  );
}
