"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typography from "./typography";

function HeroSection() {
  const [showSecondContent, setShowSecondContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSecondContent((prev) => !prev); // Toggle between the first and second content
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const contentVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 1,
      },
    },
  };

  const imageVariants = {
    enter: {
      opacity: 0,
      x: 50,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        when: "beforeChildren", // Start child animations before main transition finishes
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 1,
        when: "afterChildren", // Only exit after child animations are complete
      },
    },
  };

  const handleStartShoppingClick = () => {
    const productsSection = document.getElementById("our-products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Overlay for darkening effect */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial="enter"
          animate={showSecondContent ? "exit" : "center"}
          exit="exit"
          variants={imageVariants}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bg1.png')",
          }}
        />
        <motion.div
          initial="enter"
          animate={showSecondContent ? "center" : "exit"}
          exit="exit"
          variants={imageVariants}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bg2.png')",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 justify-center  h-full items-start text-white">
        <motion.div
          initial="enter"
          animate={showSecondContent ? "exit" : "center"}
          exit="exit"
          variants={contentVariants}
          className="absolute  flex flex-col gap-6 justify-center px-5 lg:px-10 xl:px-20"
        >
          <Typography.h1 className="!text-5xl lg:!text-[80px] !leading-[60px] lg:!leading-[95px] !font-bold text-white uppercase">
            Fresh, <span className="font-bold text-yellow">Organic</span>{" "}
            Groceries to your doorstep
          </Typography.h1>
          <Typography.p className="!text-2xl text-white/90">
            Experience the ease of speedy delivery with Nourify – where healthy
            choices meet peak freshness.
          </Typography.p>
          <span className="text-sm pl-2.5 flex items-center gap-2.5">
            <img src="/general.svg" alt="General Icon" />
            Used by 15,000+ worldwide
          </span>
          <button
            className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit hover:duration-300 focus:outline-none hover:bg-secondary/70"
            onClick={handleStartShoppingClick}
          >
            Start shopping
          </button>
        </motion.div>

        <motion.div
          initial="enter"
          animate={showSecondContent ? "center" : "exit"}
          exit="exit"
          variants={contentVariants}
          className="absolute  flex flex-col gap-6 justify-center px-5 lg:px-10 xl:px-20"
        >
          <Typography.h1 className="!text-5xl  lg:!text-[80px] !leading-[60px] lg:!leading-[95px] !font-bold text-white uppercase">
            Indulge in our Freshly Baked
            <span className="font-bold text-yellow"> Pastries</span>
          </Typography.h1>
          <Typography.p className="!text-2xl text-white/90">
            Experience the joy of freshly baked goods delivered to your door.
          </Typography.p>
          <span className="text-sm pl-2.5 flex items-center gap-2.5">
            <img src="/general.svg" alt="General Icon" />
            Used by 15,000+ worldwide
          </span>
          <button
            className="bg-secondary px-6 py-4 text-xl rounded-[64px] w-fit hover:duration-300 focus:outline-none hover:bg-secondary/70"
            onClick={handleStartShoppingClick}
          >
            Start shopping
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
