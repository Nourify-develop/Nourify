"use client";

import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import React from "react";

function page() {
  return (
    <>
      <section
        className="w-full h-[30vh] sm:h-[60vh] z-10 bg-black bg-cover bg-center relative bg-[url('/icons/aboutus-mobile.svg')] sm:bg-[url('/images/about-bg.png')]"
        // style={{ backgroundImage: "url('/images/about-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60  z-0"></div>

        {/* Overlay for darkening effect */}
        <Wrapper className="absolute  w-full h-full z-10 ">
          <div className="  flex flex-col h-full justify-end ">
            <h1 className=" text-[40px] sm:text-[80px] font-bold text-white uppercase ">
              about <span className="text-yellow">us</span>{" "}
            </h1>
          </div>
        </Wrapper>
      </section>

      <Wrapper className="flex bg-white h-full sm:items-center">
        <main className="flex flex-col sm:flex-row text-center sm:text-start justify-between gap-2.5 md:gap-20 lg:gap-32 w-full">
          <Typography.h2 className="uppercase !text-[2rem] !font-bold text-nowrap">
            our mission
          </Typography.h2>
          <div className="w-full text-sm sm:text-xl space-y-8">
            <div className="text-gray-9 capitalize">
              <p className="sm:text-justify">
                At Nourify, our mission is simple: to offer you the finest
                groceries and pastries while ensuring unbeatable freshness and
                quality. We are dedicated to sourcing top-tier products that
                enrich your meals, helping you enjoy delicious moments every
                day.
              </p>
              <p className="sm:text-justify">
                At Nourify, our mission is simple: to offer you the finest
                groceries and pastries while ensuring unbeatable freshness and
                quality. We are dedicated to sourcing top-tier products that
                enrich your meals, helping you enjoy delicious moments every
                day.
              </p>
            </div>

            <button className="capitalize text-white text-sm bg-secondary rounded-[64px] px-6 py-3">
              Start shopping
            </button>
          </div>
        </main>
      </Wrapper>
      <Wrapper className="flex !py-4 justify-between gap-2.5 sm:gap-10 bg-gray-1 items-center">
        <div className="w-2/3 text-primary-2 flex flex-col gap-2 sm:gap-6 ">
          <h3 className="capitalize sm:font-medium text-base font-bold sm:text-4xl">
            Got Questions? We're Here to Help You Navigate Nourify
          </h3>
          <p className="font-normal sm:text-lg ">
            Need help with our products, pricing, or anything else? We're here
            to assist
            <br />
            —reach out anytime!
          </p>
          <button className="capitalize text-secondary mt-2 border w-fit border-secondary rounded-[65px] px-6 py-3">
            shop now
          </button>
        </div>
        <div className="w-1/3">
          <img src="/icons/Group 21.svg" alt="" />
        </div>
      </Wrapper>

      <Wrapper className="flex justify-end xl:px-20 px-5 !pt-2 sm:py-4 bg-white">
        <p className="text-secondary text-xs sm:text-lg font-medium underline cursor-pointer">
          Lets chat
        </p>
      </Wrapper>
    </>
  );
}

export default page;
