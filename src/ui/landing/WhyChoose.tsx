import Typography from '@/components/typography'
import Wrapper from '@/layout/wrapper'
import Image from 'next/image'
import { why_nourify } from './_data'

export default function WhyChoose() {
  return (
    <Wrapper className='relative flex flex-col gap-y-8'>
      <Typography.h2 isGreen className='mx-auto'>Why Choose Nourify?</Typography.h2>
      <section className='grid md:grid-cols-2 gap-y-8 place-content-center'>
        <Image
          src="/images/why-choose-img.svg"
          alt=''
          width={0}
          height={0}
          className='w-auto h-auto'
        />

        <aside className='flex flex-col gap-y-8'>
          <Typography.p>
            At Nourify, we deliver top-quality groceries and pastries to your door.
            Our focus on freshness, convenience, and sustainability sets us apart.
          </Typography.p>
          <section className='grid md:grid-cols-2 gap-4'>
            {why_nourify.map((item) => (
              <span key={item.title} className='flex items-center gap-x-4'>
                <span className='p-5 bg-green rounded-md'>
                  <Image
                    src='/icons/plant.svg'
                    title={item.title}  
                    alt={item.title}
                    aria-label={item.title}
                    aria-labelledby={item.title}
                    width={82}
                    height={82}
                  />
                </span>
                <aside className='flex flex-col gap-y-0.5'>
                  <Typography.h4 className='!text-gray-4'>{item.title}</Typography.h4>
                  <Typography.p isGray className='!text-[0.875em]'>{item.text}</Typography.p>
                </aside>
              </span>
            ))}
          </section>
        </aside>
      </section>
    </Wrapper>
  )
}
