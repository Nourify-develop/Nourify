"use client";
import React, { useState, useCallback } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showLoginMenu, setShowLoginMenu] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleLoginMenu = useCallback(() => {
    setShowLoginMenu((current) => !current);
  }, []);

  const pathname = usePathname();
  const MENU_LINKS = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About Us", link: "/about_us" },
    { name: "Contact Us", link: "/contact_us" },
  ];

  return (
    <div className=" bg-white sticky top-0 backdrop-blur-sm z-[1000]">
      <header className="flex lg:container lg:mx-auto items-center justify-around h-[6rem] font-sans relative">
        <nav className="hidden md:flex lg:flex">
          <ul className="flex gap-[3rem]">
            {MENU_LINKS.map(({ link, name }) => (
              <Link
                href={link}
                key={link}
                className={`${
                  (link === "/" && pathname === "/") || (link !== "/" && pathname.startsWith(link)) ? "text-secondary font-medium" : "text-gray-7"
                } md:text-[0.775rem] lg:text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 text-primary hover:text-secondary`}
              >
                {name}
              </Link>
            ))}
          </ul>
        </nav>
        <Logo />
        <div className="flex md:gap-[1rem] lg:gap-[2rem] items-center">
          <div className="absolute md:relative top-full left-0 w-full flex items-center gap-[5px] md:gap-[1px] lg:gap-[3px] bg-gray-2 md:rounded-full md:ml-4  md:px-1 md:py-1 lg:px-2 lg:py-2 transition-all duration-300 md:w-[100%]">
            <span>
              <CiSearch className="text-primary pl-2 md:pl-0" size={"20px"} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="inherit bg-gray-2 rounded-full outline-none transition-all duration-300 lg:px-2 lg:py-1 w-[90%]"
            />
          </div>
          <div className="flex items-center gap-5 bg-gray-200 px-1 py-1 rounded-full">
            <div className="bg-gray-3 rounded-full p-1 lg:p-2 relative">
              <IoCartOutline className="text-white" size={" 25px"} />
              <p className=" absolute top-0 md:top-1 right-0 md:right-1 lg:right-2  bg-[#FF0000] border border-white h-[15px] w-[15px] rounded-full text-[10px] text-white flex items-center justify-center">
                2
              </p>
            </div>

            <div
              onClick={toggleLoginMenu}
              className="bg-secondary rounded-full md:p-1 lg:p-2"
            >
              <RxAvatar className="text-white" size={"25px"} />
            </div>
          </div>

          {/* TODO: MAKE A DROPDOWN FOR CREATE ACCOUNT AND LOGIN */}
          {/* FIXME: WORKS */}

          <AnimatePresence>
            {showLoginMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute flex flex-col items-center self-end top-[8rem] right-5 z-[1000] space-y-6 bg-white backdrop-blur-md sm:w-auto sm:self-center py-6  px-8 drop-shadow-md"
              >
                <Link href="/signup">Create an account</Link>
                <Link href="/login">Log in</Link>
              </motion.div>
            )}
            S
          </AnimatePresence>

          {/* TODO: HAMBURGER ICON and add the "OPEN"  class dynamically.*/}
          {/* FIXME: WORKS */}
          <button
            onClick={toggleMobileMenu}
            className={`${showMobileMenu ? "open" : null}
            "block hamburger ml-10 mt-[0.5rem] cursor-pointer md:hidden focus:outline-none`}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>

          {/* TODO: MOBILE MENU - make sure the hidden class is applied and then removed dynamically.*/}
          {/* FIXME: WORKS */}

          <div>
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute flex flex-col items-center self-end py-8 mt-20 z-[1000] space-y-6 bg-white backdrop-blur-md sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
                >
                  {MENU_LINKS.map(({ link, name }) => (
                    <Link
                      href={link}
                      key={link}
                      className={`${
                        pathname === link && "text-secondary font-medium"
                      } text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 text-primary`}
                    >
                      {name}
                    </Link>
                  ))}
                </motion.div>
              )}{" "}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
