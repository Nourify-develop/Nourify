import React from "react";
import ProductRows from "./ProductRows";
import { Column } from "@/types";

interface ProductTableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const ProductTable: React.FC<ProductTableProps> = ({ columns, data }) => {
  return (
    <div className="">
      <table className="w-full text-left">
        <thead className="text-gray-5">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="font-normal text-base py-5 text-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <ProductRows key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
