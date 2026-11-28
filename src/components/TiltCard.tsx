/*
 * From Uiverse.io by Smit-Prajapati - https://uiverse.io/Smit-Prajapati/smart-liger-5
 * MIT License, Copyright (c) Smit-Prajapati (Smit Prajapati)
 *
 * The original's social buttons became optional chips (they keep the staggered pop-out on hover),
 * its "View more" link became a footer with a label and index, and the logo in the circle stack is an icon.
 */
import { cn } from '@/lib/utils';
import styles from './TiltCard.module.css';

type Props = {
  title: string;
  text?: string;
  /** An <svg> shown in the front circle; styled as a 22px stroke icon. */
  icon: React.ReactNode;
  /** Chips that pop out of the card on hover. */
  items?: string[];
  /** Left side of the footer, e.g. "12 skills". */
  footer?: string;
  /** 0-based position, shown as 01, 02… in the footer. */
  index: number;
  className?: string;
};

export default function TiltCard({ title, text, icon, items, footer, index, className }: Props) {
  return (
    <div className={cn(styles.parent, className)} data-no-halo>
      <div className={styles.card}>
        <div className={styles.logo} aria-hidden="true">
          <span className={cn(styles.circle, styles.circle1)} />
          <span className={cn(styles.circle, styles.circle2)} />
          <span className={cn(styles.circle, styles.circle3)} />
          <span className={cn(styles.circle, styles.circle4)} />
          <span className={cn(styles.circle, styles.circle5)}>{icon}</span>
        </div>
        <div className={styles.glass} />
        <div className={cn(styles.content, !items?.length && styles.contentClear)}>
          <h3 className={styles.title}>{title}</h3>
          {text && <p className={styles.text}>{text}</p>}
          {items && items.length > 0 && (
            <ul className={styles.tags}>
              {items.map((t, i) => (
                // Stagger the pop-out like the original's buttons, capped so long lists don't lag.
                <li key={t} className={styles.tag} style={{ '--delay': `${Math.min(0.1 + i * 0.05, 0.7)}s` } as React.CSSProperties}>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.bottom}>
          <span className={styles.count}>{footer}</span>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
