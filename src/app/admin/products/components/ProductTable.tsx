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

          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className=" text-gray-4/90  capitalize font-bold border-t-[.5px] border-primary-2/20 p-5 "
            >
              <td className="align-middle py-5 ">
                <div className="flex justify-start">
                  <img
                    src={`/images${row.image}`}
                    alt={row.name}
                    className="w-[70px] h-[70px] bg-gray-10 p-2  rounded-[8px]"
                  />
                </div>
              </td>
              <td className="">
                <div className="flex flex-col justify-center items-start align-middle py-5">
                  <span>{row.name}</span>
                  <span className="text-gray-5 text-xs font-normal">
                    #{row.productId}
                  </span>
                </div>
              </td>
              <td className="align-middle py-5">{row.category}</td>
              <td className="align-middle py-5 text-cente">{row.quantity}</td>
              <td className="align-middle py-5">
                {formattedPrice(row.price)}.00
              </td>
              <td className="align-middle py-5">
                <span
                  className={` rounded-full py-1 px-3 text-xs text-nowrap font-semibold ${
                    row.status === "In stock"
                      ? "text-[#14CF3D] bg-[#14CF3D]/10"
                      : "text-[#EB4E4E] bg-[#EB4E4E]/10"
                  }`}
                >
                  {" "}
                  {row.status}
                </span>
              </td>
              <td className="relative">
                <div
                  onClick={() => handleOpenOptions(row.id)}
                  className="bg-gray-1 border border-gray-light-2 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <img src="/icons/options.svg" alt="" />
                </div>
                {showOptions === row.id && (
                  <div className="absolute -left-10 z-10 ">
                    <div className="bg-white rounded-[15px] shadow-md w-[100px] h-auto  flex flex-col  items-start font-medium">
                      <button className="text-primary-2 w-full duration-300 hover:bg-gray-1 p-3 text-left">
                        Edit
                      </button>
                      <button className="text-[#EB4E4E] w-full transition duration-300 hover:bg-gray-1 p-3 text-left ">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          {data.map((product) => (
            <ProductRows key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
