"use client";
import useProducts from "@/hooks/useProducts";
import Wrapper from "@/layout/wrapper";

import ProductGrid from "@/ui/products/ProductGrid";
import React from "react";

const RecentlyViewed = () => {
  const { products } = useProducts();
  const limitedProducts = products.slice(0, 4);
  return (
    <Wrapper>
      {" "}
      {/* RECENTLY VIEWED  */}
      <div
        className="border-t"
        style={{ borderTopWidth: "0.5px", borderTopColor: "#F6F5F7" }}
      >
        {" "}
        <h1 className="uppercase text-primary-2/85 font-bold text-[2rem] leading-9 pt-[3rem] flex-1 mb-[2.5rem]">
          recently viewed
        </h1>
        <ProductGrid products={limitedProducts} />
      </div>
      <div className="flex items-center justify-center w-full gap-1 py-4">
        <span className="w-[161px] h-[3px] bg-[#079C4E]"></span>
        <span className="w-[30px] h-[3px] bg-[#A0A0A0]"></span>
        <span className="w-[30px] h-[3px] bg-[#A0A0A0]"></span>
      </div>
    </Wrapper>
  );
};

export default RecentlyViewed;
