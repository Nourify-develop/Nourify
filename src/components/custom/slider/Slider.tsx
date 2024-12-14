import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  CSSProperties,
  useCallback,
  SVGProps,
} from "react";
import { useSwipeable } from "react-swipeable";
import Typography from "@/components/typography";

interface SliderProps {
  children: ReactNode[];
  loop?: boolean;
  manualControls?: boolean;
  slideDuration?: number;
  highlightActive?: boolean;
  slidesInView?: number;
  gapsBetween?: string | number;
  mediaQueries?: { [key: string]: number };
  stopOnManual?: boolean; // New flag to stop autoplay on manual control
  containerClassName?: string;
  containerStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  buttonClassName?: string;
  buttonStyle?: CSSProperties;
  dotClassName?: string;
  dotStyle?: CSSProperties;
  svgProps?: SVGProps<SVGSVGElement>;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  loop = false,
  manualControls = false,
  slideDuration = 3000,
  highlightActive = false,
  slidesInView = 1,
  gapsBetween = "0px",
  mediaQueries = {},
  stopOnManual = false,
  containerClassName,
  containerStyle,
  contentClassName,
  contentStyle,
  buttonClassName,
  buttonStyle,
  dotClassName,
  dotStyle,
  svgProps,
}) => {
  const [currentIndex, setCurrentIndex] = useState(slidesInView);
  const [slidesToShow, setSlidesToShow] = useState(slidesInView);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [manualInteraction, setManualInteraction] = useState(false); // Track manual interaction
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const centerSlideIndex = Math.floor(slidesToShow / 2);
  const slides = [
    ...children.slice(-slidesToShow),
    ...children,
    ...children.slice(0, slidesToShow),
  ];

  // Handle window resize and media queries
  useEffect(() => {
    const updateSlidesToShow = () => {
      const screenWidth = window.innerWidth;
      let newSlidesToShow = slidesInView;

      for (const [breakpoint, slides] of Object.entries(mediaQueries)) {
        if (screenWidth >= parseInt(breakpoint)) {
          newSlidesToShow = slides;
        }
      }

      setSlidesToShow(newSlidesToShow);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [slidesInView, mediaQueries]);

  const nextSlide = () => {
    if (stopOnManual) setManualInteraction(true); // Set manual interaction flag if stopOnManual is true
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (stopOnManual) setManualInteraction(true); // Set manual interaction flag if stopOnManual is true
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    // Handle autoplay if manual interaction hasn't occurred or stopOnManual is false
    if (!manualControls && (!manualInteraction || !stopOnManual)) {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, slideDuration);
    }

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [manualControls, manualInteraction, slideDuration, stopOnManual]);

  useEffect(() => {
    // Handle "infinite" loop effect by jumping back to original slides without transition
    if (currentIndex === slidesToShow) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(slidesToShow);
      }, 500);
    }

    if (currentIndex === slides.length - slidesToShow) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(slidesToShow);
      }, 500);
    }
  }, [currentIndex, slides.length, slidesToShow]);

  useEffect(() => {
    if (!transitionEnabled) {
      setTimeout(() => setTransitionEnabled(true), 50);
    }
  }, [transitionEnabled]);

  // Combine refs for swipe handling
  const setRefs = useCallback((node: HTMLDivElement) => {
    containerRef.current = node;
    swipeHandlers.ref(node);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  return (
    <div
      className={`slider flex relative flex-col gap-8 sm:gap-20 ${containerClassName}`}
      style={{ width: "100%", ...containerStyle }}
      ref={setRefs}
    >
      <div className="flex justify-between sm:flex-row flex-col text-center">
        <Typography.h2 className="uppercase text-gray-4 !font-bold ">
          Testimonials
        </Typography.h2>
        <Typography.h3 className="!font-normal text-primary-2/80 !text-base">
          Here’s what others have to say about Nourify
        </Typography.h3>
      </div>
      <div
        className={`slider-content ${contentClassName}`}
        style={{
          display: "flex",
          transition: transitionEnabled ? "transform 0.5s ease-in-out" : "none",
          transform: `translateX(-${
            (currentIndex - centerSlideIndex) * (100 / slidesToShow)
          }%)`,
          gap: gapsBetween,
          ...contentStyle,
        }}
      >
        {slides.map((child, index) => (
          <div
            key={index}
            className={`slide-item rounded-lg ${
              highlightActive
                ? "transition-transform duration-500 ease-in-out"
                : ""
            } ${
              index === currentIndex
                ? "scale-105 brightness-100 shadow-md"
                : "scale-95 brightness-65"
            }`}
            style={{
              flex: `0 0 calc(${100 / slidesToShow}% - ${gapsBetween})`,
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div
        className="slider-dots"
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {children.map((_, index) => (
          <button
            key={index}
            className={`dot ${dotClassName} ${
              index === (currentIndex - slidesToShow) % children.length
                ? "active"
                : ""
            }`}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              margin: "0 5px",
              backgroundColor:
                index === (currentIndex - slidesToShow) % children.length
                  ? "green"
                  : "gray",
              ...dotStyle,
            }}
            onClick={() => {
              if (stopOnManual) setManualInteraction(true); // Set manual interaction flag on dot click if stopOnManual is true
              setCurrentIndex(index + slidesToShow);
            }}
          />
        ))}
      </div>

      {/* Manual Controls */}
      {manualControls && (
        <div className="slider-controls flex justify-center mt-0 sm:-mt-16 items-center  ">
          <button
            onClick={prevSlide}
            className={`prev-btn hover:scale-95 transition-all duration-150 ease-in-out ${buttonClassName}`}
            style={buttonStyle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 16 16"
              {...svgProps}
            >
              <path
                fill="currentColor"
                d="M10.354 3.146a.5.5 0 0 1 0 .708L6.207 8l4.147 4.146a.5.5 0 0 1-.708.708l-4.5-4.5a.5.5 0 0 1 0-.708l4.5-4.5a.5.5 0 0 1 .708 0"
              ></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={`next-btn hover:scale-95 transition-all duration-150 ease-in-out ${buttonClassName}`}
            style={buttonStyle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 12 12"
              {...svgProps}
            >
              <path
                fill="currentColor"
                d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"
              ></path>
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .slider {
          overflow: hidden;
          position: relative;
          background: white;
        }
        .slider-content {
          display: flex;
          position: relative;
        }
        .slider-controls {
          /* position: absolute; */
          /* bottom: 1.25em; */
          width: 100%;
          /* left: auto; */
          display: flex;
          gap: 20px;
          /* margin: 0 0 0 -2em; */
        }
        .next-btn {
          background: rgb(7, 156, 78);
          color: white;
          /* border: 2px solid white; */
          cursor: pointer;
          padding: 10px;
          border-radius: 9999px;
          border: none;
        }
        .prev-btn {
          /* margin-left: auto; */
          background: rgb(213, 231, 222);
          color: rgb(7, 156, 78);
          cursor: pointer;
          padding: 10px;
          border-radius: 9999px;
          border: none;
          /* border: 2px solid rgb(7, 156, 78); */
        }
        .dot {
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .dot.active {
          background-color: rgb(7, 156, 78); /* Customize active dot color */
        }
      `}</style>
    </div>
  );
};
