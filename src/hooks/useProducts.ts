"use client";
import { useEffect, useState } from "react";
import { products as initialProducts } from "../ui/products/_data"; // Import initial products
import { Product } from "@/types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        try {
          // Use products from localStorage and reverse the order
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts.reverse()); // Reverse the list here
        } catch (error) {
          console.error("Error parsing products from localStorage:", error);
        }
      } else {
        // If no products in localStorage, use initial products and reverse the order
        setProducts(initialProducts.reverse());
        localStorage.setItem("products", JSON.stringify(initialProducts));
      }
    }
  }, []);

  const deleteProductById = (id: number): void => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts.reverse()); // Reverse after deleting
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const updateProductById = (id: number, updatedData: Partial<Product>): void => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updatedData } : product
    );
    setProducts(updatedProducts.reverse()); // Reverse after updating
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  return { products, setProducts, getProductById, deleteProductById, updateProductById };
};

export default useProducts;
