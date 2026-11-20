import { profile } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Container } from './primitives';

const links = [
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#skills', 'Skills'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-5 border-b border-white/6 bg-ink/62 backdrop-blur-[14px]">
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <a className="flex items-center gap-3 text-white no-underline" href="#top" aria-label={`${profile.name} — home`}>
          <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 font-display text-sm font-semibold text-gold shadow-[0_0_24px_rgba(242,184,96,0.18)]">
            {profile.initials}
          </span>
          <span className="text-[15px] font-semibold">{profile.name}</span>
        </a>
        <nav className="flex gap-1.5 max-md:hidden" aria-label="Primary">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-2.5 text-sm text-zinc-400 no-underline transition-colors duration-300 hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <Button asChild variant="outline" size="sm">
          <a href="#contact">Let’s talk</a>
        </Button>
      </Container>
    </header>
  );
}
