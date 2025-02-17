"use client";
import { LuShoppingCart } from "react-icons/lu";
import { Product } from "../../types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      toast.success(`Product removed from cart`);
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
        <motion.div className="relative group" whileTap={{ scale: 0.95 }}>
          <button
            onClick={userQuantity > 0 ? handleRemoveFromCart : handleAddToCart}
            className={`${
              userQuantity ? "border-gray-6 border-[0.5px]" : ""
            } py-2 px-3 transition-all duration-500 ease-in-out rounded-md bg-gray-11 hover:bg-secondary flex items-center justify-center w-[45px] h-[40px] overflow-hidden`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={userQuantity > 0 ? "minus" : "cart"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {userQuantity > 0 ? (
                  <Minus className="h-5 w-4 lg:h-6 lg:w-5 text-gray-6 group-hover:text-white" />
                ) : (
                  <LuShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 text-gray-6 group-hover:text-white" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {userQuantity > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold group-hover:border-[2px] group-hover:border-white"
              >
                {userQuantity}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCard;
