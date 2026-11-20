/** Shared Tailwind class sets for the decorative project mockups. */

/** Inner layer of a project preview; zooms slightly when the project card is hovered. */
export const pvIn =
  'absolute inset-0 transition-transform duration-1000 ease-out-expo group-hover/project:scale-[1.035]';

/** Row of phone frames (Crushes). Scales down on tablets, scrolls sideways on phones. */
export const phones =
  'flex h-full items-start justify-center gap-[22px] px-10 pt-20 max-lg:origin-top max-lg:scale-[.82] max-md:scale-100 max-md:justify-start max-md:gap-4 max-md:overflow-x-auto max-md:px-[22px] max-md:pt-16 max-md:pb-6';

/** Phone hardware frame. Every second phone in a row sits lower. */
export const phone =
  'h-[430px] w-[208px] flex-none rounded-[36px] border border-white/14 bg-[linear-gradient(160deg,#222,var(--color-panel)_60%)] p-2 shadow-[0_40px_90px_rgba(0,0,0,0.7),0_0_60px_rgb(var(--ember-rgb)/0.08)] even:mt-14 max-md:even:mt-7';

/** Phone screen. */
export const screen = 'relative flex h-full w-full flex-col overflow-hidden rounded-[29px] bg-[var(--color-panel)] text-[11px]';

/** Dynamic-island notch. */
export const island = 'mx-auto mt-2 mb-1.5 h-[18px] w-16 flex-none rounded-xl bg-black';

/** Browser window (Pharma storefront). */
export const browser = 'absolute inset-0 flex flex-col';
export const browserBar =
  'flex h-10 flex-none items-center gap-[7px] border-b border-white/7 bg-[#0d0d0d] px-4 [&>i]:block [&>i]:size-[9px] [&>i]:rounded-full [&>i]:bg-[#2a2a2a]';
export const browserUrl =
  'ml-3.5 flex h-[22px] max-w-[280px] flex-1 items-center rounded-md bg-[#161616] px-2.5 font-mono text-[10.5px] text-zinc-500';
