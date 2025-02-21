import { MENU_LINKS, MOBILE_AUTH_ITEMS } from "@/data/navbar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "../Logo";
import { useAuth } from "@/context/AuthContext"; 
import {
  IoEllipsisHorizontalOutline,
  IoPower,
  IoSettingsOutline,
} from "react-icons/io5";
import { ConfirmModal } from "./LogoutModal";
import Image from "next/image";

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
  const { user, logout } = useAuth(); // Get user data and logout function

  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Extract user initials for profile picture fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Toggle modal visibility
  const toggleModal = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click from bubbling to document
    setIsModalOpen((prev) => !prev);
  };

  // Handle logout button click
  const handleLogoutClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(false); 
    setShowLogoutModal(true); 
  };

  const handleConfirmLogout = () => {
    logout();
  
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Backdrop animation variants
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div ref={mobileMenuRef}>
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Blurred Backdrop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="exit"
              variants={backdropVariants}
              className="fixed w-full h-screen md:hidden inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
              onClick={handleLinkClick} // Close menu when backdrop is clicked
            />

            {/* Mobile Menu */}
            <motion.ul
              initial="closed"
              animate="open"
              exit="exit"
              variants={menuVariants}
              className="fixed md:hidden bg-white w-full sm:w-[70%] left-0 h-screen top-0 flex items-center flex-col px-3 gap-2 z-[1001]"
            >
              <div className="pt-3">
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

              {/* User Profile Section */}
              {user ? (
                <div className="mt-auto relative mb-5 w-full space-y-4 px-10 flex justify-between">
                  <div className="flex items-center gap-3">
                    {/* Profile Picture */}
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-green rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">
                        <Image
                          src="/icons/user-circle.svg"
                          alt="user circle"
                          width={25}
                          height={25}
                        />
                      </div>
                    )}

                    {/* User Info */}
                    <div>
                      <p className="text-lg font-semibold">
                        {user?.firstName + " " + user?.lastName || "User Name"}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    ref={buttonRef}
                    onClick={toggleModal}
                    className="border border-gray-200 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-2xl text-[#5E5E5E]"
                  >
                    <IoEllipsisHorizontalOutline />
                  </button>
                  {isModalOpen && (
                    <div
                      ref={modalRef}
                      className="absolute right-0 bottom-[100%]  w-40 bg-white shadow-lg rounded-lg py-2 z-50"
                    >
                      <Link
                        href="/settings"
                        onClick={handleLinkClick}
                        className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 font-medium"
                      >
                        <IoSettingsOutline size={18} />
                        Settings
                      </Link>
                      <hr className="mx-3 border-gray-2 border-[1px]" />
                      <button
                        onClick={handleLogoutClick}
                        className=" w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center text-[#FF0000] gap-2 font-medium"
                      >
                        <IoPower size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
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
              )}
            </motion.ul>
          </>
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
    </div>
  );
};
