import React from "react";
import OurProducts from "./components/OurProducts";
import Limoffer from "@/components/limoffer";

const page = () => {
  return (
    <div className="bg-white">
      <Limoffer/>
      <OurProducts />
    </div>
  );
};

export default page;
