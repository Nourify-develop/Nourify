"use client";
import React, { useState } from "react";
import ProductRows from "./ProductRows";
import { Column } from "@/types";
import { Pagination } from "@/app/shop/components/ui/pagination";

interface ProductTableProps {
  columns: Column[];
  data: Record<string, any>[];
  productsPerPage: number;
}

const ProductTable: React.FC<ProductTableProps> = ({
  columns,
  data,
  productsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / productsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="py-10">
      <div className="mb-14">
        {" "}
        <table className="w-full text-left  border-b-[.5px] border-primary-2/20">
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
        {currentData.length === 0 && (
          <p className="w-full py-10 text-center font-semibold  border-b-[.5px] border-primary-2/20">
            No Product Found
          </p>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductTable;
