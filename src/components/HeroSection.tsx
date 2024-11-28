"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Wrapper from "@/layout/wrapper";

const HeroSection: React.FC = () => {
  const slides = [
    {
      backgroundImage: "url(/images/bg1.png)",
      title: "FRESH, ORGANIC GROCERIES TO YOUR DOORSTEP",
      description:
        "Experience The Ease Of Speedy Delivery With Nourify – Where Healthy Choices Meet Peak Freshness.",
      buttonText: "Start shopping",
    },
    {
      backgroundImage: "url(/images/bg2.png)",
      title: "INDULGE IN OUR FRESHLY BAKED PASTRIES",
      description:
        "Experience The Ease Of Speedy Delivery With Nourify – Where Healthy Choices Meet Peak Freshness.",
      buttonText: "Start shopping",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Cycle through slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Function to scroll to the "our-products" section
  const handleStartShoppingClick = () => {
    const productsSection = document.getElementById("our-products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden w-screen h-[80vh] sm:h-[60vh] lg:h-screen xl:h-[90vh] text-white">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0.7, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.7, x: "-100%" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex max-w-screen-xl items-center justify-center min-w-full h-full bg-cover bg-center"
                style={{ backgroundImage: slide.backgroundImage }}
              >
                <Wrapper className="relative z-10 flex flex-col gap-6 px-5 lg:px-10 xl:px-20 h-full justify-center items-start">
                  <h1 className="text-5xl lg:text-[70px] leading-[60px] lg:leading-[95px] font-extrabold uppercase">
                    {slide.title.split(" ").map((word, i) =>
                      word === "ORGANIC" || word === "PASTRIES" ? (
                        <span key={i} className="text-yellow">
                          {word}{" "}
                        </span>
                      ) : (
                        `${word} `
                      )
                    )}
                  </h1>
                  <p className="text-2xl text-white/90 max-w-screen-md">
                    {slide.description}
                  </p>
                  <span className="text-sm pl-2.5 flex items-center gap-2.5">
                    <img src="/general.svg" alt="General Icon" />
                    Used by 15,000+ worldwide
                  </span>
                  <button
                    className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit transition-all duration-300 focus:outline-none hover:bg-secondary/70"
                    onClick={handleStartShoppingClick}
                  >
                    {slide.buttonText}
                  </button>
                </Wrapper>
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Slider bar */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-24 h-1 rounded-full transition-all duration-500 ${
              currentSlide === index ? "bg-white w-16" : "bg-white/35 w-8"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
