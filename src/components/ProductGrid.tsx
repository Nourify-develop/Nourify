// components/ProductGrid.tsx
"use client";
import React from "react";
import ProductCard from "./ProductCard"; // Adjust path as needed
import { Product } from "../types"; // Assuming your Product type is in types.ts

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
