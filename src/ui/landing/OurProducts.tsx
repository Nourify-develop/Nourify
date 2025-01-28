// OurProducts.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Product } from "../../types";
import ProductGrid from "../products/ProductGrid"; // Adjust the path
import { ArrowUpRight } from "lucide-react";
import Wrapper from "@/layout/wrapper";
import useProducts from "@/hooks/useProducts";

const OurProducts: React.FC = () => {
  const { products } = useProducts();
  console.log("ourpords", products);
  const router = useRouter();
  const [visibleProducts, setVisibleProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    const getProductsToDisplay = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        return products.slice(0, 8); // Desktop (8 items)
      } else if (width >= 768) {
        return products.slice(0, 6); // Tablet (6 items)
      } else {
        return products.slice(0, 4); // Mobile (4 items)
      }
    };

    // Set initial products on mount
    setVisibleProducts(getProductsToDisplay());

    const handleResize = () => {
      setVisibleProducts(getProductsToDisplay());
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [products]); // Depend on products to update when they change

  const handleSeeMoreClick = () => {
    router.push("/shop"); // Navigate to the /shop page
  };

  return (
    <Wrapper id="our-products" className="bg-white flex flex-col py-10 gap-7 ">
      <div className="flex justify-between flex-col gap-7 lg:flex-row text-center md:text-left w-full">
        <h1 className="uppercase font-bold text-[2rem] leading-9 flex-1 text-gray-8">
          our&nbsp;products
        </h1>
        <p className="font-medium text-base md:text-xl text-primary-2 flex-1">
          Take a look at some of our wonderful products from Nourify - we take
          delight in making sure our customers have the best of the best
        </p>
      </div>
      <ProductGrid products={visibleProducts} />
      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleSeeMoreClick}
          className="bg-secondary border border-secondary hover:bg-white hover:text-secondary transition duration-1000 ease-in-out text-white rounded-[65px] font-medium lg:text-lg text-base py-2 px-4 lg:py-3 lg:px-6 flex justify-between items-center"
        >
          See More <ArrowUpRight />
        </button>
      </div>
    </Wrapper>
  );
};

export default OurProducts;
