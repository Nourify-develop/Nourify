export const products = [
  {
    id: 1,
    image: "/cake.svg",
    name: "chocolate cake",
    productId: 48575674,
    category: "pastries",
    quantity: 12,
    price: 25000,
    status: "In stock",
  },
  {
    id: 2,
    image: "/tomatoes.svg",
    name: "tomatoes",
    productId: 48575674,
    category: "groceries",
    quantity: 12,
    price: 25000,
    status: "Out of stock",
  },
  {
    id: 3,
    image: "/meatpie.svg",
    name: "Meatpie",
    productId: 48575674,
    category: "pastries",
    quantity: 12,
    price: 25000,
    status: "In stock",
  },
  {
    id: 4,
    image: "/cake.svg",
    name: "chocolate cake",
    productId: 48575674,
    category: "pastries",
    quantity: 12,
    price: 25000,
    status: "In stock",
  },
  {
    id: 5,
    image: "/tomatoes.svg",
    name: "tomatoes",
    productId: 48575674,
    category: "groceries",
    quantity: 12,
    price: 25000,
    status: "Out of stock",
  },
  {
    id: 6,
    image: "/meatpie.svg",
    name: "Meatpie",
    productId: 48575674,
    category: "pastries",
    quantity: 12,
    price: 25000,
    status: "In stock",
  },

];
export const columns = [
  { key: "image", header: "Product Image" },

  { key: "name", header: "Product Name" },
  { key: "category", header: "Category" },
  { key: "quantity", header: "Quantity" },
  { key: "price", header: "Price" },
  { key: "status", header: "Status" },
];

// formfields
export const formInputFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
  },
  {
    label: "Price",
    name: "price",
    type: "number",
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
