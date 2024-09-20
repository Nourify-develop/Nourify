"use client";
import React, { useState } from "react";
import { products } from "@/ui/landing/_data";
import ProductGrid from "@/components/ProductGrid"; // Adjust the path

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

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
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
      className="bg-white flex flex-col py-10 pt-[10rem] md:gap-10 px-6 md:px-20"
    >
      <div className="flex justify-between flex-col gap-7 lg:flex-row text-center md:text-left w-full">
        <h1 className="uppercase font-bold text-[2rem] leading-9 flex-1">
          our&nbsp;products
        </h1>
        <ul className="flex gap-4">
          <li
            onClick={resetFilters}
            className={`cursor-pointer ${
              limitedOffer === null &&
              expressDelivery === null &&
              !selectedPrice &&
              !selectedSize
                ? "font-bold"
                : ""
            }`}
          >
            All
          </li>
          <li
            className={limitedOffer === true ? "font-bold" : ""}
            onClick={toggleLimitedOffer}
          >
            Limited Offer
          </li>
          <li
            className={expressDelivery === true ? "font-bold" : ""}
            onClick={toggleExpressDelivery}
          >
            Express Delivery
          </li>
          <li>
            <select value={selectedPrice || ""} onChange={handlePriceChange}>
              <option value="">Price</option>
              <option value="10000">₦10,000</option>
              <option value="20000">₦20,000</option>
              <option value="30000">₦30,000</option>
              <option value="40000">₦40,000</option>
              <option value="50000">₦50,000</option>
              <option value="60000">₦60,000</option>
              <option value="70000">₦70,000</option>
              <option value="80000">₦80,000</option>
              <option value="90000">₦90,000</option>
              <option value="100000">₦100,000</option>
            </select>
          </li>
          <li>
            <select value={selectedSize || ""} onChange={handleSizeChange}>
              <option value="">Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-5">
          <p
            className={
              category === "groceries"
                ? "font-bold text-green-500 underline"
                : ""
            }
            onClick={() => handleCategoryClick("groceries")}
          >
            Groceries
          </p>
          <p
            className={
              category === "pastries" ? "font-bold text-gray-500 underline" : ""
            }
            onClick={() => handleCategoryClick("pastries")}
          >
            Pastries
          </p>
        </div>
        <input
          type="text"
          placeholder="Search for groceries..."
          className="border rounded-lg p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Use ProductGrid component and pass filteredProducts */}
      <ProductGrid products={currentProducts} />
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === index + 1 ? "bg-gray-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
