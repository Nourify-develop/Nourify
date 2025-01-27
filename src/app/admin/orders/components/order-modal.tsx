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

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  // onUpdateStatus: (id: string, newStatus: string) => void
}

export function OrderModal({ isOpen, onClose, order }: OrderModalProps) {
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(order?.status || "");

  if (!order) return null;

  const handleStatusUpdate = () => {
    // onUpdateStatus(order.id, newStatus)
    setEditStatus(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-none backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className=" flex h-full md:h-[70vh] items-center justify-center bg-inherit"
          >
            <Card className="w-[65%] md:w-[70%] max-w-4xl overflow-y-auto bg-white">
              <CardHeader className="flex flex-row items-center justify-between sticky mb-5 top-0 bg-background z-10">
                <CardTitle>Order Details</CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
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
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <div className="flex items-center space-x-2">
                        <p>{order.status}</p>
                        <Dialog open={editStatus} onOpenChange={setEditStatus}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Status</DialogTitle>
                            </DialogHeader>
                            <RadioGroup
                              value={newStatus}
                              onValueChange={setNewStatus}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="completed"
                                  id="completed"
                                />
                                <Label htmlFor="completed">Completed</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pending" id="pending" />
                                <Label htmlFor="pending">Pending</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="cancelled"
                                  id="cancelled"
                                />
                                <Label htmlFor="cancelled">Cancelled</Label>
                              </div>
                            </RadioGroup>
                            <Button onClick={handleStatusUpdate}>
                              Update Status
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="flex justify-end p-6">
                <Button onClick={onClose}>Done</Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
