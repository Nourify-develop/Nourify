import React, { HTMLAttributes } from 'react'

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>

export default function Wrapper({ children, className, ...props }: WrapperProps) {
  return (
    <div className={`mx-auto w-full max-w-[120em] px-[4%] py-8 md:py-12 ${className}`} {...props}>
      {children}
    </div>
  )
}
