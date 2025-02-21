import Link from "next/link";

type NavLinkProps = {
  link: string;
  name: string;
  pathname: string;
};

export const NavLink = ({ link, name, pathname }: NavLinkProps) => (
    <li className="relative">
      <Link
        href={link}
        className={`${
          (link === "/" && pathname === "/") ||
          (link !== "/" && pathname.startsWith(link))
            ? "active"
            : "!text-gray-7"
        } md:text-[0.775rem] lg:text-[1.125rem] font-medium font-sans transition-all ease-in-out duration-300 nav_links`}
      >
        {name}
      </Link>
    </li>
  );