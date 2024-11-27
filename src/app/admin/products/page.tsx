"use client";
import React from "react";
import ProductTable from "./components/ProductTable";
import { columns, Products } from "./components/_data";


const page = () => {


  return (
    <>
   
      <ProductTable data={Products} columns={columns} />
    </>
  );
};

export default page;
