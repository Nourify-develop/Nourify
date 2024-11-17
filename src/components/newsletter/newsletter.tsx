import React from "react";
import "./newsletter.css";
import Wrapper from "@/layout/wrapper";

const newsletter = () => {
  return (
    <Wrapper className="">
      <div className="lg:p-[5em] px-[1em] py-[2em]  rounded-2xl newsletter flex flex-col items-center gap-7">
        <div className="flex flex-col gap-4 text-center lg:w-[760px]">
          <h1 className="lg:text-[46px] text-2xl sm:text-3xl font-bold text-white ">
            SUBSCRIBE TO OUR NEWSLETTER
          </h1>
          <p className="text-base lg:text-[20px] font-medium text-white/70 sm:px-10 lg:px-4 text-center ">
            Enjoy the best deals and freshest finds every week. Stay updated with
            the latest grocery offers and more.
          </p>
        </div>
        <div className="flex justify-center lg:mt-6 w-[90%] md:w-[70%] lg:w-[85%] mx-auto">
          <form className="flex items-center w-full p-2.5 bg-white lg:w-[610px]  rounded-full z-20">
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-black pl-3.5 placeholder-gray-6  p-3 bg-transparent outline-none placeholder-[#1E1E1E80] md:text-[20px] text-[12px] font-space"
            />
            <button
              className="bg-secondary text-white font-medium text-[18px] lg:text-[20px]  lg:py-2 lg:px-6 px-3 py-3 rounded-full hover:bg-green-800 transition ease-linear duration-300  "
              // Disable the button while loading
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

    </Wrapper>
  );
};

export default newsletter;
