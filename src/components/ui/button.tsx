import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-transparent font-semibold whitespace-nowrap outline-none select-none transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out-expo focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out-expo",
  {
    variants: {
      variant: {
        /** Solid gold call to action */
        default:
          "bg-primary text-primary-foreground hover:bg-gold-soft hover:text-primary-foreground enabled:hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgb(var(--gold-rgb)/0.35)] hover:[&_svg]:translate-x-[3px] [a]:hover:-translate-y-0.5",
        /** Dark glass button with a light border */
        outline:
          "border-white/18 bg-[rgb(var(--panel-rgb)/0.55)] text-white hover:text-white enabled:hover:-translate-y-0.5 enabled:hover:border-gold/60 [a]:hover:-translate-y-0.5 [a]:hover:border-gold/60 hover:[&_svg]:translate-x-[3px]",
        /** Round icon button (e.g. close) */
        icon: "border-white/18 bg-ink/60 text-white hover:border-gold hover:text-gold",
      },
      size: {
        default: "min-h-[52px] px-[26px] text-[15px]",
        sm: "min-h-11 px-5 text-sm",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
