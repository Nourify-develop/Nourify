"use client";
import React from "react";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import Image from "next/image";
const TopSellingProducts = () => {
  const { products, setProducts } = useProducts();
  // function to randomize the products and then slice it to create a shallow copy
  function shuffleArray(array: Product[]) {
    const shuffled = array.slice(); // Create a shallow copy
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  // Function to Get a Random Subset
  function getRandomSubset(array: Product[], subsetSize: number) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, subsetSize);
  }
  const randomProducts = getRandomSubset(products, 7);
  console.log("randomProducts  : ", randomProducts);
  // capitalizing product category
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <h1 className="font-bold text-[22px] mb-4">Top Selling Products</h1>
      {randomProducts.map((product: Product) => (
        <div className="flex items-center gap-3">
          <Image
            src={`/images${product.image}`}
            alt={product.name}
            width={71}
            height={71}
            className="rounded-md bg-gray-10"
          />
          <div className="flex flex-col gap-3 py-4 px-2">
            <p className="text-sm font-medium text-gray-700">
              {capitalize(product.category)}
            </p>
            <p className="text-[16px] text-gray-500 font-bold">
              {product.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSellingProducts;
