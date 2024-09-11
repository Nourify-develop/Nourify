import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <img
        src="images\Screenshot_2024-07-23_at_2.34.36_PM-removebg-preview 1@2x.png"
        alt="Nourify Logo"
        className="w-[8.55rem] h-[4.375rem]"
      />
    </Link>
  );
}

export default Logo;
