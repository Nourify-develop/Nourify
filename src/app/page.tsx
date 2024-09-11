import OurProducts from "@/components/OurProducts";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between  font-sans">
        Hellooo
        <p className="uppercase font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <HeroSection />
        <OurProducts />
      </main>
    </>
  );
}
