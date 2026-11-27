'use client';

import { useSyncExternalStore } from 'react';
import { Sparkles, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME_STORAGE_KEY, THEMES, type ThemeName } from '@/galaxy/palette';

/** Space names that hint at each look: gold black hole = Supernova, violet black hole = Nebula. */
const LABELS: Record<ThemeName, { label: string; Icon: typeof Sun }> = {
  normal: { label: 'Supernova', Icon: Sun },
  dark: { label: 'Nebula', Icon: Sparkles },
};

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}
const getTheme = (): ThemeName => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'normal');
const getServerTheme = (): ThemeName => 'normal';

function setTheme(theme: ThemeName) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode — theme still applies for this visit */
  }
}

/** Segmented "Supernova / Nebula" theme switch shown in the nav. */
export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  return (
    <div
      role="radiogroup"
      aria-label="Change theme"
      className={cn('relative grid grid-cols-2 items-center rounded-full border border-white/12 bg-panel/60 p-1 backdrop-blur', className)}
    >
      {/* sliding highlight */}
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-gold/15 shadow-[inset_0_0_0_1px_rgb(var(--gold-rgb)/0.45)] transition-transform duration-300 ease-out-expo theme-dark:translate-x-full"
      />
      {THEMES.map((t) => {
        const { label, Icon } = LABELS[t];
        return (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={theme === t}
            title={`${label} theme`}
            onClick={() => setTheme(t)}
            className={cn(
              'relative z-1 flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors duration-300 max-md:px-2.5',
              // Styled from <html data-theme> via CSS so it is right on first paint, before hydration.
              t === 'normal'
                ? 'text-gold theme-dark:text-zinc-400 theme-dark:hover:text-white'
                : 'text-zinc-400 hover:text-white theme-dark:text-gold',
            )}
          >
            <Icon size={14} aria-hidden />
            <span className="max-md:sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
