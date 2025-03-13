"use client"

import type React from "react"

interface SocialAuthButtonProps {
  onClick: () => void
  icon: string
  children: React.ReactNode
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({ onClick, icon, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-primary-2/70 flex justify-center gap-2 items-center py-3 bg-gray-1 hover:bg-gray-2 transition rounded-[50px]"
    >
      <img src={icon || "/placeholder.svg"} alt="Social login icon" />
      {children}
    </button>
  )
}

export default SocialAuthButton

