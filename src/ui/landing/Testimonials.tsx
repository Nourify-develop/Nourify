import { Slider, SliderContainer, SliderContent } from "@/components/custom/slider";
import { testimonials } from "./_data";
import Typography from "@/components/typography";
import Image from "next/image";
import Wrapper from "@/layout/wrapper";

export default function Testimonials() {
  return (
    <Wrapper className="bg-white">
      <SliderContainer>
        <Slider
          loop
          containerClassName="md:py-6"
          gapsBetween={"30px"}
          manualControls
          stopOnManual={false}
          contentClassName="py-8"
          mediaQueries={{ 768: 3, 1280: 3 }}
          buttonClassName="bottom-0 md:bottom-[1.25em]"
        >
          {testimonials.map((item) => (
            <SliderContent key={item.full_name}>
              <article className="px-6 py-4 rounded-lg flex flex-col items-start gap-y-4">
                <span className="flex items-center gap-x-4">
                  <Image src={item.avatar} width={40} height={40} alt={item.full_name} />
                  <aside className="space-y-1">
                    <Typography.h4>{item.full_name}</Typography.h4>
                    <Typography.s className="!text-primary-2/70 text-sm">{item.title}</Typography.s>
                  </aside>
                  <div className="flex gap-x-1 ml-5 text-yellow-400 md:hidden lg:flex">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#FFA500"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="star-icon"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </span>
                <Typography.p className="!text-gray-6 leading-8 text-sm">
                  "{item.text}"
                </Typography.p>
              </article>
            </SliderContent>
          ))}
        </Slider>
      </SliderContainer>
    </Wrapper>
  );
}
