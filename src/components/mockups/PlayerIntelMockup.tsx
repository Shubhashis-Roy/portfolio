// Decorative concept mockup (from the original design export)
import { cn } from '@/lib/utils';
import { pvIn } from './styles';

export default function PlayerIntelMockup() {
  return (
<div className={cn(pvIn, "bg-[radial-gradient(500px_300px_at_90%_0%,rgba(242,184,96,0.16),rgba(242,184,96,0)_70%),#0A0A0A]")}>
<div className="parallax absolute inset-[64px_24px_24px] rounded-[18px] bg-[#0d0d0d] [border:1px_solid_rgba(255,255,255,0.08)] flex overflow-hidden">
<div className="max-md:hidden w-[48px] [border-right:1px_solid_rgba(255,255,255,0.06)] flex flex-col items-center gap-[14px] pt-[16px]"><span className="w-[20px] h-[20px] rounded-[6px] bg-[#F2B860]"></span><span className="w-[16px] h-[16px] rounded-[5px] bg-[#262626]"></span><span className="w-[16px] h-[16px] rounded-[5px] bg-[#262626]"></span><span className="w-[16px] h-[16px] rounded-[5px] bg-[#262626]"></span></div>
<div className="flex-1 p-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[auto_1fr_1fr] gap-[12px] text-[11px] min-w-0">
<div className="col-span-2 flex justify-between items-center"><b className="font-display text-[15px]">Squad Intelligence</b><span className="[font:9.5px_'JetBrains_Mono'] text-[#F2B860] [border:1px_solid_rgba(242,184,96,0.35)] p-[4px_8px] rounded-[999px]">AI INSIGHTS</span></div>
<div className="[border:1px_solid_rgba(255,255,255,0.07)] rounded-[12px] p-[12px] flex flex-col gap-[8px]">
<span className="text-[#A1A1AA]">Player comparison</span>
<div className="flex justify-between text-[#71717A] text-[9.5px]"><span className="text-[#F2B860]">Player A</span><span className="text-[#E0763A]">Player B</span></div>
<div className="flex flex-col gap-[6px]">
<div><span className="text-[#71717A] text-[9.5px]">Pace</span><div className="flex gap-[3px] mt-[3px]"><i className="h-[5px] w-[62%] bg-[#F2B860] rounded-[3px]"></i><i className="h-[5px] w-[38%] bg-[#E0763A] rounded-[3px] opacity-[.8]"></i></div></div>
<div><span className="text-[#71717A] text-[9.5px]">Passing</span><div className="flex gap-[3px] mt-[3px]"><i className="h-[5px] w-[45%] bg-[#F2B860] rounded-[3px]"></i><i className="h-[5px] w-[55%] bg-[#E0763A] rounded-[3px] opacity-[.8]"></i></div></div>
<div><span className="text-[#71717A] text-[9.5px]">Workload</span><div className="flex gap-[3px] mt-[3px]"><i className="h-[5px] w-[52%] bg-[#F2B860] rounded-[3px]"></i><i className="h-[5px] w-[48%] bg-[#E0763A] rounded-[3px] opacity-[.8]"></i></div></div>
</div>
</div>
<div className="[border:1px_solid_rgba(255,255,255,0.07)] rounded-[12px] p-[12px] flex flex-col gap-[6px]">
<span className="text-[#A1A1AA]">Fitness indicator</span>
<div className="flex-1 flex items-center justify-center"><svg width="86" height="86" viewBox="0 0 100 100" role="img" aria-label="Illustrative fitness ring"><circle cx="50" cy="50" r="40" fill="none" stroke="#1f1f1f" strokeWidth="10" /><circle cx="50" cy="50" r="40" fill="none" stroke="#F2B860" strokeWidth="10" strokeLinecap="round" strokeDasharray="180 252" transform="rotate(-90 50 50)" /><circle cx="50" cy="50" r="26" fill="none" stroke="#1f1f1f" strokeWidth="7" /><circle cx="50" cy="50" r="26" fill="none" stroke="#E0763A" strokeWidth="7" strokeLinecap="round" strokeDasharray="100 164" transform="rotate(-90 50 50)" /></svg></div>
</div>
<div className="[border:1px_solid_rgba(255,255,255,0.07)] rounded-[12px] p-[12px] flex flex-col">
<span className="text-[#A1A1AA]">Performance trend</span>
<svg className="flex-1 w-[100%] mt-[6px]" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55 C 25 50, 35 30, 60 34 S 100 52, 120 30 S 165 10, 200 18" fill="none" stroke="#F2B860" strokeWidth="2" /><path d="M0 60 C 30 58, 50 48, 80 50 S 130 40, 150 44 S 185 36, 200 38" fill="none" stroke="#E0763A" strokeWidth="1.6" strokeDasharray="4 4" /></svg>
</div>
<div className="[border:1px_solid_rgba(242,184,96,0.25)] bg-[rgba(242,184,96,0.04)] rounded-[12px] p-[12px] flex flex-col gap-[7px]">
<span className="text-[#F2B860]">AI recommendations</span>
<div className="flex justify-between"><span>Player 07</span><span className="text-[#050505] bg-[#F2B860] p-[1px_7px] rounded-[999px] text-[9.5px]">PLAY</span></div>
<div className="flex justify-between"><span>Player 12</span><span className="text-[#F2B860] [border:1px_solid_#F2B860] p-[0_7px] rounded-[999px] text-[9.5px]">BENCH</span></div>
<div className="flex justify-between"><span>Player 03</span><span className="text-[#050505] bg-[#E0763A] p-[1px_7px] rounded-[999px] text-[9.5px]">TRADE</span></div>
<div className="flex justify-between"><span>Player 18</span><span className="text-[#A1A1AA] [border:1px_solid_#52525B] p-[0_7px] rounded-[999px] text-[9.5px]">RELEASE</span></div>
</div>
</div>
</div>
</div>
  );
}
