export const formInputFields = [
  {
    label: "Product Name",
    name: "productName",
    type: "text",
  },
  {
    label: "Price",
    name: "price",
    type: "text",
  },
];

export const formSelectFields = [
  {
    label: "Category",
    name: "category",
    options: [
      { value: "groceries", label: "Groceries" },
      { value: "pastries", label: "Pastries" },
      { value: "vegetables", label: "Vegetables" },
    ],
  },
  {
    label: "Size",
    name: "size",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
  },
];
