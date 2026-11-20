import * as React from "react"
import { cn } from "cn"

/** Dark glass card that lifts and picks up a gold edge on hover. */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-3xl border border-white/8 bg-card p-8 text-card-foreground backdrop-blur-[6px] transition-[border-color,transform] duration-400 ease-out-expo hover:-translate-y-1 hover:border-gold/35",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "mt-[22px] mb-2.5 font-display text-[22px] font-semibold tracking-[-0.02em]",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("m-0 text-[15px] leading-[1.6] text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Card, CardTitle, CardDescription }
