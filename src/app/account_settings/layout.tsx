"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const links = [
  {
    href: "/account_settings/profile_settings",
    label: "Profile Settings",
  },
  {
    href: "/account_settings/password_settings",
    label: "Password Settings",
  },
];

const AccountSettings = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="p-5 sm:p-10">
        <h1 className="text-2xl text-primary-2/85 font-bold border-b border-primary-2/40 uppercase py-5 sm:pt-0  ">
          Account Settings
        </h1>
        <div className="text-gray-4 flex gap-5 sm:gap-20 justify-center sm:justify-start py-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative py-3  ${
                pathname === link.href ? "font-medium" : "font-normal"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 mx-2   rounded-full transition-all duration-150 ${
                  pathname === link.href
                    ? "bg-green-1"
                    : "bg-transparent group-hover:bg-green-1"
                }`}
              ></span>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AccountSettings;
