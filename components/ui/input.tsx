import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-[#8B5A2B] bg-[rgba(139,90,43,0.2)] px-3 py-2 text-base text-[#3E2723] placeholder:text-[#8B5A2B] placeholder:opacity-70 focus-visible:outline-none focus-visible:border-[#D4A574] focus-visible:ring-3 focus-visible:ring-[rgba(212,165,116,0.2)] focus-visible:bg-[rgba(139,90,43,0.15)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
