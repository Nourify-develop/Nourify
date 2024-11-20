"use client";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import { Logo } from "../../../../../public/icons";
import Image from "next/image";
import sideItems from "@/data/sidebar";



interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    id: string;
  }[];
  className?: string;
}

const SettingsSidebar: FC<Iproperties> = ({ className }) => {
  const pathname = usePathname();
  const currentPath =
    pathname?.split("/").length === 2 ? "admin" : pathname?.split("/")[2];
  const organizationPath = pathname?.split("/")[2];
  const isDashboard =
    currentPath === "admin" && organizationPath === undefined;

  // If user data is not yet loaded, show the skeleton loader
  // if (!user) {
  //   return (
  //     <div
  //       className={` ${className} h-full hidden lg:flex flex-col gap-11 items-center justify-center bg-white-200 pt-6  md:w-[220px] md:justify-start `}
  //     >
  //     </div>
  //   );
  // }



  return (
    <div
      className={` ${className} pl-5 pt-5 h-full hidden lg:flex flex-col gap-8 items-start justify-center bg-white-200 w-full md:w-[270px] md:justify-start `}
    >
      <Image src={Logo} alt="" />
      <section className=" flex flex-col gap-y-3 w-full">
        {sideItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            data-testid={item.id}
            role="sidebar-link"
            className={`${
              currentPath === item.id ||
              (isDashboard && item.id === "admin")
                ? "bg-active text-primary-2/80 bg-white rounded-lg"
                : "bg-transparent text-primary-2/50 hover:bg-gray-300"
            } flex uppercase cursor-pointer items-start justify-start gap-2.5 rounded-lg px-6 py-3 text-lg transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
          >
            {item.icon && <item.icon className="h-5 w-5" role="sidebar-icon" />}
            <span className="text-nowrap text-base">{item.route}</span>
          </Link>
        ))}
      </section>

     
    </div>
  );
};

export default SettingsSidebar;
