// Decorative concept mockup (from the original design export)
import { cn } from '@/lib/utils';
import { pvIn } from './styles';

export default function WellnessMockup() {
  return (
<div className={cn(pvIn, "bg-[radial-gradient(520px_320px_at_10%_100%,rgba(236,160,96,0.18),rgba(236,160,96,0)_70%),#0A0A0A]")}>
<div className="parallax absolute inset-[64px_24px_24px] rounded-[18px] bg-[#0d0d0d] [border:1px_solid_rgba(255,255,255,0.08)] flex overflow-hidden text-[11px]">
<div className="max-md:hidden w-[150px] [border-right:1px_solid_rgba(255,255,255,0.06)] p-[14px_10px] flex flex-col gap-[6px]">
<span className="[font:9px_'JetBrains_Mono'] tracking-[.12em] text-[#71717A] mb-[4px]">HISTORY</span>
<span className="p-[7px_9px] rounded-[8px] bg-[rgba(242,184,96,0.08)] text-[#F2B860]">Evening check-in</span>
<span className="p-[7px_9px] text-[#A1A1AA]">Sleep routine</span>
<span className="p-[7px_9px] text-[#A1A1AA]">Work stress</span>
<span className="p-[7px_9px] text-[#A1A1AA]">Breathing practice</span>
</div>
<div className="flex-1 flex flex-col min-w-0">
<div className="h-[42px] [border-bottom:1px_solid_rgba(255,255,255,0.06)] flex items-center justify-between p-[0_14px]"><b className="font-display text-[13px]">Wellness Assistant</b><span className="flex items-center gap-[6px] text-[#F2B860] [border:1px_solid_rgba(242,184,96,0.35)] rounded-[999px] p-[4px_9px]"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>Voice</span></div>
<div className="flex-1 p-[14px] flex flex-col gap-[10px] overflow-hidden">
<span className="self-end max-w-[72%] p-[9px_12px] rounded-[14px_14px_4px_14px] bg-[#1c1c1c] leading-[1.45]">I’ve been feeling overwhelmed this week.</span>
<div className="self-start flex gap-[6px] flex-wrap"><span className="[font:9px_'JetBrains_Mono'] tracking-[.08em] text-[#E0763A] [border:1px_solid_rgba(224,118,58,0.35)] p-[4px_8px] rounded-[999px]">RETRIEVED · QDRANT</span><span className="[font:9px_'JetBrains_Mono'] text-[#A1A1AA] [border:1px_solid_rgba(255,255,255,0.1)] p-[4px_8px] rounded-[999px]">context ×3</span></div>
<div className="self-start max-w-[86%] p-[11px_13px] rounded-[14px_14px_14px_4px] bg-[linear-gradient(135deg,rgba(242,184,96,0.12),rgba(224,118,58,0.06))] [border:1px_solid_rgba(242,184,96,0.22)] leading-[1.5]">That sounds like a lot to carry. Would it help to break the week into smaller pieces and look at what felt heaviest?</div>
<div className="flex gap-[3px] items-center h-[22px] pl-[4px]"><i className="w-[3px] h-[8px] bg-[#F2B860] rounded-[2px]"></i><i className="w-[3px] h-[16px] bg-[#F2B860] rounded-[2px]"></i><i className="w-[3px] h-[11px] bg-[#F2B860] rounded-[2px]"></i><i className="w-[3px] h-[20px] bg-[#E0763A] rounded-[2px]"></i><i className="w-[3px] h-[9px] bg-[#E0763A] rounded-[2px]"></i><i className="w-[3px] h-[14px] bg-[#F2B860] rounded-[2px]"></i><span className="ml-[8px] text-[#71717A]">GPT-4.1 · responding</span></div>
</div>
<div className="m-[0_12px_12px] h-[36px] rounded-[12px] [border:1px_solid_rgba(255,255,255,0.1)] flex items-center p-[0_12px] text-[#71717A]">Share what’s on your mind…</div>
</div>
</div>
</div>
  );
}
