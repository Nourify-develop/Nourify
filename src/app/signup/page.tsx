import React from "react";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex w-full h-full p-5 gap-6 bg-white">
      <div
        className="h-auto flex flex-col gap-4 rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
        style={{
          backgroundImage: "url('/images/bg1.png')",
        }}
      >
        {/* <img src={`/images/bg1.png`} alt="" className="h-full fixe z-2" /> */}
        <p className="text-white text-3xl h-full flex items-end">
          Welcome to Nourify, your trusted source for fresh groceries ans
          pastries. Creating an account with us is the first step to enjoying a
          seamless shopping experience
        </p>
        <span className="text-sm pl-2.5 flex justify-start items-center gap-2.5 transition-opacity duration-1000">
          <img src="/general.svg" alt="General Icon" />
          Used by 15,000+ worldwide
        </span>
      </div>
      <div className="p-10 pb-32 flex flex-col h-full gap-10 w-1/2">
        <Image
          src={`/NOURIFY.svg`}
          alt="Nourify logo"
          width={128}
          height={40}
        />
        <div className="flex flex-col w-full gap-3">
          <h2 className="text-3xl text-primary/90">Create an account</h2>
          <span className="text-primary/70 text-base ">
            Already have an account ?{" "}
            <Link href={``} className="text-secondary underline ">
              Log in{" "}
            </Link>
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <button className="w-full text-primary/70 flex justify-center gap-2 items-center py-3 bg-gray-1 rounded-[50px]">
            <img src="/googleg logo 1.svg" />
            Continue with Google
          </button>
          <button className="w-full text-primary/70 flex justify-center gap-2 items-center py-3 bg-gray-1 rounded-[50px]">
            <img src="/Apple logo 1.svg" />
            Continue with Apple
          </button>
        </div>
        <div className="flex gap-2 w-full items-center">
          <hr className="border w-full" />
          <p>OR</p>
          <hr className="w-full" />
        </div>
        <form action="" className="flex flex-col gap-5">
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">First name</label>
              <input
                type="text"
                name="FirstName"
                className="w-full px-5 py-3.5 placeholder:text-sm focus:outline-none text-sm bg-gray-1 rounded-[50px]"
                placeholder="Enter your first name"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                name="LastName"
                className="w-full py-3.5 placeholder:text-sm focus:outline-none text-sm bg-gray-1 px-5  rounded-[50px]"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <div className="relative flex justify-start bg-gray-1 items-center w-full px-5 gap-2  rounded-[50px] py-3.5 ">
              <span className="bg">
                <img src="/mail-01.svg" />
              </span>
              <input
                type="email"
                placeholder="Enter your email address"
                className=" placeholder:text-sm text-sm bg-transparent w-full focus:outline-none appearance-none px-5"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <div className="relative flex justify-start bg-gray-1 items-center w-full px-5 gap-2 py-3.5 rounded-[50px] ">
              <span className="bg">
                <img src="/lock-key.svg" />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className=" placeholder:text-sm text-sm w-full bg-transparent focus:outline-none appearance-none"
              />
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
          <button className="flex w-full justify-center items-center py-3.5 bg-secondary rounded-[60px] text-white text-base">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
