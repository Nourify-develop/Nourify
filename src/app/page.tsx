import OurProducts from "@/components/OurProducts";
import HeroSection from "@/components/HeroSection";
import LimitedOffer from "@/components/limoffer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between  font-sans">
        
        <HeroSection />
        <OurProducts />
        <LimitedOffer/>
      </main>
    </>
  );
}
