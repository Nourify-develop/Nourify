"use client";
import { LuShoppingCart } from "react-icons/lu";
import { Product } from "../../types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";
import { useState } from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [isImageLoading, setIsImageLoading] = useState(true);
  // Check if the product is in the cart
  const cartItem = cart.find((item) => item.id === product.id);
  const userQuantity = cartItem ? cartItem.userQuantity : 0;

  // Format the price with commas and ₦ symbol
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(product.price);
  const handleAddToCart = () => {
    if (userQuantity === 0) {
      toast.success(`Product added to cart`);
    }
    addToCart(product, 1);
  };

  const handleRemoveFromCart = () => {
    if (userQuantity === 1) {
      toast.error(`Product removed from cart`);
    }
    removeFromCart(product.id);
  };
  return (
    <div key={product.id} className="flex flex-col gap-1 text-center ">
      <div
        className="flex justify-between flex-col gap-y-2"
        onClick={() => router.push(`/shop/${product.category}/${product.name}`)}
      >
        <div className="h-auto overflow-hidden relative">
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[8px]" />
          )}
          <Image
            src={product.image}
            width={0}
            height={0}
            alt={product.name}
            className={`w-full h-auto cursor-pointer bg-gray-10 px-2 py-6 rounded-[8px] object-cover hover:scale-105 transition duration-700 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            title={product.name}
            aria-label={product.name}
            aria-labelledby={product.name}
            onLoadingComplete={() => setIsImageLoading(false)}
          />
        </div>
        <h3 className="text-base md:text-lg text-left font-medium text-gray-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </h3>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-left">
          <span className="font-bold text-base md:text-xl lg:text-2xl">
            {formattedPrice}
          </span>
          <span className="text-xs text-gray-5"> / pack</span>
        </p>
        {/* Render quantity buttons if product is in cart */}
        {userQuantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                userQuantity > 1
                  ? updateQuantity(product.id, userQuantity - 1)
                  : handleRemoveFromCart()
              }
              className="px-3 py-2 bg-gray-11 hover:bg-red text-white rounded-md transition-all duration-500 ease-linear"
            >
              -
            </button>
            <span className="text-lg font-medium">{userQuantity}</span>
            <button
              onClick={handleAddToCart}
              className="px-3 py-2 bg-gray-11 hover:bg-green-500 text-white rounded-md transition-all duration-500 ease-linear"
            >
              +
            </button>
          </div>
        ) : (
          // Render Add to Cart button if not in cart
          <button
            onClick={handleAddToCart}
            className="py-2 px-3 transition-all duration-500 ease-linear rounded-md bg-gray-11 hover:bg-secondary focus-within:hover:bg-secondary active:hover:bg-secondary group"
          >
            <LuShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 transition-all duration-500 ease-linear text-gray-6 group-hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
