import { useMemo } from "react";
import useProducts from "./useProducts";

/**
 * Custom hook to extract a single random unique image path from products managed by useProducts.
 * @returns {string | null} - A random unique image path or null if no images are available.
 */
export const useUniqueImage = () => {
  const { products } = useProducts();

  const uniqueImages = useMemo(() => {
    const imageSet = new Set();

    products.forEach((product) => {
      if (product.image) {
        imageSet.add(product.image);
      }
    });

    return Array.from(imageSet);
  }, [products]);

  
  // Select one random image
  const randomImage = useMemo(() => {
    if (uniqueImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * uniqueImages.length);
      return uniqueImages[randomIndex];
    }
    return null; // Return null if there are no images
  }, [uniqueImages]);

  return randomImage;
};
