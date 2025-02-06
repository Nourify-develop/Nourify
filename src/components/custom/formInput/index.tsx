"use client";

import React, { useState, forwardRef } from "react";
import { Icon } from "@iconify/react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type: string;
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const inputType = type === "password" && isPasswordVisible ? "text" : type;

    return (
      <div className="relative w-full">
        {label && (
          <label className="block mb-1 font-normal font-aeonik">{label}</label>
        )}

        <span className="relative" style={{ position: "relative" }}>
          <input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-4 py-2.5 bg-transparent border rounded-full focus-visible:outline-none focus-visible:ring-1 
              ${isFocused ? "border-green-1" : "border-gray-2"} 
              ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-green-border-green-1"} 
              disabled:pointer-events-none ${className}`}
            {...props}
          />

          {type === "password" && (
            <span
              className="absolute -top-1 right-3 text-gray-600 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <Icon
                icon={isPasswordVisible ? "mdi:eye" : "mdi:eye-off"}
                width={24}
              />
            </span>
          )}
        </span>

        {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
