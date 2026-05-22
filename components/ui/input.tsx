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
          "flex h-12 w-full rounded-xl border-2 border-[#8B5A2B] bg-gradient-to-r from-[#3E2723] via-[#5D4037] to-[#6D4C41] px-3 py-2 text-base text-[#FFF8E1] placeholder:text-[#D4A574] placeholder:opacity-80 focus-visible:outline-none focus-visible:border-[#D4A574] focus-visible:ring-3 focus-visible:ring-[rgba(212,165,116,0.3)] focus-visible:from-[#4E3429] focus-visible:via-[#6D4C41] focus-visible:to-[#7D5C51] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
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
