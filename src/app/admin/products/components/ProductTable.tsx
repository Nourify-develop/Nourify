"use client"
import React, { useState } from "react";
import ProductRows from "./ProductRows";
import { Column } from "@/types";
import { Pagination } from "@/app/shop/components/ui/pagination";

interface ProductTableProps {
  columns: Column[];
  data: Record<string, any>[];
  productsPerPage :number
}

const ProductTable: React.FC<ProductTableProps> = ({ columns, data, productsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
   // Calculate the total number of pages
   const totalPages = Math.ceil(data.length / productsPerPage);

   // Determine the data to display on the current page
   const currentData = data.slice(
     (currentPage - 1) * productsPerPage,
     currentPage * productsPerPage
   );
 
   // Handle page change
   const handlePageChange = (page: number) => {
     setCurrentPage(page);
   };
  return (
    <div className="py-16">
      <table className="w-full text-left">
        <thead className="text-gray-5">
          <tr>
            {columns.map((col) => (

              <th
                key={col.key}
                className=" font-normal text-base py-5 text-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>

         
          {currentData.map((product) => (
            <ProductRows key={product.id} product={product} />
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductTable;
