// Decorative concept mockup (from the original design export)
import { cn } from '@/lib/utils';
import { browser, browserBar, browserUrl, pvIn } from './styles';

export default function PharmaMockup() {
  return (
<div className={cn(pvIn, "bg-[radial-gradient(560px_340px_at_20%_100%,rgba(232,150,90,0.18),rgba(232,150,90,0)_70%),var(--color-panel)]")}>
<div className="parallax absolute inset-[64px_24px_24px] rounded-[16px] overflow-hidden [border:1px_solid_rgba(255,255,255,0.08)] bg-[#0d0d0d]">
<div className={browser}>
<div className={browserBar}><i></i><i></i><i></i><span className={browserUrl}>[project-url]</span></div>
<div className="flex-1 flex [min-height:0] text-[11px]">
<div className="flex-1 p-[14px] flex flex-col gap-[10px] min-w-0">
<div className="flex justify-between items-center"><b className="font-display text-[14px]">All products</b><span className="w-[120px] h-[26px] rounded-[8px] bg-[#161616] flex items-center gap-[6px] p-[0_8px] text-[#71717A]"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>Search</span></div>
<div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[8px] flex-1">
<div className="rounded-[10px] bg-[#141414] p-[8px] flex flex-col gap-[5px]"><div className="flex-1 rounded-[7px] bg-[radial-gradient(circle_at_50%_50%,rgb(var(--gold-rgb)/0.25),#141414_70%)] flex items-center justify-center"><span className="w-[34px] h-[14px] rounded-[7px] bg-[linear-gradient(90deg,var(--color-gold)_50%,#F5F5F5_50%)]"></span></div><span>[Product name]</span><span className="text-[#A1A1AA]">[Price]</span></div>
<div className="rounded-[10px] bg-[#141414] p-[8px] flex flex-col gap-[5px] [outline:1px_solid_rgb(var(--gold-rgb)/0.5)]"><div className="flex-1 rounded-[7px] bg-[radial-gradient(circle_at_50%_50%,rgb(var(--ember-rgb)/0.25),#141414_70%)] flex items-center justify-center"><span className="w-[26px] h-[34px] rounded-[5px] bg-[#F5F5F5] [border-top:6px_solid_var(--color-ember)]"></span></div><span>[Product name]</span><span className="text-[#A1A1AA]">[Price]</span></div>
<div className="rounded-[10px] bg-[#141414] p-[8px] flex flex-col gap-[5px]"><div className="flex-1 rounded-[7px] bg-[radial-gradient(circle_at_50%_50%,rgb(var(--gold-rgb)/0.2),#141414_70%)] flex items-center justify-center"><span className="w-[30px] h-[30px] rounded-[50%] bg-[#F5F5F5] [box-shadow:inset_0_0_0_5px_var(--color-gold)]"></span></div><span>[Product name]</span><span className="text-[#A1A1AA]">[Price]</span></div>
<div className="rounded-[10px] bg-[#141414] p-[8px] flex flex-col gap-[5px]"><div className="flex-1 rounded-[7px] bg-[#181818]"></div><span>[Product name]</span><span className="text-[#A1A1AA]">[Price]</span></div>
<div className="rounded-[10px] bg-[#141414] p-[8px] flex flex-col gap-[5px]"><div className="flex-1 rounded-[7px] bg-[#181818]"></div><span>[Product name]</span><span className="text-[#A1A1AA]">[Price]</span></div>
<div className="rounded-[10px] bg-[#141414] p-[8px] flex flex-col gap-[5px]"><div className="flex-1 rounded-[7px] bg-[#181818]"></div><span>[Product name]</span><span className="text-[#A1A1AA]">[Price]</span></div>
</div>
</div>
<div className="max-md:hidden w-[190px] [border-left:1px_solid_rgba(255,255,255,0.07)] p-[14px] flex flex-col gap-[10px] bg-[var(--color-panel)]">
<b className="font-display text-[14px]">Cart</b>
<div className="flex gap-[8px] items-center"><span className="w-[34px] h-[34px] rounded-[8px] bg-[#161616]"></span><div><span>[Product name]</span><p className="m-[2px_0_0] text-[#71717A]">Qty 1</p></div></div>
<div className="flex gap-[8px] items-center"><span className="w-[34px] h-[34px] rounded-[8px] bg-[#161616]"></span><div><span>[Product name]</span><p className="m-[2px_0_0] text-[#71717A]">Qty 2</p></div></div>
<div className="mt-[auto] [border-top:1px_solid_rgba(255,255,255,0.08)] pt-[10px] flex flex-col gap-[6px]"><div className="flex justify-between text-[#A1A1AA]"><span>Subtotal</span><span>[—]</span></div><div className="flex justify-between"><b>Total</b><b>[—]</b></div><span className="h-[32px] rounded-[999px] bg-[var(--color-gold)] text-[var(--color-ink)] font-semibold flex items-center justify-center gap-[6px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Secure checkout</span></div>
</div>
</div>
</div>
</div>
</div>
  );
}
