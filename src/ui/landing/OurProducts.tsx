// OurProducts.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { products } from "../products/_data";
import { Product } from "../../types";
import ProductGrid from "../products/ProductGrid"; // Adjust the path

const OurProducts: React.FC = () => {
  const router = useRouter();
  const getProductsToDisplay = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;

      if (width >= 1024) {
        return products.slice(0, 8); // Desktop (8 items)
      } else if (width >= 768) {
        return products.slice(0, 6); // Tablet (6 items)
      } else {
        return products.slice(0, 4); // Mobile (4 items)
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
  const handleSeeMoreClick = () => {
    router.push("/shop"); // Navigate to the /shop page
  };

  return (
    <div
      id="our-products"
      className="bg-white flex flex-col py-10 md:gap-10 px-6 md:px-20"
    >
      <div className="flex justify-between flex-col gap-7 lg:flex-row text-center md:text-left w-full">
        <h1 className="uppercase font-bold text-[2rem] leading-9 flex-1">
          our&nbsp;products
        </h1>
        <p className="font-medium text-xl text-primary-2 flex-1">
          Take a look at some of our wonderful products from Nourify - we take
          delight in making sure our customers have the best of the best
        </p>
      </div>
      <ProductGrid products={visibleProducts} />
      <div className="flex justify-end">
        <button
          onClick={handleSeeMoreClick}
          className="bg-secondary text-white rounded-[65px] font-medium lg:text-xl text-base py-2 px-4 lg:py-3 lg:px-6 flex justify-between items-center"
        >
          See More <img src="/arrow-up-right.svg" alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
