"use client";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/input";
import { useModal } from "@/context/ModalContext";
import useCart from "@/hooks/useCart";
import Wrapper from "@/layout/wrapper";
import { ChevronRight, Delete, Dot, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

const page = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, removeAllCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Explicitly define type
  const { showModal } = useModal();
  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]); // Unselect all
    } else {
      setSelectedItems(cart.map((item) => item.id)); // Select all
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id)); // Unselect
    } else {
      setSelectedItems([...selectedItems, id]); // Select
    }
  };
  const handleIncreaseQuantity = (itemId: number, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };
  const handleRemove = (itemId: number) => {
    showModal(
      "Are you sure you want to remove this item from your cart?",
      () => {
        removeFromCart(itemId); // Remove the item from cart if confirmed
      }
    );
  };
  const handleClearAll = () => {
    showModal(
      "Are you sure you want to clear all items from your cart?",
      () => {
        removeAllCart();
      }
    );
  };
  const calculateTotal = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id)) // Filter selected items
      .reduce((acc, item) => acc + item.price * item.userQuantity, 0)
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
        <Typography.h3>
          CART{" "}
          <span className="text-xs text-gray-5 font-light">
            ({cart.length} {cart.length === 1 ? "product" : "products"})
          </span>
        </Typography.h3>
        <div className="pt-8">
          {" "}
          <div className="flex justify-between w-full">
            <button className="flex items-center gap-x-2.5 md:gap-x-8 text-base">
              <label className="checkbox flex">
                <input
                  type="checkbox"
                  className="checkbox__input"
                  checked={selectedItems.length === cart.length}
                  onClick={handleSelectAll}
                  readOnly
                />
                <span className="checkbox__inner  h-6 w-6"></span>
              </label>
              <p>Select all</p>
            </button>
            <button className="text-red-600" onClick={handleClearAll}>
              Clear all
            </button>
          </div>
          <div className="">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-x-2.5 md:gap-x-8"
                >
                  <div>
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox__input"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                      <span className="checkbox__inner h-5 w-5"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between  border-b-[0.5px] py-7.5 border-primary-2/40 w-full ">
                    <div className="flex  gap-4">
                      <div className="px-1.5 py-2.5 bg-gray-10 ">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 md:h-36 w-auto  object-contain rounded-[10px]"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-sm md:text-base text-gray-6">
                            {item.category}
                          </p>{" "}
                          <div className="flex gap-x-4">
                            {" "}
                            <h5 className="font-medium text-lg md:text-xl text-gray-8">
                              {item.name}
                            </h5>{" "}
                            <p
                              className={` hidden md:flex items-center text-xs pr-2 rounded-2xl ${
                                item.status === "In Stock"
                                  ? "text-green-1 bg-green-1/30"
                                  : "text-red-600 bg-red-600/30"
                              }`}
                            >
                              <Dot />
                              {item.status}
                            </p>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <p className="text-lg font-bold text-gray-8">
                            ₦
                            {item.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-y-2">
                          <p className="text-gray-6 text-sm">size </p>
                          <p className="text-gray-8 text-base">
                            {capitalizeFirstLetter(item.size)}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-y-2">
                          <p className="text-sm text-gray-5">
                            Qty: {item.userQuantity}
                          </p>
                          <div className="flex bg-gray-10 rounded-full w-fit text-gray-8 px-3.5 py-1.5 gap-y-3 text-sm">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(
                                  item.id,
                                  item.userQuantity
                                )
                              }
                            >
                              <Minus className="h-4" />
                            </button>
                            <p>{item.userQuantity}</p>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(
                                  item.id,
                                  item.userQuantity
                                )
                              }
                            >
                              <Plus className="h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col justify-between gap-y-20">
                      <div>
                        {" "}
                        <p className="text-xl font-bold text-gray-8">
                          ₦
                          {item.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className=" flex flex-col items-end gap-y-2">
                        {" "}
                        <button
                          className="rounded-full bg-gray-10 p-2 text-red-600"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 className="h-4" />
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/shop/${item.category}/${item.name}`)
                          }
                          className="rounded-full bg-gray-10 px-4 py-2 text-green-1 flex text-sm"
                        >
                          View Product <ChevronRight className="h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex md:hidden flex-col items-end justify-between= gap-y-10">
                      <p
                        className={` flex w-fit items-center text-xs pr-2 rounded-2xl ${
                          item.status === "In Stock"
                            ? "text-green-1 bg-green-1/30"
                            : "text-red-600 bg-red-600/30"
                        }`}
                      >
                        <Dot />
                        {item.status}
                      </p>
                      <div className="flex bg-gray-10 rounded-full  text-gray-8 px-3 py-2 gap-x-3 text-base">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(item.id, item.userQuantity)
                          }
                        >
                          <Minus className="h-5" />
                        </button>
                        <p>{item.userQuantity}</p>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(item.id, item.userQuantity)
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
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
          <Link href="/shop" className="w-full">
            <Button
              text="Continue Shopping "
              bg="bg-gray-7 hover:bg-gray-3"
              border="border-gray-7 hover:border-gray-3"
              color="text-white"
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
