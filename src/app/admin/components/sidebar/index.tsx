"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import { Logo } from "../../../../../public/icons";
import Image from "next/image";
import sideItems from "@/data/sidebar";
import { X, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    icon: string;
    id: string;
  }[];
  className?: string;
}

const SettingsSidebar: FC<Iproperties> = ({ className }) => {
  const pathname = usePathname();
  const currentPath =
    pathname?.split("/").length === 2 ? "admin" : pathname?.split("/")[2];
  const organizationPath = pathname?.split("/")[2];
  const isDashboard = currentPath === "admin" && organizationPath === undefined;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state

  // If user data is not yet loaded, show the skeleton loader
  // if (!user) {
  //   return (
  //     <div
  //       className={` ${className} h-full hidden lg:flex flex-col gap-11 items-center justify-center bg-white-200 pt-6  md:w-[220px] md:justify-start `}
  //     >
  //     </div>
  //   );
  // }

  return (
    <>
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      <div
        className={` ${className} pl-5 pt-5 h-full relative hidden lg:flex flex-col gap-8 items-start justify-center bg-white-200 w-full md:w-[200px] xl:w-[270px]  md:justify-start `}
      >
        <Image src={Logo} alt="" />
        <section className=" flex flex-col gap-y-3 w-full">
          {sideItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              data-testid={item.id}
              role="sidebar-link"
              className={`${
                currentPath === item.id || (isDashboard && item.id === "admin")
                  ? "bg-active text-primary-2/80 bg-white rounded-lg"
                  : "bg-transparent text-primary-2/50 hover:bg-gray-300"
              } flex uppercase cursor-pointer items-start justify-start gap-2.5 rounded-lg px-6 py-3 text-lg transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
            >
              <Image
                src={item.icon}
                alt=""
                className="h-5 w-5"
                role="sidebar-icon"
              />
              <span className="text-nowrap text-base">{item.route}</span>
            </Link>
          ))}
        </section>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-40 w-3/5 sm:w-2/5 h-full bg-white shadow-lg flex flex-col gap-4 p-4 "
            >
        <Image src={Logo} alt="" className="ml-10"/>

              <section className=" flex flex-col gap-y-3 w-full">
                {sideItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    data-testid={item.id}
                    role="sidebar-link"
                    className={`${
                      currentPath === item.id ||
                      (isDashboard && item.id === "admin")
                        ? "bg-active text-primary-2/80 bg-white rounded-lg"
                        : "bg-transparent text-primary-2/50 hover:bg-gray-300"
                    } flex uppercase cursor-pointer items-start justify-start gap-2.5 rounded-lg px-6 py-3 text-lg transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      className="h-5 w-5"
                      role="sidebar-icon"
                    />
                    <span className="text-nowrap text-base">{item.route}</span>
                  </Link>
                ))}
              </section>
            </motion.div>

            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)} // Close sidebar when overlay is clicked
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsSidebar;
