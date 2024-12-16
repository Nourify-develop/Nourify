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
          containerClassName="py-6"
          gapsBetween={"30px"}
          manualControls
          stopOnManual={false}
          contentClassName="py-8"
          mediaQueries={{ 768: 3, 1280: 3}}
          buttonClassName="bottom-0 md:bottom-[1.25em]"
        >
          {testimonials.map((item) => (
            <SliderContent key={item.full_name}>
              <article className="px-6 py-4 rounded-lg flex flex-col items-start gap-y-4">
                <span className="flex items-center gap-x-4">
                  <Image src={item.avatar} width={48} height={48} alt={item.full_name} />
                  <aside>
                    <Typography.h4>{item.full_name}</Typography.h4>
                    <Typography.s className="text-gray-6">{item.title}</Typography.s>
                  </aside>
                </span>
                <Typography.p className="text-gray-6">{item.text}</Typography.p>
              </article>
            </SliderContent>
          ))}
        </Slider>
      </SliderContainer>
    </Wrapper>
  )
}
