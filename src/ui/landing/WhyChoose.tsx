import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import Image from "next/image";
import { why_nourify } from "./_data";

export default function WhyChoose() {
  return (
    <Wrapper className="relative flex flex-col gap-y-8 bg-white">
      <Typography.h2 isGreen className="text-gray-4 !font-bold text-center md:text-left uppercase">
        Why Choose Nourify?
      </Typography.h2>
      <section className="grid md:grid-cols-2 gap-8 r items-center ">
        <div className="flex justify-center">
          <Image
            src="/images/why-choose-img.svg"
            alt=""
            width={0}
            height={0}
            className="w-full h-auto place-items-center rounded-md"
          />
        </div>

        <aside className="h-full ">
          <section className="h-full flex flex-col justify-between gap-5 md:gap-0 py-1 ">
            {why_nourify.map((item) => (
              <span key={item.id} className="flex items-center gap-x-4">
                <span className="p-4 bg-[#F6F5F7] rounded-md">
                  <Image
                    src="/icons/green_plant.svg"
                    title={item.title}
                    alt={item.title}
                    aria-label={item.title}
                    aria-labelledby={item.title}
                    width={50}
                    height={50}
                  />
                </span>
                <aside className="flex flex-col gap-y-0.5">
                  <Typography.h4 className="!text-gray-4 ">
                    {item.title}
                  </Typography.h4>
                  <Typography.p isGray className="!text-[0.875em] lg:w-[80%] !text-primary-2/70">
                    {item.text}
                  </Typography.p>
                </aside>
              </span>
            ))}
          </section>
        </aside>
      </section>
    </Wrapper>
  );
}
