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

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState<boolean>(false);
  const [hoverState, setHoverState] = useState("none");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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

  const MOBILE_MENU_LINKS = [
    { name: "Home", link: "/", id: 1 },
    { name: "Shop", link: "/shop", id: 2 },
    { name: "cart", link: "/cart", id: 3 },
    { name: "About Us", link: "/about-us", id: 4 },
    { name: "Contact Us", link: "/contact-us", id: 5 },
    { name: "Create Account", link: "/signup", id: 6 },
    { name: "Login to your Account", link: "/login", id: 7 },
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
  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Backdrop variants
  const backdropVariants = {
    closed: {
      opacity: 0
    },
    open: {
      opacity: 1
    }
  };

  return (
    <Wrapper
      className="bg-white/80 sticky top-0 !py-3 !h-fit backdrop-blur-md z-[1000]"
      onClick={removeLoginMenu}
    >
      <div className="flex items-center justify-between w-full font-sans lg:px-0 relative">
        {/* Rest of your existing navbar code remains the same until the mobile menu section */}
        
        {/* Mobile Menu with Backdrop */}
        <div ref={mobileMenuRef}>
          <AnimatePresence>
            {showMobileMenu && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={backdropVariants}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
                  onClick={() => setShowMobileMenu(false)}
                />
                
                {/* Mobile Menu */}
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="exit"
                  variants={menuVariants}
                  className="fixed md:hidden bg-white/95 backdrop-blur-md w-[70%] text-center right-0 h-screen top-0 flex pt-20 items-center flex-col px-3 gap-2 z-[1000]"
                >
                  {MOBILE_MENU_LINKS.map(({ link, name, id }) => (
                    <li key={id} className={`relative w-full ${id == 6 ? 'pt-10 border-t border-primary-2/20' : 'pt-0'} ${id == 5 ? 'pb-10 ' : 'pb-0'}`}>
                      <Link
                        href={link}
                        onClick={handleLinkClick}
                        className={`${
                          pathname === link ? "text-green bg-[#087D400D]" : ""
                        } text-[1.125rem] font-medium font-sans py-3 transition-all rounded-md ease-in-out duration-300 text-gray-500 hover:text-green hover:bg-[#087D400D] flex justify-center items-center`}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;