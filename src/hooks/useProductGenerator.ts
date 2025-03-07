import { Product } from "@/types";

export const useProductGenerator = () => {
  const generateCategoryBasedProductId = (
    category: string,
    size?: string
  ): string => {
    let prefix: string;

    switch (category.toLowerCase()) {
      case "pastries":
        prefix = "PAS";
        break;
      case "groceries":
        prefix = "GRO";
        break;
      default:
        prefix = "OTH";
    }

    const sizeMapping: Record<string, string> = {
      small: "SM",
      medium: "MD",
      large: "LG",
    };

    const productSize = size ? sizeMapping[size.toLowerCase()] || "MD" : "MD";

    const uniquePart = Math.floor(100000 + Math.random() * 900000).toString();

    return `${prefix}-${uniquePart}-${productSize}`;
  };

  const generateProductData = (
    products: Omit<Product, "id" | "productId">[] // Exclude `id` and `productId`
  ): Product[] => {
    return (
      products
        .map((product, index) => ({
          ...product,
          id: index + 1, // Sequential ID
          productId: generateCategoryBasedProductId(
            product.category,
            product.size
          ), // Category-based productId
          size: product.size || "MD", // Default size to 'MD' if not provided
        }))
        // Arrange the products based on a chosen criterion (e.g., ID, category)
        .sort((a, b) => a.id - b.id) // Sort by ID in ascending order
    );
  };

  return { generateProductData };
};
