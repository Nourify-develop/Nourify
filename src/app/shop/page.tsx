import React from "react";
import OurProducts from "./components/OurProducts";
import Limoffer from "@/components/limoffer";
import Review from "./components/Review/reviews"

const page = () => {
  return (
    <div className="bg-white">
      <Limoffer/>
      <OurProducts />
      <Review/>
    </div>
  );
};

export default page;
