/*
 * From Uiverse.io by Smit-Prajapati - https://uiverse.io/Smit-Prajapati/smart-liger-5
 * MIT License, Copyright (c) Smit-Prajapati (Smit Prajapati)
 *
 * The original's social buttons became skill chips (they keep the staggered pop-out on hover),
 * its "View more" link became the group index, and the logo in the circle stack is a per-group icon.
 */
import { cn } from '@/lib/utils';
import styles from './SkillCard.module.css';

/** Stroke icons (24px grid) shown in the front circle, keyed by skill group. */
const ICONS: Record<string, React.ReactNode> = {
  Languages: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  Frontend: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  Backend: (
    <>
      <rect x="3" y="3" width="18" height="7" rx="2" />
      <rect x="3" y="14" width="18" height="7" rx="2" />
      <path d="M7 6.5h.01M7 17.5h.01" />
    </>
  ),
  'Generative AI': (
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  ),
  Tools: (
    <path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L4.4 12.4a4 4 0 0 1 5.3-5.3z" />
  ),
};

/** One line under each group title. */
const BLURBS: Record<string, string> = {
  Languages: 'What the code is written in.',
  Frontend: 'Web and mobile interfaces.',
  Backend: 'APIs, data and real-time.',
  'Generative AI': 'LLMs, agents and retrieval.',
  Tools: 'Shipping and running it.',
};

type Props = { group: string; items: string[]; index: number; className?: string };

export default function SkillCard({ group, items, index, className }: Props) {
  return (
    <div className={cn(styles.parent, className)} data-no-halo>
      <div className={styles.card}>
        <div className={styles.logo} aria-hidden="true">
          <span className={cn(styles.circle, styles.circle1)} />
          <span className={cn(styles.circle, styles.circle2)} />
          <span className={cn(styles.circle, styles.circle3)} />
          <span className={cn(styles.circle, styles.circle4)} />
          <span className={cn(styles.circle, styles.circle5)}>
            <svg viewBox="0 0 24 24">{ICONS[group] ?? ICONS.Tools}</svg>
          </span>
        </div>
        <div className={styles.glass} />
        <div className={styles.content}>
          <h3 className={styles.title}>{group}</h3>
          {BLURBS[group] && <p className={styles.text}>{BLURBS[group]}</p>}
          <ul className={styles.tags}>
            {items.map((t, i) => (
              // Stagger the pop-out like the original's three buttons (0.4s, 0.6s, 0.8s…), capped so long lists don't lag.
              <li key={t} className={styles.tag} style={{ '--delay': `${Math.min(0.1 + i * 0.05, 0.7)}s` } as React.CSSProperties}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bottom}>
          <span className={styles.count}>{items.length} skills</span>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
