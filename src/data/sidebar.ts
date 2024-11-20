import {
  LayoutDashboard,
  ChevronDown,
  Heart,
  Home,
  LucideProps,
  Mail,
  User,
  Search,
  SquarePlus,
} from "lucide-react";
const sideItems = [
  {
    route: "Overview",
    link: "/admin",
    icon: LayoutDashboard,
    id: "admin",
  },
  {
    route: "Orders",
    link: "/admin/orders",
    icon: User,
    id: "orders",
  },
  {
    route: "Transactions",
    link: "/admin/transactions",
    icon: Home,
    id: "transactions",
  },
  {
    route: "Products",
    link: "/admin/products",
    icon: Mail,
    id: "products",
  },
  {
    route: "Customers",
    link: "/admin/customers",
    icon: Heart,
    id: "customers",
  },
  {
    route: "Help",
    link: '/admin/help',
    icon: Search,
    id: "help",
  },
  {
    route: "Settings",
    link: '/admin/settings',
    icon: Search,
    id: "settings",
  },
];

export default sideItems