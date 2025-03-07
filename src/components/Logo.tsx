import React from "react";
import Link from "next/link";

function Logo() {
  return (
    // FIXME: added a backslash  to the src attribute to render directly from the root

    <Link href="/">
      <img
        src="/icons/Nourify.svg"
        alt="Nourify Logo"
        className="w-[6rem] h-[4rem] md:w-[6rem] md:h-[4rem] lg:w-[8.55rem] lg:h-[4.375rem] drop-shadow-xl transition-all duration-300"
      />
    </Link>
  );
}

export default Logo;
