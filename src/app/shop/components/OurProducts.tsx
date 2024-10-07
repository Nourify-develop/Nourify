"use client";
import React, { useState } from "react";
import { products } from "@/ui/landing/_data";
import ProductGrid from "@/components/ProductGrid"; // Adjust the path
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearchOutline } from "react-icons/io5";
const OurProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [limitedOffer, setLimitedOffer] = useState<boolean | null>(null);
  const [expressDelivery, setExpressDelivery] = useState<boolean | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products per page

  // Filter products based on search, category, price, size, limited offer, and express delivery
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category ? product.category === category : true;

    const matchesPrice = selectedPrice
      ? product.price === parseInt(selectedPrice)
      : true;

    const matchesSize = selectedSize ? product.size === selectedSize : true;

    const matchesLimitedOffer =
      limitedOffer !== null ? product.limitedOffer === limitedOffer : true;

    const matchesExpressDelivery =
      expressDelivery !== null
        ? product.expressDelivery === expressDelivery
        : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesSize &&
      matchesLimitedOffer &&
      matchesExpressDelivery
    );
  });
  

  // Calculate the current products to display based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryClick = (newCategory: string | null) => {
    setCategory(category === newCategory ? null : newCategory);
  };
  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
  };
  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const toggleLimitedOffer = () => {
    setLimitedOffer(limitedOffer === null ? true : null);
  };

  const toggleExpressDelivery = () => {
    setExpressDelivery(expressDelivery === null ? true : null);
  };

  const resetFilters = () => {
    setLimitedOffer(null);
    setExpressDelivery(null);
    setSelectedPrice(null);
    setSelectedSize(null);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      id="our-products"
      className="bg-white flex flex-col py-10 md:gap-10 px-6 md:px-20"
    >
      <div className="flex justify-between items-center flex-col gap-7 xl:flex-row text-center md:text-left w-full">
        <h1 className="uppercase font-bold text-[2rem] leading-9 flex-1">
          our&nbsp;products
        </h1>
        <ul className="flex  gap-4  justify-between items-center md:text-xs lg:text-sm xl:text-lg font-medium">
          <li
            onClick={resetFilters}
            className={`hidden md:flex w-fit transition duration-700 ease-linear rounded-[4rem] px-6 py-3 cursor-pointer ${
              limitedOffer === null &&
              expressDelivery === null &&
              !selectedPrice &&
              !selectedSize
                ? "bg-gray-7 text-white"
                : "bg-gray-10 text-primary-2"
            }`}
          >
            All
          </li>
          <li
            className={`hidden md:flex w-fit transition duration-700 ease-linear rounded-[4rem] px-6 py-3 cursor-pointer
              ${
                limitedOffer === true
                  ? "bg-gray-7 text-white"
                  : "bg-gray-10 text-primary-2"
              }
           `}
            onClick={toggleLimitedOffer}
          >
            Limited Offer
          </li>
          <li
            className={`hidden md:flex w-fit transition duration-700 ease-linear rounded-[4rem] px-6 py-3 cursor-pointer
              ${
                expressDelivery === true
                  ? "bg-gray-7 text-white"
                  : "bg-gray-10 text-primary-2"
              }
           `}
            onClick={toggleExpressDelivery}
          >
            Express Delivery
          </li>
          <li className="flex md:hidden">
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  resetFilters();
                } else if (value === "limitedOffer") {
                  toggleLimitedOffer();
                } else if (value === "expressDelivery") {
                  toggleExpressDelivery();
                }
              }}
            >
              <SelectTrigger className="bg-gray-10 w-fit md:text-base xl:text-lg font-medium h-full text-primary-2 rounded-[4rem] px-6 py-3">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="limitedOffer">Limited Offer</SelectItem>
                  <SelectItem value="expressDelivery">
                    Express Delivery
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>

          <li>
            <Select onValueChange={handlePriceChange}>
              <SelectTrigger className="bg-gray-10 w-fit md:text-xs lg:text-sm xl:text-lg font-medium h-full text-primary-2 rounded-[4rem] px-6 py-3">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10000">₦10,000</SelectItem>
                  <SelectItem value="20000">₦20,000</SelectItem>
                  <SelectItem value="30000">₦30,000</SelectItem>
                  <SelectItem value="40000">₦40,000</SelectItem>
                  <SelectItem value="50000">₦50,000</SelectItem>
                  <SelectItem value="60000">₦60,000</SelectItem>
                  <SelectItem value="70000">₦70,000</SelectItem>
                  <SelectItem value="80000">₦80,000</SelectItem>
                  <SelectItem value="90000">₦90,000</SelectItem>
                  <SelectItem value="100000">₦100,000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
          <li>
            <Select onValueChange={handleSizeChange}>
              <SelectTrigger className="bg-gray-10 w-fit md:text-xs lg:text-sm xl:text-lg font-mediu m h-full text-primary-2 rounded-[4rem] px-6 py-3">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row py-8 gap-y-4  justify-between items-center mt-2">
        <div className="flex gap-6 lg:gap-8  xl:gap-12  md:text-xl lg:text-2xl xl:text-3xl font-medium">
          <p
            className={`border-2 border-white 
              ${
                category === "groceries"
                  ? " border-b-green-700    "
                  : "text-gray-8"
              }
            `}
            onClick={() => handleCategoryClick("groceries")}
          >
            Groceries
          </p>
          <p
            className={`border-2 border-white 
            ${category === "pastries" ? " border-b-green-700" : "text-gray-8"}
          `}
            onClick={() => handleCategoryClick("pastries")}
          >
            Pastries
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearchOutline className="text-[#1E1E1EB2]" />
          </div>
          <input
            type="text"
            placeholder="Search for groceries..."
            className="border rounded-[3.125rem]  h-full p-2 pl-10 bg-gray-1 w-96 placeholder:text-[#1E1E1EB2] text-[#1E1E1EB2] outline-none" // pl-10 adds padding for the icon
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Use ProductGrid component and pass filteredProducts */}
      <ProductGrid products={currentProducts} />
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-3 border text-white  rounded-[3.125rem] disabled:opacity-50 bg-green-1 disabled:bg-white disabled:text-black"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-6 py-3 mx-5 rounded-[3.125rem] border  ${
              currentPage === index + 1 ? "bg-gray-500 text-white " : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-3 border text-white  rounded-[3.125rem] disabled:opacity-50 bg-green-1 disabled:bg-white disabled:text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
