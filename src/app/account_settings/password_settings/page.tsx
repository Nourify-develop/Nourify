"use client";
import React, { useState } from "react";
import Input, { Button } from "../../../components/ui/input";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // code body
  return (
    <div className="flex flex-col justify-center  gap-5 w-full px-5 sm:px-10 pb-10">
      <form className="space-y-[2rem]">
        <div>
          <label
            htmlFor="old-password"
            className="text-[#1E1E1ECC] text-[1rem] inline-block mb-2"
          >
            Old password
          </label>

          <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
            <span className="bg absolute left-5">
              <img src="/lock-key.svg" alt="Lock Icon" />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your old password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
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

        {/* 2nd */}
        <div>
          <label
            htmlFor="new-password"
            className="text-[#1E1E1ECC] text-[1rem] inline-block mb-2"
          >
            New password
          </label>

          <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
            <span className="bg absolute left-5">
              <img src="/lock-key.svg" alt="Lock Icon" />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
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
        {/* 3rd */}

        <div>
          <label
            htmlFor="confirm-new-password"
            className="text-[#1E1E1ECC] text-[1rem] inline-block mb-2"
          >
            Confirm new password
          </label>

          <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
            <span className="bg absolute left-5">
              <img src="/lock-key.svg" alt="Lock Icon" />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
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
