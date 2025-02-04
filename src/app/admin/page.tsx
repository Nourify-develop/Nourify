import React from "react";
import RightOverviewGrid from "./components/overview-components/RightOverviewGrid";
import Chart from '../admin/orders/components/chart'

function page() {
  return (
    <div className="grid grid-cols-[2fr_1fr] min-h-screen">
      <div><Chart/></div>{" "}
      
      <div>
        <RightOverviewGrid />
      </div>
    </div>
  );
}

export default page;


