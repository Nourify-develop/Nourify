"use client";

import Typography from "@/components/typography";

import useCart from "@/hooks/useCart";
import Wrapper from "@/layout/wrapper";
import { Fragment, useEffect, useState } from "react";
import SwipeableCartItem from "./components/CartProduct";
import Link from "next/link";
import { Button } from "@/components/ui/input";
import { ConfirmModal } from "./common/deleteProductModal";
import { toast } from "sonner";

const Page = () => {
  const { cart, updateQuantity, removeFromCart, removeAllCart } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(
    () => () => {}
  );
  const handleSelectAll = () => {
    if (selectedProducts.length === cart.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(cart.map((product) => product.id));
    }
  };

  const handleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleIncreaseQuantity = (
    productId: number,
    currentQuantity: number
  ) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (
    productId: number,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleRemove = (productId: number) => {
    setModalMessage("Remove Product from Cart");
    setOnConfirmAction(() => () => {
      removeFromCart(productId);
      toast.success("Product removed from cart");
    });
    setIsModalOpen(true);
  };

  const handleClearAll = () => {
    setModalMessage("Remove all Products from Cart");
    setOnConfirmAction(() => () => {
      removeAllCart();
      toast.success("All Products removed from cart");
    });
    setIsModalOpen(true);
  };

  const calculateTotal = () => {
    return cart
      .filter((product) => selectedProducts.includes(product.id))
      .reduce((acc, product) => acc + product.price * product.userQuantity, 0)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  };
  useEffect(() => {
    // Set a 3-second timer to stop the loading state
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  return (
    <Wrapper className="bg-white">
      <nav className="flex items-center gap-x-1 text-gray-5 border-b border-gray-2 py-2">
        <p className="text-gray-5">Home /</p>

        <Fragment>
          <Link
            href={"/cart"}
            className={`capitalize hover:text-gray-3 text-gray-4 `}
          >
            cart
          </Link>
        </Fragment>
      </nav>
      <section className="w-full py-6">
        <Typography.h3>
          CART{" "}
          <span className="text-xs text-gray-5 font-light">
            ({cart.length} {cart.length === 1 ? "product" : "products"})
          </span>
        </Typography.h3>
        <div className="pt-8">
          <div className="flex justify-between w-full">
            <button className="flex items-center gap-x-2.5 md:gap-x-8 text-base">
              <label className="checkbox flex">
                <input
                  type="checkbox"
                  className="checkbox__input"
                  checked={selectedProducts.length === cart.length}
                  onClick={handleSelectAll}
                  readOnly
                />
                <span className="checkbox__inner h-6 w-6"></span>
              </label>
              <p>Select all</p>
            </button>
            <button className="text-red" onClick={handleClearAll}>
              Clear all
            </button>
          </div>
          <div className="">
            {isLoading ? (
              Array(2)
                .fill(null)
                .map((_, index) => (
                  <div className=" py-7.5 flex w-full gap-x-2.5 md:gap-x-8  animate-pulse items-center border-b-[0.5px]  border-primary-2/40 ">
                    <div>
                      <label className="checkbox">
                        <input type="checkbox" className="checkbox__input" />
                        <span className="checkbox__inner h-5 w-5"></span>
                      </label>
                    </div>
                    <div className="flex gap-x-4 w-full">
                      {" "}
                      <div className="px-2 md:px-6 py-3 md:py-12 bg-gray-300 animate-pulse rounded-[10px]">
                        <div className="h-20 md:h-36 w-20 md:w-36  " />
                      </div>
                      <div className="flex flex-col gap-y-2   w-full animate-pulse ">
                        <div className="h-8 md:h-full w-full   bg-gray-300 rounded-[10px]" />
                        <div className="h-8 md:h-full w-full   bg-gray-300 rounded-[10px]" />
                      </div>
                    </div>
                  </div>
                ))
            ) : cart.length > 0 ? (
              cart.map((product, index) => (
                <SwipeableCartItem
                  key={index}
                  product={product}
                  onRemove={handleRemove}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                  onSelect={handleSelectProduct}
                  isSelected={selectedProducts.includes(product.id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-1 p-5 space-y-6 rounded-[20px]">
        <Typography.h3>PROMO CODE</Typography.h3>

        <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
          <input
            type="text"
            placeholder="Email code"
            className=" bg-white border border-gray-2 placeholder:text-sm text-sm  px-4 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
          />
          <span className="absolute right-2 cursor-pointer">
            <button className="bg-green-1 px-5 py-2 text-sm rounded-full font-medium text-white">
              Apply
            </button>
          </span>
        </div>
        <hr className="border-primary-2/40" />
        <div className="space-y-3">
          <div className="flex justify-between text-gray-6 ">
            <p>Subtotal</p>
            <p>₦{calculateTotal()}</p>
          </div>
          <div className="flex justify-between text-gray-6 ">
            <p>Discount</p>
            <p>₦0.00</p>
          </div>
          <div className="flex justify-between text-primary-2  ">
            <p>Total</p>
            <p>₦{calculateTotal()}</p>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-3">
          <Link href="/shop" className="w-full md:w-fit">
            <Button
              text="Continue Shopping "
              bg="bg-green-1/10 hover:bg-white"
              border="border-green-1/10 hover:border-green-1/30"
              color="text-green-1"
            />
          </Link>
          <Button
            text="Proceed to Checkout"
            bg="bg-green-1 hover:bg-green-dark"
            border="border-green-1 hover:border-green-dark "
            color="text-white"
          />
        </div>
      </section>
      <ConfirmModal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={() => {
          onConfirmAction();
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      />
    </Wrapper>
  );
};

export default Page;
