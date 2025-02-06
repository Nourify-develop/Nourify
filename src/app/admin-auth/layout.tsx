"use client";

import { ReactNode, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import Container from "@/layout/container";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/typography";

export default function AdminAuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin-auth") {
      redirect("/admin-auth/login");
    }
  }, [pathname]);

  const nav_data = [
    {
      title: "Login",
      link: "/admin-auth/login"
    },
    {
      title: "Sign Up",
      link: "/admin-auth/sign-up"
    },
  ]

  const activeIndex = nav_data.findIndex((item) => item.link === pathname);

  return (
    <Container className="bg-gray-1 flex items-center !px-[1.5%] gap-8">
      <aside className="w-full max-w-1/2 h-[96%] bg-white p-6 rounded-3xl flex flex-col gap-4">

        <div className="mb-5">
          {pathname === nav_data[0].link ?
            <div>
              <Typography.h1>Welcome Back</Typography.h1>
              <Typography.p isGray>Get back to keeping people healthy</Typography.p>
            </div>
            : pathname === nav_data[1].link ?
              <div>
                <Typography.h1>Register to be an Admin</Typography.h1>
                <Typography.p isGray>Join the revolution for healthy eating</Typography.p>
              </div>
              : null
          }
        </div>

        <div className="w-max p-1 bg-gray-2 rounded-full flex items-center gap-2 mx-auto">
          <div className="relative py-2.5">
            {nav_data.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={`relative px-8 py-2.5 rounded-full text-center whitespace-nowrap transition-colors duration-300 ease-in-out z-10 ${pathname === item.link ? "text-green-2 font-medium" : "text-black bg-transparent"}`}
              >
                {item.title}
              </Link>
            ))}
            <div
              className="absolute top-0 h-full bg-white rounded-full transition-transform duration-300 ease-in-out"
              style={{
                width: "6.9em",
                transform: `translateX(${activeIndex * 6.7}em)`,
              }}
            />
          </div>
        </div>

        {children}
      </aside>
      <aside className="relative hidden md:flex w-full max-w-1/2 h-[96%] rounded-3xl overflow-hidden">
        <Image
          src="/images/bg-login.png"
          width={0}
          height={0}
          className="w-full h-full"
          alt="Image"
          layout="fill"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      </aside>
    </Container>
  )
}