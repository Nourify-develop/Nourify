"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { Notification } from "../../../../../public/icons";
import sideItems from "@/data/sidebar";



const UserNavbar: React.FC = () => {
  const pathname = usePathname();

  // Extract the current route identifier
  const currentPath = pathname?.split("/")[2];

  // Find the matching route name
  const currentRoute =
    sideItems.find((item) => item.id === currentPath)?.route || "Overview";

  return (
    <nav
      className="bg-white px-[24px] py-2.5 w-full border-b-[0.5px] rounded-t-xl border-primary-2/20"
      role="navbar"
    >
      <div className="flex items-center justify-between w-full gap-2">
        {/* Header dynamically updates */}
        <h1 className="text-lg font-bold uppercase w">{currentRoute}</h1>

        {/* Logo */}
        <div className="flex gap-2 w">
          <div className="absolute md:relative top-full left-0 w-full flex items-center gap-[5px] md:gap-[1px] lg:gap-[3px] bg-[#F4F4F4] md:rounded-full md:ml-4 lg:mr-[1rem]  md:px-1 md:py-1 lg:px-2 lg:py-2 transition-all duration-300 md:w-[100%]">
            <span>
              <CiSearch
                className="text-primary pl-2 md:pl-0"
                size={"20px"}
                color={"#777"}
              />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="text-gray-3 bg-[#F4F4F4] rounded-full outline-none transition-all duration-300 lg:px-2 lg:py-1 w-[90%]"
            />
          </div>
          <div className="flex items-center gap-4 px-4 border-l-[0.2px]  border-primary-2/20">
            <Image
              src={Notification}
              alt=""
              className="w-9 h-9 p-2 bg-gray-2 rounded-full"
            />
            <p className="text-sm text-white py-1.5 px-2 rounded-full uppercase bg-secondary">
              OJ
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
