"use client";
import Wrapper from "@/layout/wrapper";
import React from "react";

const Limoffer = () => {
  return (
    <div className=" bg-white">
      <div className="text-center gap-2 md:text-left flex flex-col md:flex-row bg-gradient-to-r from-gray-900 via-green-700 to-green-600 rounded-3xl justify-between items-center overflow-hidden md:overflow-visible ">
        <div className="pl-[2em] py-4 text-white flex flex-col gap-[0.7em] md:w-[50%]">
          <h3 className="text-lg">Limited offer</h3>
          <h1 className="font-[700] text-2xl md:text-[20px] lg:text-4xl">
            Up to 20% off on Groceries and Pastries
          </h1>
          <button className="border border-white rounded-full py-3 px-6 w-fit font-medium text-base ">
            Shop Now
          </button>
        </div>

        <div className="relative  w-full lg:-mt-[2em] md:w-[50%]  md:h-full flex">
          <img
            src="/veggies.svg"
            alt="Groceries image"
            className="w-full   object-cover h-[100%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Limoffer;
