"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert,AlertTitle, AlertDescription } from "@/components/ui/alert";
import { DeliveryDetails } from "./components/Delivery";
import { PaymentOptions } from "./components/Payment";
import { Items } from "./components/Items";
import { Summary } from "./components/Summary";
import Wrapper from "@/layout/wrapper";
import Image from "next/image";
import { AlertNoti } from "../../../public/icons";

export default function CheckoutPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Wrapper className="min-h-screen bg-gray-50 ">
      <div className="mx-auto max-w-7xl px-4 flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">CHECKOUT</h1>
        <div className="flex gap-5">
          <div className="flex flex-col  overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar-invisible">
            <Alert className="mb-8 bg-[#FFEECE] border border-[#E29D1A] rounded-[20px] flex gap-2 items-center">
              {/* <AlertCircle className="h-4 w-4" /> */}
              <Image src={AlertNoti} alt=""/>
              <div>
                  <AlertTitle className="capitalize text-primary-2/90 text-sm font-bold">
                    Verify your payment details before processing
                  </AlertTitle>
                  <AlertDescription className="text-[#9f9f9f] text-xs">
                  Ensure all information is correct to avoid delays or issues with your purchase
                  </AlertDescription>
              </div>
            </Alert>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <DeliveryDetails
                    isOpen={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  />
                  <PaymentOptions />
                  <Items />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Summary />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
