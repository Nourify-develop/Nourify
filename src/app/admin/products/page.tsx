"use client";

import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import { columns, Products } from "./components/_data";
import Modal from "../components/ui/modal";
import AddProducts from "./components/AddProducts";
import { Plus, Search } from "lucide-react";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Filters = ["All", "Groceries", "Pastries", "In stock", "Out of stock"];
  return (
    <>
      {/* modal part */}
      <div>
        <div className="flex flex-col gap-11">
          {" "}
          <div className="flex w-full justify-between">
            <div className="relative w-full max-w-sm text-primary-2/70 ">
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Search />
              </div>

              <input
                type="text"
                className="w-full border rounded-[50px] pl-12 px-3.5 py-3 placeholder:text-primary-2/70"
                placeholder="Search for products..."
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2 items-center bg-primary text-white py-2.5 hover:bg-primary/90 px-6 rounded-[4rem] text-base"
            >
              <Plus /> New product
            </button>
          </div>
          <ul className="flex flex-wrap gap-5 text-lg text-primary-2/70">
            {Filters.map((filter, index) => (
              <button key={index} className="px-6 py-3 rounded-[4rem] border">
                {filter}
              </button>
            ))}
          </ul>
        </div>

        <Modal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalHeader="new product" //dynamic header for the modal
        >
          <AddProducts />
        </Modal>
      </div>
      <ProductTable data={Products} columns={columns} productsPerPage={1} />
    </>
  );
};

export default page;
