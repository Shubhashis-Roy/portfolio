// Decorative concept mockup (from the original design export)
import { cn } from '@/lib/utils';
import { pvIn } from './styles';

export default function PlayerIntelMockup() {
  return (
<div className={cn(pvIn, "bg-[radial-gradient(500px_300px_at_90%_0%,rgb(var(--gold-rgb)/0.16),rgb(var(--gold-rgb)/0)_70%),var(--color-panel)]")}>
<div className="parallax absolute inset-[64px_24px_24px] rounded-[18px] bg-[#0d0d0d] [border:1px_solid_rgba(255,255,255,0.08)] flex overflow-hidden">
<div className="flex-1 p-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[auto_1fr_1fr] gap-[12px] text-[11px] min-w-0">
<div className="col-span-2 flex justify-between items-center"><b className="font-display text-[15px]">Squad Intelligence</b><span className="[font:9.5px_'JetBrains_Mono'] text-[var(--color-gold)] [border:1px_solid_rgb(var(--gold-rgb)/0.35)] p-[4px_8px] rounded-[999px]">AI INSIGHTS</span></div>
<div className="[border:1px_solid_rgba(255,255,255,0.07)] rounded-[12px] p-[12px] flex flex-col gap-[8px]">
<span className="text-[#A1A1AA]">Player comparison</span>
<div className="flex justify-between text-[#71717A] text-[9.5px]"><span className="text-[var(--color-gold)]">Player A</span><span className="text-[var(--color-ember)]">Player B</span></div>
<div className="flex flex-col gap-[6px]">
<div><span className="text-[#71717A] text-[9.5px]">Pace</span><div className="flex gap-[3px] mt-[3px]"><i className="h-[5px] w-[62%] bg-[var(--color-gold)] rounded-[3px]"></i><i className="h-[5px] w-[38%] bg-[var(--color-ember)] rounded-[3px] opacity-[.8]"></i></div></div>
<div><span className="text-[#71717A] text-[9.5px]">Passing</span><div className="flex gap-[3px] mt-[3px]"><i className="h-[5px] w-[45%] bg-[var(--color-gold)] rounded-[3px]"></i><i className="h-[5px] w-[55%] bg-[var(--color-ember)] rounded-[3px] opacity-[.8]"></i></div></div>
<div><span className="text-[#71717A] text-[9.5px]">Workload</span><div className="flex gap-[3px] mt-[3px]"><i className="h-[5px] w-[52%] bg-[var(--color-gold)] rounded-[3px]"></i><i className="h-[5px] w-[48%] bg-[var(--color-ember)] rounded-[3px] opacity-[.8]"></i></div></div>
</div>
</div>
<div className="[border:1px_solid_rgba(255,255,255,0.07)] rounded-[12px] p-[12px] flex flex-col gap-[6px]">
<span className="text-[#A1A1AA]">Fitness indicator</span>
<div className="flex-1 flex items-center justify-center"><svg width="86" height="86" viewBox="0 0 100 100" role="img" aria-label="Illustrative fitness ring"><circle cx="50" cy="50" r="40" fill="none" stroke="#1f1f1f" strokeWidth="10" /><circle cx="50" cy="50" r="40" fill="none" style={{ stroke: 'var(--color-gold)' }} strokeWidth="10" strokeLinecap="round" strokeDasharray="180 252" transform="rotate(-90 50 50)" /><circle cx="50" cy="50" r="26" fill="none" stroke="#1f1f1f" strokeWidth="7" /><circle cx="50" cy="50" r="26" fill="none" style={{ stroke: 'var(--color-ember)' }} strokeWidth="7" strokeLinecap="round" strokeDasharray="100 164" transform="rotate(-90 50 50)" /></svg></div>
</div>
<div className="[border:1px_solid_rgba(255,255,255,0.07)] rounded-[12px] p-[12px] flex flex-col">
<span className="text-[#A1A1AA]">Performance trend</span>
<svg className="flex-1 w-[100%] mt-[6px]" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55 C 25 50, 35 30, 60 34 S 100 52, 120 30 S 165 10, 200 18" fill="none" style={{ stroke: 'var(--color-gold)' }} strokeWidth="2" /><path d="M0 60 C 30 58, 50 48, 80 50 S 130 40, 150 44 S 185 36, 200 38" fill="none" style={{ stroke: 'var(--color-ember)' }} strokeWidth="1.6" strokeDasharray="4 4" /></svg>
</div>
<div className="[border:1px_solid_rgb(var(--gold-rgb)/0.25)] bg-[rgb(var(--gold-rgb)/0.04)] rounded-[12px] p-[12px] flex flex-col gap-[7px]">
<span className="text-[var(--color-gold)]">AI recommendations</span>
<div className="flex justify-between"><span>Player 07</span><span className="text-[var(--color-ink)] bg-[var(--color-gold)] p-[1px_7px] rounded-[999px] text-[9.5px]">PLAY</span></div>
<div className="flex justify-between"><span>Player 12</span><span className="text-[var(--color-gold)] [border:1px_solid_var(--color-gold)] p-[0_7px] rounded-[999px] text-[9.5px]">BENCH</span></div>
<div className="flex justify-between"><span>Player 03</span><span className="text-[var(--color-ink)] bg-[var(--color-ember)] p-[1px_7px] rounded-[999px] text-[9.5px]">TRADE</span></div>
<div className="flex justify-between"><span>Player 18</span><span className="text-[#A1A1AA] [border:1px_solid_#52525B] p-[0_7px] rounded-[999px] text-[9.5px]">RELEASE</span></div>
</div>
</div>
</div>
</div>
  );
}
