"use client";

import type React from "react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronRight, Dot, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFormat from "@/hooks/useFormat";

interface CartProductProps {
  product: any;
  onRemove: (id: number) => void;
  onIncreaseQuantity: (id: number, quantity: number) => void;
  onDecreaseQuantity: (id: number, quantity: number) => void;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const CartProduct: React.FC<CartProductProps> = ({
  product,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onSelect,
  isSelected,
}) => {
  const [offset, setOffset] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { formatPrice, capitalizeFirstLetter } = useFormat();
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.deltaX < 0) {
        setOffset(Math.max(-window.innerWidth * 0.7, eventData.deltaX));
      }
    },
    onSwipedLeft: (eventData) => {
      if (eventData.deltaX <= -window.innerWidth * 0.7) {
        onRemove(product.id);
      } else if (eventData.deltaX <= -window.innerWidth * 0.1) {
        setShowConfirm(true);
      } else {
        setOffset(0);
        setShowConfirm(false);
      }
    },
    onSwipedRight: () => {
      setOffset(0);
      setShowConfirm(false);
    },
  });
 

  return (
    <div className="relative w-full overflow-hidden">
      {/* Delete Background */}
      <div
        className="absolute top-0 right-0 bottom-0 flex items-center justify-end bg-red transition-all duration-200"
        style={{ width: `${Math.abs(offset)}px` }}
      >
        {offset <= -window.innerWidth * 0.1 && (
          <button
            onClick={() => onRemove(product.id)}
            className="text-white p-2 ml-2"
          >
            <Trash2 />
          </button>
        )}
      </div>

      {/* Swiping Cart Item */}
      <div
        {...handlers}
        style={{
          transform: `translateX(${offset}px)`,
          transition: "transform 0.2s ease-out",
        }}
        className="relative bg-white flex items-center transition-transform"
      >
        <div className="flex w-full items-center gap-x-2.5 md:gap-x-8">
          <div>
            <label className="checkbox">
              <input
                type="checkbox"
                className="checkbox__input"
                checked={isSelected}
                onChange={() => onSelect(product.id)}
              />
              <span className="checkbox__inner h-5 w-5"></span>
            </label>
          </div>
          <div className="flex items-center justify-between pr-2 border-b-[0.5px] py-7.5 border-primary-2/40 w-full ">
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
                    ₦{formatPrice(product.price * product.userQuantity)}
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
                        onDecreaseQuantity(product.id, product.userQuantity)
                      }
                    >
                      <Minus className="h-4 focus-within::text-red-600 active:text-red-600" />
                    </button>
                    <p>{product.userQuantity}</p>
                    <button
                      onClick={() =>
                        onIncreaseQuantity(product.id, product.userQuantity)
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
                  ₦{formatPrice(product.price * product.userQuantity)}
                </p>
              </div>
              <div className=" flex flex-col items-end gap-y-3">
                {" "}
                <button
                  className="rounded-full bg-gray-10 p-2 text-red-600"
                  onClick={() => onRemove(product.id)}
                >
                  <Trash2 className="h-6" />
                </button>
                <button
                  onClick={() =>
                    router.push(`/shop/${product.category}/${product.name}`)
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
                    onDecreaseQuantity(product.id, product.userQuantity)
                  }
                >
                  <Minus className="h-5" />
                </button>
                <p className="text-sm">{product.userQuantity}</p>
                <button
                  onClick={() =>
                    onIncreaseQuantity(product.id, product.userQuantity)
                  }
                >
                  <Plus className="h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
