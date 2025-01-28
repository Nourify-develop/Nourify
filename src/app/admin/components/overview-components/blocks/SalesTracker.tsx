import React from "react";

const SalesTracker = () => {
  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[22px]">Sales Tracker</h1>
        <form action="/" className="bg-gray-10 p-2 rounded-full">
          <select
            name="options"
            id="options"
            className="bg-transparent outline-none"
          >
            <option value="">All Time</option>
            <option value="yesterday">Yesterday</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default SalesTracker;
