import { MENU_LINKS } from "@/data/navbar";
import Wrapper from "@/layout/wrapper";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import { NavSearch } from "./NavSearch";
import { LoginMenu } from "./LoginMenu";
// import { MobileMenu } from "./MobileMenu";
import { UserSection } from "./UserSection";
import { HamburgerButton } from "./HamburgerButton";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const [hoverState, setHoverState] = useState("none");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMidScreen, setIsMidScreen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const loginMenuRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
      setIsMidScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "unset";
  }, [showMobileMenu]);

  // Combined click handlers for mobile and login menus
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isLoginButtonClick = loginButtonRef.current?.contains(
        event.target as Node
      );
      const isLoginMenuClick = loginMenuRef.current?.contains(
        event.target as Node
      );
      const isMobileMenuClick = mobileMenuRef.current?.contains(
        event.target as Node
      );
      const isHamburgerClick = hamburgerRef.current?.contains(
        event.target as Node
      );
      const isSearchClick = inputRef.current?.contains(event.target as Node);

      // Handle login menu
      if (isLoginButtonClick) {
        setShowLoginMenu((prev) => !prev);
      } else if (!isLoginMenuClick && showLoginMenu) {
        setShowLoginMenu(false);
      }

      // Handle mobile menu
      if (!isMobileMenuClick && !isHamburgerClick && showMobileMenu) {
        setShowMobileMenu(false);
      }

      if (!isSearchClick && isSearchOpen && isMidScreen) {
        setisSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showLoginMenu, showMobileMenu, isSearchOpen, isSmallScreen]);

  const closeMenu = () => {
    setShowLoginMenu(false);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setisSearchOpen(true);
    inputRef.current?.focus();
  };

  const handleSearchClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setisSearchOpen(false);
  };

  const getMenuVariants = (isSmallScreen: boolean) =>
    ({
      desktop: {
        closed: { x: "-100%", opacity: 0 },
        open: {
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        },
        exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
      },
      mobile: {
        closed: { y: "-100%", opacity: 0 },
        open: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        },
        exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } },
      },
      
    }[isSmallScreen ? "mobile" : "desktop"]);

  return (
    <Wrapper className="bg-white sticky top-0 !py-3 shadow-xl !h-fit backdrop-blur-sm z-[997] ">
      <div className="flex items-center justify-between w-full font-sans lg:px-0 ">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex lg:flex">
          <ul className="flex gap-4 lg:gap-[2.5rem] xl:gap-[3rem]">
            {MENU_LINKS.map(({ link, name, id }) => (
              <NavLink key={id} link={link} name={name} pathname={pathname} />
            ))}
          </ul>
        </nav>

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <HamburgerButton
            showMobileMenu={showMobileMenu}
            toggleMobileMenu={() => setShowMobileMenu((prev) => !prev)}
            hamburgerRef={hamburgerRef}
          />
          <Logo />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-2">
          <NavSearch
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setisSearchOpen}
            handleSearchClick={handleSearchClick}
            handleSearchClose={handleSearchClose}
            inputRef={inputRef}
            onSearch={(term) => {
             
              console.log("Searching for:", term);
            }}
            isSmallScreen={isMidScreen} 
          />{" "}
          <UserSection
            loginButtonRef={loginButtonRef}
            handleLinkClick={() => setShowMobileMenu(false)}
          />
          <LoginMenu
            showLoginMenu={showLoginMenu}
            loginMenuRef={loginMenuRef}
            hoverState={hoverState}
            setHoverState={setHoverState}
            closeMenu={closeMenu}
          />
        </div>
      </div>

      <MobileMenu
        showMobileMenu={showMobileMenu}
        mobileMenuRef={mobileMenuRef}
        handleLinkClick={() => setShowMobileMenu(false)}
        menuVariants={getMenuVariants(isSmallScreen)}
      />
    </Wrapper>
  );
}

export default Navbar;
