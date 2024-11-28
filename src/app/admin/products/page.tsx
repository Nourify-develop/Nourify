"use client";
import React, { useState } from "react";
import Modal from "../components/modal";
import AddProducts from "../products/components1/AddProducts";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      {/* Add a button to open a modal */}
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalHeader="new Product"
      >
        <AddProducts />
      </Modal>
    </div>
  );
}

export default page;
