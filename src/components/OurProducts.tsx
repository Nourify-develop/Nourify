"use client";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
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
];

const OurProducts: React.FC = () => {
  const getProductsToDisplay = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;

      if (width >= 1024) {
        // Desktop (8 items)
        return products.slice(0, 8);
      } else if (width >= 768) {
        // Tablet (6 items)
        return products.slice(0, 6);
      } else {
        // Mobile (4 items)
        return products.slice(0, 4);
      }
    }
    return products.slice(0, 4); // Default for server-side rendering
  };

  const [visibleProducts, setVisibleProducts] = React.useState<Product[]>(
    getProductsToDisplay()
  );

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleProducts(getProductsToDisplay());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white flex flex-col py-10 gap-10 px-6 md:px-20">
      <div className="flex justify-between flex-col gap-7 md:flex-row text-center md:text-left w-full">
        <h1 className="uppercase font-bold text-[2rem] leading-9 flex-1">
          our&nbsp;products{" "}
        </h1>
        <p className="font-medium text-xl text-primary-2 flex-1">
          Take a look at some of our wonderful products from Nourify - we take
          delight in making sure our customers have the best of the best
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-6 text-center mb-14"
          >
            <img src={product.image} alt={product.name} />
            <div className="flex justify-between items-end">
              <div className="flex justify-start text-left flex-col gap-3">
                <h3 className="text-lg font-medium text-gray-4">{product.name}</h3>
                <p className="">
                  <span className="font-bold text-2xl">{product.price}</span>
                  <span className="text-sm text-gray-5"> / per pack</span>
                </p>
              </div>
              <button className="py-3 px-4 transition-all duration-500 ease-linear rounded-md bg-background-2 hover:bg-secondary focus-within:hover:bg-secondary active:hover:bg-secondary group">
                <LuShoppingCart   className="h-6 w-6 transition-all duration-500 ease-linear text-gray-6 group-hover:text-white"/>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="bg-secondary text-white rounded-[65px] font-medium text-xl py-3 px-6 flex justify-between items-center">
          See More <img src="/arrow-up-right.svg" alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
