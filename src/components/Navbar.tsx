"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Wrapper from "@/layout/wrapper";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { cart } = useCart();
  const [showLoginMenu, setShowLoginMenu] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [hoverState, setHoverState] = useState("none");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Function to check the screen size
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // Adjust breakpoint as needed
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Add event listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu]);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleLoginMenu = useCallback(() => {
    setShowLoginMenu((current) => !current);
  }, []);

  const pathname = usePathname();
  const MENU_LINKS = [
    { name: "Home", link: "/", id: 1 },
    { name: "Shop", link: "/shop", id: 2 },
    { name: "About Us", link: "/about-us", id: 3 },
    { name: "Contact Us", link: "/contact-us", id: 4 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };

  const removeLoginMenu = () => {
    if (showLoginMenu) {
      setShowLoginMenu(false);
    }
  };

  // Animation variants for the mobile menu
  const menuVariants = isSmallScreen
    ? {
        closed: {
          y: "-100%", // Slide from the top for smaller screens
          opacity: 0,
        },
        open: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        },
        exit: {
          y: "-100%",
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        },
      }
    : {
        closed: {
          x: "-100%", // Slide from the left for larger screens
          opacity: 0,
        },
        open: {
          x: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        },
        exit: {
          x: "-100%",
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        },
      };

  const backdropVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[998] md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
        )}
      </AnimatePresence>
      <Wrapper
        className="  sticky top-0 !py-3 shadow-xl !h-fit backdrop-blur-sm z-[997]"
        onClick={removeLoginMenu}
      >
        <div className="flex items-center justify-between w-full font-sans lg:px-0 relative">
          <nav className="hidden md:flex lg:flex">
            <ul className="flex gap-4 lg:gap-[2.5rem] xl:gap-[3rem] ">
              {MENU_LINKS.map((products) => (
                <li className="relative" key={products.id}>
                  <Link
                    href={products.link}
                    className={`${
                      (products.link === "/" && pathname === "/") ||
                      (products.link !== "/" &&
                        pathname.startsWith(products.link))
                        ? "active"
                        : "!text-gray-7"
                    } md:text-[0.775rem] lg:text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 nav_links`}
                  >
                    {products.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="">
            <Logo />
          </div>

          <div className="flex items-center justify-end">
            <div className="relative w-[60%] sm:w-auto   flex items-center gap-[5px] md:gap-[1px] lg:gap-[3px] bg-[#F4F4F4] rounded-full ml-4 mr-[.5rem]  px-2 py-2 transition-all duration-300 ">
              <span>
                <CiSearch
                  className="text-primary pl-0"
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
            <div className="hidden md:flex items-center  gap-5 bg-gray-200 px-1 sm:ml-3 lg:ml-[1rem] py-1 rounded-full">
              <Link
                href={"/cart"}
                className="bg-gray-3 rounded-full w-10 h-10 flex justify-center items-center relative cursor-pointer"
              >
                <ShoppingCart className="text-white" />
                {cart.length > 0 ? (
                  <p className="absolute top-4 md:-top-1 -right-2 md:right-1 lg:-right-1 bg-red px-1.5  rounded-full text-sm text-white flex items-center justify-center">
                    {cart.length}
                  </p>
                ) : (
                  ""
                )}
              </Link>

              <div
                onClick={toggleLoginMenu}
                className="bg-green rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
              >
                {/* <RxAvatar className="text-white" size={"25px"} /> */}
                <Image
                  src={"/icons/user-circle.svg"}
                  alt="user circle"
                  width={25}
                  height={25}
                />
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
                  transition={{ duration: 0.3 }}
                  className="absolute flex flex-col items-start justify-start self-end top-[4.5rem] duration-300 rounded-xl right-[0rem] z-[1000] overflow-hidden bg-white backdrop-blur-md sm:w-auto sm:self-center py-2  px-3 drop-shadow-md  "
                  style={{
                    background: `linear-gradient(to bottom, 
                  ${
                    hoverState === "signup" ? "rgb(229 231 235) " : "white"
                  } 0%, 
                  ${
                    hoverState === "signup" ? "rgb(229 231 235) " : "white"
                  } 50%, 
                  ${
                    hoverState === "login" ? "rgb(229 231 235) " : "white"
                  } 50%, 
                  ${
                    hoverState === "login" ? "rgb(229 231 235) " : "white"
                  } 100%)`,
                    transition: "background 0.3s ease-in-out",
                  }}
                >
                  <li
                    className="w-full  py-1.5 transition-all ease-in duration-500"
                    onMouseEnter={() => setHoverState("signup")}
                    onMouseLeave={() => setHoverState("none")}
                  >
                    {" "}
                    <Link href="/signup">Create an account</Link>
                  </li>

                  <li
                    className="w-full text-center py-1.5 transition-all ease-in duration-300"
                    onMouseEnter={() => setHoverState("login")}
                    onMouseLeave={() => setHoverState("none")}
                  >
                    <Link href="/login">Log in to your account</Link>{" "}
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>

            {/* TODO: HAMBURGER ICON and add the "OPEN" class dynamically.*/}
            {/* FIXME: WORKS */}
            <div className="w-10 h-10 md:hidden cursor-pointer bg-gray-1 border border-gray-light-2 relative z-[1001] rounded-full flex justify-center items-center">
              <button
                onClick={toggleMobileMenu}
                ref={hamburgerRef}
                className={`${showMobileMenu ? "open" : null}
            "hamburger  cursor-pointer  focus:outline-none flex flex-col gap-1 justify-center items-center`}
              >
                {!showMobileMenu ? (
                  <span className="transition">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83398 4.16675H14.1673"
                        stroke="#5E5E5E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 10H16.3333"
                        stroke="#5E5E5E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.83398 15.8333H14.1673"
                        stroke="#5E5E5E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8346 1.16675L1.16797 12.8334M1.16797 1.16675L12.8346 12.8334"
                        stroke="#141B34"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </div>
            {/* TODO: MOBILE MENU - make sure the hidden class is applied and then removed dynamically.*/}
            {/* FIXME: WORKS */}
          </div>
        </div>
      </Wrapper>

      <div ref={mobileMenuRef}>
        <AnimatePresence>
          {showMobileMenu && (
            <>
              {/* Mobile Menu */}
              <motion.ul
                initial="closed"
                animate="open"
                exit="exit"
                variants={menuVariants}
                className="fixed md:hidden bg-white backdrop-blur-md w-full sm:w-[70%]  left-0 h-screen top-0 flex  items-center flex-col px-3 gap-2 z-[1000]"
              >
                <div className="w-full flex items-center justify-between my-10">
                  <div className="">
                    <Logo />
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={"/cart"}
                      onClick={handleLinkClick}
                      className="bg-green rounded-full w-10 h-10 flex justify-center items-center relative cursor-pointer"
                    >
                      <ShoppingCart className="text-white" />
                      {cart.length > 0 ? (
                        <p className="absolute -top-1 md:-top-1 -right-2 md:right-1 lg:-right-1 bg-red px-1.5  rounded-full text-sm text-white flex items-center justify-center">
                          {cart.length}
                        </p>
                      ) : (
                        ""
                      )}
                    </Link>

                    <div className="w-10 h-10 md:hidden cursor-pointer bg-gray-1 border border-gray-light-2 relative z-[1001]  rounded-full flex justify-center items-center">
                      <button
                        onClick={toggleMobileMenu}
                        ref={hamburgerRef}
                        className={`hamburger   cursor-pointer  focus:outline-none flex flex-col gap-1 justify-center items-center`}
                      >
                        <span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8346 1.16675L1.16797 12.8334M1.16797 1.16675L12.8346 12.8334"
                              stroke="#141B34"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {MENU_LINKS.map(({ link, name, id }) => (
                  <li key={id} className={`relative w-full`}>
                    <Link
                      href={link}
                      onClick={handleLinkClick}
                      className={`${
                        pathname === link ? "text-green bg-[#087D400D]" : ""
                      } text-[1.125rem] font-medium font-sans py-3 transition-all rounded-full ease-in-out duration-300 text-gray-500 hover:text-green hover:bg-[#087D400D] flex justify-start items-left px-10`}
                    >
                      {name}
                    </Link>
                  </li>
                ))}

                <li className=" w-full pt-4 pb-2 border-t border-primary-2/20">
                  <Link
                    href={"/login"}
                    onClick={handleLinkClick}
                    className={` text-[1.125rem] font-medium w-full font-sans py-3  transition-all rounded-full ease-in-out duration-300 border border-green text-green  hover:bg-green/80 hover:text-white flex justify-center items-left px-10`}
                  >
                    Login
                  </Link>
                </li>

                <li className=" w-full  ">
                  <Link
                    href={"/signup"}
                    onClick={handleLinkClick}
                    className={` text-[1.125rem] font-medium w-full font-sans py-3  transition-all rounded-full ease-in-out duration-300 bg-green text-white  hover:bg-green/80 flex justify-center items-left px-10`}
                  >
                    Sign Up
                  </Link>
                </li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;
