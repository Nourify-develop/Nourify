import React from "react";
import RightOverviewGrid from "./components/overview-components/RightOverviewGrid";

function page() {
  return (
    <div className="grid grid-cols-[2fr_1fr] min-h-screen">
      <div>Left Overview Grid</div>{" "}
      <div>
        <RightOverviewGrid />
      </div>
    </div>
  );
}

export default page;

//
