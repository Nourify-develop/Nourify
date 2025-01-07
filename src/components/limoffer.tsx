"use client";
import Wrapper from "@/layout/wrapper";
import React from "react";

const Limoffer = () => {
  return (
    <Wrapper className= "bg-white">
      <div className=" gap-2 text-left flex  bg-gradient-to-r from-gray-900 via-green-700 to-green-600 rounded-3xl justify-between items-center overflow-hidden md:overflow-visible ">
        <div className="pl-[2em] py-4  text-white flex flex-col gap-[0.7em] w-[40%] md:w-[50%]">
          <h3 className="text-[12px] sm:text-sm md:text-lg !font-light">Limited offer</h3>
          <h1 className="font-[500] md:font-[700] text-sm sm:text-base  md:text-2xl md:text-[20px]  lg:text-4xl">
            Up to 20% off on <br /> Groceries and Pastries
          </h1>
          <button className="border border-white rounded-full py-2 px-4 sm:py-3 sm:px-6 w-fit font-medium text-sm sm:text-base whitespace-nowrap ">
            Shop Now
          </button>
        </div>

        <div className="relative  w-full  flex-col  -mr-[5em] md:mb-0 md:mr-0 md:-mt-[2em] h-full flex">
          <img
            src="/veggies.svg"
            alt="Groceries image"
            className="w-full self-end  object-cover h-[100%]"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Limoffer;
