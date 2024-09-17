import React, { HTMLAttributes } from 'react'

type ContainerProps = {
  children: React.ReactNode,
  className?: string
} & HTMLAttributes<HTMLDivElement>

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[120em] h-screen px-[4%] overflow-x-hidden ${className}`} {...props}>
      {children}
    </div>
  )
}
