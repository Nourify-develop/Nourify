import Typography from "@/components/typography";
import { Button } from "@/components/ui/input";
import Wrapper from "@/layout/wrapper";
import Link from "next/link";
import React, { Fragment } from "react";

const page = () => {
  return (
    <Wrapper className="bg-white">
      <nav className="flex items-center gap-x-1 text-gray-5 border-b border-gray-2 py-2">
        <p className="text-gray-5">Home /</p>

        <Fragment>
          <Link
            href={"/cart"}
            className={`capitalize hover:text-gray-3 text-gray-4 `}
          >
            cart
          </Link>
        </Fragment>
      </nav>
      <section className="w-full py-6">
        <Typography.h3>
          CART{" "}
          <span className="text-xs text-gray-5 font-light">(4 products)</span>
        </Typography.h3>

        
        <div className="">{
        /* CART PRODUCTS GO HERE */}
        </div>
      </section>


      {/* Promo */}
      <section className="bg-gray-1 p-5 space-y-6 rounded-[20px]">
        <Typography.h3>PROMO CODE</Typography.h3>

        <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
          <input
            type="text"
            placeholder="Email code"
            className=" bg-white border border-gray-2 placeholder:text-sm text-sm  px-4 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
          />
          <span className="absolute right-2 cursor-pointer">
            <button className="bg-green-1 px-5 py-2 text-sm rounded-full font-medium text-white">
              Apply
            </button>
          </span>
        </div>
        <hr className="border-primary-2/40"/>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-6 ">
            <p>Subtotal</p>
            <p>₦180,500.00</p>
          </div>
          <div className="flex justify-between text-gray-6 ">
            <p>Discount</p>
            <p>₦0.00</p>
          </div>
          <div className="flex justify-between text-primary-2  ">
            <p>Total</p>
            <p className=" font-bold">₦180,500.00</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
          <Button
            text="Continue Shopping "
            bg="bg-gray-7 hover:bg-gray-3"
            border="border-gray-7 hover:border-gray-3"
            color="text-white"
          />
          <Button
            text="Proceed to Checkout"
            bg="bg-green-1 hover:bg-green-dark"
            border="border-green-1 hover:border-green-dark "
            color="text-white"
          />
        </div>
      </section>
    </Wrapper>
  );
};

export default page;
