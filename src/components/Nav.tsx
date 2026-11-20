import { profile } from '@/data/content';

const links = [
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#skills', 'Skills'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top" aria-label={`${profile.name} — home`}>
          <span className="mark">{profile.initials}</span>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>{profile.name}</span>
        </a>
        <nav className="links" aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-ghost sm" href="#contact">Let’s talk</a>
      </div>
    </header>
  );
}
