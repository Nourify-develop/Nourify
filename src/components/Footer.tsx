import React from "react";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlinePinterest } from "react-icons/ai";

function Footer() {
  const currentYear = new Date().getFullYear();

  const FOOTER_LINKS_ONE = [
    { name: "Featured Products", link: "/" },
    { name: "Special Offers", link: "/" },
    { name: "New Arrivals", link: "/" },
    { name: "Best Sellers", link: "/" },
  ];
  const FOOTER_LINKS_TWO = [
    { name: "Customer Service", link: "#" },
    { name: "FAQs", link: "#" },
    { name: "Return & Exchange", link: "#" },
    { name: "Privacy Policy", link: "#" },
  ];
  const FOOTER_LINKS_THREE = [
    { name: "Company Information", link: "#" },
    { name: "Our Story", link: "#" },
    { name: "Meet The Team", link: "#" },
    { name: "Careers", link: "#" },
  ];

  return (
    <footer className="bg-green-dark font-sans">
      <div className="container relative px-12 xl:mx-auto">
        {/* TODO: div left */}
        <div className="flex flex-col relative gap-8 md:flex-row text-left w-full md:justify-between pt-12 pb-12  before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-gradient-to-r from-[#013115] via-white to-[#013115]">
          <div className="flex flex-col gap-2">
            <div className="">
              <img
                src="/images/NOURIFY.png"
                alt="Nourify Footer Logo"
                className="mb-4"
              />
            </div>

            <p className="text-white text-[0.8rem] leading-[1.094rem] tracking-wide">
              Where Healthy Choices Meet Peak Freshness.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 w-auto text-white gap-[2.5rem]">
            <div>
              <h4 className="mb-5 text-lg md:text-[1.5rem]">Shop</h4>
              <div className="flex flex-col gap-4 font-normal text-[0.875rem] text-white/60">
                {FOOTER_LINKS_ONE.map(({ link, name }) => (
                  <Link
                    href={link}
                    key={name}
                    className="transition-all ease-in-out duration-200 hover:underline"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-5 text-lg md:text-[1.5rem]">Help</h4>
              <div className="flex flex-col gap-4 font-normal text-[0.875rem] text-white/60">
                {FOOTER_LINKS_TWO.map(({ link, name }) => (
                  <Link
                    href={link}
                    key={name}
                    className="transition-all ease-in-out duration-200 hover:underline"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-5 text-lg md:text-[1.5rem]">About</h4>
              <div className="flex flex-col gap-4 font-normal text-[0.875rem] text-white/60">
                {FOOTER_LINKS_THREE.map(({ link, name }) => (
                  <Link
                    href={link}
                    key={name}
                    className="transition-all ease-in-out duration-200 hover:underline"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="flex flex-col-reverse gap-9 text-center md:flex-row justify-between mt-[4rem]">
          <p className="text-white text-[1.125rem] leading-snug ">
            Copyright &copy; {currentYear}, Nourify - Where Healthy Choices Meet
            Peak Freshness.
          </p>
          {/* ICONS */}
          <div className="flex justify-center items-center gap-[28px] md:mr-10">
            <Link href="https://instagram.com">
              <FaInstagram size={"24px"} color="#fff" />
            </Link>
            <Link href="https://facebook.com">
              <LuFacebook size={"24px"} color="#fff" />
            </Link>
            <Link href="https://x.com">
              <BsTwitterX size={"24px"} color="#fff" />
            </Link>
            <Link href="https://pinterest.com">
              <AiOutlinePinterest size={"24px"} color="#fff" />
            </Link>
            <Link href="https://tiktok.com">
              <FaTiktok size={"24px"} color="#fff" />
            </Link>
          </div>
        </div>
      </div>

      <img
        src="/images/footer-img.svg"
        alt="Nourify Footer Logo"
        className="mt-[2rem]"
      />
    </footer>
  );
}

export default Footer;
