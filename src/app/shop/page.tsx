import OurProducts from "./components/OurProducts";
import Limoffer from "@/components/limoffer";
import Review from "./components/Review/reviews";
import { Suspense } from "react";
import RecentlyViewed from "./components/RecentlyViewed";

const Shop = () => {
  return (
    <div className="bg-white">
      <Suspense>
        <OurProducts />
        <RecentlyViewed />
      </Suspense>
    </div>
  );
};

export default Shop;
