import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
type CartProps = {
  handleClick?: () => void; // Type for the handleClick function

};

const Cart: React.FC<CartProps> = ({ handleClick }) => {
  return (
    <>
      <Link
        onClick={handleClick}
        href="/cart"
        className={`md:bg-gray-3 md:border-none bg-gray-1 border border-gray-light-2   rounded-full w-10 h-10 flex justify-center items-center relative cursor-pointer`}
      >
        <IoCartOutline className="text-gray-3 md:text-white" size={"25px"} />

        <p className="absolute top-0 right-0 lg:right-0 bg-[#FF0000] border border-white h-[15px] w-[15px] rounded-full text-[10px] text-white flex items-center justify-center">
          2
        </p>
      </Link>
    </>
  );
};

export default Cart;
