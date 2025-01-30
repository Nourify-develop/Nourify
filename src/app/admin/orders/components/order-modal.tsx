"use client";

import { useState } from "react";
import { X, Edit2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
// import { table } from "console";
import { columns } from "../../products/components/_data";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    customerName: string;
    products: string;
    category: string;
    date: string;
    price: number;
    status: string;
  } | null;
}

export function OrderModal({ isOpen, onClose, order }: OrderModalProps) {
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(order?.status || "");

  if (!order) return null;

  const handleStatusUpdate = () => {
    // Call API or state update function here
    setEditStatus(false);
  };

  const statusColors = {
    completed: "!text-green-2",
    pending: "!text-neon",
    cancelled: "!text-dark-red",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] md:w-[70%] max-w-6xl bg-[#F8F7FB] shadow-lg pt-5 pb-10 rounded-lg overflow-hidden flex flex-col h-[80vh] "
          >
            {/* Header */}
            <div className="flex flex-col gap-9 px-8 pb-4  rounded-t-[20px]">
              <CardHeader className="flex flex-row !p-0 items-center justify-between">
                <CardTitle className="text-gray-8 text-[28px] font-bold">
                  Order Details
                </CardTitle>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white !m-0"
                >
                  <X className="h-6 w-6" />
                </button>
              </CardHeader>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-6 pb-4 flex-grow h-full custom-scrollbar">
              <div className="flex flex-col gap-5 bg-transparent h-full">
                <CardContent className="p-5 flex flex-col gap-5 bg-white rounded-lg w-full">
                  <div className="flex justify-between customize">
                    <p>Order ID</p>
                    <span>Order ID: {order.id}</span>
                  </div>
                  <div className="flex justify-between customize">
                    <p>Order Date</p>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between customize">
                    <p>Order Status</p>
                    <span
                      className={`text-sm font-medium ${
                        statusColors[
                          order.status as keyof typeof statusColors
                        ] || "!text-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </CardContent>
                <CardContent className="p-5 flex flex-col gap-5 bg-white rounded-lg w-full">
                  {" "}
                  <h5>Customer Information</h5>
                  <div className="flex justify-between customize">
                    <p>Name</p>
                    <span> {order.customerName}</span>
                  </div>
                  <div className="flex justify-between customize">
                    <p>Order Date</p>
                    <span>Phone Number:{order.category}</span>
                  </div>
                </CardContent>
                <CardContent className="p-5 flex flex-col gap-5 bg-white rounded-lg w-full">
                  <h5>Customer Information</h5>
                  <div className="flex justify-between customize">
                    <p>Subtotal</p>
                    <span>
                      ₦{Number(order.price.toFixed(2)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between customize">
                    <p>Tax</p>
                    <span>₦500.00</span>
                  </div>
                  <div className="flex justify-between customize">
                    <p>Total Cost</p>
                    <span className="text-xl font-bold">
                      ₦{Number((order.price + 500).toFixed(2)).toLocaleString()}
                    </span>
                  </div>
                </CardContent>

                {/* <CardContent className="p-6 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Order ID</h3>
                      <p>{order.id}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer Name</h3>
                      <p>{order.customerName}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Products</h3>
                      <p>{order.products}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Category</h3>
                      <p>{order.category}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Date</h3>
                      <p>{order.date}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Price</h3>
                      <p>₦{order.price.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent> */}
                <CardContent className="p-5 flex flex-col gap-5 bg-white rounded-lg w-full">
                  <h5>Product Details</h5>
                  <Table>
                    <TableHeader className="table-cell">
                      <TableRow className=" grid grid-cols-5">
                        <TableHead key={order.id} className="table-cell">
                          Product Name
                        </TableHead>
                        <TableHead key={order.id} className="table-cell">
                          Category
                        </TableHead>
                        <TableHead key={order.id} className="table-cell">
                          Quantity
                        </TableHead>
                        <TableHead key={order.id} className="table-cell">
                          Price
                        </TableHead>
                        <TableHead key={order.id} className="table-cell">
                          Total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow className=" grid grid-cols-5">
                        <TableCell key={order.id} className="table-cell">
                          {order.products}
                        </TableCell>
                        <TableCell key={order.id} className="table-cell">
                          {order.category}
                        </TableCell>
                        <TableCell key={order.id} className="table-cell">
                          {order.date}
                        </TableCell>
                        <TableCell key={order.id} className="table-cell">
                          N{order.price.toLocaleString()}
                        </TableCell>
                        <TableCell key={order.id} className="table-cell">
                          N{order.price.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </div>
            </div>

            {/* Footer */}
            {/* <div className="flex justify-end p-4 bg-gray-100 rounded-b-[20px]">
              <Button onClick={onClose}>Done</Button>
            </div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
