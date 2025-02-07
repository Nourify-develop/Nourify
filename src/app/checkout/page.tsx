"use client";

import { useState, useEffect, Fragment } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DeliveryDetails } from "./components/Delivery";
import { PaymentOptions } from "./components/Payment";
import { Items } from "./components/Items";
import { Summary } from "./components/Summary";
import Wrapper from "@/layout/wrapper";
import { AlertNoti } from "../../../public/icons";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const [summaryTopOffset, setSummaryTopOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState<
    Array<{ id: number; name: string; price: number; quantity: number }>
  >([]);

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 64;
      const scrollTop = window.scrollY;

      if (scrollTop > navbarHeight) {
        setSummaryTopOffset(scrollTop - navbarHeight);
      } else {
        setSummaryTopOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePayNowClick = () => {
    // Handle payment processing here
    console.log("Processing payment...");
  };

  return (
    <Wrapper className="min-h-screen bg-gray-50">
      <nav className="flex items-center gap-x-1 text-gray-5 border-b border-gray-2 py-2">
        <p className="text-gray-5">Home /</p>

        <Fragment>
          <Link
            href={"/cart"}
            className={`capitalize hover:text-gray-3 text-gray-5 `}
          >
            cart /
          </Link>
        </Fragment>
        <Fragment>
          <span className="text-primary-2">Checkout</span>
        </Fragment>
      </nav>
      <div className="mx-auto max-w-7xl py-8">
        <h1 className="mb-8 text-2xl font-semibold">CHECKOUT</h1>
        <div className="flex sm:flex-row flex-col gap-8">
          <div className="flex flex-col  sm:overflow-y-auto sm:max-h-[calc(100vh-100px)] custom-scrollbar-invisible">
            <Alert className="mb-8 bg-[#FFEECE] border border-[#E29D1A] rounded-[20px] py-2 sm:py-2.5 px-4 sm:px-5 flex gap-2 items-center">
              <Image src={AlertNoti} alt="" />
              <div>
                <AlertTitle className="capitalize text-primary-2/90 text-[10px] sm:text-sm font-bold">
                  Verify your payment details before processing
                </AlertTitle>
                <AlertDescription className="text-[#9f9f9f] text-[8px] sm:text-xs">
                  Ensure all information is correct to avoid delays or issues
                  with your purchase
                </AlertDescription>
              </div>
            </Alert>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <DeliveryDetails
                    isOpen={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  />
                  <PaymentOptions onValidChange={setIsPaymentValid} />
                  <Items
                    onTotalPriceChange={setTotalPrice}
                    onItemsChange={setItems}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Summary
              isPaymentValid={isPaymentValid}
              onPayNowClick={handlePayNowClick}
              totalPrice={totalPrice}
              items={items}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white p-4 transition-transform duration-300 sm:hidden z-[999]`}
      >
        <Button
          className="w-full rounded-full"
          onClick={handlePayNowClick}
          disabled={!isPaymentValid}
        >
          Pay Now
        </Button>
      </div>
    </Wrapper>
  );
}
