import { MENU_LINKS, MOBILE_AUTH_ITEMS } from "@/data/navbar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MutableRefObject } from "react";
import Logo from "../Logo";

interface MobileMenuProps {
  showMobileMenu: boolean;
  mobileMenuRef: MutableRefObject<HTMLDivElement | null>;
  handleLinkClick: () => void;
  menuVariants: any;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  showMobileMenu,
  mobileMenuRef,
  handleLinkClick,
  menuVariants,
}) => {
  const pathname = usePathname();
  return (
    <div ref={mobileMenuRef}>
      <AnimatePresence>
        {showMobileMenu && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
            className="fixed md:hidden X bg-white backdrop-blur-md w-full sm:w-[70%] left-0 h-screen top-0 flex items-center flex-col px-3 gap-2 z-[1000]"
          >
            <div className=" pt-3 ">
              <Logo />
            </div>
            <div className="pt-10 w-full">
              {MENU_LINKS.map(({ link, name, id }) => (
                <li key={id} className="relative w-full">
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
            </div>

            {/* Mobile menu content */}
            <div className="mt-auto mb-5 w-full space-y-2">
              {MOBILE_AUTH_ITEMS.map(({ text, href, className }) => (
                <li key={href} className="w-full">
                  <Link
                    href={href}
                    onClick={handleLinkClick}
                    className={`text-[1.125rem] font-medium w-full font-sans py-3 transition-all rounded-full ease-in-out duration-300 flex justify-center items-left px-10 ${className}`}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
