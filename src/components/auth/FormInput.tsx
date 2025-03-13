"use client"

import type React from "react"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"

interface FormInputProps {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  required?: boolean
  icon?: string
  isPassword?: boolean
  passwordVisible?: boolean
  togglePasswordVisibility?: () => void
  error?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  isPassword = false,
  passwordVisible,
  togglePasswordVisibility,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label}>{label}</label>
      <div className="relative flex justify-start border border-gray-1 items-center w-full gap-2 rounded-[50px] h-12 transition-all">
        {icon && (
          <span className="absolute left-5">
            <img src={icon || "/placeholder.svg"} alt={`${label} icon`} />
          </span>
        )}

        <input
          type={isPassword ? (passwordVisible ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field placeholder:text-sm text-sm ${
            icon ? "px-12" : "px-5"
          } w-full h-full rounded-[50px] focus:outline-0 appearance-none`}
          required={required}
        />

        {isPassword && togglePasswordVisibility && (
          <span
            className="absolute right-5 text-[#1e1e1e85] !text-base cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default FormInput

