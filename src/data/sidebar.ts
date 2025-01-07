import {
  Dashboard,
  Customers,
  Help,
  Order,
  Products,
  Settings,
  Transaction,
} from "../../public/icons";

const sideItems = [
  {
    route: "Overview",
    link: "/admin",
    icon: Dashboard,
    id: "admin",
  },
  {
    route: "Orders",
    link: "/admin/orders",
    icon: Order,
    id: "orders",
  },
  {
    route: "Transactions",
    link: "/admin/transactions",
    icon: Transaction,
    id: "transactions",
  },
  {
    route: "Products",
    link: "/admin/products",
    icon: Products,
    id: "products",
  },
  {
    route: "Customers",
    link: "/admin/customers",
    icon: Customers,
    id: "customers",
  },
  {
    route: "Help",
    link: "/admin/help",
    icon: Help,
    id: "help",
  },
  {
    route: "Settings",
    link: "/admin/settings",
    icon: Settings,
    id: "settings",
  },
];

export default sideItems;
