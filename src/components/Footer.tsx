import { profile } from '@/data/content';
import { Container } from './primitives';

export default function Footer() {
  return (
    <footer className="relative z-2 -mt-[100px]">
      <Container>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/8 py-8 text-[13px] text-zinc-500">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed &amp; engineered with care · Galaxy rendered in real time</span>
        </div>
      </Container>
    </footer>
  );
}
