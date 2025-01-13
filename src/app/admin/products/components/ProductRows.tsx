"use client";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const ProductRows: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  loading,
  setLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteProductById } = useProducts();
  // Function to toggle options menu
  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteProductById(product.id);
    setIsOpen(false); // Close the dropdown after deletion
    toast.success("Products deleted successfully");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleEdit = () => {
    onEdit(product); // Pass product details to open edit modal
    setIsOpen(false);
  };
  // Function to format price
  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  return (
    <tr className="text-gray-4/90 capitalize font-bold border-t-[.5px] border-primary-2/20 p-5">
      <td className="align-middle py-5">
        <div className="flex justify-start">
          <img
            src={product.image}
            alt={product.name}
            className="w-[70px] h-[70px] bg-gray-10 p-2 rounded-[8px]"
          />
        </div>
      </td>
      <td>
        <div className="flex flex-col justify-center items-start align-middle py-5">
          <span>{product.name}</span>
          <span className="text-gray-5 text-xs font-normal">
            #{product.productId}
          </span>
        </div>
      </td>
      <td className="align-middle py-5">{product.category}</td>
      <td className="align-middle py-5">{product.quantity}</td>
      <td className="align-middle py-5">{formattedPrice(product.price)}.00</td>
      <td className="align-middle py-5">
        <span
          className={`rounded-full py-1 px-3 text-xs text-nowrap font-semibold ${
            product.status === "In Stock"
              ? "text-[#14CF3D] bg-[#14CF3D]/10"
              : "text-[#EB4E4E] bg-[#EB4E4E]/10"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="relative">
        <div
          onClick={toggleOptions}
          className="bg-gray-1 border border-gray-light-2 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center"
        >
          <img src="/icons/options.svg" alt="" />
        </div>
        {isOpen && (
          <div className="absolute -left-10 z-10">
            <div className="bg-white rounded-[15px] shadow-md w-[100px] h-auto flex flex-col items-start font-medium">
              <button
                onClick={handleEdit}
                className="text-primary-2 w-full duration-300 hover:bg-gray-1 p-3 text-left"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-[#EB4E4E] w-full transition duration-300 hover:bg-gray-1 p-3 text-left"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductRows;
