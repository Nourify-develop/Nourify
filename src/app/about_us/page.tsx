"use client";

import Typography from "@/components/typography";
import React from "react";

function page() {
  return (
    <>
      <section
        className="w-full h-[60vh] bg-black bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/about-bg.png')" }}
      >
        {/* Overlay for darkening effect */}
        <div className="absolute  bg-[#00000060] w-full h-full z-10 ">
          <div className="xl:px-20 px-5 flex flex-col h-full justify-end ">
            <h1 className="text-[80px] font-bold text-white uppercase ">
              about <span className="text-[#FFA500]">us</span>{" "}
            </h1>
          </div>
        </div>
      </section>

      <section className="flex lg:px-16 xl:px-20 px-5 pt-20 pb-8 bg-white h-full items-center">
        <main className="flex justify-between gap-20 w-full">
          <Typography.h2 className="uppercase !text-[2rem] !font-bold text-nowrap">
            our mission
          </Typography.h2>
          <div className="w-full text-xl space-y-8">
            <div className="text-gray-9">
              <p>
                At Nourify, our mission is simple: to offer you the finest
                groceries and pastries while ensuring unbeatable freshness and
                quality. We are dedicated to sourcing top-tier products that
                enrich your meals, helping you enjoy delicious moments every
                day.
              </p>
              <p>
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
      </section>
      <section className="flex xl:px-20 px-5 h-[664px] items-center">
        <div className="w-[651px] text-[#1e1e1e] space-y-8">
          <h3 className="capitalize font-medium text-4xl">
            Got Questions? We're Here to Help You Navigate Nourify
          </h3>
          <p className="font-normal text-lg ">
            Need help with our products, pricing, or anything else? We're here
            to assist
            <br />
            —reach out anytime!
          </p>
          <button className="capitalize text-[#079C4E] border border-[#079C4E] rounded-[65px] px-6 py-3">
            contact us
          </button>
        </div>
        <div>
          <img src="/images/contactusimage.png" alt="" />
        </div>
      </section>

      <section className="flex justify-end xl:px-20 px-5 py-4 bg-white">
        <main className="w-[75px] ">
          <p className="text-[#079C4E] text-lg font-medium cursor-pointer">
            Lets chat
          </p>
          <div className="w-full h-[1px] bg-[#079C4E]" />
        </main>
      </section>
    </>
  );
}

export default page;
