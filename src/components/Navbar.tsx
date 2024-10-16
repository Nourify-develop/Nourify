"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
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

  const [hoverState, setHoverState] = useState("none");

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

  const removeLoginMenu = () => {
    if (showLoginMenu) {
      setShowLoginMenu(false);
    }
  };

  return (
    <div
      className=" bg-white sticky top-0 backdrop-blur-sm z-[1000]"
      onClick={removeLoginMenu}
    >
      <header className="flex lg:max-w-[1250px] lg:mx-auto items-center justify-between h-[6rem] font-sans px-4 sm:px-6 lg:px-8 relative">
        <nav className="hidden md:flex lg:flex">
          <ul className="flex gap-[3rem] ">
            {MENU_LINKS.map(({ link, name }) => (
              <li className="relative">
                <Link
                  href={link}
                  key={link}
                  className={`${
                    (link === "/" && pathname === "/") ||
                    (link !== "/" && pathname.startsWith(link))
                      ? "active"
                      : "!text-gray-7"
                  } md:text-[0.775rem] lg:text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 nav_links`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Logo />
        <div className="flex md:gap-[1rem] lg:gap-[2rem] items-center">
          <div className="absolute md:relative top-full left-0 w-full flex items-center gap-[5px] md:gap-[1px] lg:gap-[3px] bg-[#F4F4F4] md:rounded-full md:ml-4  md:px-1 md:py-1 lg:px-2 lg:py-2 transition-all duration-300 md:w-[100%]">
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
          <div className="flex items-center gap-5 bg-gray-200 px-1 py-1 rounded-full">
            <div className="bg-gray-3 rounded-full p-1 lg:p-2 relative cursor-pointer">
              <IoCartOutline className="text-white" size={" 25px"} />
              <p className="absolute top-0 md:top-1 right-0 md:right-1 lg:right-2  bg-[#FF0000] border border-white h-[15px] w-[15px] rounded-full text-[10px] text-white flex items-center justify-center">
                2
              </p>
            </div>

            <div
              onClick={toggleLoginMenu}
              className="bg-green rounded-full md:p-1 lg:p-2 cursor-pointer"
            >
              <RxAvatar className="text-white" size={"25px"} />
            </div>
          </div>

          {/* TODO: MAKE A DROPDOWN FOR CREATE ACCOUNT AND LOGIN */}
          {/* FIXME: WORKS */}

          <AnimatePresence>
            {showLoginMenu && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute flex flex-col items-center self-end top-[6rem] right-[4.5rem] z-[1000] overflow-hidden bg-white backdrop-blur-md sm:w-auto sm:self-center py-6  px-8 drop-shadow-md  "
                style={{
                  background: `linear-gradient(to bottom, 
          ${hoverState === "signup" ? "rgb(229 231 235)" : "white"} 0%, 
          ${hoverState === "signup" ? "rgb(229 231 235)" : "white"} 50%, 
          ${hoverState === "login" ? "rgb(229 231 235)" : "white"} 50%, 
          ${hoverState === "login" ? "rgb(229 231 235)" : "white"} 100%)`,
                  transition: "background 0.3s ease-in-out",
                }}
              >
                <li
                  className="w-full text-center py-3 transition-all ease-in duration-500"
                  onMouseEnter={() => setHoverState("signup")}
                  onMouseLeave={() => setHoverState("none")}
                >
                  {" "}
                  <Link href="/signup">Create an account</Link>
                </li>

                <li
                  className="w-full text-center py-3 transition-all ease-in duration-300"
                  onMouseEnter={() => setHoverState("login")}
                  onMouseLeave={() => setHoverState("none")}
                >
                  <Link href="/login">Log in</Link>{" "}
                </li>
              </motion.ul>
            )}
            S
          </AnimatePresence>

          {/* TODO: HAMBURGER ICON and add the "OPEN" class dynamically.*/}
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
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute flex flex-col items-center self-end py-8 mt-20 z-[1000] space-y-6 bg-white backdrop-blur-md sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
                >
                  {MENU_LINKS.map(({ link, name }) => (
                    <li className="relative">
                      <Link
                        href={link}
                        key={link}
                        className={`${
                          pathname === link && "active"
                        } text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 text-gray-500 nav_links`}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}{" "}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
