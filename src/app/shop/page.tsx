import OurProducts from "./components/OurProducts";
import Limoffer from "@/components/limoffer";
import Review from "./components/Review/reviews"
import { Suspense } from "react";

const Shop = () => {

  return (
    <div className="bg-white">
      <Suspense>
        <OurProducts />
      </Suspense>
      <Review />
    </div>
  );
};

export default Shop;
