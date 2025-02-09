"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface DeliveryDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeliveryDetails({
  isOpen,
  onOpenChange,
}: DeliveryDetailsProps) {
  return (
    <>
      <Card className="border-[1.5px] border-gray-light-2 flex flex-col ">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-xl font-bold text-primary-2/80">
              Delivery Details
            </CardTitle>
            <CardDescription className="text-xs sm:text-base font-medium text-[#9f9f9f]">
              Please enter your information for delivery
            </CardDescription>
          </div>
          <button
            className="bg-secondary/10 text-secondary text-sm font-medium px-6 py-3 rounded-full"
            onClick={() => onOpenChange(true)}
          >
            Edit
          </button>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">Name</Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">John Doe</p>
            </div>
            <div>
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">Phone</Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                +234 (81) 4123-4567
              </p>
            </div>
            <div className="col-span-2">
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">Email address</Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                johndoe484@gmail.com
              </p>
            </div>
            <div className="col-span-2">
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">Address</Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                123, Elmwood Avenue, Springfield, IL 62701, Abuja, Nigeria
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Delivery Details</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+234 (81) 4123-4567" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="johndoe484@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                defaultValue="123, Elmwood Avenue, Springfield, IL 62701, Abuja, Nigeria"
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
