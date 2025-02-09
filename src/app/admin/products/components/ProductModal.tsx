"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/input";
import { RiArrowDropDownLine } from "react-icons/ri";
import { formSelectFields, formInputFields } from "./_data";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import { useUniqueImage } from "@/hooks/useUniqueImages";
import { toast } from "sonner";

interface ProductModalProps {
  product?: Product | null;
  closeModal: () => void;
}
interface FormValues {
  id?: number;
  status?: string;
  productId?: string;
  image: string;
  name: string;
  price: number | undefined;
  description?: string;
  category?: string;
  size?: string;
  quantity?: number;
}
const ProductModal: React.FC<ProductModalProps> = ({ product, closeModal }) => {
  const { setProducts, updateProductById } = useProducts();
  const randomImage = useUniqueImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [formValues, setFormValues] = useState<FormValues>({
    image: "",
    name: "",
    price: undefined,
    status: "In Stock",
    category: "",
    description: "",
    size: "",
  });
  useEffect(() => {
    if (product) {
      setFormValues(product); // Populate form values if editing a product
    } else {
      setFormValues({
        image: "",
        name: "",
        price: undefined,
        status: "In Stock",
        category: "",
        description: "",
        size: "",
      }); // Reset form values for new product
    }
  }, [product]);
  const sizeMapping: { [key: string]: string } = {
    small: "SM",
    medium: "MD",
    large: "LG",
  };
  const handleInputChange =
    (field: keyof FormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        field === "price" && e.target.type === "number"
          ? Number(e.target.value) || undefined // Convert to number or set undefined for invalid input
          : e.target.value;

      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      updateProductById(product.id, formValues); // Update existing product
      toast.success("Product updated successfully!");
    } else {
      // Adding a new product
      const existingData = localStorage.getItem("products");
      const parsedData: FormValues[] = existingData
        ? JSON.parse(existingData)
        : [];

      // Generate new id
      const newId =
        parsedData.length > 0
          ? Math.max(...parsedData.map((p) => p.id || 0)) + 1
          : 1;

      // Generate new productId
      const categoryCode =
        formValues.category?.slice(0, 3).toUpperCase() || "OTH"; // Default to "OTH" if no category
      const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      const sizeCode =
        sizeMapping[formValues.size?.toLowerCase() || ""] || "MD"; // Default to "MD" if size is invalid
      const newProductId = `${categoryCode}-${randomDigits}-${sizeCode}`;
      const randomQuantity = Math.floor(Math.random() * (10 - 2 + 1) + 2) * 5;

      // Add id and productId to formValues
      const completeFormValues = {
        ...formValues,
        id: newId,
        productId: newProductId,
        quantity: randomQuantity,
        image: randomImage,
      };

      // Update localStorage with the new product
      const updatedData = [...parsedData, completeFormValues];
      localStorage.setItem("products", JSON.stringify(updatedData));

      toast.success("Product added successfully!");
    }

    // Reset form
    setFormValues({
      image: "",
      name: "",
      price: undefined,
      status: "",
      category: "",
      size: "",
    });
    setImage("");
    closeModal();

    setTimeout(() => {
      window.location.reload(); // Refresh the page after 1 second
    }, 1000);
  };
  // click 2 upload
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImage(base64); // Save Base64 string in state
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  // drag n drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setImage(URL.createObjectURL(droppedFiles[0]));
    }
  };

  const preventDefault = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {/*  */}

      <form onSubmit={handleSubmit}>
        <div
          className="flex flex-col justify-center overflow-scroll items-center p-8 bg-gray-1 border border-dashed border-gray-2 rounded-lg cursor-pointer"
          onClick={handleDivClick}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImgUpload}
          />
          <img
            src={!image ? "/images/vector.svg" : image}
            alt="vector-img"
            className="mb-4 w-[70px]"
          />
          <p className="font-bold mb-2">
            <span className="text-green">Click to upload</span> or drag and drop
          </p>
          <p className="text-gray-3">JPG, JPEG, PNG less than 1MB</p>
        </div>
        <div className="w-full my-10 border-[0.2px] border-gray-2"></div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-6">
              {formInputFields.map(({ name, label, type }) => (
                <div key={name} className="flex flex-col gap-1">
                  <label htmlFor="product" className="text-sm">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formValues[name as keyof FormValues]}
                    onChange={handleInputChange(name as keyof FormValues)}
                    className="bg-gray-100 placeholder:text-sm p-2 w-full h-full rounded-[50px] focus:outline-0 hover:bg-gray-200 transition-colors ease-in duration-150 "
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center gap-6">
              {formSelectFields.map(({ label, name, options }) => (
                <div key={name} className="flex flex-col gap-1">
                  <label htmlFor="product" className="text-sm">
                    {label}
                  </label>
                  <div className="relative w-full">
                    <select
                      name="Other"
                      id="Other"
                      value={formValues[name as keyof FormValues]}
                      onChange={handleInputChange(name as keyof FormValues)}
                      className="bg-gray-100 placeholder:text-sm p-[5px] w-full h-full rounded-[50px]  appearance-none hover:bg-gray-200 transition-colors ease-in duration-150 "
                    >
                      <option value=""></option>
                      {options?.map((option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span>
                      <RiArrowDropDownLine className="text-gray-3 absolute right-4 top-2" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="product" className="text-sm">
              Product Details
            </label>

            <textarea
              name="/"
              id="/"
              value={formValues.description}
              onChange={handleInputChange("description")}
              className="bg-gray-100 placeholder:text-sm px-4 pt-2 pb-5 w-full h-full rounded-[1rem] focus:outline-0  hover:bg-gray-200 transition-colors ease-in duration-150 "
            ></textarea>
          </div>
          <Button
            text="Add Product"
            border="border-green-1 hover:border-green-dark"
            color="text-white"
            bg="bg-green-1"
          />
        </div>
      </form>
    </>
  );
};

export default ProductModal;
