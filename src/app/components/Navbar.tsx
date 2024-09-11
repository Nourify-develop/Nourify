import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  const MENU_LINKS = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About Us", link: "/about_us" },
    { name: "Contact Us", link: "/contact_us" },
  ];
  // max-w-[79.663rem]
  return (
    <header className="flex items-center justify-around h-[6rem] bg-white font-sans">
      <nav>
        <ul className="flex gap-[3rem]">
          {MENU_LINKS.map(({ link, name }) => (
            <Link
              href={link}
              key={link}
              className="text-[1.125rem] font-sans text-primary"
            >
              {name}
            </Link>
          ))}
        </ul>
      </nav>
      <Logo />

      <div className="flex gap-[2rem] items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-[20px] h-[20px] text-white p-[16px_148px_16px_14px] gap-0 rounded-full transition-width duration-200 ease-in-out opacity-0 bg-gray-300 focus:opacity-100 hover:opacity-100 outline-none"
        />
        <div>CART</div>
      </div>
    </header>
  );
}

export default Navbar;
