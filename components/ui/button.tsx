import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-bold uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-gradient-to-br from-[#8B5A2B] to-[#6D4C41] text-[#FFF8E1] shadow-[0_4px_12px_rgba(139,90,43,0.4)] hover:from-[#6D4C41] hover:to-[#5D4037] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(139,90,43,0.5)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(139,90,43,0.4)] h-12 px-5",
          variant === "outline" &&
            "border-2 border-[#8B5A2B] bg-transparent text-[#8B5A2B] hover:bg-[rgba(139,90,43,0.1)] h-12 px-5",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
