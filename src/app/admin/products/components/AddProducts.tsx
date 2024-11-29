"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/input";
import { RiArrowDropDownLine } from "react-icons/ri";
import { formSelectFields, formInputFields } from "./_data";
import useProducts from "@/hooks/useProducts";

interface FormValues {
  id?: number;
  status?: string;
  productId?: number;
  image: string;
  name: string;
  price: string;
  message?: string;
  category?: string;
  size?: string;
  quantity?: number;
}
const AddProducts = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [formValues, setFormValues] = useState<FormValues>({
    image: "",
    name: "",
    price: "",
    status: "In Stock",
    category: "",
    size: "",
  });
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
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Retrieve existing data from localStorage
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
      formValues.category?.slice(0, 3).toUpperCase() || "OTH"; // Default to "UNK" if no category
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    const sizeCode = sizeMapping[formValues.size?.toLowerCase() || ""] || "MD"; // Default to "XX" if size is invalid
    const newProductId = `${categoryCode}-${randomDigits}-${sizeCode}`;
    const randomQuantity = Math.floor(Math.random() * (10 - 2 + 1) + 2) * 5;
    // Add id and productId to formValues
    const completeFormValues = {
      ...formValues,
      id: newId,
      productId: newProductId,
      quantity: randomQuantity,
      image,
    };

    // Update localStorage with the new product
    const updatedData = [...parsedData, completeFormValues];
    localStorage.setItem("products", JSON.stringify(updatedData));

    // Reset form
    setFormValues({
      image: "",
      name: "",
      price: "",
      status: "",
      category: "",
      size: "",
    });
    setImage("");
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
            className="mb-4 w-[44px]"
          />
          <p className="font-bold mb-2">
            <span className="text-green">Click to upload</span> or drag and drop
          </p>
          <p className="text-gray-3">JPG, JPEG, PNG less than 1MB</p>
        </div>
        <div className="w-full border-[0.2px] border-gray-2"></div>
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
              value={formValues.message}
              onChange={handleInputChange("message")}
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

export default AddProducts;
