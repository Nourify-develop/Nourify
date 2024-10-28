"use client";
import React, { useState, useEffect } from "react";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to scroll to the "our-products" section
  const handleStartShoppingClick = () => {
    const productsSection = document.getElementById("our-products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Effect to create a continuous infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // We have 3 slides in total now
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Wrapper for sliding content */}
      <div
        className="absolute inset-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`, // Move horizontally, continuously
        }}
      >
        {/* Slide 1 */}
        <div
          className="w-full h-full bg-cover bg-center flex-shrink-0 flex flex-col justify-center items-start text-white"
          style={{ backgroundImage: "url('/images/bg1.png')" }}
        >
          <div className="relative z-10 flex flex-col gap-6 px-5 lg:px-10 xl:px-20 h-full justify-center items-start">
            <h1 className="text-5xl lg:text-[80px] leading-[60px] lg:leading-[95px] font-extrabold uppercase">
              Fresh, <span className="font-bold text-yellow">Organic</span>{" "}
              Groceries to your doorstep
            </h1>
            <p className="text-2xl text-white/90">
              Experience the ease of speedy delivery with Nourify – where
              healthy choices meet peak freshness.
            </p>
            <span className="text-sm pl-2.5 flex items-center gap-2.5">
              <img src="/general.svg" alt="General Icon" />
              Used by 15,000+ worldwide
            </span>
            <button
              className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit transition-opacity hover:duration-300 focus:outline-none hover:bg-secondary/70"
              onClick={handleStartShoppingClick}
            >
              Start shopping
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="w-full h-full bg-cover bg-center flex-shrink-0 flex flex-col justify-center items-start text-white"
          style={{ backgroundImage: "url('/images/bg2.png')" }}
        >
          <div className="relative z-10 flex flex-col gap-6 px-5 lg:px-10 xl:px-20 h-full justify-center items-start">
            <h1 className="text-5xl lg:text-[80px] leading-[60px] lg:leading-[95px] font-extrabold uppercase">
              Indulge in our Freshly Baked{" "}
              <span className="font-bold text-yellow">Pastries</span>
            </h1>
            <p className="text-2xl text-white/90">
              Experience the ease of speedy delivery with Nourify – where
              healthy choices meet peak freshness.
            </p>
            <span className="text-sm pl-2.5 flex items-center gap-2.5">
              <img src="/general.svg" alt="General Icon" />
              Used by 15,000+ worldwide
            </span>
            <button
              className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit transition-opacity hover:duration-300 focus:outline-none hover:bg-secondary/70"
              onClick={handleStartShoppingClick}
            >
              Start shopping
            </button>
          </div>
        </div>

        {/* Slide 3 (Repeat of Slide 1 for seamless looping) */}
        <div
          className="w-full h-full bg-cover bg-center flex-shrink-0 flex flex-col justify-center items-start text-white"
          style={{ backgroundImage: "url('/images/bg1.png')" }}
        >
          <div className="relative z-10 flex flex-col gap-6 px-5 lg:px-10 xl:px-20 h-full justify-center items-start">
            <h1 className="text-5xl lg:text-[80px] leading-[60px] lg:leading-[95px] font-extrabold uppercase">
              Fresh, <span className="font-bold text-yellow">Organic</span>{" "}
              Groceries to your doorstep
            </h1>
            <p className="text-2xl text-white/90">
              Experience the ease of speedy delivery with Nourify – where
              healthy choices meet peak freshness.
            </p>
            <span className="text-sm pl-2.5 flex items-center gap-2.5">
              <img src="/general.svg" alt="General Icon" />
              Used by 15,000+ worldwide
            </span>
            <button
              className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit transition-opacity hover:duration-300 focus:outline-none hover:bg-secondary/70"
              onClick={handleStartShoppingClick}
            >
              Start shopping
            </button>
          </div>
        </div>
      </div>

      {/* Dark overlay for background images */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
    </div>
  );
}

export default HeroSection;
