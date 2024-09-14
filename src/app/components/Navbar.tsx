"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const MENU_LINKS = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About Us", link: "/about_us" },
    { name: "Contact Us", link: "/contact_us" },
  ];

  return (
    <header className="flex items-center justify-around h-[6rem] bg-white font-sans">
      <nav>
        <ul className="flex gap-[3rem]">
          {MENU_LINKS.map(({ link, name }) => (
            <Link
              href={link}
              key={link}
              className={`${
                pathname === link && "text-secondary font-medium"
              } text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 text-primary hover:text-secondary`}
            >
              {name}
            </Link>
          ))}
        </ul>
      </nav>
      <Logo />

      {/* // TODO: DELETE THESE COMMENTS AFTER
    // max-w-[79.663rem]
    //   <div */}
      {/* //     className={`flex gap-2 px-6 py-3 items-center ${
    //       darkMode ? "bg-primary" : "bg-white"
    //     } rounded-md shadow-sm`}
    //   >
    //     <span>
    //       <FcSearch size={"20px"} />
    //     </span>
    //     <input
    //       className={`${darkMode ? "bg-primary" : "bg-white"} outline-none  `}
    //       placeholder="Search for a country..."
    //       type="text"
    //       value={value}
    //       name={name}
    //     />
    //   </div>;
    w-[20px] h-[20px] text-primary p-[16px_148px_16px_14px] gap-0 rounded-full transition-width duration-200 ease-in-out  outline-none
    
    */}

      <div className="flex gap-[2rem] items-center">
        <div className="flex items-center gap-[3px] bg-gray-2 rounded-full px-2 py-2 transition-all duration-300 w-[50%] hover:w-[100%]">
          <span>
            <CiSearch className="text-primary" size={"20px"} />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="inherit bg-gray-2 rounded-full outline-none transition-all duration-300 px-2 py-1 w-[90%]"
          />
        </div>
        <div className="flex items-center gap-5 bg-gray-200 px-2 py-1 rounded-full">
          <div className="bg-[#5B5B5B] rounded-full p-2 relative">
            <IoCartOutline className="text-white" size={"25px"} />
            <p className=" absolute top-1 right-2  bg-[#FF0000] border border-white h-[15px] w-[15px] rounded-full text-[10px] text-white flex items-center justify-center">
              2
            </p>
          </div>
          <div className="bg-secondary rounded-full p-2">
            <RxAvatar className="text-white" size={"25px"} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
