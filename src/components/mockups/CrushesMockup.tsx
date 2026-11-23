// Decorative concept mockup (from the original design export)
import { cn } from '@/lib/utils';
import { island, phone, phones, pvIn, screen } from './styles';

export default function CrushesMockup() {
  return (
<div className={cn(pvIn, "bg-[radial-gradient(900px_480px_at_50%_110%,rgb(var(--ember-rgb)/0.28),rgb(var(--ember-rgb)/0)_70%),radial-gradient(500px_300px_at_15%_10%,rgb(var(--gold-rgb)/0.10),rgb(var(--gold-rgb)/0)_70%),var(--color-panel)]")}>
<div className={cn(phones, "parallax")}>

<div className={phone}><div className={screen}>
<div className={island}></div>
<div className="flex justify-between items-center p-[4px_16px_10px]"><b className="font-display text-[16px]">Discover</b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg></div>
<div className="relative flex-1 m-[0_12px]">
<div className="absolute inset-[10px_8px_70px] rounded-[20px] bg-[#1a1408] [transform:rotate(-4deg)]"></div>
<div className="absolute inset-[0_0_62px] rounded-[20px] overflow-hidden bg-[radial-gradient(120px_140px_at_50%_38%,rgb(var(--gold-rgb)/0.55),rgb(var(--ember-rgb)/0.25)_55%,rgba(20,12,4,1)_100%)] [border:1px_solid_rgb(var(--gold-rgb)/0.25)]">
<span className="absolute top-[12px] left-[12px] [font:9px_'JetBrains_Mono'] tracking-[.12em] text-[rgba(255,255,255,0.7)]">PHOTO</span>
<div className="absolute left-[0] right-[0] bottom-[0] p-[40px_14px_14px] bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.85))]"><b className="text-[15px]">[Name], [Age]</b><p className="m-[3px_0_0] text-[#D4D4D8]">[Short bio line]</p></div>
</div>
<div className="absolute bottom-[8px] left-[0] right-[0] flex justify-center gap-[14px]">
<span className="w-[44px] h-[44px] rounded-[50%] [border:1px_solid_rgba(255,255,255,0.2)] flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></span>
<span className="w-[44px] h-[44px] rounded-[50%] bg-[var(--color-gold)] flex items-center justify-center [box-shadow:0_0_24px_rgb(var(--gold-rgb)/0.5)]"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-ink)" aria-hidden="true"><path d="M12 21s-7-4.4-9.3-9C1.2 8.9 3 5 6.6 5c2 0 3.4 1.1 5.4 3 2-1.9 3.4-3 5.4-3C21 5 22.8 8.9 21.3 12 19 16.6 12 21 12 21z" /></svg></span>
</div>
</div>
<div className="h-[10px]"></div>
</div></div>

<div className={phone}><div className={cn(screen, "bg-[radial-gradient(180px_220px_at_50%_40%,rgb(var(--ember-rgb)/0.35),rgba(11,11,11,1)_75%)]")}>
<div className={island}></div>
<div className="flex-1 flex flex-col items-center justify-center text-center p-[0_16px]">
<div className="flex"><span className="w-[74px] h-[74px] rounded-[50%] bg-[radial-gradient(circle_at_40%_35%,var(--color-gold),#7a4a00)] [border:3px_solid_var(--color-panel)]"></span><span className="w-[74px] h-[74px] rounded-[50%] ml-[-18px] bg-[radial-gradient(circle_at_40%_35%,var(--color-ember),#5a2a00)] [border:3px_solid_var(--color-panel)]"></span></div>
<b className="font-display text-[24px] tracking-[-0.03em] mt-[20px] text-[var(--color-gold)]">It’s a match</b>
<p className="text-[#A1A1AA] m-[8px_0_22px] leading-[1.5]">You and [Name] liked each other.</p>
<span className="w-[100%] h-[38px] rounded-[999px] bg-[var(--color-gold)] text-[var(--color-ink)] font-semibold flex items-center justify-center">Send a message</span>
<span className="w-[100%] h-[38px] rounded-[999px] [border:1px_solid_rgba(255,255,255,0.2)] mt-[8px] flex items-center justify-center">Keep swiping</span>
</div>
</div></div>

<div className={phone}><div className={screen}>
<div className={island}></div>
<div className="flex items-center gap-[9px] p-[4px_14px_10px] [border-bottom:1px_solid_rgba(255,255,255,0.07)]"><span className="w-[28px] h-[28px] rounded-[50%] bg-[radial-gradient(circle_at_40%_35%,var(--color-ember),#5a2a00)]"></span><div><b>[Match name]</b><p className="m-[1px_0_0] text-[var(--color-gold)] text-[9.5px]">typing…</p></div></div>
<div className="flex-1 flex flex-col gap-[7px] p-[12px]">
<span className="self-start max-w-[78%] p-[8px_11px] rounded-[14px_14px_14px_4px] bg-[#1a1a1a] leading-[1.4]">Hey! That hiking photo looks amazing.</span>
<span className="self-end max-w-[78%] p-[8px_11px] rounded-[14px_14px_4px_14px] bg-[var(--color-gold)] text-[var(--color-ink)] leading-[1.4]">Thanks! Where was your last trip?</span>
<span className="self-start max-w-[78%] p-[8px_11px] rounded-[14px_14px_14px_4px] bg-[#1a1a1a] leading-[1.4]">Long story - video call later?</span>
<span className="self-end max-w-[78%] p-[8px_11px] rounded-[14px_14px_4px_14px] bg-[var(--color-gold)] text-[var(--color-ink)] leading-[1.4]">Sure, 8 pm works.</span>
</div>
<div className="m-[0_10px_12px] h-[36px] rounded-[999px] [border:1px_solid_rgba(255,255,255,0.12)] flex items-center justify-between p-[0_6px_0_14px] text-[#71717A]">Message…<span className="w-[26px] h-[26px] rounded-[50%] bg-[var(--color-ember)] flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div>
</div></div>

<div className={phone}><div className={cn(screen, "bg-[#120c04]")}>
<div className="absolute inset-[0] bg-[radial-gradient(160px_200px_at_50%_40%,rgba(236,160,96,0.45),rgba(18,12,4,1)_80%)]"></div>
<span className="absolute top-[40px] left-[14px] [font:9px_'JetBrains_Mono'] tracking-[.12em] text-[rgba(255,255,255,0.7)]">VIDEO · WEBRTC</span>
<div className="absolute top-[34px] right-[12px] w-[62px] h-[88px] rounded-[12px] [border:1px_solid_rgba(255,255,255,0.3)] bg-[radial-gradient(circle_at_50%_40%,rgb(var(--gold-rgb)/0.5),#1a1208)]"></div>
<div className="absolute left-[0] right-[0] bottom-[74px] text-center"><b className="text-[14px]">[Match name]</b><p className="m-[3px_0_0] text-[#D4D4D8]">04:12</p></div>
<div className="absolute left-[0] right-[0] bottom-[18px] flex justify-center gap-[12px]">
<span className="w-[40px] h-[40px] rounded-[50%] bg-[rgba(255,255,255,0.12)] flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg></span>
<span className="w-[40px] h-[40px] rounded-[50%] bg-[var(--color-ember)] flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" aria-hidden="true"><path d="M3 14c5-5 13-5 18 0l-2.5 2.5-3-1.5v-2.5a10 10 0 0 0-7 0V15l-3 1.5z" /></svg></span>
<span className="w-[40px] h-[40px] rounded-[50%] bg-[rgba(255,255,255,0.12)] flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" /></svg></span>
</div>
</div></div>

</div>
</div>
  );
}
