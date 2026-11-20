// Decorative concept mockup (from the original design export)
import { cn } from '@/lib/utils';
import { island, phone, pvIn, screen } from './styles';

export default function HealthcareMockup() {
  return (
<div className={cn(pvIn, "bg-[radial-gradient(600px_360px_at_80%_90%,rgba(224,118,58,0.2),rgba(224,118,58,0)_70%),radial-gradient(400px_260px_at_0%_0%,rgba(255,224,140,0.08),rgba(255,224,140,0)_70%),#0A0A0A]")}>
<div className="parallax absolute inset-[64px_24px_24px_24px]">
<div className="absolute left-[0] top-[0] right-[110px] bottom-[0] rounded-[18px] bg-[#0d0d0d] [border:1px_solid_rgba(255,255,255,0.08)] p-[16px] text-[11px] flex flex-col gap-[12px] overflow-hidden">
<div className="flex justify-between items-center"><b className="font-display text-[15px]">Consultations</b><span className="text-[#A1A1AA]">Physician workspace</span></div>
<div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[8px]">
<div className="flex flex-col gap-[6px]"><span className="[font:9px_'JetBrains_Mono'] text-[#71717A] tracking-[.1em]">INTAKE</span><span className="h-[38px] rounded-[8px] bg-[#161616]"></span><span className="h-[38px] rounded-[8px] bg-[#161616]"></span></div>
<div className="flex flex-col gap-[6px]"><span className="[font:9px_'JetBrains_Mono'] text-[#71717A] tracking-[.1em]">AI PLAN</span><span className="h-[38px] rounded-[8px] bg-[rgba(242,184,96,0.1)] [border:1px_solid_rgba(242,184,96,0.3)]"></span><span className="h-[38px] rounded-[8px] bg-[#161616]"></span></div>
<div className="flex flex-col gap-[6px]"><span className="[font:9px_'JetBrains_Mono'] text-[#F2B860] tracking-[.1em]">REVIEW</span><span className="h-[38px] rounded-[8px] bg-[#161616]"></span></div>
<div className="flex flex-col gap-[6px]"><span className="[font:9px_'JetBrains_Mono'] text-[#71717A] tracking-[.1em]">PHARMACY</span><span className="h-[38px] rounded-[8px] bg-[#161616]"></span><span className="h-[38px] rounded-[8px] bg-[#161616]"></span></div>
</div>
<div className="flex-1 rounded-[12px] [border:1px_solid_rgba(242,184,96,0.22)] bg-[rgba(242,184,96,0.03)] p-[14px] flex flex-col gap-[8px]">
<div className="flex justify-between items-center"><b>Treatment plan · draft</b><span className="[font:9px_'JetBrains_Mono'] text-[#E0763A] [border:1px_solid_rgba(224,118,58,0.4)] p-[3px_8px] rounded-[999px]">AI-GENERATED · AWAITING REVIEW</span></div>
<span className="text-[#71717A]">Patient [ID] · intake summary</span>
<i className="h-[6px] w-[92%] bg-[#1f1f1f] rounded-[3px]"></i><i className="h-[6px] w-[80%] bg-[#1f1f1f] rounded-[3px]"></i><i className="h-[6px] w-[86%] bg-[#1f1f1f] rounded-[3px]"></i><i className="h-[6px] w-[60%] bg-[#1f1f1f] rounded-[3px]"></i>
<div className="flex gap-[8px] mt-[auto]"><span className="p-[7px_12px] rounded-[999px] bg-[#F2B860] text-[#050505] font-semibold">Approve plan</span><span className="p-[7px_12px] rounded-[999px] [border:1px_solid_rgba(255,255,255,0.2)]">Request changes</span></div>
</div>
</div>
<div className={cn(phone, "absolute right-[0] bottom-[-30px] w-[170px] h-[350px] rounded-[30px]")}><div className={cn(screen, "rounded-[24px] text-[10px]")}>
<div className={cn(island, "w-[54px] h-[15px]")}></div>
<div className="p-[6px_12px] flex flex-col gap-[8px]">
<span className="[font:8.5px_'JetBrains_Mono'] text-[#F2B860] tracking-[.12em]">PATIENT APP</span>
<b className="font-display text-[15px] leading-[1.15]">Your plan is ready for review</b>
<div className="rounded-[12px] bg-[#161616] p-[10px] flex flex-col gap-[5px]"><span className="text-[#A1A1AA]">Reviewed by</span><b>[Physician name]</b></div>
<div className="rounded-[12px] bg-[#161616] p-[10px] flex items-center gap-[8px]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F2B860" strokeWidth="2" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg><span>Secure messages</span></div>
<span className="h-[34px] rounded-[999px] bg-[#F2B860] text-[#050505] font-semibold flex items-center justify-center mt-[4px]">Approve &amp; checkout</span>
</div>
</div></div>
</div>
</div>
  );
}
