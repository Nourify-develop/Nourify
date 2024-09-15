"use client";
import React, { useState, useEffect } from "react";

function HeroSection() {
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSecondImage((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-in-out ${
            showSecondImage ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            backgroundImage: "url('/images/bg-1.png')",
          }}
        ></div>

        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-in-out ${
            showSecondImage ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundImage: "url('/images/bg-2.png')",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 justify-center px-5 lg:px-20 h-full items-start text-white">
        <div className="flex h-fit">
          <h1
            className={`text-5xl  lg:text-[80px] h-fit leading-[60px] lg:leading-[95px] font-extrabold uppercase transition-transform  duration-1000 ease-in-out ${
              showSecondImage
                ? "-translate-x-full "
                : "translate-x-0 opaity-100"
            }`}
          >
            Fresh, <span className="font-bold text-yellow">Organic</span>{" "}
            Groceries to your doorstep
          </h1>

          <h1
            className={`absolute text-5xl  lg:text-[80px] leading-[60px] lg:leading-[95px] font-extrabold uppercase transition-transform  duration-1000 ease-in-out h-fit ${
              showSecondImage
                ? "translate-x-0 opaciy-100"
                : "translate-x-full oacity-0"
            }`}
          >
            Indulge in our Freshly Baked{" "}
            <span className="font-bold text-yellow">Pastries</span>
          </h1>
        </div>

        <p className="m2 text-2xl text-white/90 transition-opacity duration-1000">
          Experience the ease of speedy delivery with Nourify – where healthy
          choices meet peak freshness.
        </p>
        <span className="text-sm pl-2.5 flex items-center gap-2.5 transition-opacity duration-1000">
          <img src="/general.svg" alt="General Icon" />
          Used by 15,000+ worldwide
        </span>
        <button className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit transition-opacity duration-1000">
          Start shopping
        </button>
      </div>

      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
    </div>
  );
}

export default HeroSection;
