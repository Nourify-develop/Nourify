"use client";

import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import { columns, products as initialProducts } from "./components/_data";
import Modal from "../components/ui/modal";

import { Plus, Search } from "lucide-react";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import ProductModal from "./components/ProductModal";

const page = () => {
  const { products, setProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const Filters = ["All", "Groceries", "Pastries", "In Stock", "Out of stock"];
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product); // Set product to be edited
    setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setEditingProduct(null); // Reset after closing modal
  // };

  const handleFilterClick = (filter: string) => {
    if (filter === "All") {
      setSelectedCategory(null);
      setSelectedStock(null);
    } else if (filter === "Groceries" || filter === "Pastries") {
      setSelectedCategory((prev) => (prev === filter ? null : filter));
    } else if (filter === "In Stock" || filter === "Out of stock") {
      setSelectedStock((prev) => (prev === filter ? null : filter));
    }
  };

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.quantity.toString().includes(searchTerm) ||
      product.price.toString().includes(searchTerm);

    const matchesCategory =
      !selectedCategory ||
      selectedCategory.toLowerCase() === product.category.toLowerCase();

    const matchesStock =
      !selectedStock ||
      (selectedStock === "In Stock" &&
        product.status.toLowerCase() === "in stock") ||
      (selectedStock === "Out of stock" &&
        product.status.toLowerCase() === "out of stock");

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="py-5">
      <div className="flex flex-col gap-11">
        {" "}
        <div className="flex w-full gap-2 justify-between">
          <div className="relative w-full max-w-sm text-primary-2/70 ">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Search />
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-10 rounded-[50px] pl-12 px-3.5 py-3 placeholder:text-primary-2/70"
              placeholder="Search for products..."
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 items-center bg-primary text-white py-2.5 hover:bg-primary/90 px-6 rounded-[4rem] text-base"
          >
            <Plus /> New&nbsp;product
          </button>
        </div>
        <ul className="flex flex-wrap gap-5 text-lg text-primary-2/70">
          {Filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-3 rounded-[4rem] ${
                selectedCategory === filter ||
                selectedStock === filter ||
                (filter === "All" && !selectedCategory && !selectedStock)
                  ? "bg-gray-7 text-white border-transparent"
                  : "bg-gray-10 text-primary-2 border border-gray-light-2"
              }`}
            >
              {filter}
            </button>
          ))}
        </ul>
      </div>

      <ProductTable
        data={filteredProducts}
        columns={columns}
        productsPerPage={10}
        onEditProduct={handleEditProduct}
        setLoading={setLoading}
        loading={loading}
      />
      <Modal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalHeader={editingProduct ? "Edit Product" : "New Product"}
      >
        <ProductModal
          product={editingProduct}
          closeModal={() => {
            setIsModalOpen(false);
            setEditingProduct(null); // Ensure editingProduct is reset
          }}
        />
      </Modal>
    </div>
  );
};

export default page;
