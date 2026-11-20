import { ArrowRight } from 'lucide-react';
import { profile, projects } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Container, Dot, Mono } from './primitives';
import ResumeButton from './ResumeButton';

const shadow = '[text-shadow:0_2px_24px_rgba(5,5,5,0.95),0_0_2px_rgba(5,5,5,0.8)]';

export default function Hero() {
  const facts = [
    [profile.experienceShort, 'Shipping production software'],
    [String(projects.length).padStart(2, '0'), 'Selected projects below'],
    ['AI · RT · FS', 'AI, real-time and full-stack'],
  ];
  return (
    <section
      id="top"
      data-galaxy={1}
      data-gx="hero"
      className="relative flex min-h-[min(100vh,940px)] items-center pt-20 pb-[120px] max-md:min-h-[min(100vh,860px)] max-md:pt-14 max-md:pb-[110px]"
    >
      <Container>
        <div className="max-w-[820px]">
          <div className="reveal mb-7 flex items-center gap-3.5">
            <Dot />
            <Mono tone="gold">{profile.role}</Mono>
          </div>
          <h1 className={`reveal-text m-0 font-display text-[clamp(52px,7.4vw,112px)] leading-[0.96] font-semibold tracking-[-0.035em] ${shadow}`}>
            Engineering{' '}
            <em className="text-gold not-italic [text-shadow:0_2px_30px_rgba(5,5,5,0.85),0_0_60px_rgba(242,184,96,0.3)]">Intelligent</em>{' '}
            Digital Experiences.
          </h1>
          <p className={`reveal mt-8 mb-0 max-w-[620px] text-xl leading-[1.65] text-[#C4C4CC] ${shadow}`}>
            I’m {profile.name}, an {profile.role} with {profile.experience} of experience building scalable web
            applications, intelligent AI systems, and real-time digital products.
          </p>
          <div className="reveal mt-11 flex flex-wrap gap-3.5">
            <Button asChild>
              <a href="#projects">
                Explore My Work <ArrowRight size={18} aria-hidden />
              </a>
            </Button>
            <ResumeButton />
          </div>
          <div className={`reveal mt-[72px] grid max-w-[760px] grid-cols-3 border-t border-white/10 max-md:mt-12 max-md:grid-cols-1 ${shadow}`}>
            {facts.map(([value, label]) => (
              <div key={label} className="pt-[22px] pr-6 max-md:pt-[18px] max-md:pr-0">
                <b className="mb-1.5 block font-display text-[28px] font-semibold tracking-[-0.02em]">{value}</b>
                <span className="text-sm text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="absolute bottom-10 left-12 flex items-center gap-3.5 max-md:left-[22px]">
        <i className="block h-11 w-px animate-cue bg-linear-to-b from-gold to-gold/0 motion-reduce:animate-none" />
        <Mono className="text-[10.5px]">Scroll to explore</Mono>
      </div>
    </section>
  );
}
