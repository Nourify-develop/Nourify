"use client";
import React, { useEffect, useState } from "react";
import ProductRows from "./ProductRows";
import { Column, Product } from "@/types";
import { Pagination } from "@/app/shop/components/ui/pagination";
import { TailSpin } from "react-loader-spinner";

interface ProductTableProps {
  columns: Column[];
  data: Product[];
  productsPerPage: number;
  onEditProduct: (product: Product) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  columns,
  data,
  productsPerPage,
  onEditProduct,
  setLoading,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true); // Set loading true only if it's currently false

    const timer = setTimeout(() => {
      const slicedData = data.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      );
      setCurrentData(slicedData);
      setLoading(false); // Stop loading after data is set
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [currentPage, data, productsPerPage, setLoading, loading]);

  const totalPages = Math.ceil(data.length / productsPerPage);

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
              <ProductRows
                key={product.id}
                product={product}
                onEdit={onEditProduct}
                setLoading={setLoading}
                loading={loading}
              />
            ))}
          </tbody>
        </table>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <TailSpin
              height={70}
              width={70}
              color="#079C4E" // Adjust color to match your theme
              ariaLabel="loading"
            />
          </div>
        ) : (
          currentData.length === 0 && (
            <p className="w-full py-10 text-center font-semibold  border-b-[.5px] border-primary-2/20">
              No Product Found
            </p>
          )
        )}
      </div>
      {!loading && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductTable;
