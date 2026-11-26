'use client';

import { useState } from 'react';
import { Popover } from 'radix-ui';
import { Briefcase, ChevronDown, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

const options = [
  { href: '#experience', icon: Briefcase, title: 'Company projects', text: 'Real-world products built at work' },
  { href: '#projects', icon: UserRound, title: 'Personal projects', text: 'Side projects I built on my own' },
];

/** "Projects" nav item: opens a small panel to pick company (Experience) or personal (Projects) work. */
export default function ProjectsMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className={cn(className, 'inline-flex cursor-pointer items-center gap-1 data-[state=open]:bg-white/5 data-[state=open]:text-white')}>
        Projects
        <ChevronDown size={14} aria-hidden className={cn('transition-transform duration-300', open && 'rotate-180')} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="center"
          sideOffset={14}
          className="z-50 flex gap-2 rounded-2xl border border-white/10 bg-ink/90 p-2 shadow-[0_20px_60px_rgb(0_0_0/0.5)] backdrop-blur-[14px]"
        >
          {options.map(({ href, icon: Icon, title, text }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex w-[230px] items-start gap-3 rounded-xl border border-transparent p-3.5 text-white no-underline transition-colors duration-300 hover:border-gold/35 hover:bg-gold/5"
            >
              <span className="flex size-9 flex-none items-center justify-center rounded-[10px] border border-gold/35 bg-gold/5 text-gold">
                <Icon size={18} aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-zinc-400">{text}</span>
              </span>
            </a>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
