"use client";

import { useState } from "react";
import { StatsCard } from "./components/stats-card";
import { OrdersTable } from "./components/orders-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from "@/data/orders";
import {
  CanceledOrder,
  CompletedOrder,
  PendingOrder,
  TotalOrder,
  Export
} from "../../../../public/icons";
import Image from "next/image";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const orderCounts = {
    all: orders.length,
    completed: orders.filter((order) => order.status === "completed").length,
    pending: orders.filter((order) => order.status === "pending").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  const exportToCSV = () => {
    const csv = filteredOrders
      .map((order) => Object.values(order).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "orders.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto py-1">
      <div className="flex items-center justify-end">
        <button
          onClick={exportToCSV}
          className="border-[0.5px] flex gap-1 items-center text-base hover:bg-secondary-2/20 duration-200 bg-white rounded-full px-4 xl:px-6 py-2 xl:py-2.5 text-secondary"
        >
          <Image src={Export} alt='trade-up'  />
          Export CSV
        </button>
      </div>

      <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatsCard
          title="Total Orders"
          subtitle="Last 30 days"
          value={orderCounts.all.toString()}
          change={2.5}
          icon={TotalOrder}
        />
        <StatsCard
          title="Pending Orders"
          subtitle="Last 30 days"
          value={orderCounts.pending.toString()}
          change={2.5}
          icon={PendingOrder}
        />
        <StatsCard
          title="Completed Orders"
          subtitle="Last 30 days"
          value={orderCounts.completed.toString()}
          change={-0.5}
          icon={CompletedOrder}
        />
        <StatsCard
          title="Cancelled Orders"
          subtitle="Last 30 days"
          value={orderCounts.cancelled.toString()}
          change={-0.5}
          icon={CanceledOrder}
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-8 lg:mt-12"
      >
        <TabsList className="bg-transparent gap-3 xl:gap-5">
          <TabsTrigger value="all">All Orders ({orderCounts.all})</TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({orderCounts.completed})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({orderCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Failed ({orderCounts.cancelled})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 ">
        <OrdersTable data={filteredOrders} />
      </div>
    </div>
  );
}
