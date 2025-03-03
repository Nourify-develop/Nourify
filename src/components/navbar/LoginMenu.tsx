import { LOGIN_MENU_ITEMS } from "@/data/navbar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { MutableRefObject, useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { IoSettingsOutline, IoPower } from "react-icons/io5";
import { ConfirmModal } from "./LogoutModal";

interface LoginMenuProps {
  showLoginMenu: boolean;
  loginMenuRef: MutableRefObject<HTMLDivElement | null>;
  hoverState: string;
  setHoverState: (state: string) => void;
  closeMenu: () => void;
}

export const LoginMenu: React.FC<LoginMenuProps> = ({
  showLoginMenu,
  loginMenuRef,
  hoverState,
  setHoverState,
  closeMenu,
}) => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handle logout button click
  const handleLogoutClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    closeMenu(); // Close the login menu
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  // Handle confirming logout
  const handleConfirmLogout = () => {
    logout();
    // The modal will close itself via onClose
  };

  return (
    <>
      <AnimatePresence>
        {showLoginMenu && (
          <motion.div
            ref={loginMenuRef}
            className="absolute top-full right-2 mt-2 bg-white shadow-lg rounded-md py-2 z-50 min-w-[200px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {user ? (
              <>
                <Link
                  href="/settings"
                  className={`block px-4 py-2 hover:bg-gray-100 font-medium transition-colors text-gray-700 ${
                    hoverState === "settings" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    closeMenu();
                  }}
                  onMouseEnter={() => setHoverState("settings")}
                  onMouseLeave={() => setHoverState("none")}
                >
                  <div className="flex items-center gap-2">
                    <IoSettingsOutline size={18} />
                    <span>Settings</span>
                  </div>
                </Link>
                <hr className="mx-3 my-1 border-gray-200" />
                <button
                  onClick={handleLogoutClick}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600 ${
                    hoverState === "logout" ? "bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => setHoverState("logout")}
                  onMouseLeave={() => setHoverState("none")}
                >
                  <div className="flex items-center font-medium text-red gap-2">
                    <IoPower size={18} />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                {LOGIN_MENU_ITEMS.map(({ text, href, state }) => (
                  <Link
                    href={href}
                    key={text}
                    className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                      hoverState === state ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      closeMenu();
                    }}
                    onMouseEnter={() => setHoverState(state || "")}
                    onMouseLeave={() => setHoverState("none")}
                  >
                    {text}
                  </Link>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <ConfirmModal
          isOpen={showLogoutModal}
          message="Logout"
          onConfirm={handleConfirmLogout}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};
