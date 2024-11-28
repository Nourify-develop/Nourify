"use client";

import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import React from "react";

function page() {
  return (
    <>
      <section
        className="w-full h-[60vh] bg-black bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/about-bg.png')" }}
      >
        {/* Overlay for darkening effect */}
        <Wrapper className="absolute  bg-[#00000060] w-full h-full z-10 ">
          <div className="  flex flex-col h-full justify-end ">
            <h1 className="text-[80px] font-bold text-white uppercase ">
              about <span className="text-yellow">us</span>{" "}
            </h1>
          </div>
        </Wrapper>
      </section>

      <Wrapper className="flex l bg-white h-full items-center">
        <main className="flex justify-between md:gap-20 lg:gap-32 w-full">
          <Typography.h2 className="uppercase !text-[2rem] !font-bold text-nowrap">
            our mission
          </Typography.h2>
          <div className="w-full text-xl space-y-8">
            <div className="text-gray-9">
              <p className="text-justify">
                At Nourify, our mission is simple: to offer you the finest
                groceries and pastries while ensuring unbeatable freshness and
                quality. We are dedicated to sourcing top-tier products that
                enrich your meals, helping you enjoy delicious moments every
                day.
              </p>
              <p className="text-justify">
                At Nourify, our mission is simple: to offer you the finest
                groceries and pastries while ensuring unbeatable freshness and
                quality. We are dedicated to sourcing top-tier products that
                enrich your meals, helping you enjoy delicious moments every
                day.
              </p>
            </div>

            <button className="capitalize text-white bg-secondary rounded-[64px] px-6 py-3">
              shop our products
            </button>
          </div>
        </main>
      </Wrapper>
      <Wrapper className="flex !py-4 justify-between gap-10 bg-gray-1 items-center">
        <div className="w-full text-primary-2 flex flex-col gap-6 ">
          <h3 className="capitalize font-medium text-4xl">
            Got Questions? We're Here to Help You Navigate Nourify
          </h3>
          <p className="font-normal text-lg ">
            Need help with our products, pricing, or anything else? We're here
            to assist
            <br />
            —reach out anytime!
          </p>
          <button className="capitalize text-secondary mt-2 border w-fit border-secondary rounded-[65px] px-6 py-3">
            contact us
          </button>
        </div>
        <div className="w-full">
          <img src="/icons/Group 21.svg" alt="" />
        </div>
      </Wrapper>

      <Wrapper className="flex justify-end xl:px-20 px-5 py-4 bg-white">
        <p className="text-secondary text-lg font-medium underline cursor-pointer">
          Lets chat
        </p>
      </Wrapper>
    </>
  );
}

export default page;
