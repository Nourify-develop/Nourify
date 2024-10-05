"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Wrapper className="flex w-full !h-auto lg:h-full !p-2 gap-6 bg-white">
      <section
        className="hidden
        h-auto lg:h-auto md:flex flex-col gap-4 rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
        style={{
          backgroundImage: "url('/images/signup-bg.png')",
        }}
      >
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/50   top-0 left-0 rounded-xl z-0"></div>

        <div className="relative z-10 space-y-4">
          <Typography.p className="text-white !text-3xl font-semibold">
            Welcome to Nourify, your trusted source for fresh groceries and
            pastries. Creating an account with us is the first step to enjoying
            a seamless shopping experience.
          </Typography.p>
          <Typography.s className="!text-sm text-white/80 pl-2.5 flex justify-start items-center gap-2.5 transition-opacity duration-1000">
            <img src="/general.svg" alt="General Icon" />
            Used by<span className="font-bold text-white">15,000+</span>worldwide
          </Typography.s>
        </div>
        <div className="relative z-10 flex gap-1 justify-center items-center">
          <div className="w-10 h-1 rounded-full bg-gray-3"></div>
          <div className="w-36 h-1 rounded-full bg-white"></div>
        </div>
      </section>
      <section className="p-5 lg:p-10 pb-32 flex flex-col h-full gap-5 md:gap-6 w-full md:w-1/2">
        <Link href={`/`}>
          <Image
            src={`/NOURIFY.svg`}
            alt="Nourify logo"
            width={128}
            height={40}
          />
        </Link>
        <div className="flex flex-col w-full gap-3">
          <Typography.h2 className="!text-3xl !text-primary/90 !font-bold">
            Create an account
          </Typography.h2>
          <Typography.p className="text-primary/70 text-base font-medium ">
            Already have an account ?{" "}
            <Link href={`/login`} className="text-secondary underline ">
              Log in{" "}
            </Link>
          </Typography.p>
        </div>
        <div className="flex flex-col gap-5">
          <button className="w-full text-primary/70 flex justify-center gap-2 items-center py-3 bg-gray-1 hover:bg-gray-2 transition rounded-[50px]">
            <img src="/googleg logo 1.svg" />
            Continue with Google
          </button>
        </div>
        <div className="flex gap-2 w-full items-center">
          <hr className="border w-full" />
          <p>OR</p>
          <hr className="w-full" />
        </div>
        <form action="" className="flex flex-col gap-5">
          <div className="flex sm:flex-row flex-col gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">First name</label>
              <input
                type="text"
                name="FirstName"
                className="input-field w-full px-5 py-3.5 placeholder:text-sm focus:outline-0 text-sm bg-gray-1 border border-gray-1 rounded-[50px]"
                placeholder="Enter your first name"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                name="LastName"
                className="input-field w-full py-3.5 placeholder:text-sm focus:outline-0 text-sm bg-gray-1 border border-gray-1 px-5  rounded-[50px]"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <div className=" relative flex justify-start border border-gray-1 items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
              <span className="bg absolute left-5">
                <img src="/mail-01.svg" />
              </span>

              <input
                type="email"
                placeholder="Enter your email address"
                className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
              <span className="bg absolute left-5">
                <img src="/lock-key.svg" alt="Lock Icon" />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
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
          <div className="flex gap-2 items-center ">
            <input type="checkbox" required />
            <label className="text-gray text-sm leading-[16px]">
              I agree with Nourify's{" "}
              <Link href={``} className="text-secondary underline ">
                Terms of Service{" "}
              </Link>{" "}
              and{" "}
              <Link href={``} className="text-secondary underline ">
                Privacy Policy{" "}
              </Link>
            </label>
          </div>
          <button className="flex w-full justify-center items-center py-3.5 bg-secondary hover:bg-green-dark transition rounded-[60px] text-white text-base">
            Create account
          </button>
        </form>
      </section>
    </Wrapper>
  );
};

export default SignUp;
