"use client";
import Wrapper from "@/layout/wrapper";
import { products } from "@/ui/products/_data";
import ProductGrid from "@/ui/products/ProductGrid";
import React from "react";
import ProductRecommedation from "./ui/ProductRecommedation";

const AlsoLike = () => {
    const limitedProducts = products.slice(0, 5);
  return (
    <Wrapper>
      {" "}
      {/* YOU MAY ALSO LIKE  */}
      <div
        className="border-t"
        style={{ borderTopWidth: "0.5px", borderTopColor: "#F6F5F7" }}
      >
        {" "}
        <h1 className="uppercase text-primary-2/85 font-bold text-[2rem] leading-9 pt-[3rem] flex-1 mb-[2.5rem]">
          You may also like
        </h1>
        {/* <ProductGrid products={limitedProducts} /> */}
        <ProductRecommedation products={limitedProducts}/>
      </div>
     
    </Wrapper>
  );
};

export default AlsoLike;
