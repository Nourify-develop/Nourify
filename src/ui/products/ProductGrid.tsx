import { useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="flex items-center flex-col h-full ">
      {/* Swiper Carousel */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Assign Swiper instance to the ref
        }}
        breakpoints={{
          140: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        modules={[FreeMode]}
        freeMode={true}
        className="max-w-[100%] lg:max-w-[100%]"
        onSlideChange={handleSlideChange} // Track slide change
        onInit={(swiper) => setActiveIndex(swiper.activeIndex)} // Set initial active slide
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="flex mt-12 space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)} // Navigate to slide on click
            className={`w-4 h-4 rounded-full transition ${
              activeIndex === index ? "md:w-[161px] w-[60px] h-[3px] bg-[#079C4E]" : "w-[30px] h-[3px] bg-[#A0A0A0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;



//  <div className="flex items-center justify-center w-full gap-1 py-4">
//         <span className="w-[161px] h-[3px] bg-[#079C4E]"></span>
//         <span className="w-[30px] h-[3px] bg-[#A0A0A0]"></span>
//         <span className="w-[30px] h-[3px] bg-[#A0A0A0]"></span>
//       </div>