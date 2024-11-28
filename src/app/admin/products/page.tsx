"use client";

import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import { columns, Products } from "./components/_data";
import Modal from "../components/ui/modal";
import AddProducts from "./components/AddProducts";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ProductTable data={Products} columns={columns} />

      {/* modal part */}
      <div>
        {/* Add a button to open a modal */}
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

        <Modal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalHeader="new product" //dynamic header for the modal
        >
          <AddProducts />
        </Modal>
      </div>
    </>
  );
};

export default page;
