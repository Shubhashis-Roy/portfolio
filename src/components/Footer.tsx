import { profile } from '@/data/content';

export default function Footer() {
  return (
    <footer className="wrap">
      <div className="foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed &amp; engineered with care · Galaxy rendered in real time</span>
      </div>
    </footer>
  );
}
