// components/ProductCard.tsx
"use client";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Product } from "../types"; // Assuming your Product type is in types.ts

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.id} className="flex flex-col gap-6 text-center mb-14">
      <img src={product.image} alt={product.name} />
      <div className="flex justify-between flex-col gap-y-2">
        <h3 className="text-lg text-left font-medium text-gray-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </h3>
        <div className="flex justify-between items-end">
          <p className="text-left">
            <span className="font-bold text-xl lg:text-2xl">
              ₦{product.price}
            </span>
            <span className="text-xs text-gray-5"> / pack</span>
          </p>
          <button className="lg:py-3 py-2 lg:px-4 px-3 transition-all duration-500 ease-linear rounded-md bg-background-2 hover:bg-secondary focus-within:hover:bg-secondary active:hover:bg-secondary group">
            <LuShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 transition-all duration-500 ease-linear text-gray-6 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
