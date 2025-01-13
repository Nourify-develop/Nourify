"use client";
import Wrapper from "@/layout/wrapper";
import React from "react";

const Limoffer = () => {
  return (
    <div className="text-center gap-2 md:text-left  relative md:static flex md:flex-row bg-gradient-to-r from-gray-900 via-green-700 to-green-600 rounded-lg justify-between items-center overflow-hidden md:overflow-visible ">
      <div className="pl-4 py-4 text-white flex flex-col gap-[0.7em] md:w-[50%] w-full ">
        <h3 className="text-[12px] text-left md:text-lg">Limited offer</h3>
        <h1 className="font-[700] text-[14px] text-left md:text-[20px] lg:text-4xl">
          Up to 20% off on Groceries and Pastries
        </h1>
        <button className="border border-white rounded-full py-3 px-6 w-fit font-medium text-[12px]  md:py-2 md:px-4 md:text-base   ">
          Shop Now
        </button>
      </div>

      <div className="w-full md:w-[50%] h-[176px] md:h-full flex lg:-mt-[2em]">
        <img
          src="/veggies.svg"
          alt="Groceries image"
          className="w-[150%] md:w-[80%] h-full object-cover absolute md:relative right-[-48%] top-[0%] md:right-0 md:top-0 z-10"
        />
      </div>
    </div>
  );
};

export default Limoffer;

// absolute sm:right-[-10rem] top-[-3rem] md:block
