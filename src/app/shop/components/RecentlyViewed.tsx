"use client";
import React, { useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";
import Wrapper from "@/layout/wrapper";
import { useSwipeable } from "react-swipeable";
import ProductGrid from "@/ui/products/ProductGrid";
import ProductCard from "@/ui/products/ProductCard";

const RecentlyViewed = () => {
  const { products } = useProducts();
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const limitedProducts = products.slice(0, 4);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //I created pairs of products for the slider here
  const chunkedProducts = [];
  for (let i = 0; i < limitedProducts.length; i += 2) {
    chunkedProducts.push(limitedProducts.slice(i, i + 2));
  }

  useEffect(() => {
    if (currentIndex >= chunkedProducts.length) {
      setCurrentIndex(0);
    }
  }, [chunkedProducts, currentIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextSlide(),
    onSwipedRight: () => goToPrevSlide(),
  });

  const goToNextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 < chunkedProducts.length ? prev + 1 : 0
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : chunkedProducts.length - 1
    );
  };

  return (
    <Wrapper>
      <div
        className="border-t"
        style={{ borderTopWidth: "0.5px", borderTopColor: "#F6F5F7" }}
      >
        <h1 className="uppercase text-primary-2/85 font-bold text-[2rem] leading-9 pt-[3rem] flex-1 mb-[2.5rem]">
          recently viewed
        </h1>

        {isMobile ? (
          <div className="relative overflow-hidden" {...handlers}>
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {chunkedProducts.map((pair, idx) => (
                <div key={idx} className="w-full flex-none">
                  <div className="grid grid-cols-2 gap-4">
                    {pair.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center w-full gap-1 py-4">
              {chunkedProducts.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`
                    cursor-pointer h-[3px] transition-all duration-300
                    ${
                      index === currentIndex
                        ? "bg-[#079C4E] w-[161px]"
                        : "bg-[#A0A0A0] w-[30px]"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {limitedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default RecentlyViewed;

// COMMENTED OUT OLD RECENTLY VIEWED
// const RecentlyViewed = () => {
//   const { products } = useProducts();
//   const limitedProducts = products.slice(0, 4);
//   return (
//     <Wrapper>
//       {" "}
//       {/* RECENTLY VIEWED  */}
//       <div
//         className="border-t "
//         style={{ borderTopWidth: "0.5px", borderTopColor: "#F6F5F7" }}
//       >
//         {" "}
//         <h1 className="uppercase text-primary-2/85 font-bold text-[2rem] leading-9 pt-[3rem] flex-1 mb-[2.5rem]">
//           recently viewed
//         </h1>
//         <ProductGridTwo products={limitedProducts} />
//       </div>
//       <div className="flex items-center justify-center w-full gap-1 py-4">
//         <span className="w-[161px] h-[3px] bg-[#079C4E]"></span>
//         <span className="w-[30px] h-[3px] bg-[#A0A0A0]"></span>
//         <span className="w-[30px] h-[3px] bg-[#A0A0A0]"></span>
//       </div>
//     </Wrapper>
//   );
// };

// export default RecentlyViewed;
