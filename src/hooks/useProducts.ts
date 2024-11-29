"use client"
import { useEffect, useState } from "react";
import { products as initialProducts } from "../ui/products/_data"; // Import here, not in the Page component
import { Product } from "@/types";


const useProducts = () => {
    const [products, setProducts] = useState<Product[]>(() => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        try {
          return JSON.parse(storedProducts);
        } catch (error) {
          console.error("Error parsing products from localStorage:", error);
        }
      }
      return initialProducts; // Fallback to initialProducts if localStorage is empty or invalid
    });
  
    useEffect(() => {
      localStorage.setItem("products", JSON.stringify(products));
    }, [products]);
  
    return { products, setProducts };
  };
  

  
export default useProducts;
