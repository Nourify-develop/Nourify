import OurProducts from "@/app/components/OurProducts";
import HeroSection from "@/components/HeroSection";
import LimitedOffer from "@/components/limoffer";
import WhyChoose from "@/ui/landing/WhyChoose";
import Navbar from "@/components/Navbar";
import Testimonials from "@/ui/landing/Testimonials";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between  font-sans">
        {/* <Navbar /> */}

        <HeroSection />
        <OurProducts />
        <LimitedOffer />
        <WhyChoose />
        <Testimonials />
      </main>
    </>
  );
}
