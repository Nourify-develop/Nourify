"use client"

import type React from "react"
import { TailSpin } from "react-loader-spinner"

interface AuthButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

const AuthButton: React.FC<AuthButtonProps> = ({
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex w-full justify-center items-center py-3.5 bg-secondary hover:bg-green-dark transition rounded-[60px] text-white text-base ${className}`}
    >
      {loading ? (
        <TailSpin
          visible={true}
          height="24"
          width="24"
          color="#ffffff"
          ariaLabel="tail-spin-loading"
          radius="4"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        children
      )}
    </button>
  )
}

export default AuthButton

