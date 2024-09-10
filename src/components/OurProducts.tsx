import React from "react";
import AddToCart from "../../public/add_to_cart.svg";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Garden Cucumbers", price: "₦50,000", image: "/cucumber.svg" },
  {
    id: 2,
    name: "Fresh Cherry Tomatoes",
    price: "₦50,000",
    image: "/tomatoes.svg",
  },
  { id: 3, name: "Fresh Cilantro", price: "₦50,000", image: "/cilantro.svg" },
  { id: 4, name: "Garden Cucumbers", price: "₦50,000", image: "/cucumber.svg" },
  { id: 5, name: "Garden Cucumbers", price: "₦50,000", image: "/cucumber.svg" },
  { id: 6, name: "Fresh Cilantro", price: "₦50,000", image: "/cilantro.svg" },
  { id: 7, name: "Garden Cucumbers", price: "₦50,000", image: "/cucumber.svg" },
  {
    id: 8,
    name: "Fresh Cherry Tomatoes",
    price: "₦50,000",
    image: "/tomatoes.svg",
  },
  // Add more products as needed...
];

const OurProducts: React.FC = () => {
  return (
    <div className="flex flex-col py-10 gap-10 px-6 md:px-20">
      <div className="flex justify-between flex-col gap-7 md:flex-row text-center md:text-left w-full ">
        <h1 className="uppercase font-bold text-[2rem] leading-9 flex-1">
          our&nbsp;products{" "}
        </h1>
        <p className="font-medium text-xl  flex-1">
          Take a look at some of our wonderful products from Nourify - we take
          delight in making sure our customers have the best of the best
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-6 text-center mb-14"
          >
            <img src={product.image} alt={product.name} />
            <div className=" flex justify-between">
              <div className="flex justify-start text-left flex-col gap-3">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className=" ">
                  <span className="font-bold text-2xl">{product.price}</span>
                  <span className="text-sm text-[#858585]"> / per pack</span>
                </p>
              </div>
              <button className="">
                <img src="/add_to_cart.svg" alt="add to cart" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end ">
        <button className="bg-[#087D40] text-white rounded-[65px] font-medium text-xl py-3 px-6 flex justify-between items-center">See More  <img src="/arrow-up-right.svg" alt="arrow" /></button>
      </div>
    </div>
  );
};

export default OurProducts;
