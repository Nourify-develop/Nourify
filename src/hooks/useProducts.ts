"use client";
import { useEffect, useState } from "react";
import { products as initialProducts } from "../ui/products/_data"; // Import here, not in the Page component
import { Product } from "@/types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        return parsedProducts.reverse();
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
      }
    }
    return initialProducts.reverse(); // Fallback to initialProducts if localStorage is empty or invalid
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Function to get a product by ID
  const getProductById = (id: number): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  // Function to delete a product by ID
  const deleteProductById = (id: number): void => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Function to update a product by ID
  const updateProductById = (id: number, updatedData: Partial<Product>): void => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  return { products, setProducts, getProductById, deleteProductById, updateProductById };
};

export default useProducts;
