import OurProducts from "@/components/OurProducts";
import HeroSection from "@/components/HeroSection";
import LimitedOffer from "@/components/limoffer";
import WhyChoose from "@/ui/landing/WhyChoose";
import Navbar from "@/app/components/Navbar"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between  font-sans">
        <Navbar/>
        <HeroSection />
        <OurProducts />
        <LimitedOffer/>
        <WhyChoose />
      </main>
    </>
  );
}
