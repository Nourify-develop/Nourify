import React from "react";
import RightOverviewGrid from "./components/overview-components/RightOverviewGrid";
import Chart from '../admin/orders/components/chart'
import Stat from '../admin/orders/components/statcard'
import RecentOrders from '../admin/orders/components/recent-orders'

function page() {
  return (
    <div className="grid grid-cols-[2fr_1fr] min-h-screen">
      <div>
        <Stat/>
        <Chart/>
        <RecentOrders/>
        </div>{" "}
      
      <div>
        <RightOverviewGrid />
      </div>
    </div>
  );
}

export default page;


