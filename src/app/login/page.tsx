"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Wrapper className="flex w-full !h-screen lg:h-full  !p-2 gap-6 bg-white">
      <section
        className="hidden h-auto lg:h-auto md:flex flex-col gap-4 rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
        style={{
          backgroundImage: "url('/images/bg-login.png')",
        }}
      >
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/50   top-0 left-0 rounded-xl z-0"></div>

        <div className="relative z-10 space-y-4">
          <Typography.p className="text-white !text-3xl font-extralight">
            Log in to continue your journey with fresh groceries and delicious
            pastries delivered straight to your door.
          </Typography.p>
          <Typography.s className="!text-sm text-white/80 pl-2.5 flex justify-start items-center gap-2.5 transition-opacity duration-1000">
            <img src="/general.svg" alt="General Icon" />
            Used by<span className="font-bold">15,000+</span>worldwide
          </Typography.s>
        </div>
        <div className="relative z-10 flex gap-1 justify-center items-center">
          <div className="w-10 h-1 rounded-full bg-gray-3"></div>
          <div className="w-36 h-1 rounded-full bg-white"></div>
        </div>
      </section>

      <section className="p-5 lg:p-10 pb-32 flex flex-col h-full gap-5 md:gap-10 w-full md:w-1/2">
        <Link href={`/`}>
          <Image
            src={`/NOURIFY.svg`}
            alt="Nourify logo"
            width={128}
            height={40}
          />
        </Link>
        <div className="flex flex-col w-full gap-3">
          <Typography.h2 className="!text-3xl !text-primary/90">
            Log into your account
          </Typography.h2>
          <Typography.p className="text-primary/70 text-base ">
            Don't have an account ?{" "}
            <Link href={`/signup`} className="text-secondary underline ">
              Sign Up{" "}
            </Link>
          </Typography.p>
        </div>
        <div className="flex flex-col gap-5">
          <button className="w-full text-primary/70 flex justify-center gap-2 items-center py-3 bg-gray-1 rounded-[50px]">
            <img src="/googleg logo 1.svg" />
            Continue with Google
          </button>
        </div>
        <div className="flex gap-2 w-full items-center">
          <hr className="border w-full" />
          <p>OR</p>
          <hr className="w-full" />
        </div>
        <form action="" className="flex flex-col s gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <div className="relative flex justify-start bg-gray-1 items-center w-full px-5 gap-2  rounded-[50px] py-3.5 ">
              <span className="bg">
                <img src="/mail-01.svg" />
              </span>
              <input
                type="email"
                placeholder="Enter your email address"
                className=" placeholder:text-sm text-sm bg-transparent w-full focus:outline-none appearance-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <div className="relative flex justify-start bg-gray-1 items-center w-full px-5 gap-2 py-3.5 rounded-[50px]">
              <span className="bg">
                <img src="/lock-key.svg" alt="Lock Icon" />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="placeholder:text-sm text-sm w-full bg-transparent focus:outline-none appearance-none"
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
          <div className="flex gap-2 items-center text-sm justify-end text-secondary ">
            <Link href={``}>Forgot Password?</Link>
          </div>
          <button className="flex w-full justify-center items-center py-3.5 bg-secondary rounded-[60px] text-white text-base">
            Create account
          </button>
        </form>
      </section>
    </Wrapper>
  );
};

export default Login;
