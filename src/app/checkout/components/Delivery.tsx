"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { EditIcon } from "../../../../public/icons";

interface DeliveryDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export function DeliveryDetails({
  isOpen,
  onOpenChange,
}: DeliveryDetailsProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    phone: "+234 (81) 4123-4567",
    email: "johndoe484@gmail.com",
    address: "123, Elmwood Avenue, Springfield, IL 62701, Abuja, Nigeria",
  });

  const [tempFormData, setTempFormData] = useState<FormData>(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempFormData({
      ...tempFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(tempFormData);
    onOpenChange(false);
  };

  const handleClose = () => {
    setTempFormData(formData); // Reset temp data to current data
    onOpenChange(false);
  };

  return (
    <>
      <Card className="border-[1.5px] border-gray-light-2 flex flex-col">
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
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                {formData.name}
              </p>
            </div>
            <div>
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">Phone</Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                {formData.phone}
              </p>
            </div>
            <div className="col-span-2">
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">
                Email address
              </Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                {formData.email}
              </p>
            </div>
            <div className="col-span-2">
              <Label className="text-xs sm:text-sm text-[#9f9f9f]">
                Address
              </Label>
              <p className="text-gray-8 text-xs sm:text-lg font-medium">
                {formData.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-6">
          <div className="flex flex-col gap-2 mb-6">
              <Image src={EditIcon} alt="" />
            <h2 className="text-xl font-semibold">Edit Personal Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={tempFormData.name}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={tempFormData.email}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={tempFormData.phone}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address">Home address</Label>
              <Input
                id="address"
                value={tempFormData.address}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div className="flex gap-3 justify-end pt-4 w-full">
              <button
                type="button"
                onClick={handleClose}
                className=" py-2.5 rounded-full border !w-fit px-10 border-primary-2/50"
              >
                Cancel
              </button>
              <Button
                type="submit"
                className="px-8 bg-secondary hover:bg-secondary/90 rounded-full py-2.5"
              >
                Save and Continue
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
