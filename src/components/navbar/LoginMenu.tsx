
import { LOGIN_MENU_ITEMS } from "@/data/navbar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { MutableRefObject } from "react";

interface LoginMenuProps {
  showLoginMenu: boolean;
  loginMenuRef: MutableRefObject<HTMLUListElement | null>;
  hoverState: string;
  setHoverState: (state: string) => void;
  closeMenu: () => void;
}

export const LoginMenu: React.FC<LoginMenuProps> = ({ showLoginMenu, loginMenuRef, hoverState, setHoverState, closeMenu }) => (
  <AnimatePresence>
    {showLoginMenu && (
      <motion.ul
        ref={loginMenuRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute flex flex-col items-start top-[4.5rem] right-[0rem] z-[1000] bg-white backdrop-blur-md sm:w-auto py-2 px-3 drop-shadow-md rounded-xl"
        style={{
          background: `linear-gradient(to bottom, 
            ${hoverState === "signup" ? "rgb(229 231 235)" : "white"} 0%, 
            ${hoverState === "signup" ? "rgb(229 231 235)" : "white"} 50%, 
            ${hoverState === "login" ? "rgb(229 231 235)" : "white"} 50%, 
            ${hoverState === "login" ? "rgb(229 231 235)" : "white"} 100%)`,
          transition: "background 0.3s ease-in-out",
        }}
      >
        {LOGIN_MENU_ITEMS.map(({ text, href, state }) => (
          <li
            key={href}
            className="w-full py-1.5 transition-all ease-in duration-500"
            onMouseEnter={() => setHoverState(state || '')}
            onMouseLeave={() => setHoverState("none")}
          >
            <Link href={href} onClick={closeMenu}>{text}</Link>
          </li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
);
