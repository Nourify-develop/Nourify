"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/input";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const PasswordInputDetails = [
    {
      placeholder: "Enter your old password",
      label: "Old password",
      value: oldPassword,
      type: passwordVisible ? "text" : "password",
      onChange: (e: any) => {
        setOldPassword(e.target.value);
      },
    },
    {
      placeholder: "Enter your new password",
      label: "New password",
      value: newPassword,
      type: passwordVisible ? "text" : "password",
      onChange: (e: any) => {
        setNewPassword(e.target.value);
      },
    },
    {
      placeholder: "Confirm new password",
      label: "Confirm new password",
      value: confirmNewPassword,
      type: passwordVisible ? "text" : "password",
      onChange: (e: any) => {
        setConfirmNewPassword(e.target.value);
      },
    },
  ];

  // code body
  return (
    <div className="flex flex-col justify-center  gap-5 w-full px-5 sm:px-10 pb-10">
      <form className="space-y-[2rem]">
        {PasswordInputDetails.map((input, idx) => (
          <div key={idx}>
            <label
              htmlFor="passwords"
              className="text-[#1E1E1ECC] text-[1rem] inline-block mb-2"
            >
              {input.label}
            </label>
            <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
              <span className="bg absolute left-5">
                <img src="/lock-key.svg" alt="Lock Icon" />
              </span>
              <input
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                onChange={input.onChange}
                className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none hover:bg-gray-200 transition-colors ease-in duration-150 "
              />
              <span
                className="absolute right-5 text-[#1e1e1e85] !text-base cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <IoEyeOffOutline className="" />
                ) : (
                  <IoEyeOutline />
                )}
              </span>
            </div>
          </div>
        ))}
        {/* button */}
        <Button
          text="Save Changes"
          border="border-green-1"
          color="text-white"
          bg="bg-green-1"
        />
      </form>
    </div>
  );
};

export default page;
