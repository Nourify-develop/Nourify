"use client";
import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimeFrame = "weekly" | "monthly" | "yearly";

interface SalesData {
  period: string;
  sales: number;
}

interface RawData {
  weekly: SalesData[];
  monthly: SalesData[];
  yearly: SalesData[];
}

const rawData: RawData = {
  weekly: [
    { period: "Week 1", sales: 5000 },
    { period: "Week 2", sales: 7000 },
    { period: "Week 3", sales: 6000 },
    { period: "Week 4", sales: 9000 },
  ],
  monthly: [
    { period: "Jan", sales: 1000 },
    { period: "Feb", sales: 7000 },
    { period: "Mar", sales: 6000 },
    { period: "Apr", sales: 20000 },
    { period: "May", sales: 12000 },
    { period: "Jun", sales: 24000 },
    { period: "Jul", sales: 21000 },
    { period: "Aug", sales: 25000 },
    { period: "Sep", sales: 20000 },
    { period: "Oct", sales: 13000 },
    { period: "Nov", sales: 4000 },
    { period: "Dec", sales: 9000 },
  ],
  yearly: [
    { period: "2020", sales: 150000 },
    { period: "2021", sales: 180000 },
    { period: "2022", sales: 220000 },
    { period: "2023", sales: 250000 },
    { period: "2024", sales: 200000 },
  ],
};

const SalesAnalytics = () => {
  const [timeframe, setTimeframe] = useState<TimeFrame>("monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = useMemo(() => rawData[timeframe], [timeframe]);

  const currentSales = useMemo(() => {
    return data[data.length - 1].sales;
  }, [data]);

  const getYAxisTicks = (selectedTimeframe: TimeFrame): number[] => {
    switch (selectedTimeframe) {
      case "weekly":
        return [0, 2000, 4000, 6000, 8000, 10000];
      case "monthly":
        return [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
      case "yearly":
        return [0, 50000, 100000, 150000, 200000, 250000, 300000];
      default:
        return [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
  };

  const formatValue = (value: number): string => {
    if (value === 0) return "0";
    return timeframe === "yearly"
      ? `${(value / 1000000).toFixed(1)}M`
      : `${(value / 1000).toFixed(1)}K`;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-300 mx-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Sales Analytics</h2>
        <button
          className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 flex items-center gap-2"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-5 top-[4.5em] w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
            {["Weekly", "Monthly", "Yearly"].map((option) => (
              <button
                key={option}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700"
                onClick={() => {
                  setTimeframe(option.toLowerCase() as TimeFrame);
                  setIsDropdownOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#EAECF0"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <CartesianGrid
              horizontal={true}
              vertical={true}
              strokeDasharray="3 3"
              stroke="#EAECF0"
              opacity={0.8}
            />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              ticks={getYAxisTicks(timeframe)}
              tickFormatter={formatValue}
              dx={-10}
              width={60}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [
                `${formatValue(value)}`,
                "Sales made",
              ]}
              labelStyle={{ color: "#6B7280", marginBottom: "4px" }}
              cursor={{ stroke: "#EAECF0", strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#22C55E"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#22C55E" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalytics;
