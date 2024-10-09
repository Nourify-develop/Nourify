import OurProducts from "@/ui/landing/OurProducts";
import HeroSection from "@/components/HeroSection";
import LimitedOffer from "@/components/limoffer";
import WhyChoose from "@/ui/landing/WhyChoose";

import Newsletter  from "@/components/newsletter/newsletter"

import Navbar from "@/components/Navbar";
import Testimonials from "@/ui/landing/Testimonials";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between  font-sans">
       

        <HeroSection />
        <OurProducts />
        <LimitedOffer />
        <WhyChoose />

        <Newsletter/>

        <Testimonials />

      </main>
    </>
  );
}
