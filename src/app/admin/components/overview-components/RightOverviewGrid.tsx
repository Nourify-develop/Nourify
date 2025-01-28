import React from "react";
import TopSellingProducts from "./blocks/TopSellingProducts";
import CustomerReview from "./blocks/CustomerReview";
import SalesTracker from "./blocks/SalesTracker";
// import Reviews from "@/components/Review/reviews";
const RightOverviewGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <TopSellingProducts />
      <CustomerReview />
      <SalesTracker />
    </div>
  );
};

export default RightOverviewGrid;
