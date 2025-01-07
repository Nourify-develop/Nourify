"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ProductGrid from "@/ui/products/ProductGrid";
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Limoffer from "@/ui/landing/limoffer";
import Wrapper from "@/layout/wrapper";
import { ChevronUp } from "lucide-react";
import { Pagination } from "./ui/pagination";
import useProducts from "@/hooks/useProducts";

const OurProducts: React.FC = () => {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [limitedOffer, setLimitedOffer] = useState<boolean | null>(null);
  const [expressDelivery, setExpressDelivery] = useState<boolean | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRotated, setIsRotated] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  console.log("products", products);
  const toggleRotation = () => {
    setIsRotated((prev) => !prev);
  };
  const productsPerPage = 8; // Number of products per page

  useEffect(() => {
    setCategory(searchParams.get("category"));
  }, [searchParams]);

  useEffect(() => {
    const initialCategory = searchParams.get("category") || "groceries";
    setCategory(initialCategory);

    // Update URL if no category is set initially
    if (!searchParams.get("category")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", "groceries");
      window.history.pushState(null, "", `?${params.toString()}`);
    }
  }, [searchParams]);

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
    const updatedCategory = category === newCategory ? null : newCategory;
    setCategory(updatedCategory);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedCategory) {
      params.set("category", updatedCategory);
    } else {
      params.delete("category");
    }
    window.history.pushState(null, "", `?${params.toString()}`);
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
  const handleSearchBarClick = (e: any) => {
    e.stopPropagation();
    setIsSearchClicked(!isSearchClicked);
    // console.log("clicked");
  };
  const handleFilterClick = (e: any) => {
    e.stopPropagation();
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
    // console.log("clicked filter!");
  };

  return (
    <Wrapper
      id="our-products"
      className="bg-white flex flex-col gap-y-3 md:gap-y-14 !py-0 relative"
    >
      <span className="capitalize flex items-center gap-x-2 text-gray-5 border-b border-gray-2 py-2">
        <p>{pathName.replace("/", "")}</p> /
        <p
          className={`cursor-pointer ${
            !category ? "text-black" : "text-gray-5"
          }`}
          onClick={() => {
            setCategory(null);
            const params = new URLSearchParams(searchParams.toString());
            params.delete("category");
            window.history.pushState(null, "", `?${params.toString()}`);
          }}
        >
          Products
        </p>{" "}
        /&nbsp;
        <p className={`${category ? "text-black" : "text-gray-5"}`}>
          {category}
        </p>
      </span>

      <Limoffer />

      <div className="flex justify-between items-center flex-col gap-7 lg:flex-row text-center md:text-left w-full">
        <h1 className="hidden md:flex uppercase font-bold text-[2rem] leading-9 flex-1 text-primary-2/85">
          our&nbsp;products
        </h1>
        <ul
          className={`gap-4 justify-between items-center absolute md:static top-[20rem] md:top-0 right-4 w-64 rounded-lg md:rounded-none md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none flex flex-col md:flex-row md:flex md:text-xs lg:text-sm xl:text-lg font-medium transition-opacity duration-300 ease-in-out ${
            isFilterDropdownOpen
              ? "opacity-100 md:opacity-0 pointer-events-auto"
              : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
          }`}
        >
          <li
            onClick={resetFilters}
            className={`hidden md:flex w-fit border  transition duration-700 ease-linear rounded-[4rem] px-6 py-1.5 text-base cursor-pointer ${
              limitedOffer === null &&
              expressDelivery === null &&
              !selectedPrice &&
              !selectedSize
                ? "bg-gray-7 text-white border-transparent"
                : "bg-gray-10 text-primary-2  border-gray-light-2"
            }`}
          >
            All
          </li>
          <li
            className={`hidden md:flex w-fit transition border  duration-700 ease-linear rounded-[4rem] px-6 py-1.5 text-base cursor-pointer
              ${
                limitedOffer === true
                  ? "bg-gray-7 text-white border-transparent"
                  : "bg-gray-10 text-primary-2 border border-gray-light-2"
              }
           `}
            onClick={toggleLimitedOffer}
          >
            Limited Offer
          </li>
          <li
            className={`hidden md:flex w-fit border  transition duration-700 ease-linear rounded-[4rem] px-6 py-1.5 text-base cursor-pointer
              ${
                expressDelivery === true
                  ? "bg-gray-7 text-white border-transparent"
                  : "bg-gray-10 text-primary-2 border border-gray-light-2"
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
              <SelectTrigger className="bg-gray-10 w-fit md:text-base xl:text-lg font-medium h-full text-primary-2 rounded-[4rem] px-6 py-1.5 text-base">
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
              <SelectTrigger className="bg-gray-10  w-fit md:text-xs border border-gray-light-2 lg:text-sm xl:text-lg flex gap-1 font-medium h-full text-primary-2 rounded-[4rem] px-6 py-1.5 text-base">
                <SelectValue placeholder="Price" />{" "}
                <ChevronUp className="h-4 w-4 opacity-50 hover:rotate-180 duration-1000 transition-all " />
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
              <SelectTrigger
                onClick={toggleRotation}
                className="bg-gray-10 border border-gray-light-2  w-fit md:text-xs lg:text-sm xl:text-lg font-medium h-full text-primary-2 flex gap-1 rounded-[4rem] px-6 py-1.5 text-base"
              >
                <SelectValue placeholder="Size" />
                <ChevronUp
                  className={`h-4 w-4 opacity-50 duration-1000 transition-transform ${
                    isRotated ? "rotate-180" : ""
                  }`}
                />
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
      <div
        className="flex md:flex-row py-2 gap-y-4  justify-between items-center"
        // onClick={() => setIsSearchClicked(false)}
      >
        <div className="flex gap-6 lg:gap-8  xl:gap-12  md:text-xl lg:text-2xl xl:text-3xl font-medium">
          <button
            className={`border-2 border-white 
              ${
                category === "groceries"
                  ? " border-b-green-700 text-gray-4"
                  : "text-[#404040] opacity-50"
              }
            `}
            onClick={() => handleCategoryClick("groceries")}
          >
            Groceries
          </button>
          <button
            className={`border-2 border-white 
            ${
              category === "pastries"
                ? " border-b-green-700 text-gray-4"
                : "text-[#404040] opacity-50"
            }
          `}
            onClick={() => handleCategoryClick("pastries")}
          >
            Pastries
          </button>
        </div>
        <div className="flex gap-2 md:relative">
          {/* laptop screens */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearchOutline className="text-[#1E1E1EB2]" />
          </div>
          <div
            className="flex justify-center items-center gap-2 relative"
            onClick={handleSearchBarClick}
          >
            <div
              className="absolute md:hidden left-[0.82rem] top-3"
              onClick={handleSearchBarClick}
            >
              <IoSearchOutline className="text-[#1E1E1EB2]" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for groceries..."
              className={`transition-all duration-300 ease-in-out rounded-[3.125rem]   ${
                isSearchClicked ? "w-24" : "w-4"
              } md:w-96 h-full p-2 pl-10 bg-gray-1 placeholder:text-[#1E1E1EB2] text-[#1E1E1EB2] outline-none`}
              // className=" md:block rounded-[3.125rem] w-5 md:w-96  h-full p-2 pl-10 bg-gray-1 placeholder:text-[#1E1E1EB2] text-[#1E1E1EB2] outline-none" // pl-10 adds padding for the icon
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={handleSearchBarClick}
            />
            <div
              className="bg-gray-1 p-3 rounded-full cursor-pointer md:hidden"
              onClick={handleFilterClick}
            >
              <img
                src="/images/preference-horizontal.svg"
                alt="filter"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Use ProductGrid component and pass filteredProducts */}
      <ProductGrid products={currentProducts} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default OurProducts;
