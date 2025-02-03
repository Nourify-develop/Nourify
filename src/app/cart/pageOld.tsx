"use client";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/input";
import { useModal } from "@/app/cart/common/deleteProductModal";
import useCart from "@/hooks/useCart";
import Wrapper from "@/layout/wrapper";
import { ChevronRight, Delete, Dot, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, removeAllCart } = useCart();

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { showModal } = useModal();
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
        selectedProducts.filter((ProductId) => ProductId !== id)
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
    showModal(
      "Are you sure you want to remove this product from your cart?",
      () => {
        removeFromCart(productId);
        toast.success("Product removed from cart");
      }
    );
  };
  const handleClearAll = () => {
    showModal(
      "Are you sure you want to clear all products from your cart?",
      () => {
        removeAllCart();
        toast.success("All products removed from cart");
      }
    );
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
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
        <div className="flex justify-between">
          {" "}
          <h3 className="text-bold flex items-center text-xl md:text-[30px]">
            CART{" "}
            <span className="text-sm md:text-xl text-gray-5 font-light">
              ({cart.length} {cart.length === 1 ? "product" : "products"})
            </span>
          </h3>
          <button
            className="inline-block text-red-600 text-sm"
            onClick={handleClearAll}
          >
            Clear cart
          </button>
        </div>
        <div className="pt-8">
          {" "}
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
                <span className="checkbox__inner  h-5 w-5 md:h-6 md:w-6"></span>
              </label>
              <p className="text-sm md:text-2xl text-gray-8">Select all</p>
            </button>
            <button
              className="hidden md:inline-blocktext-red-600 text-xl"
              onClick={handleClearAll}
            >
              Clear all
            </button>
          </div>
          <div className="">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-x-2.5 md:gap-x-8"
                >
                  <div>
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox__input"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                      <span className="checkbox__inner h-4 w-4 md:h-5 md:w-5"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between  border-b-[0.5px] py-7.5 border-primary-2/40 w-full ">
                    <div className="flex  gap-4">
                      <div className="px-2 md:px-6 py-3 md:py-12 bg-gray-10 ">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-20 md:h-36 w-auto  object-contain rounded-[10px]"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-[11px] md:text-lg text-gray-6 font-medium">
                            {product.category}
                          </p>{" "}
                          <div className="flex gap-x-4">
                            {" "}
                            <h5 className="font-medium md:font-bold text-sm md:text-lg md:text-[28px] text-gray-8">
                              {product.name}
                            </h5>{" "}
                            <p
                              className={` hidden md:flex gap-x-1 items-center text-sm px-5 rounded-2xl ${
                                product.status === "In Stock"
                                  ? "text-secondary bg-secondary/10"
                                  : "text-red-600 bg-red-600/30"
                              }`}
                            >
                              <span className="text-xl">•</span>
                              {product.status}
                            </p>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <p className="flex md:hidden text-lg font-bold text-gray-8">
                            ₦
                            {product.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col ">
                          <p className="text-gray-6 text-lg">size </p>
                          <p className="text-gray-8 text-xl">
                            {capitalizeFirstLetter(product.size)}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-y-2">
                          <p className="text-lg text-gray-5">
                            Qty: {product.userQuantity}
                          </p>
                          <div className="flex bg-gray-10 rounded-full w-fit text-gray-8 px-6 py-3 gap-x-5 text-sm border-[1px] border-gray-light-2 ">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(
                                  product.id,
                                  product.userQuantity
                                )
                              }
                            >
                              <Minus className="h-4 focus-within::text-red-600 active:text-red-600" />
                            </button>
                            <p>{product.userQuantity}</p>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(
                                  product.id,
                                  product.userQuantity
                                )
                              }
                            >
                              <Plus className="h-4 focus-within::text-green-700 active:text-green-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col justify-between gap-y-20 xl:gap-y-24">
                      <div>
                        {" "}
                        <p className="text-3xl font-bold text-gray-8">
                          ₦
                          {product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className=" flex flex-col items-end gap-y-3">
                        {" "}
                        <button
                          className="rounded-full bg-gray-10 p-2 text-red-600"
                          onClick={() => handleRemove(product.id)}
                        >
                          <Trash2 className="h-6" />
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/shop/${product.category}/${product.name}`
                            )
                          }
                          className="rounded-full bg-gray-10 px-4 py-2 text-green-1 flex items-center text-lg"
                        >
                          View Product <ChevronRight className="h-6" />
                        </button>
                      </div>
                    </div>
                    <div className="flex md:hidden flex-col items-end justify-between= gap-y-10">
                      <p
                        className={` flex w-fit items-center text-xs pr-2 rounded-2xl ${
                          product.status === "In Stock"
                            ? "text-green-1 bg-green-1/30"
                            : "text-red-600 bg-red-600/30"
                        }`}
                      >
                        <Dot />
                        {product.status}
                      </p>
                      <div className="flex bg-gray-10 rounded-full  text-gray-8 px-3 py-2 gap-x-2 text-base border-[1px] border-gray-light-2">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(
                              product.id,
                              product.userQuantity
                            )
                          }
                        >
                          <Minus className="h-5" />
                        </button>
                        <p className="text-sm">{product.userQuantity}</p>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(
                              product.id,
                              product.userQuantity
                            )
                          }
                        >
                          <Plus className="h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-5">Your cart is empty.</p>
            )}
          </div>
        </div>
      </section>

      {/* Promo */}
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
              bg="bg-green-1/10 hover:bg-gray-3"
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
    </Wrapper>
  );
};

export default page;
