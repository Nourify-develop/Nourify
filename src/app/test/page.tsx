"use client";

import React, { useEffect, useState } from "react";

interface Product {
  image: string;
  name: string;
  price: string;
  message: string;
  category: string;
  size: string;
}

const ViewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("test");
    if (storedData) {
      setProducts(JSON.parse(storedData)); // Parse and set the data
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">View Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={product.image || "/placeholder-image.png"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">Category: {product.category}</p>
              <p className="text-gray-500">Size: {product.size}</p>
              <p className="text-gray-700 font-bold">${product.price}</p>
              <p className="text-sm text-gray-600 mt-2">{product.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
