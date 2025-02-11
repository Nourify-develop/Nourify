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
          "flex h-10 w-full rounded-[50px] border border-secondary bg-[#F8F7FB] input-field px-5 py-3 text-sm ring-offset-secondary file:border-0 file:bg-secondary file:text-sm focus-visible:outline-secondary focus:outline-secondary file:font-medium placeholder:text-muted-foreground duration-200 disabled:cursor-not-allowed disabled:opacity-50",
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

