import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border text-[13px] transition-all duration-300 ease-out-expo",
  {
    variants: {
      variant: {
        /** Technology / skill tag */
        tag: "h-8 cursor-default border-white/12 bg-white/3 px-[13px] text-zinc-300 hover:-translate-y-0.5 hover:border-gold/65 hover:bg-gold/6 hover:text-gold hover:shadow-[0_0_22px_rgb(var(--gold-rgb)/0.16)]",
        /** Content still to be filled in, e.g. "[Add stack]" */
        placeholder:
          "h-8 cursor-default border-dashed border-white/12 bg-white/3 px-[13px] text-zinc-400 hover:-translate-y-0.5 hover:border-gold/65 hover:text-gold",
        /** Organisation / owner pill */
        org: "gap-2 border-gold/30 bg-gold/6 px-3 py-1.5 text-gold",
      },
    },
    defaultVariants: {
      variant: "tag",
    },
  }
)

function Badge({
  className,
  variant = "tag",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
