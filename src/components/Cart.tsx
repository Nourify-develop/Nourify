import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useCart from "@/hooks/useCart";

type CartProps = {
  handleClick?: () => void; // Type for the handleClick function
};

const Cart: React.FC<CartProps> = ({ handleClick }) => {
  const { cart } = useCart();
  return (
    <>
      <Link
        onClick={handleClick}
        href="/cart"
        className={`md:bg-gray-3 md:border-none bg-gray-1 border border-gray-light-2   rounded-full w-10 h-10 flex justify-center items-center relative cursor-pointer`}
      >
        <ShoppingCart className="text-gray-3 md:text-white" size={"25px"} />

        {cart.length > 0 ? (
          <p className="absolute top-4 md:-top-1 -right-2 md:right-1 lg:-right-1 bg-red px-1.5  rounded-full text-sm text-white flex items-center justify-center">
            {cart.length}
          </p>
        ) : (
          ""
        )}
      </Link>
    </>
  );
};

export default Cart;
